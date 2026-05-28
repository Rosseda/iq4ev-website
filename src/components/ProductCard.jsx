import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ProductCard({ icon, title, description, to, status }) {
  return (
    <Link
      to={to}
      className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
          {icon}
        </div>

        {status && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            {status}
          </span>
        )}
      </div>

      <h3 className="mt-7 text-2xl font-black text-slate-950">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>

      <p className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-orange-600">
        Explore system
        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </p>
    </Link>
  );
}