import { Container as MapDiv, NaverMap, useNavermaps, Marker } from "react-naver-maps";

import { useEffect, useState } from "react";

function MapnLocation({ setLocation }) {
  const [load, setLoad] = useState(null);
  const navermaps = useNavermaps();
  const [mapLocation, setMapLocation] = useState(null);

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
    setMapLocation({ lat, lng });
    setLocation({ lat, lng });
    console.log(lat, lng);
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