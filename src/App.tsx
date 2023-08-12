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
      <button onClick={handlePreviousQuarter}>Previous</button>
      <h1>Quartal {currentQuarter} {year}</h1>
      <button onClick={handleNextQuarter}>Next</button>
      <Calendar currentQuarter={currentQuarter} />
    </div>
  );
}

export default App;
