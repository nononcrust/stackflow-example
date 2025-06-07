"use client";

import {
  AppBridgeMessageEvent,
  AppBridgeMessageEventHandler,
  AppBridgeWebViewMessageEvent,
} from "@repo/app-bridge";
import { useFlow, useStack } from "@stackflow/react/future";
import { useEffect } from "react";
import { noop } from "./utils";

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}

export const useAppBridgeMessageEvent = (
  handler: AppBridgeMessageEventHandler
) => {
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      try {
        const message = AppBridgeMessageEvent.parse(JSON.parse(event.data));

        switch (message.type) {
          case "androidHardwareBackPress":
            handler.androidHardwareBackPress(message);
            break;
          case "iOSHardwareBackPress":
            handler.iOSHardwareBackPress(message);
            break;
          default:
            message satisfies never;
        }
      } catch {
        noop();
      }
    };

    document.addEventListener("message", onMessage as EventListener);
    window.addEventListener("message", onMessage);

    return () => {
      document.removeEventListener("message", onMessage as EventListener);
      window.removeEventListener("message", onMessage);
    };
  }, [handler]);
};

export const sendAppBridgeWebViewMessage = (
  event: AppBridgeWebViewMessageEvent
) => {
  window.ReactNativeWebView.postMessage(JSON.stringify(event));
};

export const GlobalAppBridgeMessageEventHandler = () => {
  const stack = useStack();
  const { pop } = useFlow();

  useAppBridgeMessageEvent({
    androidHardwareBackPress: () => {
      if (stack.activities.length > 1) {
        pop();
      }

      if (stack.activities.length === 1) {
        sendAppBridgeWebViewMessage({
          type: "appExit",
          payload: {
            reason: "androidHardwareBackPress",
          },
        });
      }
    },
    iOSHardwareBackPress: () => {},
  });

  return null;
};
