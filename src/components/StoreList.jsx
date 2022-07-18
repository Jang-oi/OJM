// MUI
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";

const StoreList = ({store}) => {

    return (
        <Grid container>
            {store.map((storeObj, index) => (
                <Grid item lg={3} md={4} sm={6} xs={12} mt={4} key={index}>
                    <Card sx={{maxWidth: 400}}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={storeObj.storeThumUrl}
                            alt="storeThumbnail"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {storeObj.storeName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {storeObj.storeCatetory}
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