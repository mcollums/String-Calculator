import React from 'react';
import './App.css';
import CalculatorContainer from "./components/calculator-container.js";
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
          <p className="text-left"> Our String Calculator only accepts two numbers at a time, seperated by a comma. </p>
        </Col>
      </Row>

      <CalculatorContainer />
      
    </div>
  );
}

export default App;
