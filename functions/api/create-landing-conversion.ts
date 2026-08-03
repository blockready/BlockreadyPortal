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
      resourceSlug?: string;
    };

    const { resourceSlug } = body;

    if (!resourceSlug) {
      return Response.json(
        {
          success: false,
          error: "resourceSlug is required",
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
      .insert({
        resource_slug: resourceSlug,
        action: "none",
      })
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      id: data.id,
    });
  } catch (error) {
    console.error(
      "create-landing-conversion",
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