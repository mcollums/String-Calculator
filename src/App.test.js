//Importing all packages needed for testing
import React from 'react';
import Enzyme, { configure, shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new EnzymeAdapter() });

//Importing the React Component we're testing.
import App from './App';

//Testing if the calculator container renders
describe('CalcContainer should render', () => {
    test('without error', () => {
        const wrapper = shallow(<App />);
        const appComponent = wrapper.find("[data-test='component-calculator-container']");
        expect(appComponent.length).toBe(1);
    });
});