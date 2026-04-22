import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, ImpactBadge } from "@/components/app/Layout";
import { useState } from "react";
import { Sparkles, Wand2 } from "lucide-react";

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
        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4" /> AI assistant
          </div>
          <label className="block text-sm font-medium mb-1.5">Stock ticker</label>
          <input
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-ring transition"
            placeholder="e.g. AAPL"
          />
          <label className="block text-sm font-medium mt-5 mb-1.5">News headline</label>
          <textarea
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
            placeholder="Paste a news headline here..."
          />
          <button
            onClick={() => setResult(fakeSimplify(ticker, headline))}
            disabled={!ticker || !headline}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 transition"
          >
            <Wand2 className="h-4 w-4" /> Simplify with AI
          </button>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] animate-fade-in h-full">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">AI summary</span>
                <ImpactBadge impact={result.impact} />
              </div>
              <p className="text-sm leading-relaxed text-foreground">{result.summary}</p>
              <div className="mt-5 rounded-xl bg-secondary/70 p-4 text-xs text-muted-foreground leading-relaxed">
                Use this as a starting point for your own thinking. AlphaPulse provides educational insights, not financial advice.
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-6 h-full flex items-center justify-center text-center text-sm text-muted-foreground">
              Your simplified summary will appear here.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
