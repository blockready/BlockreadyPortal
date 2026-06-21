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
      data: lead,
      error: leadError,
    } = await supabase
      .from("leads")
      .select("email_verified")
      .eq("user_id", userId)
      .single();

    if (leadError) {
      throw leadError;
    }

    if (lead.email_verified) {
      return Response.json({
        success: true,
        alreadyVerified: true,
      });
    }

    const {
      error: updateError,
    } = await supabase
      .from("leads")
      .update({
        email_verified: true,
      })
      .eq("user_id", userId);

    if (updateError) {
      throw updateError;
    }

    await supabase
      .from("events")
      .insert({
        user_id: userId,
        event_type:
          "email_verified",
      });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "verify-email error",
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