import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import axios from 'axios';

const StoreDetail = () => {
    const { id } = useParams();
    const getStoreDetailData = useCallback(async () => {
        const response = await axios.get(`test/ojm/detail?storeId=${id}`);
        console.log(response);
    }, [id]);

    useEffect(() => {
        getStoreDetailData();
    }, [getStoreDetailData]);

    return <Container style={{ marginTop: 50 }}>{id}</Container>;
};

export default StoreDetail;
