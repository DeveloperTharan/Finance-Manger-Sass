"use client";

import React from "react";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useConfirm } from "@/hooks/use-confirm";

type Props = {
  heading: string;
  description: string;
  onConfirm: () => void;
  disabled: boolean;
};

export const DeleteModel = ({
  description,
  heading,
  onConfirm,
  disabled,
}: Props) => {
  const { isOpen, onClose } = useConfirm();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{heading}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={onClose}
            disabled={disabled}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            size={"sm"}
            onClick={onConfirm}
            disabled={disabled}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
