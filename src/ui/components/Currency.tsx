import React from 'react';
import classnames from 'classnames';

interface CurrencyProps {
    onClick: () => Event;
    id: string;
    description: string;
    isActive: boolean;
}

const CurrencyComponent: React.FunctionComponent<CurrencyProps> = props => {
    const currency = classnames({
        'is-active': props.isActive,
        currency: true,
    });
    const flag = classnames({
        'currency-flag': true,
        [`currency-flag-${props.id.toLowerCase()}`]: true,
    });
    return (
        <div onClick={props.onClick} id={props.id} className={currency}>
            <div className={flag}/>
            <div className="currency__info">
                <h4 className="currency__name">{props.id}</h4>
                <span className="currency__description">
                    {props.description}
                </span>
            </div>
        </div>
    );
};

export default CurrencyComponent;
