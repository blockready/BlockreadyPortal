export interface Resource {
  id: string;

  slug: string;

  title: string;

  description: string | null;

  category: string;

  resource_type: string;

  thumbnail_url: string | null;

  is_featured: boolean;

  is_published: boolean;

  created_at: string;
}