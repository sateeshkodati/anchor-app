import {  MARKET_DENOMS } from '@anchor-protocol/anchor.js'
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import React, { useEffect, useState } from 'react';

export function AccountBalance() {
  const lcd = useLCDClient(); 
  const connectedWallet = useConnectedWallet();

  const [balance, setBalance] = useState<undefined | number>();
  const [address, setAddress] = useState<null | string>();

  useEffect(() => {
    if (connectedWallet) {
      setAddress(connectedWallet.walletAddress);
      lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
        setBalance(coins.get(MARKET_DENOMS.UUSD)?.amount?.toNumber());
      });
    } else {
      setBalance(0);
    }
  }, [connectedWallet, lcd]);

  return (
    <div>
      {balance && <pre>{address}: <b>{balance/1000000}</b> UST</pre>}
    </div>
  );
}
