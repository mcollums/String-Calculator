import React from 'react';
import './App.css';
import CalculatorContainer from "./components/CalcContainer.js";
import { Row, Col } from 'react-bootstrap';


function App() {
  return (
    <div className="App">
      <Row id="infoRow" className="justify-content-md-center">
        <Col md="6" id="titleCol">
          <h1 className="text-left">String</h1>
          <h1 className="text-left">Calculator</h1>
        </Col>
        <Col md="6" id="instructionsCol">
          <h5 className="text-left"> How it works: </h5>
          <p className="text-left"> Our String Calculator accepts any positive string of numbers separated by '\n' , ' , ' or a custom delimiter. </p>
          <p className="text-left"> - To create a new delimiter, follow the guidline: //delimiter\nString e.g. //;\n2;5 will return 7 </p>
          <p className="text-left"> - Alternatively, create a new delimiter by surrounding it in square brackets.</p>
          <p className="text-left">   //[delimiter][delimiter]\nString e.g. //[*][!!][r9r]\\n11r9r22*33!!44 will return 110 </p>
          <p className="text-left"> - Numbers above 1000 will be ignored. Negative numbers are not supported.</p>
        </Col>
      </Row>

      <CalculatorContainer data-test="component-calculator-container"/>
      
    </div>
  );
}

export default App;
