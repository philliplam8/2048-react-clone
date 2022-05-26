import React, { useContext } from "react";
import { TileContext } from "./TileContext";
import getArrayScoreTotal from "./utils/helpers";
import "./Nav.css";

const Nav = () => {
    const [tiles, setTiles] = useContext(TileContext);

    return (
        <div className="navbar">
            <h3>2048 Clone</h3>
            <p>Score: {getArrayScoreTotal(tiles.myBoard)}</p>
        </div>
    );
}

export default Nav;