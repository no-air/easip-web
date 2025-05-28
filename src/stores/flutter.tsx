import { create } from "zustand";

interface FlutterActions {
  goToFlutterMove: (url: string) => void;
}

export const useFlutterStore = create<{ actions: FlutterActions }>(() => ({
  actions: {
    goToFlutterMove: async (url: string) => {
      if (!window.flutter_inappwebview || !window.flutter) {
        console.warn("Flutter is not enabled.");
        return;
      }
      const result = await window.flutter_inappwebview.callHandler("goToPage", [
        url,
      ]);

      alert(JSON.stringify(result, null, 2));
    },
  },
}));
