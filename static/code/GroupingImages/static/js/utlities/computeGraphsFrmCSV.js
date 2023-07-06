var fileReadResults=""
var positionTable="";

function readFile(input) {
  var file = input.files[0];

  var reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
	  fileReadResults+=reader.result;
	  
	  positionTable=d3.csvParse(fileReadResults);
	  console.log("positionTable length");
	  console.log(positionTable.length);
	  //console.log("positionTable");
	  //console.log(positionTable);
	  
	  //Technique,TStep,IsMove,PID,posXt,posYt,RadiusRt,InitID,TrialID,PolyID,RecodedTimeMouseDuration
	  //console.log("PIDLocal");
	  
	  
	  nodes=[];
      nodes.length=0;
	  
	  var oneTimeStepTable=[];
	  var oneTimeStepTableIndex=0;
      var lastStep=positionTable[0].TStep;
				
	  for(var i=0; i<positionTable.length; ++i){
	  
		  	//if(oneTimeStepTable[oneTimeStepTableIndex]==null){
               oneTimeStepTable[oneTimeStepTableIndex]=[];	
			   oneTimeStepTable[oneTimeStepTableIndex].length=0;
			//}
			
			const obj={Technique:  positionTable[i].Technique,			
					  TStep: positionTable[i].TStep, 			
					  IsMoved: positionTable[i].IsMoved,			
					  ChildCellID: positionTable[i].ChildCellID, 
					  posXt: positionTable[i].posXt, 
					  posYt: positionTable[i].posYt, 
					  RadiusRt: positionTable[i].RadiusRt, 
					  InitID: positionTable[i].InitID, 
					  TrialID: positionTable[i].TrialID, 
					  ParentCellID: positionTable[i].ParentCellID,
					  BetaValue: positionTable[i].BetaValue,
					  TrajectoryDuration: positionTable[i].TrajectoryDuration
					  
					  };
														  
														  
														  
			oneTimeStepTable[oneTimeStepTableIndex]["Technique"]= obj.Technique;	
			oneTimeStepTable[oneTimeStepTableIndex]["TStep"]=     obj.TStep ;
			oneTimeStepTable[oneTimeStepTableIndex]["IsMoved"]=    obj.IsMoved ;
			oneTimeStepTable[oneTimeStepTableIndex]["ChildCellID"]=       obj.ChildCellID ;
			oneTimeStepTable[oneTimeStepTableIndex]["posXt"]=     obj.posXt ;
			oneTimeStepTable[oneTimeStepTableIndex]["posYt"]=     obj.posYt ;
			oneTimeStepTable[oneTimeStepTableIndex]["RadiusRt"]=  obj.RadiusRt ;
			oneTimeStepTable[oneTimeStepTableIndex]["InitID"]=    obj.InitID ;
			oneTimeStepTable[oneTimeStepTableIndex]["TrialID"]=   obj.TrialID ;						
            oneTimeStepTable[oneTimeStepTableIndex]["ParentCellID"]=    obj.ParentCellID;

			oneTimeStepTable[oneTimeStepTableIndex]["BetaValue"]=    obj.BetaValue;
			oneTimeStepTable[oneTimeStepTableIndex]["TrajectoryDuration"]=    obj.TrajectoryDuration;
			
         // var newStep=	obj.TStep;		
		 // if(i+1 <positionTable.length)		
         //   newStep=positionTable[i+1].TStep;
		  
		  //if(lastStep!=newStep){			  
		  if( ++oneTimeStepTableIndex==10){
			  
			  creaeteGraphsFrmOneTable(oneTimeStepTable);
			  
			  oneTimeStepTable=[];
			  oneTimeStepTable.length=0;
			  oneTimeStepTableIndex=0; 
		    }
			
			//lastStep=newStep;
			//++oneTimeStepTableIndex;
			
			

	  }
	  
	  
  };

  reader.onerror = function() {
    console.log(reader.error);
  };

}


