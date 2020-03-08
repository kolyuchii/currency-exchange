import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppContainer from 'containers/app';
import { fetchCurrencies, setCurrency } from 'store/currency';
import CurrenciesComponent from 'ui/currencies';
import CurrencyComponent from 'ui/components/Currency';
import { DEFAULT_SYMBOLS } from 'config';

export class CurrenciesContainer extends Component {
    render() {
        return (
            <AppContainer
                onClose={this.onClose.bind(this)}
                title="Currencies"
                page={this.getCurrencies()}
            />
        );
    }

    getCurrencies() {
        if (!this.props.currencies) {
            return null;
        }
        const currencies = this.props.currencies.map((currency, index) => {
            const [id, description] = currency;
            return (
                <CurrencyComponent
                    key={index}
                    id={id}
                    description={description}
                    isActive={index < DEFAULT_SYMBOLS.length}
                    onClick={this.onClick.bind(this)}
                />
            );
        });

        return <CurrenciesComponent currencies={currencies} />;
    }

    onClick(event) {
        this.props.actions.setCurrency(
            this.props.match.params.slot,
            event.currentTarget.id
        );
    }

    onClose() {
        this.props.history.push('/');
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.currencyFrom !== this.props.currencyFrom ||
            prevProps.currencyTo !== this.props.currencyTo
        ) {
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        if (!this.props.currencies) {
            this.props.actions.fetchCurrencies();
        }
    }
}

CurrenciesContainer.propTypes = {
    currencies: PropTypes.array,
    actions: PropTypes.object,
    history: PropTypes.object,
    currencyFrom: PropTypes.string,
    currencyTo: PropTypes.string,
    match: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        currencies: state.currency.currencies,
        currencyFrom: state.currency.currencyFrom,
        currencyTo: state.currency.currencyTo,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchCurrencies,
                setCurrency,
            },
            dispatch
        ),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrenciesContainer);
