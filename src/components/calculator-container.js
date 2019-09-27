import React, { Component } from "react";
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';

class calculatorContainer extends Component {
    state = {
        message: ""
    };

    handleClick = id => {
        console.log(id);
        if (this.state.clicked.indexOf(id) === -1) {
            this.setState({ clicked: this.state.clicked.concat(id) }, function () {
                console.log("Added to array " + this.state.clicked);
                this.handleIncrement();
            });
        } else {
            console.log("Already in the array " + this.state.clicked);
            let currentLosses = this.state.losses;
            this.setState({ losses: currentLosses + 1 })
            console.log("Score: " + this.state.losses);
            this.handleReset();
        }
    };

    handleReset = () => {
        this.setState({
            score: 0,
            message: "You Lose. Sad Sad Day.",
            clicked: []
        });
        this.handleShuffle();
    };


    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col id="titleCol">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>With textarea</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" aria-label="With textarea" />
                            </InputGroup>

                            <Button> This is a button </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default calculatorContainer