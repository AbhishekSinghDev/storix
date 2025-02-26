import "@/styles/globals.css";

import { Mona_Sans as FontSans } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import Providers from "./providers";
import { env } from "@/env";

export const metadata: Metadata = {
  title: "Storix",
  description: "Cloud storage with an X factor",
  icons: [{ rel: "icon", url: "/storix.ico" }],
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontSans.className} suppressHydrationWarning>
      {env.NODE_ENV === "development" && (
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
          async
        />
      )}
      <body
        className={
          "min-h-screen self-center bg-background font-sans antialiased"
        }
      >
        <TRPCReactProvider>
          <Providers>{children}</Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
