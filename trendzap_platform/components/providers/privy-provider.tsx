"use client"

import { PrivyProvider } from "@privy-io/react-auth"
import type { ReactNode } from "react"

interface PrivyClientProviderProps {
  children: ReactNode
}

export function PrivyClientProvider({ children }: PrivyClientProviderProps) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "demo-app-id"

  return (
    <PrivyProvider
      appId={appId}
      config={{
        // Display settings
        appearance: {
          theme: "dark",
          accentColor: "#00E5BE", // TrendZap primary cyan
          logo: "/trendzap-logo.svg",
          showWalletLoginFirst: true,
        },
        // Login methods
        loginMethods: ["email", "wallet", "google", "twitter"],
        // Embedded wallets for non-crypto users
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
          requireUserPasswordOnCreate: false,
        },
        // External wallets to support - Multi-chain
        externalWallets: {
          coinbaseWallet: {
            connectionOptions: "all",
          },
        },
        // Solana configuration for testnet
        solanaRpcServers: [
          {
            name: "Helius Devnet",
            url: process.env.NEXT_PUBLIC_SOLANA_RPC || "https://api.devnet.solana.com",
          },
        ],
        solanaCluster: "devnet",

        // Default chain (Arbitrum Sepolia for testnet)
        defaultChain: {
          id: 421614,
          name: "Arbitrum Sepolia",
          network: "arbitrum-sepolia",
          nativeCurrency: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
          },
          rpcUrls: {
            default: {
              http: [process.env.NEXT_PUBLIC_ARBITRUM_RPC || "https://sepolia-rollup.arbitrum.io/rpc"],
            },
            public: {
              http: ["https://sepolia-rollup.arbitrum.io/rpc"],
            },
          },
          blockExplorers: {
            default: {
              name: "Arbiscan Sepolia",
              url: "https://sepolia.arbiscan.io",
            },
          },
          testnet: true,
        },
        // Multi-chain support: Solana + Arbitrum
        supportedChains: [
          // Arbitrum Sepolia (Testnet)
          {
            id: 421614,
            name: "Arbitrum Sepolia",
            network: "arbitrum-sepolia",
            nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
            rpcUrls: {
              default: { http: [process.env.NEXT_PUBLIC_ARBITRUM_RPC || "https://sepolia-rollup.arbitrum.io/rpc"] },
              public: { http: ["https://sepolia-rollup.arbitrum.io/rpc"] },
            },
            blockExplorers: {
              default: { name: "Arbiscan Sepolia", url: "https://sepolia.arbiscan.io" },
            },
            testnet: true,
          },
          // Solana Devnet (configured via solanaRpcServers above)
          "solana" as any,
        ],
      }}
    >
      {children}
    </PrivyProvider>
  )
}
