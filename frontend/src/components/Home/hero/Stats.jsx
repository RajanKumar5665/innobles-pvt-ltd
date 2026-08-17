import { Rocket, TrendingUp, Users, Zap } from "lucide-react";

const stats = [
  { icon: Rocket, number: "50+", label: "Projects Delivered", tone: "orange" },
  { icon: Users, number: "30+", label: "Happy Clients", tone: "cyan" },
  { icon: Zap, number: "< 24 hrs", label: "Avg. Response", tone: "orange" },
  { icon: TrendingUp, number: "92%", label: "On-time Delivery", tone: "cyan" },
];

/**
 * Four small modern stat cards with subtle orange/cyan accents.
 */
const Stats = () => (
  <div className="hero-stats">
    {stats.map(({ icon: Icon, number, label, tone }) => (
      <div key={label} className="hero-stat">
        <span className={`hero-stat-accent ${tone}`} aria-hidden="true" />
        <div className="hero-stat-number">
          <span className={`hero-stat-icon ${tone}`}>
            <Icon size={16} aria-hidden="true" />
          </span>
          {number}
        </div>
        <span className="hero-stat-label">{label}</span>
      </div>
    ))}
  </div>
);

export default Stats;