"use client";

import { BottomTab } from "@/components/layout/bottom-tab";
import { Screen } from "@/components/layout/screen";
import { Tabs } from "@/components/ui/tabs";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { ActivityComponentType } from "@stackflow/react/future";
import { useState } from "react";

export const MenuTab: ActivityComponentType<"MenuTab"> = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <AppScreen>
      <Screen>
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List fullWidth>
            <Tabs.Trigger value="1">프로필</Tabs.Trigger>
            <Tabs.Trigger value="2">게시글</Tabs.Trigger>
          </Tabs.List>
        </Tabs>
        <BottomTab currentTab="menu" />
      </Screen>
    </AppScreen>
  );
};
