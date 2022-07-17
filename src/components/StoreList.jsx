// MUI
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

const StoreList = ({store}) => {

    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardMedia
                component="img"
                height="200"
                image={store[1].storeThumUrl}
                alt="storeThumbnail"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {store[1].storeName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {store[1].storeCatetory}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">자세히 보기</Button>
                <Button size="small">길 찾기</Button>
            </CardActions>
        </Card>
    )
}

export default StoreList;