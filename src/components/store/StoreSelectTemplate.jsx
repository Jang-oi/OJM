import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogContent, Typography } from '@mui/material';
import { useStoreDispatch, useStoreState } from '../../contexts/storeContext';
import storeDefaultImg from '../../assets/img/storeDefaultImg.jpg';
import { useNavigate } from 'react-router-dom';

const StoreSelectTemplate = () => {
    const storeState = useStoreState();
    const storeDispatch = useStoreDispatch();
    const { store, isStoreDialog } = storeState;

    const navigate = useNavigate();

    const handleStoreDialogClose = () => {
        storeDispatch({ type: 'SET_STORE_DIALOG', isStoreDialog: false });
    };
    if (!store || store.length === 0) return null;
    if (!isStoreDialog) return null;
    const selectStoreIndex = Math.floor(Math.random() * store.length);

    const { storeThumUrl, storeName, storeId, storeDistance, storeAddress } = store[selectStoreIndex];

    return (
        <Dialog open={isStoreDialog} onClose={handleStoreDialogClose} fullWidth={true} maxWidth={'lg'}>
            <DialogContent>
                <Card sx={{ height: '100%' }}>
                    <CardMedia
                        component="img"
                        height="550"
                        image={storeThumUrl || storeDefaultImg}
                        alt="storeThumbnail"
                    />
                    <CardContent>
                        <Typography variant="h3" align="center" color="text.primary" gutterBottom>
                            {storeName}
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary">
                            주소 : {storeAddress} <br />
                            가게 거리 : {storeDistance}M <br />
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button>
                            <Typography
                                variant="h5"
                                align="center"
                                gutterBottom
                                onClick={() => {
                                    navigate(`/store/${storeId}`);
                                }}
                            >
                                자세히 보기
                            </Typography>
                        </Button>
                        <Button>
                            <Typography
                              variant="h5"
                              align="center"
                              gutterBottom
                              onClick={() => {
                                  storeDispatch({ type: 'SET_STORE_DIALOG', isStoreDialog: true });
                              }}
                            >
                                다시 고르기
                            </Typography>
                        </Button>
                    </CardActions>
                </Card>
            </DialogContent>
        </Dialog>
    );
};

export default StoreSelectTemplate;
