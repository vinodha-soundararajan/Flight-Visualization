//global variable declaration
var weekMap = {};

//Get the catergories
function GetCategories(airlinesMap) {
    if (Object.keys(airlinesMap).length != 0)
        return Object.keys(airlinesMap);
}

//Calculate the Series data to draw the chart
function CalculateSeriesData(data, airlinesMap) {
    var seriesData = [];
    var airline_index = data[0].indexOf("AIRLINE");
    var dayOfWeek_index = data[0].indexOf("DAY_OF_WEEK");
    data.splice(0, 1);
    data.forEach(e => {
        var airlineName = e[airline_index];
        var dayOfWeek = e[dayOfWeek_index];

        if (airlineName != null && dayOfWeek != null) {

            if (!(airlineName in airlinesMap)) {
                airlinesMap[airlineName] = true
            }

            if (!(dayOfWeek in weekMap)) {
                weekMap[dayOfWeek] = {};
            }

            if (!(airlineName in weekMap[dayOfWeek])) {
                weekMap[dayOfWeek][airlineName] = 0
            }

            weekMap[dayOfWeek][airlineName] += 1;
        }
    });
    Object.keys(weekMap).forEach(dayOfWeek => {
        trafficCounts = Object.keys(weekMap[dayOfWeek]).map(airline => weekMap[dayOfWeek][airline]);
        seriesData.push({
            name: dayOfWeek,
            data: trafficCounts
        });
    });
    return seriesData;
}

$(document).ready(function () {
    var airlinesMap = {};
    //Parse the csv
    Papa.parse("./assets/flights_2015_sample.csv", {
        download: true,
        dynamicTyping: true,
        complete: function (results) {
            var data = results.data;

            //Calculate the series data to draw the chart 
            var seriesDataCalculated = CalculateSeriesData(data, airlinesMap);
            $('#loading').hide();
            //Draw the chart 
            Highcharts.chart('highcharts-figure', {
                chart: {
                    type: 'bar',
                    zoomType: 'x',
                },
                title: {
                    text: 'Air Carrier Information Board'
                },
                xAxis: {
                    categories: GetCategories(airlinesMap),
                    title: {
                        text: 'Air carriers'
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Total number of flights'
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: seriesDataCalculated
            });
        }
    });
});


