import React from 'react';
import TestComp from '../testComp/testComp';
import WritingComp from '../writingComp/writingComp';
import { WordsContext } from '../../../../App';
import CheckMeaningComp from '../checkMeaningComp/checkMeaningComp'


function TrainTesting({train}) {

  let shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  }

  let n;//меняется в returne в зависимости от количества слов в библиотеке

  let randArr = (length, array, value = 'translation') => {
     return shuffle(
          array.filter(elem => {
            switch(value) {
              case 'translation':
                return (elem.learnLevel < 100 && elem.translation != 'Hasn`t been translated')
              case 'meaning':
                return (elem.learnLevel < 100 && elem.meaning && elem.meaning != '')
              default: return elem
            }
          })
        ).slice(0, length);
  }

  return (
    <WordsContext.Consumer>
      {([[wordsArray, setWordsArray], [score, setScore]]) => (
        <div className='train-block-test'>
            <input hidden readOnly value={wordsArray.length < 10 ? n = wordsArray.length : n = 10}/>
            {

              wordsArray.length >= 5 ? 

              (() => {
                switch (train.name) {
                  case 'check':{
                    if(randArr(n, wordsArray).length < 5)
                      return <div>There are not enough new words in your vocabulary for test. It needs more than 5 words with learn level less than 100% and translation. </div>
                    else return <TestComp testArr={randArr(n, wordsArray, 'translation')}></TestComp>
                  }
                  case 'check-meaning':
                    return <CheckMeaningComp testArr={randArr(n, wordsArray, 'meaning')}></CheckMeaningComp>
                  case 'write':
                    return <WritingComp testArr={randArr(n, wordsArray, 'translation')}></WritingComp>
                  default:
                    return null
                }
              })() :

              <div className='alert'>There are not enough words in your vocabulary for test. Add more than 5 words. </div>

            }
        </div>
      )}
    </WordsContext.Consumer>
  );
}

export default TrainTesting;
