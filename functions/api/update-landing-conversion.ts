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
      id?: string;
      userId?: string;
      action?: "login" | "signup";
    };

    const {
      id,
      userId,
      action,
    } = body;

    if (!id || !userId || !action) {
      return Response.json(
        {
          success: false,
          error: "Missing required fields",
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

    const {
      data,
      error,
    } = await supabase
      .from(
        "resource_landing_conversions"
      )
      .update({
        user_id: userId,
        action,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(
      "update-landing-conversion",
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