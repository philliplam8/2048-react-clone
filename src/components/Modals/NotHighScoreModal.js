import * as React from 'react';
import GameModal from '../UI/GameModal';

export default function NotHighScoreModal(props) {

    return (
        <div>
            <GameModal
                buttonName="Not High Score"
                title="WIN!"
                scoreSubtitle="Your Score: "
                subtitle="Enter your name into the scoreboard"
                resetHandler={props.resetHandler} />
        </div>
    )
}

