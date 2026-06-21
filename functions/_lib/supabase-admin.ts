import { createClient } from "@supabase/supabase-js";

export interface Env {
  VITE_SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;

  RESOURCES_BUCKET: any;
}

export function createSupabaseAdmin(
  env: Env
) {
  return createClient(
    env.VITE_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY
  );
}