import {useEffect, useState} from "react";
// MUI
import {Container} from "@mui/material";
// 컴포넌트
import StoreList from "../components/StoreList";
import Weather from "../components/Weather";

const Main = () => {
    const [coords, setCoords] = useState({latitude: 0, longitude: 0});

    /**
     * Geolocation API 가 정상적으로 동작 했을 때 콜백 함수
     * @param position
     */
    const geoSuccessCallBack = (position) => {
        const {latitude, longitude} = position.coords;
        setCoords({latitude : latitude, longitude : longitude});
    }

    /**
     * Geolocation API 가 정상적으로 동작 하지 않은 경우 콜백 함수
     * @param error
     */
    const geoErrCallBack = (error) => {
        switch (error.code) {
            case 1 :
                alert('허용 거부');
                break;
            case 2 :
                alert('위치정보 찾을 수 없는 곳');
                break;
            default :
                break;
        }
    }


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geoSuccessCallBack, geoErrCallBack, {
                enableHighAccuracy: true,
                timeout           : 5000,
                maximumAge        : 0
            });
        } else {
            alert("사용자의 웹 브라우저가 Geolocation API를 지원하지 않습니다.");
        }
    }, []);

    return (
        <Container>
            <Weather coords={coords}/>
            <StoreList coords={coords}/>
        </Container>
    )
}

export default Main;