import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Profile() {
  const router = useRouter();
  const { orgId, hostname, policy, sessionId } = router.query;

  useEffect(() => {
    if (!orgId || !hostname || !sessionId) return;

    // Load ThreatMetrix script dynamically
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      threatmetrix.profile("${hostname}", "${orgId}", "${sessionId}");
    `;
    document.body.appendChild(script);
  }, [orgId, hostname, sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Head>
        <script type="text/javascript" src="/fp-clientlib-v5.js"></script>
      </Head>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              var session_id = "${sessionId}";
              securesite.profile("${hostname}", "${orgId}", "${sessionId}");
            `,
          }}
        ></script>
        <h1 className="text-2xl font-bold mb-6 text-center">ThreatMetrix Profile</h1>
        <div className="space-y-2">
          <p><span className="font-medium text-gray-700">Org ID:</span> {orgId}</p>
          <p><span className="font-medium text-gray-700">Hostname:</span> {hostname}</p>
          <p><span className="font-medium text-gray-700">Policy:</span> {policy}</p>
          <p><span className="font-medium text-gray-700">Session ID:</span> {sessionId}</p>
        </div>
        <p className="mt-6 text-green-600 text-sm text-center">
          ✅ The ThreatMetrix script has been executed.
        </p>
      </div>
    </div>
  );
}