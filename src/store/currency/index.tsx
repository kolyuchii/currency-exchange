import { DEFAULT_SYMBOLS, ERRORS, GET_CURRENCIES_API_URL } from 'config';
import { SET_NETWORK_ERROR } from '../exchange';

const initialState = {
    currencyFrom: 'GBP',
    currencyTo: 'EUR',
};

/**
 * @return {function(*): Promise<T>}
 */
export function fetchCurrencies() {
    return function(dispatch) {
        return fetch(GET_CURRENCIES_API_URL)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const dataArr = Object.entries(data);
                dispatch(
                    setCurrencies(
                        dataArr
                            .filter(currency => {
                                const [id] = currency;
                                return DEFAULT_SYMBOLS.indexOf(id) > -1;
                            })
                            .concat(dataArr)
                    )
                );
            })
            .catch(() => {
                dispatch(setNetworkError(ERRORS.oops));
            });
    };
}

/**
 * @param {string} type
 * @param {string} value
 */
export function setCurrency(type, value) {
    return function(dispatch) {
        switch (type) {
            case 'from':
                dispatch(setCurrencyFrom(value));
                break;
            case 'to':
                dispatch(setCurrencyTo(value));
                break;
        }
    };
}
export const SET_CURRENCIES = Symbol('SET_CURRENCIES');
export function setCurrencies(currencies) {
    return {
        type: SET_CURRENCIES,
        currencies,
    };
}
export const SET_CURRENCY_FROM = Symbol('SET_CURRENCY_FROM');
export function setCurrencyFrom(currencyFrom) {
    return {
        type: SET_CURRENCY_FROM,
        currencyFrom,
    };
}
export const SET_CURRENCY_TO = Symbol('SET_CURRENCY_TO');
export function setCurrencyTo(currencyTo) {
    return {
        type: SET_CURRENCY_TO,
        currencyTo,
    };
}
export function setNetworkError(networkErrorMessage) {
    return {
        type: SET_NETWORK_ERROR,
        networkErrorMessage,
    };
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENCY_FROM:
            return Object.assign({}, state, {
                currencyFrom: action.currencyFrom,
            });
        case SET_CURRENCY_TO:
            return Object.assign({}, state, {
                currencyTo: action.currencyTo,
            });
        case SET_CURRENCIES:
            return Object.assign({}, state, {
                currencies: action.currencies,
            });
        default:
            return state;
    }
}
