export function loadKakaoScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve();
      return;
    }

    const apiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    script.async = true;
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => resolve());
      } else {
        reject(new Error('카카오 SDK 로드 실패'));
      }
    };
    script.onerror = () => reject(new Error('스크립트 로드 실패'));
    document.head.appendChild(script);
  });
}
