import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as exchange from './index';
import fetchMock from 'fetch-mock';
import { GET_RATES_API_URL } from 'config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Exchange store', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('Fetch exchange rates', () => {
        const base = 'GPB';
        const symbols = 'EUR';
        fetchMock.getOnce(
            `${GET_RATES_API_URL}&base=${base}&symbols=${symbols}`,
            { rates: { EUR: 1.1472494694 }, base: 'GBP', date: '2020-03-06' }
        );

        const expectedActions = [
            {
                networkErrorMessage: null,
                type: exchange.SET_NETWORK_ERROR,
            },
            {
                type: exchange.SET_RATES,
                exchangeRates: { EUR: 1.1472494694 },
            },
        ];
        const store = mockStore();

        return store
            .dispatch(exchange.fetchExchangeRates(base, symbols))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});
