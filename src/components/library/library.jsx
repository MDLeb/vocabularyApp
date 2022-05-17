import React from 'react';
import WordItem from '../word/word';
import './library.css';
import { WordsContext } from '../../App';

function Library() {  
  class Word {
    constructor(word) {
      this.value = word;
      this.learnLevel = 0;
      this.id = Date.now();
    }
    async init(callback) {//запрос перевода слова
        const encodedParams = new URLSearchParams();
        encodedParams.append("fast", "false");
        encodedParams.append("from", "en");
        encodedParams.append("to", "ru");
        encodedParams.append("text", `${this.value}`);

        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Host': 'translo.p.rapidapi.com',
            'X-RapidAPI-Key': '90699d32b3msh5c1261c72a4493bp1e89c5jsn4d9e6c19f200'
          },
          body: encodedParams
        };
        
        await fetch('https://translo.p.rapidapi.com/api/v3/translate/', options)
          .then(response => response.json())
          .then(response => {
            this.translation = response.translated_text;
          });
      
        callback.bind(this)();
    }
  }

  async function add()  {
    let wordValue = document.querySelector('#new-word-input');
    if(!wordValue && !wordValue.value) return;
    let word = new Word(wordValue.value);
    await word.init(() => {});
    document.querySelector('#new-word-input').value = null;
    return word;
  }

  return (
    <WordsContext.Consumer>
    {([wordsArray, setWordsArray]) => (
        <div className='library'>
          <div className='add-new-word'>
            <input id="new-word-input" type="text" />
            <button onClick={async ()=> {
               let word = await add();
              (setWordsArray([...wordsArray, word]))
            }}>+</button>
          </div>
          <div className='word-list'>
            <ul>
              <li>Word</li>
              <li>Translate</li>
              <li>Learn level</li>
              <li></li>
            </ul>
            {(!wordsArray.length) ? <ul><li>There aren't any words. Add some :)</li></ul> : wordsArray.map((word) => <WordItem  key={word.id} word={word} />)}
          </div>
      </div>
    )}
  </WordsContext.Consumer>


    
  );
}

export default Library;
