import React from 'react';
import './exchange.scss';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ExchangeComponent = props => {
    const {
        rateFrom,
        currencyFrom,
        balanceFrom,
        rateTo,
        balanceTo,
        currencyTo,
        exchangeRatesError,
        valueFrom,
        valueTo,

        onSubmit,
        onSwap,
        onRateClick,
        onChangeCurrency,
        onValueFromChanged,
        onValueToChanged,
        setBalanceFrom,
        setBalanceTo,
    } = props;

    const clearBalanceFrom = Number(balanceFrom.replace(/\D/, ''));
    const isButtonDisabled = currencyFrom === currencyTo || Math.abs(valueFrom) > clearBalanceFrom || Math.abs(valueFrom) <= 0;
    const balanceClassNames = classnames({
        'is-red': clearBalanceFrom === 0 || clearBalanceFrom < Math.abs(valueFrom),
        'exchange__slot_balance': true,
    });
    const buttonClassNames = classnames({
        'disabled': isButtonDisabled,
        'exchange__button': true,
        'button': true,
    });

    return (
        <form className="exchange" onSubmit={onSubmit}>
            <div className="exchange__slot exchange__slot-from">
                <div className="exchange__slot_wrapper">
                    <div className="exchange__slot_currency icon__change" onClick={onChangeCurrency.bind(null, 'from')}>{currencyFrom}</div>
                    <input
                        className="exchange__slot_value"
                        onChange={onValueFromChanged}
                        value={valueFrom}
                        type="text"
                        placeholder="0"
                    />
                </div>
                <div className={balanceClassNames} onClick={setBalanceFrom}>Balance {balanceFrom}</div>
            </div>
            <div className="exchange__actions">
                <div className="exchange__actions_swap icon__swap" onClick={onSwap} />
                <div className="exchange__actions_currency-rate" onClick={onRateClick}>
                    <span className="icon icon__currency-rate"/>{rateFrom} = {rateTo}
                </div>
            </div>
            <div className="exchange__slot exchange__slot-to">
                <div className="exchange__slot_wrapper">
                    <div className="exchange__slot_currency icon__change" onClick={onChangeCurrency.bind(null, 'to')}>{currencyTo}</div>
                    <input
                        className="exchange__slot_value"
                        onChange={onValueToChanged}
                        value={valueTo}
                        type="text"
                        placeholder="0"
                    />
                </div>
                <div className="exchange__slot_balance" onClick={setBalanceTo}>Balance {balanceTo}</div>
            </div>
            {exchangeRatesError ? (
                <div className="exchange__error">{exchangeRatesError}</div>
            ) : null}
            <div className="button__wrapper">
                <button className={buttonClassNames} disabled={isButtonDisabled}>Exchange</button>
            </div>
        </form>
    );
};

ExchangeComponent.propTypes = {
    rateFrom: PropTypes.string,
    currencyFrom: PropTypes.string,
    balanceFrom: PropTypes.string,
    rateTo: PropTypes.string,
    balanceTo: PropTypes.string,
    currencyTo: PropTypes.string,
    exchangeRatesError: PropTypes.string,
    valueFrom: PropTypes.string,
    valueTo: PropTypes.string,

    onSubmit: PropTypes.func,
    onSwap: PropTypes.func,
    onRateClick: PropTypes.func,
    onChangeCurrency: PropTypes.func,
    onValueFromChanged: PropTypes.func,
    onValueToChanged: PropTypes.func,
    setBalanceFrom: PropTypes.func,
    setBalanceTo: PropTypes.func,
};

export default ExchangeComponent;