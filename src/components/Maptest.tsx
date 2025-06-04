import { useEffect } from 'react';
import { loadKakaoScript } from '../utils/loadKakaoScript';
import { API_URL } from '../constants/api';
import { accessToken } from '../apis'; // accessToken 함수 가져와야 함

const MapTest = () => {
  useEffect(() => {
    loadKakaoScript()
      .then(() => {
        window.kakao.maps.load(() => {
          const container = document.getElementById('map');
          if (!container) return;

          // 그냥 일단 첫번째 값 집어넣어놨음, 나중에는 내 위치가 기준점이 되거나, 사용자가 선택한 곳이 기준점이 될 것
          const center = new window.kakao.maps.LatLng(33.450701, 126.570667);
          const options = {
            center,
            level: 3,
          };

          const map = new window.kakao.maps.Map(container, options);

          kakao.maps.event.addListener(map, 'idle', async () => {
            const bounds = map.getBounds();
            const sw = bounds.getSouthWest();
            const ne = bounds.getNorthEast();

            const query = new URLSearchParams({
              minLatitude: String(sw.getLat()),
              minLongitude: String(sw.getLng()),
              maxLatitude: String(ne.getLat()),
              maxLongitude: String(ne.getLng()),
            });

            try {
              const token = await accessToken();
              const res = await fetch(`${API_URL}/v1/houses/map?${query}`, {
                method: 'GET',
                headers: {
                  'X-AUTH-TOKEN': token,
                },
              });

              const data = await res.json();
              const houses = data.results;

              if (!Array.isArray(houses)) {
                console.warn('받은 주택 리스트가 배열이 아닙니다:', data);
                return;
              }

              if (houses.length > 0) {
                const firstHouse = houses[0];
                const newCenter = new kakao.maps.LatLng(
                  firstHouse.latitude,
                  firstHouse.longitude
                );
                map.setCenter(newCenter);
              }

              houses.forEach((house: any) => {
                const position = new kakao.maps.LatLng(
                  house.latitude,
                  house.longitude
                );

                // 마커 생성
                const marker = new kakao.maps.Marker({
                  map,
                  position,
                });

                // houseName을 표시할 인포윈도우 생성
                const infowindow = new kakao.maps.InfoWindow({
                  position,
                  content: `<div style="padding:5px; font-size:12px;">${house.houseName}</div>`,
                });

                // 지도에 인포윈도우 표시
                // infowindow.open(map, marker);
              });

              houses.forEach((house: any) => {
                const position = new kakao.maps.LatLng(
                  house.latitude,
                  house.longitude
                );

                // 1. 마커 생성
                const marker = new kakao.maps.Marker({
                  map,
                  position,
                  // marker 이미지를 커스텀 하고 싶다면 여기에 image로 박아야 할 듯
                });

                // 2. 커스텀 오버레이 생성 (마커 위에 텍스트)
                const overlay = new kakao.maps.CustomOverlay({
                  map,
                  position,
                  content: `
      <div style="
        background: white;
        font-size: 12px;
        font-weight: bold;
        color: red;
        margin-top: 32px;
      ">
        ${house.houseName}
      </div>
    `,
                });
              });
            } catch (err) {
              console.error('지도 API 에러:', err);
            }
          });
        });
      })
      .catch((err) => {
        console.error('카카오 지도 로딩 실패:', err);
      });
  }, []);

  return (
    <div className='w-full h-screen'>
      <div id='map' className='w-full h-full'></div>
    </div>
  );
};

export default MapTest;
