export const ROUTES = {
  HOME: "/",

  SIGNUP: "/signup",
  LOGIN: "/login",
  VERIFY: "/verify",

  WELCOME: "/welcome",
  OFFER: "/offer",
  LIBRARY: "/library",
  RESOURCE:
  "/resource/:slug",
  
  FORGOT_PASSWORD:
    "/forgot-password",
  RESET_PASSWORD:
    "/reset-password",
  UPDATE_PASSWORD:
  "/update-password"
} as const;

