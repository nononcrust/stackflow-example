## 개발 서버 실행

```
pnpm install
pnpm dev
```

## 웹뷰 URL 설정

`apps/app/app/_layout`의 `WEBVIEW_URL`을 현재 IP로 변경해주세요.

```tsx
<WebView source={{ uri: "http://192.168.0.111:3000" }} />
```
