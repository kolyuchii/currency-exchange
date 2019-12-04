import {
    GET_HISTORY_RATES_API_URL,
    MAX_HISTORY_RATE_PERIOD,
    PERIODS_MAP,
} from 'config';
import {SET_NETWORK_ERROR} from 'store/exchange';

const initialState = {
    historyRates: null,
};

export function fetchHistory(base, symbol, period) {
    return function (dispatch) {
        const periodInDays = PERIODS_MAP[period] || MAX_HISTORY_RATE_PERIOD;
        const currentDate = new Date();
        const startDate = getDate(new Date(currentDate.setDate(currentDate.getDate() - periodInDays)));
        const endDate = getDate();
        fetch(`${GET_HISTORY_RATES_API_URL}?base=${base}&symbols=${symbol}&start_at=${startDate}&end_at=${endDate}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                dispatch(setHistoryRates(data.rates))
            })
            .catch(response => {
                dispatch(setNetworkError(response.message));
            });
    }
}
function getDate(date) {
    const currentDate = date || new Date();
    return `${currentDate.getFullYear()}-${addZero(currentDate.getMonth() + 1)}-${addZero(currentDate.getDate())}`;
}
function addZero(num) {
    return `0${num}`.slice(-2);
}
export const SET_HISTORY_RATES = Symbol('SET_HISTORY_RATES');
export function setHistoryRates(historyRates) {
    return {
        type: SET_HISTORY_RATES,
        historyRates
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
        case SET_HISTORY_RATES:
            return Object.assign({}, state, {
                historyRates: action.historyRates
            });
        default:
            return state;
    }
}
