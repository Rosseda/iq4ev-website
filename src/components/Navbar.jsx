import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

const navItems = [
  { label: "About", to: "/about" },
  { label: "Pulse360", to: "/pulse360" },
  { label: "TerrainIntel", to: "/terrainintel" },
  { label: "EVSS", to: "/evss" },
  { label: "Consulting", to: "/consulting" },
  { label: "Insights", to: "/insights" },
  { label: "Briefings", to: "/briefings" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 text-sm font-black text-white">
            IQ
          </div>

          <div>
            <p className="text-sm font-black tracking-[0.25em] text-slate-950">
              IQ4EV
            </p>
            <p className="hidden text-xs text-slate-500 sm:block">
              EV Intelligence Infrastructure
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 xl:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "text-orange-600" : "hover:text-orange-600"
              }
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            to="/contact"
            className="rounded-full bg-slate-950 px-5 py-2 text-white hover:bg-orange-600"
          >
            Request briefing
          </Link>
        </nav>

        <Link
          to="/contact"
          className="hidden rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white hover:bg-orange-600 md:inline-flex xl:hidden"
        >
          Briefing
        </Link>

        <button
          type="button"
          className="rounded-xl border border-slate-200 p-2 text-slate-700 xl:hidden"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>
      </div>
    </header>
  );
}