"use client";

import { PrivyProvider as PrivyProvider_ } from "@privy-io/react-auth";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { createSolanaRpc, createSolanaRpcSubscriptions } from "@solana/kit";

export default function PrivyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider_
      appId="cmgz5nmoy001qjo0bb3f4bwtz"
      //   clientId={process.env.PRIVY_APP_SECRET ?? ""}
      config={{
        // Create embedded wallets for users who don't have a wallet

        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
          solana: {
            createOnLogin: "users-without-wallets",
          },
        },
        solana: {
          rpcs: {
            "solana:mainnet": {
              rpc: createSolanaRpc("https://api.mainnet-beta.solana.com"),
              rpcSubscriptions: createSolanaRpcSubscriptions(
                "wss://api.mainnet-beta.solana.com"
              ),
            },
            "solana:devnet": {
              rpc: createSolanaRpc("https://api.devnet.solana.com"),
              rpcSubscriptions: createSolanaRpcSubscriptions(
                "wss://api.devnet.solana.com"
              ),
            },
          },
        },

        appearance: {
          walletChainType: "ethereum-and-solana",
          showWalletLoginFirst: true,
          landingHeader: "This is Conscious access",
        },
        externalWallets: { solana: { connectors: toSolanaWalletConnectors() } },
        loginMethods: ["email", "wallet", "google", "github"],
      }}
    >
      {children}
    </PrivyProvider_>
  );
}
