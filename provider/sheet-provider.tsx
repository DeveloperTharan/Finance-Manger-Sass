"use client";

import React from "react";
import { useMountedState } from "react-use";

import { NewAccount } from "@/features/accounts/components/new-account";
import { EditAccount } from "@/features/accounts/components/edit-account";

import { NewCategory } from "@/features/categories/components/new-category";
import { EditCategory } from "@/features/categories/components/edit-category";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewAccount />
      <EditAccount />

      <NewCategory />
      <EditCategory />
    </>
  );
};
