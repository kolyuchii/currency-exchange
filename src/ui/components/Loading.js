import React from 'react';
import PropTypes from 'prop-types';

const LoadingComponent = (props) => {
    return (
        <div className="loading">
            <h3>
                {props.networkErrorMessage ? (
                    <div className="error">
                        <p>{props.networkErrorMessage}</p>
                        <a href="javascript:void(0)" onClick={reload}>Reload the page and try again</a>
                    </div>
                ) : 'Loading...'}
            </h3>
        </div>
    )
};

function reload() {
    window.location.reload();
}

LoadingComponent.propTypes = {
    networkErrorMessage: PropTypes.string,
};

export default LoadingComponent;
