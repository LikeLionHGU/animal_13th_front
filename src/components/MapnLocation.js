import { Container as MapDiv, NaverMap, useNavermaps, Marker } from "react-naver-maps";

function MapnLocation() {
  const navermaps = useNavermaps();

  return (
    <MapDiv style={{ width: "100%", height: "100%" }}>
      <NaverMap
        zoom={10}
        center={new navermaps.LatLng(37.56667, 126.97806)}
      >
        <Marker position={new navermaps.LatLng(37.56667, 126.97806)} />
      </NaverMap>
    </MapDiv>
  );
}

export default MapnLocation;
