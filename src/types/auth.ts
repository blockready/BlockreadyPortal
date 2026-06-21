import type {
  Session,
  User,
} from "@supabase/supabase-js";

export interface SignupPayload {
  firstName: string;
  lastName: string;

  email: string;
  password: string;

  leadSourceId: string;
  interestId: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export interface AuthContextValue extends AuthState {
  signOut: () => Promise<void>;
}