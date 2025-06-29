"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Menu } from "lucide-react";
import Link from "next/link";
import Logo from "../shared/logo";
import { ModeToggle } from "../shared/mode-toggle";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavigationProps {
  isAuthenticated: boolean;
}

const Header = () => {
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg shadow-sm border-b">
      <div className="container max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6">
          <Logo />
          <DesktopNavigation isAuthenticated={isAuthenticated} />
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden sm:flex items-center space-x-2">
            {isAuthenticated ? (
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/auth/sign-in">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/auth/sign-up">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
          <ModeToggle />

          {/* Mobile menu trigger */}
          <div className="md:hidden">
            <MobileNavigation isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

const DesktopNavigation = ({ isAuthenticated }: NavigationProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link
        href="/"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Home
      </Link>
      <Link
        href="/about"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        About
      </Link>
      <Link
        href="/contact"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Contact
      </Link>
    </nav>
  );
};

const MobileNavigation = ({ isAuthenticated }: NavigationProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="px-2 py-6">
        <div className="flex flex-col space-y-1 mt-6">
          <Link
            href="/"
            className="block px-3 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
          >
            Contact
          </Link>

          <div className="pt-4 mt-4 border-t">
            {isAuthenticated ? (
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <div className="space-y-2">
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
