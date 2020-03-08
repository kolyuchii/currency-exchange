import React from 'react';
import { mount } from 'enzyme';
import CurrenciesComponent from './index';
import CurrencyComponent from 'ui/components/Currency';

describe('<CurrenciesComponent />', () => {
    it('render CurrenciesComponent', () => {
        const onClick = jest.fn();
        const data = [
            {
                isActive: true,
                id: 'USD',
                description: 'description',
                key: 1,
                onClick,
            },
        ];
        const currencies = data.map(item => {
            return <CurrencyComponent {...item} />;
        });
        const wrapper = mount(<CurrenciesComponent currencies={currencies} />);

        expect(wrapper.find('.currency').length).toBe(data.length);

        wrapper
            .find('.currency')
            .at(0)
            .simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(wrapper.find('.currency__name').text()).toBe(data[0].id);
        expect(wrapper.find('.currency__description').text()).toBe(
            data[0].description
        );
    });
});
