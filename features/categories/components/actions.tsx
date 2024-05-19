"use client";

import React from "react";

import { useConfirm } from "@/hooks/use-confirm";
import { DeleteModel } from "@/components/delete-model";
import { useGetCategory } from "@/features/categories/api/use-get-category";
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";

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
  const { onOpen, onClose } = useOpenCategory();
  const confirm = useConfirm();

  const { data } = useGetCategory(id);
  const deleteMutation = useDeleteCategory(id);

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
        heading={`Delete this ${data?.name} category`}
        description="This action delete the category permanently!"
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
