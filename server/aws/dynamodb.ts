import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

const REGION = process.env.AWS_REGION || 'ap-south-1';
const TABLE_NAME = process.env.AWS_DYNAMODB_TABLE || 'BillBack-Purchases';

let ddbDocClient: DynamoDBDocumentClient | null = null;

function getDynamoDocClient(): DynamoDBDocumentClient {
  if (!ddbDocClient) {
    const rawClient = new DynamoDBClient({
      region: REGION,
      credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
        ? {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          }
        : undefined,
    });
    ddbDocClient = DynamoDBDocumentClient.from(rawClient);
  }
  return ddbDocClient;
}

export interface DynamoPurchaseRecord {
  PK: string; // USER#<userId>
  SK: string; // PURCHASE#<orderId>
  id: string;
  userId: string;
  productName: string;
  seller: string;
  orderId: string;
  purchasePrice: number;
  purchaseDate: string;
  returnDeadline: string;
  returnDaysRemaining: number;
  returnStatusText: string;
  returnUrgency: string;
  warrantyExpiry: string;
  warrantyMonthsRemaining: number;
  warrantyStatusText: string;
  warrantyUrgency: string;
  s3InvoiceUri: string;
  category: string;
  createdAt: string;
}

// In-memory backing store for local dev or when remote DynamoDB table is offline
const inMemoryPurchases: DynamoPurchaseRecord[] = [];

/**
 * Persists an extracted purchase record to DynamoDB
 */
export async function savePurchaseToDynamoDB(record: DynamoPurchaseRecord): Promise<DynamoPurchaseRecord> {
  // Always update in-memory store
  const existingIdx = inMemoryPurchases.findIndex((p) => p.SK === record.SK);
  if (existingIdx >= 0) {
    inMemoryPurchases[existingIdx] = record;
  } else {
    inMemoryPurchases.unshift(record);
  }

  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    try {
      const ddb = getDynamoDocClient();
      await ddb.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: record,
        })
      );
    } catch (err) {
      console.warn('[AWS DynamoDB] Failed to persist to remote DynamoDB table, using local cache:', err);
    }
  }

  return record;
}

/**
 * Queries all purchase records for a given user from DynamoDB
 */
export async function getPurchasesFromDynamoDB(userId: string = 'tanyagarg_1024'): Promise<DynamoPurchaseRecord[]> {
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    try {
      const ddb = getDynamoDocClient();
      const result = await ddb.send(
        new QueryCommand({
          TableName: TABLE_NAME,
          KeyConditionExpression: 'PK = :pk AND begins_with(SK, :skPrefix)',
          ExpressionAttributeValues: {
            ':pk': `USER#${userId}`,
            ':skPrefix': 'PURCHASE#',
          },
        })
      );
      if (result.Items && result.Items.length > 0) {
        return result.Items as DynamoPurchaseRecord[];
      }
    } catch (err) {
      console.warn('[AWS DynamoDB] Query failed, returning in-memory records:', err);
    }
  }

  return inMemoryPurchases.filter((p) => p.userId === userId || p.PK === `USER#${userId}`);
}

/**
 * Scans for items with upcoming return deadlines (GSI or Scan)
 */
export async function queryUpcomingDeadlines(
  userId: string = 'tanyagarg_1024',
  daysLookahead: number = 7
): Promise<DynamoPurchaseRecord[]> {
  const records = await getPurchasesFromDynamoDB(userId);
  return records.filter((r) => r.returnDaysRemaining > 0 && r.returnDaysRemaining <= daysLookahead);
}
