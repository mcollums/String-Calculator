import React, { Component } from "react";
import './CalcContainer.css';
import Button from './Button'
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

//Operator to see if input is a number, if not it's made into a 0
const isNum = n => isNaN(n) ? 0 : parseInt(n);

//Array of custom delimiters
let customDelimiters = [',' , '\n' , '&'];


class CalculatorContainer extends Component {
    constructor(props) {
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


    //This function seperates the string and adds them together as integers.
    startAdd = () => {
        //Array to hold negative Numbers
        let negArr = [];
        //replacing '\n' with ',' because it's a pain
        let noNString = this.state.string.replace('\\n', ',');
        //creating regex to add custom delimiters to the split method
        let splitArr = noNString.split(new RegExp(customDelimiters.join('|'), 'g'));

        //Filtering out values if over 1000 or negative
        for(let i = 0; i <= splitArr.length; i++) {
            if (splitArr[i] > 1000) {
                splitArr[i] = 0
            }
            if (Math.sign(splitArr[i]) === -1) {
                negArr.push(splitArr[i]);
            }
        }

        //If there are negative numbers, throw user an error. 
        //Otherwise, add the array together
        if (negArr.length > 0) {
            this.setState({
                message: `Please change the following integers to positive values: ${negArr} .`,
                error: "true"
            });
            // throw new Error ('Negative Numbers not Accepted');
        } else {
            this.setState({
                message: "",
                error: "",
                result: splitArr.reduce((a, b) =>
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
                                onChange={(e) => { this.handleInputChange(e) }}
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