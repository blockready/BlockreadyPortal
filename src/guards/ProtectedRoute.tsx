import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import { ROUTES } from "../app/routes";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: Props) {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  const verified =
    Boolean(
      user.email_confirmed_at
    );

  if (!verified) {
    return (
      <Navigate
        to={ROUTES.VERIFY}
        replace
      />
    );
  }

  return <>{children}</>;
}