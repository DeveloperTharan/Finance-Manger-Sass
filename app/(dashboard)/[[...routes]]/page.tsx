import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { Overview } from "@/components/pages/overview";
import { Settings } from "@/components/pages/settings";
import { Category } from "@/components/pages/category";
import { Accounts } from "@/components/pages/accounts";
import { Transactions } from "@/components/pages/transactions";

export default function Home({ params }: { params: { routes: string[] } }) {
  const currentRoute = params.routes || ["/"];

  const requiredRoute = currentRoute.some((route) => hrefs.includes(route));

  if (currentRoute.length > 1 || !requiredRoute) {
    return redirect("/");
  }

  return <>{switchRoute(currentRoute[0])}</>;
}

const hrefs = ["/", "transactions", "accounts", "category", "settings"];

export async function generateMetadata({
  params,
}: {
  params: { routes: string[] };
}): Promise<Metadata> {
  const { routes } = params;

  if (!routes)
    return {
      title: "MINT",
    };

  return {
    title: `${
      routes[0].charAt(0).toUpperCase() + routes[0].slice(1).toLowerCase()
    } | MINT`,
  };
}

const switchRoute = (currentRoute: string) => {
  switch (currentRoute) {
    case "/":
      return <Overview />;
    case "transactions":
      return <Transactions />;
    case "accounts":
      return <Accounts />;
    case "category":
      return <Category />;
    case "settings":
      return <Settings />;
    default:
      return redirect("/");
  }
};
