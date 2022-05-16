
import './App.css';

import { Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import TasksWrapper from './components/TasksWrapper';

import About from './components/About';

const App = () => {
  const [showAddButton, setshowAddButton] = useState(false)

  return (
    <div className="container">
      <Header onAdd={() => { setshowAddButton(!showAddButton) }} showAdd={showAddButton} />
      <Routes>
        <Route path='/' element={<TasksWrapper showButton={showAddButton} />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>

  );
}

export default App;
