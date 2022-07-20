import {Fragment, useCallback, useEffect, useState} from "react";
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

const Weather = ({coords}) => {
    
    const [weather, setWeather] = useState({});

    /**
     * 좌표 값을 받아 날씨정보 가져오는 함수
     * @param coords
     * @returns {Promise<void>}
     */
    const getWeather = useCallback(async (coords) => {
        if (coords.latitude === 0) return;
        const getWeatherUrl = `${API_URL.weatherUrl}/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY.weatherKey}`;
        const response = await axios.get(getWeatherUrl);
        const data = response.data;
        setWeather({
            id: data.weather[0].id,
            temperature: data.main.temp,
            main: data.weather[0].main
        });
    }, [])
    
    useEffect(() => {
        getWeather(coords);
    }, [coords, getWeather])

/*    const selectIcon = () => {
        let iconId =
            weather.id === 800 ? 0 : (parseInt(weather.id) / 100).toFixed(0);
        switch (iconId) {
            case "0":
                return <TiWeatherSunny size="6rem" color="red" />;
            case "2":
                return <TiWeatherStormy size="6rem" color="black" />;
            case "3":
                return <TiWeatherShower size="6rem" color="blue" />;
            case "5":
                return <TiWeatherDownpour size="6rem" color="navy" />;
            case "6":
                return <TiWeatherSnow size="6rem" color="white" />;
            /!*case "7":
                return <BsCloudFog size="6rem" color="white" />;*!/
            case "8":
                return <TiWeatherCloudy size="6rem" color="white" />;
            default :
                break;
        }
    };*/

    return (
        <Fragment>

        </Fragment>
    )
}

export default Weather;