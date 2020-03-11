import React from 'react';
import './header.scss';

interface HeaderProps {
    onClose: () => Event;
    onAction: () => Event;
    title: string;
}

const HeaderComponent: React.FunctionComponent<HeaderProps> = props => {
    return (
        <header className="header">
            <div
                className="header__close icon__close"
                onClick={props.onClose}
            />
            <h4 className="header__title">{props.title}</h4>
            <div
                className="header__action icon__auto"
                onClick={props.onAction}
            />
        </header>
    );
};

export default HeaderComponent;
