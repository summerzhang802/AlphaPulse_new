import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, ImpactBadge } from "@/components/app/Layout";
import { watchlist, dailyBrief, decisionLog } from "@/lib/mock-data";
import { Eye, Newspaper, Activity, BookOpen, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AlphaPulse — AI Stock News for Beginner Investors" },
      { name: "description", content: "Understand stock news in plain English. Track your watchlist, read your daily brief, and log decisions with confidence." },
      { property: "og:title", content: "AlphaPulse — AI Stock News for Beginner Investors" },
      { property: "og:description", content: "Your calm, AI-powered investing assistant." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const newsToday = watchlist.reduce((s, w) => s + w.news, 0);
  const stats = [
    { label: "Tracked stocks", value: watchlist.length, icon: Eye, hint: "Across your watchlist" },
    { label: "News today", value: newsToday, icon: Newspaper, hint: "AI-summarized for you" },
    { label: "Market mood", value: "Cautiously bullish", icon: Activity, hint: "Based on your stocks" },
    { label: "Decisions logged", value: decisionLog.length, icon: BookOpen, hint: "This month" },
  ];

  return (
    <AppLayout>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl p-8 sm:p-12 mb-10 text-primary-foreground shadow-[var(--shadow-elevated)]" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -left-10 -bottom-20 h-56 w-56 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="relative max-w-2xl animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Your AI investing assistant
          </div>
          <h1 className="mt-5 text-3xl sm:text-5xl font-semibold tracking-tight leading-tight">
            Stock news, finally explained for humans.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 leading-relaxed">
            AlphaPulse cuts the noise. Get a daily brief, simplify any headline, and track every decision — all in one calm dashboard.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/daily-brief" className="inline-flex items-center gap-2 rounded-xl bg-primary-foreground text-primary px-5 py-2.5 text-sm font-medium hover:opacity-90 transition">
              Read today's brief <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/simplifier" className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/30 px-5 py-2.5 text-sm font-medium hover:bg-primary-foreground/10 transition">
              Try AI Simplifier
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {stats.map(({ label, value, icon: Icon, hint }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition">
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4 text-2xl font-semibold tracking-tight">{value}</div>
            <div className="text-sm font-medium text-foreground mt-1">{label}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{hint}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Watchlist preview */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold">Your watchlist</h2>
              <p className="text-sm text-muted-foreground">A quick pulse on the stocks you follow.</p>
            </div>
            <Link to="/watchlist" className="text-sm text-primary font-medium hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {watchlist.slice(0, 4).map((s) => {
              const positive = s.change >= 0;
              return (
                <div key={s.ticker} className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-3 hover:bg-secondary/50 transition">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary text-xs font-semibold">{s.ticker}</div>
                    <div>
                      <div className="text-sm font-medium">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.news} news today</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">${s.price.toFixed(2)}</div>
                    <div className={`text-xs flex items-center gap-1 justify-end ${positive ? "text-bullish" : "text-bearish"}`}>
                      {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {positive ? "+" : ""}{s.change.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brief preview */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold">Today's brief</h2>
              <p className="text-sm text-muted-foreground">Top 3 only.</p>
            </div>
          </div>
          <div className="space-y-4">
            {dailyBrief.map((b) => (
              <div key={b.ticker} className="border-l-2 border-primary/30 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-primary">{b.ticker}</span>
                  <ImpactBadge impact={b.impact} />
                </div>
                <p className="text-sm leading-snug text-foreground">{b.headline}</p>
              </div>
            ))}
          </div>
          <Link to="/daily-brief" className="mt-5 inline-flex text-sm text-primary font-medium hover:underline">Read full brief →</Link>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        AlphaPulse provides educational insights, not financial advice.
      </p>
    </AppLayout>
  );
}
