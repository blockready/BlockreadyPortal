export interface Profile {
  id: string;

  email: string;

  first_name: string;
  last_name: string;

  email_verified: boolean;

  has_completed_welcome: boolean;
  has_seen_offer: boolean;

  created_at: string;
  updated_at: string;
}