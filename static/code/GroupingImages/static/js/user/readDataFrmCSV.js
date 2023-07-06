var fileReadResults=""
//var dataCSVRead=[];
//var useTeleport=false;
var parentTargetTeleport=-1;



function readFile(input) {
  var file = input.files[0];
  var reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
	  fileReadResults+=reader.result;	  
	  dataCSVRead=d3.csvParse(fileReadResults);
	  /*console.log("length");
	  console.log(dataCSVRead.length);
	  console.log("dataCSVRead");
	  console.log(dataCSVRead);*/
	  
      createChart(1510, 1110);	  
  };

  reader.onerror = function() {
    console.log(reader.error);
  };

}


	
function getRadioValue() {
   var value = document.querySelector('input[name="teleportGroup"]:checked').value;
  
   if(value=="radio0"){
	  //useTeleport=false;
	  parentTargetTeleport=-1;
   }else{ 
	  //useTeleport=true;
	  parentTargetTeleport=parseInt(value);
   }
    
  
  
   console.log(parentTargetTeleport);
  
}


function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                console.log(allText);
            }
        }
    }
    rawFile.send(null);
}




/*document.getElementById("teleportCheckboxID").onclick= useTeleportSelection;
	   
function useTeleportSelection(){         

	var checkBox = document.getElementById("teleportCheckboxID");
	var active   = checkBox.checked ;
	
	if (active == true){
	  useTeleport = false;	  
	}else {
	  useTeleport= true;	  
	}

	  var radios = document.getElementsByName("teleportGroup");
	  for (var i = 0, r=radios, l=r.length; i < l;  i++){
		    r[i].checked =false; 
			r[i].disabled = useTeleport;
	  }	
	 
	 
}*/
	   
	   
	   






