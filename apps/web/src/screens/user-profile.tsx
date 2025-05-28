import { Header } from "@/components/layout/header";
import { Screen } from "@/components/layout/screen";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { ActivityComponentType } from "@stackflow/react/future";

export const UserProfileScreen: ActivityComponentType<"UserProfileScreen"> = ({
  params,
}) => {
  return (
    <AppScreen>
      <Header left={<Header.Back />} />
      <Screen>
        <span>유저 프로필 {params.userId}</span>
      </Screen>
    </AppScreen>
  );
};
