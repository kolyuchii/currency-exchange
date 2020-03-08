import React from 'react';
import { mount } from 'enzyme';
import AppComponent from './index';
import HeaderComponent from 'ui/header';

describe('<AppComponent />', () => {
    const data = {
        page: <div>Hello!</div>,
        header: {
            onClose: jest.fn(),
            onAction: jest.fn(),
            title: 'Application name',
        },
    };
    let wrapper;
    beforeEach(() => {
        wrapper = mount(
            <AppComponent
                header={<HeaderComponent {...data.header} />}
                page={data.page}
            />
        );
    });
    it('Render AppComponent title', () => {
        expect(wrapper.find('.header__title').text()).toBe(data.header.title);
    });
    it('Render AppComponent content', () => {
        expect(wrapper.find('.content').text()).toBe('Hello!');
    });
    it('AppComponent actions', () => {
        wrapper.find('.header__close').simulate('click');
        wrapper.find('.header__action').simulate('click');
        expect(data.header.onClose).toHaveBeenCalledTimes(1);
        expect(data.header.onAction).toHaveBeenCalledTimes(1);
    });
});
