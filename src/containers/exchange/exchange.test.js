import React from 'react';
// eslint-disable-next-line no-unused-vars
import setupTests from "../../setupTests";
import store from 'store';
import {Provider} from "react-redux";
import ExchangeContainer from './index';
import { mount } from 'enzyme';
import {
    POCKETS,
} from 'config';

describe('Exchange Component', () => {
    let wrapper = null;
    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <ExchangeContainer
                    currencyFrom="GPB"
                    currencyTo="EUR"
                    exchangeRates={[1]}
                    pockets={POCKETS}
                />
            </Provider>
        );
    });
    it('Title', () => {
        expect(wrapper.find('.header__title').text()).toBe('Exchange');
    });
});
