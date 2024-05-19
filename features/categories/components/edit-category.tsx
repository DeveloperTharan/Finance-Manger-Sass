import React from "react";

import { z } from "zod";
import { useConfirm } from "@/hooks/use-confirm";
import { insertCategoryScheme } from "@/db/schema";
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useGetCategory } from "@/features/categories/api/use-get-category";
import { useEditCategory } from "@/features/categories/api/use-edit-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { DeleteModel } from "@/components/delete-model";

import { Loader2 } from "lucide-react";

const formSchema = insertCategoryScheme.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditCategory = () => {
  const { isOpen, onClose, id } = useOpenCategory();
  const confirm = useConfirm();

  const { data, isLoading } = useGetCategory(id);

  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = () => {
    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        confirm.onClose();
        onClose();
      },
    });
  };

  const defaultValues = data ? { name: data.name } : { name: "" };

  return (
    <>
      <DeleteModel
        heading={`Delete this ${data?.name} category`}
        description="This action delete the category permanently!"
        onConfirm={onDelete}
        disabled={deleteMutation.isPending}
      />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit category</SheetTitle>
            <SheetDescription>Edit an existing category!</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-normal">
              <Loader2 className="animate-spin size-4 text-muted-foreground" />
            </div>
          ) : (
            <CategoryForm
              onSubmit={onSubmit}
              defaultValues={defaultValues}
              disabled={editMutation.isPending || deleteMutation.isPending}
              id={id}
              onDelete={() => confirm.onOpen()}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
