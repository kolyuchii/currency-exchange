import React from 'react';

interface Currency {
    networkErrorMessage: string;
}

const LoadingComponent: React.FunctionComponent<Currency> = props => {
    return (
        <div className="loading">
            <h3>
                {props.networkErrorMessage ? (
                    <div className="error">
                        <p className="error__text">
                            {props.networkErrorMessage}
                        </p>
                        <a href="/" onClick={() => reload}>
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

function reload(event: MouseEvent) {
    event.preventDefault();
    window.location.reload();
}

export default LoadingComponent;
