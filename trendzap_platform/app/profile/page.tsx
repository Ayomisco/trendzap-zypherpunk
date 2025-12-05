"use client"

import { Navigation } from "@/components/navigation"
import { UserProfile } from "@/components/user-profile"
import { UserStats } from "@/components/user-stats"
import { UserBets } from "@/components/user-bets"
import { UserMarkets } from "@/components/user-markets"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Trophy } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1">
        {/* Mobile: Stacked layout, Desktop: 3-column grid */}
        <div className="container mx-auto px-4 py-6">
          {/* Desktop: 3-column grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <UserProfile />
              <UserStats />
            </div>

            <div className="lg:col-span-2 space-y-6">
              <UserBets />
              <UserMarkets />
            </div>
          </div>

          {/* Mobile/Tablet: Tabbed interface */}
          <div className="lg:hidden">
            <div className="mb-6">
              <UserProfile />
            </div>

            <Tabs defaultValue="stats" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="stats" className="gap-2">
                  <Trophy className="h-4 w-4 hidden sm:block" />
                  <span>Stats</span>
                </TabsTrigger>
                <TabsTrigger value="bets" className="gap-2">
                  <Zap className="h-4 w-4 hidden sm:block" />
                  <span>Bets</span>
                </TabsTrigger>
                <TabsTrigger value="markets" className="gap-2">
                  <Trophy className="h-4 w-4 hidden sm:block" />
                  <span>Markets</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="space-y-6">
                <UserStats />
              </TabsContent>

              <TabsContent value="bets" className="space-y-6">
                <UserBets />
              </TabsContent>

              <TabsContent value="markets" className="space-y-6">
                <UserMarkets />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
