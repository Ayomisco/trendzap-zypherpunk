#!/bin/bash

echo "🚀 TrendZap Environment Setup Script"
echo "===================================="
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check Node.js
echo "Checking Node.js installation..."
if command_exists node; then
    NODE_VERSION=$(node -v)
    print_status "Node.js installed: $NODE_VERSION"
else
    print_error "Node.js not found. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check pnpm
echo "Checking pnpm installation..."
if command_exists pnpm; then
    PNPM_VERSION=$(pnpm -v)
    print_status "pnpm installed: $PNPM_VERSION"
else
    print_warning "pnpm not found. Installing pnpm..."
    npm install -g pnpm
    print_status "pnpm installed"
fi

# Check Rust
echo "Checking Rust installation..."
if command_exists rustc; then
    RUST_VERSION=$(rustc --version)
    print_status "Rust installed: $RUST_VERSION"
else
    print_warning "Rust not found. Installing Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source "$HOME/.cargo/env"
    print_status "Rust installed"
fi

# Check Solana CLI
echo "Checking Solana CLI installation..."
if command_exists solana; then
    SOLANA_VERSION=$(solana --version)
    print_status "Solana CLI installed: $SOLANA_VERSION"
else
    print_warning "Solana CLI not found. Installing Solana CLI..."
    sh -c "$(curl -sSfL https://release.solana.com/v1.17.0/install)"
    export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
    print_status "Solana CLI installed"
fi

# Check Anchor
echo "Checking Anchor installation..."
if command_exists anchor; then
    ANCHOR_VERSION=$(anchor --version)
    print_status "Anchor installed: $ANCHOR_VERSION"
else
    print_warning "Anchor not found. Installing Anchor..."
    cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
    avm install 0.29.0
    avm use 0.29.0
    print_status "Anchor installed"
fi

# Setup Solana config
echo ""
echo "Configuring Solana CLI..."
solana config set --url devnet
print_status "Solana CLI configured for devnet"

# Generate Solana keypair if not exists
if [ ! -f "$HOME/.config/solana/id.json" ]; then
    print_warning "No Solana keypair found. Generating new keypair..."
    solana-keygen new --no-bip39-passphrase
    print_status "Solana keypair generated"
else
    print_status "Solana keypair already exists"
fi

# Show Solana address
SOLANA_ADDRESS=$(solana address)
echo ""
echo "📍 Your Solana Address: $SOLANA_ADDRESS"
echo ""

# Airdrop SOL for testing
echo "Requesting SOL airdrop..."
solana airdrop 2 || print_warning "Airdrop failed. You may need to request manually from https://faucet.solana.com/"

# Install smart contract dependencies
echo ""
echo "Installing smart contract dependencies..."

# Solana contracts
if [ -d "smart-contracts/solana" ]; then
    cd smart-contracts/solana
    print_status "Installing Solana contract dependencies..."
    npm install || pnpm install
    cd ../..
fi

# Arbitrum contracts
if [ -d "smart-contracts/arbitrum" ]; then
    cd smart-contracts/arbitrum
    print_status "Installing Arbitrum contract dependencies..."
    npm install || pnpm install
    cd ../..
fi

# Orchestrator services
if [ -d "smart-contracts/orchestrator" ]; then
    cd smart-contracts/orchestrator
    print_status "Installing orchestrator dependencies..."
    npm install || pnpm install
    cd ../..
fi

# Frontend dependencies
if [ -d "trendzap_platform" ]; then
    cd trendzap_platform
    print_status "Installing frontend dependencies..."
    pnpm install
    cd ..
fi

# Copy .env.example if .env doesn't exist
if [ ! -f ".env" ]; then
    cp .env.example .env
    print_warning ".env file created from .env.example. Please update with your API keys!"
else
    print_status ".env file already exists"
fi

echo ""
echo "===================================="
echo "✅ Environment setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env file with your API keys:"
echo "   - Helius API key: https://dev.helius.xyz/"
echo "   - Privy App ID: https://privy.io/"
echo "   - Twitter Bearer Token: https://developer.twitter.com/"
echo ""
echo "2. Fund your testnet wallets:"
echo "   - Solana Devnet: https://faucet.solana.com/"
echo "   - Arbitrum Sepolia: https://faucet.quicknode.com/arbitrum/sepolia"
echo ""
echo "3. Start building:"
echo "   cd smart-contracts/solana && anchor build"
echo ""
echo "📚 See docs/12-mvp-5hour-execution-plan.md for next steps"
