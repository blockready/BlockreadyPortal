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
        category,
        resource_type,
        thumbnail_url,
        is_featured,
        is_published,
        created_at
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
      category,
      resource_type,
      thumbnail_url,
      is_featured,
      is_published,
      created_at
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