// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import CalculatorService from './CalculaterService';

const calculatorService = new CalculatorService();

const CalculatorButton = ({ label, onClick }) => (
  <button onClick={() => onClick(label)}>{label}</button>
);

function App() {
  const [display, setDisplay] = useState(calculatorService.display);

  const updateDisplay = () => {
    setDisplay(calculatorService.display);
  };

  const [currentAnswer, setCurrentAnswer] = useState(calculatorService.getCurrentAnswer());

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleKeyPress = (event) => {
    const key = event.key;
    if (/^[0-9+\-*/.=C]$/.test(key) || key === 'Enter') {
      calculatorService.handleButtonClick(key);
      updateDisplay();
      setCurrentAnswer(calculatorService.getCurrentAnswer());
    } else if (key === 'Backspace') {
      calculatorService.handleButtonClick('C');
      updateDisplay();
      setCurrentAnswer(calculatorService.getCurrentAnswer());
    }
  };

  const handleButtonClick = (value) => {
    calculatorService.handleButtonClick(value);
    updateDisplay();
    setCurrentAnswer(calculatorService.getCurrentAnswer());
  };

  useEffect(() => {
    const updateInterval = setInterval(() => {
      updateDisplay();
      setCurrentAnswer(calculatorService.getCurrentAnswer());
    }, 100);
    return () => clearInterval(updateInterval);
  }, []);

  return (
    <div className="calculator">
            <input type="text" value={display} readOnly />
      <div className="current-answer">{currentAnswer||0}</div>

      <div className="buttons">
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'].map((value) => (
          <CalculatorButton key={value} label={value} onClick={handleButtonClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
