var imgInput
var imgData;

//Ajax Api code to parse data from the CSV file
$(document).ready(function(){
    $.ajax({
     url:"Museum_Quiz_Data.csv",
     dataType:"text",
     success:function(data)
     {
      imgInput = data.split(/\r?\n|\r/);
      imgData = new Array(imgInput.length);

      for(var i=0; i<imgInput.length; ++i) {
        imgData[i] = imgInput[i].split(",");
      }
     }
   });
});

/*Script for the expanded image
  Shows the clicked image as a larger image on the side
  val contains the image id that is to be displayed*/
function ChangeExpandedIMG(val) { 
    var image = document.getElementById('ExpandIMG');
    var image_id = Number(val);

    var txt = "static/code/GroupingImages/static/images/BCLCimagesHighchart/webp/".concat(image_id, ".webp");
    image.src = txt;

}

/*Script for the Image Details
  Displays the Image details such as ID and Artist
  val contains the image id that is to be displayed*/
function ChangeIMGDetails(val) {

    var image_id = Number(val);
    document.getElementById("detail-ID").innerHTML = "ID: " + imgData[image_id+1][0];
    document.getElementById("detail-Artist").innerHTML = "Artist: " + imgData[image_id+1][1];
    document.getElementById("detail-PaintingName").innerHTML = "Painting Name: " + imgData[image_id+1][2];
    document.getElementById("detail-Year").innerHTML = "Year: " + imgData[image_id+1][3];
}

/*Event Proxy activate on Mouse Click*/
notifyMouseClickProxy = new Proxy({}, {
  set: function(target, property, value) {
    
    // do something
    //value contains the image if of the particular image that has been clicked
    console.log("id=" +  value);
    //target[property] = value;

    ChangeExpandedIMG(value); //Function to Display Expanded image
    ChangeIMGDetails(value);  //Function to Display image details
  
  return true;
  }
});