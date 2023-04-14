import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import KanbanBoard from './Compoents/KbBoard';
import Home from './Compoents/Home';


const App = () => {
  return (
    <>

    <Router>
      <Routes>
        <Route path='/board' element={<kbBoard/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </Router>

    </>
  )
}

export default App