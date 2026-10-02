import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { generatePresignedInvoiceUploadUrl, storeInvoiceInS3 } from './server/aws/s3';
import { extractInvoiceWithBedrock } from './server/aws/bedrock';
import { calculateDeadlines } from './server/aws/deadline-engine';
import {
  savePurchaseToDynamoDB,
  getPurchasesFromDynamoDB,
  DynamoPurchaseRecord,
} from './server/aws/dynamodb';
import { executeEventBridgeDeadlineScanner } from './server/aws/eventbridge';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Seed default items into DynamoDB on server start
  const initialPurchases: DynamoPurchaseRecord[] = [
    {
      PK: 'USER#tanyagarg_1024',
      SK: 'PURCHASE#sony-wh-ch720n',
      id: 'sony-wh-ch720n',
      userId: 'tanyagarg_1024',
      productName: 'Sony WH-CH720N',
      seller: 'Amazon',
      orderId: '402-8921890',
      purchasePrice: 4999,
      purchaseDate: '2026-09-12',
      returnDeadline: '2026-09-19',
      returnDaysRemaining: 1,
      returnStatusText: '1 day left to return',
      returnUrgency: 'critical',
      warrantyExpiry: '2028-09-12',
      warrantyMonthsRemaining: 23,
      warrantyStatusText: 'Active · 23 months left',
      warrantyUrgency: 'safe',
      s3InvoiceUri: 's3://billback-invoices-prod/invoices/user_1024/sony_wh_ch720n_invoice.pdf',
      category: 'Audio',
      createdAt: '2026-09-12T10:00:00Z',
    },
    {
      PK: 'USER#tanyagarg_1024',
      SK: 'PURCHASE#macbook-air-m3',
      id: 'macbook-air-m3',
      userId: 'tanyagarg_1024',
      productName: 'MacBook Air M3 (16GB)',
      seller: 'Apple India',
      orderId: 'W109928120',
      purchasePrice: 114900,
      purchaseDate: '2026-09-15',
      returnDeadline: '2026-09-29',
      returnDaysRemaining: 10,
      returnStatusText: '10 days left to return',
      returnUrgency: 'safe',
      warrantyExpiry: '2027-09-15',
      warrantyMonthsRemaining: 12,
      warrantyStatusText: 'Active · 12 months left',
      warrantyUrgency: 'safe',
      s3InvoiceUri: 's3://billback-invoices-prod/invoices/user_1024/apple_macbook_tax_invoice.pdf',
      category: 'Computing',
      createdAt: '2026-09-15T11:30:00Z',
    },
  ];

  for (const item of initialPurchases) {
    await savePurchaseToDynamoDB(item);
  }

  // ==========================================
  // REST API Routes (API Gateway / Lambda Layer)
  // ==========================================

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'BillBack AI Backend',
      awsRegion: process.env.AWS_REGION || 'ap-south-1',
      timestamp: new Date().toISOString(),
    });
  });

  // 1. Amazon S3 - Pre-signed Upload URL
  app.post('/api/invoices/upload-url', async (req, res) => {
    try {
      const { fileName, contentType, userId = 'tanyagarg_1024' } = req.body;
      const result = await generatePresignedInvoiceUploadUrl(userId, fileName || 'invoice.pdf', contentType);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to generate upload URL' });
    }
  });

  // 2. AWS Lambda Pipeline - Process Invoice with Amazon Bedrock, Lambda math, and DynamoDB
  app.post('/api/invoices/process', async (req, res) => {
    try {
      const { fileName = 'invoice.pdf', base64Data, userId = 'tanyagarg_1024' } = req.body;

      const buffer = base64Data ? Buffer.from(base64Data.replace(/^data:[^;]+;base64,/, ''), 'base64') : undefined;

      // Step A: Store in Amazon S3
      const s3Uri = buffer
        ? await storeInvoiceInS3(userId, fileName, buffer)
        : `s3://${process.env.AWS_S3_INVOICE_BUCKET || 'billback-invoices-prod'}/invoices/${userId}/${fileName}`;

      // Step B: Extract details with Amazon Bedrock Claude 3.5
      const extracted = await extractInvoiceWithBedrock(buffer, fileName);

      // Step C: Execute Lambda Deadline Logic
      const deadlines = calculateDeadlines(
        extracted.purchaseDate,
        extracted.returnWindowDays,
        extracted.warrantyPeriod
      );

      // Step D: Persist into Amazon DynamoDB
      const purchaseId = extracted.productName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const dynamoRecord: DynamoPurchaseRecord = {
        PK: `USER#${userId}`,
        SK: `PURCHASE#${extracted.orderId || purchaseId}`,
        id: purchaseId,
        userId,
        productName: extracted.productName,
        seller: extracted.seller,
        orderId: extracted.orderId,
        purchasePrice: extracted.price,
        purchaseDate: deadlines.purchaseDate,
        returnDeadline: deadlines.returnDeadline,
        returnDaysRemaining: deadlines.returnDaysRemaining,
        returnStatusText: deadlines.returnStatusText,
        returnUrgency: deadlines.returnUrgency,
        warrantyExpiry: deadlines.warrantyExpiry,
        warrantyMonthsRemaining: deadlines.warrantyMonthsRemaining,
        warrantyStatusText: deadlines.warrantyStatusText,
        warrantyUrgency: deadlines.warrantyUrgency,
        s3InvoiceUri: s3Uri,
        category: extracted.category,
        createdAt: new Date().toISOString(),
      };

      await savePurchaseToDynamoDB(dynamoRecord);

      res.json({
        success: true,
        data: dynamoRecord,
        extracted,
        deadlines,
        awsPipeline: {
          s3Uri,
          bedrockModel: extracted.bedrockModelUsed,
          dynamoTable: process.env.AWS_DYNAMODB_TABLE || 'BillBack-Purchases',
        },
      });
    } catch (err: any) {
      console.error('[API /invoices/process] Pipeline error:', err);
      res.status(500).json({ error: err.message || 'Invoice processing failed' });
    }
  });

  // 3. Amazon DynamoDB - Get Purchases Query
  app.get('/api/purchases', async (req, res) => {
    try {
      const userId = (req.query.userId as string) || 'tanyagarg_1024';
      const purchases = await getPurchasesFromDynamoDB(userId);
      res.json({ success: true, purchases });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to fetch purchases' });
    }
  });

  // 4. Amazon EventBridge - Scheduled Deadline Scanner Check
  app.post('/api/eventbridge/check-deadlines', async (req, res) => {
    try {
      const userId = req.body.userId || 'tanyagarg_1024';
      const scanResult = await executeEventBridgeDeadlineScanner(userId);
      res.json({ success: true, scanResult });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'EventBridge scanner failed' });
    }
  });

  // ==========================================
  // Vite Middleware / Production Static Serve
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[BillBack AI] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
