import { useCoordsState } from "../../contexts/coordsContext";
import React, { useEffect } from "react";

const StoreDetailMap = ({ storeCoords }) => {
  const style = {
    width: '100%',
    height: 500,
  };

  const { kakao } = window;

  const coordsState = useCoordsState();
  const { latitude, longitude } = coordsState.coords;
  const { storeLatitude, storeLongitude } = storeCoords;

  useEffect(() => {
    try {
      const container = document.getElementById('storeDetailMap'); // 지도를 표시할 div
      const options = {
        center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
      };

      const map = new kakao.maps.Map(container, options); // 지도를 생성합니다

      // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다
      const positions = [
        {
          content: '<div style="padding:5px;">음식점 위치입니다.</div>',
          latlng: new kakao.maps.LatLng(storeLongitude, storeLatitude),
        },
        {
          content: '<div style="padding:5px;">현재 위치입니다.</div>',
          latlng: new kakao.maps.LatLng(latitude, longitude),
        },
      ];

      for (let i = 0; i < positions.length; i++) {
        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커의 위치
        });

        // 마커에 표시할 인포윈도우를 생성합니다
        const infowindow = new kakao.maps.InfoWindow({
          content: positions[i].content, // 인포윈도우에 표시할 내용
        });

        infowindow.open(map, marker);
      }
    } catch (e) {
      alert(e);
    }
  });
  return <div id="storeDetailMap" style={style} />;
};

export default StoreDetailMap;