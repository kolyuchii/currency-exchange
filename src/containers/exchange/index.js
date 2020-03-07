import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import AppComponent from 'ui/app';
import ExchangeComponent from 'ui/exchange';
import { fetchExchangeRates, updatePockets } from 'store/exchange';
import { setCurrency } from 'store/currency';
import { FETCH_RATES_TIMEOUT } from 'config';
import {
    parseValue,
    getValueFrom,
    getValueTo,
    getBalance,
    getCurrencySign,
} from './utils';

class ExchangeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valueFrom: '',
            valueTo: '',
        };
    }
    render() {
        return (
            <AppComponent page={this.getExchangeContainer()} title="Exchange" />
        );
    }
    getExchangeContainer() {
        if (!this.props.exchangeRates) {
            return null;
        }
        const {
            currencyFrom,
            currencyTo,
            exchangeRates,
            exchangeRatesError,
            pockets,
        } = this.props;

        const exchangeRate = exchangeRates[currencyTo] || 0;
        return (
            <ExchangeComponent
                rateFrom={getCurrencySign(currencyFrom, 1)}
                currencyFrom={currencyFrom}
                balanceFrom={getCurrencySign(
                    currencyFrom,
                    getBalance(currencyFrom, pockets)
                )}
                rateTo={getCurrencySign(currencyTo, exchangeRate.toFixed(4))}
                balanceTo={getCurrencySign(
                    currencyTo,
                    getBalance(currencyTo, pockets)
                )}
                currencyTo={currencyTo}
                exchangeRatesError={exchangeRatesError}
                valueFrom={
                    this.state.valueFrom ? `-${this.state.valueFrom}` : ''
                }
                valueTo={this.state.valueTo ? `+${this.state.valueTo}` : ''}
                onSubmit={this.onSubmit.bind(this)}
                onSwap={this.onSwap.bind(this)}
                onRateClick={this.onRateClick.bind(this)}
                onChangeCurrency={this.onChangeCurrency.bind(this)}
                onValueFromChanged={this.onValueFromChanged.bind(this)}
                onValueToChanged={this.onValueToChanged.bind(this)}
                setBalanceFrom={this.setBalanceFrom.bind(this)}
                setBalanceTo={this.setBalanceTo.bind(this)}
            />
        );
    }
    setBalanceFrom() {
        const { currencyFrom, exchangeRates, pockets } = this.props;
        const balance = getBalance(currencyFrom, pockets);
        this.setState({
            valueFrom: balance,
            valueTo: getValueTo(balance, currencyFrom, exchangeRates),
        });
    }
    setBalanceTo() {
        const { currencyTo, exchangeRates, pockets } = this.props;
        const balance = getBalance(currencyTo, pockets);
        this.setState({
            valueFrom: getValueFrom(balance, currencyTo, exchangeRates),
            valueTo: balance,
        });
    }
    onValueFromChanged(event) {
        const { currencyTo, exchangeRates } = this.props;
        const value = parseValue(event.currentTarget.value);
        this.setState({
            valueFrom: value,
            valueTo: getValueTo(Number(value), currencyTo, exchangeRates),
        });
    }
    onValueToChanged(event) {
        const { currencyTo, exchangeRates } = this.props;
        const value = parseValue(event.currentTarget.value);
        this.setState({
            valueFrom: getValueTo(Number(value), currencyTo, exchangeRates),
            valueTo: value,
        });
    }
    onSubmit(event) {
        event.preventDefault();
        const { currencyFrom, currencyTo, pockets } = this.props;

        const balanceFrom = getBalance(currencyFrom, pockets);
        const balanceTo = getBalance(currencyTo, pockets);
        if (
            this.state.valueFrom <= balanceFrom &&
            currencyFrom !== currencyTo
        ) {
            this.props.actions.updatePockets({
                [currencyFrom]: {
                    balance: (
                        balanceFrom - Number(this.state.valueFrom)
                    ).toFixed(2),
                },
                [currencyTo]: {
                    balance: (balanceTo + Number(this.state.valueTo)).toFixed(
                        2
                    ),
                },
            });

            this.setState({
                valueFrom: '',
                valueTo: '',
            });
        }
    }
    onSwap() {
        this.props.actions.setCurrency('from', this.props.currencyTo);
        this.props.actions.setCurrency('to', this.props.currencyFrom);

        this.setState({
            valueFrom: this.state.valueTo,
            valueTo: this.state.valueFrom,
        });
        this.props.actions.fetchExchangeRates(
            this.props.currencyTo,
            this.props.currencyFrom
        );
    }
    onRateClick() {
        this.props.history.push(
            `/history/${this.props.currencyFrom}/${this.props.currencyTo}`
        );
    }
    onChangeCurrency(slotName) {
        this.props.history.push(`/currencies/${slotName}`);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.exchangeRates !== this.props.exchangeRates) {
            this.clear();
            this.fetchRatesTimer = setTimeout(() => {
                this.props.actions.fetchExchangeRates(
                    this.props.currencyFrom,
                    this.props.currencyTo
                );
            }, FETCH_RATES_TIMEOUT);
        }
    }

    componentDidMount() {
        this.props.actions.fetchExchangeRates(
            this.props.currencyFrom,
            this.props.currencyTo
        );
    }
    componentWillUnmount() {
        this.clear();
    }
    clear() {
        if (this.fetchRatesTimer) {
            clearTimeout(this.fetchRatesTimer);
            this.fetchRatesTimer = null;
        }
    }
}

ExchangeContainer.propTypes = {
    actions: PropTypes.object,
    currencyFrom: PropTypes.string,
    currencyTo: PropTypes.string,
    exchangeRates: PropTypes.object,
    history: PropTypes.object,
    pockets: PropTypes.object,
    exchangeRatesError: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        exchangeRates: state.exchange.exchangeRates,
        exchangeRatesError: state.exchange.exchangeRatesError,
        currencyFrom: state.currency.currencyFrom,
        currencyTo: state.currency.currencyTo,
        balanceFrom: state.exchange.balanceFrom,
        balanceTo: state.exchange.balanceTo,
        pockets: state.exchange.pockets,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchExchangeRates,
                setCurrency,
                updatePockets,
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeContainer);
