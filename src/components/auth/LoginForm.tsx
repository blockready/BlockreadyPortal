import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../ui/Input";
import Button from "../ui/Button";
import Alert from "../ui/Alert";

import { authService } from "../../services/auth.service";
import {
  getProfile, updateLogin, verifyEmail,
} from "../../services/internal-api.service";



export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { data, error } =
        await authService.signIn({
          email,
          password,
        });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error(
          "Login failed"
        );
      }

      const verified =
        Boolean(
          data.user.email_confirmed_at
        );

      if (!verified) {
        await authService.signOut();
        navigate("/verify");
        return;
      }
      await verifyEmail(
  data.user.id
);

      await updateLogin(
  data.user.id
);

const profileResponse =
  await getProfile(
    data.user.id
  ) as {
    profile?: {
      onboarding_completed?: boolean;
    };
  };

const onboardingCompleted =
  profileResponse?.profile
    ?.onboarding_completed;

console.log(
  "PROFILE RESPONSE:",
  profileResponse
);

console.log(
  "ONBOARDING COMPLETED:",
  onboardingCompleted
);

if (
  onboardingCompleted
) {
  console.log(
    "NAVIGATING TO OFFER"
  );

  navigate("/offer", {
    replace: true,
  });
} else {
  console.log(
    "NAVIGATING TO WELCOME"
  );

  navigate("/welcome", {
    replace: true,
  });
}
    } 
    
    catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to login";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert
          type="error"
          message={error}
        />
      )}

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        required
      />

      <div
        style={{
          textAlign: "right",
          marginBottom: "1.25rem",
          marginTop: "-0.5rem",
        }}
      >
        <a
          href="/reset-password"
          style={{
            fontSize: "13px",
            color:
              "var(--br-primary)",
            fontWeight: 600,
            textDecoration:
              "none",
          }}
        >
          Forgot password?
        </a>
      </div>

      <Button
        type="submit"
        fullWidth
        loading={loading}
      >
        Sign In
      </Button>
    </form>
  );
}