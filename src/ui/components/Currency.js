import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CurrencyComponent = props => {
    const currency = classnames({
        'is-active': props.isActive,
        currency: true,
    });
    const flag = classnames({
        'currency-flag': true,
        [`currency-flag-${props.id.toLowerCase()}`]: true,
    });
    return (
        <div onClick={props.onClick} id={props.id} className={currency}>
            <div className={flag}></div>
            <div className="currency__info">
                <h4 className="currency__name">{props.id}</h4>
                <span className="currency__description">
                    {props.description}
                </span>
            </div>
        </div>
    );
};

CurrencyComponent.propTypes = {
    onClick: PropTypes.func,
    id: PropTypes.string,
    description: PropTypes.string,
    isActive: PropTypes.bool,
};

export default CurrencyComponent;
