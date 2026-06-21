import {
  createSupabaseAdmin,
  type Env,
} from "../_lib/supabase-admin";

export const onRequestPost = async (
  context: {
    request: Request;
    env: Env;
  }
) => {
  try {
    const body = await context.request.json() as {
  userId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  leadSource?: string;
  interest?: string;
  eventType?: string;
  metadata?: Record<string, unknown>;
};

    const {
      userId,
    } = body;

    const supabase =
      createSupabaseAdmin(
        context.env
      );

    const {
      data: profile,
      error: fetchError,
    } = await supabase
      .from("profiles")
      .select("*")
      .eq(
        "user_id",
        userId
      )
      .single();

    if (fetchError) {
      throw fetchError;
    }

    const now =
      new Date().toISOString();

    const updates = {
      login_count:
        profile.login_count + 1,

      last_login_at: now,

      first_login_at:
        profile.first_login_at ??
        now,
    };

    const {
      error: updateError,
    } = await supabase
      .from("profiles")
      .update(updates)
      .eq(
        "user_id",
        userId
      );

    if (updateError) {
      throw updateError;
    }

    const {
      error: eventError,
    } = await supabase
      .from("events")
      .insert({
        user_id: userId,

        event_type:
          "login",
      });

    if (eventError) {
      throw eventError;
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
};