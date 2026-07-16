'use client';

import Script from 'next/script';

/**
 * Free analytics only:
 * - Google Analytics 4 via NEXT_PUBLIC_GA_MEASUREMENT_ID (G-XXXXXXXX)
 * - Optional self-hosted / Umami Cloud via NEXT_PUBLIC_UMAMI_WEBSITE_ID (+ optional script URL)
 *
 * No scripts load unless env vars are set.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim();
  const umamiSrc =
    process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL?.trim() || 'https://cloud.umami.is/script.js';

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                anonymize_ip: true,
                send_page_view: true
              });
            `}
          </Script>
        </>
      ) : null}

      {umamiId ? (
        <Script
          defer
          src={umamiSrc}
          data-website-id={umamiId}
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
