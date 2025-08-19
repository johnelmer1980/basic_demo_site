import { useRouter } from "next/router";
import Head from "next/head";

export default function Profile() {
  const router = useRouter();
  const { orgId, hostname, policy, sessionId } = router.query;

  // Construct the tags.js script src dynamically
  const tagsScriptSrc =
    hostname && orgId && sessionId
      ? `https://${hostname}/tags.js?org_id=${encodeURIComponent(orgId)}&session_id=${encodeURIComponent(sessionId)}`
      : null;

  // Inline script to call securesite.profile
  const inlineScript =
    hostname && orgId && sessionId
      ? `
        if (typeof securesite !== "undefined" && typeof securesite.profile === "function") {
          securesite.profile("${hostname}", "${orgId}", "${sessionId}");
        }
      `
      : "";

  return (
    <>
      <Head>
        {tagsScriptSrc && (
          <script src={tagsScriptSrc}></script>
        )}
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
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
        {/* Inline script in the body to call securesite.profile */}
        {inlineScript && (
          <script
            dangerouslySetInnerHTML={{ __html: inlineScript }}
          />
        )}
      </div>
    </>
  );
}