"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Clock, CheckCircle2, XCircle } from "lucide-react"

const MOCK_ACTIVE_BETS = [
  {
    id: "1",
    title: "Epic dance trend - 10M views?",
    platform: "tiktok",
    amount: 500,
    position: "over",
    currentOdds: "1.8x",
    endsIn: "18h 32m",
  },
  {
    id: "2",
    title: "iPhone review - 5M views?",
    platform: "youtube",
    amount: 250,
    position: "under",
    currentOdds: "2.1x",
    endsIn: "6h 15m",
  },
]

const MOCK_HISTORY = [
  {
    id: "3",
    title: "AI news thread - 50K likes?",
    platform: "x",
    amount: 1000,
    position: "over",
    result: "won",
    payout: 1800,
    resolvedAt: "2 hours ago",
  },
  {
    id: "4",
    title: "Fashion Reel - 3M views?",
    platform: "instagram",
    amount: 150,
    position: "under",
    result: "lost",
    payout: 0,
    resolvedAt: "5 hours ago",
  },
]

export function UserBets() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{"My Bets"}</h3>

      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="active">{"Active"}</TabsTrigger>
          <TabsTrigger value="history">{"History"}</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-3">
          {MOCK_ACTIVE_BETS.map((bet) => (
            <div
              key={bet.id}
              className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2">
                    {bet.platform.toUpperCase()}
                  </Badge>
                  <h4 className="font-semibold text-sm">{bet.title}</h4>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {bet.endsIn}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`gap-1 ${
                      bet.position === "over"
                        ? "border-primary/30 text-primary"
                        : "border-destructive/30 text-destructive"
                    }`}
                  >
                    {bet.position === "over" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {bet.position}
                  </Badge>
                  <span className="font-mono font-semibold">${bet.amount}</span>
                </div>
                <div className="text-primary font-semibold">{bet.currentOdds}</div>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="history" className="space-y-3">
          {MOCK_HISTORY.map((bet) => (
            <div
              key={bet.id}
              className={`p-4 rounded-lg border ${
                bet.result === "won" ? "border-primary/20 bg-primary/5" : "border-destructive/20 bg-destructive/5"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{bet.platform.toUpperCase()}</Badge>
                    {bet.result === "won" ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <h4 className="font-semibold text-sm">{bet.title}</h4>
                </div>
                <div className="text-xs text-muted-foreground">{bet.resolvedAt}</div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`gap-1 ${
                      bet.position === "over"
                        ? "border-primary/30 text-primary"
                        : "border-destructive/30 text-destructive"
                    }`}
                  >
                    {bet.position === "over" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {bet.position}
                  </Badge>
                  <span className="font-mono">${bet.amount}</span>
                </div>
                <div
                  className={`font-mono font-semibold ${bet.result === "won" ? "text-primary" : "text-destructive"}`}
                >
                  {bet.result === "won" ? "+" : ""}
                  {bet.result === "won" ? bet.payout : -bet.amount}
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </Card>
  )
}
