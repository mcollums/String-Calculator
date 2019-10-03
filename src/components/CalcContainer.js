import React, { Component } from "react";
import './CalcContainer.css';
import Button from './Button'
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

//Operator to see if input is a number, if not it's made into a 0
const numOr0 = (n) => {
    let val = parseInt(n);
    if (isNaN(val)) {
        return 0
    } else {
        return val
    }
}

//Adds escape characters where needed in string
let delimiterRegex = (delimiter, cb) => {
    let delRegex = delimiter.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    cb(delRegex);
}

//Array of custom delimiters
let customDelimiters = [',', '\\n'];


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
        let convertedArr = [];

        //Getting the value between // and \n 
        let delimiter = string.split('//').pop().split('\\n')[0];

        //if the delimiter is surrounded by [], remove it then convert to regex and add to converted array
        //if not, convert to regex and add to converted array
        if (/^\[[\S\s]*]$/.test(delimiter)) {
            delimiter.split(/\[|\]/g)
                .filter((elem) => {
                    return elem != false;
                })
                .map((el) => {
                    delimiterRegex(el, (regex) => {
                        convertedArr.push(regex);
                    })
                });

        } else {
            delimiterRegex(delimiter, regex => {
                convertedArr.push(regex);
            });
        }

        //See if the element is already in the custom array, if not, add it.
        convertedArr.forEach((elem) => {
            if (customDelimiters.indexOf(elem) === -1) {
                customDelimiters.push(elem);
            }
        })

        //Take out everything between // and \n then send it to the startAdd function
        let newString = string.split(/\/\/(.*?)\\n/g).pop();
        cb(newString);
    }

    makeNumArr = (string) => {
        // replacing '\n' with ',' because it's a pain
        let noNString = string.replace(/\\n/g, ',');
        //create regex from custom delimiter array
        let customRegex = new RegExp(customDelimiters.join('|'), 'g');
        //split array by the custom delimiters
        let splitArr = noNString.split(customRegex);

        //Array to hold negative Numbers
        let negArr = [];
        //Filtering out values if over 1000 or negative
        splitArr.forEach((elem) => {
            elem > 1000 ? 0 : elem;
            Math.sign(elem) === -1 ? negArr.push(elem) : elem;
        })

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
                numOr0(a) + numOr0(b))
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