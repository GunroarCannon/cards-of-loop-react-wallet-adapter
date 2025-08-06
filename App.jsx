import { useWallet, WalletProvider } from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { ConnectionProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css'

function WalletConnectButton({ gameId }) {
  const { publicKey, connect } = useWallet()

  useEffect(() => {
    if (publicKey && gameId) {
      fetch('https://your-honeycomb-server.com/link-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id: gameId,
          wallet: publicKey.toString(),
          timestamp: Date.now()
        })
      }).then(() => window.close())
    }
  }, [publicKey, gameId])

  return (
    <div className="connect-wallet-page">
      <button onClick={connect} className="connect-button">
        <img src="/phantom-icon.png" alt="Phantom" />
        Connect Phantom Wallet
      </button>
    </div>
  )
}

export default function App() {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [])
  const query = new URLSearchParams(window.location.search)
  const gameId = query.get('game_id')

  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletConnectButton gameId={gameId} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
