/**
 * Created by Bryce on 2016/03/08.
 */
//Gets info when a video is selected and changes the pic accordingly
function changeVariableLeft() {

    //console.log(selectedItem.text);
    d3.tsv("data/example.tsv", function (rows) {
        assignValuesLeft(rows);
    });
}

//Assigns a value to the various data points
function assignValuesLeft(rows) {
    index = rows.findIndex(matchLeft)
    var selectCtrl = document.getElementById("trend_type");
    var selectedItem = selectCtrl.options[selectCtrl.selectedIndex];
    var name = selectedItem.value;
    if(name == "Google"){
        $('#NameGoogle').text(rows[index].Name);
        $('#ViewGoogle').text(rows[index].Views);
        $('#DatePub').text(rows[index].DatePublished);
    }else {
        $('#Name').text(rows[index].Name);
        $('#Likes').text(rows[index].Likes);
        $('#Dislikes').text(rows[index].Dislikes);
        $('#Views').text(rows[index].Views);
        $('#Date').text(rows[index].DatePublished);
    }
    changePicLeft()
    changeIconLeft()
}
//Matches the names selected to get the correct data
function matchLeft(element){
    var selectCtrl = document.getElementById("file_type");
    var selectedItem = selectCtrl.options[selectCtrl.selectedIndex];
    return element.Name == selectedItem.text
}


//Changes the icon for google trends or youtube
function changeIconLeft() {
    var selectCtrl = document.getElementById("trend_type");
    var selectedItem = selectCtrl.options[selectCtrl.selectedIndex];
    var name = selectedItem.value;
    if(name=="Google"){
        $('#Symbol').attr("src","images/Google.png");
        $('#Symbol').height(50);
        $('#Symbol').width(50);
        $('#WritingYoutube').hide();
        $('#WritingGoogle').show();

    }else{
        $('#Symbol').attr("src","images/Youtube.png");
        $('#Symbol').height(40);
        $('#Symbol').width(60);
        $('#WritingGoogle').hide();
        $('#WritingYoutube').show();
    }

}
//Changes the picture of the video
function changePicLeft() {
    var selectCtrl = document.getElementById("file_type");
    var selectedItem = selectCtrl.options[selectCtrl.selectedIndex];
    var name = selectedItem.value;
    var src = $('#Icon').attr("src","Images/"+name+".png");
    $(this).attr("src", src);
}
