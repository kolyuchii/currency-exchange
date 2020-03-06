import Chart from "chart.js";

export default (element, historyRates, range) => {
    const context = element.current.getContext('2d');
    if (!context) {
        return null;
    }
    const labels = [];
    const data = [];
    Object.entries(historyRates).forEach(item => {
        const [
            label,
            value,
        ] = item;
        labels.push(label.split('-')[2]);
        data.push(value[range.to]);
    });
    new Chart(element.current.getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${range.from} -> ${range.to}`,
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