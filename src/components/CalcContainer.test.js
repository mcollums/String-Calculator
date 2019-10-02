//Importing all packages needed for testing
import React from 'react';
import Enzyme, { configure, shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new EnzymeAdapter() });

//Importing the React Component we're testing.
import CalculatorContainer from './CalcContainer';

//Create ShallowWrapper for the App Content
const setup = (props={}, state=null) => {
    const wrapper = mount(<CalculatorContainer {...props}/>);
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


//FUNCTION TESTS
describe('startAdd', () => {
    
    test('String "1,2,3,4,5,6" should display 21', () => {
        const string = "1,2,3,4,5,6";
        const wrapper = setup(null, { string });

        const submitButton = wrapper.find("[data-test='submit-button']");
        submitButton.simulate('click');
        wrapper.update();

        // find display and test value
        const resultDisplay = wrapper.find("[data-test='result-display']");
        expect(resultDisplay.text()).toContain(21);
    });

    test('String "cat,4,4,5,6,7,frog" should display 26', () => {
        const string = "cat,4,4,5,6,7,frog";
        const wrapper = setup(null, { string });

        const submitButton = wrapper.find("[data-test='submit-button']");
        submitButton.simulate('click');
        wrapper.update();

        // find display and test value
        const resultDisplay = wrapper.find("[data-test='result-display']");
        expect(resultDisplay.text()).toContain(26);
    });

    test('Multiple items in the string should not throw an error', () => {
        const string = "1,2,3,cat";
        const wrapper = setup(null, { string });

        const submitButton = wrapper.find("[data-test='submit-button']");
        submitButton.simulate('click');
        wrapper.update();

        // find error display see if the class contains hidden
        const errorDisplay = wrapper.find("[data-test='error-display']");
        const errorHasHiddenClass = errorDisplay.hasClass('hidden');
        expect(errorHasHiddenClass).toBe(true);
    });

    test('Both "," and "\n" work as delimiters', () => {
        const string = "1,3\n4,4,5,6\ncat";
        const wrapper = setup(null, { string });

        const submitButton = wrapper.find("[data-test='submit-button']");
        submitButton.simulate('click');
        wrapper.update();

        // find display and test value
        const resultDisplay = wrapper.find("[data-test='result-display']");
        expect(resultDisplay.text()).toContain(23);
    });
});

