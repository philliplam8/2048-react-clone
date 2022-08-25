import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import './LoadingIndicator.css';

export default function LoadingSpinner() {
    return (
        <Box id="loading-container">
            <LinearProgress />
        </Box>
    );
}
