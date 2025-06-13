import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Menu, X } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "../ui/button";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

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

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"}`}
    >
      <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <div className="from-primary to-primary/70 text-primary-foreground flex size-8 items-center justify-center rounded-lg bg-gradient-to-br">
            S
          </div>
          <span>storix</span>
        </Link>
        <nav className="hidden gap-8 md:flex">
          <a
            href="#features"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Features
          </a>
          <a
            href="#testimonials"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Testimonials
          </a>
          <a
            href="#pricing"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            FAQ
          </a>
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <ModeToggle />
          <Link
            to="/auth/login"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Log in
          </Link>
          <Button
            className="cursor-pointer rounded-full"
            onClick={() => navigate({ to: "/auth/sign-up" })}
          >
            Get Started
            <ChevronRight className="ml-1 size-4" />
          </Button>
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-background/95 absolute inset-x-0 top-16 border-b backdrop-blur-lg md:hidden"
        >
          <div className="container flex flex-col gap-4 py-4">
            <a
              href="#features"
              className="py-2 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="py-2 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="py-2 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="py-2 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <div className="flex flex-col gap-2 border-t pt-2">
              <Link
                to="/auth/login"
                className="py-2 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Button className="rounded-full">
                Get Started
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
