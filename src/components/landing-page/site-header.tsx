"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import ProfileButton from "./profile-button";
import Logo from "../shared/logo";

type SiteHeaderProps = {
  isAuthenticated?: boolean;
};

const SiteHeader = ({ isAuthenticated }: SiteHeaderProps) => {
  const pathname = usePathname();
  const isAuthPage = pathname === "/signin" || pathname === "/register";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-5">
          <Link href="/" className="group flex items-center space-x-2">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-xl font-bold"
            >
              <Logo />
            </motion.span>
          </Link>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <NavigationMenu className="hidden text-sm md:flex">
              <NavigationMenuList>
                {/* <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-6 md:w-[500px]">
                      <div className="grid gap-1">
                        <NavigationMenuLink asChild>
                          <Link
                            href="#"
                            className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                          >
                            <div className="text-sm font-medium leading-none">
                              Bot Builder
                            </div>
                            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                              Create powerful Discord bots without code
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-6 md:w-[500px]">
                      <div className="grid gap-1">
                        <NavigationMenuLink asChild>
                          <Link
                            href="#"
                            className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                          >
                            <div className="text-sm font-medium leading-none">
                              Documentation
                            </div>
                            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                              Learn how to build and customize your bots
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem> */}

                <NavigationMenuItem>
                  <Link href="#pricing" legacyBehavior passHref>
                    <NavigationMenuLink className="h-10 px-4 py-2">
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#pricing" legacyBehavior passHref>
                    <NavigationMenuLink className="h-10 px-4 py-2">
                      Features
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#pricing" legacyBehavior passHref>
                    <NavigationMenuLink className="h-10 px-4 py-2">
                      Pricing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#pricing" legacyBehavior passHref>
                    <NavigationMenuLink className="h-10 px-4 py-2">
                      Docs
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </motion.div>
        </div>

        {!isAuthPage && !isAuthenticated && (
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/signin">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Start Uploading</Link>
            </Button>
          </div>
        )}

        {isAuthenticated && <ProfileButton />}
      </div>
    </motion.header>
  );
};

export default SiteHeader;
