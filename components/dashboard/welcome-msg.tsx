"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";

export const WelcomeMsg = () => {
  const { isLoaded, user } = useUser();

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        Welcome Back {isLoaded ? "," : " "}
        {user?.firstName}
        {user?.lastName}✌🏻
      </h2>
      <p className="text-sm lg:text-base text-[#bdd6ff]">
        This is your financial management report!
      </p>
    </div>
  );
};
