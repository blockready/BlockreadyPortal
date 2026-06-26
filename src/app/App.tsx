import {
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import VerifyPage from "../pages/auth/VerifyPage";

import LandingPage from "../pages/LandingPage";
import PublicOnlyRoute from "../guards/PublicOnlyRoute";
import ProtectedRoute from "../guards/ProtectedRoute";
import WelcomePage from "../pages/WelcomePage";
import OfferPage from "../pages/OfferPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import UpdatePasswordPage from "../pages/auth/UpdatePasswordPage";
import LibraryPage from "../pages/LibraryPage";
import ResourceDetailPage from "../pages/ResourceDetailPage";

import { ROUTES } from "./routes";
import ResourceViewerPage from "../pages/ResourceViewerPage";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage/>
        }
      />

      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />

      <Route
        path={ROUTES.SIGNUP}
        element={
          <PublicOnlyRoute>
            <SignupPage />
          </PublicOnlyRoute>
        }
      />

      <Route
        path={ROUTES.VERIFY}
        element={<VerifyPage />}
      />

      <Route
  path={ROUTES.WELCOME}
  element={
    <ProtectedRoute>
      <WelcomePage />
    </ProtectedRoute>
  }
/>

<Route
  path={ROUTES.OFFER}
  element={
    <ProtectedRoute>
      <OfferPage />
    </ProtectedRoute>
  }
/>

<Route
  path={ROUTES.RESET_PASSWORD}
  element={
    <ResetPasswordPage />
  }
/>

<Route
  path={ROUTES.UPDATE_PASSWORD}
  element={
    <UpdatePasswordPage />
  }
/>
<Route
  path={ROUTES.LIBRARY}
  element={
    <ProtectedRoute>
      <LibraryPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/resource/:slug"
  element={
    <ProtectedRoute>
      <ResourceDetailPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/resource/:slug/view"
  element={
  <ProtectedRoute>
  <ResourceViewerPage />
  </ProtectedRoute>}
/>
    </Routes>
  );
}