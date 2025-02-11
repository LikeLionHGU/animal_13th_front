import { Container as MapDiv, NaverMap, Marker, /*useNavermaps*/} from "react-naver-maps";


import { useEffect, useState } from "react";

function MapnLocation({ setLocation, setAddress }) {
  const [load, setLoad] = useState(0);
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

        },
        (error) => {
          console.error("Geolocation error:", error);
          setLoad(true); // 에커 발생시에도 로딩 중단
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
      console.error("reverseGeocode 기능이 지원되지 않습니다.");
      return;
    }
    
  
    // 네이버 reverseGeocode API 호출
    window.naver.maps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: [window.naver.maps.Service.OrderType.ADDR, window.naver.maps.Service.OrderType.ROAD_ADDR].join(','),
      },
      function (status, response) {
        if (status !== window.naver.maps.Service.Status.OK) {
          alert('주소 변환 오류 발생!');
          return;
        }
  
        // 도로명 주소가 있다면 도로명 주소를, 없다면 지번 주소를 가져옴
        const address = response.v2.address.roadAddress
          ? response.v2.address.roadAddress
          : response.v2.address.jibunAddress;
  
        setAddress(address);
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