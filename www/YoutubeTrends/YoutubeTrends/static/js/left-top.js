/**
 * Created by Bryce on 2016/03/08.
 */
//Gets info when a video is selected and changes the pic accordingly
var extension = '';
var assigned = false;

// Set default items
var selectedItems = ['gangnam.csv', 'Gangnam Style', 'gangnam.csv', 'Gangnam Style'];

function changeVariable(side) {
    extension = side;
    d3.tsv("data/song_data.tsv", function (rows) {
        assignValues(rows);
    });
}

//Assigns a value to the various data points
function assignValues(rows) {
    index = rows.findIndex(match)
    var selectCtrl = document.getElementById("trend_type" + extension);
    var selectedItem = selectCtrl.options[selectCtrl.selectedIndex];
    var name = selectedItem.value;
    if (name == "Google") {
        $('#NameGoogle' + extension).text(rows[index].Name);
        $('#ArtistGoogle' + extension).text(rows[index].Artist);
        $('#ViewGoogle' + extension).text(rows[index].Hits);
        $('#DatePub' + extension).text(rows[index].DateReleased);
    } else {
        $('#Name' + extension).text(rows[index].Name);
        $('#Artist' + extension).text(rows[index].Artist);
        $('#Likes' + extension).text(rows[index].Likes);
        $('#Dislikes' + extension).text(rows[index].Dislikes);
        $('#Views' + extension).text(rows[index].Views);
        $('#Comments' + extension).text(rows[index].Comments);
        $('#Date' + extension).text(rows[index].DatePublished);
    }
    changePic();
    changeIcon();
    if(assigned == false) {
        fetchRows(0, '#line_graph_1', selectedItems[0]);
        fetchRows(1, '#line_graph_2', selectedItems[2]);
        fetchRowsFromTwoFiles(2, '#line_graph_merged', selectedItems[0], selectedItems[1], selectedItems[2], selectedItems[3]);
        assigned = true;
    }

    if(extension == '') {
        selectedItems[0] = rows[index].Identifier + '.csv';
        selectedItems[1] = rows[index].Name;
        fetchRows(0, '#line_graph_1', selectedItems[0]);
        setLData(selectedItems[1], name);
    } else {
        selectedItems[2] = rows[index].Identifier + '.csv';
        selectedItems[3] = rows[index].Name;
        fetchRows(1, '#line_graph_2', selectedItems[2]);
        setRData(selectedItems[3], name);
    }
    fetchRowsFromTwoFiles(2, '#line_graph_merged', selectedItems[0], selectedItems[1], selectedItems[2], selectedItems[3]);
}
//Matches the names selected to get the correct data
function match(element) {
    var id = "file_type" + extension
    var selectCtrl = document.getElementById(id);
    var selectedItem = selectCtrl.options[selectCtrl.selectedIndex];
    return element.Name == selectedItem.text
}


//Changes the icon for google trends or youtube
function changeIcon() {
    var selectCtrl = document.getElementById("trend_type" + extension);
    var selectedItem = selectCtrl.options[selectCtrl.selectedIndex];
    var name = selectedItem.value;
    if (name == "Google") {
        $('#Symbol' + extension).attr("src", "images/google-icon-2.png");
        $('#Symbol' + extension).height(40);
        $('#Symbol' + extension).width(40);
        $('#WritingYoutube' + extension).hide();
        $('#WritingGoogle' + extension).show();

    } else {
        $('#Symbol' + extension).attr("src", "images/youtubeLegendIcon.png");
        $('#Symbol' + extension).height(40);
        $('#Symbol' + extension).width(60);
        $('#WritingGoogle' + extension).hide();
        $('#WritingYoutube' + extension).show();
    }

}
//Changes the picture of the video
function changePic() {
    var selectCtrl = document.getElementById("file_type" + extension);
    var selectedItem = selectCtrl.options[selectCtrl.selectedIndex];
    var name = selectedItem.value;
    var src = $('#Icon' + extension).attr("src", "images/" + name + ".png");
    $(this).attr("src", src);
}
