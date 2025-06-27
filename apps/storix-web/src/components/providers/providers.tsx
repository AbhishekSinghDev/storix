"use client";

import { ThemeProvider } from "../shared/theme-provider";
import { Toaster } from "../ui/sonner";
import ReactQueryProvider from "./react-query";

export function AuthenticatedProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster richColors />
      </ThemeProvider>
    </ReactQueryProvider>
  );
}

export function UnauthenticatedProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster richColors />
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
