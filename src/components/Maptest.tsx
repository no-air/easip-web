import { useEffect } from 'react';
import styled from 'styled-components';
import { loadKakaoScript } from '../utils/loadKakaoScript';

const MapTest = () => {
  useEffect(() => {
    loadKakaoScript()
      .then(() => {
        window.kakao.maps.load(() => {
          const container = document.getElementById('map');
          if (!container) return;

          const center = new window.kakao.maps.LatLng(33.450701, 126.570667);
          const options = {
            center,
            level: 3,
          };

          const map = new window.kakao.maps.Map(container, options);

          // ✅ 여러 개 마커 좌표 정의
          const positions = [
            {
              title: '카카오 본사',
              latlng: new window.kakao.maps.LatLng(33.450705, 126.570677),
            },
            {
              title: '어딘가1',
              latlng: new window.kakao.maps.LatLng(33.451393, 126.570738),
            },
            {
              title: '어딘가2',
              latlng: new window.kakao.maps.LatLng(33.452291, 126.571239),
            },
          ];

          // ✅ 반복해서 마커 찍기
          positions.forEach((pos) => {
            const marker = new window.kakao.maps.Marker({
              map,
              position: pos.latlng,
              title: pos.title,
            });

            marker.setMap(map);
          });
        });
      })
      .catch((err) => {
        console.error('카카오 지도 로딩 실패:', err);
      });
  }, []);

  return (
    <StMain>
      <div id='map' style={{ width: '300px', height: '700px' }}></div>
    </StMain>
  );
};

const StMain = styled.div`
  width: 100%;
  /* height: 100vh; */
  background-color: #eaeaea;
`;

export default MapTest;
