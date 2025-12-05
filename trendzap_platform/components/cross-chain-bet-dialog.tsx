"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { usePrivy } from "@privy-io/react-auth"
import { Wallet2, Zap, Shield } from "lucide-react"

interface CrossChainBetDialogProps {
  marketId: string
  marketTitle: string
  outcome: "yes" | "no"
}

type SupportedChain = "solana" | "arbitrum"

interface ChainInfo {
  name: string
  icon: string
  currency: string
  fees: string
  privacy: boolean
}

const SUPPORTED_CHAINS: Record<SupportedChain, ChainInfo> = {
  solana: {
    name: "Solana Devnet",
    icon: "◎",
    currency: "SOL",
    fees: "~$0.00025",
    privacy: false,
  },
  arbitrum: {
    name: "Arbitrum Sepolia",
    icon: "⬢",
    currency: "ETH",
    fees: "~$0.01",
    privacy: true, // Via Zcash settlement
  },
}

export function CrossChainBetDialog({ marketId, marketTitle, outcome }: CrossChainBetDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedChain, setSelectedChain] = useState<SupportedChain>("solana")
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const { authenticated, login, ready, user } = usePrivy()

  const handlePlaceBet = async () => {
    if (!authenticated) {
      login()
      return
    }

    setIsProcessing(true)
    try {
      // TODO: Implement cross-chain betting logic
      // - If Solana: Direct program call
      // - If Arbitrum: Call orchestrator contract with NEAR Intent
      console.log("Placing bet:", {
        marketId,
        outcome,
        amount,
        chain: selectedChain,
        user: user?.wallet?.address,
      })

      // Simulate transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert(`Bet placed successfully on ${SUPPORTED_CHAINS[selectedChain].name}!`)
      setOpen(false)
    } catch (error) {
      console.error("Failed to place bet:", error)
      alert("Failed to place bet. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const chainInfo = SUPPORTED_CHAINS[selectedChain]
  const outcomeColor = outcome === "yes" ? "text-green-500" : "text-red-500"

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className={outcome === "yes" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
        >
          Bet {outcome.toUpperCase()} from Any Chain
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-cyan-500" />
            Cross-Chain Bet
          </DialogTitle>
          <DialogDescription>
            Bet <span className={outcomeColor}>{outcome.toUpperCase()}</span> on: <strong>{marketTitle}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Chain Selection */}
          <div className="space-y-2">
            <Label htmlFor="chain">Select Blockchain</Label>
            <Select
              value={selectedChain}
              onValueChange={(value) => setSelectedChain(value as SupportedChain)}
            >
              <SelectTrigger id="chain">
                <SelectValue placeholder="Choose your chain" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SUPPORTED_CHAINS).map(([key, info]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{info.icon}</span>
                      <span>{info.name}</span>
                      {info.privacy && (
                        <Badge variant="secondary" className="ml-2">
                          <Shield className="h-3 w-3 mr-1" />
                          Private
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Chain Info Display */}
          <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Network:</span>
              <span className="font-medium">{chainInfo.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Currency:</span>
              <span className="font-medium">{chainInfo.currency}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Est. Fees:</span>
              <span className="font-medium text-green-500">{chainInfo.fees}</span>
            </div>
            {chainInfo.privacy && (
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border">
                <Shield className="h-4 w-4 text-cyan-500" />
                <span className="text-xs text-cyan-500">
                  Settled privately via Zcash shielded pool
                </span>
              </div>
            )}
          </div>

          {/* Bet Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">
              Bet Amount ({chainInfo.currency})
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder={`0.0 ${chainInfo.currency}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
            <p className="text-xs text-muted-foreground">
              Minimum: 0.01 {chainInfo.currency}
            </p>
          </div>

          {/* Wallet Status */}
          {!authenticated ? (
            <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 p-4">
              <div className="flex items-center gap-2 text-amber-500">
                <Wallet2 className="h-4 w-4" />
                <span className="text-sm font-medium">Connect your wallet to continue</span>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-4">
              <div className="flex items-center gap-2 text-green-500">
                <Wallet2 className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Connected: {user?.wallet?.address?.slice(0, 6)}...{user?.wallet?.address?.slice(-4)}
                </span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isProcessing}>
            Cancel
          </Button>
          {!authenticated ? (
            <Button onClick={login} disabled={!ready}>
              <Wallet2 className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          ) : (
            <Button
              onClick={handlePlaceBet}
              disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
            >
              {isProcessing ? "Processing..." : `Place Bet (${amount || "0"} ${chainInfo.currency})`}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
