import Link from "next/link";
import Logo from "../shared/logo";

export function Footer() {
  return (
    <footer className="border-t border-gray-500 py-6 backdrop-blur-xl sm:py-8">
      <div className="container flex flex-col items-center justify-between sm:flex-row">
        <div className="mb-4 flex items-center sm:mb-0">
          <Logo />
        </div>

        <div className="flex gap-4 text-sm text-gray-400 sm:gap-6 sm:text-base">
          <Link href="#" className="transition-colors hover:text-white">
            Home
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Features
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Pricing
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Docs
          </Link>
        </div>
      </div>
    </footer>
  );
}
