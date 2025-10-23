"use client";

import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  //   const { ready } = usePrivy();

  //   if (!ready) {
  //     return <div>Loading...</div>;
  //   }
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header className="flex flex-col w-full">
        <span className="text-[12px] gradient-text-secondary">Become</span>
        <span className="gradient-text font-extrabold">CONSCIOUS ACCESS</span>
      </header>
      <main className="flex flex-col  row-start-2 items-center">
        <div className="flex gap-4 items-center flex-col">
          <span className="gradient-text font-extrabold text-2xl">
            SEAMLES ACCESS
          </span>
          <span className="gradient-text-secondary font-extrabold text-2xl">
            UNMATCHED IDENTITY
          </span>
          <span className="gradient-text-subheading w-72 text-center pt-8">
            Our blockchain-powered platform provides a unique digital identity
            for every attendee, ensuring exclusive, secure, and seamlessly
            managed events.
          </span>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Link
          href="/login"
          type="button"
          className="bg-amber-700 p-3.5 rounded-3xl create-test-submit-btn font-bold text-center"
        >
          GET STARTED
        </Link>
      </footer>
    </div>
  );
}
