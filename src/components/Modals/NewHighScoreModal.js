import * as React from 'react';
import GameModal from '../UI/GameModal';

export default function NewHighScoreModal(props) {

    return (
        <div>
            <GameModal
                buttonName="New High Score"
                title="WIN!"
                scoreSubtitle="New High Score: "
                subtitle="Enter your name into the scoreboard"
                resetHandler={props.resetHandler} />
        </div>
    )
}

