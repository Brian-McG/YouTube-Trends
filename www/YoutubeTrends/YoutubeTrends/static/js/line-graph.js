/**
 * Line graph showing global google search, youtube search and comment trends over a set period
 */

var chart = null;
var colors = ['#1F77B4', '#EF5656', '#EF5656'];

function generate_line_graph() {
    chart = c3.generate({
        bindto: '#line_graph_1',
        data: {
            url: 'data/gangnam.csv',
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
                return '<img  src="images/google-icon.png" alt="Like" style="width:20px;height:20px;vertical-align: text-top;"> Google';
            } else if (id == 'youtube') {
                return '<img src="images/youtubeLegendIcon.png" alt="Like" style="width:20px;height:20px;vertical-align: text-top;"> Youtube';
            } else if (id == 'youtubeComments') {
                return '<img src="images/comment-icon.png" alt="Like" style="width:20px;height:20px;vertical-align: text-top;"> Youtube Comments';
            } else {
                return id;
            }
        })
        .each(function (id) {
            //d3.select(this).style('background-color', chart.color(id));
        })
        .on('mouseover', function (id) {
            chart.focus(id);
        })
        .on('mouseout', function (id) {
            chart.revert();
        })
        .on('click', function (id) {
            chart.toggle(id);
            if(d3.select(this).style()[0][0].style.opacity == null || d3.select(this).style()[0][0].style.opacity == '' || d3.select(this).style()[0][0].style.opacity == 1) {
                d3.select(this).style({opacity: 0.5});
                chart.revert();
            } else {
                d3.select(this).style({opacity: 1});
                chart.focus(id);
            }
        });
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