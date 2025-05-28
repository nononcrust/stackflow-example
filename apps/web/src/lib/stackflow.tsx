import { stackflow, useFlow } from "@stackflow/react/future";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { NotificationsScreen } from "@/screens/notifications";
import { HomeTab } from "@/tabs/home";
import { PostDetailScreen } from "@/screens/post-detail";
import { MenuTab } from "@/tabs/menu";
import { UserProfileScreen } from "@/screens/user-profile";
import { defineConfig } from "@stackflow/config";

const config = defineConfig({
  activities: [
    { name: "HomeTab" },
    { name: "MenuTab" },
    { name: "NotificationsScreen" },
    { name: "PostDetailScreen" },
    { name: "UserProfileScreen" },
  ],
  transitionDuration: 350,
  initialActivity: () => "HomeTab",
});

export const { Stack } = stackflow({
  config,
  components: {
    HomeTab,
    MenuTab,
    NotificationsScreen,
    PostDetailScreen,
    UserProfileScreen,
  },
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: "cupertino",
    }),
  ],
});

declare module "@stackflow/config" {
  interface Register {
    HomeTab: object;
    MenuTab: object;
    NotificationsScreen: object;
    PostDetailScreen: { postId: string };
    UserProfileScreen: { userId: string };
  }
}

type PopProps = Omit<React.ComponentPropsWithRef<"button">, "onClick">;

export const Pop = ({ children, ...props }: PopProps) => {
  const { pop } = useFlow();

  return (
    <button onClick={pop} {...props}>
      {children}
    </button>
  );
};
