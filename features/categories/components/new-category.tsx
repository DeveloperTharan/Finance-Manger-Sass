import React from "react";

import { z } from "zod";
import { insertCategoryScheme } from "@/db/schema";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";

const formSchema = insertCategoryScheme.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewCategory = () => {
  const { isOpen, onClose } = useNewCategory();

  const { mutate, isPending } = useCreateCategory();

  const onSubmit = (values: FormValues) => {
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to organize your transactions.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          defaultValues={{ name: "" }}
          disabled={isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
