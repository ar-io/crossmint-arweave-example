import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ArweaveWalletKit } from '@arweave-wallet-kit/react'
import WanderStrategy from '@arweave-wallet-kit/wander-strategy'
import BrowserWalletStrategy from '@arweave-wallet-kit/browser-wallet-strategy'
import WebWalletStrategy from '@arweave-wallet-kit/webwallet-strategy'
import CrossmintProviders from './components/CrossmintProviders'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div>Loading application...</div>}>
      <HashRouter>
        <ArweaveWalletKit
          config={{
            permissions: [
              'ACCESS_ADDRESS',
              'ACCESS_PUBLIC_KEY',
              'SIGN_TRANSACTION',
              'DISPATCH',
            ],
            ensurePermissions: true,
            strategies: [
              new WanderStrategy(),
              new BrowserWalletStrategy(),
              new WebWalletStrategy(),
            ],
          }}
        >
          <CrossmintProviders>
            <App />
          </CrossmintProviders>
        </ArweaveWalletKit>
      </HashRouter>
    </Suspense>
  </StrictMode>,
)
