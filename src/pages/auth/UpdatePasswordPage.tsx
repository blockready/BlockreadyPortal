import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";

import { authService } from "../../services/auth.service";

export default function UpdatePasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    setLoading(true);

    try {
      const { error } =
        await authService.updatePassword(
          password
        );

      if (error) {
        throw error;
      }

      setSuccess(
        "Password updated successfully."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to update password.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create a new password"
      subtitle="Choose a secure password for your account."
    >
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

        <Input
          label="New Password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          value={
            confirmPassword
          }
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          required
        />

        <Button
          type="submit"
          fullWidth
          loading={loading}
        >
          Update Password
        </Button>
      </form>
    </AuthLayout>
  );
}