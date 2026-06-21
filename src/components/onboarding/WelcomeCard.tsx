import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import {
  completeOnboarding,
  trackEvent,
} from "../../services/internal-api.service";

export default function WelcomeCard() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const handleContinue = async () => {
    try {
      if (user) {
        await trackEvent({
          userId: user.id,
          eventType:
            "welcome_completed",
        });
        await completeOnboarding(
        user.id
);
      }
    } catch (error) {
      console.error(
        "Failed to track welcome completion",
        error
      );
    }

    navigate("/offer", { replace: true });
  };

  return (
    <div className="welcome-card">
      <div className="welcome-badge">
        Welcome
      </div>

      <h1>
        Welcome to the Blockready
        Resource Portal
      </h1>

      <p className="welcome-description">
        Access educational resources,
        guides and templates designed
        to help you understand
        blockchain, AI and digital
        assets.
      </p>

      <div className="welcome-section">
        <h2>What You'll Find</h2>

        <ul>
          <li>Blockchain Fundamentals</li>
          <li>Bitcoin Education</li>
          <li>AI & Automation</li>
          <li>Digital Asset Research</li>
        </ul>
      </div>

      <div className="welcome-section">
        <h2>How It Works</h2>

        <ol>
          <li>Browse resources</li>
          <li>Open guides</li>
          <li>Download protected files</li>
        </ol>
      </div>

      <div className="welcome-disclaimer">
        Blockready provides educational
        content only. Nothing in this
        resource library is financial,
        investment, legal or tax advice.
      </div>

      <button
        type="button"
        className="br-button"
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}