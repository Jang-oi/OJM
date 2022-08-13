import React, { useEffect, useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useCoordsDispatch, useCoordsState } from '../../contexts/coordsContext';
import { useNavigate } from 'react-router-dom';
import { useStoreDispatch } from '../../contexts/storeContext';
import { useFilterDispatch } from '../../contexts/filterContext';

const MapContainer = ({ setCoords }) => {
    const style = {
        width: 500,
        height: 500,
    };

    const { kakao } = window;

    const coordsState = useCoordsState();
    const { latitude, longitude } = coordsState.coords;

    useEffect(() => {
        try {
            const container = document.getElementById('kakaoMap');
            const options = {
                center: new kakao.maps.LatLng(latitude, longitude),
                level: 3,
            };
            const map = new kakao.maps.Map(container, options);
            const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(latitude, longitude),
            });
            marker.setMap(map);

            const iwContent = '<div style="padding:5px;">현재 위치입니다.</div>';

            const infoWindow = new kakao.maps.InfoWindow({
                position: new kakao.maps.LatLng(latitude, longitude),
                content: iwContent,
            });

            infoWindow.open(map, marker);

            kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
                const latlng = mouseEvent.latLng;
                marker.setPosition(latlng);
                setCoords(latlng);
            });
        } catch (e) {
            alert(e);
        }
    }, [
        kakao.maps.InfoWindow,
        kakao.maps.LatLng,
        kakao.maps.Map,
        kakao.maps.Marker,
        kakao.maps.event,
        latitude,
        longitude,
        setCoords,
    ]);

    return <div id="kakaoMap" style={style} />;
};

const LocationMapTemplate = () => {
    const [openDialog, setOpenDialog] = useState(true);
    const coordsState = useCoordsState();
    const coordsDispatch = useCoordsDispatch();

    const storeDispatch = useStoreDispatch();
    const filterDispatch = useFilterDispatch();

    const navigate = useNavigate();
    const initCoords = coordsState.coords;
    const coords = useRef(initCoords);

    /**
     * 하위 컴포넌트에서 값을 수정하기 위해 사용함
     * @param changeCoords
     */
    const setCoords = (changeCoords) => {
        coords.current = {
            latitude: changeCoords.Ma,
            longitude: changeCoords.La,
        };
    };

    /**
     * 현재 위치 설정 후 적용 이벤트
     */
    const onApply = () => {
        coordsDispatch({
            type: 'SET_COORDS',
            coords: coords.current,
        });
        setOpenDialog(false);
        filterDispatch({ type: 'INIT_FILTER' });
        storeDispatch({ type: 'SET_STORE_DIALOG', isStoreDialog: true });
        navigate('/store');
    };

    return (
        <Dialog open={openDialog}>
            <DialogTitle>위치를 클릭해주세요.</DialogTitle>
            <DialogContent>
                <DialogContentText>현재 위치가 아닐 경우 지도를 클릭하여 적용 버튼을 클릭해주세요.</DialogContentText>
                <MapContainer setCoords={setCoords} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onApply}>적용</Button>
            </DialogActions>
        </Dialog>
    );
};

export default LocationMapTemplate;
