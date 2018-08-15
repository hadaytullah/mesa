var HeatMapChartModule = function(series, canvas_width, canvas_height) {
    // Create the tag:
    var canvas_tag = "<canvas width='" + canvas_width + "' height='" + canvas_height + "' ";
    canvas_tag += "style='border:1px dotted'></canvas>";
    // Append it to #elements
    var canvas = $(canvas_tag)[0];
    $("#elements").append(canvas);
    // Create the context and the drawing controller:
    var context = canvas.getContext("2d");

    var convertColorOpacity = function(hex) {

        if (hex.indexOf('#') != 0) {
            return 'rgba(0,0,0,0.1)';
        }

        hex = hex.replace('#', '');
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
        return 'rgba(' + r + ',' + g + ',' + b + ',0.1)';
    };

    // Prep the chart properties and series:
    var datasets = []
    for (var i in series) {
        var s = series[i];
        var new_series = {
            label: s.Label,
            borderColor: s.Color,
            backgroundColor: convertColorOpacity(s.Color),
            data: []
        };
        datasets.push(new_series);
    }

//    var chartData = {
//        labels: [],
//        datasets: datasets
//    };
    var chartData = {
        labels: ['0h','1h','2h','3h','4h','5h','6h','7h','8h','9h','10h','11h'],
        datasets: [
            {
              label: 'Monday',
              data: [8, 6, 5, 7, 9, 8, 1, 6, 3, 3, 8, 7]
            },
            {
              label: 'Tuesday',
              data: [6, 8, 5, 6, 5, 5, 7, 0, 0, 3, 0, 7]
            },
            {
              label: 'Wednesday',
              data: [8, 5, 6, 4, 2, 2, 3, 0, 2, 0, 10, 8]
            },
            {
              label: 'Thursday',
              data: [4, 0, 7, 4, 6, 3, 2, 4, 2, 10, 8, 2]
            },
            {
              label: 'Friday',
              data: [1, 0, 0, 7, 0, 4, 1, 3, 4, 5, 1, 10]
            }
        ]
    };

    var chartOptions = {
        responsive: true,
        tooltips: {
            mode: 'index',
            intersect: false
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true
                },
                ticks: {
                    maxTicksLimit: 11
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true
                }
            }]
        }
    };

//    var chart = new Chart(context, {
//        type: 'line',
//        data: chartData,
//        options: chartOptions
//    });

    var chart = new Chart2(context).HeatMap(chartData, chartOptions);

    this.render = function(data) {
        chart.data.labels.push(control.tick);
        for (i = 0; i < data.length; i++) {
            chart.data.datasets[i].data.push(data[i]);
        }
        chart.update();
    };

    this.reset = function() {
        while (chart.data.labels.length) { chart.data.labels.pop(); }
        chart.data.datasets.forEach(function(dataset) {
            while (dataset.data.length) { dataset.data.pop(); }
        });
        chart.update();
    };
};
