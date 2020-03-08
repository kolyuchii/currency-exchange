import React from 'react';
import { connect } from 'react-redux';
import AppComponent from 'ui/app';
import HeaderComponent from 'ui/header';
import PropTypes from 'prop-types';

const AppContainer = props => {
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

AppContainer.propTypes = {
    page: PropTypes.element,
    onClose: PropTypes.func,
    onAction: PropTypes.func,
    title: PropTypes.string,
    networkErrorMessage: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        networkErrorMessage: state.exchange.networkErrorMessage,
    };
}

export default connect(mapStateToProps)(AppContainer);
