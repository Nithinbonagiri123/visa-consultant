import Script from "next/script";

// Crisp live chat. No-op unless NEXT_PUBLIC_CRISP_WEBSITE_ID is set in env.
// Get a free website ID at https://crisp.chat and add to .env.local:
//   NEXT_PUBLIC_CRISP_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
//
// The script loads with `strategy="lazyOnload"` so it never blocks LCP.

export function CrispChat() {
  const websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
  if (!websiteId) return null;

  return (
    <Script id="crisp-chat" strategy="lazyOnload">
      {`
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = "${websiteId}";
        (function () {
          var d = document;
          var s = d.createElement("script");
          s.src = "https://client.crisp.chat/l.js";
          s.async = 1;
          d.getElementsByTagName("head")[0].appendChild(s);
        })();
      `}
    </Script>
  );
}
