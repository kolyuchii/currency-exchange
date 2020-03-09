import React from 'react';
import { CurrenciesContainer } from './index';
import { mount } from 'enzyme';
import store from 'store';
import { Provider } from 'react-redux';

describe('<CurrenciesContainer />', () => {
    const currencies = [
        ['EUR', 'Euro'],
        ['GBP', 'British Pound Sterling'],
        ['USD', 'United States Dollar'],
        ['AED', 'United Arab Emirates Dirham'],
    ];
    let wrapper;
    let currencyItems;
    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <CurrenciesContainer currencies={currencies} />
            </Provider>
        );
        currencyItems = wrapper.find('.currency');
    });
    it('render title in currencies container', () => {
        expect(wrapper.find('.header__title').text()).toBe('Currencies');
        expect(currencyItems.length).toBe(currencies.length);
        expect(
            currencyItems
                .at(0)
                .find('.currency__description')
                .text()
        ).toBe(currencies[0][1]);
    });
    it('Only currencies from my pocket should be marked', () => {
        expect(
            currencyItems
                .at(0)
                .render()
                .attr('class')
                .indexOf('is-active') > -1
        ).toBe(true);
        expect(
            currencyItems
                .at(3)
                .render()
                .attr('class')
                .indexOf('is-active') > -1
        ).toBe(false);
    });
});
