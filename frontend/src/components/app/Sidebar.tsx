import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Eye, Newspaper, Sparkles, PieChart, BookOpen, TrendingUp } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/watchlist", label: "Watchlist", icon: Eye },
  { to: "/daily-brief", label: "Daily Brief", icon: Newspaper },
  { to: "/simplifier", label: "News Simplifier", icon: Sparkles },
  { to: "/evaluator", label: "Investment Evaluator", icon: PieChart },
  { to: "/decisions", label: "Decision Log", icon: BookOpen },
] as const;

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-card/60 backdrop-blur-sm">
      <div className="flex items-center gap-2 px-6 py-6 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div>
          <div className="text-base font-semibold tracking-tight text-foreground">AlphaPulse</div>
          <div className="text-[11px] text-muted-foreground">AI for beginner investors</div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground data-[status=active]:shadow-sm"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-4 mx-3 mb-4 rounded-xl bg-secondary/70 border border-border">
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          AlphaPulse provides educational insights, not financial advice.
        </p>
      </div>
    </aside>
  );
}
