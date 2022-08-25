import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '275px',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    p: 4,
    textAlign: 'center',
};

export default function GameModal(props) {

    // Opening/Closing Modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Modal button: Play Again
    const handlePlayAgain = () => {
        // Reset the game
        props.resetHandler();
        // Close the modal
        handleClose();
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>{props.buttonName}</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" className="modal-text" variant="h4" component="div">
                            {props.title}
                        </Typography>
                        
                        <Typography id="subtitle-score" className="modal-text" variant="subtitle1">
                            {props.scoreSubtitle}
                        </Typography>
                        
                        <Typography id="transition-modal-description" className="modal-text" variant="subtitle2" gutterBottom>
                            {props.subtitle}
                        </Typography>
                        <Button className="modal-button" variant="contained" onClick={handlePlayAgain}>Play Again?</Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}