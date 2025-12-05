import { Card } from "@/components/ui/card"
import { TrendingUp, Target, DollarSign, Zap } from "lucide-react"

export function UserStats() {
  const stats = [
    { label: "Total Profit", value: "$45,234", icon: DollarSign, color: "text-primary" },
    { label: "Win Rate", value: "78.5%", icon: Target, color: "text-accent" },
    { label: "Total Bets", value: "432", icon: Zap, color: "text-secondary" },
    { label: "Markets Created", value: "23", icon: TrendingUp, color: "text-primary" },
  ]

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{"Stats"}</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center space-y-2">
            <stat.icon className={`h-5 w-5 mx-auto ${stat.color}`} />
            <div className="text-2xl font-bold font-mono">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}
