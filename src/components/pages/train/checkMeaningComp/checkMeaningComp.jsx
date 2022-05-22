import React from 'react';
import { useState } from 'react';
import { WordsContext } from '../../../../App';
import {Link} from "react-router-dom";

const CheckMeaningComp = ({testArr}) => {
  
  //здесь можно поменять количество вариантов ответа (кроме верного) - length
  let randWord = (startArr = [], length = 3) => {//передать стартовый массив, количество элементов на выходе
    if (testArr.length == 0) return;
    let words = startArr;
    let index = Math.floor(Math.random() * testArr.length);
    let word = testArr[index].value;
    if(words.includes(word) || word == testArr[n]?.value) randWord(words, length);
    else words.push(word);
    if (words.length < length) {
      randWord(words, length);
    }
    return words;
  } 

  let shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  }

  let [n, setN] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  let [currentWord, setCurrentWord] = useState({
    value:testArr[n]?.value,
    meaning:testArr[n]?.meaning,
    vars:[...randWord(), testArr[n]?.value],
  });

  const nextWord = () => {
    setN(++n);
    if(n > testArr.length-1) return;
    setCurrentWord({
      value:testArr[n]?.value,
      meaning:testArr[n]?.meaning,
      vars:[...randWord(), testArr[n]?.value],
    });
  }
  
  const checkWord = (e) => {
    if(currentWord.value.toLowerCase() === e.target.innerText.toLowerCase()){
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
          n > testArr.length-1 ?
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
              <p className='test-modal-word meaning'>{currentWord.meaning}</p>
              <span className='test-modal-description'>Chose word by its meaning</span>
              <div className='test-modal-btns'>
                {shuffle(currentWord.vars).map((elem, index) => <button className='test-modal-btn' onClick={(event) => {
                    let a = checkWord(event);
                    if(a) {
                        wordsArray.find(elem => elem.value == currentWord.value).learnLevel < 90 ?
                        wordsArray.find(elem => elem.value == currentWord.value).learnLevel += 10 : wordsArray.find(elem => elem.value == currentWord.value).learnLevel = 100; 
                        window.localStorage.setItem(`words`, '');//разобраться с контекстом и менять в локал сторэдж только при выходе
                        window.localStorage.setItem(`words`, JSON.stringify(wordsArray));
                    }
                }
                  } key={index}>{elem}</button>)}
              </div>
          </div>
      )}
    </WordsContext.Consumer>
  );
}

export default CheckMeaningComp;
