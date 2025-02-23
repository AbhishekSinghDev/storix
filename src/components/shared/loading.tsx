import { Loader2 } from "lucide-react";

const Loading = ({ text }: { text?: string }) => {
  return (
    <div className="flex items-center gap-3">
      <Loader2 className="animate-spin" />
      <span>{text}</span>
    </div>
  );
};

export default Loading;
