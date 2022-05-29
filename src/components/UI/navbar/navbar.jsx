import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './navbar.css';
import { WordsContext } from '../../../App';
import Library from '../../pages/library/library';


const Navbar = ({level}) => {

    let activeTab = (event) => {
        Array.from(document.querySelectorAll('.navbar__links li'))
        .forEach(elem => {
            if(elem.classList.contains('active')) elem.classList.remove('active');
        });
        event.target.parentNode.classList.add('active');
    }
    let [currentUrl, setCurrentUrl] = useState(window.location.href);
    
    window.addEventListener('popstate', () => {setCurrentUrl(window.location.href)});

    // let burgerToogle = (e) => {
    //     e.target.nodeName == 'DIV' ?
    //         e.target.classList.toggle('active') : 
    //         e.target.closest('DIV').classList.toggle('active');
    //     document.querySelector('.navbar__links').classList.toggle('active');
    // }


    return (
        <WordsContext.Consumer>
        {([[wordsArray, setWordsArray], [score, setScore]]) => (
            <div className="navbar">
                <div className='navbar__level'>Level: {level}</div>
                <div className='navbar__score'>Score: {score}</div>
               
                <ul className="navbar__links">
                    <li className={currentUrl.includes('library') || 
                        (!currentUrl.includes('library') && !currentUrl.includes('train') && !currentUrl.includes('learn')) ?
                         'active' : ''}>
                        <Link onClick={activeTab} to="/library">Library</Link>
                    </li>
                    <li className={currentUrl.includes('train') ? 'active' : ''}>
                        <Link onClick={activeTab} to="/train">Train</Link>
                    </li>
                    <li className={currentUrl.includes('learn') ? 'active' : ''}>
                        <Link onClick={activeTab} to="/learn">Learn</Link>
                    </li>
                </ul>
            </div>
        )}
        </WordsContext.Consumer>
    );
};

export default Navbar;