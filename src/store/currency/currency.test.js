import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as currency from './index';
import fetchMock from 'fetch-mock';
import { GET_CURRENCIES_API_URL } from 'config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Currency store', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('Fetch currencies', () => {
        fetchMock.getOnce(GET_CURRENCIES_API_URL, { USD: 'description' });

        const expectedActions = [
            {
                type: currency.SET_CURRENCIES,
                currencies: [
                    ['USD', 'description'],
                    ['USD', 'description'],
                ],
            },
        ];
        const store = mockStore();

        return store.dispatch(currency.fetchCurrencies()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it('Set currency', () => {
        const store = mockStore();

        store.dispatch(currency.setCurrency('from', 15));
        expect(store.getActions()).toEqual([
            {
                type: currency.SET_CURRENCY_FROM,
                currencyFrom: 15,
            },
        ]);

        store.dispatch(currency.setCurrency('to', 10));
        expect(store.getActions()).toEqual([
            {
                type: currency.SET_CURRENCY_FROM,
                currencyFrom: 15,
            },
            {
                type: currency.SET_CURRENCY_TO,
                currencyTo: 10,
            },
        ]);
    });
});
