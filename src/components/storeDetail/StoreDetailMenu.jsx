import React, { Fragment } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import { MdRecommend } from 'react-icons/md';

const MenuItem = ({ menuKey, name, price, recommended }) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={menuKey}>
            <Card sx={{ minHeight: 120 }}>
                <CardContent>
                    {recommended && (
                        <Typography variant="body2" color="blue">
                            <MdRecommend /> 추천
                        </Typography>
                    )}
                    <Typography gutterBottom variant="h6" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        가격 : {price}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

const MenuListImage = ({ storeMenuImage }) => {
    const Img = styled.img`
        width: 100%;
        height: 100%;
        margin-top : 50px;
    `;

    return (
        <Fragment>
            {storeMenuImage.map(({ imageUrl }) => {
                return <Img src={imageUrl} />;
            })}
        </Fragment>
    );
};

const StoreDetailMenu = ({ storeMenuList, storeMenuImage }) => {
    if (storeMenuImage.length > 0) {
        return <MenuListImage storeMenuImage={storeMenuImage} />;
    } else {
        return (
            <Grid container spacing={4}>
                {storeMenuList.map(({ name, price, recommended }, index) => (
                    <MenuItem key={index} menuKey={index} name={name} price={price} recommended={recommended} />
                ))}
            </Grid>
        );
    }
};

export default StoreDetailMenu;
