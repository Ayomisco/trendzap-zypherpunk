# TrendZap Smart Contracts

Cross-chain private prediction oracle smart contracts for Solana, Arbitrum, and Zcash.

## Directory Structure

```
smart-contracts/
├── solana/              # Solana program (Anchor framework)
│   ├── Anchor.toml      # Anchor configuration
│   ├── Cargo.toml       # Rust dependencies
│   ├── programs/
│   │   └── trendzap-bet/
│   │       └── src/
│   │           └── lib.rs
│   ├── tests/
│   └── target/
├── arbitrum/            # Arbitrum contracts (Solidity + Hardhat)
│   ├── contracts/
│   │   ├── TrendZapOrchestrator.sol
│   │   └── interfaces/
│   ├── scripts/
│   ├── test/
│   ├── hardhat.config.ts
│   └── package.json
├── orchestrator/        # Cross-chain orchestration services
│   ├── near-relayer/    # NEAR Intents integration
│   ├── axelar-bridge/   # Axelar GMP integration
│   └── oracle/          # Twitter oracle service
├── zcash/              # Zcash integration (simulation + docs)
│   ├── README.md        # Implementation guide
│   └── examples/        # Example z_sendmany scripts
└── shared/             # Common types & interfaces
    ├── types.ts
    └── constants.ts
```

## Quick Start

### Prerequisites

```bash
# Install Rust & Anchor (for Solana)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cargo install --git https://github.com/coral-xyz/anchor --tag v0.29.0 anchor-cli

# Install Node.js dependencies (for Arbitrum & orchestrator)
cd arbitrum && npm install
cd ../orchestrator && npm install

# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
```

### Environment Setup

Create `.env` file in project root:

```bash
# Solana
SOLANA_NETWORK=devnet
HELIUS_RPC_URL=https://devnet.helius-rpc.com/?api-key=YOUR_KEY
SOLANA_PROGRAM_ID=

# Arbitrum
ARBITRUM_RPC_URL=https://sepolia-rollup.arbitrum.io/rpc
ARBITRUM_PRIVATE_KEY=
ORCHESTRATOR_ADDRESS=

# Axelar
AXELAR_ENV=testnet
AXELAR_GATEWAY=

# Oracle
TWITTER_API_KEY=
ORACLE_PRIVATE_KEY=

# Zcash (optional for MVP)
ZCASH_RPC_URL=https://testnet.zcash.com/
ZCASH_RPC_USER=
ZCASH_RPC_PASSWORD=
```

## Deployment

### 1. Solana Program

```bash
cd smart-contracts/solana

# Build program
anchor build

# Deploy to devnet
anchor deploy --provider.cluster devnet

# Run tests
anchor test
```

### 2. Arbitrum Contracts

```bash
cd smart-contracts/arbitrum

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to Arbitrum Sepolia
npx hardhat run scripts/deploy.ts --network arbitrum-sepolia
```

### 3. Orchestrator Services

```bash
cd smart-contracts/orchestrator

# Start NEAR relayer
cd near-relayer
npm run start

# Start oracle (in new terminal)
cd ../oracle
npm run start
```

## Contract Addresses

### Testnet Deployments

| Chain | Contract | Address | Explorer |
|-------|----------|---------|----------|
| Solana Devnet | TrendZap Bet Program | TBD | [Solscan](https://solscan.io) |
| Arbitrum Sepolia | TrendZap Orchestrator | TBD | [Arbiscan](https://sepolia.arbiscan.io) |
| Zcash Testnet | (Simulated) | - | [Explorer](https://explorer.testnet.z.cash) |

## Testing

### Local Testing

```bash
# Test Solana program
cd smart-contracts/solana
anchor test

# Test Arbitrum contracts
cd smart-contracts/arbitrum
npx hardhat test

# Test cross-chain flow (requires deployed contracts)
cd smart-contracts/orchestrator
npm test
```

### Integration Testing

1. Deploy all contracts to testnets
2. Fund wallets with testnet tokens
3. Run end-to-end test script:

```bash
npm run test:e2e
```

## Architecture Overview

### Bet Placement Flow

```
User (Solana) → Solana Program → Emit Event → Relayer → Axelar → Arbitrum
```

### Market Resolution Flow

```
Oracle → Fetch Twitter Data → Zcash Settlement (simulated) → Arbitrum Resolution
```

## Development

### Adding New Chains

1. Create new directory: `smart-contracts/[chain-name]/`
2. Implement bet acceptance contract
3. Add relayer support in `orchestrator/`
4. Update `shared/types.ts` with new chain

### Modifying Bet Logic

- **Solana**: Edit `solana/programs/trendzap-bet/src/lib.rs`
- **Arbitrum**: Edit `arbitrum/contracts/TrendZapOrchestrator.sol`
- **Cross-chain**: Edit `orchestrator/near-relayer/relayer.ts`

## Security Notes

⚠️ **MVP Disclaimer**: These contracts are for demonstration purposes. DO NOT use in production without:
- Professional security audit
- Comprehensive test coverage
- Access control implementation
- Emergency pause mechanisms

## Resources

- [Anchor Documentation](https://www.anchor-lang.com/)
- [Axelar GMP Docs](https://docs.axelar.dev/)
- [NEAR Intents](https://docs.near.org/concepts/intents)
- [Zcash RPC Docs](https://zcash.github.io/rpc/)

## Support

For questions or issues:
- Discord: [TrendZap Community](#)
- GitHub Issues: [Report Bug](#)
- Email: dev@trendzap.xyz
