import { supabase } from "../lib/supabase";

import type {
  Resource,
} from "../types/resource";

class ResourceService {
  async getResources(): Promise<
    Resource[]
  > {
    const {
      data,
      error,
    } = await supabase
      .from("resources")
      .select(`
  id,
  slug,
  title,
  description,
  long_description,
  category,
  resource_type,
  thumbnail_url,
  preview_type,
  view_url,
  version,
  created_at,
  updated_at,
  last_updated_at,
  reviewed_at,
  is_featured,
  is_published
`)
      .eq(
        "is_published",
        true
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    if (error) {
      throw error;
    }

    return data ?? [];
  }

  async getResourceBySlug(
  slug: string
): Promise<Resource | null> {
  const {
    data,
    error,
  } = await supabase
    .from("resources")
    .select(`
  id,
  slug,
  title,
  description,
  long_description,
  category,
  resource_type,
  thumbnail_url,
  preview_type,
  view_url,
  version,
  created_at,
  updated_at,
  last_updated_at,
  reviewed_at,
  is_featured,
  is_published
`)
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
}

export const resourceService =
  new ResourceService();