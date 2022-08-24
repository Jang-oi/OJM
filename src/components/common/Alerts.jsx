import React from 'react';
import { Button, Snackbar } from '@mui/material';
import { Alert } from '@mui/lab';

const Alerts = ({ alertOptions }) => {
    const { alertType, alertResult, alertText, callBackFn, callBackText } = alertOptions;

    const snackBarOptions = { vertical: 'top', horizontal: 'right', open: true };
    const { vertical, horizontal, open } = snackBarOptions;

    switch (alertType) {
        case 'basic':
            return (
                <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} autoHideDuration={5000}>
                    <Alert style={{ width: '100%' }} severity={alertResult}>
                        {alertText}
                    </Alert>
                </Snackbar>
            );
        case 'action':
            return (
                <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} autoHideDuration={5000}>
                    <Alert
                        style={{ width: '100%' }}
                        severity={alertResult}
                        action={
                            <Button size="small" onClick={callBackFn}>
                                {callBackText}
                            </Button>
                        }
                    >
                        {alertText}
                    </Alert>
                </Snackbar>
            );
        default:
            break;
    }
};

export default Alerts;
