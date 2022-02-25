import React, { useEffect, useState } from 'react';
import { Tx } from '@terra-money/terra.js';
import {  useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import { Anchor, bombay12, AddressProviderFromJson, MARKET_DENOMS } from '@anchor-protocol/anchor.js'




export function AnchorEarnApp() {
  const lcd = useLCDClient();
  const connectedWallet = useConnectedWallet();
  
  const [totalDeposit, setTotalDeposit] = useState<any>(0);
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);
    const depositMsg = anchor.earn.depositStable({amount: '10', market: MARKET_DENOMS.UUSD})
      .generateWithAddress(address)

    const signResult = await connectedWallet?.sign({ msgs: depositMsg }) ;
    console.log(signResult?.result);

    const result = await lcd.tx.broadcast(signResult?.result as Tx);
    console.log(result);
    anchor.earn.getTotalDeposit({address, market: MARKET_DENOMS.UUSD})
    .then(depost => {
        setTotalDeposit(depost);
        setLoading(false);
        // window.location.reload();
    });
  };
  
  const withdraw = async () => {
    setLoading(true);
    const withdrawMsg = anchor.earn.withdrawStable({ amount: '10', market: MARKET_DENOMS.UUSD})
      .generateWithAddress(address);
    const signResult = await connectedWallet?.sign({ msgs: withdrawMsg });
    console.log(signResult?.result);

    const result = await lcd.tx.broadcast(signResult?.result as Tx);
    console.log(result);
    anchor.earn.getTotalDeposit({address, market: MARKET_DENOMS.UUSD})
    .then(depost => {
        setTotalDeposit(depost);
        setLoading(false);
        // window.location.reload();
    });
  };

  return (
    <div>
      <h1>Anchor Earn</h1>
      <div>
        {loading && 
          <b style={{ color: 'green' }}>Transaction In progress....</b>
        }
      </div>
      <b>Total Deposts:</b> {totalDeposit} UST
      <br />
      <div><b>Depost 10 UST</b> <button onClick={deposit}>Deposit</button></div>
      <br />
      <div><b>Withdraw 10 UST</b> <button onClick={withdraw}>Withdraw</button></div>
    </div>
  );
}
