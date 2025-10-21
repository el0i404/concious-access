"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import Event from "../components/event";

export default function Login() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  //   if (!ready) return <div>Loading Privy...</div>;

  //   useEffect(() => {
  //     if (ready && !authenticated) {
  //       login();
  //     }
  //   }, [ready, authenticated, login]);

  return (
    <div className="flex flex-col">
      <nav className="sticky top-0 h-16 border-2 z-10 bg-amber-600 overflow-y-hidden p-5 text-center">
        CONSCIOUS ACCESS
      </nav>
      <div className="flex flex-col overflow-y-auto p-5 gap-5">
        <Event />
        <Event />
        <Event />
        {/* <Event />
        <Event />
        <Event />
        <Event />
        <Event />
        <Event /> */}
        {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error, dicta
        deleniti. Repellat, vel ut! Expedita inventore, ad mollitia rem
        quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Error, dicta deleniti. Repellat, vel ut! Expedita inventore, ad mollitia
        rem quibusdam quis animi aut eligendi asperiores consequuntur a corporis
        minima quos! */}
      </div>
    </div>
  );
}
