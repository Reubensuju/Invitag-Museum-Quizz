

//handle slider of Alphamove value changes by user
var slider = document.getElementById("myRange");

slider.oninput = function() {
 
 if(this.value<=Alpha_Opt){
    AlphaMove= this.value;
    console.log("change AlphaMove=" + AlphaMove);
  }
  
} 



document.getElementById("circlesFillCheckboxID").onclick= showCirclesFill;
	   
	   function showCirclesFill(){         
	   
            var checkBox = document.getElementById("circlesFillCheckboxID");
		    var active   = checkBox.checked ;			 
		   
		    if (active == true){
			  circlesFillObacity = 1;
		    }else {
			  circlesFillObacity=0;
		    }		   
	   
	        svg.selectAll("circle").style("fill-opacity", circlesFillObacity); 
            svg.selectAll("circle").style("stroke-opacity", circlesEdgeObacity); 			
							  
	   }
	   
	   
document.getElementById("circlesEdgeCheckboxID").onclick= showCirclesEdge;
	   
	   function showCirclesEdge(){         
	   
            var checkBox = document.getElementById("circlesEdgeCheckboxID");
		    var active   = checkBox.checked ;			 
		   
		    if (active == true){
			  circlesEdgeObacity = 1;
		    }else {
			  circlesEdgeObacity=0;
		    }		   
	   
            svg.selectAll("circle").style("fill-opacity", circlesFillObacity); 
			svg.selectAll("circle").style("stroke-opacity", circlesEdgeObacity); 
						  
	   }	   
	   

  
