import React from 'react';
import { CurrenciesContainer } from './index';
import { mount } from "enzyme";
import store from 'store';
import {Provider} from "react-redux";

describe('<CurrenciesContainer />', () => {
    const currencies = [
        [
            'EUR',
            'Euro'
        ],
        [
            'GBP',
            'British Pound Sterling'
        ],
        [
            'USD',
            'United States Dollar'
        ],
    ];
    it('render title in currencies container', () => {
        const wrapper = mount(
            <Provider store={store}>
                <CurrenciesContainer
                    currencies={currencies}
                />
            </Provider>
        );
        expect(wrapper.find('.header__title').text()).toBe('Currencies');
        expect(wrapper.find('.currency').length).toBe(currencies.length);
        expect(wrapper.find('.currency').at(0).find('.currency__description').text()).toBe(currencies[0][1]);
    });
});