function creaeteGraphsFrmOneTable(oneTimeStepTable){
	      
		  var oneTablePolysSet = new Set();
          oneTablePolysSet.clear();
		  
		  for(var i=0;i< oneTimeStepTable.length;++i){
			  const ob=oneTimeStepTable[i];
			  //console.log(ob );
			  if(ob.ParentCellID!="-1")
			    oneTablePolysSet.add(ob.ParentCellID);			  
		  }
	
	
		//console.log("oneTablePolysSet");
		//console.log(oneTablePolysSet);
		
	      oneTablePolysSet.forEach(function(polygoneIndex) {
		     var oneStepTableOfPoly=oneTimeStepTable.filter(row => (row.ParentCellID==polygoneIndex));
             //console.log("TStep="+oneStepTableOfPoly[0].TStep);			 
			 //console.log("polygoneIndex "+polygoneIndex);
			 //console.log(oneStepTableOfPoly);			
			 
			 nodes=[];
             nodes.length=0;
			 
			 nodesCopy=[];
			 nodesCopy.length=0;
			 
			 var polyCopy=polygonalParentCells[polygoneIndex];
			 var parentAreaLocal = d3.polygonArea(polyCopy);
			 setParentArea(parentAreaLocal);
				
			 for(var i=0; i<oneStepTableOfPoly.length; ++i){	
			        if(parseInt(oneStepTableOfPoly[i].ChildCellID )!=-1){
			            nodes.push({x: parseInt(oneStepTableOfPoly[i].posXt) ,
			            y: parseInt(oneStepTableOfPoly[i].posYt) ,
						radius: parseInt(oneStepTableOfPoly[i].RadiusRt),
						id: oneStepTableOfPoly[i].ChildCellID,
						type: 1 });
						
						
						
					}					
			 }
			 
			 for(var Nindex=0; Nindex<nodes.length; ++Nindex){ 
			    nodes[Nindex].weight=Math.PI * Math.pow(nodes[Nindex].radius , 2) /parentAreaLocal;
				 
			   // nodes[Nindex].previousX= NaN  ;
				//nodes[Nindex].previousY= NaN   ;
				//nodes[Nindex].previousWeight= NaN;
				
				
			 }
			 
			/* for(var Nindex=0; Nindex<nodes.length; ++Nindex){ 
			    
				
	           nodesCopy.push({x: nodes[Nindex].x,
			   y: nodes[Nindex].y  ,
			   weight:Math.PI * Math.pow(nodes[Nindex].radius , 2) /parentAreaLocal, 
			   previousX:NaN , 
			   previousY:NaN, 
			   previousWeight: NaN ,
			   radius: nodes[Nindex].radius,
			   id: nodes[Nindex].id,
			   type: nodes[Nindex].type }); 		 
             }*/
			 
			/*for(var Nindex=0; Nindex<nodes.length; ++Nindex){   
			             nodesCopy[Nindex]=[];		 
						 nodesCopy[Nindex].x=  nodes[Nindex].x   ;
						 nodesCopy[Nindex].y=  nodes[Nindex].y   ;
						 nodesCopy[Nindex].radius=  nodes[Nindex].radius   ;
						 nodesCopy[Nindex].id= nodes[Nindex].id   ;
						 nodesCopy[Nindex].type= nodes[Nindex].type   ;
						 
						 nodesCopy[Nindex].weight=Math.PI * Math.pow(nodes[Nindex].radius , 2) /parentAreaLocal;// recompute weight from radius
						 nodesCopy[Nindex].previousX= NaN  ;
						 nodesCopy[Nindex].previousY= NaN   ;
						 nodesCopy[Nindex].previousWeight= NaN;
						 
			}*/
						 
			 

			 
			if(oneStepTableOfPoly[0].Technique=="BUBBLE"){		
				 computePolyCircles(polyCopy);
				 //drawCicles();
				 var cells =computePowerDiagram(nodes, polyCopy);
				 drawVoronoiCells(cells);
				// drawCicles();
				 //drawAllDealunyNearestNeighber(cells);
				 //drawRectCircleCenter(cells);
								    
									
				 computeDelaunayTable(cells,oneStepTableOfPoly, "BUBBLE");
				 computeAreaTable(cells,oneStepTableOfPoly, "BUBBLE");
				 
			 }else if(oneStepTableOfPoly[0].Technique=="WEIGHTED"){
				 //computePolyCircles(polyCopy);
				 //drawCicles();
				 var cells =computePowerDiagram(nodes, polyCopy);
				 drawVoronoiCells(cells);
				// drawCicles();
				 //drawAllDealunyNearestNeighber(cells);
				 //drawRectCircleCenter(cells);
				 

				 computeDelaunayTable(cells,oneStepTableOfPoly, "BUBBLE");//here we compute power Digrams that why we put BUBBLE  
				 computeAreaTable(cells,oneStepTableOfPoly, "BUBBLE");

				 /* var arrayOfFixedPositionsNodesSim=[];
		          arrayOfFixedPositionsNodesSim.length=0;
		          
				  var cells=computeWeightedWithFixed(nodesCopy, arrayOfFixedPositionsNodesSim, polyCopy);
				  
                
				  cells =computeWeightedBasedOnPrevoius(nodesCopy, arrayOfFixedPositionsNodesSim , polyCopy);//, xmin ,ymin , width, height);				                      							 
				  drawWeightedVoronoiCells(cells);
				  drawRectWeightedVoronoi(cells);
			*/
				 
			 
			 }
			
            
			var tStep=oneStepTableOfPoly[0].TStep;
            if( tStep == "start"||tStep == "0"|| tStep == "19"||tStep == "POS_FINAL"||tStep == "WEIGHT_FINAL" ){
				   
				   computeGrandParentTable(oneStepTableOfPoly,polygoneIndex);

			}				
			

			
		  });
	
			  	
}


	  
function computeGrandParentTable(oneStepTableOfPoly, polygoneIndex){
	var polyCopy=polygonalParentCells[polygoneIndex];
	
	for(var i=0; i<polyCopy.length; ++i){
	   var x=polyCopy[i][0];
	   var y=polyCopy[i][1];
				
	   
	   const obj={Technique: oneStepTableOfPoly[0].Technique,			
					  TStep: oneStepTableOfPoly[0].TStep, 								
					  InitID: oneStepTableOfPoly[0].InitID, 
					  TrialID: oneStepTableOfPoly[0].TrialID, 
					  ParentCellID: oneStepTableOfPoly[0].ParentCellID,
					  BetaValue: oneStepTableOfPoly[0].BetaValue,
                      TrajectoryDuration: oneStepTableOfPoly[0].TrajectoryDuration,
					  IDvertex: i,
					  gdparentX: x,
	                  gdparentY: y};
	   
	   dataGrandParenTable.push(obj);
	   
	}		
			
	
	
}



