      
   
   //combineData();
   
   function SaveCSVData(){
			
			console.log("SaveCSVData");
			combineData();
			//if(combinedData!=null)
			{
		    console.log(combinedData.length); 
			console.log(combinedData);  
			 
			var rowKeys=Object.keys( combinedData[0] );
			//console.log( rowKeys );
			
			var csvContent = "data:text/csv;charset=utf-8,";
			
			//csvContent += ["x","y","id","GroupID"].join(",")+ "\r\n";
            
            csvContent +=rowKeys.join(",")+ "\r\n";	

            for(var r=0; r<combinedData.length ;++r ){
				var row=combinedData[r];
                var currentRow=Object.values(row).join(",");	
              
                csvContent += currentRow + "\r\n";
			}				
			
		
						
			var encodedUri = encodeURI(csvContent);
			var link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "output.csv");
			document.getElementById('grpupName').appendChild(link); // Required for FF

			link.click(); 
			}			
		}
