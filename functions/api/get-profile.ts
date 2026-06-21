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

    const { userId } = body;

    const supabase =
      createSupabaseAdmin(
        context.env
      );

    const {
      data,
      error,
    } = await supabase
      .from("profiles")
      .select(
        "onboarding_completed"
      )
      .eq(
        "user_id",
        userId
      )
      .single();

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      profile: data,
    });
  } catch (error) {
    console.error(
      "get-profile error",
      error
    );

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