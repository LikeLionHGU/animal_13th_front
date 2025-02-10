import { Container as MapDiv, NaverMap, useNavermaps, Marker } from "react-naver-maps";
import { useEffect, useState } from "react";

function MapnLocation({ setLocation }) {
  const navermaps = useNavermaps();
  const [mapLocation, setMapLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
          setMapLocation(newLocation);
          setLocation(newLocation);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [setLocation]);

  return (
    <MapDiv style={{ width: "100%", height: "100%" }}>
      <NaverMap
        zoom={19}
        center={mapLocation || { lat: 36.08333, lng: 129.36667 }} // 기본값: 포항시
      >
        {mapLocation && <Marker position={new navermaps.LatLng(mapLocation.lat, mapLocation.lng)} />}
      </NaverMap>
    </MapDiv>
  );
}

export default MapnLocation;