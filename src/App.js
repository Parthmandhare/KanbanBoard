import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import KanbanBoard from './Compoents/KbBoard';
import Home from './Compoents/Home';


const App = () => {
  return (
    <>
    {/* Routes */}
    <Router>
      <Routes>
        <Route path='/' element={<KanbanBoard/>}/>
      </Routes>
    </Router>

    </>
  )
}

export default App