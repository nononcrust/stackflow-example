import { stackflow } from "@stackflow/react";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { NotificationsScreen } from "@/screens/notifications";
import { HomeTab } from "@/tabs/home";
import { PostDetailScreen } from "@/screens/post-detail";
import { MenuTab } from "@/tabs/menu";
import { UserProfileScreen } from "@/screens/user-profile";

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  activities: {
    "tab/home": HomeTab,
    "tab/menu": MenuTab,
    notifications: NotificationsScreen,
    "post-detail": PostDetailScreen,
    "user-profile": UserProfileScreen,
  },
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: "cupertino",
    }),
  ],
  initialActivity: () => "tab/home",
});

type Push = ReturnType<typeof useFlow>["push"];

type PushProps = Omit<React.ComponentPropsWithRef<"button">, "onClick"> & {
  to: Parameters<Push>[0];
  params?: Parameters<Push>[1];
  options?: Parameters<Push>[2];
};

/**
 * <Link /> 컴포넌트와 유사하게 사용할 수 있도록 컴포넌트로 만들고 싶지만 params 타입 추론을 하지 못하는 이슈
 */
export const Push = ({
  children,
  to,
  params = {},
  options,
  ...props
}: PushProps) => {
  const { push } = useFlow();

  const onClick = () => {
    push(to, params, options);
  };

  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  );
};

type Replace = ReturnType<typeof useFlow>["replace"];

type ReplaceProps = Omit<React.ComponentPropsWithRef<"button">, "onClick"> & {
  to: Parameters<Replace>[0];
  params?: Parameters<Replace>[1];
  options?: Parameters<Replace>[2];
};

export const Replace = ({
  children,
  to,
  params = {},
  options,
  ...props
}: ReplaceProps) => {
  const { replace } = useFlow();

  const onClick = () => {
    replace(to, params, options);
  };

  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  );
};
