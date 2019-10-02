import React from 'react';
import './App.css';
import CalculatorContainer from "./components/CalcContainer.js";
import { Row, Col } from 'react-bootstrap';


function App() {
  return (
    <div className="App">
      <Row id="infoRow" className="justify-content-md-center">
        <Col id="titleCol">
          <h1 className="text-center">String Calculator</h1>
        </Col>
        <Col id="instructionsCol">
          <h5 className="text-left"> How it works: </h5>
          <p className="text-left"> Our String Calculator accepts any positive string of numbers separated by '\n' or ' , '. </p>
        </Col>
      </Row>

      <CalculatorContainer data-test="component-calculator-container"/>
      
    </div>
  );
}

export default App;
