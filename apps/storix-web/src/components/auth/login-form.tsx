import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";

import type { LoginFormValues } from "~/lib/schema";
import { SocialLoginButtons } from "~/components/auth/social-login-buttons";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { LoginSchema } from "~/lib/schema";
import { Checkbox } from "../ui/checkbox";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1 pb-6">
        <div className="space-y-4">
          <SocialLoginButtons />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-muted-foreground px-2">
                Or continue with email
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  name="remember-me"
                  className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                />
                <label
                  htmlFor="remember-me"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Remember me
                </label>
              </div>
              <Button
                variant="link"
                className="text-primary hover:text-primary/80 px-0 text-sm"
                type="button"
              >
                Forgot password?
              </Button>
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Button
              variant="link"
              className="text-primary hover:text-primary/80 px-0"
              asChild
            >
              <Link to="/auth/sign-up">Sign up</Link>
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
