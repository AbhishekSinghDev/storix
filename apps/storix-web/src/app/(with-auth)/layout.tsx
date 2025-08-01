import "../../index.css";

import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { AuthenticatedProviders } from "@/components/providers/providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Storix",
  description:
    "Storix is a modern, open-source, and self-hosted file storage solution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} antialiased`}>
        <AuthenticatedProviders>
          <>{children}</>
        </AuthenticatedProviders>
      </body>
    </html>
  );
}
