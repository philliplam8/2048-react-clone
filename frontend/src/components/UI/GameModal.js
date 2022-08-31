import React, { useContext } from "react";
import { ScoreContext } from "../../ScoreContext";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import './GameModal.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '275px',
    height: '275px',
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

    // Score
    const [score, setScore] = useContext(ScoreContext);

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
                            Score: {score}
                        </Typography>

                        <div className='modal-footer'>
                            <Typography id="transition-modal-description" className="modal-text" variant="subtitle2" gutterBottom>
                                {props.subtitle}
                            </Typography>
                            <Typography id="transition-modal-description" className="modal-text" variant="subtitle2" gutterBottom>
                                Enter your name into the scoreboard:
                            </Typography>
                            <div className='modal-actions'>
                                <TextField sx={{ m: 0.5 }} id="outlined-basic" label="Name" variant="outlined" />
                                <Button sx={{ m: 0.5 }} variant="contained">Submit</Button>
                            </div>
                        </div>
                        {/* <Button className="modal-button" variant="outlined" onClick={handlePlayAgain}>Play Again?</Button> */}

                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}