const HUBSPOT_API_BASE = "https://api.hubapi.com";

function getAccessToken(): string | null {
  return process.env.HUBSPOT_ACCESS_TOKEN || null;
}

interface HubSpotContactProperties {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  state?: string;
  zip?: string;
  message?: string;
  hs_lead_status?: string;
  lifecyclestage?: string;
}

interface HubSpotDealProperties {
  dealname: string;
  pipeline?: string;
  dealstage?: string;
  amount?: string;
}

async function hubspotRequest(
  endpoint: string,
  method: string,
  body?: unknown
): Promise<{ ok: boolean; data?: unknown; error?: string }> {
  const token = getAccessToken();
  if (!token) {
    console.warn("⚠️ HUBSPOT_ACCESS_TOKEN not configured — skipping HubSpot sync");
    return { ok: false, error: "No access token" };
  }

  try {
    const res = await fetch(`${HUBSPOT_API_BASE}${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error(`❌ HubSpot API error [${res.status}]:`, data);
      return { ok: false, error: `${res.status}: ${JSON.stringify(data)}` };
    }

    return { ok: true, data };
  } catch (err) {
    console.error("❌ HubSpot network error:", err);
    return { ok: false, error: String(err) };
  }
}

/**
 * Search for a contact by email address.
 */
async function searchContactByEmail(email: string) {
  return hubspotRequest("/crm/v3/objects/contacts/search", "POST", {
    filterGroups: [
      {
        filters: [
          { propertyName: "email", operator: "EQ", value: email },
        ],
      },
    ],
    properties: ["email", "firstname", "lastname", "phone"],
  });
}

/**
 * Create or update a HubSpot contact. If the email already exists, update the record.
 * Returns the HubSpot contact ID or null on failure.
 */
export async function createOrUpdateContact(
  properties: HubSpotContactProperties
): Promise<string | null> {
  // Search for existing contact
  const search = await searchContactByEmail(properties.email);

  if (
    search.ok &&
    search.data &&
    (search.data as { total: number }).total > 0
  ) {
    // Update existing contact
    const existingId = (
      (search.data as { results: { id: string }[] }).results[0]
    ).id;
    console.log(`🔄 Updating existing HubSpot contact ${existingId}`);

    const { email: _, ...updateProps } = properties;
    const update = await hubspotRequest(
      `/crm/v3/objects/contacts/${existingId}`,
      "PATCH",
      { properties: updateProps }
    );

    if (update.ok) {
      console.log(`✅ HubSpot contact updated: ${existingId}`);
      return existingId;
    }
    return null;
  }

  // Create new contact
  console.log(`➕ Creating new HubSpot contact for ${properties.email}`);
  const create = await hubspotRequest("/crm/v3/objects/contacts", "POST", {
    properties: {
      ...properties,
      lifecyclestage: properties.lifecyclestage || "lead",
    },
  });

  if (create.ok && create.data) {
    const contactId = (create.data as { id: string }).id;
    console.log(`✅ HubSpot contact created: ${contactId}`);
    return contactId;
  }

  return null;
}

/**
 * Create a HubSpot deal and associate it with a contact.
 */
export async function createDeal(
  contactId: string,
  properties: HubSpotDealProperties
): Promise<string | null> {
  const create = await hubspotRequest("/crm/v3/objects/deals", "POST", {
    properties: {
      dealstage: "appointmentscheduled",
      pipeline: "default",
      ...properties,
    },
    associations: [
      {
        to: { id: contactId },
        types: [
          {
            associationCategory: "HUBSPOT_DEFINED",
            associationTypeId: 3, // deal-to-contact
          },
        ],
      },
    ],
  });

  if (create.ok && create.data) {
    const dealId = (create.data as { id: string }).id;
    console.log(`✅ HubSpot deal created: ${dealId}`);
    return dealId;
  }

  return null;
}

/**
 * Push a contact form submission to HubSpot (non-blocking).
 */
export function syncContactToHubSpot(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state?: string;
  postCode?: string;
  message?: string;
  source?: string;
}) {
  // Fire and forget — don't block the API response
  createOrUpdateContact({
    email: data.email,
    firstname: data.firstName,
    lastname: data.lastName,
    phone: data.phone,
    state: data.state || "",
    zip: data.postCode || "",
    message: data.message || "",
    hs_lead_status: "Initial stage",
  }).catch((err) => console.error("❌ HubSpot sync failed:", err));
}

/**
 * Push a quote/product enquiry to HubSpot with a Deal (non-blocking).
 */
export function syncQuoteToHubSpot(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state?: string;
  postCode?: string;
  product: string;
  category?: string;
}) {
  createOrUpdateContact({
    email: data.email,
    firstname: data.firstName,
    lastname: data.lastName,
    phone: data.phone,
    state: data.state || "",
    zip: data.postCode || "",
    hs_lead_status: "Initial stage",
  })
    .then((contactId) => {
      if (contactId) {
        return createDeal(contactId, {
          dealname: `${data.product} — ${data.firstName} ${data.lastName}`,
        });
      }
    })
    .catch((err) => console.error("❌ HubSpot quote sync failed:", err));
}

/**
 * Push an eligibility check to HubSpot (non-blocking).
 */
export function syncEligibilityToHubSpot(data: {
  email: string;
  phone: string;
}) {
  createOrUpdateContact({
    email: data.email,
    phone: data.phone,
    hs_lead_status: "Initial stage",
  }).catch((err) =>
    console.error("❌ HubSpot eligibility sync failed:", err)
  );
}
