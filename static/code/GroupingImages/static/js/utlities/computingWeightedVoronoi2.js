
//function for computing initial weighted voronoi with no previous position and weight 
//(it has no initialPosition and initialWeight)

//  nodesCopy is array of objects with following fields:
//  {x:  ,  y:   , weight: , previousX:NaN , previousY:NaN, previousWeight: NaN ,radius:  ,id: index , type:   }	
//  arrayOfFixedPositions is array having ids (index) of fixed nodes 		 
//  xmin ,ymin , width, height  are used to define view coodinates 	 
 

//var myseededprng = new Math.seedrandom('my seed'); // (from seedrandom's doc) Use "new" to create a local pprng without altering Math.random
//var myseededprng = new Math.seedrandom('hello.');
		                                                                 //, xmin ,ymin , width, height
function  computeWeightedInitialLoc0(nodesTmp, parentChildrenMap,totalInitialNodesSize,arrayOfFixedPositionsNodes ,polyCopy){
	
	var simulationWeighted = d3.voronoiMapSimulation(nodesTmp,arrayOfFixedPositionsNodes,0)  
       //.clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]])
	   //.prng(myseededprng) 
	   .clip(polyCopy)
	   .stop();
	   
	   
	    var state = simulationWeighted.state(); 
	   
	    while (!state.ended) { // manually launch each iteration until the simulation ends
         simulationWeighted.tick();
         state = simulationWeighted.state();
        }
		
		var polygons = state.polygons; 
		 //update nodes previous x,y, weight
	   	var cellsNumber1=polygons.length;		
	    for(var index=0; index<cellsNumber1 ; ++index){ 
			  var sitePoly=polygons[index].site;
			  var cell_id=sitePoly.originalObject.data.originalData.id;
			  if(cell_id==null || cell_id==undefined)
				 cell_id=sitePoly.originalObject.data.originalData.n; 
			  //nodesTmp[cell_id].previousX= nodesTmp[cell_id].x;
		      //nodesTmp[cell_id].previousY= nodesTmp[cell_id].y;
			 // nodesTmp[cell_id].previousX= sitePoly.x;
		      //nodesTmp[cell_id].previousY= sitePoly.y;
			  nodesTmp[cell_id].previousWeight= parentChildrenMap.get(cell_id).length/totalInitialNodesSize;
	          
			  
			  //nodesTmp[cell_id].x= sitePoly.x;
		      //nodesTmp[cell_id].y= sitePoly.y;
			  nodesTmp[cell_id].weight= parentChildrenMap.get(cell_id).length/totalInitialNodesSize;
	          //nodesTmp[cell_id].weight=sitePoly.weight;
			  
			  //nodesTmp[cell_id].previousWeight= sitePoly.weight;
			  
			  //nodesTmp[cell_id].previousX= sitePoly.x;
		      //nodesTmp[cell_id].previousY= sitePoly.y;
			 // nodesTmp[cell_id].previousWeight= sitePoly.originalObject.data.weight;
			  
		}
		
       
        return polygons; 	
		
}

                      
function  computeWeightedBasedOnPrevoiusLocW00(nodesTmp, arrayOfFixedPositionsNodes ,polyCopy){
	 var polygons0 = null;
			  try{
				   var simulationWeighted0 = d3.voronoiMapSimulation(nodesTmp,arrayOfFixedPositionsNodes,0)
					//.clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]])
//					.prng(myseededprng) 
					.clip(polyCopy)
				   .initialPosition((d)=>[d.previousX, d.previousY])
				   //.initialWeight((d)=>d.previousWeight);
				   
				   simulationWeighted0.stop();
				   
					var state0 = simulationWeighted0.state(); 
					while (!state0.ended) { // manually launch each iteration until the simulation ends
					  simulationWeighted0.tick();
					  state0 = simulationWeighted0.state();
					}
					
					  polygons0 = state0.polygons; 
					  //totalErr0=computeErrorWeightedWoronoi(polygons0);
				 
			  }catch(err){
				  	
                   // if(isErrorRecorded){
					  //dataAlphaEpsilonBubleWeighted.push({TrialNr: "BubbleWeighted0" ,Alpha: -1, Epsilon:  -1, MinEpsilon: -1 , MaxEpsilon: -1, CellsNumber:-1});			   
				   //    dataAlphaEpsilonBubleWeighted.push({TrialNr:trialNr ,InilizzNr: inilizzNr,CaseNr:"C2.0", CaseName: "BubbleWeighted0",  Alpha: -1, TotalErr:  -1, MinEpsilon: -1 , MaxEpsilon: -1, CellsNumber:-1});			   
					//}
					//computeWeightedInitialLoc0(nodesTmp, arrayOfFixedPositionsNodes, xmin ,ymin , width, height,polyCopy);
					//continue;				  
			  }
			  
			  return polygons0;
	
}


		 
//---------------------------------------------
																				 //xmin ,ymin , width, height){
