/**
 * Line graph showing global google search, youtube search and comment trends over a set period
 */

var chart = null;
var colors = ['#1F77B4', '#EF5656', '#EF5656'];

function generate_line_graph() {
    chart = c3.generate({
        bindto: '#line_graph_1',
        data: {
            url: 'gangnam.csv',
            colors: {
                google: '#1F77B4',
                youtube: '#EF5656',
                youtubeComments: '#2CA02C'
            },
            names: {
                google: 'Google',
                youtube: 'Youtube',
                youtubeComments: 'Youtube Comments'
            }
        },
        axis: {
            x: {
                max: 52,
                min: 1,
                padding: {top: 0, bottom: 0},
                ticks: 1
            },
            y: {
                max: 100,
                min: 0,
                padding: {top: 20, bottom: 0}
            }
        },
        grid: {
            x: {
                lines: [
                    {value: 1},
                ]
            }
        },
        zoom: {
            enabled: true
        },
        tooltip: {
            format: {
                title: function (d) {
                    return 'Week ' + d;
                },
                value: function (value, ratio, id) {
                    return value + "%";
                }
            }
        },
        legend: {
            show: false
        }
    });
    d3.select('#line_graph_1_legend').insert('div').attr('class', 'legend').selectAll('span')
        .data(['google', 'youtube', 'youtubeComments'])
        .enter().append('span')
        .attr('data-id', function (id) {
            return id;
        })
        .html(function (id) {
            if(id == 'google') {
                return '<div><img src="google-icon.png" alt="Test Image" width="20" height="20"/></div><div>Google</div>';
            } else if (id == 'youtube') {
                return 'Youtube';
            } else if (id == 'youtubeComments') {
                return 'Youtube Comments';
            } else {
                return id;
            }
        })
        .each(function (id) {
            d3.select(this).style('background-color', chart.color(id));
        })
        .on('mouseover', function (id) {
            chart.focus(id);
        })
        .on('mouseout', function (id) {
            chart.revert();
        })
        .on('click', function (id) {
            chart.toggle(id);
        });
    console.log(chart.data.colors());
}

function setAxisGrid(value) {
    if (chart != null) {
        chart.internal.loadConfig({
            transition: {
                duration: 0
            }
        });
        chart.xgrids([{value: value}]);
        chart.internal.loadConfig({
            transition: {
                duration: 350
            }
        });
    }
}