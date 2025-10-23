"use client";

import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { useEffect } from "react";
import Event from "../components/event";
import { Field, Label } from "../components/fieldset";
import { Input } from "../components/input";
import { useRouteTransition } from "../components/route-transition";
import BackChevron from "../icons/back-chevron";

export default function Overview() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { startTransition } = useRouteTransition();

  //   if (!ready) return <div>Loading Privy...</div>;

  //   useEffect(() => {
  //     if (ready && !authenticated) {
  //       login();
  //     }
  //   }, [ready, authenticated, login]);

  return (
    <div className="flex flex-col h-dvh justify-center items-center">
      <div className="create-test-box">
        <div className="flex w-60 justify-between p-4">
          <button type="button" onClick={() => startTransition("/overview")}>
            <BackChevron width="24px" />
          </button>
          <span className="font-extrabold text-black">NEW EVENT</span>
        </div>
        <div className="flex flex-col justify-between h-[310px]">
          <Field>
            <Label htmlFor="name" className="text-black font-extrabold">
              Name
            </Label>
            <Input
              className="border rounded-xl placeholder::text-gray-400"
              type="text"
              name="name"
            />
          </Field>
          <Field>
            <Label htmlFor="location" className="text-black">
              Location
            </Label>
            <Input
              className="border rounded-xl text-black"
              type="text"
              name="location"
            />
          </Field>
          <div className="flex justify-between items-center">
            <Field className="w-[40%]">
              <Label htmlFor="date" className="text-black">
                Date
              </Label>
              <Input className="border rounded-xl" type="date" name="date" />
            </Field>
            <span className="font-extrabold mt-5">until</span>
            <Field className="w-[40%] items-end text-right">
              <Label htmlFor="date" className="text-gray-400 text-md">
                (optional)
              </Label>
              <Input className="border rounded-xl" type="date" name="date" />
            </Field>
          </div>
          <div className="flex justify-between items-center">
            <Field className="w-[40%]">
              <Label htmlFor="time" className="text-black">
                Time
              </Label>
              <Input className="border rounded-xl" type="time" name="time" />
            </Field>
            <span className="font-extrabold mt-5">until</span>
            <Field className="w-[40%] text-right">
              <Label htmlFor="time" className="text-gray-400">
                (optional)
              </Label>
              <Input className="border rounded-xl" type="time" name="time" />
            </Field>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="create-test-submit-btn">
            CREATE
          </button>
        </div>
      </div>
    </div>
  );
}
