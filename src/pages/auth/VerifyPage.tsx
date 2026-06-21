import { useState } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../../lib/supabase";

export default function VerifyPage() {
  const [message, setMessage] =
    useState("");

  const resendEmail =
    async () => {
      const email =
        window.localStorage.getItem(
          "pending_verification_email"
        );

      if (!email) {
        setMessage(
          "Please login again."
        );

        return;
      }

      const { error } =
        await supabase.auth.resend({
          type: "signup",
          email,
        });

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage(
        "Verification email sent."
      );
    };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "3rem auto",
        padding: "1rem",
      }}
    >
      <h1>Verify Your Email</h1>

      <p>
        We've sent a verification email
        to your registered address.
      </p>

      <p>
        Please click the verification
        link before signing in.
      </p>

      {message && (
        <p>{message}</p>
      )}

      <button
        onClick={resendEmail}
      >
        Resend Verification Email
      </button>

      <div
        style={{
          marginTop: "1rem",
        }}
      >
        <Link to="/login">
          Back To Login
        </Link>
      </div>
    </div>
  );
}