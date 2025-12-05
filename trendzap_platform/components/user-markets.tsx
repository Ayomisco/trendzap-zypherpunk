import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign } from "lucide-react"

const MOCK_MARKETS = [
  {
    id: "5",
    title: "My viral dance prediction",
    platform: "tiktok",
    bets: 234,
    pool: 20800,
    status: "active",
  },
  {
    id: "6",
    title: "Tech review market",
    platform: "youtube",
    bets: 156,
    pool: 15600,
    status: "active",
  },
]

export function UserMarkets() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{"Markets I Created"}</h3>

      <div className="space-y-3">
        {MOCK_MARKETS.map((market) => (
          <div
            key={market.id}
            className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{market.platform.toUpperCase()}</Badge>
                  <Badge className="bg-primary/10 text-primary border-primary/20">{"Active"}</Badge>
                </div>
                <h4 className="font-semibold text-sm">{market.title}</h4>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{market.bets} bets</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span className="font-mono">${market.pool.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
