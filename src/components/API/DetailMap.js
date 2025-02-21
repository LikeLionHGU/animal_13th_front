import { useEffect, useState } from "react";
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from "react-naver-maps";

function DetailMap({ lat, lng, setAddress }) {
  const [apiLoaded, setApiLoaded] = useState(false);
  const [markerPosition, setMarkerPosition] = useState({ lat, lng });
  const navermaps = useNavermaps();

  // 네이버 지도 API 로딩 확인
  useEffect(() => {
    const checkNaverAPI = setInterval(() => {
      if (window.naver && window.naver.maps && window.naver.maps.Service) {
        clearInterval(checkNaverAPI);
        console.log("네이버 지도 API 로드 완료!");
        setApiLoaded(true);
        console.log("받아온 위치 확인:", lat, lng);
      }
    }, 500);

    return () => clearInterval(checkNaverAPI);
  }, []);

  // 좌표 변경 시 도로명 주소 변환
  useEffect(() => {
    if (!apiLoaded) return; // API가 로드되지 않았다면 실행 X

    const latlng = new window.naver.maps.LatLng(lat, lng);

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
            console.error("주소 변환 오류 발생!");
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
  }, [lat, lng, apiLoaded, setAddress]); // lat, lng, apiLoaded가 변경될 때 실행

  return (
    <MapDiv style={{ width: "100%", height: "100%" }}>
      {!apiLoaded ? (
        "loading..."
      ) : (
        <NaverMap zoom={19} center={markerPosition}>
          <Marker position={markerPosition} />
        </NaverMap>
      )}
    </MapDiv>
  );
}

export default DetailMap;
