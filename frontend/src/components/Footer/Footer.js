import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faReact } from '@fortawesome/free-brands-svg-icons'
import "./Footer.css";

const Footer = () => {

    return (
        <div className="footer">
            <div className="footer-item footer-react">
                <p>Built with</p>
                <a href="https://reactjs.org/">
                    <FontAwesomeIcon icon={faReact} />
                </a>
            </div>
            <div className="footer-item footer-github">
                <a href="https://github.com/philliplam8">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </div>
        </div>
    );
}

export default Footer;