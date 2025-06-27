"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "../shared/logo";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Logo />
          <nav className="hidden space-x-4 md:flex">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/about" className="hover:text-primary">
              About
            </Link>
            <Link href="/services" className="hover:text-primary">
              Services
            </Link>
            <Link href="/contact" className="hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={toggleTheme}
            className="hidden md:flex"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="absolute left-0 right-0 top-full z-40 bg-background p-4 shadow-lg"
        >
          <nav className="flex flex-col space-y-2">
            <Link href="/" className="block p-2 hover:bg-muted">
              Home
            </Link>
            <Link href="/about" className="block p-2 hover:bg-muted">
              About
            </Link>
            <Link href="/services" className="block p-2 hover:bg-muted">
              Services
            </Link>
            <Link href="/contact" className="block p-2 hover:bg-muted">
              Contact
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
