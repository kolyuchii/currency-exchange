import React from 'react';
import PropTypes from 'prop-types';
import './app.scss';
import LoadingComponent from 'ui/components/Loading';
import {connect} from "react-redux";
import HeaderComponent from 'ui/header';

const AppComponent = props => {
    function getLoading() {
        return (
            <LoadingComponent
                networkErrorMessage={props.networkErrorMessage}
            />
        );
    }
    return (
        <div className="app">
            <HeaderComponent
                title={props.title}
                onClose={props.onClose}
                onAction={props.onAction}
            />
            <section className="content">
                {props.page || getLoading()}
            </section>
        </div>
    );
};

AppComponent.propTypes = {
    page: PropTypes.element,
    onClose: PropTypes.func,
    onAction: PropTypes.func,
    title: PropTypes.string,
    networkErrorMessage: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        networkErrorMessage: state.exchange.networkErrorMessage,
    }
}

export default connect(
    mapStateToProps,
)(AppComponent)