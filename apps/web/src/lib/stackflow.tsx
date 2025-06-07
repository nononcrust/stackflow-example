"use client";

import {
  stackflow,
  StackflowPluginsEntry,
  useFlow,
} from "@stackflow/react/future";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { NotificationsScreen } from "@/screens/notifications";
import { HomeTab } from "@/tabs/home";
import { PostDetailScreen } from "@/screens/post-detail";
import { MenuTab } from "@/tabs/menu";
import { UserProfileScreen } from "@/screens/user-profile";
import { defineConfig } from "@stackflow/config";
import { AddPostScreen } from "@/screens/add-post";
import { GlobalAppBridgeMessageEventHandler } from "./app-bridge";

const config = defineConfig({
  activities: [
    { name: "HomeTab" },
    { name: "MenuTab" },
    { name: "NotificationsScreen" },
    { name: "PostDetailScreen" },
    { name: "UserProfileScreen" },
    { name: "AddPostScreen" },
  ],
  transitionDuration: 350,
  initialActivity: () => "HomeTab",
});

const providersPlugin: StackflowPluginsEntry = () => ({
  key: "providers",
  render: () => {
    return <GlobalAppBridgeMessageEventHandler />;
  },
});

export const { Stack } = stackflow({
  config,
  components: {
    HomeTab,
    MenuTab,
    NotificationsScreen,
    PostDetailScreen,
    UserProfileScreen,
    AddPostScreen,
  },
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: "cupertino",
    }),
    providersPlugin,
  ],
});

declare module "@stackflow/config" {
  interface Register {
    HomeTab: object;
    MenuTab: object;
    NotificationsScreen: object;
    AddPostScreen: object;
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
