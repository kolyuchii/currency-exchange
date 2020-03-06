import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as history from './index';
import fetchMock from 'fetch-mock'
import {
    GET_HISTORY_RATES_API_URL,
} from 'config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('History store', () => {
    afterEach(() => {
        fetchMock.restore()
    });

    it('Fetch history rates', () => {
        const base = 'GPB';
        const symbol = 'EUR';
        const dates = history.getDates('1w');
        const startDate = dates.start;
        const endDate = dates.end;
        fetchMock.getOnce(
            `${GET_HISTORY_RATES_API_URL}?base=${base}&symbols=${symbol}&start_at=${startDate}&end_at=${endDate}`,
            {"rates":{"2020-03-05":{"EUR":1.1538017769},"2020-02-28":{"EUR":1.1721268241},"2020-03-04":{"EUR":1.1514104778},"2020-03-02":{"EUR":1.1479342922},"2020-03-06":{"EUR":1.1472494694},"2020-03-03":{"EUR":1.1492931847}},"start_at":"2020-02-28","base":"GBP","end_at":"2020-03-06"});

        const expectedActions = [
            {
                type: history.SET_HISTORY_RATES,
                historyRates: {
                    "2020-02-28": {
                        "EUR": 1.1721268241,
                    },
                    "2020-03-02": {
                        "EUR": 1.1479342922,
                    },
                    "2020-03-03": {
                        "EUR": 1.1492931847,
                    },
                    "2020-03-04": {
                        "EUR": 1.1514104778,
                    },
                    "2020-03-05": {
                        "EUR": 1.1538017769,
                    },
                    "2020-03-06": {
                        "EUR": 1.1472494694,
                    },
                }
            }
        ];
        const store = mockStore();

        return store.dispatch(history.fetchHistory(base, symbol, '1w')).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
});