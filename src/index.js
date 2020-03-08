import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/index.scss';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ExchangeContainer from './containers/exchange';
import CurrenciesContainer from './containers/currencies';
import HistoryContainer from './containers/history';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ExchangeContainer} />
                <Route path="/exchange" component={ExchangeContainer} />
                <Route
                    path="/currencies/:slot"
                    component={CurrenciesContainer}
                />
                <Route path="/history/:from/:to" component={HistoryContainer} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
