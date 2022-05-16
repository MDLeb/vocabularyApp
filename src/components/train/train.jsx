import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import WordItem from '../word/word';
import TestComp from '../testComp/testComp'
import './train.css'

function Train() {
  
  let rand = (max) => {
    let randIndexArr = [];
    while(randIndexArr.length < 5) {//почемуто будет в два раза больше
      let n = Math.floor(Math.random() * max);
      if(randIndexArr.includes(n)) continue;
      randIndexArr.push(n);
    }
    return randIndexArr;
  }
  
  let testArr = [];
  let arr = JSON.parse(window.localStorage.getItem('words')).filter(elem => { if(elem.learnLevel < 90) return elem});
  let indexArr = rand(arr.length);
  indexArr.forEach(elem => testArr.push(arr[elem]));

  return (
    <div className='train-block'>
        <h2>Training</h2>
        <TestComp testArr={testArr}></TestComp>
    </div>
  );
}

export default Train;
