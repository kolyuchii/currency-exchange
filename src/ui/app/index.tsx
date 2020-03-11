import React from 'react';
import './app.scss';
import LoadingComponent from 'ui/components/Loading';

interface AppProps {
    page: React.ReactNode;
    header: React.ReactNode;
    networkErrorMessage: string;
}

const AppComponent: React.FunctionComponent<AppProps> = props => {
    function getLoading() {
        return (
            <LoadingComponent networkErrorMessage={props.networkErrorMessage} />
        );
    }
    return (
        <div className="app">
            {props.header}
            <section className="content">{props.page || getLoading()}</section>
        </div>
    );
};

export default AppComponent;
