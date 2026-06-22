import {
  createSupabaseAdmin,
  type Env,
} from "../_lib/supabase-admin";

const ALLOWED_EVENTS = [
  "signup",

  "email_verified",

  "login",
  "logout",

  "welcome_viewed",
  "welcome_completed",

  "offer_viewed",
  "offer_clicked",
  "offer_skipped",
];

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

    const {
      userId,
      eventType,
      metadata,
    } = body;

    if (!eventType) {
  return Response.json(
    {
      success: false,
      error: "Missing event type",
    },
    {
      status: 400,
    }
  );
}

    if (
      !ALLOWED_EVENTS.includes(
        eventType
      )
    ) {
      return Response.json(
        {
          success: false,
          error:
            "Invalid event",
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

    const { error } =
      await supabase
        .from("events")
        .insert({
          user_id: userId,

          event_type:
            eventType,

          metadata:
            metadata ?? {},
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