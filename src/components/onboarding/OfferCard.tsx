import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import {
  trackEvent,
} from "../../services/internal-api.service";

export default function OfferCard() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const handleOfferClick =
    async () => {
      try {
        if (user) {
          await trackEvent({
            userId: user.id,
            eventType:
              "offer_clicked",
          });
        }
      } catch (error) {
        console.error(
          "Failed to track offer click",
          error
        );
      }
    };

  const handleSkip =
    async () => {
      try {
        if (user) {
          await trackEvent({
            userId: user.id,
            eventType:
              "offer_skipped",
          });
        }
      } catch (error) {
        console.error(
          "Failed to track offer skip",
          error
        );
      }

      navigate("/library");
    };

  return (
    <div className="offer-card">
      <div className="offer-badge">
        Optional Upgrade
      </div>

      <h1>
        Continue Learning With Our
        Pro / Expert Masterclass
      </h1>

      <p className="offer-description">
        If you're looking for a deeper,
        structured learning experience,
        you can take advantage of our
        Pro / Expert masterclass discount
        for lifetime access.
      </p>

      <div className="offer-features">
        <div>
          ✓ Structured Learning Path
        </div>

        <div>
          ✓ Advanced Educational Content
        </div>

        <div>
          ✓ Lifetime Access
        </div>

        <div>
          ✓ Learn At Your Own Pace
        </div>
      </div>

      <div className="offer-disclaimer">
        This offer is completely optional.
        You can continue to access the free
        Blockready Resource Library without
        purchasing anything.
      </div>

      <div className="offer-actions">
        <a
          href="https://www.blockready.com"
          target="_blank"
          rel="noopener noreferrer"
          className="br-button"
          onClick={handleOfferClick}
        >
          Learn More
        </a>

        <button
          type="button"
          className="br-button-secondary"
          onClick={handleSkip}
        >
          Continue To Free Resources
        </button>
      </div>
    </div>
  );
}