import React from 'react';
import ReactDOM from 'react-dom';

import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';
import { ConnectWallet } from 'components/ConnectWallet';
import { AccountBalance } from 'components/AccountBalance';

import './style.css';

function App() {
  return (
    <main
      style={{ margin: 20, display: 'flex', flexDirection: 'column'}}
    >
      <AccountBalance />
      <ConnectWallet />
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
