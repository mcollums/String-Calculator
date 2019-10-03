import React, { Component } from "react";
import './CalcContainer.css';
import Button from './Button'
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

//Operator to see if input is a number, if not it's made into a 0
const isNum = n => isNaN(n) ? 0 : parseInt(n);

//Array of custom delimiters
let customDelimiters = [',', '\n'];

//TODO add a string that is the REGEX code for the // and \n

let chars = "-[]{}()*+?.,\\^$|#s";


class CalculatorContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            string: "",
            result: "",
            error: "",
            message: "",
            formula: ""
        };
    }


    //This tracks any changes to the input box and adds it to the state.
    handleInputChange = (event) => {
        this.setState({
            string: event.target.value
        });
    };

    handleSubmit = () => {
        //Clear any errors
        this.setState({
            error: "",
            message: ""
        })
        //If the string starts with the // we know they're going to make a new delimiter
        if (this.state.string.startsWith("//")) {
            this.handleDelimiter(this.state.string, (newString) => {
                //Use the callback to send string without the new delimiter
                this.makeNumArr(newString);
            });
        } else {
            this.makeNumArr(this.state.string);
        }
    }

    //Function takes out the delimiter, adds to array and sends string to startAdd()
    handleDelimiter = (string, cb) => {
        //Getting the value between // and \n 
        let newDel = string.split('//').pop().split('\\n')[0];

        //Seeing if the delimiter is already in the customDelimiter array
        if (!customDelimiters.includes(newDel || "\\" + newDel)) {
            //Seeing if the new delimiter is a character that needs an escape '\' 
            //new delimiter is pushed to the customDelimiter array
            if (chars.includes(newDel)) {
                customDelimiters.push("\\" + newDel);
            } else {
                customDelimiters.push(newDel);
            }
        }

        //Take out everything before the '\n' and send it to the startAdd function
        let newString = string.split('\\n')[1];
        cb(newString);
    }

    makeNumArr = (string) => {
        //Array to hold negative Numbers
        let negArr = [];

        //replacing '\n' with ',' because it's a pain
        let noNString = string.replace(/\\n/g, ',');

        //creating regex to add custom delimiters to the split method
        let splitArr = noNString.split(new RegExp(customDelimiters.join('|'), 'g'));

        //Filtering out values if over 1000 or negative
        for (let i = 0; i <= splitArr.length; i++) {
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
            //Error is thrown when there are negative numbers.
            // Having trouble running this with the unit tests so it's commented out for now.
            // throw new Error ('Negative Numbers not Accepted');
        } else {
            this.startAdd(splitArr);
        };
    }

    //This function seperates the string and adds them together as integers.
    startAdd = (arr) => {
        this.setState({
            message: "",
            error: "",
            result: arr.reduce((a, b) =>
                isNum(a) + isNum(b))
        });
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
                                    handleClick={this.handleSubmit}
                                    message={"Get the Sum!"}
                                    type="submit">
                                </Button>
                            </InputGroup>
                            <p className={`error ${errorClass}`} data-test="error-display"> Error: {this.state.message} </p>
                            <p data-test="formula-display"> </p>
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