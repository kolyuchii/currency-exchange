import React from 'react';
import PropTypes from 'prop-types';
import './history.scss';
import classnames from 'classnames';

const HistoryComponent = props => {
    function getPeriods() {
        if (!props.periods) {
            return null;
        }
        return props.periods.map((period, index) => {
            const periodClassNames = classnames({
                'history__steps-item': true,
                'is-active': period.isActive,
            });
            return (
                <li key={index} className={periodClassNames} id={period.id} onClick={props.onClick}>{period.id}</li>
            );
        });
    }
    return (
        <div className="history">
            <canvas ref={props.chartRef} id="myChart" width="400" height="250"></canvas>
            <ul className="history__steps">
                {getPeriods()}
            </ul>
        </div>
    )
};

HistoryComponent.propTypes = {
    chartRef: PropTypes.object,
    onClick: PropTypes.func,
    periods: PropTypes.array,
};

export default HistoryComponent;
