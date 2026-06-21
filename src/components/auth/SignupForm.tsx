import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import Alert from "../ui/Alert";

import { authService } from "../../services/auth.service";

import {
  SignupErrors,
  validateSignupForm,
} from "../../utils/validation";

import {
  createProfile,
  createLead,
  trackEvent,
} from "../../services/internal-api.service";

const HEAR_OPTIONS = [
  {
    value: "google",
    label: "Google Search",
  },
  {
    value: "social_media",
    label: "Social Media",
  },
  {
    value: "friend",
    label: "Friend / Colleague",
  },
  {
    value: "youtube",
    label: "YouTube",
  },
  {
    value: "podcast",
    label: "Podcast",
  },
  {
    value: "newsletter",
    label: "Newsletter",
  },
  {
    value: "blog",
    label: "Blog / Article",
  },
  {
    value: "other",
    label: "Other",
  },
];

const INTEREST_OPTIONS = [
  {
    value: "blockchain_basics",
    label: "Blockchain Basics",
  },
  {
    value: "bitcoin",
    label: "Bitcoin",
  },
  {
    value: "ethereum",
    label:
      "Ethereum & Smart Contracts",
  },
  {
    value: "defi",
    label: "DeFi",
  },
  {
    value: "nfts",
    label: "NFTs",
  },
  {
    value: "trading",
    label: "Crypto Trading",
  },
  {
    value: "investing",
    label: "Crypto Investing",
  },
  {
    value: "web3",
    label: "Web3 & Career",
  },
  {
    value: "ai",
    label:
      "AI & Digital Assets",
  },
  {
    value: "other",
    label: "Other",
  },
];

export default function SignupForm() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [formData, setFormData] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      leadSource: "",
      interest: "",
    });

  const [fieldErrors, setFieldErrors] =
    useState<SignupErrors>({});

  const handleChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationErrors =
      validateSignupForm(formData);

    if (
      Object.keys(validationErrors)
        .length > 0
    ) {
      setFieldErrors(
        validationErrors
      );
      return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      const {
  data,
  error,
} = await authService.signUp({
  firstName:
    formData.firstName,

  lastName:
    formData.lastName,

  email:
    formData.email,

  password:
    formData.password,

  leadSourceId:
    formData.leadSource,

  interestId:
    formData.interest,
});

      if (error) {
        throw error;
      }

      const userId =
  data.user?.id;

if (!userId) {
  throw new Error(
    "User creation failed"
  );
}

await createProfile({
  userId,
  email:
    formData.email,
  firstName:
    formData.firstName,
  lastName:
    formData.lastName,
});

await createLead({
  userId,
  email:
    formData.email,
  firstName:
    formData.firstName,
  lastName:
    formData.lastName,
  leadSource:
    formData.leadSource,
  interest:
    formData.interest,
});

await trackEvent({
  userId,
  eventType:
    "signup",
});

      setSuccess(
        "Account created successfully. Please verify your email."
      );

      localStorage.setItem(
  "pending_verification_email",
  formData.email
);

      setTimeout(() => {
        navigate("/verify");
      }, 1500);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Signup failed";

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

      {success && (
        <Alert
          type="success"
          message={success}
        />
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "0 0.75rem",
        }}
      >
        <Input
          label="First Name"
          placeholder="John"
          value={formData.firstName}
          onChange={(e) =>
            handleChange(
              "firstName",
              e.target.value
            )
          }
          error={
            fieldErrors.firstName
          }
          required
        />

        <Input
          label="Last Name"
          placeholder="Doe"
          value={formData.lastName}
          onChange={(e) =>
            handleChange(
              "lastName",
              e.target.value
            )
          }
          error={
            fieldErrors.lastName
          }
          required
        />
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={(e) =>
          handleChange(
            "email",
            e.target.value
          )
        }
        error={
          fieldErrors.email
        }
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="Create a password"
        value={formData.password}
        onChange={(e) =>
          handleChange(
            "password",
            e.target.value
          )
        }
        error={
          fieldErrors.password
        }
        required
      />

      <Select
        label="How did you hear about us?"
        placeholder="Select source"
        value={formData.leadSource}
        onChange={(e) =>
          handleChange(
            "leadSource",
            e.target.value
          )
        }
        options={HEAR_OPTIONS}
        error={
          fieldErrors.leadSource
        }
      />

      <Select
        label="Main Interest"
        placeholder="Select interest"
        value={formData.interest}
        onChange={(e) =>
          handleChange(
            "interest",
            e.target.value
          )
        }
        options={
          INTEREST_OPTIONS
        }
        error={
          fieldErrors.interest
        }
      />

      <div
        style={{
          marginTop: "0.25rem",
        }}
      >
        <Button
          type="submit"
          fullWidth
          loading={loading}
        >
          Create Account
        </Button>
      </div>
    </form>
  );
}