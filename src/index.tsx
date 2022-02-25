import React from 'react';
import ReactDOM from 'react-dom';

import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';
import { ConnectWallet } from 'components/ConnectWallet';
import { AccountBalance } from 'components/AccountBalance';
import { AnchorEarnApp } from 'components/AnchorEarn';
import './style.css';

function App() {
  return (
    <main style={{ margin: 20, display: 'flex', flexDirection: 'column'}}>
      <h1>Sample Achor Earn app</h1>
      <p> Note: this app is tested with Terra wallet testnet and hardcoded for testnet, install Terra wallet  in your browser  https://chrome.google.com/webstore/detail/terra-station-wallet/aiifbnbfobpmeekipheeijimdpnlpgpp</p>
      <br />
      <div>
        <h1>Wallet</h1>
        <AccountBalance />
        <ConnectWallet />
      </div>
      <br />
      <AnchorEarnApp />
    </main>
  );
}

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <WalletProvider {...chainOptions}>
      <App />
    </WalletProvider>,
    document.getElementById('root'),
  );
});
