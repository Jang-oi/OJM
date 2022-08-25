import React, { useCallback, useEffect, useState } from 'react';
import { useCoordsState } from '../../contexts/coordsContext';
import axios from 'axios';
import { isEmptyObj } from '../../utils/common';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
        const Img = styled.img`
            max-height: 100px;
        `;
        const iconId = weather.id === 800 ? 9 : (parseInt(weather.id) / 100).toFixed(0);
        switch (iconId) {
            case '9':
                return <Img src="https://openweathermap.org/img/wn/01d@2x.png" alt={'Sunny'} />;
            case '2':
                return <Img src="https://openweathermap.org/img/wn/11d@2x.png" alt={'Stormy'} />;
            case '3':
                return <Img src="https://openweathermap.org/img/wn/09d@2x.png" alt={'Shower'} />;
            case '5':
                return <Img src="https://openweathermap.org/img/wn/10d@2x.png" alt={'Downpour'} />;
            case '6':
                return <Img src="https://openweathermap.org/img/wn/13d@2x.png" alt={'Snow'} />;
            case '7':
                return <Img src="https://openweathermap.org/img/wn/50d@2x.png" alt={'CloudFog'} />;
            case '8':
                return <Img src="https://openweathermap.org/img/wn/04d@2x.png" alt={'Cloudy'} />;
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
        <Container>
            <Typography gutterBottom variant="h6" component="div">
                {address} {weather.temperature}℃{selectIcon()}
            </Typography>
            <Button
                onClick={() => {
                    navigate('/');
                }}
            >
                위치 변경
            </Button>
        </Container>
    );
};

export default WeatherWidget;
