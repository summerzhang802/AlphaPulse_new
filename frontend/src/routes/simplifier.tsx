import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, ImpactBadge } from "@/components/app/Layout";
import { useState } from "react";
import { Sparkles, Wand2, FileText, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/simplifier")({
  head: () => ({
    meta: [
      { title: "AI News Simplifier — AlphaPulse" },
      { name: "description", content: "Paste any stock headline and get a beginner-friendly summary plus impact classification." },
      { property: "og:title", content: "AI News Simplifier — AlphaPulse" },
      { property: "og:description", content: "Turn complex headlines into plain English." },
    ],
  }),
  component: SimplifierPage,
});

type Result = { summary: string; impact: "Bullish" | "Bearish" | "Neutral" };

function fakeSimplify(ticker: string, headline: string): Result {
  const h = headline.toLowerCase();
  const positive = ["beat", "surge", "record", "strong", "growth", "profit", "demand", "expands", "wins"];
  const negative = ["miss", "drop", "fall", "cut", "lawsuit", "decline", "weak", "loss", "warns"];
  let score = 0;
  positive.forEach((w) => h.includes(w) && score++);
  negative.forEach((w) => h.includes(w) && score--);
  const impact: Result["impact"] = score > 0 ? "Bullish" : score < 0 ? "Bearish" : "Neutral";
  const summary = `${ticker.toUpperCase()} — ${headline.trim()} In simple terms: this story suggests ${
    impact === "Bullish"
      ? "the company is doing better than expected, which investors usually take as a good sign."
      : impact === "Bearish"
      ? "the company is facing pressure that could weigh on its share price in the short term."
      : "no major change in the company's direction — it's worth monitoring without acting."
  }`;
  return { summary, impact };
}

function SimplifierPage() {
  const [ticker, setTicker] = useState("AAPL");
  const [headline, setHeadline] = useState("Apple reported stronger-than-expected earnings driven by high iPhone demand.");
  const [result, setResult] = useState<Result | null>(null);

  return (
    <AppLayout>
      <PageHeader title="AI News Simplifier" description="Paste any stock headline. We'll translate it into plain English and tell you the likely market impact." />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
              <Sparkles className="h-3.5 w-3.5" /> AI assistant
            </div>
            <span className="text-[11px] font-medium text-muted-foreground">Powered by AlphaPulse AI</span>
          </div>

          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-[140px_1fr]">
              <div>
                <label className="block text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-2">Ticker</label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value.toUpperCase())}
                    className="w-full rounded-xl border border-input bg-background pl-9 pr-3 py-3 text-sm font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
                    placeholder="AAPL"
                    maxLength={6}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-2">News headline</label>
                <div className="relative">
                  <textarea
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    rows={4}
                    maxLength={300}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-[15px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition resize-none"
                    placeholder="Paste a news headline here..."
                  />
                  <span className="absolute bottom-2.5 right-3 text-[10px] tabular-nums text-muted-foreground bg-card px-1.5 rounded">
                    {headline.length}/300
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Tip: works best with a single, complete headline.</p>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-border/60">
              <button
                onClick={() => { setHeadline(""); setResult(null); }}
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition"
              >
                Clear input
              </button>
              <button
                onClick={() => setResult(fakeSimplify(ticker, headline))}
                disabled={!ticker || !headline}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Wand2 className="h-4 w-4" /> Simplify with AI
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] animate-fade-in h-full overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/40">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">AI summary</span>
                </div>
                <ImpactBadge impact={result.impact} />
              </div>
              <div className="px-6 py-5 flex-1">
                <div className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-2">{ticker.toUpperCase()}</div>
                <p className="text-[15px] leading-relaxed text-foreground">{result.summary}</p>
              </div>
              <div className="mx-6 mb-6 rounded-xl bg-secondary/70 p-4 text-xs text-muted-foreground leading-relaxed">
                Use this as a starting point for your own thinking. AlphaPulse provides educational insights, not financial advice.
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 h-full min-h-[280px] flex flex-col items-center justify-center text-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <p className="text-sm text-muted-foreground max-w-[220px]">Your simplified summary will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
