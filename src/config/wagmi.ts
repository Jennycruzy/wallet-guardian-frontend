import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, arbitrum, optimism, base } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "WalletGuard",
  // Free WalletConnect Cloud project ID — get yours at https://cloud.walletconnect.com
  projectId: "8f65e79f4e6e0c0c8c5c56f821668e76",
  chains: [mainnet, polygon, arbitrum, optimism, base],
});
