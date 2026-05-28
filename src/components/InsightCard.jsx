import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function InsightCard({ insight, featured = false }) {
  return (
    <Link
      to={`/insights/${insight.slug}`}
      className={`group block rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
          {insight.category}
        </span>

        <span className="text-xs font-semibold text-slate-500">
          {insight.readTime}
        </span>

        <span className="text-xs font-semibold text-slate-400">
          {insight.date}
        </span>
      </div>

      <h3
        className={`mt-6 font-black tracking-tight text-slate-950 ${
          featured ? "text-4xl" : "text-2xl"
        }`}
      >
        {insight.title}
      </h3>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        {insight.excerpt}
      </p>

      <p className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-orange-600">
        Read insight
        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </p>
    </Link>
  );
}