import React from "react";
import Image from "next/image";

export default function Authlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-[90%] hidden lg:flex flex-col text-center items-center justify-center border-r my-auto">
        <div className="flex items-center justify-center gap-x-1">
          <Image src="logo.svg" alt="logo" width={100} height={100} />
          <h1 className="text-[#2E2A47] text-5xl font-extrabold">MINT</h1>
        </div>
        <p className="text-balance text-[#7E8CA0] text-sm mt-5 max-w-[80%]">
          MINT is a leading personal finance tracker that helps users manage
          their money by tracking spending, creating budgets, and monitoring
          credit scores.
        </p>
      </div>
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome Back!</h1>
          <p className="text-base text-[#7E8CA0]">
            Log in or Create account to get back to your dashboard!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">{children}</div>
      </div>
    </div>
  );
}
