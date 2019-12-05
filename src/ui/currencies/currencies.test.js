import React from 'react';
import ReactDOM from 'react-dom';
import CurrenciesComponent from './index';
import { act } from 'react-dom/test-utils';

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});
describe('<CurrenciesComponent />', () => {
    it('render CurrenciesComponent', () => {
        const currencies = [
            <div key="1" className="currency"/>,
            <div key="2" className="currency"/>,
            <div key="3" className="currency"/>,
            <div key="4" className="currency"/>,
        ];
        act(() => {
            ReactDOM.render(<CurrenciesComponent currencies={currencies} />, container);
        });
        expect(container.querySelectorAll('.currency').length).toBe(4);
    });
});
