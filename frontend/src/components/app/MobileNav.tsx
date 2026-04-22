import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Eye, Newspaper, Sparkles, PieChart, BookOpen } from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/watchlist", label: "Watch", icon: Eye },
  { to: "/daily-brief", label: "Brief", icon: Newspaper },
  { to: "/simplifier", label: "AI", icon: Sparkles },
  { to: "/evaluator", label: "Invest", icon: PieChart },
  { to: "/decisions", label: "Log", icon: BookOpen },
] as const;

export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-card/95 backdrop-blur">
      <div className="grid grid-cols-6">
        {links.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="flex flex-col items-center gap-1 py-2 text-[10px] text-muted-foreground data-[status=active]:text-primary"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
