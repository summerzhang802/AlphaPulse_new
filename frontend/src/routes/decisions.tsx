import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/Layout";
import { decisionLog } from "@/lib/mock-data";
import { useState } from "react";
import { Plus, Calendar, BookOpen } from "lucide-react";

export const Route = createFileRoute("/decisions")({
  head: () => ({
    meta: [
      { title: "Decision Log — AlphaPulse" },
      { name: "description", content: "Record and reflect on your investing decisions to build long-term discipline." },
      { property: "og:title", content: "Decision Log — AlphaPulse" },
      { property: "og:description", content: "Track every Buy, Sell, Hold and Alert with your reasoning." },
    ],
  }),
  component: DecisionsPage,
});

type Action = "Buy" | "Sell" | "Hold" | "Set Alert";
const actionStyle: Record<Action, string> = {
  Buy: "bg-bullish/10 text-bullish ring-1 ring-inset ring-bullish/20",
  Sell: "bg-bearish/10 text-bearish ring-1 ring-inset ring-bearish/20",
  Hold: "bg-secondary text-foreground ring-1 ring-inset ring-border",
  "Set Alert": "bg-accent/15 text-accent-foreground ring-1 ring-inset ring-accent/20",
};

function DecisionsPage() {
  const [logs, setLogs] = useState(decisionLog);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<{ ticker: string; action: Action; reason: string }>({ ticker: "", action: "Buy", reason: "" });

  function add() {
    if (!form.ticker || !form.reason) return;
    setLogs([{ id: Date.now(), ticker: form.ticker.toUpperCase(), action: form.action, reason: form.reason, date: new Date().toISOString().slice(0, 10) }, ...logs]);
    setForm({ ticker: "", action: "Buy", reason: "" });
    setOpen(false);
  }

  return (
    <AppLayout>
      <div className="flex items-start justify-between gap-4">
        <PageHeader title="Decision Log" description="Reflect on every move you make. A clear log builds better instincts over time." />
        <button onClick={() => setOpen((v) => !v)} className="mt-1 inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-card)] hover:opacity-90 transition">
          <Plus className="h-4 w-4" /> New entry
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <BookOpen className="h-4 w-4 text-accent" />
        <span className="font-medium text-foreground">{logs.length} entries</span>
        <span className="text-border">·</span>
        <span>Most recent first</span>
      </div>

      {open && (
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 mb-6 shadow-[var(--shadow-card)] animate-fade-in">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-[11px] font-semibold tracking-wider uppercase mb-2 text-muted-foreground">Ticker</label>
              <input value={form.ticker} onChange={(e) => setForm({ ...form, ticker: e.target.value })} placeholder="AAPL" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-medium uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold tracking-wider uppercase mb-2 text-muted-foreground">Action</label>
              <select value={form.action} onChange={(e) => setForm({ ...form, action: e.target.value as Action })} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Buy</option><option>Sell</option><option>Hold</option><option>Set Alert</option>
              </select>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-[11px] font-semibold tracking-wider uppercase mb-2 text-muted-foreground">Reasoning</label>
              <textarea value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} rows={3} placeholder="Why are you making this decision?" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-[15px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button onClick={() => setOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition">Cancel</button>
            <button onClick={add} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition">Save entry</button>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
        <ul className="divide-y divide-border">
          {logs.map((l) => (
            <li key={l.id} className="p-6 sm:p-7 hover:bg-secondary/40 transition animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground text-[11px] font-semibold tracking-wide">
                  {l.ticker}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span className="text-sm font-semibold tracking-tight text-foreground">{l.ticker}</span>
                    <span className="text-xs text-muted-foreground">NASDAQ</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${actionStyle[l.action]}`}>{l.action}</span>
                    <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1.5 tabular-nums">
                      <Calendar className="h-3.5 w-3.5" /> {l.date}
                    </span>
                  </div>
                  <p className="text-[15px] text-foreground leading-relaxed">{l.reason}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}
