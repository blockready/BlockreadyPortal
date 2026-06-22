import {
createSupabaseAdmin,
type Env,
} from "../_lib/supabase-admin";

export const onRequestGet = async (
context: {
request: Request;
env: Env;
}
) => {
try {
const url = new URL(
context.request.url
);


const resourceId =
  url.searchParams.get(
    "resourceId"
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

const {
  data: resource,
  error: resourceError,
} = await supabase
  .from("resources")
  .select(`
    id,
    title
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

const headers =
  new Headers();

headers.set(
  "Content-Type",
  file.mime_type ||
    "application/pdf"
);

headers.set(
  "Content-Disposition",
  "inline"
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
