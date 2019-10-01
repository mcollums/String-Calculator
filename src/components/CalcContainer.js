import React, { Component } from "react";
import './CalcContainer.css';
import Button from './Button'
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

// let customDelimiters = [",", "&"];

class CalculatorContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            string: "",
            result: "",
            error: "",
            message: ""
        };
    }
 

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
                error: "true",
                message: "Please enter two items seperated by a comma."
            });
        } else {
            this.setState({
                message: "",
                error: "",
                result: newArr.reduce((a, b) =>
                isNum(a) + isNum(b))
            }); 
        }
    };


    render() {
        // determine whether error is hidden based on state
        const errorClass = this.state.error ? '' : 'hidden';

        return (
            <div>
                <Container>
                    <Row>
                        <Col id="titleCol">
                            <InputGroup 
                                onChange={(e) => {this.handleInputChange(e)}}
                                data-test="input-group"
                                >
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Your String Here</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" aria-label="With textarea" />
                                <Button 
                                    data-test="submit-button"
                                    id="submitBtn" 
                                    handleClick={this.startAdd}
                                    message={"Get the Sum!"}
                                    type="submit">
                                </Button>
                            </InputGroup>
                            <p className={`error ${errorClass}`} data-test="error-display"> Error: {this.state.message} </p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <h1 data-test="result-display"> {this.state.result} </h1>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default CalculatorContainer