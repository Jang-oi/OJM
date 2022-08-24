import React, { useEffect, useState, Fragment } from 'react';
import { useCoordsState } from '../../contexts/coordsContext';
import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { RiMapPinLine, RiFileList3Line } from 'react-icons/ri';
import { BiTime, BiPhoneCall, BiHomeAlt } from 'react-icons/bi';
import { TbArrowBearRight } from 'react-icons/tb';

const StoreDetailMapContainer = ({ storeCoords }) => {
    const style = {
        width: '100%',
        height: 500,
    };

    const { kakao } = window;

    const coordsState = useCoordsState();
    const { latitude, longitude } = coordsState.coords;
    const { storeLatitude, storeLongitude } = storeCoords;

    useEffect(() => {
        try {
            const container = document.getElementById('storeDetailMap'); // 지도를 표시할 div
            const options = {
                center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
                level: 4, // 지도의 확대 레벨
            };

            const map = new kakao.maps.Map(container, options); // 지도를 생성합니다

            // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다
            const positions = [
                {
                    content: '<div style="padding:5px;">음식점 위치입니다.</div>',
                    latlng: new kakao.maps.LatLng(storeLatitude, storeLongitude),
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

const StoreDetailInfo = ({ storeInfo }) => {
    const { storeAddress, storeBizHourInfo, storeWay, storeTel, storeOptions, storeDescription } = storeInfo;
    const emptyMessage = '정보가 제공 되지 않았습니다.';
    const storeBizHourInfoArr = storeBizHourInfo ? storeBizHourInfo.split('|') : [emptyMessage];
    const storeOptionsArr = storeOptions
        ? storeOptions.map((optionObj) => {
              return optionObj.name;
          })
        : [emptyMessage];

    return (
        <List
            sx={{
                width: '100%',
            }}
        >
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <RiMapPinLine />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="위치" secondary={storeAddress} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <TbArrowBearRight />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="오시는 길" secondary={storeWay ? storeWay : emptyMessage} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <BiTime />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="영업 시간"
                    secondary={
                        <Fragment>
                            {storeBizHourInfoArr.map((storeBizHourInfoValue, storeBizHourInfoIndex) => {
                                return (
                                    <Fragment key={storeBizHourInfoIndex}>
                                        <Typography component="span" variant="body2" color="text.primary" />
                                        {storeBizHourInfoValue} <br />
                                    </Fragment>
                                );
                            })}
                        </Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <BiPhoneCall />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="전화 번호" secondary={storeTel ? storeTel : emptyMessage} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <BiHomeAlt />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="옵션" secondary={storeOptionsArr} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <RiFileList3Line />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="설명" secondary={storeDescription ? storeDescription : emptyMessage} />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    );
};

const StoreDetailTabTemplate = ({ storeInfo }) => {
    const [tabValue, setTabValue] = useState('1');

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const { storeCoords } = storeInfo;
    return (
        <Box sx={{ width: '100%', typography: 'body1', marginTop: '30px' }}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleTabChange}>
                        <Tab label="상세" value="1" />
                        <Tab label="메뉴" value="2" />
                        <Tab label="위치" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <StoreDetailInfo storeInfo={storeInfo} />
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">
                    <StoreDetailMapContainer storeCoords={storeCoords} />
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default StoreDetailTabTemplate;
