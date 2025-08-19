import { useEffect } from "react";
import { useRouter } from "next/router";

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
    <div style={{ padding: "2rem" }}>
      <h1>ThreatMetrix Profile</h1>
      <p><strong>Org ID:</strong> {orgId}</p>
      <p><strong>Hostname:</strong> {hostname}</p>
      <p><strong>Policy:</strong> {policy}</p>
      <p><strong>Session ID:</strong> {sessionId}</p>
      <p>The ThreatMetrix script has been executed.</p>
    </div>
  );
}