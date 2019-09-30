import React, { Component } from "react";
import './calc-cont.css';
import Button from './Button'
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

// let customDelimiters = [",", "&"];

class CalculatorContainer extends Component {
    state = {
        string: "",
        result: "",
        message: ""
    };

    //This tracks any changes to the input box and adds it to the state.
    handleInputChange = (event) => {
        this.setState({
            string: event.target.value
        });
    };



    //This function seperates the string and adds them together.
    startAdd = () => {
        //check if the element is a number
        const isNum = n => isNaN(n) ? 0 : parseInt(n);
        //Splitting the string by commas
        let newArr = this.state.string.split(",");

        //Only will add two numbers at a time seperated by a comma
        if (newArr.length !== 2) {
            this.setState({
                message: "Please enter two items seperated by a comma."
            });
        } else {
            this.setState({
                message: "",
                result: newArr.reduce((a, b) =>
                isNum(a) + isNum(b))
            }); 
        }
    };


    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col id="titleCol">
                            <InputGroup onChange={(e) => { this.handleInputChange(e) }}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Your String Here</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" aria-label="With textarea" />
                                <Button 
                                    id="resultBtn" 
                                    handleClick={this.startAdd}
                                    message={"Get the Sum!"}
                                    type="submit">
                                </Button>
                            </InputGroup>
                            <p> {this.state.message} </p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <h1> {this.state.result} </h1>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default CalculatorContainer