import { cn } from "@/lib/utils";

type ScreenProps = React.ComponentPropsWithRef<"main">;

export const Screen = ({ className, children }: ScreenProps) => {
  return (
    <main
      className={cn(
        `mt-[96px]`, // 헤더 56px + Safe Area 40px
        `mb-[88px]`, // 하단 Safe Area 24px + 하단탭 64px
        `h-[calc(100dvh-184px)]`, // 헤더 + 상하단 Safe Area + 하단탭
        "px-4 flex flex-col overflow-y-auto scrollbar-hide",
        className
      )}
    >
      {children}
    </main>
  );
};
