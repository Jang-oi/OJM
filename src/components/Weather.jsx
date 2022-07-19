import {Fragment, useCallback, useEffect, useState} from "react";
import {API_KEY, API_URL} from "../utils/Setting";
import axios from "axios";

const Weather = ({coords}) => {
    
    const [weather, setWeather] = useState();
    /**
     * 좌표 값을 받아 날씨정보 가져오는 함수
     * @param coords
     * @returns {Promise<void>}
     */
    const getWeather = useCallback(async (coords) => {
        if (coords.latitude === 0) return;
        const getWeatherUrl = `${API_URL.weatherUrl}/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY.weatherKey}`;
        const response = await axios.get(getWeatherUrl);
        setWeather(response);
    }, [])
    
    useEffect(() => {
        getWeather(coords);
    }, [coords, getWeather])

    console.log(weather);
    return (
        <Fragment>

        </Fragment>
    )
}

export default Weather;