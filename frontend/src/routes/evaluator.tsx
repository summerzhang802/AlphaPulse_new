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

      <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] mb-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1.5">Amount to invest</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-input bg-background pl-7 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Risk preference</label>
            <div className="grid grid-cols-3 gap-2 rounded-xl bg-secondary p-1">
              {(Object.keys(allocations) as Risk[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRisk(r)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${risk === r ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <h3 className="text-sm font-semibold mb-4">Allocation breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" innerRadius={60} outerRadius={95} paddingAngle={2}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <h3 className="text-sm font-semibold mb-4">{risk} portfolio</h3>
          <div className="space-y-4">
            {data.map((d, i) => (
              <div key={d.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: colors[i % colors.length] }} />
                    <span className="text-sm font-medium">{d.name}</span>
                  </div>
                  <div className="text-sm font-semibold">{d.value}% <span className="text-muted-foreground font-normal">· ${Math.round((amount * d.value) / 100)}</span></div>
                </div>
                <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${d.value}%`, background: colors[i % colors.length] }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">{d.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-xs text-muted-foreground bg-secondary/70 rounded-xl p-4 leading-relaxed">
            This is a simplified educational example — not a recommendation. Real investing involves fees, taxes, and personal goals.
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
