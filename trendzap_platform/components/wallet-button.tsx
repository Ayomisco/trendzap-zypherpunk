"use client"

import { usePrivy, useWallets } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wallet, Copy, ExternalLink, LogOut, ChevronDown, Loader2 } from "lucide-react"
import { useState } from "react"

interface WalletButtonProps {
  variant?: "default" | "compact"
}

export function WalletButton({ variant = "default" }: WalletButtonProps) {
  const { ready, authenticated, user, login, logout } = usePrivy()
  const { wallets } = useWallets()
  const [copied, setCopied] = useState(false)

  const activeWallet = wallets[0]
  const address = activeWallet?.address || user?.wallet?.address

  const truncateAddress = (addr: string) => {
    if (!addr) return ""
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const openExplorer = () => {
    if (address) {
      window.open(`https://basescan.org/address/${address}`, "_blank")
    }
  }

  // Not ready yet
  if (!ready) {
    return (
      <Button size="sm" variant="outline" disabled className="gap-2 bg-transparent">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="hidden sm:inline">Loading...</span>
      </Button>
    )
  }

  // Not authenticated
  if (!authenticated) {
    return (
      <Button
        size="sm"
        onClick={login}
        className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-primary-foreground font-semibold"
      >
        <Wallet className="h-4 w-4" />
        <span className="hidden sm:inline">Connect</span>
      </Button>
    )
  }

  // Authenticated - show wallet dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="gap-2 border-primary/50 bg-primary/10 hover:bg-primary/20 text-primary"
        >
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-sm">{truncateAddress(address || "")}</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex flex-col gap-1">
          <span className="text-sm font-medium">Connected Wallet</span>
          <span className="font-mono text-xs text-muted-foreground">{truncateAddress(address || "")}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Balance Display */}
        <div className="px-2 py-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Balance</span>
            <span className="font-semibold text-primary">$0.00 USDC</span>
          </div>
          <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
            Deposit USDC
          </Button>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyAddress} className="cursor-pointer gap-2">
          <Copy className="h-4 w-4" />
          {copied ? "Copied!" : "Copy Address"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openExplorer} className="cursor-pointer gap-2">
          <ExternalLink className="h-4 w-4" />
          View on BaseScan
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer gap-2 text-destructive focus:text-destructive">
          <LogOut className="h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
