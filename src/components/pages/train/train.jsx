import React from 'react';
import TrainTesting from './trainTesting/trainTesting'
import './train.css'
import { WordsContext } from '../../../App';
import {Link} from "react-router-dom";



function Train({module}) {
  
  let trains = [
    {
      name:'check',
      img:'./img/check-mode-bg.png',
      availiable: true,
      level: 'easy',
    },
    {
      name: 'write',
      img:'./img/write-mode-bg.png',
      availiable: false,
      level: 'hard',
    },
    {
      name: 'check-meaning',
      img:'../../../source/check-mode.svg',//заменить
      availiable: false,
      level: 'hard',
    }
  ]


  return (
    <WordsContext.Consumer>
      {([[wordsArray, setWordsArray], [score, setScore]]) => (
        <div className='train-block'>
            {
                (() => {switch (module) {
                case '': 
                  return <div className='train-block-start'>
                       {
                        trains.map(elem => 
                            <Link to={`/train/${elem.name}`} key={trains.indexOf(elem)} className='train-item'>
                                <div>
                                  <h2>{elem.name} words<br/>Mode</h2>
                                  <p>{elem.level} mode</p>
                                </div>
                                <img src={elem.img} alt="#"  />
                            </Link>)
                      }
                    </div> 
                
                case 'check': {
                  return <TrainTesting train={trains[0]}/>
                }

                case 'check-meaning': {
                  console.log('+');
                  return <TrainTesting train={trains[2]}/>
                }

                case 'write': {
                  return <TrainTesting train={trains[1]}/>
                }

                default:
                    return null
                    
              }})()                
            }
        </div>
      )}
    </WordsContext.Consumer>
  );
}

export default Train;
