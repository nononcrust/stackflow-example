import { cn } from "@/lib/utils";
import { layoutConfig } from "./config";

type ScreenProps = React.ComponentPropsWithRef<"main">;

export const Screen = ({ className, children }: ScreenProps) => {
  const screenMargin =
    layoutConfig.headerHeight +
    layoutConfig.bottomTabHeight +
    layoutConfig.safeArea.top +
    layoutConfig.safeArea.bottom;

  return (
    <main
      className={cn(
        `mt-[${layoutConfig.headerHeight + layoutConfig.safeArea.top}px]`,
        `mb-[${layoutConfig.bottomTabHeight + layoutConfig.safeArea.bottom}px]`,
        `h-[calc(100dvh-${screenMargin}px)]`,
        "px-4 flex flex-col overflow-y-auto scrollbar-hide",
        className
      )}
    >
      {children}
    </main>
  );
};
