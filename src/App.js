import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Learn from './components/learn/learn';
import Library from './components/library/library';
import Train from './components/train/train';
import Navbar from './components/navbar/navbar';

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar/> 
        <Routes>
          <Route exact path='/library' element={<Library/>} />
          <Route exact path='/train' element={<Train/>} />
          <Route exact path='/learn' element={<Learn/>}/>
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
