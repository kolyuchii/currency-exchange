import React from 'react';
import { mount } from 'enzyme';
import AppComponent from './App';
import store from 'store';
import { Provider } from 'react-redux';

describe('<AppComponent />', () => {
    const data = {
        page: <div>Hello!</div>,
        onClose: jest.fn(),
        onAction: jest.fn(),
        title: 'Application name',
    };
    let wrapper;
    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <AppComponent {...data} />
            </Provider>
        );
    });
    it('Render AppComponent title', () => {
        expect(wrapper.find('.header__title').text()).toBe(data.title);
    });
    it('Render AppComponent content', () => {
        expect(wrapper.find('.content').text()).toBe('Hello!');
    });
    it('AppComponent actions', () => {
        wrapper.find('.header__close').simulate('click');
        wrapper.find('.header__action').simulate('click');
        expect(data.onClose).toHaveBeenCalledTimes(1);
        expect(data.onAction).toHaveBeenCalledTimes(1);
    });
});
