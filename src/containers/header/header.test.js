import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import HeaderContainer from './index';

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('can render and update a counter', () => {
    // Test first render and componentDidMount
    act(() => {
        ReactDOM.render(<HeaderContainer
            title="Exchange"
        />, container);
    });
    const title = container.querySelector('.header__title');
    expect(title.textContent).toBe('Exchange');
});
