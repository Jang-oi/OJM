import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import WeatherWidget from '../components/main/WeatherWidget';
import FilterTemplate from '../components/store/FilterTemplate';
import { useCoordsDispatch, useCoordsState } from '../contexts/coordsContext';
import { useNavigate } from 'react-router-dom';
import { isEmptyObj } from '../utils/common';
import StoreTemplate from '../components/store/StoreTemplate';
import StoreSelectTemplate from '../components/store/StoreSelectTemplate';
import { getLocalStorage } from "../utils/localStorage";

const StorePage = () => {
    const coordsState = useCoordsState();
    const coordsDispatch = useCoordsDispatch();
    const navigate = useNavigate();

    const { coords } = coordsState;

    useEffect(() => {
        if (isEmptyObj(coords)) {
            const localCoords = getLocalStorage('coords');
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
            <StoreSelectTemplate />
            <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FilterTemplate />
                <WeatherWidget />
            </Container>
            <StoreTemplate />
        </Container>
    );
};

export default StorePage;
