import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, ActionPill } from "@/components/app/Layout";
import { ArrowUpRight, ArrowDownRight, Newspaper } from "lucide-react";
import { useEffect, useState } from "react";

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

type WatchlistItem = {
  ticker: string;
  name: string;
  news: number;
  risk: number;
  action: "Monitor" | "Hold" | "Reduce Risk";
  price: number;
  change: number;
};

const API_BASE = import.meta.env.VITE_API_URL;

function riskColor(r: number) {
  if (r < 30) return "bg-bullish";
  if (r < 60) return "bg-amber-500";
  return "bg-bearish";
}

function WatchlistPage() {
  const [stocks, setStocks] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWatchlist() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/watchlist`);
        if (!res.ok) {
          throw new Error("Failed to fetch watchlist");
        }

        const data = await res.json();
        setStocks(data);
      } catch (err) {
        console.error(err);
        setError("Could not load watchlist data.");
      } finally {
        setLoading(false);
      }
    }

    fetchWatchlist();
  }, []);

  return (
    <AppLayout>
      <PageHeader
        title="Watchlist"
        description="The stocks you follow, organized with a simple risk index and a clear suggested next step."
      />

      {loading && (
        <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground shadow-[var(--shadow-card)]">
          Loading watchlist...
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-bearish/20 bg-bearish/5 p-6 text-sm text-bearish shadow-[var(--shadow-card)]">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {stocks.map((s) => {
            const positive = s.change >= 0;

            return (
              <div
                key={s.ticker}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground text-[11px] font-semibold tracking-wide">
                      {s.ticker}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold tracking-tight text-foreground truncate">
                        {s.ticker}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {s.name} · NASDAQ
                      </div>
                    </div>
                  </div>
                  <ActionPill action={s.action} />
                </div>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">
                      ${s.price.toFixed(2)}
                    </div>
                    <div
                      className={`mt-1 text-sm font-medium flex items-center gap-1 tabular-nums ${
                        positive ? "text-bullish" : "text-bearish"
                      }`}
                    >
                      {positive ? (
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowDownRight className="h-3.5 w-3.5" />
                      )}
                      {positive ? "+" : ""}
                      {s.change.toFixed(2)}% today
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground flex items-center gap-1.5 rounded-full bg-secondary/60 px-2.5 py-1">
                    <Newspaper className="h-3.5 w-3.5" />
                    {s.news} news today
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-border/60">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-muted-foreground">Risk index</span>
                    <span className="font-semibold text-foreground tabular-nums">
                      {s.risk}
                      <span className="text-muted-foreground font-normal">/100</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full rounded-full ${riskColor(s.risk)} transition-all`}
                      style={{ width: `${s.risk}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
}
