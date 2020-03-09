import React from 'react';
import { shallow } from 'enzyme';
import HeaderComponent from './index';

describe('<HeaderComponent />', () => {
    const title = 'Hello!';
    it('render title in header component', () => {
        const wrapper = shallow(<HeaderComponent title={title} />);
        expect(wrapper.find('.header__title').text()).toBe(title);
    });
    it('click at the close element', () => {
        const onClose = jest.fn();

        const wrapper = shallow(
            <HeaderComponent onClose={onClose} title={title} />
        );
        const closeEl = wrapper.find('.header__close');
        closeEl.simulate('click');
        expect(onClose).toHaveBeenCalled();
    });
    it('click at the action element', () => {
        const onAction = jest.fn();

        const wrapper = shallow(
            <HeaderComponent onAction={onAction} title={title} />
        );
        const actionEl = wrapper.find('.header__action');
        actionEl.simulate('click');
        expect(onAction).toHaveBeenCalled();
    });
});
