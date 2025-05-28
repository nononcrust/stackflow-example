import { Push, Replace } from "@/lib/stackflow";
import { cn } from "@/lib/utils";
import { HomeIcon, MenuIcon } from "lucide-react";

type Tab = "home" | "menu";

type BottomTabProps = {
  currentTab: Tab;
};

export const BottomTab = ({ currentTab }: BottomTabProps) => {
  return (
    <nav
      className={cn(
        `h-[88px]`, // 64px + 24px
        `pb-[24px]`,
        "fixed bottom-0 left-0 right-0 flex justify-around items-center border-t border-border bg-white"
      )}
    >
      <BottomTabItem to="tab/home" isActive={currentTab === "home"}>
        <HomeIcon />
        <BottomTabLabel>홈</BottomTabLabel>
      </BottomTabItem>
      <BottomTabItem to="tab/menu" isActive={currentTab === "menu"}>
        <MenuIcon />
        <BottomTabLabel>메뉴</BottomTabLabel>
      </BottomTabItem>
    </nav>
  );
};

type BottomTabItemProps = {
  to: Parameters<typeof Push>[0]["to"];
  children: React.ReactNode;
  isActive: boolean;
};

const BottomTabItem = ({ to, children, isActive }: BottomTabItemProps) => {
  return (
    <Replace
      to={to}
      className={cn(
        "flex flex-col gap-0.5 text-subtle items-center",
        isActive && "text-main"
      )}
      options={{
        animate: false,
      }}
    >
      {children}
    </Replace>
  );
};

const BottomTabLabel = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-[13px]">{children}</span>;
};
