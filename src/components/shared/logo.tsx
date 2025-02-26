import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-1 bg-black text-lg font-semibold dark:bg-background sm:text-xl"
    >
      <span className="bg-white px-1 text-black">Storix</span>
      <span className="text-white dark:px-0">.app</span>
    </Link>
  );
};

export default Logo;
