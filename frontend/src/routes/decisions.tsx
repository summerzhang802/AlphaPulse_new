import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/Layout";
import { decisionLog } from "@/lib/mock-data";
import { useState } from "react";
import { Plus, Calendar } from "lucide-react";

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
  Buy: "bg-bullish/10 text-bullish",
  Sell: "bg-bearish/10 text-bearish",
  Hold: "bg-secondary text-foreground",
  "Set Alert": "bg-accent/15 text-accent-foreground",
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
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Decision Log</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">Reflect on every move you make. A clear log builds better instincts over time.</p>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
          <Plus className="h-4 w-4" /> New entry
        </button>
      </div>

      {open && (
        <div className="rounded-2xl border border-border bg-card p-6 mb-6 shadow-[var(--shadow-card)] animate-fade-in">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Ticker</label>
              <input value={form.ticker} onChange={(e) => setForm({ ...form, ticker: e.target.value })} placeholder="AAPL" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Action</label>
              <select value={form.action} onChange={(e) => setForm({ ...form, action: e.target.value as Action })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Buy</option><option>Sell</option><option>Hold</option><option>Set Alert</option>
              </select>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Reasoning</label>
              <textarea value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} rows={2} placeholder="Why are you making this decision?" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setOpen(false)} className="rounded-lg px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Cancel</button>
            <button onClick={add} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Save entry</button>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
        <ul className="divide-y divide-border">
          {logs.map((l) => (
            <li key={l.id} className="p-5 sm:p-6 hover:bg-secondary/40 transition">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/5 text-xs font-semibold text-primary">{l.ticker}</div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${actionStyle[l.action]}`}>{l.action}</span>
                <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {l.date}
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{l.reason}</p>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}
