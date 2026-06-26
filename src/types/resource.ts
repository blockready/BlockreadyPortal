export interface Resource {
  id: string;

  slug: string;

  title: string;

  description: string | null;

  long_description: string | null;

  category: string;

  resource_type: string;

  thumbnail_url: string | null;

  preview_type: string | null;

  view_url: string | null;

  version: string;

  created_at: string;

  updated_at: string;

  last_updated_at: string | null;

  reviewed_at: string | null;

  is_featured: boolean;

  is_published: boolean;
}