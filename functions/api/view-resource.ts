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
console.log(
"VIEW RESOURCE FUNCTION HIT"
);

console.log(
  "HAS URL:",
  !!context.env
    .VITE_SUPABASE_URL
);

console.log(
  "HAS SERVICE ROLE:",
  !!context.env
    .SUPABASE_SERVICE_ROLE_KEY
);

console.log(
  "HAS BUCKET:",
  !!context.env
    .RESOURCES_BUCKET
);

const url = new URL(
  context.request.url
);

const resourceId =
  url.searchParams.get(
    "resourceId"
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
    title
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

 
}}