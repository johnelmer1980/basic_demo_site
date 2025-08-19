import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const { orgId, hostname, policy, sessionId } = router.query;

  useEffect(() => {
    if (!hostname || !orgId || !sessionId) return;

    const script = document.createElement("script");
    script.src = "/fp-clientlib-v5.js";
    script.onload = () => {
      if (typeof threatmetrix !== "undefined") {
        // Call threatmetrix.profile after library loads
        threatmetrix.profile(hostname, orgId, sessionId);
      } else {
        console.error("threatmetrix not defined after fp-clientlib-v5.js loaded");
      }
    };
    script.onerror = () => {
      console.error("Failed to load fp-clientlib-v5.js");
    };
    document.body.appendChild(script);
  }, [hostname, orgId, sessionId]);

  return (
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
    </div>
  );
}