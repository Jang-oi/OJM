import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import StoreDetailTabTemplate from '../components/storeDetail/StoreDetailTabTemplate';
import { isEmptyObj } from '../utils/common';
import StoreDetailCarousel from '../components/storeDetail/StoreDetailCarousel';

const StoreDetailPage = () => {
    const { id } = useParams();

    const [storeInfo, setStoreInfo] = useState({});

    const getStoreDetailData = useCallback(async () => {
        try {
            const response = await axios.get(`test/ojm/detail?storeId=${id}`);
            setStoreInfo(response.data.data);
        } catch (e) {
            alert(e);
        }
    }, [id]);

    useEffect(() => {
        getStoreDetailData();
    }, [getStoreDetailData]);

    if (isEmptyObj(storeInfo)) return;

    const { storeName, storeState } = storeInfo;
    return (
        <Container style={{ marginTop: 50 }}>
            <StoreDetailCarousel storeImage={storeInfo.storeImage} />
            <Typography component="h3" variant="h3" align="center" color="text.primary" style={{ marginTop: '20px' }}>
                {storeName} <br />({storeState ? '영업 중' : '영업 종료'}) 영업 상태 디자인 고민...
            </Typography>
            <StoreDetailTabTemplate storeInfo={storeInfo} />
        </Container>
    );
};

export default StoreDetailPage;
