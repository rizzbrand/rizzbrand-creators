export const CRYPTO_NETWORKS = [
  "ethereum",
  "polygon",
  "tron",
  "arbitrum",
  "base",
  "bsc",
] as const;

export type CryptoNetwork = (typeof CRYPTO_NETWORKS)[number];

export const CRYPTO_NETWORK_LABELS: Record<CryptoNetwork, string> = {
  ethereum: "Ethereum",
  polygon: "Polygon",
  tron: "Tron",
  arbitrum: "Arbitrum",
  base: "Base",
  bsc: "BNB Chain",
};

export const CRYPTO_NETWORK_COINS: Record<CryptoNetwork, string[]> = {
  ethereum: ["USDT", "USDC", "DAI"],
  polygon: ["USDT", "USDC"],
  tron: ["USDT"],
  arbitrum: ["USDT", "USDC"],
  base: ["USDC"],
  bsc: ["USDT", "BUSD", "USDC"],
};
