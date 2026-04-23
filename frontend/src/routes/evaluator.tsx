import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/Layout";
import { allocations } from "@/lib/mock-data";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export const Route = createFileRoute("/evaluator")({
  head: () => ({
    meta: [
      { title: "Investment Evaluator — AlphaPulse" },
      { name: "description", content: "See how a small amount could be allocated based on your risk preference, with simple explanations." },
      { property: "og:title", content: "Investment Evaluator — AlphaPulse" },
      { property: "og:description", content: "Educational portfolio allocations for beginners." },
    ],
  }),
  component: EvaluatorPage,
});

const colors = ["oklch(0.27 0.06 255)", "oklch(0.7 0.13 165)", "oklch(0.6 0.1 230)", "oklch(0.75 0.12 80)"];
type Risk = keyof typeof allocations;

function EvaluatorPage() {
  const [amount, setAmount] = useState(1000);
  const [risk, setRisk] = useState<Risk>("Balanced");
  const data = allocations[risk];

  return (
    <AppLayout>
      <PageHeader title="Investment Evaluator" description="A simple, educational way to see how a starting amount could be split across categories based on your comfort with risk." />

      <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-[var(--shadow-card)] mb-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-2">Amount to invest</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-base font-medium">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-input bg-background pl-8 pr-4 py-3 text-base font-semibold tabular-nums focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[500, 1000, 5000, 10000].map((v) => (
                <button
                  key={v}
                  onClick={() => setAmount(v)}
                  className={`rounded-full px-3 py-1 text-xs font-medium tabular-nums transition ${amount === v ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                >
                  ${v.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-2">Risk preference</label>
            <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-secondary p-1.5">
              {(Object.keys(allocations) as Risk[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRisk(r)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${risk === r ? "bg-card text-foreground shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {r}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Higher risk aims for more growth, with bigger swings.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-[var(--shadow-card)]">
          <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase mb-1">Allocation breakdown</h3>
          <p className="text-sm font-semibold text-foreground mb-5">${amount.toLocaleString()} · {risk}</p>
          <div className="h-60 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" innerRadius={64} outerRadius={96} paddingAngle={3} stroke="none">
                  {data.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Total</div>
              <div className="text-lg font-semibold tabular-nums">${amount.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-semibold tracking-tight">{risk} portfolio</h3>
            <span className="text-xs font-medium text-muted-foreground">{data.length} categories</span>
          </div>
          <div className="space-y-5">
            {data.map((d, i) => (
              <div key={d.name} className="group">
                <div className="flex items-center justify-between mb-2 gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: colors[i % colors.length] }} />
                    <span className="text-sm font-semibold text-foreground truncate">{d.name}</span>
                  </div>
                  <div className="text-sm font-semibold tabular-nums shrink-0">
                    {d.value}%
                    <span className="text-muted-foreground font-normal ml-1.5">· ${Math.round((amount * d.value) / 100).toLocaleString()}</span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${d.value}%`, background: colors[i % colors.length] }} />
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{d.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 pt-5 border-t border-border text-xs text-muted-foreground leading-relaxed">
            This is a simplified educational example — not a recommendation. Real investing involves fees, taxes, and personal goals.
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
