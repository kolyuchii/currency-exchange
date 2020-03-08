import React from 'react';
import PropTypes from 'prop-types';
import './app.scss';
import LoadingComponent from 'ui/components/Loading';

const AppComponent = props => {
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

AppComponent.propTypes = {
    page: PropTypes.element,
    header: PropTypes.element,
    networkErrorMessage: PropTypes.string,
};

export default AppComponent;
