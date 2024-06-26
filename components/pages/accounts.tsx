"use client";

import React from "react";

import { columns } from "@/features/accounts/components/colums";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useBulkDeleteAccount } from "@/features/accounts/api/use-bulk-delete";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Loader2, Plus } from "lucide-react";

export const Accounts = () => {
  const { onOpen } = useNewAccount();
  const { data, isLoading } = useGetAccounts();
  const { mutate, isPending } = useBulkDeleteAccount();

  if (isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-8 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="h-[500px] w-full flex items-center justify-center">
            <Loader2 className="animate-spin size-6 text-slate-300" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:flex-items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Account Page</CardTitle>
          <Button size={"sm"} onClick={onOpen}>
            <Plus className="size-4 mr-2" />
            Add now
          </Button>
        </CardHeader>
      </Card>
      <div className="mt-5 pb-20">
        <DataTable
          columns={columns}
          data={data ?? []}
          filterKey="name"
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            mutate({ ids });
          }}
          disabled={isLoading || isPending}
        />
      </div>
    </div>
  );
};
