import { useEffect } from "react";
import WelcomeCard from "../components/onboarding/WelcomeCard";

import { useAuth } from "../hooks/useAuth";
import { trackEvent } from "../services/internal-api.service";

export default function WelcomePage() {
  console.log(
    "WELCOME PAGE RENDERED"
  );
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    trackEvent({
      userId: user.id,
      eventType: "welcome_viewed",
    });
  }, [user]);

  return (
    <main className="welcome-page">
      <WelcomeCard />
    </main>
  );
}