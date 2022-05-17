import React from 'react';
import TestComp from '../testComp/testComp'
import './train.css'
import { WordsContext } from '../../App';


function Train() {
  
  let shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  }

  let n;

  let randArr = (length, array) => {
     return shuffle(array.filter(elem => elem.learnLevel < 100)).slice(0, length);
  }

  return (
    <WordsContext.Consumer>
      {([wordsArray, setWordsArray]) => (
        <div className='train-block'>
            <h2>Training</h2>
            <input hidden value={wordsArray.length < 10 ? n = wordsArray.length : n = 10}/>
            <TestComp testArr={randArr(n, wordsArray)}></TestComp>
        </div>
      )}
    </WordsContext.Consumer>
  );
}

export default Train;
