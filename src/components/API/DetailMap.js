import { useEffect, useState } from "react";
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from "react-naver-maps";

function DetailMap({ lat, lng }) {
  const [apiLoaded, setApiLoaded] = useState(false);
  const navermaps = useNavermaps();

  useEffect(() => {
    const checkNaverAPI = setInterval(() => {
      if (window.naver && window.naver.maps && window.naver.maps.Service) {
        clearInterval(checkNaverAPI);
        console.log("네이버 지도 API 로드 완료!");
        setApiLoaded(true);
      }
    }, 500);

    return () => clearInterval(checkNaverAPI);
  }, []);

  return (
    <MapDiv style={{ width: "100%", height: "100%" }}>
      {!apiLoaded ? (
        "loading..."
      ) : (
        <NaverMap
          zoom={19}
          center={{ lat: lat || 36.103096, lng: lng || 129.387299 }} // 기본값: 한동대
        >
          {lat && lng && <Marker position={{ lat, lng }} />}
        </NaverMap>
      )}
    </MapDiv>
  );
}

export default DetailMap;
