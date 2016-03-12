/**
 * Created by Bryce on 2016/03/08.
 */
//Gets info when a video is selected and changes the pic accordingly
function changeVariable() {

    //console.log(selectedItem.text);
    d3.tsv("data/example.tsv", function (rows) {
        assignValues(rows);
    });
}

//Assigns a value to the various data points
function assignValues(rows) {
    index = rows.findIndex(match)
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
    changePic()
    changeIcon()
}
//Matches the names selected to get the correct data
function match(element){
    var selectCtrl = document.getElementById("file_type");
    var selectedItem = selectCtrl.options[selectCtrl.selectedIndex];
    return element.Name == selectedItem.text
}


//Changes the icon for google trends or youtube
function changeIcon() {
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
function changePic() {
    var selectCtrl = document.getElementById("file_type");
    var selectedItem = selectCtrl.options[selectCtrl.selectedIndex];
    var name = selectedItem.value;
    var src = $('#Icon').attr("src","Images/"+name+".png");
    $(this).attr("src", src);
}
