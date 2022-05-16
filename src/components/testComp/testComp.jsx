import React, { useRef } from 'react';
import { useState } from 'react';
import WordItem from '../word/word';
import './testComp.css'

const TestComp = ({testArr}) => {
  
  let var1 = '';
  let var2 = '';

  let randWord = (max) => {
    let word;
    let index = Math.floor(Math.random()*max);
    word = testArr[index].translation;
    if(word == currentWord.value || (var1 != '' && var2 == var1)){
      randWord(max);
      return;
    }
    else return word;
  } 

  let [n, setN] = useState(0);
  let currentWord = {
    value:testArr[n].value,
    translation:testArr[n].translation,
    vars:[var1, var2, testArr[n].translation],
  }

  var1 = randWord(testArr.length);
  var2 = randWord(testArr.length);

  currentWord.vars[0] = var1;
  currentWord.vars[1] = var2;


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
        <span className='test-modal-number'>{n+1}/{testArr.length}</span>
        <p className='test-modal-word'>{currentWord.value}</p>
        <div className='test-modal-btns'>
           {currentWord.vars.map((elem, index) => <button className='test-modal-btn' onClick={checkWord} key={index}>{elem}</button>)}
        </div>
    </div>
  );
}

export default TestComp;
