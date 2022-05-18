import React from 'react';
import {Link} from "react-router-dom";
import './navbar.css';

const Navbar = ({level}) => {

    let activeTab = (event) => {
        Array.from(document.querySelectorAll('.navbar__links li'))
        .forEach(elem => {
            if(elem.classList.contains('active')) elem.classList.remove('active');
        });
        event.target.parentNode.classList.add('active');
    }

    return (
        <div className="navbar">
            <div className='navbar__level'>Level: {level}</div>
            <ul className="navbar__links">
                <li>
                    <Link onClick={activeTab} to="/library">Library</Link>
                </li>
                <li>
                    <Link onClick={activeTab} to="/train">Train</Link>
                </li>
                <li>
                    <Link onClick={activeTab} to="/learn">Learn</Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;