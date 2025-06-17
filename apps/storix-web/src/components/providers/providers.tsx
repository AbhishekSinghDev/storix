"use client";

import { ThemeProvider } from "../shared/theme-provider";
import { Toaster } from "../ui/sonner";
import ReactQueryProvider from "./react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
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
