//variable declaration
var dataSets = [];
//process data sets for the chart
function ProcessDataSets(data) {
    GetDataSets(data);
    $('#loading').hide();
    //calls the method to draw the chart
    DrawCharts();
}

$(document).ready(function () {
    //Parse the csv
    Papa.parse("./assets/flights_2015_sample.csv", {
        download: true,
        dynamicTyping: true,

        complete: function (results) {
            var data = results.data;
            ProcessDataSets(data);
        }
    });
});

function GetDataSets(data) {
    var departure_delay_index = data[0].indexOf("DEPARTURE_DELAY");
    var arrival_delay_index = data[0].indexOf("ARRIVAL_DELAY");
    data.splice(0, 1);

    data.forEach(e => {
        if (e[departure_delay_index] != null && e[arrival_delay_index] != null) {
            dataSets.push([e[departure_delay_index], e[arrival_delay_index]]);
        }
    });
}

//Draw charts
function DrawCharts() {
    Highcharts.chart('highcharts-figure', {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Departure delay vs Arrival delay Board'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Departure delay'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Arrival delay'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x} mins, {point.y} mins'
                }
            }
        },
        series: [{
            name: 'Delay',
            color: 'rgba(223, 83, 83, .5)',
            data: dataSets
        }]
    });
}

