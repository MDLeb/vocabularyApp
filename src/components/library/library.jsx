import React from 'react';
import { useState } from 'react';

function Library() {
  let arr = [];


  if(window.localStorage.getItem('words')){
    arr = JSON.parse(window.localStorage.getItem('words'));
    console.log(arr);
  } else {
    arr = [{
      value:"There aren't any words",
      id:1,
      translation:''
    }];
  }

  let [userWords, setUserWords] = useState(arr);

  
  
    class Word {
      constructor(word) {
        this.value = word;
        this.learnLevel = 0;
        if(!userWords.length) {
          this.id = 2;//добавить useID
        }
        else this.id = userWords[userWords.length - 1].id+1;//добавить useID
        console.log(this.id);
      }
      
      async init(callback) {
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
    if(wordValue) {
      let word = new Word(wordValue.value);
      await word.init(() => {});
      if(userWords[0].value == "There aren't any words"){
        console.log('++');
        userWords = userWords.slice(1);
      }
      setUserWords([...userWords, word]);
      console.log(userWords);
      window.localStorage.setItem('words', JSON.stringify(userWords));
      //console.log(JSON.parse(window.localStorage.getItem('words')))
    }
  }

  return (
    <div>
        <div className='add-new-word'>
          <input id="new-word-input" type="text" />
          <button onClick={add}>Add</button>
          {userWords.map(word => <div key={word.id}>{word.value} - {word.translation}</div>)}
        </div>
    </div>
  );
}

export default Library;
