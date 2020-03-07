import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import ExchangeContainer from 'containers/exchange';
import CurrenciesContainer from 'containers/currencies';
import HistoryContainer from 'containers/history';
import store from 'store';
import { Provider } from 'react-redux';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={ExchangeContainer} />
                    <Route path="/exchange" component={ExchangeContainer} />
                    <Route
                        path="/currencies/:slot"
                        component={CurrenciesContainer}
                    />
                    <Route
                        path="/history/:from/:to"
                        component={HistoryContainer}
                    />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
