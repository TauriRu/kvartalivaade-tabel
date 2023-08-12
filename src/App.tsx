import React, { useState } from 'react';
import Calendar from './components/Calendar/Calendar';
import './App.css';

function App() {
  const [currentQuarter, setCurrentQuarter] = useState(1);
  const currentYear = new Date().getFullYear();
  const [year] = useState(currentYear);

  const handleNextQuarter = () => {
    if (currentQuarter < 4) {
      setCurrentQuarter(currentQuarter + 1);
    }
  };

  const handlePreviousQuarter = () => {
    if (currentQuarter > 1) {
      setCurrentQuarter(currentQuarter - 1);
    }
  };

  return (
    <div className="App">
      <div className='container'>
        <div className='quarterButtons'>
          <button className="button" onClick={handlePreviousQuarter}>Previous</button>
          <h2>Quartal {currentQuarter}, {year}</h2>
          <button className="button" onClick={handleNextQuarter}>Next</button>
        </div>
        <Calendar currentQuarter={currentQuarter} />
      </div>
    </div>
  );
}

export default App;
