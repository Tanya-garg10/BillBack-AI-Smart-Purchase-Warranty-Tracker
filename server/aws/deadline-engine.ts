// AWS Lambda Deadline Engine Logic
// Calculates return deadlines and warranty expirations

export interface DeadlineCalculationResult {
  purchaseDate: string;
  returnDeadline: string;
  returnDaysRemaining: number;
  isReturnExpired: boolean;
  returnStatusText: string;
  returnUrgency: 'critical' | 'warning' | 'safe' | 'expired';

  warrantyExpiry: string;
  warrantyDaysRemaining: number;
  warrantyMonthsRemaining: number;
  isWarrantyExpired: boolean;
  warrantyStatusText: string;
  warrantyUrgency: 'critical' | 'warning' | 'safe' | 'expired';
}

export function calculateDeadlines(
  purchaseDateStr: string,
  returnDays: number = 7,
  warrantyPeriodStr: string = '1 year'
): DeadlineCalculationResult {
  const purchaseDate = new Date(purchaseDateStr);
  const now = new Date();
  
  // Return Deadline calculation
  const returnDeadlineDate = new Date(purchaseDate);
  returnDeadlineDate.setDate(returnDeadlineDate.getDate() + returnDays);
  
  const returnDiffTime = returnDeadlineDate.getTime() - now.getTime();
  const returnDaysRemaining = Math.ceil(returnDiffTime / (1000 * 60 * 60 * 24));
  const isReturnExpired = returnDaysRemaining <= 0;

  let returnUrgency: 'critical' | 'warning' | 'safe' | 'expired' = 'safe';
  let returnStatusText = `${returnDaysRemaining} days left to return`;

  if (isReturnExpired) {
    returnUrgency = 'expired';
    returnStatusText = 'Return window closed';
  } else if (returnDaysRemaining <= 1) {
    returnUrgency = 'critical';
    returnStatusText = 'Return expires tomorrow!';
  } else if (returnDaysRemaining <= 3) {
    returnUrgency = 'warning';
    returnStatusText = `${returnDaysRemaining} days left`;
  }

  // Warranty Expiry calculation
  let warrantyMonths = 12;
  const lowerPeriod = warrantyPeriodStr.toLowerCase();
  if (lowerPeriod.includes('2 year')) {
    warrantyMonths = 24;
  } else if (lowerPeriod.includes('3 year')) {
    warrantyMonths = 36;
  } else if (lowerPeriod.includes('6 month')) {
    warrantyMonths = 6;
  } else if (lowerPeriod.includes('18 month')) {
    warrantyMonths = 18;
  }

  const warrantyExpiryDate = new Date(purchaseDate);
  warrantyExpiryDate.setMonth(warrantyExpiryDate.getMonth() + warrantyMonths);

  const warrantyDiffTime = warrantyExpiryDate.getTime() - now.getTime();
  const warrantyDaysRemaining = Math.ceil(warrantyDiffTime / (1000 * 60 * 60 * 24));
  const warrantyMonthsRemaining = Math.max(0, Math.ceil(warrantyDaysRemaining / 30));
  const isWarrantyExpired = warrantyDaysRemaining <= 0;

  let warrantyUrgency: 'critical' | 'warning' | 'safe' | 'expired' = 'safe';
  let warrantyStatusText = `Active · ${warrantyMonthsRemaining} months left`;

  if (isWarrantyExpired) {
    warrantyUrgency = 'expired';
    warrantyStatusText = 'Warranty expired';
  } else if (warrantyDaysRemaining <= 30) {
    warrantyUrgency = 'critical';
    warrantyStatusText = `Expires in ${warrantyDaysRemaining} days`;
  } else if (warrantyDaysRemaining <= 60) {
    warrantyUrgency = 'warning';
    warrantyStatusText = 'Expiring soon';
  }

  const formatDate = (d: Date) => {
    return d.toISOString().split('T')[0];
  };

  return {
    purchaseDate: formatDate(purchaseDate),
    returnDeadline: formatDate(returnDeadlineDate),
    returnDaysRemaining,
    isReturnExpired,
    returnStatusText,
    returnUrgency,
    warrantyExpiry: formatDate(warrantyExpiryDate),
    warrantyDaysRemaining,
    warrantyMonthsRemaining,
    isWarrantyExpired,
    warrantyStatusText,
    warrantyUrgency,
  };
}
