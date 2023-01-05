import * as React from 'react';
import GameModal from '../UI/GameModal';

export default function NotHighScoreModal(props) {

    return (
        <div>
            <GameModal
                buttonName="Win - Not High Score"
                title="WIN!"
                subtitle="You've reached 2048!"
                resetHandler={props.resetHandler} />
        </div>
    )
}

