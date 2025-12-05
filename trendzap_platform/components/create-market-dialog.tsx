"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Link2, Sparkles, TrendingUp, DollarSign } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export function CreateMarketDialog() {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [previewData, setPreviewData] = useState<any>(null)
  const [step, setStep] = useState<"url" | "details" | "bet">("url")

  const analyzeUrl = async () => {
    setIsAnalyzing(true)
    // Simulate URL analysis
    setTimeout(() => {
      setPreviewData({
        platform: "tiktok",
        thumbnail: "/viral-dance-tiktok.jpg",
        currentViews: 45230,
        currentLikes: 12340,
        suggestedTitle: "Will this dance trend go viral?",
      })
      setIsAnalyzing(false)
      setStep("details")
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
          <Plus className="h-4 w-4" />
          {"Create Market"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{"Create a Market"}</DialogTitle>
          <DialogDescription>{"Turn any viral content into a prediction market in 8 seconds"}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2">
            <div className={`h-2 w-20 rounded-full ${step === "url" ? "bg-primary" : "bg-primary/30"}`} />
            <div className={`h-2 w-20 rounded-full ${step === "details" ? "bg-primary" : "bg-primary/30"}`} />
            <div className={`h-2 w-20 rounded-full ${step === "bet" ? "bg-primary" : "bg-primary/30"}`} />
          </div>

          {/* Step 1: URL Input */}
          {step === "url" && (
            <div className="space-y-4 animate-slide-up">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                  <Link2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{"Paste Content URL"}</h3>
                <p className="text-sm text-muted-foreground">{"Supports TikTok, YouTube, X, and Instagram"}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">{"Content URL"}</Label>
                <Input
                  id="url"
                  placeholder="https://tiktok.com/@user/video/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="gap-2 bg-transparent" disabled>
                  <img src="/placeholder.svg?height=16&width=16" alt="TikTok" className="h-4 w-4" />
                  {"TikTok"}
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent" disabled>
                  <img src="/placeholder.svg?height=16&width=16" alt="YouTube" className="h-4 w-4" />
                  {"YouTube"}
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent" disabled>
                  <img src="/placeholder.svg?height=16&width=16" alt="X" className="h-4 w-4" />
                  {"X / Twitter"}
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent" disabled>
                  <img src="/placeholder.svg?height=16&width=16" alt="Instagram" className="h-4 w-4" />
                  {"Instagram"}
                </Button>
              </div>

              <Button className="w-full gap-2" size="lg" onClick={analyzeUrl} disabled={!url || isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <Sparkles className="h-5 w-5 animate-spin" />
                    {"Analyzing..."}
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    {"Analyze & Continue"}
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Step 2: Market Details */}
          {step === "details" && previewData && (
            <div className="space-y-4 animate-slide-up">
              {/* Content Preview */}
              <div className="rounded-lg overflow-hidden border border-border">
                <div className="relative h-40">
                  <img
                    src={previewData.thumbnail || "/placeholder.svg"}
                    alt="Content preview"
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground border-0">
                    {previewData.platform.toUpperCase()}
                  </Badge>
                </div>
                <div className="p-3 bg-card space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{"Current Views"}</span>
                    <span className="font-mono font-semibold">{previewData.currentViews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{"Current Likes"}</span>
                    <span className="font-mono font-semibold">{previewData.currentLikes.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Market Details Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{"Market Title (Optional)"}</Label>
                  <Textarea id="title" placeholder={previewData.suggestedTitle} rows={2} className="resize-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="metric">{"Metric"}</Label>
                    <Select defaultValue="views">
                      <SelectTrigger id="metric">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="views">{"Views"}</SelectItem>
                        <SelectItem value="likes">{"Likes"}</SelectItem>
                        <SelectItem value="comments">{"Comments"}</SelectItem>
                        <SelectItem value="shares">{"Shares"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="threshold">{"Threshold"}</Label>
                    <Input id="threshold" type="number" placeholder="1000000" className="font-mono" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">{"Resolution Time"}</Label>
                  <Select defaultValue="24h">
                    <SelectTrigger id="deadline">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">{"1 hour"}</SelectItem>
                      <SelectItem value="6h">{"6 hours"}</SelectItem>
                      <SelectItem value="24h">{"24 hours"}</SelectItem>
                      <SelectItem value="3d">{"3 days"}</SelectItem>
                      <SelectItem value="7d">{"7 days"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep("url")} className="flex-1">
                  {"Back"}
                </Button>
                <Button onClick={() => setStep("bet")} className="flex-1 gap-2">
                  {"Continue"}
                  <TrendingUp className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Place Initial Bet */}
          {step === "bet" && (
            <div className="space-y-4 animate-slide-up">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{"Place Your Bet"}</h3>
                <p className="text-sm text-muted-foreground">{"Choose your position and amount"}</p>
              </div>

              {/* Bet Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">{"Bet Amount (USDC)"}</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="amount" type="number" placeholder="100" className="pl-9 text-lg font-mono" />
                </div>
                <div className="flex gap-2">
                  {[10, 50, 100, 500].map((amount) => (
                    <Button key={amount} variant="outline" size="sm" className="flex-1 bg-transparent">
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Position Selection */}
              <div className="space-y-2">
                <Label>{"Your Position"}</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button className="group relative p-4 rounded-lg border-2 border-primary bg-primary/5 hover:bg-primary/10 transition-all">
                    <div className="text-center space-y-2">
                      <TrendingUp className="h-8 w-8 mx-auto text-primary" />
                      <div className="font-bold text-lg">{"Over"}</div>
                      <div className="text-xs text-muted-foreground">{"Will exceed threshold"}</div>
                    </div>
                    <div className="absolute inset-0 border-2 border-primary rounded-lg" />
                  </button>

                  <button className="group relative p-4 rounded-lg border-2 border-border hover:border-destructive hover:bg-destructive/5 transition-all">
                    <div className="text-center space-y-2">
                      <TrendingUp className="h-8 w-8 mx-auto text-muted-foreground rotate-180 group-hover:text-destructive transition-colors" />
                      <div className="font-bold text-lg">{"Under"}</div>
                      <div className="text-xs text-muted-foreground">{"Will not exceed threshold"}</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 bg-muted/50 rounded-lg space-y-2 border border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{"Your bet"}</span>
                  <span className="font-mono font-semibold">{"$100 USDC"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{"Position"}</span>
                  <span className="font-semibold text-primary">{"Over"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{"Potential return"}</span>
                  <span className="font-mono font-semibold text-primary">{"~$180 USDC"}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-border">
                  <span className="text-muted-foreground">{"Platform fee (3%)"}</span>
                  <span className="font-mono text-xs">{"$3.00"}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep("details")} className="flex-1">
                  {"Back"}
                </Button>
                <Button
                  className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                  size="lg"
                  onClick={() => {
                    setOpen(false)
                    setStep("url")
                    setUrl("")
                    setPreviewData(null)
                  }}
                >
                  <Sparkles className="h-5 w-5" />
                  {"Create & Zap"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
