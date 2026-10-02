export type ProductCategory = 
  | 'Audio' 
  | 'Smartphones' 
  | 'Computing' 
  | 'Wearables' 
  | 'Home Appliances' 
  | 'Accessories';

export type ReturnUrgency = 'critical' | 'warning' | 'normal' | 'expired';
export type WarrantyUrgency = 'active' | 'expiring_soon' | 'expired';
export type ClaimStatus = 'ready' | 'in_progress' | 'completed' | 'none';

export interface ReturnWindowInfo {
  policyDays: number;
  purchaseDate: string;
  deadlineDate: string;
  daysRemaining: number;
  isExpired: boolean;
  statusText: string;
  urgency: ReturnUrgency;
}

export interface WarrantyInfo {
  provider: string;
  coveragePeriod: string;
  durationMonths: number;
  startDate: string;
  expiryDate: string;
  daysRemaining: number;
  monthsRemaining: number;
  statusText: string;
  isValid: boolean;
  urgency: WarrantyUrgency;
  coverageDetails: string[];
  claimHotline?: string;
  serialNumber?: string;
}

export interface InvoiceDocument {
  fileName: string;
  fileSize: string;
  fileType: 'PDF' | 'PNG' | 'JPG' | 'JPEG';
  uploadDate: string;
  invoiceNumber: string;
  taxGst?: string;
}

export interface PurchaseItem {
  id: string;
  productName: string;
  category: ProductCategory;
  seller: string;
  orderId: string;
  purchaseDate: string;
  purchasePrice: number;
  currency: string;
  paymentMethod: string;
  invoice: InvoiceDocument;
  returnWindow: ReturnWindowInfo;
  warranty: WarrantyInfo;
  claimStatus: ClaimStatus;
  claimPack?: {
    claimId: string;
    generatedAt?: string;
    ticketNumber?: string;
    status: ClaimStatus;
    notes?: string;
  };
  notes?: string;
}

export interface ClaimRecord {
  id: string;
  purchaseId: string;
  productName: string;
  seller: string;
  purchaseDate: string;
  claimDate: string;
  status: 'ready' | 'in_progress' | 'completed';
  issueDescription: string;
  ticketNumber?: string;
  resolution?: string;
  amountCovered?: number;
  warrantyProvider: string;
}

export interface DashboardStats {
  totalPurchases: number;
  expiringSoon: number;
  activeWarranties: number;
  totalSpend: number;
}
