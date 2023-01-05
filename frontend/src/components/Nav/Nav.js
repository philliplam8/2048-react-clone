import React, { useContext, useEffect } from "react";
import { ScoreContext } from "../../ScoreContext";
import "./Nav.css";

const Nav = (props) => {
    const [score, setScore] = useContext(ScoreContext);

    return (
        <div className="navbar">
            <h3>2048 Clone</h3>
            <p>Score: {score}</p>
        </div>
    );
}

export default Nav;