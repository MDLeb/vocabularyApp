import React, { useRef, useState } from 'react';
import { WordsContext } from '../../../../App';

const WordItem = ({id}) => {

  const [changeBtn, setChangeBtn] = useState('change');

  const saveChanges = (setWordsArray, wordsArray) => {
    if (changeBtn == 'save' && translation.current.value){
      let inputValue = translation.current;
      setWordsArray(wordsArray.map(elem => elem.id == id ? {...elem, translation:inputValue.value} : elem));
    }
    setChangeBtn('save') ? setChangeBtn('change') : setChangeBtn('save');
    toggleBtn();
  }
  const toggleBtn = () => {
    let changeBtnElem = document.querySelector('.save-changes-btn');
    
    changeBtn == 'save' ?
      changeBtnElem.classList.add('active') :
      changeBtnElem.classList.remove('active');
    
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
                  toggleBtn();
              }}/> :
              <span className='word-item-translation'>
                {wordsArray.find(elem => elem.id == id).translation}
              </span>}
              <button className='save-changes-btn' onClick={(e) => {
                saveChanges(setWordsArray, wordsArray);
              }}></button>
          </li>
          <li>{wordsArray.find(elem => elem.id == id).learnLevel}%</li> 
          <li className='word-remove' onClick={()=> {
                (setWordsArray(wordsArray.filter(elem => elem.id !== id)));
              }}>Delete<span className='remove-icon'></span>
          </li>
        </ul>
      )}
    </WordsContext.Consumer>
  );
}

export default WordItem;
