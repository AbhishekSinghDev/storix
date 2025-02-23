"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

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
import { signIn } from "next-auth/react";
import { signInFormSchema } from "@/lib/zod-schema";
import { toast } from "sonner";
import { useState } from "react";
import type { ButtonProps, TStatus } from "@/lib/types";
import Loading from "@/components/shared/loading";
import { useRouter } from "next/navigation";

const SigninForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const router = useRouter();
  const [status, setStatus] = useState<TStatus>("idle");

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGithubAuth = async () => {
    try {
      setStatus("loading");
      const res = await signIn("github");

      if (res?.ok) {
        setStatus("success");
        router.push("/");
        toast.success("Authentication Successfull");
        return;
      }

      if (!res?.ok || !res.error) {
        setStatus("error");
        toast.error("Unauthorized!");
        return;
      }

      setStatus("error");
      toast.error("Something unexpected happend!");
    } catch (err) {
      setStatus("error");
      console.error(err);
      toast.error("Internal Server Error");
    }
  };

  const onSubmit = (values: z.infer<typeof signInFormSchema>) => {
    console.log(values);
  };

  return (
    <>
      <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        {status === "loading" && (
          <div className="absolute flex min-h-svh w-full items-center justify-center border bg-background/80">
            <Loading text="Authenticating..." />
          </div>
        )}
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Welcome back</CardTitle>
                <CardDescription>
                  Login with your Github or Google account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="grid gap-6">
                    <div className="flex flex-col gap-4">
                      <OAuthButton
                        alt="github"
                        icon="/icons/github.svg"
                        text="Login with Github"
                        onClick={async () => await handleGithubAuth()}
                      />
                      <OAuthButton
                        alt="google"
                        icon="/icons/google.svg"
                        text="Login with Google"
                        iconClassName="size-4"
                      />
                    </div>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                      <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-6"
                      >
                        <div className="grid gap-2">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="example@provider.com"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid gap-2">
                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center justify-between">
                                  <span>Password</span>
                                  <Link
                                    href="#"
                                    className="ml-auto text-sm underline-offset-4 hover:underline"
                                  >
                                    Forgot your password?
                                  </Link>
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Sign in
                        </Button>
                      </form>
                    </Form>
                    <div className="text-center text-sm">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/register"
                        className="underline underline-offset-4"
                      >
                        Sign up
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <button></button>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
              By clicking continue, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninForm;

type OAuthButtonProps = ButtonProps & {
  alt: string;
  icon: string;
  text: string;
  iconClassName?: string;
};

const OAuthButton = ({
  alt,
  icon,
  text,
  className,
  iconClassName,
  ...props
}: OAuthButtonProps) => {
  return (
    <Button variant="outline" className={cn("w-full", className)} {...props}>
      <Image
        src={icon}
        alt={alt}
        height={100}
        width={100}
        className={cn("size-6 dark:invert", iconClassName)}
      />
      {text}
    </Button>
  );
};
