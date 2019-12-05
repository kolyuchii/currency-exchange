import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as currency from './index';
import fetchMock from 'fetch-mock'
import {
    GET_CURRENCIES_API_URL,
} from 'config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    });

    it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
        fetchMock.getOnce(GET_CURRENCIES_API_URL, {'USD': 'description'});

        const expectedActions = [
            {
                type: currency.SET_CURRENCIES,
                currencies: [
                    ['USD', 'description'],
                    ['USD', 'description'],
                ]
            }
        ];
        const store = mockStore();

        return store.dispatch(currency.fetchCurrencies()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
});
