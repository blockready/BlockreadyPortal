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

    if (!userId) {
      return Response.json(
        {
          success: false,
          error: "Missing userId",
        },
        {
          status: 400,
        }
      );
    }

    const supabase =
      createSupabaseAdmin(
        context.env
      );

    const { error } =
      await supabase
        .from("profiles")
        .update({
          onboarding_completed:
            true,
        })
        .eq(
          "user_id",
          userId
        );

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "complete-onboarding error",
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