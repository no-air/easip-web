import { useEffect } from 'react';
import { loadKakaoScript } from '../utils/loadKakaoScript';
import { API_URL } from '../constants/api';
import { accessToken } from '../apis';

const MapTest = () => {
  useEffect(() => {
    const initializeMap = async () => {
      try {
        await loadKakaoScript();
        window.kakao.maps.load(async () => {
          const container = document.getElementById('map');
          if (!container) return;

          const token = await accessToken();

          const res = await fetch(
            `${API_URL}/v1/houses/map?minLatitude=0&minLongitude=0&maxLatitude=90&maxLongitude=180`,
            {
              method: 'GET',
              headers: {
                'X-AUTH-TOKEN': token,
              },
            }
          );

          const data = await res.json();
          const houses = data.results;

          if (!Array.isArray(houses) || houses.length === 0) {
            console.warn('받은 주택 리스트가 없습니다');
            return;
          }

          const firstHouse = houses[0];
          const center = new kakao.maps.LatLng(
            firstHouse.latitude,
            firstHouse.longitude
          );

          const map = new kakao.maps.Map(container, {
            center,
            level: 3,
          });

          renderMarkers(map, houses);

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
              if (!Array.isArray(houses)) return;

              renderMarkers(map, houses);
            } catch (err) {
              console.error('지도 API 에러:', err);
            }
          });
        });
      } catch (err) {
        console.error('카카오 지도 로딩 실패:', err);
      }
    };

    initializeMap();
  }, []);

  return (
    <div className='w-full h-screen'>
      <div id='map' className='w-full h-full'></div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderMarkers = (map: any, houses: any[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  houses.forEach((house: any) => {
    const position = new window.kakao.maps.LatLng(
      house.latitude,
      house.longitude
    );

    new window.kakao.maps.Marker({ map, position });

    new window.kakao.maps.CustomOverlay({
      map,
      position,
      yAnchor: 1.5,
      content: `
        <div style="
          background: white;
          font-size: 12px;
          font-weight: bold;
          color: red;
          border: 1px solid red;
          border-radius: 12px;
          padding: 4px 8px;
          white-space: nowrap;
          box-shadow: 1px 1px 4px rgba(0,0,0,0.15);
          margin-bottom: -32px;
        ">
          ${house.houseName}
        </div>
      `,
    });
  });
};

export default MapTest;
