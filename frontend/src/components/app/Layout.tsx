import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { TrendingUp } from "lucide-react";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center gap-2 px-4 py-3 border-b border-border bg-card">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <TrendingUp className="h-4 w-4" />
          </div>
          <span className="font-semibold tracking-tight">AlphaPulse</span>
        </header>
        <main className="flex-1 px-5 sm:px-8 lg:px-10 py-8 pb-24 lg:pb-12 max-w-7xl w-full mx-auto">
          {children}
        </main>
        <MobileNav />
      </div>
    </div>
  );
}

export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8 animate-fade-in">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">{title}</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">{description}</p>
    </div>
  );
}

export function ImpactBadge({ impact }: { impact: "Bullish" | "Bearish" | "Neutral" }) {
  const styles = {
    Bullish: "bg-bullish/10 text-bullish ring-1 ring-inset ring-bullish/20",
    Bearish: "bg-bearish/10 text-bearish ring-1 ring-inset ring-bearish/20",
    Neutral: "bg-neutral/10 text-neutral ring-1 ring-inset ring-neutral/20",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${styles[impact]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {impact}
    </span>
  );
}

export function ActionPill({ action }: { action: "Monitor" | "Hold" | "Reduce Risk" }) {
  const styles = {
    Monitor: "bg-secondary text-foreground ring-1 ring-inset ring-border",
    Hold: "bg-bullish/10 text-bullish ring-1 ring-inset ring-bullish/20",
    "Reduce Risk": "bg-bearish/10 text-bearish ring-1 ring-inset ring-bearish/20",
  } as const;
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${styles[action]}`}>{action}</span>
  );
}
