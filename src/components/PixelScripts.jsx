"use client";
import Script from "next/script";

/**
 * Renders tracking pixels / analytics scripts for the current tenant.
 * Only scripts with a non-empty ID are injected.
 */
export default function PixelScripts({ pixels }) {
  if (!pixels) return null;

  const {
    facebook_pixel_id,
    google_analytics_id,
    google_ads_id,
    gtm_id,
  } = pixels;

  return (
    <>
      {/* ── Google Tag Manager ──────────────────────────────────────── */}
      {gtm_id && (
        <>
          <Script
            id="gtm-head"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtm_id}');
              `,
            }}
          />
          {/* GTM noscript fallback rendered via a portal isn't possible in RSC,
              but GTM works fine without it for JS-enabled visitors. */}
        </>
      )}

      {/* ── Google Analytics 4 ──────────────────────────────────────── */}
      {google_analytics_id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${google_analytics_id}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${google_analytics_id}');
              `,
            }}
          />
        </>
      )}

      {/* ── Google Ads ──────────────────────────────────────────────── */}
      {google_ads_id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${google_ads_id}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-ads-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${google_ads_id}');
              `,
            }}
          />
        </>
      )}

      {/* ── Meta / Facebook Pixel ───────────────────────────────────── */}
      {facebook_pixel_id && (
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${facebook_pixel_id}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}
    </>
  );
}
