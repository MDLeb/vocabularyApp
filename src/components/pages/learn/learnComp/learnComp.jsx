import React, { useRef } from 'react';
import { useState } from 'react';

const LearnComp = ({arr}) => {

  let [n, setN] = useState(0);
  let currentWord = {
    value:arr[n].value,
    translation:arr[n].translation,
    learnLevel:arr[n].learnLevel,
  }

  const nextWord = () => {
    if(n == arr.length-1) {
      setN(n = 0);
      return;
    }
    setN(n = n+1);
    currentWord = arr[n].value;
  }
  

  return (
    <div className='learn-modal'>
        <div className='word-learn-level'>{currentWord.learnLevel}%</div>
        <p className='learn-modal-word'>{currentWord.value}</p>
        <p className='learn-modal-translation'>translation</p>
        <p className='learn-modal-translation-value'>{currentWord.translation}</p>
        {n == arr.length - 1 ? 
        <button className='learn-modal-btn' onClick={nextWord}>Learn again</button> :
        <button className='learn-modal-btn arrow' onClick={nextWord}>&#129106;</button>}
    </div>
  );
}

export default LearnComp;
