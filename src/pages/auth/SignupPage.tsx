import { Link } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import SignupForm from "../../components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Get free access to the Blockready resource library."
    >
      <SignupForm />
      <div className="br-auth-footer">
        <span>Already have an account?</span>
        <Link to="/login">Sign In</Link>
      </div>
    </AuthLayout>
  );
}