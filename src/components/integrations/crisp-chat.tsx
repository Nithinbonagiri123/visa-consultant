import Script from "next/script";

// Crisp live chat. No-op unless NEXT_PUBLIC_CRISP_WEBSITE_ID is set in env.
// Get a free website ID at https://crisp.chat and add to .env.local:
//   NEXT_PUBLIC_CRISP_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
//
// Hardening notes:
//   • We validate the ID is a real UUID before rendering — a stray `"` or
//     `</script>` in the env var would otherwise be injected verbatim into
//     the inline script tag (persistent XSS sitewide).
//   • We JSON.stringify the value into the script body even though it's
//     already validated — defence in depth.
//   • `strategy="lazyOnload"` so the embed never blocks LCP.

const CRISP_WEBSITE_ID_RE = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;

export function CrispChat() {
  const raw = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
  if (!raw || !CRISP_WEBSITE_ID_RE.test(raw)) return null;

  // JSON-stringify and escape `<` to neutralise any future shape-check regression
  // that lets a `</script>` slip through.
  const safeId = JSON.stringify(raw).replace(/</g, "\\u003c");

  return (
    <Script id="crisp-chat" strategy="lazyOnload">
      {`
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = ${safeId};
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
