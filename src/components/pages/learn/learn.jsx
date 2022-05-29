import React from 'react';
import ReactDOM from 'react-dom/client';
import LearnComp from './learnComp/learnComp'
import './learn.css'
import { WordsContext } from '../../../App';


function Learn() {

  return (
      <WordsContext.Consumer>
      {([[wordsArray, setWordsArray], [score, setScore]]) => (
        <div className='learn-block'>
            {wordsArray?.filter(elem => elem.learnLevel < 100).length > 0 ? 
              <LearnComp arr={wordsArray.filter(elem => elem.learnLevel < 100)}></LearnComp> : 
              <div className='alert'>There are not any words with learn level less than 100%. Add some new words. </div>}
        </div>
      )}
    </WordsContext.Consumer>
  )
}

export default Learn;
