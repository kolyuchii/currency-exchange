import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import HeaderContainer from 'containers/header';
import ExchangeComponent from 'ui/exchange';
import LoadingComponent from 'ui/components/Loading';
import {
    fetchExchangeRates,
    updatePockets,
} from 'store/exchange';
import {
    setCurrency,
} from 'store/currency';
import {
    CURRENCY_ID_TO_SIGN_MAP,
    FETCH_RATES_TIMEOUT,
} from 'config';

class ExchangeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valueFrom: '',
            valueTo: '',
        }
    }
    render() {
        return (
            <div className="app">
                <HeaderContainer
                    title="Exchange"
                />
                {this.props.exchangeRates ? this.getExchangeContainer() : this.getLoading()}
            </div>
        );
    }
    getExchangeContainer() {
        const {
            currencyFrom,
            currencyTo,
            exchangeRates,
            exchangeRatesError,
        } = this.props;

        const exchangeRate = exchangeRates[currencyTo] || 0;
        return (
            <ExchangeComponent
                rateFrom={getCurrencySign(currencyFrom, 1)}
                currencyFrom={currencyFrom}
                balanceFrom={getCurrencySign(currencyFrom, this.getBalance(currencyFrom))}
                rateTo={getCurrencySign(
                    currencyTo,
                    exchangeRate.toFixed(4))}
                balanceTo={getCurrencySign(currencyTo, this.getBalance(currencyTo))}
                currencyTo={currencyTo}
                exchangeRatesError={exchangeRatesError}
                valueFrom={this.state.valueFrom ? `-${this.state.valueFrom}` : ''}
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
    getBalance(currency) {
        const pocket = this.props.pockets[currency];
        if (pocket) {
            return pocket.balance;
        }
        return 0;
    }
    setBalanceFrom() {
        const {
            currencyFrom,
        } = this.props;
        const balance = this.getBalance(currencyFrom);
        this.setState({
            valueFrom: balance,
            valueTo: this.getValueTo(balance),
        });
    }
    setBalanceTo() {
        const {
            currencyTo,
        } = this.props;
        const balance = this.getBalance(currencyTo);
        this.setState({
            valueFrom: this.getValueFrom(balance),
            valueTo: balance,
        });
    }
    onValueFromChanged(event) {
        const value = getValue(event.currentTarget.value);
        this.setState({
            valueFrom: value,
            valueTo: this.getValueTo(Number(value)),
        });
    }
    onValueToChanged(event) {
        const value = getValue(event.currentTarget.value);
        this.setState({
            valueFrom: this.getValueFrom(Number(value)),
            valueTo: value,
        });
    }
    getValueFrom(value) {
        const {
            currencyTo,
            exchangeRates,
        } = this.props;
        return value ? (value / exchangeRates[currencyTo]).toFixed(2) : '';
    }
    getValueTo(value) {
        const {
            currencyTo,
            exchangeRates,
        } = this.props;
        return value ? (value * exchangeRates[currencyTo]).toFixed(2) : '';
    }
    getLoading() {
        return (
            <LoadingComponent
                networkErrorMessage={this.props.networkErrorMessage || this.props.exchangeRatesError}
            />
        );
    }
    onSubmit(event) {
        event.preventDefault();
        const {
            currencyFrom,
            currencyTo,
        } = this.props;

        const balanceFrom = Number(this.getBalance(currencyFrom));
        const balanceTo = Number(this.getBalance(currencyTo));
        if (this.state.valueFrom <= balanceFrom && currencyFrom !== currencyTo) {
            this.props.actions.updatePockets({
                [currencyFrom]: {
                    balance: (balanceFrom - Number(this.state.valueFrom)).toFixed(2)
                },
                [currencyTo]: {
                    balance: (balanceTo + Number(this.state.valueTo)).toFixed(2)
                }
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
        this.props.actions.fetchExchangeRates(this.props.currencyTo, this.props.currencyFrom);
    }
    onRateClick() {
        this.props.history.push(`/history/${this.props.currencyFrom}/${this.props.currencyTo}`)
    }
    onChangeCurrency(slotName) {
        this.props.history.push(`/currencies/${slotName}`);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.exchangeRates !== this.props.exchangeRates) {
            this.clear();
            this.fetchRatesTimer = setTimeout(() => {
                this.props.actions.fetchExchangeRates(this.props.currencyFrom, this.props.currencyTo);
            }, FETCH_RATES_TIMEOUT);
        }
    }

    componentDidMount() {
        this.props.actions.fetchExchangeRates(this.props.currencyFrom, this.props.currencyTo);
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

function getValue(value) {
    value = value.replace(/[^\d.]/g, '');
    const arr = value.split('.');
    if (arr[1]) {
        arr[1] = arr[1].substr(0, 2);
    }
    return arr.join('.');
}

function getCurrencySign(currencyName, value) {
    const sign = CURRENCY_ID_TO_SIGN_MAP[currencyName] || '';
    return `${sign}${value}`;
}

ExchangeContainer.propTypes = {
    actions: PropTypes.object,
    currencyFrom: PropTypes.string,
    currencyTo: PropTypes.string,
    exchangeRates: PropTypes.object,
    history: PropTypes.object,
    networkErrorMessage: PropTypes.string,
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
        networkErrorMessage: state.exchange.networkErrorMessage,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchExchangeRates,
            setCurrency,
            updatePockets,
        }, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExchangeContainer)