import React, { useEffect, useState } from 'react';

import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import { Anchor, bombay12, AddressProviderFromJson, MARKET_DENOMS, OperationGasParameters } from '@anchor-protocol/anchor.js'



export function AnchorEarnApp() {
  const lcd = useLCDClient();
  const connectedWallet = useConnectedWallet();

  const [address, setAddress] = useState<string>();
  const [totalDeposit, setTotalDeposit] = useState<any>(0);

  useEffect(() => {
    if (connectedWallet) {
      setAddress(connectedWallet.walletAddress);

      const addressProvider = new AddressProviderFromJson(bombay12);
      const anchor = new Anchor(lcd, addressProvider)
      
      anchor.earn.getTotalDeposit({address: connectedWallet.walletAddress, market: MARKET_DENOMS.UUSD})
        .then(depost => {
            setTotalDeposit(depost)   
        });
    } else {
      setTotalDeposit(0)   
    }
  }, [connectedWallet, lcd]);

  
  return (
    <div>
      <h1>Anchor Earn</h1>
      <b>Total Deposts:</b> {totalDeposit} UST
    </div>
  );
}
