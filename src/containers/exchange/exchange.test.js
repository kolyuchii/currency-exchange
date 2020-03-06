import React from 'react';
// eslint-disable-next-line no-unused-vars
import setupTests from "../../setupTests";
import store from 'store';
import {Provider} from "react-redux";
import ExchangeContainer from './index';
import getCurrencySign from './get-currency-sign';
import parseValue from './parse-value';
import { mount } from 'enzyme';
import {
    POCKETS,
} from 'config';
import {SET_HISTORY_RATES} from "../../store/history";
import {SET_RATES} from "../../store/exchange";

describe('getCurrencySign', () => {
    it('get currency value', () => {
        const sign = 'GBP';
        const value = 10;
        expect(getCurrencySign(sign, value)).toBe("£10");
    });
});
describe('parseValue', () => {
    it('parse value', () => {
        expect(parseValue(10)).toBe('10');
        expect(parseValue(10.25463)).toBe('10.25');
        expect(parseValue('dfd10')).toBe('10');
    });
});

describe('Exchange Component', () => {
    let wrapper = null;
    const rate = 0.2323;
    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <ExchangeContainer
                    currencyFrom="GBP"
                    currencyTo="EUR"
                    exchangeRates={[1]}
                    pockets={POCKETS}
                />
            </Provider>
        );
        store.dispatch({
            type: SET_RATES,
            exchangeRates: {
                'EUR': rate
            },
        });
    });
    it('Title', () => {
        expect(wrapper.find('.header__title').text()).toBe('Exchange');
    });
    it('Render inputs', () => {
        expect(wrapper.find('.exchange__slot_value').length).toBe(2);
    });
    it('Exchange button', () => {
        expect(wrapper.find('.exchange__button').length).toBe(1);
        expect(wrapper.find('.exchange__button').render().attr('disabled')).toBe('disabled');
    });
    it('Render currency rate bubble', () => {
        expect(wrapper.find('.exchange__actions_currency-rate').length).toBe(1);
        expect(wrapper.find('.exchange__actions_currency-rate').text()).toBe(`£1 = €${rate}`);
    });
    it('Render currency rate bubble', () => {
        expect(wrapper.find('.exchange__slot_currency').length).toBe(2);
        expect(wrapper.find('.exchange__slot_currency').at(0).text()).toBe('GBP');
        expect(wrapper.find('.exchange__slot_currency').at(1).text()).toBe('EUR');
    });
});
