import React from 'react';
import './currencies.scss';

interface CurrenciesProps {
    currencies: React.ReactNode;
}

const CurrenciesComponent: React.FunctionComponent<CurrenciesProps> = props => {
    const { currencies } = props;
    return <div className="currencies">{currencies}</div>;
};

export default CurrenciesComponent;
