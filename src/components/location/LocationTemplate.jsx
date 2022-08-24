import React, { Fragment } from 'react';
import { Container, Typography } from '@mui/material';
import LocationMapTemplate from './LocationMapTemplate';
import Alerts from '../common/Alerts';

const LocationErrorTemplate = ({ alertOptions }) => {
    return (
        <Fragment>
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                오늘 점심 뭐먹지??
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" component="p">
                서비스 이용 안내
            </Typography>
            <Alerts alertOptions={alertOptions}/>
        </Fragment>
    );
};

const LocationTemplate = ({ locationState }) => {
    const { alertOptions, isLocationCheck } = locationState;
    return (
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 20, pb: 6 }}>
            {isLocationCheck ? <LocationMapTemplate /> : <LocationErrorTemplate alertOptions={alertOptions} />}
        </Container>
    );
};

export default LocationTemplate;
