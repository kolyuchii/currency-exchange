import React from 'react';
import './history.scss';
import classnames from 'classnames';

interface Period {
    id: string;
    isActive: boolean;
}
interface HistoryProps {
    chartRef: React.Ref<HTMLCanvasElement>;
    onClick: () => Event;
    periods: Period[];
}

const HistoryComponent: React.FunctionComponent<HistoryProps> = props => {
    function getPeriods() {
        if (!props.periods) {
            return null;
        }
        return props.periods.map((period: Period, index: number) => {
            const periodClassNames = classnames({
                'history__steps-item': true,
                'is-active': period.isActive,
            });
            return (
                <li
                    key={index}
                    className={periodClassNames}
                    id={period.id}
                    onClick={props.onClick}
                >
                    {period.id}
                </li>
            );
        });
    }
    return (
        <div className="history">
            <canvas
                ref={props.chartRef}
                id="myChart"
                width="400"
                height="250"
            />
            <ul className="history__steps">{getPeriods()}</ul>
        </div>
    );
};

export default HistoryComponent;
