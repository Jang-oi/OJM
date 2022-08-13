import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogContent, Typography } from '@mui/material';
import { useStoreDispatch, useStoreState } from '../../contexts/storeContext';
import storeDefaultImg from '../../assets/img/storeDefaultImg.jpg';

const StoreSelectTemplate = () => {
    const storeState = useStoreState();
    const storeDispatch = useStoreDispatch();
    const { store, isStoreDialog } = storeState;

    const handleStoreDialogClose = () => {
        storeDispatch({ type: 'SET_STORE_DIALOG', isStoreDialog: false });
    };
    if (!store || store.length === 0) return null;
    if (!isStoreDialog) return null;
    const selectStoreIndex = Math.floor(Math.random() * store.length);

    const { storeThumUrl, storeTel, storeName, storeId, storeDistance, storeBizhourInfo, storeAddress } =
        store[selectStoreIndex];

    return (
        <Dialog open={isStoreDialog} onClose={handleStoreDialogClose} fullWidth={true} maxWidth={'lg'}>
            <DialogContent>
                <Card sx={{ height: 1000 }}>
                    <CardMedia
                        component="img"
                        height="650"
                        image={storeThumUrl || storeDefaultImg}
                        alt="storeThumbnail"
                    />
                    <CardContent>
                        <Typography variant="h3" align="center" color="text.primary" gutterBottom>
                            {storeName}
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary">
                            주소 : {storeAddress} <br />
                            가게 번호 : {storeTel} <br />
                            가게 거리 : {storeDistance}M <br />
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button>
                            <Typography variant="h5" align="center" gutterBottom>
                                자세히 보기
                            </Typography>
                        </Button>
                    </CardActions>
                </Card>
            </DialogContent>
        </Dialog>
    );
};

export default StoreSelectTemplate;
