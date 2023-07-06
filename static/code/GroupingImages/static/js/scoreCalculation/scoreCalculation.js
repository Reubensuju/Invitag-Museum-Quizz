var scoreInput;
var scoreData;
var mismatchScore;
var colorRGB;

//Ajax Api code to parse data from the CSV file
$(document).ready(function(){
    $.ajax({
     url:"Museum_Quiz_Data.csv",
     dataType:"text",
     success:function(data)
     {
        scoreInput = data.split(/\r?\n|\r/);
        scoreData = new Array(scoreInput.length); //Array that contains Data in CSV file
        for(var i=0; i<scoreInput.length; ++i) {
          scoreData[i] = scoreInput[i].split(",");
        }
        calculateScore(); //Function to calculate Score and Mismatch
     }
   });
});

/*Function to calculate Score and Mismatch
Score is Displayed on ScoreBar
Mismatch is found using Mismatch button*/

function calculateScore() {

    /*getUserData() gets the grouping from the user inputed in invitag and stored in string userDataGlobal */
    var userDataGlobal=getUserData();
    var userInput = userDataGlobal.split(/\r?\n|\r/);
    var userData = new Array(userInput.length); //Array that contains the user created groups
    for(var i=0; i<userInput.length; ++i) {
        userData[i] = userInput[i].split(",");
    }
        
    /*TP -> True Positive; TN -> True Negative; FP -> False Positive; FN -> False Negative;*/
    var TP = 0, TN = 0, FP = 0, FN = 0;
    var TPk = new Array(scoreInput.length).fill(0);
    var TNk = new Array(scoreInput.length).fill(0);
    var FPk = new Array(scoreInput.length).fill(0);
    var FNk = new Array(scoreInput.length).fill(0);
    mismatchScore = new Array(scoreInput.length);   //Array to store Mismatch score
    colorRGB = new Array(scoreInput.length-1);  //Array to store color of images in RGB format
    
    /*Calculation of Score and Mismatch
      Data in scoreInput contains header
      We start at 1 in order to skip calculation of header line*/
    for(var i=1; i<scoreInput.length; ++i) {
        for(var j=1; j<scoreInput.length; ++j) {
            if(i!=j && i<j){
                if(scoreData[i][4]===scoreData[j][4] && userData[i][1]===userData[j][1]) {
                    TP++;
                    TPk[i]++;
                }
                else if(scoreData[i][4]!==scoreData[j][4] && userData[i][1]!==userData[j][1]) {
                    TN++;
                    TNk[i]++;
                }
                else if(scoreData[i][4]===scoreData[j][4] && userData[i][1]!==userData[j][1]) {
                    FP++;
                    FPk[i]++;
                }
                else if(scoreData[i][4]!==scoreData[j][4] && userData[i][1]===userData[j][1]) {
                    FN++;
                    FNk[i]++;
                }
            }
        }
    }

    //We start at 1 in order to skip calculation of header line
    for(var i=1; i<scoreInput.length; ++i) {
        mismatchScore[i-1] = ((FPk[i]+FNk[i])/(TPk[i]+TNk[i]+FPk[i]+FNk[i]));
    }

    //Calculation for score of ScoreBar
    var score = Math.round(((TP + TN)/(TP+TN+FP+FN))*100);

    //Calculation of Color of images in RGB format
    for(var i=0; i<scoreInput.length-1; ++i) {
        colorRGB[i]=[255, 255*(1-mismatchScore[i]), 255*(1-mismatchScore[i])];
    }
    
    /*ScoreBar Display
      ScoreBar changes color at different scores
      Red for lower scores ; Green for higher Scores*/
    document.getElementsByClassName("scorebar_text")[0].innerHTML = score + "%";
    document.querySelectorAll(".scorebar_fill").forEach(function(element) {
        element.style.width = score + "%";
        if(Number(score)<=25) {
            element.style.background = "red";
        }
        else if(Number(score)<=50) {
            element.style.background = "orange";
        }
        else if(Number(score)<=75) {
            element.style.background = "yellow";
        }
        else {
            element.style.background = "green";
        }
    });
    document.querySelectorAll(".scorebar").forEach(function(element) {
        if(Number(score)<=25) {
            element.style.background = "#e68e8e";
        }
        else if(Number(score)<=50) {
            element.style.background = "#e3ceb3";
        }
        else if(Number(score)<=75) {
            element.style.background = "#e8e3a7";
        }
        else {
            element.style.background = "#aee6a5";
        }
    });
}

/*Fuction to activate Mismatch*/
function showMismatchButton() {
    var x = document.getElementById("showMismatchButtonId"); //Toggle Button for Mismatch
    if (x.value === "Show Mismatch") {
      x.value = "Dont Show Mismatch!";
      var nodesIndexArray = [];     // array that has IDs mismatch of images (Contains all ID)
      for (var i = 0; i < colorRGB.length; i++) {
        nodesIndexArray.push(i);
      }
      
      //highlightCellNodes is treemap api that takes array of IDs  and a color
      //it will highlight background of these images.
        highlightCellNodes(nodesIndexArray,colorRGB);
      
    } 
    else {
      x.value = "Show Mismatch";
      unHighlightCellNodes();   //Function to Unhighlight the backround of all images
    }
  }

/*Event Proxy activate on Mouse Release*/
notifyMouseReleaseProxy = new Proxy({}, {
    set: function(target, property, value) {
		
        calculateScore();   //Function to calculate Score and Mismatch
		
		return true;
    }
});