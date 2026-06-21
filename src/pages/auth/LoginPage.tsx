import { Link } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your resource library."
    >
      <LoginForm />
      <div className="br-auth-footer">
        <span>Don't have an account?</span>
        <Link to="/signup">Create Account</Link>
      </div>
    </AuthLayout>
  );
}