import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "./navigation";

import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

import { WelcomeMsg } from "./welcome-msg";

import { Loader2 } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <Link href="/">
              <div className="items-center hidden lg:flex">
                <Image
                  src={"meta-logo.svg"}
                  alt="logo"
                  width={40}
                  height={40}
                />
                <p className="font-semibold text-[#dbd5ff] text-2xl ml-2.5">
                  MINT
                </p>
              </div>
            </Link>
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin size-4 text-slate-400" />
          </ClerkLoading>
        </div>
        <WelcomeMsg />
      </div>
    </header>
  );
};
