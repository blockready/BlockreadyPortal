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
      email,
      firstName,
      lastName,
      leadSource,
      interest,
    } = body;

    const supabase =
      createSupabaseAdmin(
        context.env
      );

    const { error } =
      await supabase
        .from("leads")
        .insert({
          user_id: userId,
          email,

          first_name: firstName,
          last_name: lastName,

          lead_source:
            leadSource,

          interest,

          email_verified:
            false,
        });

    if (error) {
      throw error;
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