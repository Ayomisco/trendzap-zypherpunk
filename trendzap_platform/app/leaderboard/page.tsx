import { Navigation } from "@/components/navigation"
import { Leaderboard } from "@/components/leaderboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Flame, Clock } from "lucide-react"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/40">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-secondary/10 to-primary/10" />

          <div className="container relative py-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <Trophy className="h-8 w-8 text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
                  {"Leaderboard"}
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {"Top trend predictors ranked by profit, accuracy, and volume"}
              </p>
            </div>
          </div>
        </section>

        <section className="container py-8">
          <Tabs defaultValue="all-time" className="space-y-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="all-time" className="gap-2">
                <Trophy className="h-4 w-4" />
                {"All Time"}
              </TabsTrigger>
              <TabsTrigger value="weekly" className="gap-2">
                <Flame className="h-4 w-4" />
                {"This Week"}
              </TabsTrigger>
              <TabsTrigger value="daily" className="gap-2">
                <Clock className="h-4 w-4" />
                {"Today"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all-time">
              <Leaderboard timeframe="all-time" />
            </TabsContent>
            <TabsContent value="weekly">
              <Leaderboard timeframe="weekly" />
            </TabsContent>
            <TabsContent value="daily">
              <Leaderboard timeframe="daily" />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  )
}
