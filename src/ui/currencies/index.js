import React from 'react';
import './currencies.scss';
import PropTypes from 'prop-types';

const CurrenciesComponent = props => {
    const { currencies } = props;
    return <div className="currencies">{currencies}</div>;
};

CurrenciesComponent.propTypes = {
    currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CurrenciesComponent;
