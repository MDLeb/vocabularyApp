import React from 'react';
import ReactDOM from 'react-dom/client';
import LearnComp from '../learnComp/learnComp'
import './learn.css'

function Learn() {
  
  let arr = JSON.parse(window.localStorage.getItem('words')).filter(elem => { if(elem.learnLevel < 90) return elem});
  console.log(arr);

  return (
    <div className='learn-block'>
        <h2>Learn</h2>
        <LearnComp arr={arr}></LearnComp>
    </div>
  );
}

export default Learn;
