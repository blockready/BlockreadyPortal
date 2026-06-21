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

console.log(
  "DOWNLOAD RESOURCE FUNCTION HIT"
);

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
        resource_type,
        r2_key
      `)
      .eq(
        "id",
        resourceId
      )
      .single();

    if (resourceError) {
      throw resourceError;
    }

    const object =
      await context.env
        .RESOURCES_BUCKET
        .get(
          resource.r2_key
        );

        console.log(
  "Object Found:",
  !!object
);

    console.log(
  "Bucket Exists:",
  !!context.env.RESOURCES_BUCKET
);

console.log(
  "R2 Key:",
  resource.r2_key
);



    if (!object) {
      return new Response(
        "File not found",
        {
          status: 404,
        }
      );
    }

    await supabase
      .from(
        "resource_activity"
      )
      .insert({
        user_id: userId,
        resource_id:
          resource.id,

        activity_type:
          "download",

        resource_slug:
          resource.slug,

        resource_title:
          resource.title,

        category:
          resource.category,

        resource_type:
          resource.resource_type,
      });

    const headers =
      new Headers();

    headers.set(
      "Content-Type",
      object.httpMetadata
        ?.contentType ??
        "application/octet-stream"
    );

    headers.set(
      "Content-Disposition",
      `attachment; filename="${resource.title}"`
    );

    return new Response(
      object.body,
      {
        headers,
      }
    );
  } catch (error) {
    console.error(
      "download-resource error",
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