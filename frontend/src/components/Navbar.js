import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const NavBar = () => {
    let cookies = new Cookies();

    const handleLogout = () => {
        cookies.remove("authToken");
        cookies.remove("userId");
        cookies.remove("name");
    };

    return (
        <header>
            <nav className="container">
            <Link className="container" to="/home">
                <h1>NGO Dashboard</h1>
            </Link>
            <ul>
                <li>
                    <Link className="link" onClick={handleLogout} to="/">
                        LOGOUT
                    </Link>
                </li>
            </ul>
        </nav>
        </header>
    )
};

export default NavBar;