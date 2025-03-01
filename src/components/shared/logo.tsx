import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSidebar } from "../ui/sidebar";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  const { state } = useSidebar();

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-1 bg-black text-lg font-semibold dark:bg-background sm:text-xl",
        className,
        state === "collapsed" &&
          "w-full justify-center rounded-full bg-black dark:bg-white",
      )}
    >
      {state === "collapsed" ? (
        <span className="flex items-center justify-center text-white dark:text-black">
          S
        </span>
      ) : (
        <>
          <span className="bg-white px-1 text-black">Storix</span>
          <span className="text-white dark:px-0">.app</span>
        </>
      )}
    </Link>
  );
};

export default Logo;
