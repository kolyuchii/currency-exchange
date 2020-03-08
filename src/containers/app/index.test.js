import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './index';
import store from 'store';
import { Provider } from 'react-redux';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