function getAllDealunyNearestNeighberFrmCSV(cells, techniqe){
	
	var delunyEdges=[];
	var cellpolygonEdges=[];
	var midP=[];
	var nodesNeibureMap=new Map();
    for(var ind=0; ind<cells.length ; ++ind){

		  var sitePoly=cells[ind].site;	
		  	
			
		  var cell_Id="";
		  if(techniqe=="BUBBLE"){
		       cell_Id=sitePoly.originalObject.id;
		  }else if(techniqe=="WEIGHTED"){
		       cell_Id=sitePoly.originalObject.data.originalData.id;
		   }
		  nodesNeibureMap.set(cell_Id,[]);
		  
		  var cellpolygon=Array.from(sitePoly.polygon);
		  
		 /* for(var y=0; y<cellpolygon.length; ++y){	  
			cellpolygon[y][0]= Math.max(cellpolygon[y][0], xmin);
			cellpolygon[y][0]= Math.min(cellpolygon[y][0], xmax);
			  
			cellpolygon[y][1]=Math.max(cellpolygon[y][1], ymin);
			cellpolygon[y][1]=Math.min(cellpolygon[y][1], ymax);	  
		 }*/
		 
		 //console.log("cellpolygon");	
	     //console.log(cellpolygon);
		  

	
		  for(var index=0; index<cellpolygon.length ; ++index){ 	   
			   if(index<cellpolygon.length-1){
				   				 
				 var edge={x1:cellpolygon[index][0], y1: cellpolygon[index][1], x2:cellpolygon[index+1][0], y2: cellpolygon[index+1][1], cell_Id:cell_Id};
				 var len=checkEdgeExist(edge,cellpolygonEdges);
				 var lenReverrse=checkEdgeReverseExist(edge,cellpolygonEdges);
				 if((len + lenReverrse)==0){
				   cellpolygonEdges.push(edge);				   
				 }
			   
			   }else{
				   var edge= {x1:cellpolygon[index][0], y1: cellpolygon[index][1], x2:cellpolygon[0][0], y2: cellpolygon[0][1], cell_Id:cell_Id};
				   var len=checkEdgeExist(edge,cellpolygonEdges);
				   var lenReverrse=checkEdgeReverseExist(edge,cellpolygonEdges);
				   if((len + lenReverrse)==0){
				     cellpolygonEdges.push(edge); 					 
				   }					 
			   
			   }
		  
		  }
	}
	
	//console.log("cellpolygonEdges");	
	//console.log(cellpolygonEdges);
  
	  
  //////////////
	for(var indexed=0; indexed<cellpolygonEdges.length ; ++indexed){ 
		  //var edge= cellpolygonEdges[index];
		  //console.log("edge");		 
		  var x1=parseInt(cellpolygonEdges[indexed].x1);
		  var y1=parseInt(cellpolygonEdges[indexed].y1);
		  var x2=parseInt(cellpolygonEdges[indexed].x2);
		  var y2=parseInt(cellpolygonEdges[indexed].y2);
		  //console.log("x1="+x1 +" y1="+  y1 + " x2="+ x2+" y2="+y2+" "+cellpolygonEdges[indexed].cell_Id);

		  var min1=Number.MAX_VALUE;
		  var min2=Number.MAX_VALUE;
		  var distancePower=0;		  
		  var min1ID=-1;
		  var min2ID=-1;	
		  		  
		  var midx=( x1 + x2 )/2 ;	  
		  var midy=( y1 + y2 )/2 ;
		  
		  //midP.push({x:midx , y:midy});
		  
		 // var midEdgeP= [midx, midy] ;
		  var distArray=[];
		  for(var indl=0; indl<cells.length ; ++indl){
			  var sitePoly=cells[indl].site;	
			  var cell_Id=sitePoly.originalObject.id;
			  
			  var x=parseInt(sitePoly.x);//nodes[cell_Id].x
			  var y=parseInt(sitePoly.y);//nodes[cell_Id].y
			  var r=Math.sqrt(parseInt(sitePoly.weight));
			  //var selectNode=nodes.filter(node => (node.id==cell_Id));
			  //if(selectNode==null) continue;
			  //var r=parseInt(nodes[cell_Id].radius);// Ri[cell_Id]
			  
			  distancePower=computePowerDistance(midx,midy,x,y,r);
					  
			  distArray.push({dist:distancePower,cell_Id:cell_Id, indxCell:indl});
			  /*if(min1>=distancePower){
				  min2ID= min1ID;
				  min1ID= cell_Id;				  
				  min2=min1;
				  min1=distancePower;			  
			  }*/			  				  
		  }
		  
		    distArray.sort(function(a, b){
				return a.dist-b.dist
			});
			
			min1ID=distArray[0].cell_Id;
			min2ID=distArray[1].cell_Id;
			
			
						
		   //console.log("min1ID   min2ID distancePower="+distancePower);
		   //console.log(min1ID+"  "+min2ID);
		  
				  
 		  if(min1ID!=-1 && min2ID!=-1){			  
		        var n1=cells[distArray[0].indxCell].site;//nodes.filter(node => (parseInt(node.id)==min1ID));
				var n2=cells[distArray[1].indxCell].site;//nodes.filter(node => (parseInt(node.id)==min2ID));				 
				 
			    delunyEdges.push(
					{x1: n1.x,  //nodes[min1ID]
					 y1: n1.y, 
					 x2: n2.x, 
					 y2: n2.y,
					 Delaunay_edge_start: min1ID,
					 Delaunay_edge_end: min2ID}
				  ); 
				  
				  
				//if(cellpolygonEdges[indexed].cell_Id == min1ID){
				  var arr1=nodesNeibureMap.get(min1ID);
				  if(arr1.indexOf(min2ID)==-1)
					arr1.push(min2ID);
				    nodesNeibureMap.delete(min1ID);
				    nodesNeibureMap.set(min1ID,arr1);
				  
				  
				//}

				//if(cellpolygonEdges[indexed].cell_Id == min2ID){
					var arr2=nodesNeibureMap.get(min2ID);
					if(arr2.indexOf(min1ID)==-1)
					  arr2.push(min1ID);
				      nodesNeibureMap.delete(min2ID);
					  nodesNeibureMap.set(min2ID,arr2);
					
				//}
			
			
		  } 
		  
	}	
	
	//console.log("nodesNeibureMap");
	//console.log(nodesNeibureMap);
	//console.log(JSON.stringify(nodesNeibureMap));
	
	return delunyEdges;
}
	
 //Technique,TStep,IsMove,PID,posXt,posYt,RadiusRt,InitID,TrialID,PolyID,RecodedTimeMouseDuration
 
 
