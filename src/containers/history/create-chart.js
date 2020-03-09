import Chart from 'chart.js';

/**
 * @param {HTMLElement} element
 * @param {object} historyRates
 * @param {string} range
 * @return {Chart|null}
 */
export default (element, historyRates, range) => {
    const context = element.current.getContext('2d');
    if (!context) {
        return null;
    }
    return new Chart(
        element.current.getContext('2d'),
        getChartOptions(historyRates, range)
    );
};

/**
 * @param {object} historyRates
 * @param {string} range
 * @return {object}
 */
export function getChartOptions(historyRates, range) {
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
