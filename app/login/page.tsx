"use client";
import { usePrivy } from "@privy-io/react-auth";

export default function Login() {
  const { ready, authenticated, user, login, logout } = usePrivy();

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
