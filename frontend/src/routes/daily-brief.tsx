import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, ImpactBadge } from "@/components/app/Layout";
import { dailyBrief } from "@/lib/mock-data";
import { Sunrise } from "lucide-react";

export const Route = createFileRoute("/daily-brief")({
  head: () => ({
    meta: [
      { title: "Daily Brief — AlphaPulse" },
      { name: "description", content: "The 3 things from your watchlist worth knowing today, summarized in plain English." },
      { property: "og:title", content: "Daily Brief — AlphaPulse" },
      { property: "og:description", content: "Your curated 3-minute investor digest." },
    ],
  }),
  component: BriefPage,
});

function BriefPage() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  return (
    <AppLayout>
      <PageHeader title="Daily Brief" description="Three insights from your watchlist, hand-picked to cut through the noise. Read it in under 3 minutes." />
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Sunrise className="h-4 w-4 text-accent" />
        {today}
      </div>
      <div className="space-y-5">
        {dailyBrief.map((b, i) => (
          <article key={b.ticker} className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition animate-fade-in">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/5 text-xs font-semibold text-primary">{i + 1}</div>
              <span className="text-sm font-semibold tracking-wide text-primary">{b.ticker}</span>
              <ImpactBadge impact={b.impact} />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold leading-snug text-foreground">{b.headline}</h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">{b.explanation}</p>
          </article>
        ))}
      </div>
    </AppLayout>
  );
}
