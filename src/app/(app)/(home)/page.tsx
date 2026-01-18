"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const trpc = useTRPC();
  const { data, isLoading, error, refetch } = useQuery(trpc.auth.session.queryOptions());

  // Debug: Log cookies and session data
  useEffect(() => {
    console.log("Session data:", data);
    console.log("Session error:", error);
    console.log("Cookies:", document.cookie);

    // Check if cookie exists
    const cookieExists = document.cookie.includes('payload-token');
    console.log("Auth cookie exists:", cookieExists);
  }, [data, error]);

  if (isLoading) {
    return (
      <div className="p-4">
        <div>Loading session...</div>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500 font-bold">Error: {error.message}</p>
        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
          {JSON.stringify(error, null, 2)}
        </pre>
        <div className="mt-4">
          <p className="font-semibold">Debug Info:</p>
          <p>Cookies: {document.cookie || "No cookies found"}</p>
          <p>Has auth cookie: {document.cookie.includes('payload-token') ? 'Yes' : 'No'}</p>
        </div>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // Helper: Render key-value pairs for user
  function renderUserKeyValue(user: object) {
    // Only show something if user is object and not null
    if (!user || typeof user !== "object") return null;
    return (
      <table className="w-full text-sm bg-white border mb-2">
        <tbody>
          {Object.entries(user).map(([key, value]) => (
            <tr key={key} className="border-b last:border-b-0">
              <td className="font-mono font-semibold px-2 py-1 w-1/3 bg-gray-50">{key}</td>
              <td className="px-2 py-1 break-all">
                {typeof value === "object" && value !== null
                  ? <pre className="whitespace-pre-wrap break-all">{JSON.stringify(value, null, 2)}</pre>
                  : String(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Session Data:</h2>
        {data?.user
          ? (
            <>
              {/* Show friendly key-value table */}
              {renderUserKeyValue(data.user)}
              {/* Also show whole user data as raw JSON if desired */}
              <details>
                <summary className="cursor-pointer text-blue-600 text-sm">Show raw JSON</summary>
                <pre className="p-4 bg-gray-100 rounded text-xs overflow-auto mt-2">
                  {JSON.stringify(data.user, null, 2)}
                </pre>
              </details>
            </>
          )
          : <div>No user data (not logged in)</div>
        }
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p>Cookies: {document.cookie || "No cookies found"}</p>
        <p>Has auth cookie: {document.cookie.includes('payload-token') ? 'Yes' : 'No'}</p>
        <p>Full session response: {JSON.stringify(data, null, 2)}</p>
      </div>
      {!data?.user && (
        <div className="mt-4 p-4 bg-yellow-100 rounded">
          <p className="font-semibold">Not logged in</p>
          <Link href="/sign-in" className="text-blue-500 underline">Go to sign in page</Link>
        </div>
      )}
    </div>
  );
}