function  computeWeightedWithFixed(copyNodes, arrayOfFixedPositions,polyCopy){
    /*var simulationWeighted = d3.voronoiMapSimulation(copyNodes,arrayOfFixedPositions,0)  
       //.clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]])
	   	.clip(polyCopy)
	   .stop();*/
	   
	   
	   	var simulationWeighted = d3.voronoiMapSimulation(copyNodes,arrayOfFixedPositions,0)  
       //.clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]])
//	   .prng(myseededprng) 
	   .clip(polyCopy)
	   .stop();
	   
	   var state = simulationWeighted.state(); 
	   
	   while (!state.ended) { // manually launch each iteration until the simulation ends
        simulationWeighted.tick();
        state = simulationWeighted.state();
       }
       
	   var polygons = state.polygons; 
	   //updatecopyNodesPreviousNodes(copyNodes,polygons ,arrayOfFixedPositions, true);	   
	   

		 //update nodes previous x,y, weight
	   	var cellsNumber1=polygons.length;		
	    for(var index=0; index<cellsNumber1 ; ++index){ 
			  var sitePoly=polygons[index].site;
			  var cell_id=sitePoly.originalObject.data.originalData.id;
			  if(cell_id==null || cell_id==undefined)
				 cell_id=sitePoly.originalObject.data.originalData.n; 
			 
			  if(arrayOfFixedPositions.indexOf(cell_id+"")==-1 || isFirst){  //cell_id!=parentIndexStartDragChild 
		         copyNodes[cell_id].previousX= sitePoly.x;
		         copyNodes[cell_id].previousY= sitePoly.y;
                 copyNodes[cell_id].previousWeight= sitePoly.weight;					 	
              }
		  
			 
		}
		
	   return polygons;
}



//compute  weighted voronoi  initial weighted voronoi with empty arrayOfFixedPositions
function  computeWeighted(copyNodes, xmin ,ymin , width, height){
	var arrayOfFixedPositions=[];
    //arrayOfFixedPositions.push(-2);
  
	var simulationWeighted = d3.voronoiMapSimulation(copyNodes , arrayOfFixedPositions)   
       .clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]])
	   .stop();
	   
	   
	   var state = simulationWeighted.state(); 
	   
	   while (!state.ended) { // manually launch each iteration until the simulation ends
        simulationWeighted.tick();
        state = simulationWeighted.state();
       }
       
	   var polygons = state.polygons; 
	   //updatecopyNodesPreviousNodes(copyNodes,polygons , true);	   
	   
	   return polygons;
}

//compute  weighted voronoi based on previous position and weight 
																					//, xmin ,ymin , width, height){
