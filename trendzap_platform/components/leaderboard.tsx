"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, TrendingUp, Target, Zap } from "lucide-react"

interface LeaderboardProps {
  timeframe: "all-time" | "weekly" | "daily"
}

const MOCK_LEADERS = [
  {
    rank: 1,
    username: "cryptowhale",
    avatar: "CW",
    profit: 45234,
    winRate: 78.5,
    totalBets: 432,
    badges: ["whale", "streak"],
  },
  {
    rank: 2,
    username: "trendmaster",
    avatar: "TM",
    profit: 38901,
    winRate: 72.3,
    totalBets: 389,
    badges: ["creator"],
  },
  {
    rank: 3,
    username: "viralking",
    avatar: "VK",
    profit: 32567,
    winRate: 81.2,
    totalBets: 234,
    badges: ["accurate"],
  },
  {
    rank: 4,
    username: "betqueen",
    avatar: "BQ",
    profit: 28934,
    winRate: 69.8,
    totalBets: 567,
    badges: ["volume"],
  },
  {
    rank: 5,
    username: "zapgod",
    avatar: "ZG",
    profit: 24123,
    winRate: 75.4,
    totalBets: 312,
    badges: [],
  },
  {
    rank: 6,
    username: "tiktokoracle",
    avatar: "TO",
    profit: 21456,
    winRate: 68.9,
    totalBets: 445,
    badges: ["tiktok"],
  },
  {
    rank: 7,
    username: "memelord",
    avatar: "ML",
    profit: 19234,
    winRate: 71.2,
    totalBets: 278,
    badges: [],
  },
  {
    rank: 8,
    username: "culturevulture",
    avatar: "CV",
    profit: 17890,
    winRate: 73.6,
    totalBets: 356,
    badges: [],
  },
  {
    rank: 9,
    username: "trendhunter",
    avatar: "TH",
    profit: 16234,
    winRate: 70.1,
    totalBets: 423,
    badges: [],
  },
  {
    rank: 10,
    username: "vibesensor",
    avatar: "VS",
    profit: 14567,
    winRate: 67.8,
    totalBets: 298,
    badges: [],
  },
]

const getBadgeInfo = (badge: string) => {
  const badges: Record<string, { label: string; color: string; icon: any }> = {
    whale: { label: "Whale", color: "bg-primary/10 text-primary border-primary/20", icon: Trophy },
    streak: { label: "Hot Streak", color: "bg-destructive/10 text-destructive border-destructive/20", icon: Zap },
    creator: { label: "Market Maker", color: "bg-secondary/10 text-secondary border-secondary/20", icon: TrendingUp },
    accurate: { label: "Sniper", color: "bg-accent/10 text-accent border-accent/20", icon: Target },
    volume: { label: "High Volume", color: "bg-primary/10 text-primary border-primary/20", icon: TrendingUp },
    tiktok: { label: "TikTok Expert", color: "bg-[#FF0050]/10 text-[#FF0050] border-[#FF0050]/20", icon: TrendingUp },
  }
  return badges[badge] || badges.whale
}

export function Leaderboard({ timeframe }: LeaderboardProps) {
  const getRankStyle = (rank: number) => {
    if (rank === 1) return "from-[#FFD700] to-[#FFA500]" // Gold
    if (rank === 2) return "from-[#C0C0C0] to-[#A8A8A8]" // Silver
    if (rank === 3) return "from-[#CD7F32] to-[#8B4513]" // Bronze
    return ""
  }

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-[#FFD700]"
    if (rank === 2) return "text-[#C0C0C0]"
    if (rank === 3) return "text-[#CD7F32]"
    return "text-muted-foreground"
  }

  return (
    <div className="space-y-4">
      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {MOCK_LEADERS.slice(0, 3).map((leader) => (
          <Card
            key={leader.rank}
            className={`p-6 text-center relative overflow-hidden ${
              leader.rank === 1 ? "md:col-start-2 md:order-first" : ""
            }`}
          >
            {leader.rank <= 3 && (
              <div className={`absolute inset-0 bg-gradient-to-br ${getRankStyle(leader.rank)} opacity-5`} />
            )}

            <div className="relative">
              <div className="relative inline-block mb-4">
                <Avatar className="h-20 w-20 border-4 border-primary/20">
                  <AvatarFallback
                    className={`text-2xl font-bold ${
                      leader.rank === 1
                        ? "bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-black"
                        : leader.rank === 2
                          ? "bg-gradient-to-br from-[#C0C0C0] to-[#A8A8A8] text-black"
                          : "bg-gradient-to-br from-[#CD7F32] to-[#8B4513] text-black"
                    }`}
                  >
                    {leader.avatar}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${getRankStyle(leader.rank)} flex items-center justify-center font-bold text-black text-sm shadow-lg`}
                >
                  {leader.rank}
                </div>
              </div>

              <div className="font-bold text-lg mb-1">@{leader.username}</div>
              <div className="text-2xl font-mono font-bold text-primary mb-2">+${leader.profit.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">{leader.winRate}% win rate</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Rest of leaderboard */}
      <Card className="divide-y divide-border">
        {MOCK_LEADERS.slice(3).map((leader, index) => (
          <div key={leader.rank} className="p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`text-2xl font-bold font-mono w-12 text-center ${getRankColor(leader.rank)}`}>
                {leader.rank}
              </div>

              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">{leader.avatar}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">@{leader.username}</span>
                  {leader.badges.map((badge) => {
                    const badgeInfo = getBadgeInfo(badge)
                    return (
                      <Badge key={badge} variant="outline" className={`text-xs gap-1 ${badgeInfo.color}`}>
                        <badgeInfo.icon className="h-3 w-3" />
                        {badgeInfo.label}
                      </Badge>
                    )
                  })}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{leader.totalBets} bets</span>
                  <span>•</span>
                  <span>{leader.winRate}% win rate</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-mono font-bold text-primary">+${leader.profit.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">{"Profit"}</div>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}
