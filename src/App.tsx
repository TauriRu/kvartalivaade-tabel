import React, { useState } from 'react';
import Calendar from './components/Calendar/Calendar';
import './App.css';

function App() {
  const [currentQuarter, setCurrentQuarter] = useState(1);
  const currentYear = new Date().getFullYear();
  const [year] = useState(currentYear);

  const handleNextQuarter = () => {
    setCurrentQuarter(currentQuarter + 1);
  };

  const handlePreviousQuarter = () => {
    setCurrentQuarter(currentQuarter - 1);
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
