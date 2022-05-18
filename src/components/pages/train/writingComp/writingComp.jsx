import React, { useEffect } from 'react';
import { useState } from 'react';
import { WordsContext } from '../../../../App';
import {Link} from "react-router-dom";

const WritingComp = ({testArr}) => {
  
  console.log(testArr);

  let [n, setN] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  let [currentWord, setCurrentWord] = useState({
    value:testArr[n].value,
    translation:testArr[n].translation,
  });

  const nextWord = () => {
    if(n == testArr.length-1) return;
    setN(n = n+1);
    setCurrentWord({
      value:testArr[n].value,
      translation:testArr[n].translation,
    });
  }
  
  const checkWord = (e) => {
    if(!e.target.value) return;
    if(currentWord.value.toLowerCase() === e.target.value.toLowerCase()){
      e.target.value = null;
      nextWord();
      setCurrentScore(currentScore+1);
      return true;
    }  
    else {
      currentScore > 0 ? setCurrentScore(currentScore-1) : setCurrentScore(0);
      return false;
    }
  }

  return (
    <WordsContext.Consumer>
      {([[wordsArray, setWordsArray], [score, setScore]]) => (
          
          (n + 1) == testArr.length ?
          <div className='test-modal last'>
              {score > 5 ? <p className='test-modal-score'>Well done. Your score is {currentScore} points!</p> : <p className='test-modal-score'>Your score is {currentScore}.</p>}
              <Link to="/train">
                <button className='test-modal-exit' onClick={() => {setScore(+score+currentScore)}}>+</button>
              </Link>
          </div> :
          <div className='test-modal'>
              <p className='test-modal-score'>+{currentScore}</p>
              <Link to="/train">
                <button className='test-modal-exit' onClick={() => {setScore(+score+currentScore)}}>+</button>
              </Link>
              <span className='test-modal-number'>{n+1}/{testArr.length}</span>
              <p className='test-modal-word'>{currentWord.translation}</p>
              <div>
                <input autoFocus={true} type="text" onKeyDown={(e)=>{if(e.code == 'Enter' || e.code == 'NumpadEnter') checkWord(e)}}/>
              </div>
          </div>
        
      )}
    </WordsContext.Consumer>
  );
}

export default WritingComp;
