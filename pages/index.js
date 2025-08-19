import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [orgId, setOrgId] = useState("ctvkbfxp");
  const [hostname, setHostname] = useState("h.online-metrix.net");
  const [policy, setPolicy] = useState("default");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    // Generate session_id on page load
    const hash = btoa(Date.now().toString());
    setSessionId(hash);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/profile",
      query: { orgId, hostname, policy, sessionId },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">ThreatMetrix Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Org ID:</label>
            <input
              type="text"
              value={orgId}
              onChange={(e) => setOrgId(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Hostname:</label>
            <input
              type="text"
              value={hostname}
              onChange={(e) => setHostname(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Policy:</label>
            <input
              type="text"
              value={policy}
              onChange={(e) => setPolicy(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Session ID:</label>
            <input
              type="text"
              value={sessionId}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go
          </button>
        </form>
      </div>
    </div>
  );
}