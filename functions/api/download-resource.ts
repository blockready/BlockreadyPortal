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
const body =
await context.request.json() as {
userId?: string;
resourceId?: string;
};


const {
  userId,
  resourceId,
} = body;

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

const {
  data: file,
  error: fileError,
} = await supabase
  .from("resource_files")
  .select(`
    file_name,
    mime_type,
    r2_key
  `)
  .eq(
    "resource_id",
    resource.id
  )
  .single();

if (fileError) {
  throw fileError;
}

const object =
  await context.env
    .RESOURCES_BUCKET
    .get(
      file.r2_key
    );

if (!object) {
  return new Response(
    "File not found",
    {
      status: 404,
    }
  );
}

const {
error: activityError,
} = await supabase
.from(
"resource_activity"
)
.insert({
user_id: userId,
resource_id:
resource.id,
activity_type:
"resource_downloaded",
resource_slug:
resource.slug,
resource_title:
resource.title,
category:
resource.category,
resource_type:
resource.resource_type,
});

if (activityError) {
throw activityError;
}


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
