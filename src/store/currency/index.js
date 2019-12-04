import {
    DEFAULT_SYMBOLS,
    GET_CURRENCIES_API_URL,
} from 'config';
import {SET_NETWORK_ERROR} from "../exchange";

const initialState = {
    currencyFrom: 'GBP',
    currencyTo: 'EUR',
};

// {
//     "AED": "United Arab Emirates Dirham",
//     "AFN": "Afghan Afghani",
//     "ALL": "Albanian Lek",
//     "AMD": "Armenian Dram",
//     "ANG": "Netherlands Antillean Guilder",
//     "AOA": "Angolan Kwanza",
//     "ARS": "Argentine Peso",
//     "AUD": "Australian Dollar",
//     "AWG": "Aruban Florin",
//     "AZN": "Azerbaijani Manat"
// }

/**
 * @param {string} base Change base currency (3-letter code, default: USD)
 * @param {string} symbols Limit results to specific currencies (comma-separated list of 3-letter codes)
 */
export function fetchCurrencies() {
    return function (dispatch) {
        fetch(GET_CURRENCIES_API_URL)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const dataArr = Object.entries(data);
                dispatch(setCurrencies(dataArr.filter(currency => {
                    const [
                        id,
                    ] = currency;
                    return DEFAULT_SYMBOLS.indexOf(id) > -1;
                }).concat(dataArr)));
            })
            .catch(response => {
                dispatch(setNetworkError(response.message));
            });
    }
}
export function setCurrency(type, value) {
    return function (dispatch) {
        switch (type) {
            case 'from':
                dispatch(setCurrencyFrom(value));
                break;
            case 'to':
                dispatch(setCurrencyTo(value));
                break;
        }
    }
}
export const SET_CURRENCIES = Symbol('SET_CURRENCIES');
export function setCurrencies(currencies) {
    return {
        type: SET_CURRENCIES,
        currencies
    }
}
export const SET_CURRENCY_FROM = Symbol('SET_CURRENCY_FROM');
export function setCurrencyFrom(currencyFrom) {
    return {
        type: SET_CURRENCY_FROM,
        currencyFrom
    }
}
export const SET_CURRENCY_TO = Symbol('SET_CURRENCY_TO');
export function setCurrencyTo(currencyTo) {
    return {
        type: SET_CURRENCY_TO,
        currencyTo
    }
}
export function setNetworkError(networkErrorMessage) {
    return {
        type: SET_NETWORK_ERROR,
        networkErrorMessage
    }
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENCY_FROM:
            return Object.assign({}, state, {
                currencyFrom: action.currencyFrom
            });
        case SET_CURRENCY_TO:
            return Object.assign({}, state, {
                currencyTo: action.currencyTo
            });
        case SET_CURRENCIES:
            return Object.assign({}, state, {
                currencies: action.currencies
            });
        default:
            return state;
    }
}
