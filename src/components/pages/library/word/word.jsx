import React from 'react';
import { WordsContext } from '../../../../App';

const WordItem = ({word}) => {
  
  return (
      <WordsContext.Consumer>
      {([[wordsArray, setWordsArray], []]) => (
          <ul className='word-item'>
          <li>{word.value}</li>
          <li>{word.translation}</li>
          <li>{word.learnLevel}%</li> 
          <li><button className='word-remove-btn' onClick={()=> {
                (setWordsArray(wordsArray.filter(elem => elem.id !== word.id)));
              }
          }>&#128465;</button></li>
        </ul>
      )}
    </WordsContext.Consumer>
  );
}

export default WordItem;
