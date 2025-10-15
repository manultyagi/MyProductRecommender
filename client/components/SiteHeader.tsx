import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const linkBase =
    "text-sm font-medium text-foreground/70 hover:text-foreground transition-colors";
  const activeClass =
    "text-foreground after:block after:h-0.5 after:bg-primary after:rounded after:mt-1";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary/90 to-primary/60 shadow-sm" />
          <span className="text-lg font-semibold tracking-tight">My product Recommender</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {[
            { to: "/", label: "Home" },
            { to: "/dashboard", label: "Dashboard" },
            { to: "/about", label: "About" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cn(linkBase, isActive && activeClass)}
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
