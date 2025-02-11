import { Container as MapDiv, NaverMap, Marker,  useNavermaps} from "react-naver-maps";


import { useEffect, useState } from "react";

function MapnLocation({ setLocation, setAddress }) {
  const [load, setLoad] = useState(null);
  const [mapLocation, setMapLocation] = useState(null);
  const navermaps = useNavermaps();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const newLocation = { lat, lng };

          setMapLocation(newLocation);
          setLocation(newLocation);
          setLoad(true);

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
  
  const handleMarker = (e) => {
    const lat = e.coord.lat();
    const lng = e.coord.lng();
    const latlng = new navermaps.LatLng(lat, lng); // 네이버 LatLng 객체 생성
  
    setMapLocation({ lat, lng });
    setLocation({ lat, lng });
  
    console.log("좌표:", lat, lng);
  
    // 네이버 reverseGeocode API 호출
    navermaps.Service.geocode(
      {
        coords: latlng,
        orders: [navermaps.Service.OrderType.ADDR, navermaps.Service.OrderType.ROAD_ADDR].join(','),
      },
      function (status, response) {
        if (status !== navermaps.Service.Status.OK) {
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
      {load === 0? "loading...": <NaverMap
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