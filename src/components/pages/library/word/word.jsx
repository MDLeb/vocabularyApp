import React, { useRef, useState } from 'react';
import { WordsContext } from '../../../../App';

const WordItem = ({id}) => {

  const [changeBtn, setChangeBtn] = useState('change');

  const saveChanges = (setWordsArray, wordsArray) => {
    if (changeBtn == 'save' && translation.current.value){
      let inputValue = translation.current;
      setWordsArray(wordsArray.map(elem => elem.id == id ? {...elem, translation:inputValue.value} : elem));
    }
    changeBtn == 'save' ? setChangeBtn('change') : setChangeBtn('save');
  }

  let translation = useRef('');

  return (
      <WordsContext.Consumer>
      {([[wordsArray, setWordsArray], [a, b]]) => (
          <ul className='word-item'>
          <li><span className='word-item-value'>{wordsArray.find(elem => elem.id == id).value}</span></li>
          <li>
              {changeBtn == 'save' ? 
              <input type="text" autoFocus={true} ref={translation} onBlur={(e) => {
                if(e.relatedTarget.classList.contains('save-changes-btn')) return;
                  setChangeBtn('change');
              }}/> :
              <span className='word-item-translation'>
                {wordsArray.find(elem => elem.id == id).translation}
              </span>}
              <button className={changeBtn == 'save' ? 'save-changes-btn save' : 'save-changes-btn change'} 
                onClick={(e) => {
                  saveChanges(setWordsArray, wordsArray);
              }}></button>
          </li>
          <li>{wordsArray.find(elem => elem.id == id).learnLevel}%</li> 
          <li className='word-remove' onClick={()=> {
                (setWordsArray(wordsArray.filter(elem => elem.id !== id)));
              }}>Delete
          </li>
        </ul>
      )}
    </WordsContext.Consumer>
  );
}

export default WordItem;
