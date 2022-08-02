import React, { useEffect, Fragment } from 'react';
import { useCoordsState } from '../contexts/coordsContext';
import { isEmptyObj } from '../utils/common';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material';
import {
    getStore,
    useStoreDispatch,
    useStoreState,
} from '../contexts/storeContext';
import storeDefaultImg from '../assets/img/storeDefaultImg.jpg';

/**
 * 가게들을 카드형태로 보여주는 컴포넌트
 * @param key
 * @param ThumUrl
 * @param name
 * @param category
 * @returns {JSX.Element}
 * @constructor
 */
const StoreItem = ({ storeKey, ThumUrl, name, category }) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={storeKey}>
            <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={ThumUrl || storeDefaultImg}
                    alt="storeThumbnail"
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ minHeight: 70 }}
                    >
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {category}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">자세히 보기</Button>
                    <Button size="small">길 찾기</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

/**
 * 가게들을 받아와서 리스트 형태로 보여주는 컴포넌트
 * @constructor
 */
const StoreList = () => {
    const coordsState = useCoordsState();
    const { coords } = coordsState;

    const storeState = useStoreState();
    const storeDispatch = useStoreDispatch();
    const { store } = storeState;

    useEffect(() => {
        getStore(storeDispatch, coords);
    }, [coords, storeDispatch]);
    if (!store) return null;
    if (store.length === 0) {
        return <div>선택된 가게가 없습니다. 필터링 변경, 위치 변경을 해주세요</div>
    }

    return (
        <Fragment>
            {store.map(
                ({ storeKey, storeThumUrl, storeCategory, storeName }) => (
                    <StoreItem
                        key={storeKey}
                        id={storeKey}
                        ThumUrl={storeThumUrl}
                        category={storeCategory}
                        name={storeName}
                    />
                ),
            )}
        </Fragment>
    );
};

/**
 * 가게 템플릿
 * @returns {JSX.Element}
 * @constructor
 */
const StoreTemplate = () => {
    const coordsState = useCoordsState();
    const { coords } = coordsState;
    if (isEmptyObj(coords)) return null;

    return (
        <Grid container spacing={4} mt={5}>
            <StoreList />
        </Grid>
    );
};

export default StoreTemplate;
