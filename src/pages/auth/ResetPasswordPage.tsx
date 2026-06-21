import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";

import { authService } from "../../services/auth.service";

export default function ResetPasswordPage() {
  const [email, setEmail] =
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

    setLoading(true);

    try {
      const { error } =
        await authService.resetPassword(
          email
        );

      if (error) {
        throw error;
      }

      setSuccess(
        "Password reset email sent. Please check your inbox."
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to send reset email.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email address and we'll send you a password reset link."
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
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <Button
          type="submit"
          fullWidth
          loading={loading}
        >
          Send Reset Link
        </Button>
      </form>

      <div className="br-auth-footer">
        <span>
          Remembered your password?
        </span>

        <Link to="/login">
          Back to Login
        </Link>
      </div>
    </AuthLayout>
  );
}