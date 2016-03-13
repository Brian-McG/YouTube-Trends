/**
 * Created by Bryce on 2016/03/08.
 */
//Gets info when a video is selected and changes the pic accordingly
function changeVariableRight() {

    //console.log(selectedItem.text);
    d3.tsv("data/example.tsv", function (rows) {
        assignValuesRight(rows);
    });
}

//Assigns a value to the various data points
function assignValuesRight(rows) {
    index = rows.findIndex(matchRight)
    var selectCtrl = document.getElementById("trend_type_right");
    var selectedItem = selectCtrl.options[selectCtrl.selectedIndex];
    var name = selectedItem.value;
    if(name == "Google"){
        $('#NameGoogle_right').text(rows[index].Name);
        $('#ViewGoogle_right').text(rows[index].Views);
        $('#DatePub_right').text(rows[index].DatePublished);
    }else {
        $('#Name_right').text(rows[index].Name);
        $('#Likes_right').text(rows[index].Likes);
        $('#Dislikes_right').text(rows[index].Dislikes);
        $('#Views_right').text(rows[index].Views);
        $('#Date_right').text(rows[index].DatePublished);
    }
    changePicRight()
    changeIconRight()
}
//Matches the names selected to get the correct data
function matchRight(element){
    var selectCtrl = document.getElementById("file_type_right");
    var selectedItem = selectCtrl.options[selectCtrl.selectedIndex];
    return element.Name == selectedItem.text
}


//Changes the icon for google trends or youtube
function changeIconRight() {
    var selectCtrl = document.getElementById("trend_type_right");
    var selectedItem = selectCtrl.options[selectCtrl.selectedIndex];
    var name = selectedItem.value;
    if(name=="Google"){
        $('#Symbol_right').attr("src","images/Google.png");
        $('#Symbol_right').height(50);
        $('#Symbol_right').width(50);
        $('#WritingYoutube_right').hide();
        $('#WritingGoogle_right').show();

    }else{
        $('#Symbol_right').attr("src","images/Youtube.png");
        $('#Symbol_right').height(40);
        $('#Symbol_right').width(60);
        $('#WritingGoogle_right').hide();
        $('#WritingYoutube_right').show();
    }

}
//Changes the picture of the video
function changePicRight() {
    var selectCtrl = document.getElementById("file_type_right");
    var selectedItem = selectCtrl.options[selectCtrl.selectedIndex];
    var name = selectedItem.value;
    var src = $('#Icon_right').attr("src","Images/"+name+".png");
    $(this).attr("src", src);
}
