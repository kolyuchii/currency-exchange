import Chart from 'chart.js';
import React from "react";

interface Range {
    from: string;
    to: string;
}
interface HistoryRates {
    [key: string]: string;
}
interface ChartOptions {
    type: string;
    data: any;
    options: any;
}
export default (element: React.MutableRefObject<HTMLCanvasElement>, historyRates: HistoryRates, range: Range) => {
    const context = element.current.getContext('2d');
    if (!context) {
        return null;
    }
    return new Chart(
        element.current.getContext('2d'),
        getChartOptions(historyRates, range)
    );
};

export function getChartOptions(historyRates: HistoryRates, range: Range): ChartOptions {
    const labels = [];
    const data = [];
    Object.entries(historyRates).forEach(item => {
        const [label, value] = item;
        labels.push(label.split('-')[2]);
        data.push(value[range.to]);
    });
    return {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: `${range.from} -> ${range.to}`,
                    backgroundColor: '#C7DFFA',
                    borderColor: '#267BCC',
                    data: data,
                },
            ],
        },
        options: {
            scales: {
                xAxes: [
                    {
                        ticks: {
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            display: false,
                            beginAtZero: false,
                            suggestedMin: Math.min.apply(Math, data),
                        },
                    },
                ],
            },
            legend: {
                display: true,
            },
        },
    };
}
