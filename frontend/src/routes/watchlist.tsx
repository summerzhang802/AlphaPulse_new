import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, ActionPill } from "@/components/app/Layout";
import { watchlist } from "@/lib/mock-data";
import { ArrowUpRight, ArrowDownRight, Newspaper } from "lucide-react";

export const Route = createFileRoute("/watchlist")({
  head: () => ({
    meta: [
      { title: "Watchlist — AlphaPulse" },
      { name: "description", content: "Track the stocks you care about with risk index and suggested actions in plain English." },
      { property: "og:title", content: "Watchlist — AlphaPulse" },
      { property: "og:description", content: "Risk index and suggested actions for your stocks." },
    ],
  }),
  component: WatchlistPage,
});

function riskColor(r: number) {
  if (r < 30) return "bg-bullish";
  if (r < 60) return "bg-amber-500";
  return "bg-bearish";
}

function WatchlistPage() {
  return (
    <AppLayout>
      <PageHeader title="Watchlist" description="The stocks you follow, organized with a simple risk index and a clear suggested next step." />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {watchlist.map((s) => {
          const positive = s.change >= 0;
          return (
            <div key={s.ticker} className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:-translate-y-0.5 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-semibold tracking-tight">
                    {s.ticker}
                  </div>
                  <div>
                    <div className="text-base font-semibold">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.ticker} • NASDAQ</div>
                  </div>
                </div>
                <ActionPill action={s.action} />
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <div className="text-2xl font-semibold tracking-tight">${s.price.toFixed(2)}</div>
                  <div className={`text-sm flex items-center gap-1 ${positive ? "text-bullish" : "text-bearish"}`}>
                    {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                    {positive ? "+" : ""}{s.change.toFixed(2)}% today
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground flex items-center gap-1.5">
                  <Newspaper className="h-3.5 w-3.5" /> {s.news} news
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Risk index</span>
                  <span className="font-medium text-foreground">{s.risk}/100</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                  <div className={`h-full rounded-full ${riskColor(s.risk)} transition-all`} style={{ width: `${s.risk}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
