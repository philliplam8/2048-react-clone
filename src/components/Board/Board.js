import React, { useState, useContext, useEffect } from "react";
import ScoreboardModal from "./../Scoreboard/ScoreboardModal";
import GameOverModal from "../Modals/GameOverModal";
import Tile from './../Tile/Tile';
import { TileContext } from "./../../TileContext";
import getArrayValueTotal from "./../../utils/helpers";
import { useSwipeable } from "react-swipeable";
import Button from '@mui/material/Button';
import "./Board.css";
import NewHighScoreModal from "../Modals/NewHighScoreModal";
import NotHighScoreModal from "../Modals/NotHighScoreModal";

/* TODO 
- score should only reflect when 2 tiles merge (need to understand state and context better)
- lose condition
- win condition
- undo
- reorganize project directory
*/

function getRandomTileIndex(range) {
    return Math.floor(Math.random() * range);
}

const Board = () => {
    const [tiles, setTiles] = useContext(TileContext);

    const getIndexLeft = (currentIndex) => {
        return currentIndex - 1;
    }

    const getIndexRight = (currentIndex) => {
        return currentIndex + 1;
    }

    const getIndexUp = (currentIndex) => {
        return currentIndex - 4;
    }

    const getIndexDown = (currentIndex) => {
        return currentIndex + 4;
    }

    const hasBorderLeft = (tile) => {
        return tile.borderLeft;
    }

    const hasBorderRight = (tile) => {
        return tile.borderRight;
    }

    const hasBorderUp = (tile) => {
        return tile.borderTop;
    }

    const hasBorderDown = (tile) => {
        return tile.borderBottom;
    }

    /**
     * Revert the game board to a new game state
     */
    const handleResetBoard = () => {
        let starterBoard = tiles.myBoard.map(boardTile => {
            return { ...boardTile, value: 0, empty: true, tileStyle: 'tile-zero' };
        });
        setTiles({ myBoard: starterBoard });
    }

    /**
     * Create a new tile in a randomized empty position
     */
    const handleAddTile = () => {
        let emptyCells = [];
        for (let i = 0; i < tiles.myBoard.length; i++) {
            if (tiles.myBoard[i].value === 0) {
                emptyCells.push(i);
            }
        }
        // Add tile only if there is a valid space
        if (emptyCells.length !== 0) {
            let index = emptyCells[getRandomTileIndex(emptyCells.length)];
            // Use Map function to created disconnected copy that can be edited
            let updatedBoard = tiles.myBoard.map(boardTile => {
                if (boardTile.key === index && boardTile.value === 0) {
                    return { ...boardTile, value: 2, empty: false, tileStyle: 'tile-two', newTile: 'new-tile' }; // return modified item
                } else {
                    return boardTile; // else return unmodified item
                }
            });
            setTiles({ myBoard: updatedBoard });
        }
    }

    /**
     * Merge the two tiles at indices currentIndex and destinationIndex
     * @param {Board} boardArray 
     * @param {number} currentIndex 
     * @param {number} destinationIndex 
     */
    const mergeTiles = (boardArray, currentIndex, destinationIndex) => {
        // Reset current tile
        boardArray[currentIndex].value = 0;
        boardArray[currentIndex].tileStyle = "tile-zero";
        boardArray[currentIndex].empty = true;
        // Merge tiles
        boardArray[destinationIndex].value *= 2;
        boardArray[destinationIndex].justMerged = true;
        // Update styling
        switch (boardArray[destinationIndex].value) {
            case 4:
                boardArray[destinationIndex].tileStyle = "tile-four";
                break;
            case 8:
                boardArray[destinationIndex].tileStyle = "tile-eight";
                break;
            case 16:
                boardArray[destinationIndex].tileStyle = "tile-sixteen";
                break;
            case 32:
                boardArray[destinationIndex].tileStyle = "tile-thirtytwo";
                break;
            case 64:
                boardArray[destinationIndex].tileStyle = "tile-sixtyfour";
                break;
            case 128:
                boardArray[destinationIndex].tileStyle = "tile-hundredtwentyeight";
                break;
            case 256:
                boardArray[destinationIndex].tileStyle = "tile-twohundredfiftysix";
                break;
            case 512:
                boardArray[destinationIndex].tileStyle = "tile-fivehundredtwelve";
                break;
            case 1024:
                boardArray[destinationIndex].tileStyle = "tile-thousandtwentyfour";
                break;
            case 2048:
                boardArray[destinationIndex].tileStyle = "tile-twentyfourtyeight";
                break;
            case 4096:
                boardArray[destinationIndex].tileStyle = "tile-fourtyninetysix";
                break;
            case 8192:
                boardArray[destinationIndex].tileStyle = "tile-eightyonenintytwo";
                break;
            case 16384:
                boardArray[destinationIndex].tileStyle = "tile-sixteenthreeeightyfour";
                break;
            case 32768:
                boardArray[destinationIndex].tileStyle = "tile-thirtytwosevensixtyeight";
                break;
            case 65536:
                boardArray[destinationIndex].tileStyle = "sixtyfivefivethirtysix";
                break;
            case 131072:
                boardArray[destinationIndex].tileStyle = "onethirtyonezeroseventytwo";
                break;
            default:
                console.log("No styling beyond 2048");
                break;
        }
    }

    /**
     * Move the tile in the currentIndex until blocked or if a merge is possible (when possible, merge)
     * @param {Board} boardArray 
     * @param {Number} currentIndex 
     * @param {function} getNextIndex 
     * @param {function} hasBorder 
     */
    const moveSingleTile = (boardArray, currentIndex, getNextIndex, hasBorder) => {

        // Only move non-zero valued tiles
        if (boardArray[currentIndex].value !== 0) {

            // Scenario 1a: No move since tile is already at the border
            // Scenario 1b: No move since there is an unmergable tile in the way
            const currentTileHasBorder = hasBorder(boardArray[currentIndex]);
            if (!currentTileHasBorder && boardArray[getNextIndex(currentIndex)].value !== 0) {
                // Check if merge action is available
                if (boardArray[currentIndex].value === boardArray[getNextIndex(currentIndex)].value) {
                    mergeTiles(boardArray, currentIndex, getNextIndex(currentIndex));
                }
            }
            // Scenario 2: Keeping moving tile until blocked by border or another non-zero tile
            else {
                let destinationIndex = boardArray[currentIndex].key;
                let neighbourIndex = getNextIndex(destinationIndex);
                while (hasBorder(boardArray[destinationIndex]) === false && boardArray[neighbourIndex].value === 0) {
                    // Save current tile's information
                    const currentValue = boardArray[destinationIndex].value;
                    const currentStyle = boardArray[destinationIndex].tileStyle;
                    const currentEmpty = boardArray[destinationIndex].empty;
                    // Add tile to next slot
                    boardArray[neighbourIndex].value = currentValue;
                    boardArray[neighbourIndex].tileStyle = currentStyle;
                    boardArray[neighbourIndex].empty = currentEmpty;
                    boardArray[neighbourIndex].justMoved = true;
                    // Remove tile from current position
                    boardArray[destinationIndex].value = 0;
                    boardArray[destinationIndex].tileStyle = 'tile-zero'
                    boardArray[destinationIndex].empty = true;
                    boardArray[destinationIndex].justMoved = false;
                    // Update indices
                    destinationIndex = getNextIndex(destinationIndex);
                    neighbourIndex = getNextIndex(destinationIndex);
                }
                // Check if blocked by another non-zero tile
                if (hasBorder(boardArray[destinationIndex]) === false && boardArray[neighbourIndex].value !== 0) {
                    // If a merge is available and neighbour hasn't merged recently, perform merge
                    if (boardArray[destinationIndex].value === boardArray[neighbourIndex].value && boardArray[neighbourIndex].justMerged === false) {
                        mergeTiles(boardArray, destinationIndex, neighbourIndex);
                    }
                }
            }
        }
    }

    /**
     * Clear all tiles' merge status i.e. set every tile's state "justMerged" and "justMoved" to false
     * @param {Board} boardArray 
     */
    const prepBoard = (boardArray) => {
        for (let i = 0; i < boardArray.length; i++) {
            if (boardArray[i].justMerged) {
                boardArray[i].justMerged = false;
            }
            if (boardArray[i].justMoved) {
                boardArray[i].justMoved = false;
            }
        }
    }

    const moveAllTiles = (direction) => {

        // Make copy of current board array
        let updatedBoard = [...tiles.myBoard]; // ... is the ES6 spread function
        prepBoard(updatedBoard);

        console.log(`Action: moving tiles ${direction}`);
        switch (direction) {

            case "left": // Scan through board array LTR and update accordingly
                for (let i = 0; i < tiles.myBoard.length; i++) {
                    moveSingleTile(updatedBoard, i, getIndexLeft, hasBorderLeft);
                }
                break;
            case "right": // Scan through board array RTL and update accordingly
                for (let i = tiles.myBoard.length - 1; i >= 0; i--) {
                    moveSingleTile(updatedBoard, i, getIndexRight, hasBorderRight);
                }
                break;
            case "up": // Scan through board array LTR and update accordingly
                for (let i = 0; i < tiles.myBoard.length; i++) {
                    moveSingleTile(updatedBoard, i, getIndexUp, hasBorderUp);
                }
                break;
            case "down": // Scan through board array RTL and update accordingly
                for (let i = tiles.myBoard.length - 1; i >= 0; i--) {
                    moveSingleTile(updatedBoard, i, getIndexDown, hasBorderDown);
                }
                break;
            default:
                break;
        }

        // Update board
        setTiles({ myBoard: updatedBoard });

        // Only add tiles if the there has been an action (move/merge)
        for (let i = 0; i < updatedBoard.length; i++) {
            if (updatedBoard[i].justMoved || updatedBoard[i].justMerged) {
                handleAddTile();
                break;
            }
        }

    }

    // Start game and add first tile
    useEffect(() => {
        let total = getArrayValueTotal(tiles.myBoard);
        if (total <= 2) {
            handleAddTile();
        }
    });

    // Handle keyboard actions
    useEffect(() => {
        const handleKeyDown = (e) => {

            // Reset Game
            // keyCode for Escape = 27 
            if (e.keyCode === 27) {
                console.log('You pressed the Escape Key.');
                handleResetBoard();
            }

            // Move Tiles using WASD or Arrow Keys only
            else if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 ||
                e.keyCode === 65 || e.keyCode === 68 || e.keyCode === 83 || e.keyCode === 87) {
                switch (e.keyCode) {
                    // keyCode for ArrowLeft = 37 or A key = 65
                    case 37:
                    case 65:
                        console.log('You pressed the Left Arrow Key or A key.');
                        moveAllTiles('left');
                        break;
                    // keyCode for ArrowUp = 38 or the W key = 87
                    case 38:
                    case 87:
                        console.log('You pressed the Up Arrow Key or W key.');
                        moveAllTiles('up');
                        break;
                    // keyCode for ArrowRight = 39 or the D key = 68
                    case 39:
                    case 68:
                        console.log('You pressed the Right Arrow Key or D key.');
                        moveAllTiles('right');
                        break;
                    // keyCode for ArrowDown = 40 or the S key = 83
                    case 40:
                    case 83:
                        console.log('You pressed the Down Arrow Key or S key.');
                        moveAllTiles('down');
                        break;
                    default:
                        break;
                }
                // handleAddTile();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    // Handle mobile gesture actions 
    const mobileHandlers = useSwipeable({
        onSwipedLeft: () => {
            moveAllTiles("left");
            // handleAddTile();
        },
        onSwipedRight: () => {
            moveAllTiles("right");
            // handleAddTile();
        },
        onSwipedUp: () => {
            moveAllTiles("up");
            // handleAddTile();
        },
        onSwipedDown: () => {
            moveAllTiles("down");
            // handleAddTile();
        }
    });

    return (
        <div>
            <div>
                <div className="game-controls">
                    <Button variant="outlined" onClick={() => { handleResetBoard() }}>Start Over</Button>
                    <ScoreboardModal />
                </div>
                <GameOverModal resetHandler={handleResetBoard} />
                <NewHighScoreModal resetHandler={handleResetBoard} />
                <NotHighScoreModal resetHandler={handleResetBoard} />
            </div>
            <div>
                <button onClick={() => { handleAddTile() }}>Add Tile</button>

            </div>
            <div {...mobileHandlers} className="game">

                <div className="game-board">
                    {tiles.myBoard.map(tiles => (
                        <Tile
                            key={tiles.key}
                            value={tiles.value}
                            empty={tiles.empty}
                            borderTop={tiles.borderTop}
                            borderLeft={tiles.borderLeft}
                            borderRight={tiles.borderRight}
                            borderBottom={tiles.borderBottom}
                            tileStyle={tiles.tileStyle}
                            newTile={tiles.newTile}
                            justMerged={tiles.justMerged}
                            justMoved={tiles.justMoved}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Board;