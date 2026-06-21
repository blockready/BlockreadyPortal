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
  resourceId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  leadSource?: string;
  interest?: string;
};

    const {
      userId,
      resourceId,
    } = body;

    const supabase =
      createSupabaseAdmin(
        context.env
      );

    const {
      data: resource,
      error: resourceError,
    } = await supabase
      .from("resources")
      .select(`
        id,
        slug,
        title,
        category,
        resource_type
      `)
      .eq(
        "id",
        resourceId
      )
      .single();

    if (resourceError) {
      throw resourceError;
    }

    const { error } =
      await supabase
        .from(
          "resource_activity"
        )
        .insert({
          user_id: userId,

          resource_id:
            resource.id,

          activity_type:
            "view",

          resource_slug:
            resource.slug,

          resource_title:
            resource.title,

          category:
            resource.category,

          resource_type:
            resource.resource_type,
        });

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "track-resource-view error",
      error
    );

    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : JSON.stringify(
                error
              ),
      },
      {
        status: 500,
      }
    );
  }
};