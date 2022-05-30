import React, { useEffect } from 'react';
import { useState } from 'react';
import { WordsContext } from '../../../../App';
import {Link} from "react-router-dom";

const WritingComp = ({testArr}) => {
  
  let [n, setN] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  let [currentWord, setCurrentWord] = useState({
    value:testArr[n]?.value,
    translation:testArr[n]?.translation,
  });

  const nextWord = () => {
    setN(++n);
    if(n > testArr.length-1) return;
    setCurrentWord({
      value:testArr[n]?.value,
      translation:testArr[n]?.translation,
    });
  }
  
  const checkWord = (e) => {
    let enteredValue;
    if(e.type == 'keydown') {
        if(!e.target.value) return
        enteredValue = e.target.value;
    } else if(e.type == 'click') {
        if(!e.target.parentNode.querySelector('.test-modal-input').value) return;
        enteredValue = e.target.parentNode.querySelector('.test-modal-input').value;
    }
    if(currentWord.value.toLowerCase() === enteredValue.toLowerCase()){
      e.type == 'keydown' ? e.target.value = null : e.target.parentNode.querySelector('.test-modal-input').value = null;
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
          
          n > testArr.length - 1 ?
          <div className='test-modal last'>
              {currentScore > 5 ? <p className='test-modal-final-score'>Well done. Your score is {currentScore} points!</p> : <p className='test-modal-final-score'>Your score is {currentScore}.</p>}
              <Link to="/train">
                <button className='test-modal-exit' onClick={() => {setScore(+score+currentScore)}}>exit</button>
              </Link>
          </div> :
          <div className='test-modal'>
              <p className='test-modal-score'>Score: {currentScore}</p>
              <Link to="/train">
                <button className='test-modal-exit' onClick={() => {setScore(+score+currentScore)}}>exit</button>
              </Link>
              <span className='test-modal-number'>{n+1}/{testArr.length}</span>
              <p className='test-modal-word'>{currentWord.translation}</p>
              <p className='test-modal-description'>Write translation for this word</p>
              <div>
                <input className='test-modal-input' autoFocus={true} type="text" onKeyDown={(e)=>{
                  if(e.code == 'Enter' || e.code == 'NumpadEnter') {
                    let a = checkWord(e);
                    if(a) {
                        wordsArray.find(elem => elem.value == currentWord.value).learnLevel < 90 ?
                        wordsArray.find(elem => elem.value == currentWord.value).learnLevel += 10 : wordsArray.find(elem => elem.value == currentWord.value).learnLevel = 100; 
                        window.localStorage.setItem(`words`, '');
                        window.localStorage.setItem(`words`, JSON.stringify(wordsArray));
                    }
                  }
                }}/>
                <button className='test-modal-send' onClick={
                  ((e)=>{
                    let a = checkWord(e);
                    if(a) {
                        wordsArray.find(elem => elem.value == currentWord.value).learnLevel < 90 ?
                        wordsArray.find(elem => elem.value == currentWord.value).learnLevel += 10 :
                        wordsArray.find(elem => elem.value == currentWord.value).learnLevel = 100; 
                        window.localStorage.setItem(`words`, '');
                        window.localStorage.setItem(`words`, JSON.stringify(wordsArray));
                    }
                  })
                }>enter</button>
              </div>
          </div>
        
      )}
    </WordsContext.Consumer>
  );
}

export default WritingComp;
