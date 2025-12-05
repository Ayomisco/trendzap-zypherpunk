#!/bin/bash

# TrendZap Hour 1 - Quick Verification Script
# Run this to check if you're ready for Hour 2

echo "🔍 TrendZap Hour 1 Verification"
echo "================================"
echo ""

ERRORS=0
WARNINGS=0

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

check_command() {
    if command -v "$1" &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 installed"
        if [ -n "$2" ]; then
            VERSION=$($1 $2 2>&1)
            echo "  └─ $VERSION"
        fi
    else
        echo -e "${RED}✗${NC} $1 not found"
        ((ERRORS++))
        if [ -n "$3" ]; then
            echo "  └─ Install: $3"
        fi
    fi
}

check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 exists"
    else
        echo -e "${RED}✗${NC} $1 missing"
        ((ERRORS++))
    fi
}

check_env_var() {
    if grep -q "$1" .env 2>/dev/null; then
        VALUE=$(grep "$1" .env | cut -d '=' -f2)
        if [ -n "$VALUE" ] && [ "$VALUE" != "your_${1,,}_here" ]; then
            echo -e "${GREEN}✓${NC} $1 configured"
        else
            echo -e "${YELLOW}⚠${NC} $1 needs value"
            ((WARNINGS++))
        fi
    else
        echo -e "${RED}✗${NC} $1 missing from .env"
        ((ERRORS++))
    fi
}

echo "📦 Checking Required Tools..."
echo "----------------------------"
check_command "node" "--version" "brew install node"
check_command "rustc" "--version" "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"
check_command "solana" "--version" "sh -c \"\$(curl -sSfL https://release.solana.com/stable/install)\""
check_command "anchor" "--version" "npm install -g @coral-xyz/anchor-cli@0.29.0"
echo ""

echo "📁 Checking Project Structure..."
echo "---------------------------------"
check_file "smart-contracts/solana/Cargo.toml"
check_file "smart-contracts/solana/Anchor.toml"
check_file "smart-contracts/arbitrum/hardhat.config.ts"
check_file "smart-contracts/orchestrator/package.json"
check_file "trendzap_platform/components/cross-chain-bet-dialog.tsx"
echo ""

echo "🔑 Checking Environment Configuration..."
echo "-----------------------------------------"
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
    check_env_var "HELIUS_API_KEY"
    check_env_var "NEXT_PUBLIC_PRIVY_APP_ID"
    check_env_var "PRIVATE_KEY"
else
    echo -e "${RED}✗${NC} .env file missing"
    echo "  └─ Run: cp .env.template .env"
    ((ERRORS++))
fi
echo ""

echo "💰 Checking Wallet Balances..."
echo "-------------------------------"
if command -v solana &> /dev/null; then
    BALANCE=$(solana balance 2>/dev/null | awk '{print $1}')
    if [ -n "$BALANCE" ]; then
        if (( $(echo "$BALANCE > 1" | bc -l) )); then
            echo -e "${GREEN}✓${NC} Solana balance: $BALANCE SOL"
        else
            echo -e "${YELLOW}⚠${NC} Solana balance low: $BALANCE SOL"
            echo "  └─ Run: solana airdrop 2"
            ((WARNINGS++))
        fi
    else
        echo -e "${YELLOW}⚠${NC} Could not check Solana balance"
        echo "  └─ Run: solana config set --url devnet && solana airdrop 2"
        ((WARNINGS++))
    fi
else
    echo -e "${RED}✗${NC} Solana CLI not installed"
    ((ERRORS++))
fi
echo ""

echo "📦 Checking Dependencies..."
echo "---------------------------"
if [ -f "smart-contracts/solana/package.json" ]; then
    if [ -d "smart-contracts/solana/node_modules" ]; then
        echo -e "${GREEN}✓${NC} Solana dependencies installed"
    else
        echo -e "${YELLOW}⚠${NC} Solana dependencies not installed"
        echo "  └─ Run: cd smart-contracts/solana && npm install"
        ((WARNINGS++))
    fi
fi

if [ -f "smart-contracts/arbitrum/package.json" ]; then
    if [ -d "smart-contracts/arbitrum/node_modules" ]; then
        echo -e "${GREEN}✓${NC} Arbitrum dependencies installed"
    else
        echo -e "${YELLOW}⚠${NC} Arbitrum dependencies not installed"
        echo "  └─ Run: cd smart-contracts/arbitrum && npm install"
        ((WARNINGS++))
    fi
fi

if [ -f "smart-contracts/orchestrator/package.json" ]; then
    if [ -d "smart-contracts/orchestrator/node_modules" ]; then
        echo -e "${GREEN}✓${NC} Orchestrator dependencies installed"
    else
        echo -e "${YELLOW}⚠${NC} Orchestrator dependencies not installed"
        echo "  └─ Run: cd smart-contracts/orchestrator && npm install"
        ((WARNINGS++))
    fi
fi
echo ""

echo "================================"
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ ALL CHECKS PASSED!${NC}"
    echo ""
    echo "You're ready for Hour 2! 🚀"
    echo ""
    echo "Next steps:"
    echo "  cd smart-contracts/solana"
    echo "  anchor build"
    echo ""
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠ $WARNINGS WARNING(S)${NC}"
    echo ""
    echo "You can proceed with Hour 2, but some features may not work."
    echo "Review warnings above and fix when possible."
    echo ""
    exit 0
else
    echo -e "${RED}✗ $ERRORS ERROR(S) and $WARNINGS WARNING(S)${NC}"
    echo ""
    echo "Please fix the errors above before proceeding to Hour 2."
    echo "See HOUR1-COMPLETION-STATUS.md for detailed setup instructions."
    echo ""
    exit 1
fi
