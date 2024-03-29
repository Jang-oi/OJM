import React, { useCallback, useEffect, useState } from 'react';
import { useCoordsDispatch } from '../contexts/coordsContext';
import LocationTemplate from '../components/main/LocationTemplate';
import { getLocalStorage } from '../utils/localStorage';

const MainPage = () => {
    const coordsDispatch = useCoordsDispatch();

    const [locationState, setLocationState] = useState({
        isLocationCheck: false,
        alertOptions: { alertType: '', alertResult: '', alertText: '', callBackText: '', callBackFn: '' },
    });

    /**
     * Geolocation API 의 결과 값에 따라 제어하는 함수
     * @param obj
     */
    const handleCoordsResult = (obj) => {
        setLocationState((pervObj) => {
            return {
                ...pervObj,
                ...obj,
            };
        });
    };
    /**
     * Geolocation API 가 정상적으로 동작 했을 때 콜백 함수
     * @param position
     */
    const geoSuccessCallBack = useCallback(
        async (position) => {
            const localCoords = getLocalStorage('coords');
            handleCoordsResult({ isLocationCheck: true });
            coordsDispatch({
                type: 'SET_COORDS',
                coords: localCoords || position.coords,
            });
        },
        [coordsDispatch],
    );

    /**
     * Geolocation API 가 정상적으로 동작 하지 않은 경우 콜백 함수
     * @param error
     */
    const geoErrCallBack = useCallback((error) => {
        switch (error.code) {
            case 1:
                handleCoordsResult({
                    alertOptions: {
                        alertType: 'action',
                        alertResult: 'error',
                        alertText: '위치 허용이 거부 되었습니다. 허용 후 새로고침 클릭 부탁드립니다.',
                        callBackText: '새로고침',
                        callBackFn: () => {
                            window.location.reload();
                        },
                    },
                    isLocationCheck: false,
                });
                break;
            case 2:
                handleCoordsResult({
                    alertOptions: {
                        alertType: 'basic',
                        alertResult: 'error',
                        alertText: '현재 위치정보를 찾을 수 없는 곳에 있어 서비스 이용이 불가합니다.',
                    },
                    isLocationCheck: false,
                });
                break;
            default:
                break;
        }
    }, []);

    useEffect(() => {
        handleCoordsResult({
            alertOptions: {
                alertType: 'basic',
                alertResult: 'info',
                alertText: '위치를 허용 해주세요.',
            },
            isLocationCheck: false,
        });
        if (!navigator.geolocation) {
            handleCoordsResult({
                alertOptions: {
                    alertType: 'basic',
                    alertResult: 'info',
                    alertText: '사용자의 웹 브라우저의 버전이 낮아 서비스의 이용이 불가합니다.',
                },
                isLocationCheck: false,
            });
        }
        navigator.geolocation.getCurrentPosition(geoSuccessCallBack, geoErrCallBack, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        });
    }, [geoErrCallBack, geoSuccessCallBack]);

    return <LocationTemplate locationState={locationState} />;
};

export default MainPage;
