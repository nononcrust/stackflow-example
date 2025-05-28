import { BottomTab } from "@/components/layout/bottom-tab";
import { Screen } from "@/components/layout/screen";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { ActivityComponentType } from "@stackflow/react";

export const MenuTab: ActivityComponentType = () => {
  return (
    <AppScreen>
      <Screen>
        <h1>메뉴</h1>
        <BottomTab currentTab="menu" />
      </Screen>
    </AppScreen>
  );
};
