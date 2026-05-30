import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function InsightCard({ insight, featured = false }) {
  return (
    <Link
      to={`/insights/${insight.slug}`}
      className={`insight-card ${featured ? "featured" : ""}`}
    >
      <div className="insight-card-meta">
        <span>{insight.category}</span>
        <small>{insight.readTime}</small>
        <small>{insight.date}</small>
      </div>

      <h3>{insight.title}</h3>

      <p>{insight.excerpt}</p>

      <strong>
        Read insight
        <ArrowRight size={16} />
      </strong>
    </Link>
  );
}