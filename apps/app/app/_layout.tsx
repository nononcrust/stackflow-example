import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import "react-native-reanimated";
import WebView from "react-native-webview";
import { BackHandler } from "react-native";
import {
  useAppBridgeMessage,
  useAppBridgeWebViewMessageEvent,
} from "@/lib/app-bridge";

export default function RootLayout() {
  const webViewRef = useRef<WebView>(null);

  const { onMessage } = useAppBridgeWebViewMessageEvent();

  const { sendAppBridgeMessage } = useAppBridgeMessage(webViewRef);

  useEffect(() => {
    const onAndroidBackPress = () => {
      console.log("Android Back Pressed");
      sendAppBridgeMessage({
        type: "androidHardwareBackPress",
        payload: {
          timestamp: 123123123,
        },
      });

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onAndroidBackPress
    );

    return () => {
      backHandler.remove();
    };
  }, [sendAppBridgeMessage]);

  return (
    <>
      <WebView
        ref={webViewRef}
        style={{ flex: 1 }}
        source={{ uri: "http://192.168.1.162:3000" }}
        scrollEnabled={false} // 스크롤은 웹뷰 내부에서 overflow-y를 통해 구현
        onMessage={onMessage}
      />
      <StatusBar style="dark" />
    </>
  );
}
