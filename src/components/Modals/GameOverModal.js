import * as React from 'react';
import GameModal from '../UI/GameModal';

export default function GameOverModal(props) {

    return (
        <div>
            <GameModal
                buttonName="Game Over"
                title="GAME OVER!"
                scoreSubtitle="Your Score: "
                subtitle="No more moves"
                resetHandler={props.resetHandler} />
        </div>
    )
}

