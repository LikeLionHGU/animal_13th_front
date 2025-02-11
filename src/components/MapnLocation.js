import { Container as MapDiv, NaverMap, Marker, /*useNavermaps*/} from "react-naver-maps";

import { useEffect, useState } from "react";


function MapnLocation({ setLocation, setAddress }) {
  const [load, setLoad] = useState(0);
  // const navermaps = useNavermaps();
  const [mapLocation, setMapLocation] = useState(null);
  //const navermaps = useNavermaps();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const newLocation = { lat, lng };

          setMapLocation(newLocation);
          setLocation(newLocation);
          setLoad(1);

        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [setLocation]);

  //좌표-> 주소 변환 확인 코드
  const handleMarker = (e) => {
    const lat = e.coord.lat();
    const lng = e.coord.lng();
    const latlng = new window.naver.maps.LatLng(lat, lng); // 네이버 LatLng 객체 생성
  
    setMapLocation({ lat, lng });
    setLocation({ lat, lng });
  
    if (!window.naver.maps.Service) {
      console.error("네이버 지도 API Service가 완전히 로드되지 않았습니다.");
      return;
    }
  
    if (!window.naver.maps.Service.reverseGeocode) {
      console.error("reverseGeocode 기능이 지원되지 않음.");
      return;
    }
  
    // ✅ 네이버 reverseGeocode API 호출
    window.naver.maps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: [window.naver.maps.Service.OrderType.ADDR, window.naver.maps.Service.OrderType.ROAD_ADDR].join(","),
      },
      function (status, response) {
        if (status !== window.naver.maps.Service.Status.OK) {
          console.error("주소 변환 오류 발생!", status);
          setAddress("주소를 찾을 수 없음");
          return;
        }
  
        // ✅ 응답 데이터가 있는지 확인 후 안전하게 처리
        if (!response.v2 || !response.v2.addresses || response.v2.addresses.length === 0) {
          console.error("🚨 역 지오코딩 응답이 비어 있음.");
          setAddress("주소를 찾을 수 없음");
          return;
        }
  
        // ✅ 도로명 주소가 있으면 도로명 주소를, 없으면 지번 주소를 사용
        const address =
          response.v2.addresses[0]?.roadAddress || response.v2.addresses[0]?.jibunAddress || "주소를 찾을 수 없음";
  
        setAddress(address);
        console.log("변환된 주소:", address);
      }
    );
  };
  
  return (
    <MapDiv style={{ width: "100%", height: "100%" }}>
      {load === 0 ? "loading...": <NaverMap
        zoom={19}
        center={mapLocation || { lat: 36.103096, lng: 129.387299 }} // 기본값: 한동대
        onClick={handleMarker}
      >
        {mapLocation && <Marker position={mapLocation} />}
      </NaverMap>
      }
    </MapDiv>
  );
}

export default MapnLocation;