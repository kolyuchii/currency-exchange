import React from 'react';
// eslint-disable-next-line no-unused-vars
import setupTests from "../../setupTests";
import { mount } from "enzyme";
import HistoryComponent from './index';

describe('<HistoryComponent />', () => {
    const periods = [
        {
            id: 1,
            isActive: true,
        },
        {
            id: 2,
        },
        {
            id: 3,
        },
    ];

    it('render history steps', () => {
        const wrapper = mount(
            <HistoryComponent
                periods={periods}
            />
        );
        const stepEls = wrapper.find('.history__steps-item');
        expect(stepEls.length).toBe(periods.length);
    });

    it('click at the history step', () => {
        const onClick = jest.fn();
        const wrapper = mount(
            <HistoryComponent
                periods={periods}
                onClick={onClick}
            />
        );
        const stepEls = wrapper.find('.history__steps-item');
        stepEls.at(0).simulate('click');
        stepEls.at(1).simulate('click');
        expect(onClick).toHaveBeenCalled();
        expect(stepEls.at(0).render().hasClass('is-active')).toBe(true);
    });
});