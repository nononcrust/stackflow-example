import { Header } from "@/components/layout/header";
import { Screen } from "@/components/layout/screen";
import { Button } from "@/components/ui/button";
import { useFlow } from "@/lib/stackflow";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { ActivityComponentType } from "@stackflow/react";

export const NotificationsScreen: ActivityComponentType = () => {
  const { push } = useFlow();

  const onClick = () => {
    push("notifications", {});
  };

  return (
    <AppScreen>
      <Header left={<Header.Back />} title="알림" />
      <Screen>
        <div className="mt-4 flex justify-center">
          <Button variant="outlined" onClick={onClick}>
            스택 계속 쌓기
          </Button>
        </div>
      </Screen>
    </AppScreen>
  );
};
