import React, {useState, Fragment, createContext, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Learn from './components/pages/learn/learn';
import Library from './components/pages/library/library';
import Train from './components/pages/train/train';
import Navbar from './components/UI/navbar/navbar';


const WordsContext = createContext();

function App() {

  
  const [wordsArray, setWordsArray] = useState(JSON.parse(window.localStorage.getItem('words')) ? JSON.parse(window.localStorage.getItem('words')) : []);
  const [score, setScore] = useState(window.localStorage.getItem('score') ? window.localStorage.getItem('score') : 0);


  // useEffect(() => {
  //   return () => {
  //       window.localStorage.clear();
  //       window.localStorage.setItem(`words`, JSON.stringify(wordsArray));
  //   }
  // }, []);//почему не отрабатывает при перезагрузке????

  useEffect(() => {
      window.localStorage.clear();//разобраться с контекстом и менять в локал сторэдж только при выходе
      window.localStorage.setItem(`words`, JSON.stringify(wordsArray));
      window.localStorage.setItem(`score`, score);
    }, [wordsArray, score]);
    

  return (
    <WordsContext.Provider value={[[wordsArray, setWordsArray], [score, setScore]]} >
            <Router>
                <Fragment>
                    <Navbar/> 
                    <Routes>
                        <Route exact path='/' element={<Library/>} />
                        <Route exact path='/library' element={<Library/>} />
                        <Route exact path='/train' element={<Train module={''}/>} />
                        <Route exact path='/train/writing' element={<Train module={'writing'}/>} />
                        <Route exact path='/train/test' element={<Train module={'test'}/>} />
                        <Route exact path='/learn' element={<Learn/>}/>
                    </Routes>
                </Fragment>
            </Router>
    </WordsContext.Provider>
  );
}

export default App; 
export { WordsContext };
