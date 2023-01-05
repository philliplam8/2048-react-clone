import * as React from 'react';
import GameModal from '../UI/GameModal';

export default function NewHighScoreModal(props) {

    return (
        <div>
            <GameModal
                buttonName="Win - New High Score"
                title="WIN!"
                subtitle="You have reached a new high score!"
                resetHandler={props.resetHandler} />
        </div>
    )
}

