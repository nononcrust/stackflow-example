import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import { Pop } from "@/lib/stackflow";

type HeaderProps = {
  left?: React.ReactNode;
  title?: string;
  right?: React.ReactNode;
};

export const Header = ({ left, title, right }: HeaderProps) => {
  return (
    <header
      className={cn(
        `h-[96px]`, // 헤더 56px + Safe Area 40px
        "fixed top-0 left-0 right-0",
        "bg-white/70 backdrop-blur-sm flex items-end"
      )}
    >
      <div
        className={cn(
          `px-4 h-[56px] w-full relative`,
          "flex items-center justify-between border-b border-border"
        )}
      >
        <div>{left}</div>
        <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-lg font-semibold">
          {title}
        </span>
        <div>{right}</div>
      </div>
    </header>
  );
};

const Back = () => {
  return (
    <Pop className="size-8 flex items-center justify-center">
      <ChevronLeftIcon size={28} />
    </Pop>
  );
};

Header.Back = Back;
