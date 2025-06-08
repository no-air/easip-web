// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderMarkers = (map: any, houses: any[]) => {
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
