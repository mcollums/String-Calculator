//Importing all packages needed for testing
import React from 'react';
import Enzyme, { configure, shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new EnzymeAdapter() });

//Importing the React Component we're testing.
import CalculatorContainer from './CalcContainer';

//Create ShallowWrapper for the App Content
const setup = (props={}, state=null) => {
    const wrapper = shallow(<CalculatorContainer {...props}/>);
    if (state) wrapper.setState(state);
    return wrapper;
}

//INITIAL RENDER TESTS
describe('Components should render without error', () => {
    test('Submit Button', () => {
        const wrapper = setup();
        const submitButton = wrapper.find("[data-test='submit-button']");
        expect(submitButton.length).toBe(1);
    });
    test('Input Box', () => {
        const wrapper = setup();        
        const inputBox = wrapper.find("[data-test='input-group']");
        expect(inputBox.length).toBe(1);
    });
    test('Result Display', () => {
        const wrapper = setup();
        const resultDisplay = wrapper.find("[data-test='result-display']");
        expect(resultDisplay.length).toBe(1);
    });
    test('Error Display', () => {
        const wrapper = setup();
        const errorDisplay = wrapper.find("[data-test='error-display']");
        expect(errorDisplay.length).toBe(1);
    });
});

//INITIAL STATE TESTS
describe('Starting State should be blank', () => {
    test('start out blank', () => {
        const wrapper = setup();
        const initialResultState = wrapper.state('result');
        expect(initialResultState).toBe("");
    });
    test('start out blank', () => {
        const wrapper = setup();
        const initialStringState = wrapper.state('string');
        expect(initialStringState).toBe("");
    });
});


//define empty mock function 
// describe('startAdd', () => {
//     test('clicking submit button should display results', () => {
//         const numString = "1,2";
//         const wrapper = setup(null, { numString });

//         const submitButton = wrapper.find("[data-test='submit-button']");
//         submitButton.simulate('click');
//         wrapper.update();

//         // find display and test value
//         const resultDisplay = wrapper.find("[data-test='result-display']");
//         expect(resultDisplay.text()).toContain(3);
//     });
// });

