import React, { useEffect, useState } from 'react';
import { Fee, Key, MnemonicKey, Tx, TxBody, Wallet} from '@terra-money/terra.js';
import { useWallet, useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import { Anchor, bombay12, AddressProviderFromJson, MARKET_DENOMS, fabricateMarketRedeemStable, fabricateMarketDepositStableCoin } from '@anchor-protocol/anchor.js'
import { AnchorEarn, CHAINS, DENOMS  } from '@anchor-protocol/anchor-earn';



export function AnchorEarnApp() {
  const lcd = useLCDClient();
  const connectedWallet = useConnectedWallet();
  
  const [totalDeposit, setTotalDeposit] = useState<any>(0);
  const [address, setAddress] = useState<string>('');

  const addressProvider = new AddressProviderFromJson(bombay12);
  const anchor = new Anchor(lcd, addressProvider)


  useEffect(() => {
    if (connectedWallet) {
      setAddress(connectedWallet.walletAddress);
      anchor.earn.getTotalDeposit({address: connectedWallet.walletAddress, market: MARKET_DENOMS.UUSD})
        .then(depost => {
            setTotalDeposit(depost);
        });
    } else {
      setTotalDeposit(0);
    }
  }, [connectedWallet, lcd]);

  const deposit = async () =>{
    const depositMsg = anchor.earn.depositStable({amount: '10', market: MARKET_DENOMS.UUSD})
      .generateWithAddress(address)

    const signResult = await connectedWallet?.sign({
      msgs: depositMsg,
    }) ;
    console.log(signResult?.result);

    const result = await lcd.tx.broadcast(signResult?.result as Tx);
    console.log(result);

  };
  
  return (
    <div>
      <h1>Anchor Earn</h1>
      <b>Total Deposts:</b> {totalDeposit} UST
      <br />
      <div><b>Depost</b> <button onClick={deposit}>Deposit</button></div>
    </div>
  );
}
