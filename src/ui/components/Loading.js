import React from 'react';
import PropTypes from 'prop-types';

const LoadingComponent = props => {
    return (
        <div className="loading">
            <h3>
                {props.networkErrorMessage ? (
                    <div className="error">
                        <p className="error__text">
                            {props.networkErrorMessage}
                        </p>
                        <a href="/" onClick={reload}>
                            Reload the page and try again
                        </a>
                    </div>
                ) : (
                    'Loading...'
                )}
            </h3>
        </div>
    );
};

/**
 * @param {MouseEvent} event
 */
function reload(event) {
    event.preventDefault();
    window.location.reload();
}

LoadingComponent.propTypes = {
    networkErrorMessage: PropTypes.string,
};

export default LoadingComponent;
