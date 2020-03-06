import React, {Component} from 'react';
import PropTypes from 'prop-types';

import HistoryComponent from 'ui/history';
import {bindActionCreators} from 'redux';
import {
    fetchHistory
} from 'store/history';
import {connect} from "react-redux";
import {
    PERIODS_MAP,
} from 'config';
import AppComponent from "ui/app";
import createChart from './create-chart';

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
            <AppComponent
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
        createChart(this.elChart, this.props.historyRates, {
            from: this.state.from,
            to: this.state.to,
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
};

function mapStateToProps(state) {
    return {
        historyRates: state.history.historyRates,
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
