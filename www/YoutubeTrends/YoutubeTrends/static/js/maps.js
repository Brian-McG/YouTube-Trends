var alldata; // a global

d3.json("data/all.json", function(error, json) {
    if (error) return console.warn(error);
    alldata = json;
});
console.log(alldata["Gangnam Style"]["Youtube"][0]);
rfill = ['#fef0d9','#fdcc8a','#fc8d59','#e34a33','#b30000'];
bfill = ['#ca0020','#f4a582','#ffffff','#bababa','#404040'];
yfill = ['#ffffb2','#fecc5c','#fd8d3c','#f03b20','#bd0026'];
gfill = ['#ffffcc','#c2e699','#78c679','#31a354','#006837'];
mfill = ['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c'];

c_fil = yfill;

fill = {
    L: c_fil[0],
    LM: c_fil[1],
    M: c_fil[2],
    MH: c_fil[3],
    H: c_fil[4],
    UNKNOWN: 'rgb(0,0,0)',
    defaultFill: 'grey'
};
var lmap = new Datamap({
    element: document.getElementById('leftmap'),
    fills: fill,

    data: alldata["Gangnam Style"]["Youtube"][0],
    geographyConfig: {
        borderColor: 'black',
        borderOpacity: 0.5,
        popupTemplate: function(geo, data) {
            return ['<div class="hoverinfo"><strong>',
                'Popularity in ' + geo.properties.name,
                ': ' + data.popularity,
                '</strong></div>'].join('');
        }
    },
    done: function(datamap) {
        // Zoom - Make this linked
        datamap.svg.call(d3.behavior.zoom().on("zoom", redraw));
        function redraw() {
            datamap.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }
        datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
            // This will be used to set graphs based on click
            alert(geography.properties.name);
        });
    }
});

var rmap = new Datamap({
    element: document.getElementById('rightmap'),
    fills: fill,

    data: alldata["See You Again"]["Youtube"][0],
    geographyConfig: {
        borderColor: 'black',
        borderOpacity: 0.5,
        popupTemplate: function(geo, data) {
            return ['<div class="hoverinfo"><strong>',
                'Popularity in ' + geo.properties.name,
                ': ' + data.popularity,
                '</strong></div>'].join('');
        }
    }
});
var curr = 0;
//window.setInterval(function() {
//    curr = curr + 1;
//    map.updateChoropleth(
//        alldata["Gangnam Style"]["Youtube"][curr]
//    );
//}, 2000);

function setWeek(value){
    lmap.updateChoropleth(
        alldata["Gangnam Style"]["Youtube"][value]
    );
    rmap.updateChoropleth(
        alldata["See You Again"]["Youtube"][value]
    );
}

// Draw a legend for this map
//map.legend();
