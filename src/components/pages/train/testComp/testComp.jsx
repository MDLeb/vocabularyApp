import React from 'react';
import { useState } from 'react';
import './testComp.css'
import { WordsContext } from '../../../../App';
import {Link} from "react-router-dom";

const TestComp = ({testArr}) => {
  
  console.log(testArr);

  //здесь можно поменять количество вариантов ответа (кроме верного) - length
  let randWord = (startArr = [], length = 3) => {//передать стартовый массив, количество элементов на выходе
    let words = startArr;
    let index = Math.floor(Math.random() * testArr.length);
    let word = testArr[index].translation;
    if(words.includes(word) || word == testArr[n].translation) randWord(words, length);
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
    value:testArr[n].value,
    translation:testArr[n].translation,
    vars:[...randWord(), testArr[n].translation],
  });

  const nextWord = () => {
    if(n == testArr.length-1) return;
    setN(n = n+1);
    setCurrentWord({
      value:testArr[n].value,
      translation:testArr[n].translation,
      vars:[...randWord(), testArr[n].translation],
    });
  }
  
  const checkWord = (e) => {
    if(currentWord.translation.toLowerCase() === e.target.innerText.toLowerCase()){
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
              <p className='test-modal-word'>{currentWord.value}</p>
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

export default TestComp;
