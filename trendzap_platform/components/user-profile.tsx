"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Zap, Target, Settings } from "lucide-react"

export function UserProfile() {
  return (
    <Card className="p-6">
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <Avatar className="h-24 w-24 border-4 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">{"CW"}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
            <Badge className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black border-0 font-bold">{"#1"}</Badge>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-1">@cryptowhale</h2>
          <p className="text-sm text-muted-foreground">{"Joined December 2025"}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="outline" className="gap-1 bg-primary/10 text-primary border-primary/20">
            <Trophy className="h-3 w-3" />
            {"Whale"}
          </Badge>
          <Badge variant="outline" className="gap-1 bg-destructive/10 text-destructive border-destructive/20">
            <Zap className="h-3 w-3" />
            {"Hot Streak"}
          </Badge>
          <Badge variant="outline" className="gap-1 bg-accent/10 text-accent border-accent/20">
            <Target className="h-3 w-3" />
            {"Sniper"}
          </Badge>
        </div>

        <div className="pt-4 space-y-2">
          <Button className="w-full gap-2">
            <Zap className="h-4 w-4" />
            {"Create Market"}
          </Button>
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <Settings className="h-4 w-4" />
            {"Settings"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
