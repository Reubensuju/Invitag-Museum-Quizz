
//function for computing initial weighted voronoi with no previous position and weight 
//(it has no initialPosition and initialWeight)

//  nodesCopy is array of objects with following fields:
//  {x:  ,  y:   , weight: , previousX:NaN , previousY:NaN, previousWeight: NaN ,radius:  ,id: index , type:   }	
//  arrayOfFixedPositionsNodes is array having ids (index) of fixed nodes 		 
//  xmin ,ymin , width, height  are used to define view coodinates 	 
		 
//---------------------------------------------
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





//compute  weighted voronoi  initial weighted voronoi with empty arrayOfFixedPositionsNodes
/*function  computeWeighted(copyNodes, xmin ,ymin , width, height){
	var arrayOfFixedPositionsNodes=[];
    //arrayOfFixedPositionsNodes.push(-2);
  
	var simulationWeighted = d3.voronoiMapSimulation(copyNodes , arrayOfFixedPositionsNodes)   
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
}*/




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

function  computeWeightedBasedOnPrevoius(nodesTmp, parentChildrenMap,totalInitialNodesSize,arrayOfFixedPositionsNodes ,polyCopy){
	
	var simulationWeighted = d3.voronoiMapSimulation(nodesTmp,arrayOfFixedPositionsNodes,1)  
	   .clip(polyCopy)
	   .initialPosition((d)=>[d.previousX, d.previousY])
	   .initialWeight((d)=>d.previousWeight);
	   
	   simulationWeighted.stop();
	   	   
	    var state = simulationWeighted.state(); 
	   
	    while (!state.ended) { // manually launch each iteration until the simulation ends
         simulationWeighted.tick();
         state = simulationWeighted.state();
        }
		
		var polygons =[];
		polygons.length=0;
		polygons=state.polygons; 
		
		 //update nodes previous x,y, weight
	   	updatecopyNodesPreviousNodes(nodesTmp, polygons, arrayOfFixedPositionsNodes);
		
       
        return polygons; 	
		
}


// update node data (previous positions and weights)
function updatecopyNodesPreviousNodes(nodesTmp, polygons, arrayOfFixedPositionsNodes){
     var cellsNumber1=polygons.length;		
	    for(var index=0; index<cellsNumber1 ; ++index){ 
			 var sitePoly=polygons[index].site;

			 var cell_id=sitePoly.originalObject.data.originalData.n; 

			 
			 if(arrayOfFixedPositionsNodes.indexOf(cell_id)==-1 ){ 
			   	nodesTmp[cell_id].previousX= sitePoly.x;
			    nodesTmp[cell_id].previousY= sitePoly.y;
				nodesTmp[cell_id].previousWeight= sitePoly.weight;
				//var parentArea= d3.polygonArea(polyCopy);
			    //nodesTmp[cell_id]["radius"]=Math.sqrt( sitePoly.weight) ;//Math.sqrt(  parentArea  * nodesTmp[cell_id].weight / Math.PI);
			 }else{
			    nodesTmp[cell_id].previousX= nodesTmp[cell_id].x;
			    nodesTmp[cell_id].previousY= nodesTmp[cell_id].y;					 
			 }
			  
		}

}
                      
function  computeWeightedBasedOnPrevoiusLocW00(nodesTmp, arrayOfFixedPositionsNodes ,polyCopy){
	 var polygons0 = null;
			  try{
				   var simulationWeighted0 = d3.voronoiMapSimulation(nodesTmp,arrayOfFixedPositionsNodes,0)
					//.clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]])
//					.prng(myseededprng) 
					.clip(polyCopy)
				   .initialPosition((d)=>[d.previousX, d.previousY]);
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

