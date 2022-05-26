import React, { useState, createContext } from 'react';

export const TileContext = createContext();
export const ScoreContext = createContext();
export const GameContext = createContext();

export const TileProvider = props => {

    const [tiles, setTiles] = useState({
        myBoard:
            [
                // First Row
                {
                    key: 0,
                    value: 0,
                    empty: true,
                    borderTop: true,
                    borderLeft: true,
                    borderRight: false,
                    borderBottom: false,
                    tileStyle: 'tile-zero',
                    newTile: '',
                    justMerged: false
                },
                {
                    key: 1,
                    value: 0,
                    empty: true,
                    borderTop: true,
                    borderLeft: false,
                    borderRight: false,
                    borderBottom: false,
                    tileStyle: 'tile-zero',
                    newTile: '',
                    justMerged: false
                },
                {
                    key: 2,
                    value: 0,
                    empty: true,
                    borderTop: true,
                    borderLeft: false,
                    borderRight: false,
                    borderBottom: false,
                    tileStyle: 'tile-zero',
                    newTile: '',
                    justMerged: false
                },
                {
                    key: 3,
                    value: 0,
                    empty: true,
                    borderTop: true,
                    borderLeft: false,
                    borderRight: true,
                    borderBottom: false,
                    tileStyle: 'tile-zero',
                    newTile: '',
                    justMerged: false
                },
                // Second Row
                {
                    key: 4,
                    value: 0,
                    empty: true,
                    borderTop: false,
                    borderLeft: true,
                    borderRight: false,
                    borderBottom: false,
                    tileStyle: 'tile-zero',
                    newTile: '',
                    justMerged: false
                },
                {
                    key: 5,
                    value: 0,
                    empty: true,
                    borderTop: false,
                    borderLeft: false,
                    borderRight: false,
                    borderBottom: false,
                    tileStyle: 'tile-zero',
                    newTile: '',
                    justMerged: false
                },
                {
                    key: 6,
                    value: 0,
                    empty: true,
                    borderTop: false,
                    borderLeft: false,
                    borderRight: false,
                    borderBottom: false,
                    tileStyle: 'tile-zero',
                    newTile: '',
                    justMerged: false
                },
                {
                    key: 7,
                    value: 0,
                    empty: true,
                    borderTop: false,
                    borderLeft: false,
                    borderRight: true,
                    borderBottom: false,
                    tileStyle: 'tile-zero',
                    newTile: '',
                    justMerged: false
                },
                // Third Row
                {
                    key: 8,
                    value: 0,
                    empty: true,
                    borderTop: false,
                    borderLeft: true,
                    borderRight: false,
                    borderBottom: false,
                    tileStyle: 'tile-zero',
                    newTile: '',
                    justMerged: false
                },
                {
                    key: 9,
                    value: 0,
                    empty: true,
                    borderTop: false,
                    borderLeft: false,
                    borderRight: false,
                    borderBottom: false,
                    tileStyle: 'tile-zero',
                    newTile: '',
                    justMerged: false
                },
                {
                    key: 10,
                    value: 0,
                    empty: true,
                    borderTop: false,
                    borderLeft: false,
                    borderRight: false,
                    borderBottom: false,
                    tileStyle: 'tile-zero',
                    newTile: '',
                    justMerged: false
                },
                {
                    key: 11,
                    value: 0,
                    empty: true,
                    borderTop: false,
                    borderLeft: false,
                    borderRight: true,
                    borderBottom: false,
                    tileStyle: 'tile-zero',
                    newTile: '',
                    justMerged: false
                },
                // Fourth Row
                {
                    key: 12,
                    value: 0,
                    empty: true,
                    borderTop: false,
                    borderLeft: true,
                    borderRight: false,
                    borderBottom: true,
                    tileStyle: 'tile-zero',
                    newTile: '',
                    justMerged: false
                },
                {
                    key: 13,
                    value: 0,
                    empty: true,
                    borderTop: false,
                    borderLeft: false,
                    borderRight: false,
                    borderBottom: true,
                    tileStyle: 'tile-zero',
                    newTile: '',
                    justMerged: false
                },
                {
                    key: 14,
                    value: 0,
                    empty: true,
                    borderTop: false,
                    borderLeft: false,
                    borderRight: false,
                    borderBottom: true,
                    tileStyle: 'tile-zero',
                    newTile: '',
                    justMerged: false
                },
                {
                    key: 15,
                    value: 0,
                    empty: true,
                    borderTop: false,
                    borderLeft: false,
                    borderRight: true,
                    borderBottom: true,
                    tileStyle: 'tile-zero',
                    newTile: '',
                    justMerged: false
                }
            ]
    });
    return (
        <TileContext.Provider value={[tiles, setTiles]}>
            {props.children}
        </TileContext.Provider>

    );
}

export const ScoreProvider = props => {

    const [scores, setScores] = useState([0]);

    return (
        <ScoreContext.Provider value={[scores, setScores]}>
            {props.chilren}
        </ScoreContext.Provider>
    )

}

export const GameProvider = props => {

    const [statuses, setStatuses] = useState({
        turn: 0
    });

    return (
        <GameContext.Provider value={[statuses, setStatuses]}>
            {props.children}
        </GameContext.Provider>
    )
}