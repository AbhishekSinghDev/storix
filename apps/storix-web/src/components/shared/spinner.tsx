import { Loader2 } from "lucide-react";

const Spinner = () => {
  return (
    <div className="item-center flex justify-center">
      <Loader2 className="text-primary h-8 w-8 animate-spin" />
    </div>
  );
};

export default Spinner;
