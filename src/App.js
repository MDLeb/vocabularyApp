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

  const [level, setLevel] = useState((score >= 50) ? 1 : 0);

  if(level > 0 && score >= (level+1)*50) setLevel(level+1);
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
      if(level == 0 && score >= 50)
        setLevel(1);
      if(level > 0 && score >= level*50)
        setLevel(level+1);
    }, [wordsArray, score]);
    

  return (
    <WordsContext.Provider value={[[wordsArray, setWordsArray], [score, setScore]]} >
            <Router>
                <Fragment>
                    <Navbar level={level}/> 
                    <Routes>
                        <Route exact path='/' element={<Library />} />
                        <Route exact path='/library' element={<Library />} />
                        <Route exact path='/train' element={<Train module={''}/>} />
                        <Route exact path='/train/check' element={<Train module={'check'}/>} />
                        <Route exact path='/train/write' element={<Train module={'write'}/>} />
                        <Route exact path='/train/check-meaning' element={<Train module={'check-meaning'}/>} />
                        <Route exact path='/learn' element={<Learn/>}/>
                    </Routes>
                </Fragment>
            </Router>
    </WordsContext.Provider>
  );
}

export default App; 
export { WordsContext };
