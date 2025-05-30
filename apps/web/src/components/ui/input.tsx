import { cn } from "@/lib/utils";

type InputProps = React.ComponentPropsWithRef<"input">;

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "h-[48px] px-4 rounded-lg bg-gray-50 outline-none",
        className
      )}
      {...props}
    />
  );
};
