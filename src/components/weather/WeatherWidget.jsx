import React, { useCallback, useEffect, useState } from 'react';
import { useCoordsState } from '../../contexts/coordsContext';
import axios from 'axios';
import {
    TiWeatherSunny,
    TiWeatherStormy,
    TiWeatherCloudy,
    TiWeatherShower,
    TiWeatherDownpour,
    TiWeatherSnow,
} from 'react-icons/ti';
import { BsCloudFog } from 'react-icons/bs';
import { isEmptyObj } from '../../utils/common';
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WeatherWidget = () => {
    const [weather, setWeather] = useState({
        id: 0,
        temperature: 0,
        main: '',
    });
    const [address, setAddress] = useState('');

    const coordsState = useCoordsState();
    const { coords } = coordsState;

    const navigate = useNavigate();

    /**
     * 좌표 값을 받아 날씨정보 가져오는 함수
     * @param coords
     * @returns {Promise<void>}
     */
    const getWeather = useCallback(async (coords) => {
        const getWeatherUrl = `${process.env.REACT_APP_WEATHER_URL}/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.REACT_APP_WEATHER_KEY}&lang=kr`;
        try {
            const response = await axios.get(getWeatherUrl);
            const data = response.data;
            setWeather({
                id: data.weather[0].id,
                temperature: (data.main.temp - 273.15).toFixed(2),
                main: data.weather[0].description,
            });
        } catch (e) {
            alert(e);
        }
    }, []);

    /**
     * 현재 날씨 정보를 받아서 날씨에 대한 아이콘 선택해주는 함수
     * @returns {JSX.Element}
     */
    const selectIcon = () => {
        const iconId = weather.id === 800 ? 9 : (parseInt(weather.id) / 100).toFixed(0);
        switch (iconId) {
            case '9':
                return <TiWeatherSunny size="3rem" color="red" />;
            case '2':
                return <TiWeatherStormy size="3rem" color="black" />;
            case '3':
                return <TiWeatherShower size="3rem" color="blue" />;
            case '5':
                return <TiWeatherDownpour size="3rem" color="blue" />;
            case '6':
                return <TiWeatherSnow size="3rem" color="white" />;
            case '7':
                return <BsCloudFog size="3rem" color="gray" />;
            case '8':
                return <TiWeatherCloudy size="3rem" color="gray" />;
            default:
                break;
        }
    };

    const { kakao } = window;
    const getAddress = useCallback(
        (coords) => {
            try {
                const geocoder = new kakao.maps.services.Geocoder();
                geocoder.coord2RegionCode(coords.longitude, coords.latitude, (result) => {
                    setAddress(result[0].address_name);
                });
            } catch (e) {
                alert(e);
            }
        },
        [kakao.maps.services.Geocoder],
    );

    useEffect(() => {
        if (isEmptyObj(coords)) return;
        getWeather(coords);
        getAddress(coords);
    }, [coords, getWeather, getAddress]);

    return (
        <Container style={{ background: 'greenyellow' }}>
            {weather.temperature}℃{selectIcon()}
            {weather.main}
            <p />
            현재 위치 : {address}
            <Button onClick={() => {navigate('/')}}>위치 변경</Button>
        </Container>
    );
};

export default WeatherWidget;
