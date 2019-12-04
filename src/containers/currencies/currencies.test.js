import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import CurrenciesContainer from './index';
import store from "store";
import {Provider} from "react-redux";

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});
describe('<CurrenciesContainer />', () => {
    it('render title in currencies container', () => {
        act(() => {
            ReactDOM.render(<Provider store={store}>
                <CurrenciesContainer />
            </Provider>, container);
        });
        expect(container.querySelector('.header__title').textContent).toBe('Currencies');
    });
    it('render items currencies container', () => {
        act(() => {
            ReactDOM.render(<Provider store={store}>
                <CurrenciesContainer />
            </Provider>, container);
        });
        expect(container.querySelectorAll('.currency').length).toBe(0);
    });
});