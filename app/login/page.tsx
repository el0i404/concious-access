"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) {
      login;
    } else {
      router.replace("/overview");
    }
  }, []);

  useEffect(() => {
    if (ready && authenticated) {
      router.replace("/overview"); // Redirect if not logged in
    }
  }, [ready, authenticated, login, router]);

  if (!ready) return <div>Loading Privy...</div>;

  return (
    <div>
      {!authenticated ? (
        <button onClick={login}>Login with Privy</button>
      ) : (
        <>
          {/* <p>Welcome {user?.email ?? user?.wallet?.address}</p> */}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}
