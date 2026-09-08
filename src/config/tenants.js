/**
 * MULTI-TENANT CONFIG
 *
 * Each key = subdomain slug (the part before .bkarogyam.com)
 * Add a new agency by adding a new entry below.
 *
 * Pixel IDs:
 *  - facebook_pixel_id  : Meta / Facebook Pixel ID
 *  - google_analytics_id: GA4 Measurement ID  (e.g. "G-XXXXXXXXXX")
 *  - google_ads_id      : Google Ads conversion ID (e.g. "AW-XXXXXXXXX")
 *  - gtm_id             : Google Tag Manager container ID (e.g. "GTM-XXXXXXX")
 *
 * Leave a value as "" to skip that pixel for that tenant.
 */

export const DEFAULT_TENANT = {
  slug: "default",
  store_name: "Agency_seabuckthorn",
  phone: "918081222333",        // tel: href uses this  (+91 prefix included)
  whatsapp: "918081222333",     // wa.me link uses this
  display_phone: "+91 80812 22333",
  facebook_domain_verification: "",
  pixels: {
    facebook_pixel_id: "",
    google_analytics_id: "",
    google_ads_id: "",
    gtm_id: "",
  },
};

export const TENANTS = {
  // ── Agency: Arya Ayurveda ──────────────────────────────────────────────────
  "arya-ayurveda": {
    slug: "arya-ayurveda",
    store_name: "arya-ayurveda.bkarogyam.com",
    phone: "918081222333",
    whatsapp: "918081222333",
    display_phone: "+91 80812 22333",
    facebook_domain_verification: "",
    pixels: {
      facebook_pixel_id: "",   // ← paste Arya Ayurveda's FB Pixel ID here
      google_analytics_id: "", // ← paste their GA4 ID here
      google_ads_id: "",
      gtm_id: "",
    },
  },

  // ── Agency: DigiLife ──────────────────────────────────────────────────────
  "digilife": {
    slug: "digilife",
    store_name: "digilife.bkarogyam.com",
    phone: "918081222333",
    whatsapp: "918081222333",
    display_phone: "+91 80812 22333",
    facebook_domain_verification: "",
    pixels: {
      facebook_pixel_id: "",   // ← paste DigiLife's FB Pixel ID here
      google_analytics_id: "",
      google_ads_id: "",
      gtm_id: "",
    },
  },

  // ── Agency: Rakshak ───────────────────────────────────────────────────────
  "kidney-rakshak": {
    slug: "kidney-rakshak",
    store_name: "kidney-rakshak",
    phone: "918081222333",
    whatsapp: "918081222333",
    display_phone: "+91 80812 22333",
    facebook_domain_verification: "",
    pixels: {
      facebook_pixel_id: "1439717144717984",
      google_analytics_id: "",
      google_ads_id: "",
      gtm_id: "",
    },
  },

  // ── Agency: GutsCare ──────────────────────────────────────────────────────
  "gutscare": {
    slug: "gutscare",
    store_name: "gutscare.bkarogyam.com",
    phone: "918081222333",
    whatsapp: "918081222333",
    display_phone: "+91 80812 22333",
    facebook_domain_verification: "nl64o43le646fk3cwt78ogtv5ncrxy",
    pixels: {
      facebook_pixel_id: "1745468096666289",
      google_analytics_id: "",
      google_ads_id: "",
      gtm_id: "",
    },
  },

  // ── Add more agencies below ────────────────────────────────────────────────
  // "another-agency": {
  //   slug: "another-agency",
  //   store_name: "another-agency.bkarogyam.com",
  //   phone: "91XXXXXXXXXX",
  //   whatsapp: "91XXXXXXXXXX",
  //   display_phone: "+91 XXXXX XXXXX",
  //   pixels: {
  //     facebook_pixel_id: "XXXXXXXXXXXXXXX",
  //     google_analytics_id: "G-XXXXXXXXXX",
  //     google_ads_id: "AW-XXXXXXXXX",
  //     gtm_id: "GTM-XXXXXXX",
  //   },
  // },
};

/** Returns the tenant config for a given subdomain slug, falling back to DEFAULT. */
export function getTenantConfig(slug) {
  return TENANTS[slug] ?? DEFAULT_TENANT;
}
