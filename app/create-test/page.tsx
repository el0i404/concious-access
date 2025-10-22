"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import Event from "../components/event";

export default function CreateTest() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  //   if (!ready) return <div>Loading Privy...</div>;

  //   useEffect(() => {
  //     if (ready && !authenticated) {
  //       login();
  //     }
  //   }, [ready, authenticated, login]);

  return (
    <div className="flex flex-col">
      <nav className="sticky top-0 h-16 border-2 z-10 bg-white overflow-y-hidden p-5 text-center">
        <span className="gradient-text font-extrabold text-xl">
          CONSCIOUS ACCESS
        </span>
      </nav>
      <div className="flex flex-col overflow-y-auto p-5 gap-5 justify-center items-center">
        <Event />
        <Event />
        <Event />
        <Event />
        <Event />
        <Event />
        <Event />
        <Event />
        <Event />
      </div>
      <nav className="fixed bottom-0 h-16 border-2 z-10 bg-white overflow-y-hidden text-center flex justify-center items-center w-full">
        <button
          type="button"
          className="text-black  font-extrabold text-xl border-2 rounded-2xl p-1.5"
        >
          CREATE EVENT
        </button>
      </nav>
    </div>
  );
}
