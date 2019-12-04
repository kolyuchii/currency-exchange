import React, { Component } from 'react';
import HeaderComponent from 'ui/header';
import PropTypes from 'prop-types';

class HeaderContainer extends Component {
    render() {
        return (
            <HeaderComponent
                title={this.props.title}
                onClose={this.props.onClose}
                action={this.props.action}
                onAction={this.props.onAction}
            />
        );
    }
}

HeaderContainer.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    onAction: PropTypes.func,
    action: PropTypes.object,
};

export default HeaderContainer;