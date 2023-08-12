import React, { useState } from 'react';
import Calendar from './components/Calendar/Calendar';
import './App.css';

function App() {
  const [currentQuarter, setCurrentQuarter] = useState(1);

  const handleNextQuarter = () => {
    setCurrentQuarter(currentQuarter + 1);
  };

  const handlePreviousQuarter = () => {
    setCurrentQuarter(currentQuarter - 1);
  };

  return (
    <div className="App">
      <h1>Ülesannete Kvartalivaade</h1>
      <button onClick={handlePreviousQuarter}>Eelmine Kvartal</button>
      <button onClick={handleNextQuarter}>Järgmine Kvartal</button>
      <Calendar currentQuarter={currentQuarter} />
    </div>
  );
}

export default App;
