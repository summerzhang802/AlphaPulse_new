import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, ImpactBadge } from "@/components/app/Layout";
import { Sunrise } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/daily-brief")({
  head: () => ({
    meta: [
      { title: "Daily Brief — AlphaPulse" },
      {
        name: "description",
        content:
          "The 3 things from your watchlist worth knowing today, summarized in plain English.",
      },
      { property: "og:title", content: "Daily Brief — AlphaPulse" },
      {
        property: "og:description",
        content: "Your curated 3-minute investor digest.",
      },
    ],
  }),
  component: BriefPage,
});

type BriefItem = {
  ticker: string;
  headline: string;
  explanation: string;
  impact: "Bullish" | "Bearish" | "Neutral";
};

const API_BASE = import.meta.env.VITE_API_URL;

function BriefPage() {
  const [briefs, setBriefs] = useState<BriefItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    async function fetchDailyBrief() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/daily_brief`);
        if (!res.ok) {
          throw new Error(`Failed to fetch daily brief: ${res.status}`);
        }

        const data = await res.json();
        setBriefs(data);
      } catch (err) {
        console.error("daily brief fetch error:", err);
        setError("Could not load daily brief.");
      } finally {
        setLoading(false);
      }
    }

    fetchDailyBrief();
  }, []);

  return (
    <AppLayout>
      <PageHeader
        title="Daily Brief"
        description="Three insights from your watchlist, hand-picked to cut through the noise. Read it in under 3 minutes."
      />

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Sunrise className="h-4 w-4 text-accent" />
        <span className="font-medium text-foreground">{today}</span>
        <span className="text-border">·</span>
        <span>{briefs.length} insights</span>
      </div>

      {loading && (
        <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground shadow-[var(--shadow-card)]">
          Loading daily brief...
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-bearish/20 bg-bearish/5 p-6 text-sm text-bearish shadow-[var(--shadow-card)]">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-4">
          {briefs.map((b, i) => (
            <article
              key={`${b.ticker}-${i}`}
              className="group rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition animate-fade-in"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/5 text-[11px] font-semibold text-primary tabular-nums">
                    {i + 1}
                  </div>
                  <span className="text-sm font-semibold tracking-tight text-foreground">
                    {b.ticker}
                  </span>
                  <span className="text-xs text-muted-foreground">NASDAQ</span>
                </div>
                <ImpactBadge impact={b.impact} />
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold leading-snug tracking-tight text-foreground">
                {b.headline}
              </h2>

              <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-muted-foreground max-w-3xl">
                {b.explanation}
              </p>
            </article>
          ))}

          {!loading && briefs.length === 0 && (
            <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground shadow-[var(--shadow-card)]">
              No daily brief available right now.
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
}
