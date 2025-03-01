"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NEW_FOLDER_DIALOG_STATE_KEY } from "@/lib/constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import LoadingButton from "./loading-button";
import { createFolderSchema } from "@/lib/zod-schema";
import usePath from "@/hooks/use-path";
import type { TFolder } from "@/lib/prisma-extended-types";

type CreateFolderInput = z.infer<typeof createFolderSchema>;

const NewFolderDialog = ({ folder }: { folder: TFolder }) => {
  const { path } = usePath();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isOpen = !!searchParams.get(NEW_FOLDER_DIALOG_STATE_KEY);

  const { mutate: createFolder, isPending } =
    api.dashboard.createFolder.useMutation();

  const form = useForm<CreateFolderInput>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      name: "",
      path: path,
    },
  });

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete(NEW_FOLDER_DIALOG_STATE_KEY);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    form.reset();
  };

  const onSubmit = (values: CreateFolderInput) => {
    createFolder(
      {
        name: values.name,
        path: path,
        parentId: folder.id,
      },
      {
        onSuccess: (data) => {
          if (data.warning) {
            toast.warning(data.message);
            return;
          }

          router.refresh();
          toast.success(data.message);
          handleClose();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Folder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter folder name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              {isPending ? (
                <LoadingButton text="Creating..." />
              ) : (
                <Button type="submit">Create</Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewFolderDialog;
