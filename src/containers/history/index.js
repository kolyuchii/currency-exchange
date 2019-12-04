import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Chart from 'chart.js';
import HeaderContainer from 'containers/header';
import HistoryComponent from 'ui/history';
import LoadingComponent from 'ui/components/Loading';
import {bindActionCreators} from 'redux';
import {
    fetchHistory
} from 'store/history';
import {connect} from "react-redux";
import {
    PERIODS_MAP,
} from 'config';

class HistoryContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            from: this.props.match.params.from,
            to: this.props.match.params.to,
        };
        this.currentPeriod = '1w';
        this.elChart = React.createRef();
    }
    render() {
        return (
            <div className="app">
                <HeaderContainer
                    onClose={this.onClose.bind(this)}
                    title="History"
                />

                {this.props.historyRates ? this.getHistory() : this.getLoading()}
            </div>
        );
    }
    getLoading() {
        return (
            <LoadingComponent
                networkErrorMessage={this.props.networkErrorMessage}
            />
        );
    }
    getHistory() {
        return (
            <HistoryComponent
                chartRef={this.elChart}
                periods={Object.entries(PERIODS_MAP).map(period => {
                    const [
                        id
                    ] = period;
                    return {
                        id,
                        isActive: id === this.currentPeriod
                    }
                })}
                onClick={this.changePeriod.bind(this)}
            />
        );
    }

    componentDidUpdate() {
        const labels = [];
        const data = [];
        Object.entries(this.props.historyRates).forEach(item => {
            const [
                label,
                value,
            ] = item;
            labels.push(label.split('-')[2]);
            data.push(value[this.state.to]);
        });
        new Chart(this.elChart.current.getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `${this.state.from} -> ${this.state.to}`,
                    backgroundColor: '#C7DFFA',
                    borderColor: '#267BCC',
                    data: data
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false,
                        },
                    }],
                    yAxes: [{
                        ticks: {
                            display: false,
                            beginAtZero: false,
                            suggestedMin: Math.min.apply(Math, data),
                        }
                    }]
                },
                legend: {
                    display: true,
                }
            }
        });
    }

    changePeriod(event) {
        const period = event.currentTarget.id;
        if (period && this.currentPeriod !== period) {
            this.currentPeriod = period;
            this.props.actions.fetchHistory(this.state.from, this.state.to, period);
        }
    }

    componentDidMount() {
        this.props.actions.fetchHistory(this.state.from, this.state.to, this.currentPeriod);
    }

    onClose() {
        this.props.history.push('/');
    }
}

HistoryContainer.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object,
    match: PropTypes.object,
    historyRates: PropTypes.object,
    networkErrorMessage: PropTypes.string,

};

function mapStateToProps(state) {
    return {
        historyRates: state.history.historyRates,
        networkErrorMessage: state.exchange.networkErrorMessage,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchHistory,
        }, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryContainer)
