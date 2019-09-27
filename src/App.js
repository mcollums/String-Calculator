import React from 'react';
import './App.css';
import CalculatorContainer from "./components/calculator-container.js";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h5 className="text-center">String Calculator</h5>
        <h5 className="text-center"> How it works: </h5>
        <p className="text-center"> ... </p>
        <CalculatorContainer />
      </header>
    </div>
  );
}

export default App;
