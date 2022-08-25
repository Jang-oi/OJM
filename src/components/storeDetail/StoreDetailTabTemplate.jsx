import React, { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import StoreDetailInfo from './StoreDetailInfo';
import StoreDetailMap from './StoreDetailMap';
import StoreDetailMenu from "./StoreDetailMenu";

const StoreDetailTabTemplate = ({ storeInfo }) => {
    const [tabValue, setTabValue] = useState('1');

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const { storeCoords, storeMenuList, storeMenuImage } = storeInfo;
    console.log(storeInfo);
    return (
        <Box sx={{ width: '100%', typography: 'body1', marginTop: '30px', marginBottom: '50px' }}>
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
                <TabPanel value="2">
                    <StoreDetailMenu storeMenuList={storeMenuList} storeMenuImage={storeMenuImage} />
                </TabPanel>
                <TabPanel value="3">
                    <StoreDetailMap storeCoords={storeCoords} />
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default StoreDetailTabTemplate;
