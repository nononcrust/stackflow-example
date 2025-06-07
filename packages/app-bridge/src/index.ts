import { z } from "zod/v4";

const AndroidHardwareBackPressEvent = z.object({
  type: z.literal("androidHardwareBackPress"),
  payload: z.object({
    timestamp: z.number(),
  }),
});

const iOSHardwareBackPressEvent = z.object({
  type: z.literal("iOSHardwareBackPress"),
  payload: z.object({
    iosVersion: z.string(),
  }),
});

export type AppBridgeMessageEvent = z.infer<typeof AppBridgeMessageEvent>;
export const AppBridgeMessageEvent = z.discriminatedUnion("type", [
  AndroidHardwareBackPressEvent,
  iOSHardwareBackPressEvent,
]);

/**
 * 앱에서 웹뷰로 메시지를 보내는 이벤트를 다루는 이벤트 핸들러 타입입니다.
 */
export type AppBridgeMessageEventHandler = {
  [K in AppBridgeMessageEvent["type"]]: (
    event: Extract<AppBridgeMessageEvent, { type: K }>
  ) => void;
};

// ---------------------------------------------------------------------

const AppExitEvent = z.object({
  type: z.literal("appExit"),
  payload: z.object({
    reason: z.string(),
  }),
});

export type AppBridgeWebViewMessageEvent = z.infer<
  typeof AppBridgeWebViewMessageEvent
>;
export const AppBridgeWebViewMessageEvent = z.discriminatedUnion("type", [
  AppExitEvent,
]);

export type AppBridgeWebViewMessageEventHandler = {
  [K in AppBridgeWebViewMessageEvent["type"]]: (
    event: Extract<AppBridgeWebViewMessageEvent, { type: K }>
  ) => void;
};
