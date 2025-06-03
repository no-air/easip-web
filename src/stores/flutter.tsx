import { create } from "zustand";

interface FlutterActions {
  goToFlutterMove: (url: string, query?: Record<string, string>) => void;
  flutterBack: () => void;
}

export const useFlutterStore = create<{ actions: FlutterActions }>(() => ({
  actions: {
    goToFlutterMove: async (url, query) => {
      if (!window.flutter_inappwebview || !window.flutter) {
        console.warn("Flutter is not enabled.");
        if (import.meta.env.DEV) {
          window.location.href =
            url + (query ? `?${new URLSearchParams(query).toString()}` : "");
        }
        return;
      }

      await window.flutter_inappwebview.callHandler("goToPage", url, query);
    },
    flutterBack: async () => {
      if (!window.flutter_inappwebview || !window.flutter) {
        console.warn("Flutter is not enabled.");
        window.history.back();
        return;
      }

      await window.flutter_inappwebview.callHandler("goBack");
    },
  },
}));
