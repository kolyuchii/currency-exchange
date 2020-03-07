import React from 'react';
import { mount } from 'enzyme';

import LoadingComponent from './Loading';
import CurrencyComponent from './Currency';

describe('<LoadingComponent />', () => {
    it('render normal state', () => {
        const wrapper = mount(<LoadingComponent />);
        expect(wrapper.find('.loading').text()).toBe('Loading...');
    });
    it('render error state', () => {
        const networkErrorMessage = 'error';
        const wrapper = mount(
            <LoadingComponent networkErrorMessage={networkErrorMessage} />
        );
        expect(wrapper.find('.error__text').text()).toBe(networkErrorMessage);
    });
});
describe('<CurrencyComponent />', () => {
    it('render CurrencyComponent', () => {
        const onClick = jest.fn();
        const data = {
            isActive: true,
            id: 'USD',
            description: 'description',
            onClick,
        };
        const wrapper = mount(<CurrencyComponent {...data} />);

        expect(wrapper.find('.currency__name').text()).toBe(data.id);
        expect(wrapper.find('.currency__description').text()).toBe(
            data.description
        );

        wrapper.find('.currency').simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
