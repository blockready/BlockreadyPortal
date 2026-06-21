import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="br-landing">
      <div className="br-landing-card">
        <div className="br-landing-badge">
          <span className="br-landing-badge-dot" />
          Free Educational Resources
        </div>

        <h1>
          Learn Blockchain, AI &{" "}
          <span>Digital Assets</span>
        </h1>

        <p>
          Guides, templates, and research curated for professionals
          navigating the digital asset space. Always educational, always free.
        </p>

        <div className="br-landing-actions">
          <Link className="br-button" to="/login">
            Sign In
          </Link>
          <Link className="br-button br-button-secondary" to="/signup">
            Create Account
          </Link>
        </div>

        <div className="br-landing-stats">
          <div className="br-stat">
            <span className="br-stat-value">200+</span>
            <span className="br-stat-label">Resources</span>
          </div>
          <div className="br-stat">
            <span className="br-stat-value">12k+</span>
            <span className="br-stat-label">Members</span>
          </div>
          <div className="br-stat">
            <span className="br-stat-value">Weekly</span>
            <span className="br-stat-label">Updates</span>
          </div>
        </div>

        <p className="br-disclaimer">
          Blockready provides educational content only. Nothing in this resource
          library constitutes financial, investment, legal, or tax advice.
        </p>
      </div>
    </div>
  );
}