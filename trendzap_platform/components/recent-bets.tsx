"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

interface RecentBetsProps {
  marketId: string
}

const MOCK_BETS = [
  { user: "cryptowhale", amount: 500, position: "over", time: "2m ago", avatar: "CW" },
  { user: "trendmaster", amount: 250, position: "under", time: "5m ago", avatar: "TM" },
  { user: "viralking", amount: 1000, position: "over", time: "8m ago", avatar: "VK" },
  { user: "betqueen", amount: 150, position: "under", time: "12m ago", avatar: "BQ" },
  { user: "zapgod", amount: 750, position: "over", time: "15m ago", avatar: "ZG" },
]

export function RecentBets({ marketId }: RecentBetsProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{"Recent Bets"}</h3>
      <div className="space-y-3">
        {MOCK_BETS.map((bet, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">{bet.avatar}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">@{bet.user}</span>
                <Badge
                  variant="outline"
                  className={`gap-1 ${
                    bet.position === "over"
                      ? "border-primary/30 text-primary"
                      : "border-destructive/30 text-destructive"
                  }`}
                >
                  {bet.position === "over" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {bet.position}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">{bet.time}</div>
            </div>

            <div className="text-right">
              <div className="font-mono font-semibold">${bet.amount}</div>
              <div className="text-xs text-muted-foreground">{"USDC"}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
