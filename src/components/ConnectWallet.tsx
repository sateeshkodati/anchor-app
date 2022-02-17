import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import React from 'react';

export function ConnectWallet() {
  const {
    status,
    network,
    wallets,
    availableConnectTypes,
    availableInstallTypes,
    availableConnections,
    supportFeatures,
    connect,
    disconnect,
  } = useWallet();

  return (
    <div>
      <footer>
        {status === WalletStatus.WALLET_NOT_CONNECTED && (
          <>
            <p><b>Connect to Wallet</b></p>
            {availableConnections.map(
              ({ type, name, icon, identifier = '' }) => (
                <>
                  <button
                    key={'connection-' + type + identifier}
                    onClick={() => connect(type, identifier)}
                  >
                    <img
                      src={icon}
                      alt={name}
                      style={{ width: '1em', height: '1em' }}
                    />
                    {name} [{identifier}]
                  </button> <br />
                </>
              ),
            )}
          </>
        )}
        {status === WalletStatus.WALLET_CONNECTED && (
          <button onClick={() => disconnect()}>Disconnect</button>
        )}
      </footer>
    </div>
  );
}
