/**
 * Line graph showing global google search, youtube search and comment trends over a set period
 */

var chart = [null, null, null];
var colors = ['#1F77B4', '#EF5656', '#EF5656'];
var isMerged = false;
var legendGenerated = [false, false];

function fetchRows(index, bindDom, dataFileName) {
    d3.csv("data/" + dataFileName, function (rows) {
        var dataset = rows.map(function (d) {
            return [+d["google"], +d["youtube"], +d["youtubeComments"]];
        });
        dataset.unshift(["google", "youtube", "youtubeComments"])
        generate_line_graph(index, bindDom, dataset)
    });
}

function fetchRowsFromTwoFiles(index, bindDom, dataFileNameOne, displayNameOne, dataFileNameTwo, displayNameTwo) {
    d3.csv("data/" + dataFileNameOne, function (rows) {
        d3.csv("data/" + dataFileNameTwo, function (otherRows) {
            var mapFuntion = function (d) {
                return [+d["google"], +d["youtube"], +d["youtubeComments"]];
            }
            var datasetOne = rows.map(mapFuntion);
            datasetOne.unshift([displayNameOne + " Google", displayNameOne + " Youtube", displayNameOne + " Youtube Comments"]);
            var datasetTwo = otherRows.map(mapFuntion);
            datasetTwo.unshift([displayNameTwo + " Google", displayNameTwo + " Youtube", displayNameTwo + " Youtube Comments"]);
            for (var i = 0; i < datasetOne.length; ++i) {
                datasetOne[i] = datasetOne[i].concat(datasetTwo[i]);
            }
            generate_line_graph(index, bindDom, datasetOne)

            // Set the styling on each pair of lines
            var googleLines = $('path[class*="c3-line-"][class$="-Google"]');
            for (var i = 0; i < googleLines.length; ++i) {
                googleLines[i].style.strokeDasharray = "5, 5, 5, 5, 5, 5, 10, 5, 10, 5, 10, 5";
                googleLines[i].style.strokeWidth = "2px";
            }

            var youtubeLines = $('path[class*="c3-line-"][class$="-Youtube"]');
            for (var i = 0; i < youtubeLines.length; ++i) {
                youtubeLines[i].style.strokeDasharray = "1,1";
                youtubeLines[i].style.strokeWidth = "4px";
            }

            var youtubeCommentsLines = $('path[class*="c3-line-"][class$="-Youtube-Comments"]');
            for (var i = 0; i < youtubeCommentsLines.length; ++i) {
                youtubeCommentsLines[i].style.strokeDasharray = "";
                youtubeCommentsLines[i].style.strokeWidth = "1px";
            }
        });
    });

}

function generate_line_graph(index, bindDom, rows) {
    chart[index] = c3.generate({
        bindto: bindDom,
        data: {
            rows: rows,
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
        color: {
            pattern: ['#6a51a3', '#807dba', '#4a1486', '#e6550d', '#8c2d04', '#fd8d3c']
        },
        axis: {
            x: {
                max: 52,
                min: 1,
                padding: {top: 0, bottom: 0},
                tick: {
                    culling: {
                        max: 24
                    }
                },
                label: {
                    text: 'Week',
                    position: 'outer-center'
                }
            },
            y: {
                max: 100,
                min: 0,
                padding: {top: 20, bottom: 0},
                label: {
                    text: 'Popularity Index (%)',
                    position: 'outer-middle'
                }
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
            show: index == 2
        }
    });

    // Not working at the moment
    /*
     var line = d3.svg.line()
     .tension(0) // Catmull–Rom
     .interpolate("cardinal-closed");

     // Set line to dashed
     d3.select('#line_graph_1, .c3-line-google')
     .style("stroke-width", "10px")
     .style("stroke", "#ddd")
     .style("stroke-dasharray", "4,4")
     .attr("d", line);
     */

    // Add a custom legend
    if (index != 3 && !legendGenerated[index]) {
        d3.select(bindDom + '_legend').insert('div').attr('class', 'legend').selectAll('span')
            .data(['google', 'youtube', 'youtubeComments'])
            .enter().append('span')
            .attr('data-id', function (id) {
                return id;
            })
            .html(function (id) {
                if (id == 'google') {
                    return '<img  src="images/google-icon-2.png" alt="Like" style="width:20px;height:20px;vertical-align: bottom;"> Google';
                } else if (id == 'youtube') {
                    return '<img src="images/youtubeLegendIcon.png" alt="Like" style="width:20px;height:20px;vertical-align: bottom;"> Youtube';
                } else if (id == 'youtubeComments') {
                    return '<img src="images/comment-icon.png" alt="Like" style="width:20px;height:20px;vertical-align: bottom;"> Youtube Comments';
                } else {
                    return id;
                }
            })
            .each(function (id) {
                //d3.select(this).style('background-color', chart.color(id));
            })
            .on('mouseover', function (id) {
                chart[index].focus(id);
            })
            .on('mouseout', function (id) {
                chart[index].revert();
            })
            .on('click', function (id) {
                chart[index].toggle(id);
                if (d3.select(this).style()[0][0].style.opacity == null || d3.select(this).style()[0][0].style.opacity == '' || d3.select(this).style()[0][0].style.opacity == 1) {
                    d3.select(this).style({opacity: 0.5});
                    chart[index].revert();
                } else {
                    d3.select(this).style({opacity: 1});
                    chart[index].focus(id);
                }
            });
        legendGenerated[index] = true;
    }
}

function setAxisGrid(value) {
    for (var i = 0; i < chart.length; ++i) {
        if (chart[i] != null) {
            // Disable transition animation
            chart[i].internal.loadConfig({
                transition: {
                    duration: 0
                }
            });

            //Update value
            chart[i].xgrids([{value: value}]);

            // Re-enable transition animation
            chart[i].internal.loadConfig({
                transition: {
                    duration: 350
                }
            });
        }
    }
}

function mergeClick() {
    if (isMerged) {
        $("#merge_line_graph_button").text("Merge Graph");
        $("#merge_container").hide();
        $("#left_container").show();
        $("#right_container").show();
    } else {
        $("#merge_line_graph_button").text("Un-merge Graph");
        $("#left_container").hide();
        $("#right_container").hide();
        $("#merge_container").show();
    }
    isMerged = !isMerged;
}