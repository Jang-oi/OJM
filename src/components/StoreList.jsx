// MUI
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import storeDefaultImg from '../assets/img/storeDefaultImg.jpg'

const StoreList = ({coords}) => {

    const [store, setStore] = useState([]);

    /**
     * 가게 리스트를 가져오는 함수
     * @param coords
     * @returns {Promise<void>}
     */
    const getStoreList = useCallback(async (coords) => {
        if (coords.latitude === 0) return;
        const getStoreListUrl = `/test/ojm/store?searchCoord=${coords.longitude};${coords.latitude}`;
        const response = await axios.get(getStoreListUrl);
        setStore(response.data.data);
    }, []);


    useEffect(() => {
        getStoreList(coords);
    }, [coords, getStoreList]);

    return (
        <Grid container>
            {store.map((storeObj, index) => (
                <Grid item lg={3} md={4} sm={6} xs={12} mt={4} key={index}>
                    <Card sx={{maxWidth: 400}}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={storeObj.storeThumUrl || storeDefaultImg}
                            alt="storeThumbnail"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {storeObj.storeName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {storeObj.storeCategory}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">자세히 보기</Button>
                            <Button size="small">길 찾기</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default StoreList;