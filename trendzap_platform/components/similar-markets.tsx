import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import Link from "next/link"

const SIMILAR = [
  {
    id: "2",
    platform: "youtube",
    title: "iPhone 16 Review - 5M views?",
    endsIn: "6h 15m",
    pool: 39000,
  },
  {
    id: "5",
    platform: "tiktok",
    title: "Viral pasta recipe - 20M views?",
    endsIn: "4d 8h",
    pool: 33000,
  },
  {
    id: "3",
    platform: "x",
    title: "AI news thread - 50K likes?",
    endsIn: "12h 48m",
    pool: 21000,
  },
]

export function SimilarMarkets() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{"Similar Markets"}</h3>
      <div className="space-y-3">
        {SIMILAR.map((market) => (
          <Link key={market.id} href={`/market/${market.id}`}>
            <div className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant="outline" className="shrink-0">
                  {market.platform.toUpperCase()}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {market.endsIn}
                </div>
              </div>
              <h4 className="text-sm font-medium mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {market.title}
              </h4>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{"Pool"}</span>
                <span className="font-mono font-semibold">${market.pool.toLocaleString()}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  )
}
