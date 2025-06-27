import { CloudRainWind } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="text-lg font-semibold flex items-center gap-x-2">
      <CloudRainWind className="!size-5" />
      <span>Storix</span>
    </Link>
  );
};

export default Logo;
