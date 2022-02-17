import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import React, { useEffect, useState } from 'react';

export function AccountBalance() {
  const lcd = useLCDClient();
  const connectedWallet = useConnectedWallet();

  const [bank, setBank] = useState<null | string>();
  const [address, setAddress] = useState<null | string>();

  useEffect(() => {
    if (connectedWallet) {
      setAddress(connectedWallet.walletAddress);
      lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
        setBank(coins.toString());
      });
    } else {
      setBank(null);
    }
  }, [connectedWallet, lcd]);

  return (
    <div>
      {bank && <pre>{address}: {bank}</pre>}
    </div>
  );
}
