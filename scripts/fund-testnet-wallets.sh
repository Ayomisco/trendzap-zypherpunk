#!/bin/bash

echo "💰 TrendZap Testnet Wallet Funding Guide"
echo "========================================="
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Get Solana address
if command -v solana &> /dev/null; then
    SOLANA_ADDRESS=$(solana address 2>/dev/null)
    if [ -n "$SOLANA_ADDRESS" ]; then
        echo -e "${GREEN}Solana Devnet Address:${NC}"
        echo "$SOLANA_ADDRESS"
        echo ""
        echo -e "${BLUE}Requesting SOL airdrop...${NC}"
        solana airdrop 2 || echo -e "${YELLOW}Airdrop failed. Please visit: https://faucet.solana.com/${NC}"
        echo ""
        echo "Current balance:"
        solana balance
        echo ""
    fi
fi

# EVM wallet info
if [ -f ".env" ]; then
    echo -e "${GREEN}Arbitrum Sepolia Setup:${NC}"
    echo "1. Get your Arbitrum Sepolia address from MetaMask or generated wallet"
    echo "2. Visit faucet: https://faucet.quicknode.com/arbitrum/sepolia"
    echo "3. Request testnet ETH (needed for gas fees)"
    echo ""
    echo "Alternative faucets:"
    echo "- https://www.alchemy.com/faucets/arbitrum-sepolia"
    echo "- https://sepoliafaucet.com/ (Ethereum Sepolia, bridge to Arbitrum)"
    echo ""
fi

echo -e "${GREEN}Zcash Testnet (Optional for MVP):${NC}"
echo "1. Download Zcash testnet wallet"
echo "2. Visit: https://faucet.testnet.z.cash/"
echo "3. Request testnet ZEC"
echo ""
echo -e "${YELLOW}Note: Zcash can be simulated for MVP demo${NC}"
echo ""

echo "========================================="
echo "API Keys Needed:"
echo ""
echo "1. Helius (Solana RPC):"
echo "   https://dev.helius.xyz/"
echo "   - Sign up for free account"
echo "   - Get API key from dashboard"
echo "   - Add to .env as HELIUS_API_KEY"
echo ""
echo "2. Privy (Multi-chain Wallet):"
echo "   https://privy.io/"
echo "   - Create free app"
echo "   - Get App ID"
echo "   - Add to .env as NEXT_PUBLIC_PRIVY_APP_ID"
echo ""
echo "3. Twitter API (Optional - can mock):"
echo "   https://developer.twitter.com/"
echo "   - Apply for developer account"
echo "   - Create app and get Bearer Token"
echo "   - Add to .env as TWITTER_BEARER_TOKEN"
echo "   - Or set TWITTER_API_MOCK=true for demo"
echo ""
echo "4. Arbiscan API (Optional - for contract verification):"
echo "   https://arbiscan.io/apis"
echo "   - Free API key for contract verification"
echo "   - Add to .env as ARBISCAN_API_KEY"
echo ""

echo "========================================="
echo "Wallet Generation Commands:"
echo ""
echo "Solana:"
echo "  solana-keygen new"
echo "  solana address"
echo ""
echo "Arbitrum (using cast from foundry):"
echo "  cast wallet new"
echo ""
echo "Or use MetaMask and export private key"
echo ""

echo -e "${GREEN}✅ Once funded, verify balances:${NC}"
echo "  solana balance"
echo "  cast balance <address> --rpc-url https://sepolia-rollup.arbitrum.io/rpc"
echo ""
