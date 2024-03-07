import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    returnTo: "/profile",
  }),
  signup: handleLogin({
    // authorizationParamsで指定したプロパティはuth0の/authorizeエンドポイントへの呼び出しのクエリパラメータとなる
    authorizationParams: {
      screen_hint: "signup",
    },
    returnTo: "/profile",
  }),
});
