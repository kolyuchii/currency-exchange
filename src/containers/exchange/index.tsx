import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router';
import { bindActionCreators } from 'redux';

import AppContainer from 'containers/app';
import ExchangeComponent from 'ui/exchange';
import { fetchExchangeRates, updatePockets, Pockets } from 'store/exchange';
import { setCurrency } from 'store/currency';
import { FETCH_RATES_TIMEOUT } from 'config';
import {
    parseValue,
    getValueFrom,
    getValueTo,
    getBalance,
    getCurrencySign,
} from './utils';

interface Rates {
    [key: string]: number;
}
interface ExchangeProps {
    actions: any;
    currencyFrom: string;
    currencyTo: string;
    exchangeRates: Rates,
    pockets: Pockets,
    exchangeRatesError: string;
    networkErrorMessage: string;
}
interface ExchangeState {
    valueFrom: string;
    valueTo: string;
}

class ExchangeContainer extends Component<ExchangeProps & RouteProps, ExchangeState> {
    fetchRatesTimer: number;
    constructor(props) {
        super(props);
        this.fetchExchangeRates = this.fetchExchangeRates.bind(this);
        this.state = {
            valueFrom: '',
            valueTo: '',
        };
    }
    render() {
        return (
            <AppContainer page={this.getExchangeContainer()} title="Exchange" />
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
                rateTo={getCurrencySign(currencyTo, exchangeRate)}
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
                networkErrorMessage={this.props.networkErrorMessage}
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
    setBalanceFrom(): void {
        const { currencyFrom, currencyTo, exchangeRates, pockets } = this.props;
        const balance = getBalance(currencyFrom, pockets);
        this.setState({
            valueFrom: String(balance),
            valueTo: getValueTo(balance, currencyTo, exchangeRates),
        });
    }
    setBalanceTo(): void {
        const { currencyTo, exchangeRates, pockets } = this.props;
        const balance = getBalance(currencyTo, pockets);
        this.setState({
            valueFrom: getValueFrom(balance, currencyTo, exchangeRates),
            valueTo: String(balance),
        });
    }
    onValueFromChanged(event: React.FormEvent<HTMLInputElement>): void {
        const { currencyTo, exchangeRates } = this.props;
        const value = parseValue(event.currentTarget.value);
        this.setState({
            valueFrom: String(value),
            valueTo: getValueTo(value, currencyTo, exchangeRates),
        });
    }
    onValueToChanged(event: React.FormEvent<HTMLInputElement>): void {
        const { currencyTo, exchangeRates } = this.props;
        const value = parseValue(event.currentTarget.value);
        this.setState({
            valueFrom: getValueFrom(value, currencyTo, exchangeRates),
            valueTo: String(value),
        });
    }
    onSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        const { currencyFrom, currencyTo, pockets } = this.props;

        const balanceFrom = getBalance(currencyFrom, pockets);
        const balanceTo = getBalance(currencyTo, pockets);
        if (
            Number(this.state.valueFrom) <= balanceFrom &&
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
    onChangeCurrency(slotName: string) {
        this.props.history.push(`/currencies/${slotName}`);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.exchangeRates !== this.props.exchangeRates) {
            this.clear();
            this.fetchRatesTimer = window.setTimeout(() => {
                this.fetchExchangeRates();
            }, FETCH_RATES_TIMEOUT);
        }
    }

    componentDidMount() {
        this.fetchExchangeRates();
        window.addEventListener('online', this.fetchExchangeRates);
    }
    fetchExchangeRates() {
        this.props.actions.fetchExchangeRates(
            this.props.currencyFrom,
            this.props.currencyTo
        );
    }
    componentWillUnmount() {
        this.clear();
        window.removeEventListener('online', this.fetchExchangeRates);
    }
    clear() {
        if (this.fetchRatesTimer) {
            clearTimeout(this.fetchRatesTimer);
            this.fetchRatesTimer = null;
        }
    }
}

function mapStateToProps(state) {
    return {
        exchangeRates: state.exchange.exchangeRates,
        exchangeRatesError: state.exchange.exchangeRatesError,
        currencyFrom: state.currency.currencyFrom,
        currencyTo: state.currency.currencyTo,
        balanceFrom: state.exchange.balanceFrom,
        balanceTo: state.exchange.balanceTo,
        pockets: state.exchange.pockets,
        networkErrorMessage: state.exchange.networkErrorMessage,
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