function  computeDelaunayTable(cells,oneStepTableOfPoly, techniqe){
	//var edges=getAllDealunyNearestNeighber(cells,techniqe);
	var edges=getAllDealunyNearestNeighberFrmCSV(cells,techniqe);
	//console.log("edges");
	//console.log(edges);
	
	var edgesUniqueIdSet = new Set();
	edgesUniqueIdSet.clear();
	
	 for(var edgeIndex = 0; edgeIndex < edges.length; edgeIndex++){


			const obj={Technique: oneStepTableOfPoly[0].Technique,			
					  TStep: oneStepTableOfPoly[0].TStep, 			
					  IsMoved: oneStepTableOfPoly[0].IsMoved,			
					 
					
					  InitID: oneStepTableOfPoly[0].InitID, 
					  TrialID: oneStepTableOfPoly[0].TrialID, 
					  ParentCellID: oneStepTableOfPoly[0].ParentCellID,
					  
                      BetaValue:  oneStepTableOfPoly[0].BetaValue ,
                      TrajectoryDuration:  oneStepTableOfPoly[0].TrajectoryDuration ,
 
					  ChildId_Delaunay_edge_start: edges[edgeIndex].Delaunay_edge_start,
					  ChildId_Delaunay_edge_end: edges[edgeIndex].Delaunay_edge_end
					  };		

            if( !edgesUniqueIdSet.has(obj.ChildId_Delaunay_edge_start +"-"+ obj.ChildId_Delaunay_edge_end)   &&
			    !edgesUniqueIdSet.has(obj.ChildId_Delaunay_edge_end   +"-"+ obj.ChildId_Delaunay_edge_start )
			){
			  dataDelaunayTable.push(obj);
			  edgesUniqueIdSet.add(obj.ChildId_Delaunay_edge_start +"-"+ obj.ChildId_Delaunay_edge_end);			  
			}
		 	 
	 }
	 
	 //var uniEdges=Array.from();
	 d3.selectAll('line').remove();
	 
	  var lin=d3.select('svg g')
		.selectAll('line')
		.data(edges);

		lin.enter().append('line')		  
		 .style("stroke", "orange")
		 .style("stroke-width", 2)
		 .merge(lin)
		 .attr("class", 'delunyline')
		 .attr("x1",  function(d) { return  d.x1;})
		 .attr("y1", function(d) { return  d.y1;})
		 .attr("x2", function(d) { return  d.x2;})
		 .attr("y2", function(d) { return  d.y2;});

	  lin.exit().remove();	 
	 
	 
	 
}


