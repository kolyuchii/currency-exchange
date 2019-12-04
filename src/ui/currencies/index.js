import React from 'react';
import './currencies.scss';
import PropTypes from 'prop-types';

const CurrenciesComponent = props => {
    const {
        currencies,
    } = props;
    return (
        <div>{currencies}</div>
    );
};

CurrenciesComponent.propTypes = {
    currencies: PropTypes.array,
};

export default CurrenciesComponent;