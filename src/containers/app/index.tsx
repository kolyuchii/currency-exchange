import React from 'react';
import { connect } from 'react-redux';
import AppComponent from 'ui/app';
import HeaderComponent from 'ui/header';

interface AppProps {
    page: React.ReactNode;
    onClose: () => Event;
    onAction: () => Event;
    title: string;
    networkErrorMessage: string;
}

const AppContainer: React.FunctionComponent<AppProps> = props => {
    return (
        <AppComponent
            networkErrorMessage={props.networkErrorMessage}
            page={props.page}
            header={
                <HeaderComponent
                    title={props.title}
                    onClose={props.onClose}
                    onAction={props.onAction}
                />
            }
        />
    );
};

function mapStateToProps(state) {
    return {
        networkErrorMessage: state.exchange.networkErrorMessage,
    };
}

export default connect(mapStateToProps)(AppContainer);
