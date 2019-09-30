//Importing all packages needed for testing
import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

//Importing the React Component we're testing.
import CalculatorContainer from './calculator-container';




describe('First React component test with Enzyme', () => {
    it('renders without crashing', () => {
        shallow(<CalculatorContainer />);
    });
});

//define empty mock function 
describe('Test Result Button', () => {
    it('button click should call startAdd Function', () => {
        //defining empty mock function
        const mockCB = jest.fn();

        //replace actual function with mock function
        const component = mount(<CalculatorContainer />);
        //Find button and simluate a click
        const submitBtn = component.find('#resultBtn').simulate('click');
        expect(mockCB.mock.calls.length).toEqual(1);


    });
});