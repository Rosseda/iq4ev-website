import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const variants = {
  dark: "bg-slate-950 text-white hover:bg-orange-600",
  outline:
    "border border-slate-300 bg-white text-slate-800 hover:border-orange-500 hover:text-orange-600",
  orange: "bg-orange-600 text-white hover:bg-slate-950",
};

export default function Button({
  to,
  children,
  variant = "dark",
  showArrow = true,
}) {
  const className = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition ${variants[variant]}`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
        {showArrow && <ArrowRight size={18} />}
      </Link>
    );
  }

  return (
    <button className={className}>
      {children}
      {showArrow && <ArrowRight size={18} />}
    </button>
  );
}