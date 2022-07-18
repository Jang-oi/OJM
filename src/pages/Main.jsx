import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {API_KEY} from "../utils/Setting";
// MUI
import {Container} from "@mui/material";
// 컴포넌트
import StoreList from "../components/StoreList";
import Weather from "../components/Weather";

const Main = () => {
    const [store, setStore] = useState([]);
    const [weather, setWeather] = useState({});

    /**
     * 좌표 값을 받아 날씨정보 가져오는 함수
     * @param coords
     * @returns {Promise<void>}
     */
    const getWeather = useCallback(async (coords) => {
        const getWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY.weatherKey}`;
        axios.get(getWeatherUrl).then((response) => {
            setWeather(response);
        });
    }, [])

    /**
     * 가게 리스트를 가져오는 함수
     * @param coords
     * @returns {Promise<void>}
     */
    const getStoreList = useCallback(async (coords) => {
        const getStoreListUrl = `/test/ojm/store?searchCoord=${coords.longitude};${coords.latitude}`;
        axios.get(getStoreListUrl).then((response) => {
            setStore(response.data.data);
        });
    }, [])

    /**
     * Geolocation API 가 정상적으로 동작 했을 때 콜백 함수
     * @param position
     */
    const geoSuccessCallBack = useCallback(async (position) => {
        const coords = {longitude: position.coords.longitude, latitude: position.coords.latitude};
        await getWeather(coords);
        await getStoreList(coords);
    }, [getStoreList, getWeather]);

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
    }, [geoSuccessCallBack]);

    return (
        <Container>
            <Weather weather={weather}/>
            <StoreList store={store}/>
        </Container>
    )
}

export default Main;