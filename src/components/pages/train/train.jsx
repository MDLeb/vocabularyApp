import React from 'react';
import TrainTesting from './trainTesting/trainTesting'
import './train.css'
import { WordsContext } from '../../../App';
import {Link} from "react-router-dom";



function Train({module}) {
  
  let trains = [
    {
      name:'test',
      bg:'../../../source/testing_bg_img.png',
      availiable: true,
    },
    {
      name: 'writing',
      bg:'../../../source/writing_bg_img.png',
      availiable: false,
    }
  ]


  return (
    <WordsContext.Consumer>
      {([]) => (
        <div className='train-block'>
            <h2>Trainings</h2>
            {
              module !='' ? 
              module == 'test' ?
              <TrainTesting /> : 
              <div>writing</div> :
              <div className='train-block-start'>
                {
                  trains.map(elem => 
                      <Link to={`/train/${elem.name}`} key={trains.indexOf(elem)} className='train-item' style={{backgroundImage: `url(${elem.bg})`}}>
                          <h2>{elem.name}</h2>
                      </Link>)
                }</div> 
                
            }
        </div>
      )}
    </WordsContext.Consumer>
  );
}

export default Train;
