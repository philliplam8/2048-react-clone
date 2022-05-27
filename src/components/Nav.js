import React, { useContext } from "react";
import { TileContext } from "../TileContext";
import "./Nav.css";

const Nav = () => {
    const [tiles, setTiles] = useContext(TileContext);

    return (
        <div className="navbar">
            <h3>2048 Clone</h3>
            <p>Score:</p>
        </div>
    );
}

export default Nav;