function  computeAreaTable(cells,oneStepTableOfPoly, techniqe){
	
	 for(var ind=0; ind<cells.length ; ++ind){

		  var sitePoly=cells[ind].site;	
		  				
		  var cell_Id="";
		  if(techniqe=="BUBBLE"){
		       cell_Id=sitePoly.originalObject.id;
		  }else if(techniqe=="WEIGHTED"){
		       cell_Id=sitePoly.originalObject.data.originalData.id;
		   }
		   
		   var cellPolygon=Array.from(sitePoly.polygon);
		   var areaCell= d3.polygonArea(cellPolygon);
		   
		   
		   
		   const obj={Technique: oneStepTableOfPoly[0].Technique,			
					  TStep: oneStepTableOfPoly[0].TStep, 			
					  IsMoved: oneStepTableOfPoly[0].IsMoved,			
					 
					
					  InitID: oneStepTableOfPoly[0].InitID, 
					  TrialID: oneStepTableOfPoly[0].TrialID, 
					  ParentCellID: oneStepTableOfPoly[0].ParentCellID,
					  
					  BetaValue:  oneStepTableOfPoly[0].BetaValue ,
                      TrajectoryDuration:  oneStepTableOfPoly[0].TrajectoryDuration ,
					  
					  ChildCellID: cell_Id,
					  AreaCell:  areaCell
					  };		

		   
		    dataAreaTable.push(obj);
		   		   
	 }
	 
	 	
}