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
      email,
      firstName,
      lastName,
    } = body;

    const supabase =
      createSupabaseAdmin(
        context.env
      );

    console.log({
  userId,
  email,
  firstName,
  lastName,
});

    const { error } =
      await supabase
        .from("profiles")
        .insert({
          user_id: userId,
          email,
          first_name: firstName,
          last_name: lastName,
        });

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
  console.error(error);

  return Response.json(
    {
      success: false,
      error,
    },
    {
      status: 500,
    }
  );
}
};