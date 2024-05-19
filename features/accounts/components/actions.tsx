"use client";

import React from "react";

import { useConfirm } from "@/hooks/use-confirm";
import { DeleteModel } from "@/components/delete-model";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

type props = {
  id: string;
};

export const Actions = ({ id }: props) => {
  const { onOpen, onClose } = useOpenAccount();
  const confirm = useConfirm();

  const { data } = useGetAccount(id);
  const deleteMutation = useDeleteAccount(id);

  const onDelete = () => {
    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        confirm.onClose();
        onClose();
      },
    });
  };

  return (
    <>
      <DeleteModel
        heading={`Delete this ${data?.name} account`}
        description="This action delete the account permanently!"
        onConfirm={onDelete}
        disabled={deleteMutation.isPending}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant={"ghost"} className="size-8 p-0">
            <MoreHorizontal className="text-slate-500 size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={false} onClick={() => confirm.onOpen()}>
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