function  computeWeightedBasedOnPrevoius(copyNodes, arrayOfFixedPositions ,polyCopy){ 

   var simulationWeighted = d3.voronoiMapSimulation(copyNodes,arrayOfFixedPositions,0)
				    //.clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]])
					//.prng(myseededprng) 
				   	  .clip(polyCopy)
				   .initialPosition((d)=>[d.previousX, d.previousY])
				   .initialWeight((d)=>d.previousWeight);
				   
				   simulationWeighted.stop();
				   
					var state = simulationWeighted.state(); 
					
					try{
						while (!state.ended) { // manually launch each iteration until the simulation ends
									 simulationWeighted.tick();
									 state = simulationWeighted.state();
						}
					}catch(err){
					     console.log("error");
					     console.log(err);
						 var cells=state.polygons;
						 for(var index=0; index<cells.length ; ++index){ 
							var sitePoly=cells[index].site;	 
							var cell_Id=sitePoly.originalObject.data.originalData.id; 
							if(cell_Id==null || cell_Id==undefined)
							   cell_Id=sitePoly.originalObject.data.originalData.n;
						   
							if(cell_Id==arrayOfFixedPositions[0]){
							  copyNodes[cell_Id].x=parseInt(sitePoly.x);
							  copyNodes[cell_Id].y=parseInt(sitePoly.y);	
                            }							
						}

	
					     computeWeightedBasedOnPrevoius(copyNodes, arrayOfFixedPositions ,polyCopy);//, xmin ,ymin , width, height);
						 // runState(state,simulationWeighted);
						// retry(3, runState( state, simulationWeighted) );
				    }	  
							 
					
					/*try{
				      runState(state,simulationWeighted);
					}catch(err){
						 // runState(state,simulationWeighted);
						// retry(3, runState( state, simulationWeighted) );
				    }*/
					
					


					var polygons = state.polygons; 	   
					
				    updatecopyNodesPreviousNodes(copyNodes, polygons , arrayOfFixedPositions, false);
							  
	                return polygons; 
}


//compute  weighted voronoi based on previous position and weight 
function  computeWeightedBasedOnPrevoiusUpdated(copyNodes, arrayOfFixedPositionsNodes , polyCopy){
//function  computeWeightedBasedOnPrevoius(copyNodes, arrayOfFixedPositionsNodes , xmin ,ymin , width, height){
   var simulationWeighted = d3.voronoiMapSimulation(copyNodes,arrayOfFixedPositionsNodes, 1) 
//				    .clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]])
                   .clip(polyCopy)
				   .initialPosition((d)=>[d.previousX, d.previousY])
				   .initialWeight((d)=>d.previousWeight);
				   
				   simulationWeighted.stop();
				   
					state = simulationWeighted.state(); 
					while (!state.ended) { // manually launch each iteration until the simulation ends
					  simulationWeighted.tick();
					  state = simulationWeighted.state();
					}


					var polygons = state.polygons; 	   
					
				    //updatecopyNodesPreviousNodesUpdated(copyNodes, polygons , arrayOfFixedPositionsNodes, false);
							  
	                return polygons; 
}

var runState = function(state, simulationWeighted) {
					
					      while (!state.ended) { // manually launch each iteration until the simulation ends
								 simulationWeighted.tick();
								 state = simulationWeighted.state();
					      }
						
				    };	
					
					
function retry(maxRetries, fn ) {
  return fn().catch(function(err) { 
    if (maxRetries <= 0) {
      throw err;
    }
    return retry(maxRetries - 1, fn, state, simulationWeighted); 
  });
}

// update node data (previous positions and weights)
function updatecopyNodesPreviousNodes(copyNodes, cells, arrayOfFixedPositions, isFirst){

   for(var index=0; index<cells.length ; ++index){ 
		  var sitePoly=cells[index].site;	
		  
		  var sitePolyX=sitePoly.x;
		  var sitePolyY=sitePoly.y;
		  var sitePolyWeight=sitePoly.weight;
			  
		  var cell_id=sitePoly.originalObject.data.originalData.id;
          if(cell_id==null ||cell_id==undefined)
			  cell_id=sitePoly.originalObject.data.originalData.n;
		  
		  if(arrayOfFixedPositions.indexOf(cell_id+"")==-1 || isFirst){  //cell_id!=parentIndexStartDragChild 
		      copyNodes[cell_id].previousX= sitePolyX;
		      copyNodes[cell_id].previousY= sitePolyY;
              copyNodes[cell_id].previousWeight= sitePolyWeight;					 	
          }else{
		      copyNodes[cell_id].previousX= nodesCopy[cell_id].x;
		      copyNodes[cell_id].previousY= nodesCopy[cell_id].y;			  
		  }
   }

}

