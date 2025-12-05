/**
 * Constants for TrendZap cross-chain oracle
 */

// Program/Contract IDs (will be filled after deployment)
export const SOLANA_PROGRAM_ID = process.env.SOLANA_PROGRAM_ID || '';
export const ARBITRUM_ORCHESTRATOR_ADDRESS = process.env.ORCHESTRATOR_ADDRESS || '';

// Testnet Token Addresses
export const USDC_ADDRESSES = {
  solana: 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr', // Devnet USDC
  'arbitrum-sepolia': '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
};

// Faucet URLs
export const FAUCET_URLS = {
  solana: 'https://faucet.solana.com',
  arbitrum: 'https://faucet.quicknode.com/arbitrum/sepolia',
  zcash: 'https://faucet.testnet.z.cash/',
};

// Gas limits
export const GAS_LIMITS = {
  arbitrum: {
    placeBet: 200000,
    resolveMarket: 150000,
    claimWinnings: 100000,
  },
};

// Time constants
export const ORACLE_CHECK_INTERVAL = 60 * 1000; // 1 minute
export const CROSS_CHAIN_TIMEOUT = 5 * 60 * 1000; // 5 minutes
export const MARKET_MIN_DURATION = 60 * 60; // 1 hour

// Error messages
export const ERRORS = {
  MARKET_NOT_FOUND: 'Market not found',
  MARKET_RESOLVED: 'Market already resolved',
  BETTING_CLOSED: 'Betting period has ended',
  INSUFFICIENT_BALANCE: 'Insufficient balance',
  UNAUTHORIZED: 'Unauthorized',
  CROSS_CHAIN_TIMEOUT: 'Cross-chain relay timeout',
};
