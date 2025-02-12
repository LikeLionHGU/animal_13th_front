import { useEffect, useState } from "react";
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from "react-naver-maps";

function MapnLocation({ setLocation, setAddress }) {
  const [mapLocation, setMapLocation] = useState(null);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [load, setLoad] = useState(0);
  const navermaps = useNavermaps();

  useEffect(() => {
    // 네이버 지도 API가 완전히 로드되었는지 확인
    const checkNaverAPI = setInterval(() => {
      if (window.naver && window.naver.maps && window.naver.maps.Service) {
        clearInterval(checkNaverAPI); // API 로드 확인 후 반복 중지
        console.log("네이버 지도 API 로드 완료!");
        setApiLoaded(true); // API 로드 완료 상태 저장
      }
    }, 500); // 0.5초마다 확인

    return () => clearInterval(checkNaverAPI);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const newLocation = { lat, lng };
          const latlng = new window.naver.maps.LatLng(lat, lng);
          //도로명 주소 변환
          try {
            window.naver.maps.Service.reverseGeocode(
              {
                coords: latlng,
                orders: [
                  window.naver.maps.Service.OrderType.ADDR,
                  window.naver.maps.Service.OrderType.ROAD_ADDR,
                ].join(","),
              },
              function (status, response) {
                if (status !== window.naver.maps.Service.Status.OK) {
                  alert("주소 변환 오류 발생!");
                  return;
                }
      
                const address = response.v2.address.roadAddress
                  ? response.v2.address.roadAddress
                  : response.v2.address.jibunAddress;
      
                setAddress(address);
              }
            );
          } catch (error) {
            console.error("Reverse Geocode Error:", error);
          }

          setMapLocation(newLocation);
          setLocation(newLocation);
          setLoad(1);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    
  }, [setLocation]);

  const handleMarker = async (e) => {
    if (!apiLoaded) {
      console.error("네이버 지도 API가 아직 로드되지 않았습니다.");
      return;
    }

    const lat = e.coord.lat();
    const lng = e.coord.lng();
    const latlng = new window.naver.maps.LatLng(lat, lng);

    setMapLocation({ lat, lng });
    setLocation({ lat, lng });

    try {
      window.naver.maps.Service.reverseGeocode(
        {
          coords: latlng,
          orders: [
            window.naver.maps.Service.OrderType.ADDR,
            window.naver.maps.Service.OrderType.ROAD_ADDR,
          ].join(","),
        },
        function (status, response) {
          if (status !== window.naver.maps.Service.Status.OK) {
            alert("주소 변환 오류 발생!");
            return;
          }

          const address = response.v2.address.roadAddress
            ? response.v2.address.roadAddress
            : response.v2.address.jibunAddress;

          setAddress(address);
        }
      );
    } catch (error) {
      console.error("Reverse Geocode Error:", error);
    }
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

//마커가 입력될 때, ar=ddress가 추가되어야 한다 