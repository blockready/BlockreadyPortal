import { onRequestPost as __api_complete_onboarding_ts_onRequestPost } from "C:\\Users\\Radhika Khatri\\Desktop\\BlockreadyPortal\\functions\\api\\complete-onboarding.ts"
import { onRequestPost as __api_create_lead_ts_onRequestPost } from "C:\\Users\\Radhika Khatri\\Desktop\\BlockreadyPortal\\functions\\api\\create-lead.ts"
import { onRequestPost as __api_create_profile_ts_onRequestPost } from "C:\\Users\\Radhika Khatri\\Desktop\\BlockreadyPortal\\functions\\api\\create-profile.ts"
import { onRequestPost as __api_download_resource_ts_onRequestPost } from "C:\\Users\\Radhika Khatri\\Desktop\\BlockreadyPortal\\functions\\api\\download-resource.ts"
import { onRequestPost as __api_get_profile_ts_onRequestPost } from "C:\\Users\\Radhika Khatri\\Desktop\\BlockreadyPortal\\functions\\api\\get-profile.ts"
import { onRequestPost as __api_track_event_ts_onRequestPost } from "C:\\Users\\Radhika Khatri\\Desktop\\BlockreadyPortal\\functions\\api\\track-event.ts"
import { onRequestPost as __api_track_resource_activity_ts_onRequestPost } from "C:\\Users\\Radhika Khatri\\Desktop\\BlockreadyPortal\\functions\\api\\track-resource-activity.ts"
import { onRequestPost as __api_update_login_ts_onRequestPost } from "C:\\Users\\Radhika Khatri\\Desktop\\BlockreadyPortal\\functions\\api\\update-login.ts"
import { onRequestPost as __api_verify_email_ts_onRequestPost } from "C:\\Users\\Radhika Khatri\\Desktop\\BlockreadyPortal\\functions\\api\\verify-email.ts"
import { onRequestGet as __api_view_resource_ts_onRequestGet } from "C:\\Users\\Radhika Khatri\\Desktop\\BlockreadyPortal\\functions\\api\\view-resource.ts"

export const routes = [
    {
      routePath: "/api/complete-onboarding",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_complete_onboarding_ts_onRequestPost],
    },
  {
      routePath: "/api/create-lead",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_create_lead_ts_onRequestPost],
    },
  {
      routePath: "/api/create-profile",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_create_profile_ts_onRequestPost],
    },
  {
      routePath: "/api/download-resource",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_download_resource_ts_onRequestPost],
    },
  {
      routePath: "/api/get-profile",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_get_profile_ts_onRequestPost],
    },
  {
      routePath: "/api/track-event",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_track_event_ts_onRequestPost],
    },
  {
      routePath: "/api/track-resource-activity",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_track_resource_activity_ts_onRequestPost],
    },
  {
      routePath: "/api/update-login",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_update_login_ts_onRequestPost],
    },
  {
      routePath: "/api/verify-email",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_verify_email_ts_onRequestPost],
    },
  {
      routePath: "/api/view-resource",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_view_resource_ts_onRequestGet],
    },
  ]