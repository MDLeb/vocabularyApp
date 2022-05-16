import React, { useRef } from 'react';
import { useState } from 'react';
import './testComp.css'

const TestComp = ({testArr}) => {

  let [n, setN] = useState(0);
  let currentWord = {
    value:testArr[n].value,
    translation:testArr[n].translation,
    vars:['false', 'false', testArr[n].translation],
  }

  const nextWord = () => {
    if(n == testArr.length-1) return;
    setN(n = n+1);
    currentWord = testArr[n].value;
  }
  
  const checkWord = (e) => {
    console.log(currentWord.translation, e.target.innerText)
    if(currentWord.translation.toLowerCase() === e.target.innerText.toLowerCase()){
      console.log('Верно');
      nextWord();
    }
    else {
      console.log('Неверно') 
    }    
  }

  return (
    <div className='test-modal'>
        <p className='test-modal-word'>{n+1} - {currentWord.value}</p>
        <div className='test-modal-btns'>
           {currentWord.vars.map((elem, index) => <button className='test-modal-btn' onClick={checkWord} key={index}>{elem}</button>)}
        </div>
    </div>
  );
}

export default TestComp;