document.getElementById("polygonsFillCheckboxID").onclick= showPolygonsFill;
	   
	   function showPolygonsFill(){         
	   
            var checkBox = document.getElementById("polygonsFillCheckboxID");
		    var active   = checkBox.checked ;
			 
		    //var newOpacity;
		   
		    if (active == true){
			  
			  polygonsFillObacity = 1;
			  svg.selectAll(".polygonsParent").style('fill',   function(d) {return  NiColor[d.site.originalObject.id];});
		    }else {
			  
			  polygonsFillObacity=0;
			  svg.selectAll(".polygonsParent").style('fill',  "none");// function(d) {return  NiColor[d.site.originalObject.id];})
		    }		   
	   
	        svg.selectAll(".polygonsParent").style("fill-opacity", polygonsFillObacity);				  
	   }	   
	   
	   
	   
	   
	   document.getElementById("polygonsEdgeCheckboxID").onclick= showPolygonsEdge;
	   
	   function showPolygonsEdge(){         
	   
            var checkBox = document.getElementById("polygonsEdgeCheckboxID");
		    var active   = checkBox.checked ;
			 
		    //var newOpacity;
		   
		    if (active == true){
			  polygonsEdgeObacity = 0.5;
		    }else {
			  polygonsEdgeObacity=0;
		    }		   
	   
 
		    svg.selectAll(".polygonsParent").style("stroke-opacity", polygonsEdgeObacity);	
 
			
				  
	   }
	   
	   
	   
	   
	   
	   
	   function saveCsvDataGrandParenTable(){
		   
		   
	       var disabledTime = [];
	       
		   
		   var currentIndex=0;
		   for(var indexG=0; indexG<dataGrandParenTable.length; ++indexG){
		        // if(indexG % 200 == 0 )  //20 parseFloat(dataAlphaEpsilon[indexG].Alpha) == 0.1
				 //   currentIndex=0;				 
					
			     if(disabledTime[currentIndex]==null)
				    disabledTime[currentIndex]=[];



                 disabledTime[currentIndex].push(dataGrandParenTable[indexG].Technique); 
				 disabledTime[currentIndex].push(dataGrandParenTable[indexG].ParentCellID);
				 disabledTime[currentIndex].push(dataGrandParenTable[indexG].TrialID); 
			     disabledTime[currentIndex].push(dataGrandParenTable[indexG].InitID); 
					
		         disabledTime[currentIndex].push(dataGrandParenTable[indexG].BetaValue);
				 disabledTime[currentIndex].push(dataGrandParenTable[indexG].TrajectoryDuration);
					
                 disabledTime[currentIndex].push(dataGrandParenTable[indexG].TStep); 
                			  
				 disabledTime[currentIndex].push(dataGrandParenTable[indexG].IDvertex ); 				 
				 disabledTime[currentIndex].push(dataGrandParenTable[indexG].gdparentX ); 
				 disabledTime[currentIndex].push(dataGrandParenTable[indexG].gdparentY ); 
															
				 ++currentIndex;
										
		   }
		   
		   
		  var csvContent = "data:text/csv;charset=utf-8,";
		  var header= ["Technique","ParentCellID","TrialID","InitID","BetaValue","TrajectoryDuration","TStep","IDvertex","gdparentX","gdparentY"].join(",");
	      csvContent+= header+ "\r\n";
		  
	      disabledTime.forEach(function(rowArray) {
		     row = rowArray.join(",");
		    csvContent += row + "\r\n";
	      });
	 
	      
		  var encodedUri = encodeURI(csvContent);
          //window.open(encodedUri);
		  
		  	var link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "dataGrandParenTable.csv");
			document.getElementById('saveCsvGrandParenTableID').appendChild(link); // Required for FF

			link.click(); 		
					
	   }
	   
	   
	   function saveCsvDataDelaunayTable(){
	   
	       var disabledTime = [];
	       
		   
		   var currentIndex=0;
		   for(var indexG=0; indexG<dataDelaunayTable.length; ++indexG){
		        // if(indexG % 200 == 0 )  //20 parseFloat(dataAlphaEpsilon[indexG].Alpha) == 0.1
				 //   currentIndex=0;				 
					
			     if(disabledTime[currentIndex]==null)
				    disabledTime[currentIndex]=[];



                 disabledTime[currentIndex].push(dataDelaunayTable[indexG].Technique); 
				 disabledTime[currentIndex].push(dataDelaunayTable[indexG].ParentCellID); 
				 disabledTime[currentIndex].push(dataDelaunayTable[indexG].TrialID); 
				 disabledTime[currentIndex].push(dataDelaunayTable[indexG].InitID);				 
				 disabledTime[currentIndex].push(dataDelaunayTable[indexG].BetaValue);
				 disabledTime[currentIndex].push(dataDelaunayTable[indexG].TrajectoryDuration);
                 disabledTime[currentIndex].push(dataDelaunayTable[indexG].TStep); 
	             //disabledTime[currentIndex].push(dataDelaunayTable[indexG].IsMoved);				 
				 disabledTime[currentIndex].push(dataDelaunayTable[indexG].ChildId_Delaunay_edge_start); 				 
				 disabledTime[currentIndex].push(dataDelaunayTable[indexG].ChildId_Delaunay_edge_end); 
															
				 ++currentIndex;
										
		   }
		   
		   
		  var csvContent = "data:text/csv;charset=utf-8,";
		  var header= ["Technique","ParentCellID","TrialID","InitID","BetaValue" , "TrajectoryDuration","TStep","ChildId_Delaunay_edge_start","ChildId_Delaunay_edge_end"].join(",");
	      csvContent+= header+ "\r\n";
		  
	      disabledTime.forEach(function(rowArray) {
		     row = rowArray.join(",");
		    csvContent += row + "\r\n";
	      });
	 
	      
		  var encodedUri = encodeURI(csvContent);
          //window.open(encodedUri);
		  
		  	var link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "dataDelaunayTable.csv");
			document.getElementById('saveCsvDelunyTableID').appendChild(link); // Required for FF

			link.click(); 		
					
					
				
	   }
	   
	   
	   function saveCsvDataAreaTable(){
		   
		   
	       var disabledTime = [];
	       
		   
		   var currentIndex=0;
		   for(var indexG=0; indexG<dataAreaTable.length; ++indexG){
		        // if(indexG % 200 == 0 )  //20 parseFloat(dataAlphaEpsilon[indexG].Alpha) == 0.1
				 //   currentIndex=0;				 
					
			     if(disabledTime[currentIndex]==null)
				    disabledTime[currentIndex]=[];



                 disabledTime[currentIndex].push(dataAreaTable[indexG].Technique); 
				 disabledTime[currentIndex].push(dataAreaTable[indexG].ParentCellID); 
				 disabledTime[currentIndex].push(dataAreaTable[indexG].TrialID); 
				 disabledTime[currentIndex].push(dataAreaTable[indexG].InitID);
				 
				 disabledTime[currentIndex].push(dataAreaTable[indexG].BetaValue);
				 disabledTime[currentIndex].push(dataAreaTable[indexG].TrajectoryDuration);
                 disabledTime[currentIndex].push(dataAreaTable[indexG].TStep); 
	             disabledTime[currentIndex].push(dataAreaTable[indexG].IsMoved); 
		          
				 
				 disabledTime[currentIndex].push(dataAreaTable[indexG].ChildCellID ); 				 
				 disabledTime[currentIndex].push(dataAreaTable[indexG].AreaCell ); 
															
				 ++currentIndex;
										
		   }
		   
		   
		  var csvContent = "data:text/csv;charset=utf-8,";
		  var header= ["Technique","ParentCellID","TrialID","InitID", "BetaValue", "TrajectoryDuration","TStep","IsMoved","ChildCellID","AreaCell"].join(",");
	      csvContent+= header+ "\r\n";
		  
	      disabledTime.forEach(function(rowArray) {
		     row = rowArray.join(",");
		    csvContent += row + "\r\n";
	      });
	 
	      
		  var encodedUri = encodeURI(csvContent);
          //window.open(encodedUri);
		  
		  	var link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "dataAreaTable.csv");
			document.getElementById('saveCsvAreaTableID').appendChild(link); // Required for FF

			link.click(); 		
					
	   }
	   
	   
	   
	   function saveCsvBubbles(){
	   	   
	      var disabledTime = [];
		  
		 /* for(var t=0; t< 11 ; ++t ){
		     disabledTime[t]=[];
			 disabledTime[t].push(t);
		  }
		  
		  
		  var currentIndex=0;
		  for(var indexG=0; indexG<dataMoveEpsilon.length; ++indexG){
		      currentIndex=indexG % 11 ;
              disabledTime[currentIndex].push(dataMoveEpsilon[indexG].Epsilon);		  
		  }
				  
			*/	  
				  
		  var currentIndex=0;
		  for(var indexG=0; indexG<dataMoveEpsilon.length; ++indexG){
		        // if(indexG % 200 == 0 )  //20 parseFloat(dataAlphaEpsilon[indexG].Alpha) == 0.1
				 //   currentIndex=0;				 
					
			     if(disabledTime[currentIndex]==null)
				    disabledTime[currentIndex]=[];
					
			     /*disabledTime[currentIndex].push(dataMoveEpsilon[indexG].TStep);
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].Epsilon);
			     disabledTime[currentIndex].push(dataMoveEpsilon[indexG].MinEpsilon);
                 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].MaxEpsilon);
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].MisMatchNr);
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].CellsNumber);
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].BetaValue);
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].MouseDuration);				 
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].PID);
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].AreaTID);
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].posXt);
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].posYt);
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].posXtmouse);
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].posYtmouse);
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].RadiusRt);*/
				 
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].Technique);
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].TStep);   
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].IsMove); 
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].PID); 															 
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].posXt); 
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].posYt); 															 
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].RadiusRt); 													
//				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].VertPowerID); 
//				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].PowerX); 
//				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].PowerY); 
				// disabledTime[currentIndex].push(dataMoveEpsilon[indexG].EdgePolyVertex); 
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].InitID); 
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].TrialID); 
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].PolyID); 
				 disabledTime[currentIndex].push(dataMoveEpsilon[indexG].RecodedTimeMouseDuration); 

															
				 ++currentIndex;
		  }
		  

		  
	      var csvContent = "data:text/csv;charset=utf-8,";
		  var header= ["Technique","TStep","IsMove","PID","posXt","posYt","RadiusRt","InitID","TrialID","PolyID","RecodedTimeMouseDuration"].join(",");
	      csvContent+= header+ "\r\n";
		  
	      disabledTime.forEach(function(rowArray) {
		     row = rowArray.join(",");
		    csvContent += row + "\r\n";
	      });
	 
	      
		  var encodedUri = encodeURI(csvContent);
          //window.open(encodedUri);
		  
		  	var link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "my_data_Bubbles.csv");
			document.getElementById('saveCsvBubblesID').appendChild(link); // Required for FF

			link.click(); 		
			
	   }
	   
	   
	   
	   function saveCsvWeighted(){

          var disabledTime = [];
		  /*disabledTime.length=0;
		   
		  for(var t=0; t< 11 ; ++t ){
		     disabledTime[t]=[];
			 disabledTime[t].push(t);
		  }
		  
		  
		  var currentIndex=0;
		  for(var indexG=0; indexG<dataMoveWeightedEpsilon.length; ++indexG){
		      currentIndex=indexG % 11 ;
              disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].Epsilon);		  
		  }*/
		  
		  
		   var currentIndex=0;
		  for(var indexG=0; indexG<dataMoveWeightedEpsilon.length; ++indexG){
		         //if(indexG % 200 == 0 )  //20parseFloat(dataAlphaEpsilon[indexG].Alpha) == 0.1
				    //currentIndex=0;				 
					
			     if(disabledTime[currentIndex]==null)
				    disabledTime[currentIndex]=[];
					
			     /*disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].TStep);
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].Epsilon);
			     disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].MinEpsilon);
                 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].MaxEpsilon);
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].MisMatchNr);
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].CellsNumber);
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].MouseDuration);				 
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].PID);
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].AreaTID);
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].posXt);
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].posYt);
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].posXtmouse);
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].posYtmouse);*/
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].Technique);
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].TStep);   
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].IsMove); 
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].PID); 															 
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].posXt); 
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].posYt); 															 
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].RadiusRt); 													
				 //disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].VertPowerID); 
				 //disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].PowerX); 
				 //disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].PowerY); 
				// disabledTime[currentIndex].push(dataMoveEpsilon[indexG].EdgePolyVertex); 
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].InitID); 
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].TrialID); 
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].PolyID); 
				 disabledTime[currentIndex].push(dataMoveWeightedEpsilon[indexG].RecodedTimeMouseDuration); 
				 
				 
				 ++currentIndex;
		  }
				  
	      var csvContent = "data:text/csv;charset=utf-8,";
	      var header= ["Technique","TStep","IsMove","PID","posXt","posYt","RadiusRt","InitID","TrialID","PolyID","RecodedTimeMouseDuration"].join(",");
	      csvContent+= header+ "\r\n";
		  
	      disabledTime.forEach(function(rowArray) {
		     row = rowArray.join(",");
		    csvContent += row + "\r\n";
	      });
	 
	      
		  var encodedUri = encodeURI(csvContent);
          //window.open(encodedUri);
		  
		  	var link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "my_data_weighted.csv");
			document.getElementById('saveCsvWeightedID').appendChild(link); // Required for FF

			link.click(); 		
			
	       
			
	   }
	   