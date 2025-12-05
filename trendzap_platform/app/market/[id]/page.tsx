import { Navigation } from "@/components/navigation"
import { MarketDetailView } from "@/components/market-detail-view"
import { RecentBets } from "@/components/recent-bets"
import { SimilarMarkets } from "@/components/similar-markets"

export default function MarketPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MarketDetailView marketId={params.id} />
            <RecentBets marketId={params.id} />
          </div>

          <div className="space-y-6">
            <SimilarMarkets />
          </div>
        </div>
      </main>
    </div>
  )
}
