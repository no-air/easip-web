declare module "react-kakao-maps-sdk";

declare global {
  interface Window {
    kakao: unknown;
    flutter_inappwebview: {
      callHandler: (
        handlerName: string,
        ...args: unknown[]
      ) => Promise<unknown>;
    };
    flutter?: boolean;
  }

  const kakao: unknown;
}

export {};