// update node data (previous positions and weights)
function updatecopyNodesPreviousNodesUpdated(copyNodes, cells, arrayOfFixedPositionsNodes, isFirst){

   for(var index=0; index<cells.length ; ++index){ 
		  var sitePoly=cells[index].site;	
		  
		  var sitePolyX=sitePoly.x;
		  var sitePolyY=sitePoly.y;
		  var sitePolyWeight=sitePoly.weight;
			  
		  var cell_id=sitePoly.originalObject.data.originalData.id;
		  if(cell_id==null ||cell_id==undefined)
		    cell_id=sitePoly.originalObject.data.originalData.n;
		  
		  if(arrayOfFixedPositionsNodes.indexOf(cell_id+"")==-1 || isFirst){  //cell_id!=parentIndexStartDragChild 
		      copyNodes[cell_id].previousX= sitePolyX;
		      copyNodes[cell_id].previousY= sitePolyY;
              //copyNodes[cell_id].previousWeight= sitePolyWeight;					 	
          }//else{
		   //   copyNodes[cell_id].previousX= copyNodes[cell_id].x;
		   //   copyNodes[cell_id].previousY= copyNodes[cell_id].y;			  
		  //}
   }
   
   return copyNodes;

}


function findBottomLeftWeightedCellID(cells){
   var cell_Id=-1;
   
   for(var index=0; index<cells.length ; ++index){ 
		  var sitePoly=cells[index].site;	   
		  var cellPolygon=Array.from(sitePoly.polygon);
		  
		 //cliping cell with parent polygn
		 for(var y=0; y<cellPolygon.length; ++y){	  
			cellPolygon[y][0]= Math.max(cellPolygon[y][0], xmin);
			cellPolygon[y][0]= Math.min(cellPolygon[y][0], xmax);
			  
			cellPolygon[y][1]=Math.max(cellPolygon[y][1], ymin);
			cellPolygon[y][1]=Math.min(cellPolygon[y][1], ymax);	  
		 }
	
		  var isContain=d3.polygonContains(cellPolygon, pointAtbottomLeft);
		  if(isContain){
		      cell_Id=sitePoly.originalObject.data.originalData.id;
			  break;
		  }
    }
     
    return cell_Id;
	
}


function findPathStartWeightedCellID(cells, polygoneIndex){
   var localpolyCopyDiameterPoints=  allPolygoneDiameter[polygoneIndex];
   var startPathPoint=localpolyCopyDiameterPoints[0];
   var pX=startPathPoint[0];
   var pY=startPathPoint[1];
   
   var polyCopy=polygonalParentCells[polygoneIndex];
   var centerPolygone=d3.polygonCentroid(polyCopy);
   var dx=centerPolygone[0]-pX;
   var dy=centerPolygone[1]-pY;
   
   pX=pX + dx/20;
   pY=pY + dy/20;
   
   var ps=[pX,pY];
	   
    console.log(ps);
	var cell_Id=-1;
	
	for(var index=0; index<cells.length ; ++index){ 
		  var sitePoly=cells[index].site;	   
		  var cellPolygon=Array.from(sitePoly.polygon);
		  
	      var isContain=d3.polygonContains(cellPolygon, ps);
		  if(isContain){
		      cell_Id=sitePoly.originalObject.data.originalData.id;//sitePoly.originalObject.id;
			  break;
		  }
    }
	
		      	
				
	var checkarray=[ 
	 {"x": pX  ,"y":  pY },
	 {"x": localpolyCopyDiameterPoints[1][0]   ,"y":  localpolyCopyDiameterPoints[1][1] }
	];			
	 //parent parent rectangles
	    svg.selectAll('.rectsDiam')
			.remove();
	  
	    svg.selectAll('.rectsDiam')
		.data(checkarray)
		.enter().append("rect")
		  .attr("x", function (d) { return  d.x; }) // x position of rect node
		  .attr("y", function (d) { return   d.y; }) // y position of rect node 
		  .attr("width", function(d,i){ return   5 ; })// initial width of rect  
		  .attr("height", function(d,i){ return  5   ; } )// initial height of rect  
		  .attr("class", "rectsDiam")		  
		  .style("stroke-width", 1) // initial thickhness of border is 1
		  .style("stroke",  "red") // color points
		  .style("fill", "red")//  // color points
		  .append("svg:title") ;
		
		  
		  svg.selectAll(".rectsDiam").raise(); 			
     
    return cell_Id;

}

