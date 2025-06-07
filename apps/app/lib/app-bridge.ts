import WebView, { WebViewMessageEvent } from "react-native-webview";
import {
  AppBridgeMessageEvent,
  AppBridgeWebViewMessageEvent,
} from "@repo/app-bridge";
import React from "react";
import { Alert, BackHandler } from "react-native";

export const useAppBridgeWebViewMessageEvent = () => {
  const onMessage = (event: WebViewMessageEvent) => {
    try {
      const message = AppBridgeWebViewMessageEvent.parse(
        JSON.parse(event.nativeEvent.data)
      );

      console.log("Received message from WebView:", message);

      switch (message.type) {
        case "appExit":
          Alert.alert("앱 종료", "정말로 앱을 종료하시겠습니까?", [
            {
              text: "취소",
              style: "cancel",
            },
            {
              text: "종료",
              onPress: () => {
                BackHandler.exitApp();
                console.log("앱이 종료되었습니다.");
              },
            },
          ]);
          break;
        default:
          message.type satisfies never;
      }
    } catch {
      noop();
    }
  };

  return { onMessage };
};

export const useAppBridgeMessage = (
  webViewRef: React.RefObject<WebView | null>
) => {
  const sendAppBridgeMessage = (event: AppBridgeMessageEvent) => {
    console.log("Sending message to WebView:", event);

    if (!webViewRef.current) {
      throw new Error("웹뷰가 초기화되지 않았습니다.");
    }

    webViewRef.current.postMessage(JSON.stringify(event));
  };

  return { sendAppBridgeMessage };
};

const noop = () => {};
