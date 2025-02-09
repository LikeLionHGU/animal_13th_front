

 
import { useEffect, useState } from "react";
import { Container as MapDiv, NaverMap, useNavermaps, Marker } from "react-naver-maps";

function MapnLocation() {
  const navermaps = useNavermaps();
  const [location, setLocation] = useState(null); //처음 유저 정보
  const [zoom, setZoom] = useState(10);
  const [load, setLoad] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(new navermaps.LatLng(latitude, longitude)); // 위치 상태 업데이트
          setZoom(30);
          setLoad(1);
        }
      );
    } 
  }, [navermaps]);

  return (
    <MapDiv style={{ width: "100%", height: "100%" }}>
      {load === 0? "loading...": <NaverMap
        zoom={zoom}
        center={location|| new navermaps.LatLng(37.56667, 126.97806)} // 위치가 없으면 기본값
      >
        {location && <Marker position={location} />} 
      </NaverMap>}
    </MapDiv>
  );
}

export default MapnLocation;