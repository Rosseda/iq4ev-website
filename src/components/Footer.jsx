import { Link } from "react-router-dom";

const footerLinks = {
  Platforms: [
    { label: "Pulse360", to: "/pulse360" },
    { label: "TerrainIntel", to: "/terrainintel" },
    { label: "EVSS", to: "/evss" },
  ],
  Company: [
    { label: "About", to: "/about" },
    { label: "Consulting", to: "/consulting" },
    { label: "Insights", to: "/insights" },
    { label: "Briefings", to: "/briefings" },
    { label: "Contact", to: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 text-sm font-black text-white">
              IQ
            </div>

            <div>
              <p className="text-sm font-black tracking-[0.25em] text-slate-950">
                IQ4EV
              </p>
              <p className="text-xs text-slate-500">
                EV Intelligence Infrastructure
              </p>
            </div>
          </Link>

          <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600">
            IQ4EV is a strategic EV data and consulting company helping South
            Africa’s EV ecosystem move from assumptions to evidence-led
            infrastructure decisions.
          </p>
        </div>

        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-950">
              {heading}
            </p>

            <div className="mt-4 flex flex-col gap-3 text-sm font-semibold text-slate-600">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="hover:text-orange-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 px-6 py-5 text-center text-xs text-slate-500">
        IQ4EV (Pty) Ltd · Strategic EV Data & Consulting · info@iq4ev.co.za
      </div>
    </footer>
  );
}