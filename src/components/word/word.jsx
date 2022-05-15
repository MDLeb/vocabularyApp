import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';

const WordItem = (props) => {
  
  return (
    <ul className='word-item'>
      <li>{props.word.value}</li>
      <li>{props.word.translation}</li>
      <li>{props.word.learnLevel}%</li> 
    </ul>
  );
}

export default WordItem;
