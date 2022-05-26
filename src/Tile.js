import React from "react";
import "./Tile.css";

const Tile = ({ tileStyle, newTile, value }) => {

    return (
        <div className={`square ${tileStyle} ${newTile}`}>
            <h3 className="square-value">{value}</h3>
        </div>
    );
}

export default Tile;