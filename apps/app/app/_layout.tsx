import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import WebView from "react-native-webview";

export default function RootLayout() {
  return (
    <>
      <WebView
        style={{ flex: 1 }}
        source={{ uri: "http://192.168.0.234:3002" }}
        scrollEnabled={false} // 스크롤은 웹뷰 내부에서 overflow-y를 통해 구현
      />
      <StatusBar style="dark" />
    </>
  );
}
