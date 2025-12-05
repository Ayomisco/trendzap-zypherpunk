"use client"

import { useState } from "react"
import { MarketCard } from "@/components/market-card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

// Extended mock data
const MOCK_MARKETS = [
  {
    id: "1",
    platform: "tiktok" as const,
    thumbnail: "/viral-dance-tiktok.jpg",
    title: "Epic dance trend taking over FYP - Will it hit 10M views?",
    metric: "Views",
    threshold: 10000000,
    currentValue: 4235000,
    overPool: 12500,
    underPool: 8300,
    totalBets: 234,
    endsIn: "18h 32m",
    creator: "trendmaster",
  },
  {
    id: "2",
    platform: "youtube" as const,
    thumbnail: "/tech-review-youtube.jpg",
    title: "iPhone 16 Review - Can it reach 5M views in 24h?",
    metric: "Views",
    threshold: 5000000,
    currentValue: 2847000,
    overPool: 23400,
    underPool: 15600,
    totalBets: 512,
    endsIn: "6h 15m",
    creator: "cryptowhale",
  },
  {
    id: "3",
    platform: "x" as const,
    thumbnail: "/viral-tweet-tech.jpg",
    title: "Breaking AI news thread - Will it get 50K likes?",
    metric: "Likes",
    threshold: 50000,
    currentValue: 28430,
    overPool: 8900,
    underPool: 12100,
    totalBets: 189,
    endsIn: "12h 48m",
    creator: "aispeculator",
  },
  {
    id: "4",
    platform: "instagram" as const,
    thumbnail: "/fashion-reel-instagram.jpg",
    title: "New fashion trend Reel - Will it reach 3M views?",
    metric: "Views",
    threshold: 3000000,
    currentValue: 1524000,
    overPool: 15200,
    underPool: 9800,
    totalBets: 376,
    endsIn: "23h 12m",
    creator: "fashionista",
  },
  {
    id: "5",
    platform: "tiktok" as const,
    thumbnail: "/cooking-recipe-viral.jpg",
    title: "Viral pasta recipe - Can it hit 20M views this week?",
    metric: "Views",
    threshold: 20000000,
    currentValue: 8920000,
    overPool: 18700,
    underPool: 14300,
    totalBets: 445,
    endsIn: "4d 8h",
    creator: "foodiepro",
  },
  {
    id: "6",
    platform: "youtube" as const,
    thumbnail: "/gaming-highlight-youtube.jpg",
    title: "Insane gaming clutch - Will it break 1M views?",
    metric: "Views",
    threshold: 1000000,
    currentValue: 687000,
    overPool: 6700,
    underPool: 5300,
    totalBets: 167,
    endsIn: "1d 4h",
    creator: "gamerdegen",
  },
]

interface MarketFeedProps {
  title?: string
  description?: string
}

export function MarketFeed({
  title = "Live Markets",
  description = "Trending predictions ending soon",
}: MarketFeedProps) {
  const [markets, setMarkets] = useState(MOCK_MARKETS)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)

  const loadMore = () => {
    setIsLoading(true)
    // Simulate loading
    setTimeout(() => {
      setMarkets((prev) => [...prev, ...MOCK_MARKETS])
      setPage((p) => p + 1)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button variant="outline" size="sm">
          {"View All"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.map((market, index) => (
          <MarketCard key={`${market.id}-${index}`} {...market} />
        ))}
      </div>

      {/* Load more */}
      <div className="flex justify-center">
        <Button variant="outline" size="lg" className="gap-2 bg-transparent" onClick={loadMore} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {"Loading..."}
            </>
          ) : (
            <>{"Load More Markets"}</>
          )}
        </Button>
      </div>
    </div>
  )
}
