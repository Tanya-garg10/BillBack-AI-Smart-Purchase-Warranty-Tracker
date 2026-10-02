import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';
import { queryUpcomingDeadlines, getPurchasesFromDynamoDB } from './dynamodb';

const REGION = process.env.AWS_REGION || 'ap-south-1';

let eventBridgeClient: EventBridgeClient | null = null;

function getEventBridgeClient(): EventBridgeClient {
  if (!eventBridgeClient) {
    eventBridgeClient = new EventBridgeClient({
      region: REGION,
      credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
        ? {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          }
        : undefined,
    });
  }
  return eventBridgeClient;
}

export interface ReminderNotification {
  id: string;
  type: 'RETURN_DEADLINE' | 'WARRANTY_EXPIRY';
  productName: string;
  deadlineDate: string;
  daysRemaining: number;
  message: string;
  urgency: 'critical' | 'warning';
}

export interface EventBridgeCronScanResult {
  executionTimestamp: string;
  ruleName: string;
  status: 'SUCCESS' | 'FAILED';
  itemsScanned: number;
  remindersGenerated: ReminderNotification[];
}

/**
 * Executes the EventBridge scheduled cron scanner logic
 * Simulates or runs the daily deadline check
 */
export async function executeEventBridgeDeadlineScanner(
  userId: string = 'tanyagarg_1024'
): Promise<EventBridgeCronScanResult> {
  const allPurchases = await getPurchasesFromDynamoDB(userId);
  const reminders: ReminderNotification[] = [];

  for (const purchase of allPurchases) {
    // 1. Check Return deadline (< 7 days)
    if (purchase.returnDaysRemaining > 0 && purchase.returnDaysRemaining <= 7) {
      reminders.push({
        id: `rem-ret-${purchase.id}`,
        type: 'RETURN_DEADLINE',
        productName: purchase.productName,
        deadlineDate: purchase.returnDeadline,
        daysRemaining: purchase.returnDaysRemaining,
        message:
          purchase.returnDaysRemaining <= 1
            ? `⚠️ Return window for ${purchase.productName} expires tomorrow (${purchase.returnDeadline})`
            : `Return window for ${purchase.productName} expires in ${purchase.returnDaysRemaining} days`,
        urgency: purchase.returnDaysRemaining <= 2 ? 'critical' : 'warning',
      });
    }

    // 2. Check Warranty expiry (< 30 days)
    if (purchase.warrantyMonthsRemaining <= 1 && purchase.warrantyExpiry) {
      reminders.push({
        id: `rem-war-${purchase.id}`,
        type: 'WARRANTY_EXPIRY',
        productName: purchase.productName,
        deadlineDate: purchase.warrantyExpiry,
        daysRemaining: 21,
        message: `Protection alert: Warranty for ${purchase.productName} expires soon on ${purchase.warrantyExpiry}`,
        urgency: 'warning',
      });
    }
  }

  // Publish event to EventBridge if configured
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    try {
      const eb = getEventBridgeClient();
      await eb.send(
        new PutEventsCommand({
          Entries: [
            {
              Source: 'billback.scheduler',
              DetailType: 'DeadlineScanCompleted',
              Detail: JSON.stringify({
                userId,
                timestamp: new Date().toISOString(),
                remindersCount: reminders.length,
              }),
            },
          ],
        })
      );
    } catch (err) {
      console.warn('[AWS EventBridge] Could not dispatch event to remote EventBridge bus:', err);
    }
  }

  return {
    executionTimestamp: new Date().toISOString(),
    ruleName: 'billback-daily-deadline-scanner (cron: 0 9 * * ? *)',
    status: 'SUCCESS',
    itemsScanned: allPurchases.length,
    remindersGenerated: reminders,
  };
}
