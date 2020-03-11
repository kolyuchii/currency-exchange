import { DEFAULT_SYMBOLS, GET_RATES_API_URL, POCKETS, ERRORS } from 'config';

const initialState = {
    exchangeRates: null,
    pockets: POCKETS,
};

/**
 * @param {string} base
 * @param {string} symbols
 */
export function fetchExchangeRates(base, symbols = DEFAULT_SYMBOLS.join(',')) {
    return function(dispatch) {
        if (base === symbols) {
            dispatch(
                setExchangeRates({
                    [symbols]: 1,
                })
            );
        } else {
            return fetch(`${GET_RATES_API_URL}&base=${base}&symbols=${symbols}`)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    dispatch(setNetworkError(null));
                    if (data.error) {
                        dispatch(setExchangeRatesError(data.error));
                    } else {
                        for (const key in data.rates) {
                            data.rates[key] = Number(
                                data.rates[key].toFixed(4)
                            );
                        }
                        dispatch(setExchangeRates(data.rates));
                    }
                })
                .catch(() => {
                    dispatch(setNetworkError(ERRORS.oops));
                });
        }
    };
}

/**
 * @param {object} pockets
 */
export function updatePockets(pockets) {
    return function(dispatch) {
        dispatch(setPockets(pockets));
    };
}

export const SET_NETWORK_ERROR = Symbol('SET_NETWORK_ERROR');
export function setNetworkError(networkErrorMessage) {
    return {
        type: SET_NETWORK_ERROR,
        networkErrorMessage,
    };
}
export const SET_EXCHANGE_RATES_ERROR = Symbol('SET_EXCHANGE_RATES_ERROR');
export function setExchangeRatesError(exchangeRatesError) {
    return {
        type: SET_EXCHANGE_RATES_ERROR,
        exchangeRatesError,
    };
}
export const SET_RATES = Symbol('SET_RATES');
export function setExchangeRates(exchangeRates) {
    return {
        type: SET_RATES,
        exchangeRates,
    };
}
export const SET_POCKETS = Symbol('SET_POCKETS');
export function setPockets(pockets) {
    return {
        type: SET_POCKETS,
        pockets,
    };
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_RATES:
            return Object.assign({}, state, {
                exchangeRates: action.exchangeRates,
                exchangeRatesError: null,
            });
        case SET_EXCHANGE_RATES_ERROR:
            return Object.assign({}, state, {
                exchangeRatesError: action.exchangeRatesError,
            });
        case SET_POCKETS:
            return Object.assign({}, state, {
                pockets: action.pockets,
            });
        case SET_NETWORK_ERROR:
            return Object.assign({}, state, {
                networkErrorMessage: action.networkErrorMessage,
            });
        default:
            return state;
    }
}
