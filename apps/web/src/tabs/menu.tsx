import { BottomTab } from "@/components/layout/bottom-tab";
import { Screen } from "@/components/layout/screen";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { ActivityComponentType } from "@stackflow/react/future";

export const MenuTab: ActivityComponentType<"MenuTab"> = () => {
  return (
    <AppScreen>
      <Screen>
        <h1>메뉴</h1>
        <BottomTab currentTab="menu" />
      </Screen>
    </AppScreen>
  );
};
