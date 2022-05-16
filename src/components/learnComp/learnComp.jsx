import React, { useRef } from 'react';
import { useState } from 'react';
import './learnComp.css'

const LearnComp = ({arr}) => {

  let [n, setN] = useState(0);
  let currentWord = {
    value:arr[n].value,
    translation:arr[n].translation,
  }

  const nextWord = () => {
    if(n == arr.length-1) {
      document.querySelector('.learn-modal-btn').innerHTML = 'Learn again';
      setN(n = 0);
      return;
    }
    document.querySelector('.learn-modal-btn').innerHTML = 'Next';
    setN(n = n+1);
    currentWord = arr[n].value;
  }
  

  return (
    <div className='learn-modal'>
        <p className='learn-modal-word'>{currentWord.value} - {currentWord.translation}</p>
        <button className='learn-modal-btn' onClick={nextWord}>Next</button>
    </div>
  );
}

export default LearnComp;
