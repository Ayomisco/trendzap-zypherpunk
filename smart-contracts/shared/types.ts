/**
 * Shared types for TrendZap cross-chain oracle
 */

export type ChainType = 'solana' | 'arbitrum' | 'ethereum' | 'base' | 'zcash' | 'starknet';

export interface BetIntent {
  sourceChain: ChainType;
  destinationChain: ChainType;
  action: 'place_bet' | 'claim_winnings';
  params: {
    marketId: string;
    prediction: boolean;
    amount: string;
    user: string;
  };
}

export interface Market {
  id: string;
  creator: string;
  twitterUrl: string;
  targetMetric: 'likes' | 'retweets' | 'replies' | 'views';
  threshold: number;
  deadline: number;
  totalVolume: number;
  resolved: boolean;
  outcome: boolean;
}

export interface Bet {
  user: string;
  marketId: string;
  prediction: boolean;
  amount: number;
  timestamp: number;
  sourceChain: ChainType;
  claimed?: boolean;
}

export interface TwitterMetrics {
  likes: number;
  retweets: number;
  replies: number;
  views: number;
  timestamp: number;
}

export interface CrossChainMessage {
  id: string;
  sourceChain: ChainType;
  destinationChain: ChainType;
  payload: string;
  status: 'pending' | 'relayed' | 'confirmed' | 'failed';
  txHash?: string;
  timestamp: number;
}

export const CHAIN_RPC_URLS: Record<ChainType, string> = {
  solana: process.env.HELIUS_RPC_URL || 'https://api.devnet.solana.com',
  arbitrum: process.env.ARBITRUM_RPC_URL || 'https://sepolia-rollup.arbitrum.io/rpc',
  ethereum: process.env.ETHEREUM_RPC_URL || 'https://rpc.sepolia.org',
  base: process.env.BASE_RPC_URL || 'https://sepolia.base.org',
  zcash: process.env.ZCASH_RPC_URL || 'https://testnet.zcash.com',
  starknet: process.env.STARKNET_RPC_URL || 'https://starknet-goerli.infura.io/v3/',
};

export const AXELAR_GATEWAY_ADDRESSES: Record<string, string> = {
  'arbitrum-sepolia': '0xe432150cce91c13a887f7D836923d5597adD8E31',
  'ethereum-sepolia': '0xe432150cce91c13a887f7D836923d5597adD8E31',
  'base-sepolia': '0xe432150cce91c13a887f7D836923d5597adD8E31',
};

export const USDC_DECIMALS = 6;
export const ZEC_DECIMALS = 8;
