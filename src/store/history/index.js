import {
    GET_HISTORY_RATES_API_URL,
    MAX_HISTORY_RATE_PERIOD,
    PERIODS_MAP,
} from 'config';
import { SET_NETWORK_ERROR } from 'store/exchange';

const initialState = {
    historyRates: null,
};

export function fetchHistory(base, symbol, period) {
    return function(dispatch) {
        const dates = getDates(period);
        return fetch(
            `${GET_HISTORY_RATES_API_URL}?base=${base}&symbols=${symbol}&start_at=${dates.start}&end_at=${dates.end}`
        )
            .then(response => {
                return response.json();
            })
            .then(data => {
                dispatch(setHistoryRates(data.rates));
            })
            .catch(response => {
                dispatch(setNetworkError(response.message));
            });
    };
}
export function getDates(period) {
    const periodInDays = PERIODS_MAP[period] || MAX_HISTORY_RATE_PERIOD;
    const currentDate = new Date();
    return {
        start: getDate(
            new Date(currentDate.setDate(currentDate.getDate() - periodInDays))
        ),
        end: getDate(),
    };
}
function getDate(date) {
    const currentDate = date || new Date();
    return `${currentDate.getFullYear()}-${(
        currentDate.getMonth() + 1
    ).padStart(2, '0')}-${currentDate.getDate().padStart(2, '0')}`;
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
