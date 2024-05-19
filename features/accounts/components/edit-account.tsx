import React from "react";

import { z } from "zod";
import { useConfirm } from "@/hooks/use-confirm";
import { insertAccountScheme } from "@/db/schema";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { useEditAccount } from "@/features/accounts/api/use-edit-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DeleteModel } from "@/components/delete-model";

import { Loader2 } from "lucide-react";

const formSchema = insertAccountScheme.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditAccount = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  const confirm = useConfirm();

  const { data, isLoading } = useGetAccount(id);

  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);

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
        heading={`Delete this ${data?.name} account`}
        description="This action delete the account permanently!"
        onConfirm={onDelete}
        disabled={deleteMutation.isPending}
      />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an existing account!</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-normal">
              <Loader2 className="animate-spin size-4 text-muted-foreground" />
            </div>
          ) : (
            <AccountForm
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
