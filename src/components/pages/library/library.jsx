import React, {useState} from 'react';
import WordItem from './word/word';
import './library.css';
import { WordsContext } from '../../../App';
import Spinner from '../../UI/spinner/spinner';
import A from '../../data/A';
import B from '../../data/B';
import C from '../../data/C';
import D from '../../data/D';
import E from '../../data/E';
import F from '../../data/F';
import G from '../../data/G';
import H from '../../data/H';
import I from '../../data/I';
import J from '../../data/J';
import K from '../../data/K';
import L from '../../data/L';
import M from '../../data/M';
import N from '../../data/N';
import O from '../../data/O';
import P from '../../data/P';
import Q from '../../data/Q';
import R from '../../data/R';
import S from '../../data/S';
import T from '../../data/T';
import U from '../../data/U';
import V from '../../data/V';
import W from '../../data/W';
import X from '../../data/X';
import Y from '../../data/Y';
import Z from '../../data/Z';




function Library() {  
  const DATA = {'A':A, 'B':B, 'C':C, 'D':D,'E':E, 'F':F, 'G':G, 'H':H, 'I':I, 'J':J, 'K':K, 'L':L, 'M':M, 'N':N, 'O':O, 'P': P, 'Q':Q, 'R':R, 'S':S, 'T':T, 'U':U, 'V':V, 'W':W, 'X':X, 'Y':Y, 'Z':Z};

  class Word {
    constructor(word) {
      this.value = word;
      this.learnLevel = 0;
      this.id = Date.now();
      this.meaning = '';
    }
    async init(callback) {//запрос перевода слова + meaning

      let n = 1;
        let firstLetter = this.value[0].toUpperCase(); //поиск значения
        if(DATA[`${firstLetter}`] && 
            DATA[`${firstLetter}`][this.value.toUpperCase()] &&
            DATA[`${firstLetter}`][this.value.toUpperCase()].MEANINGS[`${n}`] &&
            DATA[`${firstLetter}`][this.value.toUpperCase()].MEANINGS[`${n}`][1])  
          this.meaning = DATA[`${firstLetter}`][this.value.toUpperCase()].MEANINGS[`${n}`][1];

        while(this.meaning.includes(`${this.value}`) && DATA[`${firstLetter}`][this.value.toUpperCase()].MEANINGS[`${n+1}`]) {
          this.meaning = DATA[`${firstLetter}`][this.value.toUpperCase()].MEANINGS[`${n+1}`][1];
          n++;
        }

        if(this.meaning.includes(';'))
          this.meaning = this.meaning.split(';')[0];
        console.log(this.meaning);
        //TRANSLO_API

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

        setIsLoading(true);
        //TRANSLO_API

        await fetch('https://translo.p.rapidapi.com/api/v3/translate/', options)
          .then(response => response.json())
          .then(response => {
            if (!response.translated_text) {
              alert('We didn`t find translation for this word');//??
              this.translation = 'Hasn`t been translated';
              return;
            }
            response.translated_text.includes(';') ?
            this.translation = response.translated_text.split(';')[0] :
            this.translation = response.translated_text;
          })
          .catch((e) => {
            console.error(e);
          })//417????????????
          .finally(() => {setIsLoading(false)});
      
        callback.bind(this)();
    }
  }

  async function add()  {
    let wordValue = document.querySelector('#new-word-input');
    if(!wordValue && !wordValue.value) return;
    let word = new Word(wordValue.value);
    let spinner = document.createElement('Spinner');
    document.querySelector('.library').append(spinner);
    await word.init(() => {});
    document.querySelector('#new-word-input').value = null;
    return word;
  }

  const [isLoading, setIsLoading] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  const checkInput = () => {
    document.querySelector('#new-word-input').value ? setIsInputEmpty(false) : setIsInputEmpty(true);
  }

  function sortByField(array, params = {}) {
    let arr = [];
    if (!params.filter) {
      arr = array.sort((a, b) => {
      if (params.field == 'learnLevel') 
        return (a[params.field] > b[params.field] ? 1 : -1);
      else 
        return (a[params.field].toLowerCase() > b[params.field].toLowerCase() ? 1 : -1);
      });
    } else {
        arr = array.filter(elem => elem.value.includes(params.value));
    }
    return arr;
  }
  
  let [sortBy, setSortBy] = useState({
    field: 'value',
    filter: false,
    value: '',
  })
  //value, translation, learnLevel
  //+filter = 'word' entered
  
  return (
    <WordsContext.Consumer>
    {([[wordsArray, setWordsArray], [score, setScore]]) => (
        <div className='library'>
          {isLoading ? <Spinner /> : ''}
          <div className='add-new-word'>
            <input id="new-word-input" type="text" onChange={checkInput} placeholder='Write your word here...' onKeyUp={
               async (e)=> {
                if (e.code == 'Enter' || e.code == 'NumpadEnter' && e.target.value) {
                    let word = await add();
                    (setWordsArray([...wordsArray, word]));
                    setSortBy({field:'value', filter: false, value: '',});
                } else if (!e.target.value) {
                    setSortBy({field:'value', filter: false, value: ''});
                } else {
                    setSortBy({field:'value', filter: true, value: `${e.target.value}`})
                }
            }} onBlur={(e) => {
              if(!e.relatedTarget) {
                e.target.value = '';
                setIsInputEmpty(true);
                setSortBy({field:'value', filter: false, value: ''});
                return;
              }
              if (e.relatedTarget.classList.contains('add-word-btn')) return;
              e.target.value = null;
              setIsInputEmpty(true);
            }}/>
            <button className='add-word-btn' disabled={isInputEmpty ? true : false} onClick={async ()=> {
              let word = await add();
              setIsInputEmpty(true);
              (setWordsArray([...wordsArray, word]));
              setSortBy({field:'value', filter: false, value: '',});
            }}>+</button>
          </div>
          <div className='word-list'>
            <ul className='word-list-header'>
              <li>Word<button className='word-list-sort-btn' onClick={() => {setSortBy({field:'value', filter: false, value: '',})}}>&#9660;</button></li>
              <li>Translate<button className='word-list-sort-btn' onClick={() => {setSortBy({field:'translation', filter: false, value: '',})}}>&#9660;</button></li>
              <li>Learn level<button className='word-list-sort-btn' onClick={() => {setSortBy({field:'learnLevel', filter: false, value: '',})}}>&#9660;</button></li>
              <li></li>
            </ul>
            {(!wordsArray.length) ? 
              <ul><li>There aren't any words. Add some.</li></ul> : 
              sortByField(wordsArray, sortBy).map((word) => <WordItem  key={word.id} id={word.id} />)}
          </div>
      </div>
    )}
  </WordsContext.Consumer>


    
  );
}

export default Library;
