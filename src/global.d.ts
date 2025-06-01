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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const kakao: any;
}

export {};
