import { Header } from "@/components/layout/header";
import { Screen } from "@/components/layout/screen";
import { Button } from "@/components/ui/button";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { ActivityComponentType } from "@stackflow/react/future";
import { Link } from "@stackflow/link/future";

export const NotificationsScreen: ActivityComponentType<
  "NotificationsScreen"
> = () => {
  return (
    <AppScreen>
      <Header left={<Header.Back />} title="알림" />
      <Screen>
        <div className="mt-4 flex justify-center gap-2">
          <Button variant="outlined" asChild>
            <Link activityName="NotificationsScreen" activityParams={{}}>
              스택 계속 쌓기
            </Link>
          </Button>
          <Button variant="outlined" asChild>
            <Link
              activityName="HomeTab"
              activityParams={{}}
              replace
              animate={false}
            >
              탭으로 바로 돌아가기
            </Link>
          </Button>
        </div>
      </Screen>
    </AppScreen>
  );
};
