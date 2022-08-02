import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import WeatherWidget from '../components/WeatherWidget';
import FilterTemplate from '../components/FilterTemplate';
import { useCoordsDispatch, useCoordsState } from '../contexts/coordsContext';
import { useNavigate } from 'react-router-dom';
import { isEmptyObj } from '../utils/common';
import StoreTemplate from '../components/StoreTemplate';

const StorePage = () => {
    const coordsState = useCoordsState();
    const coordsDispatch = useCoordsDispatch();
    const navigate = useNavigate();

    const { coords } = coordsState;

    useEffect(() => {
        if (isEmptyObj(coords)) {
            const localCoords = JSON.parse(localStorage.coords).coords;
            if (!isEmptyObj(localCoords)) {
                coordsDispatch({
                    type: 'SET_COORDS',
                    coords: localCoords,
                });
            } else {
                navigate('/');
            }
        }
    }, [coordsDispatch, coords, navigate]);

    return (
        <Container style={{ marginTop: 50 }}>
            <Container
                style={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <WeatherWidget />
                <FilterTemplate />
            </Container>
            <StoreTemplate />
        </Container>
    );
};

export default StorePage;
