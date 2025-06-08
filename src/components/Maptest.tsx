import { useEffect } from 'react';
import { loadKakaoScript } from '../utils/loadKakaoScript';
import { API_URL } from '../constants/api';
import { accessToken } from '../utils/https';
import { renderMarkers } from '../utils/map';

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
            level: 8,
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

export default MapTest;
