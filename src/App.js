import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import KanbanBoard from './Compoents/Kanbanboard';
import Home from './Compoents/Home';


const App = () => {
  return (
    <>

    <Router>
      <Routes>
        <Route path='/board' element={<KanbanBoard/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>

    </>
  )
}

export default App