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
console.log(
"DOWNLOAD RESOURCE FUNCTION HIT"
);

const body =
  await context.request.json() as {
    userId?: string;
    resourceId?: string;
  };

const {
  userId,
  resourceId,
} = body;

console.log(
  "userId:",
  userId
);

console.log(
  "resourceId:",
  resourceId
);

if (!resourceId) {
  return Response.json(
    {
      success: false,
      error:
        "resourceId is required",
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

console.log(
  "Supabase Admin Created"
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

console.log(
  "resource:",
  resource
);

console.log(
  "resourceError:",
  resourceError
);

if (resourceError) {
  throw resourceError;
}

const {
  data: file,
  error: fileError,
} = await supabase
  .from("resource_files")
  .select(`
    id,
    file_name,
    mime_type,
    r2_key
  `)
  .eq(
    "resource_id",
    resource.id
  )
  .single();

console.log(
  "file:",
  file
);

console.log(
  "fileError:",
  fileError
);

if (fileError) {
  throw fileError;
}

console.log(
  "Bucket Exists:",
  !!context.env
    .RESOURCES_BUCKET
);

console.log(
  "R2 Key:",
  file.r2_key
);

const object =
  await context.env
    .RESOURCES_BUCKET
    .get(
      file.r2_key
    );

console.log(
  "Object Found:",
  !!object
);

if (!object) {
  return Response.json(
    {
      success: false,
      error:
        "R2 object not found",
    },
    {
      status: 404,
    }
  );
}

const {
  error:
    activityError,
} = await supabase
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

console.log(
  "activityError:",
  activityError
);

const headers =
  new Headers();

headers.set(
  "Content-Type",
  file.mime_type ||
    "application/octet-stream"
);

headers.set(
  "Content-Disposition",
  `attachment; filename="${file.file_name}"`
);

return new Response(
  object.body,
  {
    headers,
  }
);


} catch (error) {
  console.error(
    "FULL ERROR:",
    error
  );

  return new Response(
    JSON.stringify(
      {
        success: false,
        error,
      },
      null,
      2
    ),
    {
      status: 500,
      headers: {
        "Content-Type":
          "application/json",
      },
    }
  );
}
};
