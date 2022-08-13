import React, { Fragment } from 'react';
import { Container, Typography } from '@mui/material';
import LocationMapTemplate from './LocationMapTemplate';

const LocationErrorTemplate = ({ element }) => {
    return (
        <Fragment>
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                오늘 점심 뭐먹지??
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" component="p">
                {element}
            </Typography>
        </Fragment>
    );
};

const LocationTemplate = ({ locationState }) => {
    const { element, isLocationCheck } = locationState;
    return (
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 20, pb: 6 }}>
            {isLocationCheck ? <LocationMapTemplate /> : <LocationErrorTemplate element={element} />}
        </Container>
    );
};

export default LocationTemplate;
