import React from 'react';
import './exchange.scss';
import classnames from 'classnames';

interface ExchangeProps {
    rateFrom: string;
    currencyFrom: string;
    balanceFrom: string;
    rateTo: string;
    balanceTo: string;
    currencyTo: string;
    exchangeRatesError: string;
    networkErrorMessage: string;
    valueFrom: string;
    valueTo: string;

    onSubmit: () => Event;
    onSwap: () => Event;
    onRateClick: () => Event;
    onChangeCurrency: () => Event;
    onValueFromChanged: () => Event;
    onValueToChanged: () => Event;
    setBalanceFrom: () => Event;
    setBalanceTo: () => Event;
}

const ExchangeComponent: React.FunctionComponent<ExchangeProps> = props => {
    const {
        rateFrom,
        currencyFrom,
        balanceFrom,
        rateTo,
        balanceTo,
        currencyTo,
        exchangeRatesError,
        networkErrorMessage,
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
    const isButtonDisabled =
        currencyFrom === currencyTo ||
        Math.abs(Number(valueFrom)) > clearBalanceFrom ||
        Math.abs(Number(valueFrom)) <= 0;
    const balanceClassNames = classnames({
        'is-red':
            clearBalanceFrom === 0 || clearBalanceFrom < Math.abs(Number(valueFrom)),
        exchange__slot_balance: true,
    });
    const buttonClassNames = classnames({
        disabled: isButtonDisabled,
        exchange__button: true,
        button: true,
    });
    const rateClassNames = classnames({
        'exchange__actions_currency-rate': true,
        'is-network-error': !!networkErrorMessage,
    });
    return (
        <form className="exchange" onSubmit={onSubmit}>
            <div className="exchange__slot exchange__slot-from">
                <div className="exchange__slot_wrapper">
                    <div
                        className="exchange__slot_currency icon__change"
                        onClick={onChangeCurrency.bind(null, 'from')}
                    >
                        {currencyFrom}
                    </div>
                    <input
                        className="exchange__slot_value"
                        onChange={onValueFromChanged}
                        value={valueFrom}
                        type="text"
                        placeholder="0"
                    />
                </div>
                <div className={balanceClassNames} onClick={setBalanceFrom}>
                    Balance {balanceFrom}
                </div>
            </div>
            <div className="exchange__actions">
                <div
                    className="exchange__actions_swap icon__swap"
                    onClick={onSwap}
                />
                <div className={rateClassNames} onClick={onRateClick}>
                    <span className="icon icon__currency-rate" />
                    {rateFrom} = {rateTo}
                </div>
            </div>
            <div className="exchange__slot exchange__slot-to">
                <div className="exchange__slot_wrapper">
                    <div
                        className="exchange__slot_currency icon__change"
                        onClick={onChangeCurrency.bind(null, 'to')}
                    >
                        {currencyTo}
                    </div>
                    <input
                        className="exchange__slot_value"
                        onChange={onValueToChanged}
                        value={valueTo}
                        type="text"
                        placeholder="0"
                    />
                </div>
                <div className="exchange__slot_balance" onClick={setBalanceTo}>
                    Balance {balanceTo}
                </div>
            </div>
            {exchangeRatesError ? (
                <div className="exchange__error">{exchangeRatesError}</div>
            ) : null}
            <div className="button__wrapper">
                <button
                    className={buttonClassNames}
                    disabled={isButtonDisabled}
                >
                    Exchange
                </button>
            </div>
        </form>
    );
};

export default ExchangeComponent;
