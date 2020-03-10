import { ERRORS, GET_HISTORY_RATES_API_URL } from 'config';
import { SET_NETWORK_ERROR } from 'store/exchange';
import getDatesFromPeriod from 'store/history/get-date-from-period';

const initialState = {
    historyRates: null,
};

/**
 * @param {string} base
 * @param {string} symbol
 * @param {PERIODS_ENUM} period
 */
export function fetchHistory(base, symbol, period) {
    return function(dispatch) {
        const dates = getDatesFromPeriod(period);
        return fetch(
            `${GET_HISTORY_RATES_API_URL}?base=${base}&symbols=${symbol}&start_at=${dates.start}&end_at=${dates.end}`
        )
            .then(response => {
                return response.json();
            })
            .then(data => {
                dispatch(setHistoryRates(data.rates));
            })
            .catch(() => {
                dispatch(setNetworkError(ERRORS.oops));
            });
    };
}
export const SET_HISTORY_RATES = Symbol('SET_HISTORY_RATES');
export function setHistoryRates(historyRates) {
    return {
        type: SET_HISTORY_RATES,
        historyRates,
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
        case SET_HISTORY_RATES:
            return Object.assign({}, state, {
                historyRates: action.historyRates,
            });
        default:
            return state;
    }
}
