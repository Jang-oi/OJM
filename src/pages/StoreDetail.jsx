import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Tab } from '@mui/material';
import axios from 'axios';
import { useCoordsState } from '../contexts/coordsContext';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const StoreDetailMapContainer = () => {
    const style = {
        width: '100%',
        height: 500,
    };

    const { kakao } = window;

    const coordsState = useCoordsState();
    const { latitude, longitude } = coordsState.coords;

    useEffect(() => {
        try {
            const container = document.getElementById('storeDetailMap'); // 지도를 표시할 div
            const options = {
                center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
                level: 3, // 지도의 확대 레벨
            };

            const map = new kakao.maps.Map(container, options); // 지도를 생성합니다

            // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다
            const positions = [
                {
                    content: '<div style="padding:5px;">음식점 위치입니다.</div>',
                    latlng: new kakao.maps.LatLng(37.6650793259781, 127.29215448138599),
                },
                {
                    content: '<div style="padding:5px;">현재 위치입니다.</div>',
                    latlng: new kakao.maps.LatLng(latitude, longitude),
                },
            ];

            for (let i = 0; i < positions.length; i++) {
                // 마커를 생성합니다
                const marker = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    position: positions[i].latlng, // 마커의 위치
                });

                // 마커에 표시할 인포윈도우를 생성합니다
                const infowindow = new kakao.maps.InfoWindow({
                    content: positions[i].content, // 인포윈도우에 표시할 내용
                });

                infowindow.open(map, marker);
            }
        } catch (e) {
            alert(e);
        }
    });
    return <div id="storeDetailMap" style={style} />;
};

const StoreDetail = () => {
    const { id } = useParams();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getStoreDetailData = useCallback(async () => {
        const response = await axios.get(`test/ojm/detail?storeId=${id}`);
        console.log(response);
    }, [id]);

    useEffect(() => {
        getStoreDetailData();
    }, [getStoreDetailData]);

    return (
        <Container style={{ marginTop: 50 }}>
            가게 이미지 슬라이드 형태
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="상세" value="1" />
                            <Tab label="메뉴" value="2" />
                            <Tab label="위치" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">Item One</TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">
                        <StoreDetailMapContainer />
                    </TabPanel>
                </TabContext>
            </Box>
        </Container>
    );
};

export default StoreDetail;
