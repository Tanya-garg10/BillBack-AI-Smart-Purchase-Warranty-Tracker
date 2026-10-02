import React, { createContext, useContext, useState, useEffect } from 'react';
import { PurchaseItem, ClaimRecord, DashboardStats } from '../types';
import { MOCK_PURCHASES, MOCK_CLAIMS, INITIAL_STATS } from '../lib/mock-data';

interface AppContextType {
  currentPath: string;
  navigate: (path: string) => void;
  purchases: PurchaseItem[];
  claims: ClaimRecord[];
  stats: DashboardStats;
  addPurchase: (item: PurchaseItem) => void;
  updatePurchase: (id: string, updates: Partial<PurchaseItem>) => void;
  generateClaimPack: (purchaseId: string) => string;
  toast: { message: string; type?: 'success' | 'info' | 'warning' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname) {
      return window.location.pathname;
    }
    return '/';
  });

  const [purchases, setPurchases] = useState<PurchaseItem[]>(MOCK_PURCHASES);
  const [claims, setClaims] = useState<ClaimRecord[]>(MOCK_CLAIMS);
  const [stats, setStats] = useState<DashboardStats>(INITIAL_STATS);
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'info' | 'warning' } | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const addPurchase = (item: PurchaseItem) => {
    setPurchases((prev) => [item, ...prev]);
    setStats((prev) => ({
      ...prev,
      totalPurchases: prev.totalPurchases + 1,
      totalSpend: prev.totalSpend + item.purchasePrice,
      activeWarranties: item.warranty.isValid ? prev.activeWarranties + 1 : prev.activeWarranties,
      expiringSoon: item.returnWindow.daysRemaining <= 7 && !item.returnWindow.isExpired 
        ? prev.expiringSoon + 1 
        : prev.expiringSoon,
    }));
    showToast(`"${item.productName}" added to purchases successfully!`);
  };

  const updatePurchase = (id: string, updates: Partial<PurchaseItem>) => {
    setPurchases((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const generateClaimPack = (purchaseId: string): string => {
    const purchase = purchases.find((p) => p.id === purchaseId);
    const claimId = `CLM-${Math.floor(1000 + Math.random() * 9000)}`;

    if (purchase) {
      setPurchases((prev) =>
        prev.map((p) =>
          p.id === purchaseId
            ? {
                ...p,
                claimStatus: 'ready',
                claimPack: {
                  claimId,
                  generatedAt: 'Today, 20 Sep 2026',
                  status: 'ready',
                  notes: 'Official claim dossier generated with tax invoice and serial validation.',
                },
              }
            : p
        )
      );

      // Check if already in claims list
      const existingClaim = claims.find((c) => c.purchaseId === purchaseId);
      if (!existingClaim) {
        const newClaim: ClaimRecord = {
          id: claimId,
          purchaseId: purchase.id,
          productName: purchase.productName,
          seller: purchase.seller,
          purchaseDate: purchase.purchaseDate,
          claimDate: '20 Sep 2026',
          status: 'ready',
          issueDescription: 'Warranty service authorization dossier generated.',
          warrantyProvider: purchase.warranty.provider,
        };
        setClaims((prev) => [newClaim, ...prev]);
      }
    }

    showToast('Warranty Claim Pack generated and ready for submission!');
    return claimId;
  };

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        purchases,
        claims,
        stats,
        addPurchase,
        updatePurchase,
        generateClaimPack,
        toast,
        showToast,
        isSidebarCollapsed,
        toggleSidebar,
        isMobileMenuOpen,
        setMobileMenuOpen: setIsMobileMenuOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
