import React, { Component } from 'react';
import { RouteProps } from 'react-router';
import HistoryComponent from 'ui/history';
import { bindActionCreators } from 'redux';
import { fetchHistory } from 'store/history';
import { connect } from 'react-redux';
import { PERIODS_MAP, PERIODS_ENUM } from 'config';
import AppContainer from 'containers/app';
import createChart, { getChartOptions } from './create-chart';

interface HistoryRates {
    [key: string]: string;
}

interface HistoryProps {
    actions: any;
    historyRates: HistoryRates,
}
interface HistoryState {
    from: string;
    to: string;
}

class HistoryContainer extends Component<HistoryProps & RouteProps, HistoryState> {
    currentPeriod: string;
    elChart: React.MutableRefObject<HTMLCanvasElement>;
    chart: any;
    constructor(props) {
        super(props);

        this.state = {
            from: this.props.match.params.from,
            to: this.props.match.params.to,
        };
        this.currentPeriod = PERIODS_ENUM.WEEK;
        this.elChart = React.createRef();
        this.chart = null;
    }
    render() {
        return (
            <AppContainer
                onClose={this.onClose.bind(this)}
                title="History"
                page={this.getHistory()}
            />
        );
    }
    getHistory() {
        if (!this.props.historyRates) {
            return null;
        }
        return (
            <HistoryComponent
                chartRef={this.elChart}
                periods={Object.entries(PERIODS_MAP).map(period => {
                    const [id] = period;
                    return {
                        id,
                        isActive: id === this.currentPeriod,
                    };
                })}
                onClick={this.changePeriod.bind(this)}
            />
        );
    }

    componentDidUpdate() {
        if (this.chart) {
            const params = getChartOptions(this.props.historyRates, {
                from: this.state.from,
                to: this.state.to,
            });
            this.chart.data = params.data;
            this.chart.update();
        } else {
            this.chart = createChart(this.elChart, this.props.historyRates, {
                from: this.state.from,
                to: this.state.to,
            });
        }
    }

    changePeriod(event) {
        const period = event.currentTarget.id;
        if (period && this.currentPeriod !== period) {
            this.currentPeriod = period;
            this.props.actions.fetchHistory(
                this.state.from,
                this.state.to,
                period
            );
        }
    }

    componentDidMount() {
        this.props.actions.fetchHistory(
            this.state.from,
            this.state.to,
            this.currentPeriod
        );
    }

    onClose() {
        this.props.history.push('/');
    }
}

function mapStateToProps(state) {
    return {
        historyRates: state.history.historyRates,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchHistory,
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer);
