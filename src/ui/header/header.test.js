import React from 'react';
// eslint-disable-next-line no-unused-vars
import setupTests from "../../setupTests";
import { shallow } from "enzyme";
import HeaderComponent from './index';

describe('<HeaderComponent />', () => {
    it('render title in header component', () => {
        const title = 'Hello!';

        const wrapper = shallow(
            <HeaderComponent
                title={title}
            />
        );
        expect(wrapper.find('.header__title').text()).toBe(title);
    });
    it('click at the close element', () => {
        const onClose = jest.fn();

        const wrapper = shallow(
            <HeaderComponent
                onClose={onClose}
            />
        );
        const closeEl = wrapper.find('.header__close');
        closeEl.simulate('click');
        expect(onClose).toHaveBeenCalled();
    });
    it('click at the action element', () => {
        const onAction = jest.fn();

        const wrapper = shallow(
            <HeaderComponent
                onAction={onAction}
            />
        );
        const actionEl = wrapper.find('.header__action');
        actionEl.simulate('click');
        expect(onAction).toHaveBeenCalled();
    });
});