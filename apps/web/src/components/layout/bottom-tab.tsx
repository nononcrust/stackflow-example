import { cn } from "@/lib/utils";
import { HomeIcon, MenuIcon } from "lucide-react";
import { Link } from "@stackflow/link/future";
import { Slot } from "radix-ui";

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
      <BottomTabItem isActive={currentTab === "home"}>
        <Link
          activityName="HomeTab"
          activityParams={{}}
          replace
          animate={false}
        >
          <HomeIcon />
          <BottomTabLabel>홈</BottomTabLabel>
        </Link>
      </BottomTabItem>
      <BottomTabItem isActive={currentTab === "menu"}>
        <Link
          activityName="MenuTab"
          activityParams={{}}
          replace
          animate={false}
        >
          <MenuIcon />
          <BottomTabLabel>메뉴</BottomTabLabel>
        </Link>
      </BottomTabItem>
    </nav>
  );
};

type BottomTabItemProps = {
  children: React.ReactNode;
  isActive: boolean;
};

const BottomTabItem = ({ children, isActive }: BottomTabItemProps) => {
  return (
    <Slot.Root
      className={cn(
        "flex flex-col gap-0.5 text-subtle items-center",
        isActive && "text-main"
      )}
    >
      {children}
    </Slot.Root>
  );
};

const BottomTabLabel = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-[13px]">{children}</span>;
};
