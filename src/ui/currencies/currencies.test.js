import React from 'react';
// eslint-disable-next-line no-unused-vars
import setupTests from "../../setupTests";
import { shallow, mount } from "enzyme";
import CurrenciesComponent from './index';
import CurrencyComponent from 'ui/components/Currency';

describe('<CurrenciesComponent />', () => {
    it('render CurrenciesComponent', () => {
        const data = [
            {
                isActive: true,
                id: 'USD',
                description: 'description',
                key: 1,
            }
        ];
        const currencies = data.map(item => {
            return (
                <CurrencyComponent {...item} />
            )
        });
        const wrapper = mount(
            <CurrenciesComponent
                currencies={currencies}
            />
        );


        expect(wrapper.find('.currency').length).toBe(data.length);
        expect(wrapper.find('.currency__name').text()).toBe(data[0].id);
        expect(wrapper.find('.currency__description').text()).toBe(data[0].description);
    });
});
