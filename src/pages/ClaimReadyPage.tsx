import React from 'react';
import { ClaimReady } from '../components/claim-ready';
import { useApp } from '../context/AppContext';

interface ClaimReadyPageProps {
  claimIdOrPurchaseId: string;
}

export const ClaimReadyPage: React.FC<ClaimReadyPageProps> = ({ claimIdOrPurchaseId }) => {
  const { purchases, navigate } = useApp();

  // Find purchase either by purchase id, or by claim id
  const purchase =
    purchases.find(
      (p) =>
        p.id === claimIdOrPurchaseId ||
        p.claimPack?.claimId === claimIdOrPurchaseId ||
        claimIdOrPurchaseId.includes(p.id)
    ) || purchases[0]; // fallback to Sony WH-CH720N

  return (
    <div className="pb-16">
      <ClaimReady
        purchase={purchase}
        onViewInvoice={() => navigate(`/purchases/${purchase.id}`)}
        onBack={() => navigate('/claims')}
      />
    </div>
  );
};
