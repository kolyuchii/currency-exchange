import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import exchange from './exchange';
import currency from './currency';
import history from './history';

const rootReducer = combineReducers({
    exchange,
    currency,
    history,
});

export default createStore(rootReducer, {}, applyMiddleware(thunk));
