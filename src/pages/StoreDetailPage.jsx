import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import axios from 'axios';
import StoreDetailTabTemplate from '../components/store/StoreDetailTabTemplate';
import { isEmptyObj } from '../utils/common';
import StoreDetailCarousel from '../components/store/StoreDetailCarousel';

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
    console.log(storeInfo);
    return (
        <Container style={{ marginTop: 50 }}>
            <StoreDetailCarousel storeImage={storeInfo.storeImage}/>
            <StoreDetailTabTemplate storeInfo={storeInfo} />
        </Container>
    );
};

export default StoreDetailPage;
