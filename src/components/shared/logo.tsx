import { cn } from "@/lib/utils";
import Link from "next/link";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-1 bg-black text-lg font-semibold dark:bg-background sm:text-xl",
        className,
      )}
    >
      <span className="bg-white px-1 text-black">Storix</span>
      <span className="text-white dark:px-0">.app</span>
    </Link>
  );
};

export default Logo;
