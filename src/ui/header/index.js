import React from 'react';
import PropTypes from 'prop-types';
import './header.scss';

const HeaderComponent = props => {
    return (
        <header className="header">
            <div
                className="header__close icon__close"
                onClick={props.onClose}
            />
            <h4 className="header__title">{props.title}</h4>
            <div
                className="header__action icon__auto"
                onClick={props.onAction}
            />
        </header>
    );
};

HeaderComponent.propTypes = {
    onClose: PropTypes.func,
    onAction: PropTypes.func,
    title: PropTypes.string,
};

export default HeaderComponent;
