export async function createProfile(
  payload: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
  }
) {
  const response = await fetch(
    "/api/create-profile",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(
        payload
      ),
    }
  );

  return response.json();
}

export async function createLead(
  payload: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    leadSource: string;
    interest: string;
  }
) {
  const response = await fetch(
    "/api/create-lead",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(
        payload
      ),
    }
  );

  return response.json();
}

export async function trackEvent(
  payload: {
    userId: string;
    eventType: string;
    metadata?: Record<
      string,
      unknown
    >;
  }
) {
  const response = await fetch(
    "/api/track-event",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(
        payload
      ),
    }
  );

  return response.json();
}

export async function updateLogin(
  userId: string
) {
  const response = await fetch(
    "/api/update-login",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    }
  );

  return response.json();
}

export async function completeOnboarding(
  userId: string
) {
  const response = await fetch(
    "/api/complete-onboarding",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    }
  );

  return response.json();
}

export async function getProfile(
  userId: string
) {
  const response = await fetch(
    "/api/get-profile",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    }
  );

  return response.json();
}

export async function verifyEmail(
  userId: string
) {
  const response = await fetch(
    "/api/verify-email",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    }
  );

  return response.json();
}

export async function trackResourceView(
  userId: string,
  resourceId: string
) {
  const response = await fetch(
    "/api/track-resource-activity",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        userId,
        resourceId,
      }),
    }
  );

  return response.json();
}

export async function downloadResource(
userId: string,
resourceId: string
) {
const response = await fetch(
"/api/download-resource",
{
method: "POST",
headers: {
"Content-Type":
"application/json",
},
body: JSON.stringify({
userId,
resourceId,
}),
}
);

return response;
}

export async function trackPdfView(
  userId: string,
  resourceId: string
) {
  return fetch(
    "/api/resource-activity",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        userId,
        resourceId,
        activityType:
          "pdf_viewed",
      }),
    }
  );
}

export async function createLandingConversion(
  resourceSlug: string
): Promise<
  | { success: true; id: string }
  | { success: false; error: string }
> {
  const response = await fetch(
    "/api/create-landing-conversion",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        resourceSlug,
      }),
    }
  );

  return response.json();
}

type UpdateLandingConversionResponse = {
  success: boolean;
  error?: string;
  data?: {
    id: string;
    user_id: string | null;
    resource_slug: string;
    action: string;
    created_at: string;
  };
};

export async function updateLandingConversion(
  id: string,
  userId: string,
  action: "login" | "signup"
): Promise<UpdateLandingConversionResponse> {
  const response = await fetch(
    "/api/update-landing-conversion",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        userId,
        action,
      }),
    }
  );

  return response.json() as Promise<UpdateLandingConversionResponse>;
}