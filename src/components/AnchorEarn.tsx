import {
    useEarnDepositForm,
    useEarnDepositTx,
  } from '@anchor-protocol/anchor-earn';
import { Dialog, use } from "use-dialog";
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import React, { useEffect, useState } from 'react';

export function AnchorEarn() {
  const lcd = useLCDClient();
  const connectedWallet = useConnectedWallet();

  const [address, setAddress] = useState<null | string>();

  useEffect(() => {
    if (connectedWallet) {
      setAddress(connectedWallet.walletAddress);
    } 
  }, [connectedWallet, lcd]);

  return (
    <div>
      
    </div>
  );
}
