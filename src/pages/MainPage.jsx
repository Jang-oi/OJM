import React, { useCallback, useEffect } from 'react';
import { useCoordsDispatch, useCoordsState } from '../contexts/coordsContext';
import { isEmptyObj } from '../utils/common';
import LocationMapTemplate from '../components/LocationMapTemplate';
import LocationTemplate from '../components/LocationTemplate';

const MainPage = () => {
    const coordsDispatch = useCoordsDispatch();
    const coordsState = useCoordsState();

    /**
     * Geolocation API 가 정상적으로 동작 했을 때 콜백 함수
     * @param position
     */
    const geoSuccessCallBack = useCallback(
        async (position) => {
            coordsDispatch({
                type: 'SET_COORDS',
                coords: position.coords,
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
                alert(
                    '위치 허용이 거부 되었습니다. 허용 후 새로고침 부탁드립니다.',
                );
                break;
            case 2:
                alert(
                    '현재 위치정보를 찾을 수 없는 곳에 있어 서비스 이용이 불가합니다.',
                );
                break;
            default:
                break;
        }
    }, []);

    useEffect(() => {
        if (!navigator.geolocation) {
            alert(
                '사용자의 웹 브라우저의 버전이 낮아 서비스의 이용이 불가합니다.',
            );
        }
        navigator.geolocation.getCurrentPosition(
            geoSuccessCallBack,
            geoErrCallBack,
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            },
        );
    }, [geoErrCallBack, geoSuccessCallBack]);

    if (isEmptyObj(coordsState.coords))
        return (
            <LocationTemplate
                element={'위치를 허용 해주세요. 디자인 추가 할 예정.'}
            />
        );

    return <LocationTemplate element={<LocationMapTemplate />} />;
};

export default React.memo(MainPage);
