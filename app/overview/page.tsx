"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Event from "../components/event";
import EventModal from "../components/event-modal";
import { useTransitionRouter } from "../components/transition-provider";

export default function Overview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ready, authenticated, user } = usePrivy();
  const router = useRouter();
  const { navigate } = useTransitionRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.replace("/login"); // Redirect if not logged in
    }
  }, [ready, authenticated, router]);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  if (!ready) return <div>Loading...</div>;
  if (!authenticated) return null; // Prevent flicker

  return (
    <div className="flex flex-col">
      <nav className="sticky top-0 h-16  z-10 bg-white overflow-y-hidden p-5 text-center">
        <span className="gradient-text font-extrabold text-xl">
          CONSCIOUS ACCESS
        </span>
      </nav>
      <button type="button" onClick={handleEdit}>
        CLICK
      </button>
      <EventModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
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
      <nav className="fixed bottom-0 h-16 z-10 bg-white overflow-y-hidden text-center flex justify-center items-center w-full">
        <button
          onClick={() => navigate("/create-event")}
          type="button"
          //   onClick={() => startTransition("/create-event")}
          className="text-black  font-extrabold text-xl border-2 rounded-2xl p-1.5"
        >
          CREATE EVENT
        </button>
      </nav>
    </div>
  );
}
