import React, {useState, Fragment, createContext, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Learn from './components/learn/learn';
import Library from './components/library/library';
import Train from './components/train/train';
import Navbar from './components/navbar/navbar';


const WordsContext = createContext();//**

function App() {

  
  const [wordsArray, setWordsArray] = useState(JSON.parse(window.localStorage.getItem('words')) ? JSON.parse(window.localStorage.getItem('words')) : []);

  // useEffect(() => {

  //   return () => {
  //       window.localStorage.clear();
  //       window.localStorage.setItem(`words`, JSON.stringify(wordsArray));
  //   }
  // }, []);//почему не отрабатывает при перезагрузке????

  useEffect(() => {
      window.localStorage.clear();//разобраться с контекстом и менять в локал сторэдж только при выходе
      window.localStorage.setItem(`words`, JSON.stringify(wordsArray));
    }, [wordsArray]);
    

  return (
    <WordsContext.Provider value={[wordsArray, setWordsArray]} >
            <Router>
                <Fragment>
                    <Navbar/> 
                    <Routes>
                        <Route exact path='/' element={<Library/>} />
                        <Route exact path='/library' element={<Library/>} />
                        <Route exact path='/train' element={<Train/>} />
                        <Route exact path='/learn' element={<Learn/>}/>
                    </Routes>
                </Fragment>
            </Router>
    </WordsContext.Provider>
  );
}

export default App; 
export { WordsContext };
