import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useCoordsDispatch } from '../contexts/coordsContext';
import LocationMapTemplate from '../components/LocationMapTemplate';
import LocationTemplate from '../components/LocationTemplate';

const MainPage = () => {
    const coordsDispatch = useCoordsDispatch();

    const [coordsError, coordsSetError] = useState({
        msg: '',
        state: false,
    });

    /**
     * Geolocation API 가 정상적이지 않을 경우의 값 설정을 위한 함수
     * @param obj
     */
    const coordsErrorHandler = (obj) => {
        coordsSetError((pervObj) => {
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
            coordsErrorHandler({ msg: '', state: false });
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
                coordsErrorHandler({ msg: '위치 허용이 거부 되었습니다. 허용 후 새로고침 부탁드립니다.', state: true });
                break;
            case 2:
                coordsErrorHandler({
                    msg: '현재 위치정보를 찾을 수 없는 곳에 있어 서비스 이용이 불가합니다.',
                    state: true,
                });
                break;
            default:
                break;
        }
    }, []);

    useEffect(() => {
        coordsErrorHandler({
            msg: '위치를 허용 해주세요. 디자인 추가 할 예정.',
            state: true,
        });
        if (!navigator.geolocation) {
            coordsErrorHandler({
                msg: '사용자의 웹 브라우저의 버전이 낮아 서비스의 이용이 불가합니다.',
                state: true,
            });
        }
        navigator.geolocation.getCurrentPosition(geoSuccessCallBack, geoErrCallBack, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        });
    }, [geoErrCallBack, geoSuccessCallBack]);

    return (
        <Fragment>
            {coordsError.state ? (
                <LocationTemplate element={coordsError.msg} />
            ) : (
                <LocationTemplate element={<LocationMapTemplate />} />
            )}
        </Fragment>
    );
};

export default React.memo(MainPage);
