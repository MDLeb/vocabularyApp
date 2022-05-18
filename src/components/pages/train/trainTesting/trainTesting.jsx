import React from 'react';
import TestComp from '../testComp/testComp';
import WritingComp from '../writingComp/writingComp';
import './trainTesting.css'
import { WordsContext } from '../../../../App';


function TrainTesting({train}) {

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
            <h2>{train.name}</h2>
            <input hidden readOnly value={wordsArray.length < 10 ? n = wordsArray.length : n = 10}/>
            {wordsArray.length >= 5 ? 
              train.name == 'test' ? 
              randArr(n, wordsArray).length < 5 ?
              <div>There are not enough new words in your vocabulary for test. It needs more than 5 words with learn level less than 100%. </div> :
              <TestComp testArr={randArr(n, wordsArray)}></TestComp> : 
              <WritingComp testArr={randArr(n, wordsArray)}></WritingComp> : 
              <div>There are not enough words in your vocabulary for test. Add more than 5 words. </div>}
        </div>
      )}
    </WordsContext.Consumer>
  );
}

export default TrainTesting;
