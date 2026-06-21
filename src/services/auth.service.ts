import type {
  AuthResponse,
  Session,
  User,
} from "@supabase/supabase-js";

import { supabase } from "../lib/supabase";

import type {
  LoginPayload,
  SignupPayload,
} from "../types/auth";

class AuthService {
  /**
   * Register new user
   */
  async signUp(
    payload: SignupPayload
  ): Promise<AuthResponse> {
    return supabase.auth.signUp({
      email: payload.email,
      password: payload.password,

      options: {
        data: {
          first_name: payload.firstName,
          last_name: payload.lastName,

          lead_source_id: payload.leadSourceId,
          interest_id: payload.interestId,
        },
      },
    });
  }

  /**
   * Login existing user
   */
  async signIn(
    payload: LoginPayload
  ): Promise<AuthResponse> {
    return supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
  }

  /**
   * Logout current user
   */
  async signOut(): Promise<void> {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  /**
   * Send password reset email
   */
  async resetPassword(
    email: string
  ) {
    return supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
  window.location.origin +
  "/update-password"
      }
    );
  }

  async updatePassword(
  password: string
) {
  return supabase.auth.updateUser({
    password,
  });
}

  /**
   * Current authenticated user
   */
  async getCurrentUser(): Promise<User | null> {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    return user;
  }

  /**
   * Current session
   */
  async getSession(): Promise<Session | null> {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return session;
  }

  /**
   * Refresh session
   */
  async refreshSession() {
    return supabase.auth.refreshSession();
  }

  /**
   * Check email verification
   */
  async isEmailVerified(): Promise<boolean> {
  const user = await this.getCurrentUser();

  return Boolean(
    user?.email_confirmed_at
  );
}
}

export const authService =
  new AuthService();