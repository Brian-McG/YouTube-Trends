/**
 * Created by Bryce on 2016/03/08.
 */
//Gets info when a video is selected and changes the pic accordingly
var exstention = ''

function initialLoad(){
  changeVariable('');
}

function changeVariable(side) {
      exstention = side;
      d3.tsv("data/example.tsv", function (rows) {
          assignValues(rows);
      });
}

//Assigns a value to the various data points
function assignValues(rows) {
    index = rows.findIndex(match)
    var selectCtrl = document.getElementById("trend_type"+exstention);
    var selectedItem = selectCtrl.options[selectCtrl.selectedIndex];
    var name = selectedItem.value;
    console.log(rows[index].Name);
    if(name == "Google"){
        $('#NameGoogle'+exstention).text(rows[index].Name);
        $('#Artist'+exstention).text(rows[index].Artist);
        $('#ViewGoogle'+exstention).text(rows[index].Views);
        $('#DatePub'+exstention).text(rows[index].DatePublished);
    }else {
        $('#Name'+exstention).text(rows[index].Name);
        $('#Artist'+exstention).text(rows[index].Artist);
        $('#Likes'+exstention).text(rows[index].Likes);
        $('#Dislikes'+exstention).text(rows[index].Dislikes);
        $('#Views'+exstention).text(rows[index].Views);
        $('#Date'+exstention).text(rows[index].DatePublished);
    }
    changePic()
    changeIcon()
}
//Matches the names selected to get the correct data
function match(element){
    var id = "file_type"+exstention
    var selectCtrl = document.getElementById(id);
    var selectedItem = selectCtrl.options[selectCtrl.selectedIndex];
    return element.Name == selectedItem.text
}


//Changes the icon for google trends or youtube
function changeIcon() {
    var selectCtrl = document.getElementById("trend_type"+exstention);
    var selectedItem = selectCtrl.options[selectCtrl.selectedIndex];
    var name = selectedItem.value;
    if(name=="Google"){
        $('#Symbol'+exstention).attr("src","images/Google.png");
        $('#Symbol'+exstention).height(50);
        $('#Symbol'+exstention).width(50);
        $('#WritingYoutube'+exstention).hide();
        $('#WritingGoogle'+exstention).show();

    }else{
        $('#Symbol'+exstention).attr("src","images/youtubeLegendIcon.png");
        $('#Symbol'+exstention).height(40);
        $('#Symbol'+exstention).width(60);
        $('#WritingGoogle'+exstention).hide();
        $('#WritingYoutube'+exstention).show();
    }

}
//Changes the picture of the video
function changePic() {
    var selectCtrl = document.getElementById("file_type"+exstention);
    var selectedItem = selectCtrl.options[selectCtrl.selectedIndex];
    var name = selectedItem.value;
    var src = $('#Icon'+exstention).attr("src","images/"+name+".png");
    $(this).attr("src", src);
}
