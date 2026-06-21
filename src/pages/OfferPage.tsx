import { useEffect } from "react";

import OfferCard from "../components/onboarding/OfferCard";

import { useAuth } from "../hooks/useAuth";

import { trackEvent } from "../services/internal-api.service";

export default function OfferPage() {

  console.log(
    "OFFER PAGE RENDERED"
  );
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    trackEvent({
      userId: user.id,
      eventType: "offer_viewed",
    });
  }, [user]);

  return (
    <main className="offer-page">
      <OfferCard />
    </main>
  );
}