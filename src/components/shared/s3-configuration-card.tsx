"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { bucketConfigurationSchema } from "@/lib/zod-schema";
import { AWS_REGIONS } from "@/lib/constant";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import type { AWSRegion } from "@/lib/types";
import ThemeToggleButton from "./theme-toggle-button";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import LoadingButton from "./loading-button";
import { useRouter } from "next/navigation";

const S3ConfigurationCard = () => {
  const router = useRouter();
  const { mutate: configureS3, isPending } = api.user.configureS3.useMutation();

  const form = useForm<z.infer<typeof bucketConfigurationSchema>>({
    resolver: zodResolver(bucketConfigurationSchema),
    defaultValues: {
      s3AccessKey: "",
      s3SecretKey: "",
      s3BucketKey: "",
    },
  });

  const onSubmit = (values: z.infer<typeof bucketConfigurationSchema>) => {
    console.log("values: ", values);

    configureS3(values, {
      onSuccess: (opts) => {
        router.push("/dashboard/home");
        toast.success(opts.message);
      },
      onError: (opts) => {
        toast.error(opts.message);
      },
    });
  };

  return (
    <section className="mx-auto flex min-h-svh max-w-screen-xl items-center justify-center px-4">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Configure Your Bucket</span>
            <ThemeToggleButton />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="s3AccessKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Access Key</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your AWS access key"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your AWS IAM user access key ID
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="s3SecretKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secret Key</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your AWS secret key"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your AWS IAM user secret access key
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="s3BucketKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bucket Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your bucket name" {...field} />
                    </FormControl>
                    <FormDescription>
                      The name of your S3 bucket
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="s3Region"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Region</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? `${AWS_REGIONS[field.value]} (${field.value})`
                              : "Select region"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0 md:w-[450px]">
                        <Command>
                          <CommandInput
                            placeholder="Search region..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No region found.</CommandEmpty>
                            <CommandGroup>
                              {Object.entries(AWS_REGIONS).map(
                                ([region, description]) => (
                                  <CommandItem
                                    value={region}
                                    key={region}
                                    onSelect={() => {
                                      form.setValue(
                                        "s3Region",
                                        region as AWSRegion,
                                      );
                                    }}
                                  >
                                    {description} ({region})
                                    <Check
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        region === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ),
                              )}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Select the AWS region where your bucket is located
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-4">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                {isPending ? (
                  <LoadingButton text="Connecting Bucket" />
                ) : (
                  <Button type="submit">Connect Bucket</Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default S3ConfigurationCard;
