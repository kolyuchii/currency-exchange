import React from 'react';
// eslint-disable-next-line no-unused-vars
import setupTests from "../../setupTests";
import ExchangeComponent from './index';
import { mount } from 'enzyme';

describe('<ExchangeComponent />', () => {
    let wrapper = null;
    const onSubmit = jest.fn();
    const onSwap = jest.fn();
    const onRateClick = jest.fn();
    const onChangeCurrency = jest.fn();
    const onValueFromChanged = jest.fn();
    const onValueToChanged = jest.fn();
    const setBalanceFrom = jest.fn();
    const setBalanceTo = jest.fn();

    const data = {
        rateFrom: '1.2323',
        currencyFrom: 'GPB',
        balanceFrom: '1000',
        rateTo: '0.4344',
        balanceTo: '500',
        currencyTo: 'USD',
        exchangeRatesError: 'rrr',
        valueFrom: '10',
        valueTo: '15.34',

        onSubmit,
        onSwap,
        onRateClick,
        onChangeCurrency,
        onValueFromChanged,
        onValueToChanged,
        setBalanceFrom,
        setBalanceTo,
    };
    beforeEach(() => {
        wrapper = mount(
            <ExchangeComponent
                {...data}
            />
        );
    });
    it('input fields', () => {
        expect(wrapper.find('.exchange__slot_value').at(0).render().attr('value')).toBe(data.valueFrom);
        expect(wrapper.find('.exchange__slot_value').at(1).render().attr('value')).toBe(data.valueTo);
    });
    it('balance fields', () => {
        expect(wrapper.find('.exchange__slot_balance').at(0).text()).toBe(`Balance ${data.balanceFrom}`);
        expect(wrapper.find('.exchange__slot_balance').at(1).text()).toBe(`Balance ${data.balanceTo}`);
    });
    it('rate field', () => {
        expect(wrapper.find('.exchange__actions_currency-rate').text()).toBe(`${data.rateFrom} = ${data.rateTo}`);
    });
    it('currency fields', () => {
        expect(wrapper.find('.exchange__slot_currency').at(0).text()).toBe(data.currencyFrom);
        expect(wrapper.find('.exchange__slot_currency').at(1).text()).toBe(data.currencyTo);
    });
    it('exchange error', () => {
        expect(wrapper.find('.exchange__error').text()).toBe(data.exchangeRatesError);
    });

    it('onSubmit', () => {
        wrapper.find('.exchange').simulate('submit');
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });
    it('onSwap', () => {
        wrapper.find('.exchange__actions_swap').simulate('click');
        expect(onSwap).toHaveBeenCalledTimes(1);
    });
    it('onRateClick', () => {
        wrapper.find('.exchange__actions_currency-rate').simulate('click');
        expect(onRateClick).toHaveBeenCalledTimes(1);
    });
    it('onChangeCurrency', () => {
        wrapper.find('.exchange__slot_currency').at(0).simulate('click');
        expect(onChangeCurrency).toHaveBeenCalledTimes(1);
    });
    it('onValueFromChanged', () => {
        wrapper.find('.exchange__slot_value').at(0).simulate('change');
        expect(onValueFromChanged).toHaveBeenCalledTimes(1);
    });
    it('onValueToChanged', () => {
        wrapper.find('.exchange__slot_value').at(1).simulate('change');
        expect(onValueToChanged).toHaveBeenCalledTimes(1);
    });
    it('setBalanceFrom', () => {
        wrapper.find('.exchange__slot_balance').at(0).simulate('click');
        expect(setBalanceFrom).toHaveBeenCalledTimes(1);
    });
    it('setBalanceTo', () => {
        wrapper.find('.exchange__slot_balance').at(1).simulate('click');
        expect(setBalanceTo).toHaveBeenCalledTimes(1);
    });
});
