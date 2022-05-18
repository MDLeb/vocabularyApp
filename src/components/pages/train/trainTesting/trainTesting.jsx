import React from 'react';
import TestComp from '../testComp/testComp'
import './trainTesting.css'
import { WordsContext } from '../../../../App';


function TrainTesting() {

  let shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  }

  let n;//меняется в returne в зависимости от количества слов в библиотеке

  let randArr = (length, array) => {
     return shuffle(array.filter(elem => elem.learnLevel < 100)).slice(0, length);
  }

  return (
    <WordsContext.Consumer>
      {([[wordsArray, setWordsArray], [score, setScore]]) => (
        <div className='train-block'>
            <h2>TEST</h2>
            <input hidden readOnly value={wordsArray.length < 10 ? n = wordsArray.length : n = 10}/>
            <TestComp testArr={randArr(n, wordsArray)}></TestComp>
        </div>
      )}
    </WordsContext.Consumer>
  );
}

export default TrainTesting;
