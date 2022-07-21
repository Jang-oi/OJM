import {useCallback, useEffect, useState} from "react";
import {API_KEY, API_URL} from "../utils/Setting";
import axios from "axios";
import {
    TiWeatherSunny,
    TiWeatherStormy,
    TiWeatherCloudy,
    TiWeatherShower,
    TiWeatherDownpour,
    TiWeatherSnow
} from 'react-icons/ti';
import {BsCloudFog} from "react-icons/bs";
import {Container} from "@mui/material";

const Weather = ({coords}) => {

    const [weather, setWeather] = useState({});

    /**
     * 좌표 값을 받아 날씨정보 가져오는 함수
     * @param coords
     * @returns {Promise<void>}
     */
    const getWeather = useCallback(async (coords) => {
        if (coords.latitude === 0) return;
        const getWeatherUrl = `${API_URL.weatherUrl}/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY.weatherKey}&lang=kr`;
        const response = await axios.get(getWeatherUrl);
        const data = response.data;
        setWeather({
            id         : data.weather[0].id,
            temperature: (data.main.temp - 273.15).toFixed(2),
            main       : data.weather[0].description
        });
    }, [])

    /**
     * 현재 날씨 정보를 받아서 날씨에 대한 아이콘 선택해주는 함수
     * @returns {JSX.Element}
     */
    const selectIcon = () => {
        const iconId = weather.id === 800 ? 0 : (parseInt(weather.id) / 100).toFixed(0);
        switch (iconId) {
            case "0":
                return <TiWeatherSunny size="3rem" color="red"/>;
            case "2":
                return <TiWeatherStormy size="3rem" color="black"/>;
            case "3":
                return <TiWeatherShower size="3rem" color="blue"/>;
            case "5":
                return <TiWeatherDownpour size="3rem" color="blue"/>
            case "6":
                return <TiWeatherSnow size="3rem" color="white"/>;
            case "7":
                return <BsCloudFog size="3rem" color="gray"/>;
            case "8":
                return <TiWeatherCloudy size="3rem" color="gray"/>;
            default :
                break;
        }
    };

    useEffect(() => {
        getWeather(coords);
    }, [coords, getWeather])


    return (
        <Container>
            {`${weather.temperature}℃`}
            {selectIcon()}
            {`${weather.main}`}
        </Container>
    )
}

export default Weather;