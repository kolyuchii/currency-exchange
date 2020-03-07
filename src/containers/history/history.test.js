import React from 'react';
import store from 'store';
import {Provider} from "react-redux";
import HistoryContainer from './index';
import { mount } from 'enzyme';
import {
    SET_HISTORY_RATES
} from 'store/history';

describe('<HistoryContainer/>', () => {
    let wrapper = null;
    beforeEach(() => {
        const data = {
            match: {
                params: {
                    to: 'EUR',
                    from: 'GPB',
                }
            },
            historyRates: {},
        };
        wrapper = mount(
            <Provider store={store}>
                <HistoryContainer
                    {...data}
                />
            </Provider>
        );
        store.dispatch({
            type: SET_HISTORY_RATES,
            historyRates: {
                'EUR': 0.2323
            },
        });
    });
    it('Title', () => {
        expect(wrapper.find('.header__title').text()).toBe('History');
    });
    it('Number of buttons', () => {
        expect(wrapper.find('.history__steps-item').length).toBe(5);
    });
    it('Render chart', () => {
        expect(wrapper.find('#myChart').length).toBe(1);
    });
});
