"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UPLOAD_DIALOG_STATE_KEY } from "@/lib/constant";
import { useRouter, useSearchParams } from "next/navigation";

const UploadFileDialog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = !!searchParams.get(UPLOAD_DIALOG_STATE_KEY);

  const handleDialogOpenState = () => {
    const params = new URLSearchParams();

    if (isOpen) {
      params.delete(UPLOAD_DIALOG_STATE_KEY);
    } else {
      params.append(UPLOAD_DIALOG_STATE_KEY, "true");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenState}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UploadFileDialog;
