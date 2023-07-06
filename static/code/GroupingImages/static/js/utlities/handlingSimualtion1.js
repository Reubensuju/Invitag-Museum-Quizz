
const getTime = typeof performance === 'function' ? performance.now : Date.now;
 

//run trials
runTrials();

// run trials
//async 

//async 

function runTrials(){
    console.log("trials started");
	
	for(var trialNr=0 ; trialNr < trialsNumber; ++trialNr){	
		
			//initilaize wi randomly //different wi 
			AllnodesOrginal[trialNr]=[];
			initaliz(); 	
			AllnodesOrginal[trialNr]=	nodesOrginal.concat();	
			nodesOrginal.length=0;
	}
			
	for(var polygoneIndex=0; polygoneIndex< polygonalParentCells.length; ++polygoneIndex ){
						
		for(var trialNr=0 ; trialNr < trialsNumber; ++trialNr){			
			for(var inilizzNr=0; inilizzNr<inilaizingNumber ; ++inilizzNr){
				trialInitialIndexes.push([trialNr,inilizzNr,polygoneIndex]);
			}
					
		}
	}	
	
	//console.log("AllnodesOrginal");
	//console.log(JSON.stringify(AllnodesOrginal));
	////// set polygone
	
	//////
	
	//console.log("BubbletrialNr="+0);
	console.log("weighttrialNr="+0);
//	initOne(0,0);
//    runBubbleExperiment(0,0,0);	
//	runWeightedExperiment(0,0);
	/*nodesOrginal.length=0;	
	nodesOrginal=	 AllnodesOrginal[0].concat();			

   //to make sure nodes have initial values again	
	for(var Nindex=0; Nindex<Ni.length; ++Nindex){    
		  nodes[Nindex].x= nodesOrginal[Nindex].x;
		  nodes[Nindex].y= nodesOrginal[Nindex].y;
		  nodes[Nindex].radius= nodesOrginal[Nindex].radius;
		  nodes[Nindex].id= nodesOrginal[Nindex].id;
		  nodes[Nindex].type= nodesOrginal[Nindex].type;

	
		  nodesCopy[Nindex].x= nodesOrginal[Nindex].x;
		  nodesCopy[Nindex].y= nodesOrginal[Nindex].y;
		  nodesCopy[Nindex].radius= nodesOrginal[Nindex].radius;
		  nodesCopy[Nindex].id= nodesOrginal[Nindex].id;
		  nodesCopy[Nindex].type= nodesOrginal[Nindex].type;			  	  
	}	*/	
	
	
			 
//	runBubbleExperiment(0,0,0);		
//	await sleep(36000);	

//	runBubbleExperiment();		
//	await sleep(36000);				
	
//    runBubbleExperiment();		
//	await sleep(36000);	
	
	//await sleep(36000 );	//* inilaizingNumber


//-------------------


/*    console.log("BubbletrialNr="+1);
	nodesOrginal.length=0;	
	nodesOrginal=	 AllnodesOrginal[1].concat();			

   //to make sure nodes have initial values again	
	for(var Nindex=0; Nindex<Ni.length; ++Nindex){    
		  nodes[Nindex].x= nodesOrginal[Nindex].x;
		  nodes[Nindex].y= nodesOrginal[Nindex].y;
		  nodes[Nindex].radius= nodesOrginal[Nindex].radius;
		  nodes[Nindex].id= nodesOrginal[Nindex].id;
		  nodes[Nindex].type= nodesOrginal[Nindex].type;

	
		  nodesCopy[Nindex].x= nodesOrginal[Nindex].x;
		  nodesCopy[Nindex].y= nodesOrginal[Nindex].y;
		  nodesCopy[Nindex].radius= nodesOrginal[Nindex].radius;
		  nodesCopy[Nindex].id= nodesOrginal[Nindex].id;
		  nodesCopy[Nindex].type= nodesOrginal[Nindex].type;			  	  
	}		
	
	
			 
	runBubbleExperiment();		
	await sleep(36000);	

	runBubbleExperiment();		
	await sleep(36000);				
	
	runBubbleExperiment();		
	await sleep(36000);	
	//await sleep(36000 );	//* inilaizingNumber



//---------------------

    console.log("BubbletrialNr="+2);	
	nodesOrginal.length=0;	
	nodesOrginal=	 AllnodesOrginal[2].concat();			

   //to make sure nodes have initial values again	
	for(var Nindex=0; Nindex<Ni.length; ++Nindex){    
		  nodes[Nindex].x= nodesOrginal[Nindex].x;
		  nodes[Nindex].y= nodesOrginal[Nindex].y;
		  nodes[Nindex].radius= nodesOrginal[Nindex].radius;
		  nodes[Nindex].id= nodesOrginal[Nindex].id;
		  nodes[Nindex].type= nodesOrginal[Nindex].type;

	
		  nodesCopy[Nindex].x= nodesOrginal[Nindex].x;
		  nodesCopy[Nindex].y= nodesOrginal[Nindex].y;
		  nodesCopy[Nindex].radius= nodesOrginal[Nindex].radius;
		  nodesCopy[Nindex].id= nodesOrginal[Nindex].id;
		  nodesCopy[Nindex].type= nodesOrginal[Nindex].type;			  	  
	}		
	
	
			 
	runBubbleExperiment();		
	await sleep(36000);	

	runBubbleExperiment();		
	await sleep(36000);				
	
	runBubbleExperiment();		
	await sleep(36000);	
	//await sleep(36000 );	//* inilaizingNumber


//---------------------

    console.log("BubbletrialNr="+3);
	nodesOrginal.length=0;	
	nodesOrginal=	 AllnodesOrginal[3].concat();			

   //to make sure nodes have initial values again	
	for(var Nindex=0; Nindex<Ni.length; ++Nindex){    
		  nodes[Nindex].x= nodesOrginal[Nindex].x;
		  nodes[Nindex].y= nodesOrginal[Nindex].y;
		  nodes[Nindex].radius= nodesOrginal[Nindex].radius;
		  nodes[Nindex].id= nodesOrginal[Nindex].id;
		  nodes[Nindex].type= nodesOrginal[Nindex].type;

	
		  nodesCopy[Nindex].x= nodesOrginal[Nindex].x;
		  nodesCopy[Nindex].y= nodesOrginal[Nindex].y;
		  nodesCopy[Nindex].radius= nodesOrginal[Nindex].radius;
		  nodesCopy[Nindex].id= nodesOrginal[Nindex].id;
		  nodesCopy[Nindex].type= nodesOrginal[Nindex].type;			  	  
	}		
	
	
			 
	runBubbleExperiment();		
	await sleep(36000);	

	runBubbleExperiment();		
	await sleep(36000);				
	
	runBubbleExperiment();		
	await sleep(36000);	
	//await sleep(36000 );	//* inilaizingNumber
	
*/
//---------------------

//	d3.selectAll('polygon').remove();	
//	d3.selectAll('circle').remove();
			
//---------------------

/*    console.log("Weightedtrial="+0);
	nodesOrginal.length=0;
	nodesOrginal=	 AllnodesOrginal[0].concat();	
	//to make sure nodes have initial values again	
	for(var Nindex=0; Nindex<Ni.length; ++Nindex){    
		  nodes[Nindex].x= nodesOrginal[Nindex].x;
		  nodes[Nindex].y= nodesOrginal[Nindex].y;
		  nodes[Nindex].radius= nodesOrginal[Nindex].radius;
		  nodes[Nindex].id= nodesOrginal[Nindex].id;
		  nodes[Nindex].type= nodesOrginal[Nindex].type;

	
		  nodesCopy[Nindex].x= nodesOrginal[Nindex].x;
		  nodesCopy[Nindex].y= nodesOrginal[Nindex].y;
		  nodesCopy[Nindex].radius= nodesOrginal[Nindex].radius;
		  nodesCopy[Nindex].id= nodesOrginal[Nindex].id;
		  nodesCopy[Nindex].type= nodesOrginal[Nindex].type;			  	  
	}		

	
 					
	
	runWeightedExperiment();	
	await sleep(9000);
	
//	runWeightedExperiment();	
//	await sleep(9000);

//	runWeightedExperiment();	
//	await sleep(9000);	
	//await sleep(9000 ); 
	
*/		
	//---------------------
/*	console.log("Weightedtrial="+1);
	nodesOrginal.length=0;
	nodesOrginal=	 AllnodesOrginal[1].concat();	
	//to make sure nodes have initial values again	
	for(var Nindex=0; Nindex<Ni.length; ++Nindex){    
		  nodes[Nindex].x= nodesOrginal[Nindex].x;
		  nodes[Nindex].y= nodesOrginal[Nindex].y;
		  nodes[Nindex].radius= nodesOrginal[Nindex].radius;
		  nodes[Nindex].id= nodesOrginal[Nindex].id;
		  nodes[Nindex].type= nodesOrginal[Nindex].type;

	
		  nodesCopy[Nindex].x= nodesOrginal[Nindex].x;
		  nodesCopy[Nindex].y= nodesOrginal[Nindex].y;
		  nodesCopy[Nindex].radius= nodesOrginal[Nindex].radius;
		  nodesCopy[Nindex].id= nodesOrginal[Nindex].id;
		  nodesCopy[Nindex].type= nodesOrginal[Nindex].type;			  	  
	}		

	
 

	runWeightedExperiment();	
	await sleep(9000);
	
	runWeightedExperiment();	
	await sleep(9000);

	runWeightedExperiment();	
	await sleep(9000);	
	//await sleep(10000 ); 
	
	//------------------
	console.log("Weightedtrial="+2);	
	nodesOrginal.length=0;
	nodesOrginal=	 AllnodesOrginal[2].concat();	
	//to make sure nodes have initial values again	
	for(var Nindex=0; Nindex<Ni.length; ++Nindex){    
		  nodes[Nindex].x= nodesOrginal[Nindex].x;
		  nodes[Nindex].y= nodesOrginal[Nindex].y;
		  nodes[Nindex].radius= nodesOrginal[Nindex].radius;
		  nodes[Nindex].id= nodesOrginal[Nindex].id;
		  nodes[Nindex].type= nodesOrginal[Nindex].type;

	
		  nodesCopy[Nindex].x= nodesOrginal[Nindex].x;
		  nodesCopy[Nindex].y= nodesOrginal[Nindex].y;
		  nodesCopy[Nindex].radius= nodesOrginal[Nindex].radius;
		  nodesCopy[Nindex].id= nodesOrginal[Nindex].id;
		  nodesCopy[Nindex].type= nodesOrginal[Nindex].type;			  	  
	}		

	
 

	runWeightedExperiment();	
	await sleep(9000);
	
	runWeightedExperiment();	
	await sleep(9000);
	
	runWeightedExperiment();	
	await sleep(9000);
	
	//await sleep(10000 );  
	
//------------------
	console.log("Weightedtrial="+3);	
	nodesOrginal.length=0;
	nodesOrginal=	 AllnodesOrginal[3].concat();	
	//to make sure nodes have initial values again	
	for(var Nindex=0; Nindex<Ni.length; ++Nindex){    
		  nodes[Nindex].x= nodesOrginal[Nindex].x;
		  nodes[Nindex].y= nodesOrginal[Nindex].y;
		  nodes[Nindex].radius= nodesOrginal[Nindex].radius;
		  nodes[Nindex].id= nodesOrginal[Nindex].id;
		  nodes[Nindex].type= nodesOrginal[Nindex].type;

	
		  nodesCopy[Nindex].x= nodesOrginal[Nindex].x;
		  nodesCopy[Nindex].y= nodesOrginal[Nindex].y;
		  nodesCopy[Nindex].radius= nodesOrginal[Nindex].radius;
		  nodesCopy[Nindex].id= nodesOrginal[Nindex].id;
		  nodesCopy[Nindex].type= nodesOrginal[Nindex].type;			  	  
	}		

	
 

	runWeightedExperiment();	
	await sleep(9000);
	
	runWeightedExperiment();	
	await sleep(9000);
	
	runWeightedExperiment();	
	await sleep(9000);
*/		
		
//	console.log("trials finished");
}


async function runAllWeightedExperimentTrials(trialNr,AllnodesOrginal){
	
	if(trialNr < trialsNumber){
	    nodesOrginal=	 AllnodesOrginal[trialNr].concat();	
		//to make sure nodes have initial values again	
		for(var Nindex=0; Nindex<Ni.length; ++Nindex){    
              nodes[Nindex].x= nodesOrginal[Nindex].x;
			  nodes[Nindex].y= nodesOrginal[Nindex].y;
			  nodes[Nindex].radius= nodesOrginal[Nindex].radius;
			  nodes[Nindex].id= nodesOrginal[Nindex].id;
			  nodes[Nindex].type= nodesOrginal[Nindex].type;

		
			  nodesCopy[Nindex].x= nodesOrginal[Nindex].x;
			  nodesCopy[Nindex].y= nodesOrginal[Nindex].y;
			  nodesCopy[Nindex].radius= nodesOrginal[Nindex].radius;
			  nodesCopy[Nindex].id= nodesOrginal[Nindex].id;
			  nodesCopy[Nindex].type= nodesOrginal[Nindex].type;			  	  
        }		
		
		var inilizzNr=0;
	    runAllWeightedExperiment(nodesOrginal,nodesCopy, inilizzNr);	
        await sleep(12000 * inilaizingNumber);
        runAllWeightedExperimentTrials(++trialNr,AllnodesOrginal);	
	}	 
		 
		 
}

async function runAllWeightedExperiment(nodesOrginal,nodesCopy, inilizzNr){
	if(inilizzNr < inilaizingNumber){
	   runWeightedExperiment();
	   await sleep(9000);
	   runAllWeightedExperiment(nodesOrginal,nodesCopy, ++inilizzNr)
	}
}
	  




//async 
function runBubbleExperiment(indexbetaStepMove,indexTrialIniliz, polygoneIndex ){
     var stTime=new Date().getTime();
	 var polyCopy=polygonalParentCells[polygoneIndex];	
	 //polyCopyDiameterPoints.length=0;

	 
	 //first pass
	 epsilon_Opt =Number.MAX_VALUE;
	 scaleAlphaT= 0.9;
	 Alpha_Opt= 0.9;
	 runOneIteration(scaleAlphaT,polygoneIndex);

  
  

  
       var firstPassPosX=Array.from(Cix_Opt);
	   var firstPassPosY=Array.from(Ciy_Opt);
	   
	  //--------  go to first recorded optimum opt alpha and its positions:
	   var FirstPassAlpha_Opt=Alpha_Opt;
	   
	   for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(FirstPassAlpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  updateCircleNodePositition(Cindex, firstPassPosX[Cindex], firstPassPosY[Cindex]);		  
	   }	
	   	computePolyCircles(polyCopy);
	    drawCicles();
        //var firstPasscells=computePowerDiagram(nodes , Ri, xmin , ymin, height, width);
		//var firstPasscells=computePowerDiagram(nodes , polyCopy);
		
		
	
	//--------use weighted voroni as intermediate step after static mode
     var cells=runLastOneIterationBubleWeighted(nodes, polygoneIndex)	
 	/*var arrayOfFixedPositionsNodesSimt=[];
	arrayOfFixedPositionsNodesSimt.length=0;
	
	for(var Cindex=0; Cindex<Cix.length; ++ Cindex){	
	  arrayOfFixedPositionsNodesSimt.push(Cindex+"");
	}
	var cells=computeWeightedWithFixed(nodes, arrayOfFixedPositionsNodesSimt, xmin ,ymin , width, height);
	*/
	/*var cellsLengtht= cells.length;
	for(var index=0; index<cellsLengtht ; ++index){ 
		var sitePoly=cells[index].site;	 
		var cell_Id=parseInt(sitePoly.originalObject.data.originalData.id); 
		Cix_Opt[cell_Id] = parseInt(sitePoly.x);
		Ciy_Opt[cell_Id] = parseInt(sitePoly.y);
		
		updateCircleNodePositition(cell_Id, parseInt(sitePoly.x) , parseInt(sitePoly.y));			
	}
	
	drawWeightedVoronoiCells(cells);
	//arrayOfFixedPositionsNodesSimt.length=0;
	computePolyCircles(polyCopy);
	drawCicles();*/
	
 
	//var localparentIndexStartDragChild =findPathStartCellID(cells, polygoneIndex);
	//	console.log("findPathStartCellID="+localparentIndexStartDragChild);

       recordBubbleStartFinalStepAfterWeightOptimizData(cells, "start",indexTrialIniliz,polygoneIndex,stTime);//, nodes[localparentIndexStartDragChild]
 	
	
	
	//-------
	
	//var cells=computePowerDiagram(nodes, Ri, xmin , ymin, height, width);//computePowerDiagram(nodes);	
	//drawVoronoiCells(cells);
	//drawCicles();
	
//	copyNodesAt0();


    //await sleep(500);	
  
  
	var Alpha_OptOrginal=Alpha_Opt;

 
 	runOne(0,0,Alpha_OptOrginal,indexbetaStepMove,indexTrialIniliz, polygoneIndex);
			



}


function recordBubbleStartFinalStepBeforeWeightOptimizData(cells, stepCounter,indexTrialIniliz,polygoneIndex,stTime){//, move
     var polyCopy=polygonalParentCells[polygoneIndex];	
	var allPoints=[];
	var cellsNumber=childrenNumber;
	for(var index=0; index<cellsNumber ; ++index){ 
	
		if(cells[index]=="undefined" || cells[index]==null){								   
			allPoints.push({
							  IsMove:  false,
							  PID:-1,												 
							  posXt:-1 ,
							  posYt:-1 , 
							  RadiusRt:-1 ,
							  //VertPowerID: -1,
							  //PowerX:  -1,
							  //PowerY:  -1,
							  InitID:  -1,
							  TrialID: -1,
							  PolyID:  -1,
							  RecodedTimeMouseDuration:-1
					 });
																																											 
			continue;
		 }
	
		  var sitePoly=cells[index].site;	   
		  var cellPolygon=Array.from(sitePoly.polygon);
		  
		 //cliping cell with parent polygn
		 for(var y=0; y<cellPolygon.length; ++y){	  
			cellPolygon[y][0]= Math.max(cellPolygon[y][0], xmin);
			cellPolygon[y][0]= Math.min(cellPolygon[y][0], xmax);
			  
			cellPolygon[y][1]=Math.max(cellPolygon[y][1], ymin);
			cellPolygon[y][1]=Math.min(cellPolygon[y][1], ymax);	  
		 }


		  var cell_Id= sitePoly.originalObject.id;//	sitePoly.originalObject.data.originalData.id; 
		  
		 //var isEdgePoly=[];
		 //isEdgePoly.length=0;
		 //isEdgePoly=getIsEdgePoly(cellPolygon, polyCopy);
		  
		  var ctTime=new Date().getTime();
		  
		  var isMove= false;//(cell_Id==move.id);
		 // for(var cID=0; cID<cellPolygon.length; ++cID){										  
			  allPoints.push({
							  IsMove: isMove,
							  PID:cell_Id,													 
							  posXt:nodes[cell_Id].x ,
							  posYt:nodes[cell_Id].y , 
							  RadiusRt:nodes[cell_Id].radius ,
							  //VertPowerID: cID,
							  //PowerX:  cellPolygon[cID][0],
							  //PowerY:  cellPolygon[cID][1],
							  //EdgePolyVertex: isEdgePoly[cID],
							  InitID:  trialInitialIndexes[indexTrialIniliz][1],
							  TrialID: trialInitialIndexes[indexTrialIniliz][0],
							  PolyID:  polygoneIndex,
							  RecodedTimeMouseDuration: (ctTime-stTime)
							  });
		  //}
																			
	}
	
	allPoints.sort(function(a, b) {
		return parseFloat(a.PID) - parseFloat(b.PID);
	});
				  
		 
	for(var p = 0; p < allPoints.length; p++){		 
		  dataMoveEpsilon.push({Technique:"BUBBLE",
			                    TStep: stepCounter, 
								IsMove: allPoints[p].IsMove,
								PID:allPoints[p].PID, 															 
								posXt:allPoints[p].posXt,
								posYt:allPoints[p].posYt,															 
								RadiusRt:allPoints[p].RadiusRt,													
								//VertPowerID: allPoints[p].VertPowerID,
								//PowerX:   allPoints[p].PowerX,
								//PowerY:   allPoints[p].PowerY,
								//EdgePolyVertex: allPoints[p].EdgePolyVertex,
								InitID:   allPoints[p].InitID,
								TrialID:  allPoints[p].TrialID,
								PolyID:   allPoints[p].PolyID,
								RecodedTimeMouseDuration:  allPoints[p].RecodedTimeMouseDuration
								});  
															  
	}
	//dataMoveEpsilon.push({TStep: stepCounter, Epsilon:  epsilon , MinEpsilon: minEpsilon , MaxEpsilon: maxEpsilon, MisMatchNr:  misMatchNr , CellsNumber:cellsNumber, BetaValue:beta[betaCount], MouseDuration:(stepMuseMove * frameCount)});
	allPoints.length=0;
	
}


function recordBubbleStartFinalStepAfterWeightOptimizData(cells, stepCounter,indexTrialIniliz,polygoneIndex,stTime){//, move
     var polyCopy=polygonalParentCells[polygoneIndex];	
	var allPoints=[];
	var cellsNumber=childrenNumber;
	for(var index=0; index<cellsNumber ; ++index){ 
	
		if(cells[index]=="undefined" || cells[index]==null){								   
			allPoints.push({
							  IsMove:  false,
							  PID:-1,												 
							  posXt:-1 ,
							  posYt:-1 , 
							  RadiusRt:-1 ,
							  //VertPowerID: -1,
							  //PowerX:  -1,
							  //PowerY:  -1,
							  InitID:  -1,
							  TrialID: -1,
							  PolyID:  -1,
							  RecodedTimeMouseDuration:-1
					 });
																																											 
			continue;
		 }
	
		  var sitePoly=cells[index].site;	   
		  var cellPolygon=Array.from(sitePoly.polygon);
		  
		 //cliping cell with parent polygn
		 for(var y=0; y<cellPolygon.length; ++y){	  
			cellPolygon[y][0]= Math.max(cellPolygon[y][0], xmin);
			cellPolygon[y][0]= Math.min(cellPolygon[y][0], xmax);
			  
			cellPolygon[y][1]=Math.max(cellPolygon[y][1], ymin);
			cellPolygon[y][1]=Math.min(cellPolygon[y][1], ymax);	  
		 }


		  var cell_Id=sitePoly.originalObject.data.originalData.id;//sitePoly.originalObject.id;	
		  
		 //var isEdgePoly=[];
		 //isEdgePoly.length=0;
		 //isEdgePoly=getIsEdgePoly(cellPolygon, polyCopy);

		  var ctTime=new Date().getTime();		  
		  var isMove= false;//(cell_Id==move.id);
		  //for(var cID=0; cID<cellPolygon.length; ++cID){										  
			  allPoints.push({
							  IsMove: isMove,
							  PID:cell_Id,													 
							  posXt:nodes[cell_Id].x ,
							  posYt:nodes[cell_Id].y , 
							  RadiusRt:nodes[cell_Id].radius ,
							  //VertPowerID: cID,
							  //PowerX:  cellPolygon[cID][0],
							  //PowerY:  cellPolygon[cID][1],
							  //EdgePolyVertex: isEdgePoly[cID],
							  InitID:  trialInitialIndexes[indexTrialIniliz][1],
							  TrialID: trialInitialIndexes[indexTrialIniliz][0],
							  PolyID:  polygoneIndex,
							  RecodedTimeMouseDuration: (ctTime-stTime)
							  });
		  //}
																			
	}
	
	allPoints.sort(function(a, b) {
		return parseFloat(a.PID) - parseFloat(b.PID);
	});
				  
		 
	for(var p = 0; p < allPoints.length; p++){		 
		  dataMoveEpsilon.push({Technique:"BUBBLE",
		                        TStep: stepCounter, 
								IsMove: allPoints[p].IsMove,
								PID:allPoints[p].PID, 															 
								posXt:allPoints[p].posXt,
								posYt:allPoints[p].posYt,															 
								RadiusRt:allPoints[p].RadiusRt,													
								//VertPowerID: allPoints[p].VertPowerID,
								//PowerX:   allPoints[p].PowerX,
								//PowerY:   allPoints[p].PowerY,
								//EdgePolyVertex: allPoints[p].EdgePolyVertex,
								InitID:   allPoints[p].InitID,
								TrialID:  allPoints[p].TrialID,
								PolyID:   allPoints[p].PolyID,
								RecodedTimeMouseDuration:  allPoints[p].RecodedTimeMouseDuration
								});  
															  
	}
	//dataMoveEpsilon.push({TStep: stepCounter, Epsilon:  epsilon , MinEpsilon: minEpsilon , MaxEpsilon: maxEpsilon, MisMatchNr:  misMatchNr , CellsNumber:cellsNumber, BetaValue:beta[betaCount], MouseDuration:(stepMuseMove * frameCount)});
	allPoints.length=0;
	
}
		  
		  
		  
function runLastOneIterationBubleWeighted(nodes,  polygoneIndex){//trialNr, inilizzNr, alpha,
        var polyCopy=polygonalParentCells[polygoneIndex];
	     
		 var powerCells=computePowerDiagram(nodes , polyCopy);
	    //store xy positions of each power cell in nodes.
	    var cellsNumber=powerCells.length;		
	    for(var index=0; index<cellsNumber ; ++index){ 
			  var sitePoly=powerCells[index].site;	
			  var cell_Id=sitePoly.originalObject.id;
			  nodes[cell_Id].x= parseInt(sitePoly.x);
			  nodes[cell_Id].y= parseInt(sitePoly.y);
		}
		
		//create nodesTmp as copy of nodes with additional info (weight,
		//previousX, previousY, and previousWeight) to be used by weighted vor 
		 var nodesTmp=[];
		 for(var Nindex=0; Nindex<nodes.length; ++Nindex){  
             nodesTmp[Nindex]=[];		 
			 nodesTmp[Nindex].x=  nodes[Nindex].x   ;
			 nodesTmp[Nindex].y=  nodes[Nindex].y   ;
			 nodesTmp[Nindex].radius=  nodes[Nindex].radius   ;
			 nodesTmp[Nindex].id= nodes[Nindex].id   ;
			 nodesTmp[Nindex].type= nodes[Nindex].type   ;
			 
			 nodesTmp[Nindex].weight= Wi[Nindex] ;
			 nodesTmp[Nindex].previousX= NaN  ;
			 nodesTmp[Nindex].previousY= NaN   ;
			 nodesTmp[Nindex].previousWeight= NaN;				 			
		}	
	
	
	    //---- 	fix nodes position		 	   
		var arrayOfFixedPositionsNodesSimt=[];
		arrayOfFixedPositionsNodesSimt.length=0;		
		for(var Nindex=0; Nindex<nodesTmp.length; ++Nindex){	
		  arrayOfFixedPositionsNodesSimt.push(Nindex+"");
		}
		
		
		
		//----	compute init Weighted voro With Fixed nodes
		//var cellsWeighted=computeWeightedWithFixedLoc(nodes, arrayOfFixedPositionsNodesSimt, xmin ,ymin , width, height);
		computeWeightedInitialLoc0(nodesTmp, arrayOfFixedPositionsNodesSimt,polyCopy);//, xmin ,ymin , width, height
		//---- compute Weighted voro based on init Weighted voro 
		//(it runs 25 times inside function) and choosing 
		//one that gives minimal total error 
		//var cellsWeighted=computeWeightedBasedOnPrevoiusLoc(nodesTmp, arrayOfFixedPositionsNodesSimt, xmin ,ymin , width, height, true);
		var cellsWeighted0=computeWeightedBasedOnPrevoiusLocW0(nodesTmp, arrayOfFixedPositionsNodesSimt, polyCopy);//, xmin ,ymin , width, height, true, trialNr, inilizzNr, alpha
//        if(cellsWeighted0!=null){		
//		  cellsWeighted0.length=0;
//		}
	  
	 /*   computeWeightedInitialLoc1(nodesTmp, arrayOfFixedPositionsNodesSimt, xmin ,ymin , width, height, polyCopy);
		var cellsWeighted1=computeWeightedBasedOnPrevoiusLocW1(nodesTmp, arrayOfFixedPositionsNodesSimt, xmin ,ymin , width, height, true, trialNr, inilizzNr, alpha, polyCopy);
        if(cellsWeighted1!=null){		
 		  cellsWeighted1.length=0;
		}*/
		//compute and record errors
//		computeError(cellsWeighted,"BubbleWeighted", "BubbleWeighted");		
		arrayOfFixedPositionsNodesSimt.length=0;
	    	
		//drawWeightedVoronoiCells(cellsWeighted);

		//if(cellsWeighted!=null)		
		 // cellsWeighted.length=0;		
		nodesTmp.length=0;
	   //----
          
		  
		    var cellsLengtht= cellsWeighted0.length;
			for(var index=0; index<cellsLengtht ; ++index){ 
				var sitePoly=cellsWeighted0[index].site;	 
				var cell_Id=parseInt(sitePoly.originalObject.data.originalData.id); 
				Cix_Opt[cell_Id] = parseInt(sitePoly.x);
				Ciy_Opt[cell_Id] = parseInt(sitePoly.y);
				
				updateCircleNodePositition(cell_Id, parseInt(sitePoly.x) , parseInt(sitePoly.y));			
			}
			
			drawWeightedVoronoiCells(cellsWeighted0);
			drawRectWeightedVoronoi(cellsWeighted0);
			//arrayOfFixedPositionsNodesSimt.length=0;
			computePolyCircles(polyCopy);
			drawCicles();
		  
		  return cellsWeighted0;
}

		  
		  
		  
//async 
function runBubbleExperiment1(indexbetaStepMove,indexTrialIniliz, polygoneIndex ){

	 var polyCopy=polygonalParentCells[polygoneIndex];	
	 //polyCopyDiameterPoints.length=0;

	 
	 //first pass
	 epsilon_Opt =Number.MAX_VALUE;
	 Alpha_Opt= scaleAlphaMin;

	  //STEP 1: grow alpha from scaleAlphaMin to scaleAlphaMax, so to find the position of the centers of the circles (use gravity toward CG of parent cell + low anti-collision force)	  		  
	  for(var scaleAlphaT=scaleAlphaMin; scaleAlphaT<=sacaleAlphaMax ; scaleAlphaT=scaleAlphaT+0.1){
		runOneIteration(scaleAlphaT,polygoneIndex);
	   // await sleep(500);	
	  }
  
  

  
       var firstPassPosX=Array.from(Cix_Opt);
	   var firstPassPosY=Array.from(Ciy_Opt);
	   
	  //--------  go to first recorded optimum opt alpha and its positions:
	   var FirstPassAlpha_Opt=Alpha_Opt;
	   
	   for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(FirstPassAlpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  updateCircleNodePositition(Cindex, firstPassPosX[Cindex], firstPassPosY[Cindex]);		  
	   }	
	   	computePolyCircles(polyCopy);
	    drawCicles();
        //var firstPasscells=computePowerDiagram(nodes , Ri, xmin , ymin, height, width);
		var firstPasscells=computePowerDiagram(nodes , polyCopy);
		
  


   
    //----second pass
	   epsilon_Opt=Number.MAX_VALUE;
	   var scaleAlphaTO=FirstPassAlpha_Opt;
	   for(var countO=1 ; countO< 10 ; ++countO){  
	     scaleAlphaTO=scaleAlphaTO+0.01;
		 runOneIteration(scaleAlphaTO,polygoneIndex);	
	   }
  
  
  
       var secondPassPosX=Array.from(Cix_Opt);
	   var secondPassPosY=Array.from(Ciy_Opt);
	   var SecondPassAlpha_Opt=Alpha_Opt;
	   for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(SecondPassAlpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  updateCircleNodePositition(Cindex, secondPassPosX[Cindex], secondPassPosY[Cindex]);		  
	   }	
	   computePolyCircles(polyCopy);
	   drawCicles();
	   //var secondPasscells=computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
	   var secondPasscells=computePowerDiagram(nodes , polyCopy);
	   var firstbestError= epsilon_Opt;
	   //drawVoronoiCells(secondPasscells);
       //drawAllDealunyNearestNeighber(secondPasscells);	   
	   
	   
	   
	   
       //----third pass
	   epsilon_Opt=Number.MAX_VALUE;
	   scaleAlphaTO=FirstPassAlpha_Opt;
	   for(var countO=1 ; countO< 10 ; ++countO){  
	   	 scaleAlphaTO=scaleAlphaTO-0.01;
		 runOneIteration(scaleAlphaTO,polygoneIndex);	
	   }
	   
	   var thirdPassPosX=Array.from(Cix_Opt);
	   var thirdPassPosY=Array.from(Ciy_Opt);
	   
	   var ThirdPassAlpha_Opt=Alpha_Opt;
	   for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(ThirdPassAlpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  updateCircleNodePositition(Cindex, thirdPassPosX[Cindex], thirdPassPosY[Cindex]);		  
	   }
	   computePolyCircles(polyCopy);	   
	   drawCicles();
	   var thirdPasscells=computePowerDiagram(nodes,polyCopy);	   
	   var secondbestError=epsilon_Opt;	   
	   
	   
	   //choose best pass two and three
	   ////////////////
	   
	   if(secondbestError<firstbestError){
			 
		     for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
			   Ri[Cindex]=  Math.sqrt(ThirdPassAlpha_Opt * parentArea * Wi[Cindex] / Math.PI);
			   nodes[Cindex].radius= Ri[Cindex];
			   updateCircleNodePositition(Cindex, thirdPassPosX[Cindex], thirdPassPosY[Cindex]);		  
		     }	
			 computePolyCircles(polyCopy);
		     drawCicles();
		     var finalcells=computePowerDiagram(nodes,polyCopy);
			
             if(isDebugMode){
			    drawVoronoiCells(finalcells);
            
		     }
		}else{
			
			 for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
			   Ri[Cindex]=  Math.sqrt(SecondPassAlpha_Opt * parentArea * Wi[Cindex] / Math.PI);
			   nodes[Cindex].radius= Ri[Cindex];
			   updateCircleNodePositition(Cindex, secondPassPosX[Cindex], secondPassPosY[Cindex]);		  
		     }	
			 computePolyCircles(polyCopy);
		     drawCicles();
		     var finalcells=computePowerDiagram(nodes,polyCopy);
			 
             if(isDebugMode){
			    drawVoronoiCells(finalcells);
             
		     }
		}
	   
	   
	   ////////////////
	   
	   
	   
	   
	   
  //run simulation using alphaOpt
  
  //console.log("init_Alpha_Opt");
 // console.log(init_Alpha_Opt);
  
  //console.log("Alpha_Opt");
  //console.log(Alpha_Opt);
  // Alpha_Opt=Alpha_Opt*0.8;
  ///////////////////////////////////
  

/*	for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
	  Ri[Cindex]= computeRadius(Wi[Cindex]  , Alpha_Opt); 
	  nodes[Cindex].radius= Ri[Cindex];
	  updateCircleNodePositition(Cindex, Cix_Opt[Cindex], Ciy_Opt[Cindex]);		  
	}*/

// 	runSimulation(initialMode , nodes);
	
	//--------use weighted voroni as intermediate step after static mode 
 	var arrayOfFixedPositionsNodesSimt=[];
	arrayOfFixedPositionsNodesSimt.length=0;
	
	for(var Cindex=0; Cindex<Cix.length; ++ Cindex){	
	  arrayOfFixedPositionsNodesSimt.push(Cindex+"");
	}
	var cells=computeWeightedWithFixed(nodes, arrayOfFixedPositionsNodesSimt, xmin ,ymin , width, height);
	
	var cellsLengtht= cells.length;
	for(var index=0; index<cellsLengtht ; ++index){ 
		var sitePoly=cells[index].site;	 
		var cell_Id=parseInt(sitePoly.originalObject.data.originalData.id); 
		Cix_Opt[cell_Id] = parseInt(sitePoly.x);
		Ciy_Opt[cell_Id] = parseInt(sitePoly.y);
		
		updateCircleNodePositition(cell_Id, parseInt(sitePoly.x) , parseInt(sitePoly.y));			
	}
	
	drawWeightedVoronoiCells(cells);
	arrayOfFixedPositionsNodesSimt.length=0;
 	
	//-------
	
	//var cells=computePowerDiagram(nodes, Ri, xmin , ymin, height, width);//computePowerDiagram(nodes);	
	//drawVoronoiCells(cells);
	//drawCicles();
	
	copyNodesAt0();
    //await sleep(500);	
  
  
	var Alpha_OptOrginal=Alpha_Opt;

 
 	runOne(0,0,Alpha_OptOrginal,indexbetaStepMove,indexTrialIniliz, polygoneIndex);
			



  

  /*
  for(var betaCount=0; betaCount <beta.length; ++betaCount){ // diverse Beta
        Alpha_Opt=Alpha_OptOrginal *  beta[betaCount]; //
		
        //  console.log("beta= "+ beta[betaCount] +"-"+Alpha_Opt);
			  
 
        for(var stepMuseMoveIndex=0; stepMuseMoveIndex< stepMuseMoveValues.length; ++stepMuseMoveIndex ){	// diverse duration
             var  stepMuseMove = stepMuseMoveValues[stepMuseMoveIndex];
             

	
			 
             //find power diagram
//			 var cells=computePowerDiagram(nodes, Ri, xmin , ymin, height, width);//computePowerDiagram(nodes);			  
			  //find left bottom corner left cell	  


			  ////store snapshot at step 0
//			 drawCicles();
			// copyNodesAt0();
			 
//			 drawVoronoiCells(cells);
//			 await sleep(500);	

			//////////////
			
		    for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
			  Ri[Cindex]= computeRadius(Wi[Cindex]  , Alpha_Opt); 
			  nodes[Cindex].radius= Ri[Cindex];
			  updateCircleNodePositition(Cindex, Cix_Opt[Cindex], Ciy_Opt[Cindex]);	
			}
			cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
            drawVoronoiCells(cells);
            //drawCicles();
 //           findAllDealunyNearestNeighber(cells);

			
			switchSimulationStaticToMoveMode();	
 
			
			var tickCounter=0;
			while (tickCounter <100 ){
			  ++tickCounter;
			  simulation.tick(); ticked(); 	  
			  //console.log("tick="+tickCounter);
			};
			
			 var localparentIndexStartDragChild= findBottomLeftCellID(cells);
             console.log("findBottomLeftCellID="+localparentIndexStartDragChild);
		    cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
            drawVoronoiCells(cells);	
			//drawCicles();
			
			
			simulation.alphaTarget(.01).restart();
			
			var tickCounter=0;
			while (tickCounter <100 ){
			  ++tickCounter;
			  simulation.tick(); ticked(); 	  
			  //console.log("tick="+tickCounter);
			};
  
		       
			  
				
			  // console.log("t=0");
			   //console.log(JSON.stringify(nodesAtT0));
				
			   var move =  nodes[localparentIndexStartDragChild];  // the node to move around
 					 
			   // We don't want the force layout to mess with our node.
			   //var beforeMoveCircle=d3.select("#circleID"+localparentIndexStartDragChild);
                
				move.fx = move.x;  
				move.fy = move.y; 
							
				 
				
				
				/////
				
				//compute intermediate positions
				//var frameCount = 20; // move from X to Y over 20 frames
				var frames = []; // array of coordinates we'll compute
				frames.length=0;
				// "dumb" tween: "move X pixels every frame"
				  
				//var distance=computeDistance([finalPos.x,finalPos.y] , [move.x,move.y]);
				var delataX= Math.abs(finalPos.x - move.x);
				var delataY= Math.abs(finalPos.y - move.y);
				
				//var tweenAmount = (distance)/frameCount;
				var tweenAmountX = (delataX)/frameCount;
				var tweenAmountY = (delataY)/frameCount;
				for (var i=0; i<frameCount; i++) {
				  // calculate the points to animate
				  //frames[i].x = move.x+(tweenAmount*i);
				  //frames[i].y = move.y-(tweenAmount*i);	  
				  var xPos= move.x+(tweenAmountX*i);
				  var yPos= move.y-(tweenAmountY*i);	
				  frames.push({x:xPos,y:yPos});
				}
				

				var startTime, time, timeStep, accum;
                var duration = stepMuseMove * frameCount;// 2000;
				var stepCounter=0;
				startTime = new Date().getTime();
				var run = function() {
				
				        if(stepCounter <20){ 
							var currentTime=new Date().getTime();
							//time = currentTime - startTime;
							//time = time / duration;
							
							//console.log(time+" Run "+currentTime);
							if((currentTime-timeStep) > stepMuseMove){//100
								 //console.log("Call+"+stepCounter);
								 move.fx = move.px = parseInt( frames[stepCounter].x );
								 move.fy = move.py = parseInt( frames[stepCounter].y ); 

								var tickCounter=0;
								var simStart=currentTime;
								var locCurrentTime;
								while (tickCounter <1000 ){
								  
								  
								  ++tickCounter;
								  simulation.tick(); ticked(); 
                                  
								  locCurrentTime=new Date().getTime();
								  if((locCurrentTime-simStart) > stepMuseMove){
									  console.log("tick="+tickCounter);
								      console.log(locCurrentTime-simStart);
									  break;								 
								  }									  
								  

								   
								};
					

					
					
					
					
					
								 cells=computePowerDiagram(nodes, Ri, xmin , ymin, height, width);//computePowerDiagram(nodes);	 		
								 drawVoronoiCells(cells);
								 //drawCicles();
								 
								////////////
								var allPoints=[];
								
								
								var misMatchNr=0;
								var epsilon=0;
								var minEpsilon=Number.MAX_VALUE;
								var maxEpsilon=Number.MIN_VALUE;
								//console.log("epsilon");
								//var cellsNumber= cells.length;
								var cellsNumber=childrenNumber;
								for(var index=0; index<cellsNumber ; ++index){ 
								
								    if(cells[index]=="undefined" || cells[index]==null){								   
								        allPoints.push({PID:-1,
								                 AreaTID:0 ,
								                 posXt:0 ,
												 posYt:0 , 
											     posXtmouse:move.x, 
												 posYtmouse:move.y,
												 RadiusRt:0
												 });
												 
							            continue;
							         }
								
									  var sitePoly=cells[index].site;	   
									  var cellPolygon=Array.from(sitePoly.polygon);
									  
									 //cliping cell with parent polygn
									 for(var y=0; y<cellPolygon.length; ++y){	  
										cellPolygon[y][0]= Math.max(cellPolygon[y][0], xmin);
										cellPolygon[y][0]= Math.min(cellPolygon[y][0], xmax);
										  
										cellPolygon[y][1]=Math.max(cellPolygon[y][1], ymin);
										cellPolygon[y][1]=Math.min(cellPolygon[y][1], ymax);	  
									 }

									  var areaCell= d3.polygonArea(cellPolygon);
									  var cell_Id=sitePoly.originalObject.id;		
									  var e = (Math.abs(Wi[cell_Id] - (areaCell/parentArea)) ) / Wi[cell_Id]; /// Wi[cell_Id]
									  minEpsilon = Math.min(e, minEpsilon) ;
									  maxEpsilon = Math.max(e, maxEpsilon) ;
						 
									  epsilon= epsilon + e * Wi[cell_Id];
									  
									  allPoints.push({PID:cell_Id,AreaTID:areaCell ,posXt:nodes[cell_Id].x ,posYt:nodes[cell_Id].y , posXtmouse:move.px, posYtmouse:move.py , RadiusRt:nodes[cell_Id].radius });
									  
									  ///updateCircleNodePositition(cell_Id, sitePoly.x, sitePoly.y);	
									  //if(cell_Id!=localparentIndexStartDragChild){				     
										   var currenCellPos= [nodes[cell_Id].x, nodes[cell_Id].y] ;
										   var nnCellID=findNearestNeighber(currenCellPos);
										   //console.log(parseInt(nnCellID)+"-"+ parseInt(cell_Id));
										   if(parseInt(nnCellID)!= parseInt(cell_Id) ){
												misMatchNr= misMatchNr + 1;
										   }  
									  //}
																	
								}
								
								allPoints.sort(function(a, b) {
									return parseFloat(a.PID) - parseFloat(b.PID);
								});
											  
									 
							    for(var p = 0; p < allPoints.length; p++){		 
								      dataMoveEpsilon.push({TStep: stepCounter, 
															Epsilon:  epsilon, 
															MinEpsilon: minEpsilon, 
															MaxEpsilon: maxEpsilon,
															MisMatchNr:  misMatchNr, 
															CellsNumber: cells.length,//cellsNumber,
															BetaValue:beta[betaCount],
															MouseDuration:(stepMuseMove * frameCount),
															PID:allPoints[p].PID, 
															AreaTID: allPoints[p].AreaTID,
															posXt:allPoints[p].posXt,
															posYt:allPoints[p].posYt,
															posXtmouse: allPoints[p].posXtmouse,
															posYtmouse:allPoints[p].posYtmouse,
															RadiusRt:nodes[cell_Id].radius
															});  
																						  
								}
								//dataMoveEpsilon.push({TStep: stepCounter, Epsilon:  epsilon , MinEpsilon: minEpsilon , MaxEpsilon: maxEpsilon, MisMatchNr:  misMatchNr , CellsNumber:cellsNumber, BetaValue:beta[betaCount], MouseDuration:(stepMuseMove * frameCount)});
								allPoints.length=0;
								/////////////
								

								var endTime= new Date().getTime();
								var totalElappsedInrun=endTime-currentTime;  
								console.log(stepCounter+" in run end timer ");	//duration+
								console.log(totalElappsedInrun);
							    accum=accum+totalElappsedInrun;//endTime-startTime;
								console.log("accum=");	//duration+
								console.log(accum);

                                //////////								
								 ++stepCounter;
								 //console.log("Move"+stepCounter);
								 timeStep=currentTime;
							}
											
														   
							   
							   //console.log("Call-"+stepCounter);
							   requestAnimationFrame(run);
						}else{
						     move.fx=null;
			                 move.fy=null;	
						     simulation.stop();						   
						}
				}
				accum=0;
			    timeStep=startTime;
                run();
				

					
				var endTime= new Date().getTime();
				var totalElappsed=endTime-startTime;
			    console.log("out end timer ");	//duration+
				console.log(totalElappsed);
                //await sleep(2200);	
                		  
		}
		
		//await sleep(2200);	
	}							  
	*/							  
	
   // console.log("runBubbleExperiment finished");
}


function runOneWeight(stepMuseMoveIndex,  indexTrialIniliz , polygoneIndex){  
   var polyCopy=polygonalParentCells[polygoneIndex];	
   console.log("runOneWeight"+indexTrialIniliz+" "+polygoneIndex);
   console.log(stepMuseMoveIndex);
   var  stepMuseMove = stepMuseMoveValues[stepMuseMoveIndex];
   
   		  var arrayOfFixedPositionsNodesSim=[];
		  arrayOfFixedPositionsNodesSim.length=0;
		  var cells=computeWeightedWithFixed(nodesCopy, arrayOfFixedPositionsNodesSim, polyCopy);//xmin ,ymin , width, height);
		  
		  copyNodesCopyAt0(cells);
				  
		  //var cells =computeWeightedBasedOnPrevoius(outernodesCopy, arrayOfFixedPositionsNodesSim , xmin ,ymin , width, height);		
		  drawWeightedVoronoiCells(cells);
		  drawRectWeightedVoronoi(cells);
		 
		 
		  
		  ////// have snapshot from cells (Not from nodes) at step 0
	  
	      // drawWeightedVoronoiCells(cells);
//		  drawRectWeightedVoronoi(cells); // calling this function is needed for store xy positions in nodesCopy except node of mouse 
		  ////////////////////
		  //parentIndexStartDragChild = findBottomLeftWeightedCellID(cells);
		  parentIndexStartDragChild =findPathStartWeightedCellID(cells,polygoneIndex);
		  console.log("findBottomLeftCellID="+parentIndexStartDragChild);
          arrayOfFixedPositionsNodesSim.push(parentIndexStartDragChild+"");
					   
		  var move =  nodesCopy[parentIndexStartDragChild];  // the node to move around
		  
		  //compute intermediate positions
		  //var frameCount = 20; // move from X to Y over 20 frames
		  var frames = []; // array of coordinates we'll compute
		  frames.length=0;
		  // "dumb" tween: "move X pixels every frame"
		  
		  //var distance=computeDistance([finalPos.x,finalPos.y] , [move.x,move.y]);
		  var targetX= parseInt(allPolygoneDiameter[polygoneIndex][1][0]);
		  var targetY= parseInt(allPolygoneDiameter[polygoneIndex][1][1]);
		  
		  var delataX= Math.abs(targetX - move.x);
		  var delataY= Math.abs(targetY - move.y);
		
		  //var tweenAmount = (distance)/frameCount;
		  var tweenAmountX = (delataX)/frameCount;
		  var tweenAmountY = (delataY)/frameCount;
		  for (var i=0; i<frameCount; i++) {
		     // calculate the points to animate
		     //frames[i].x = move.x+(tweenAmount*i);
		     //frames[i].y = move.y-(tweenAmount*i);	  
		     var xPos= move.x+(tweenAmountX*i);
			 var yPos=0;
			 if(move.y>targetY){
				 yPos= move.y-(tweenAmountY*i);	
			 }else{
			     yPos= move.y+(tweenAmountY*i);	
			 }
			 
		     
		     frames.push({x:xPos,y:yPos});
		  }
		
		  //do{
		  //console.log("frames");	
		  //console.log(frames);
		  
		  
		  var startTime, time, timeStep;
		  var duration = stepMuseMove * frameCount;// 2000;
		  var stepCounter=0;
		  startTime = new Date().getTime();
		  var isFinished=false;
		  
		  var run = function() {
		        
				
				 if(!isFinished){
				
				    	     var currentTime=new Date().getTime();
										 
							 move.x = parseInt( frames[stepCounter].x ); //= move.px 
							 move.y =  parseInt( frames[stepCounter].y ); 		//move.py =
							 
							 nodesCopy[parentIndexStartDragChild].x=  move.x;
							 nodesCopy[parentIndexStartDragChild].y=  move.y;			
							 
							 //console.log("nodesCopy"+stepCounter);
							 //console.log(nodesCopy[parentIndexStartDragChild].x +" "+nodesCopy[parentIndexStartDragChild].y);		 
							
							
							    var nextCurrentTime=currentTime;
								var recodedTimeMouseDuration=0;
								
 
								while (!isFinished){
									 
									nextCurrentTime=new Date().getTime();
									 
									 
									if((nextCurrentTime-currentTime) >= stepMuseMove){
										recodedTimeMouseDuration=nextCurrentTime-currentTime;
										isFinished=true;
									}
								}
								
								
							 
							 cells =computeWeightedBasedOnPrevoius(nodesCopy, arrayOfFixedPositionsNodesSim , polyCopy);//, xmin ,ymin , width, height);				                      							 
							 drawWeightedVoronoiCells(cells);
			                 drawRectWeightedVoronoi(cells);
			
                             ////////////		
                             var allPoints=[];
							 
							 //var epsilon=0;
							 //var misMatchNr=0;
							 //var minEpsilon=Number.MAX_VALUE;
							 //var maxEpsilon=Number.MIN_VALUE;
							 //console.log("epsilon");
							 //var cellsNumber= cells.length;
							 var cellsNumber=childrenNumber;
							 
							 for(var index=0; index<cellsNumber ; ++index){ 
							 
							      if(cells[index]=="undefined" || cells[index]==null){
								   
								       allPoints.push({												 
												  IsMove:  false,
												  PID:-1,												 
												  posXt:-1 ,
												  posYt:-1 , 
												  RadiusRt:-1 ,
												 // VertPowerID: -1,
												  //PowerX:  -1,
												  //PowerY:  -1,
												  InitID:  -1,
												  TrialID: -1,
												  PolyID:  -1,
												  RecodedTimeMouseDuration:-1
												 
												 
												 });
												 
							           continue;
							      }
								  
								  var sitePoly=cells[index].site;	   
								  var cellPolygon=Array.from(sitePoly.polygon);
								  
								 //cliping cell with parent polygn
								 /*for(var y=0; y<cellPolygon.length; ++y){	  
									cellPolygon[y][0]= Math.max(cellPolygon[y][0], xmin);
									cellPolygon[y][0]= Math.min(cellPolygon[y][0], xmax);
									  
									cellPolygon[y][1]=Math.max(cellPolygon[y][1], ymin);
									cellPolygon[y][1]=Math.min(cellPolygon[y][1], ymax);	  
								 }*/
							

								  var cell_Id=sitePoly.originalObject.data.originalData.id; 	
								  var cell_radius= Math.sqrt(sitePoly.weight);
                                  var isMove= (cell_Id==move.id);
								  //for(var cID=0; cID<cellPolygon.length; ++cID){
									        allPoints.push({																								 
													  IsMove: isMove,
													  PID:cell_Id,													 
													  posXt:nodesCopy[cell_Id].x ,
													  posYt:nodesCopy[cell_Id].y , 
													  RadiusRt:cell_radius ,
													  //VertPowerID: cID,
													  //PowerX:  cellPolygon[cID][0],
													  //PowerY:  cellPolygon[cID][1],
													 // EdgePolyVertex: isEdgePoly[cID],
													  InitID:  trialInitialIndexes[indexTrialIniliz][1],
													  TrialID: trialInitialIndexes[indexTrialIniliz][0],
													  PolyID:  polygoneIndex,
													  RecodedTimeMouseDuration: recodedTimeMouseDuration
													 
													 });
								  //}
							 }
									  
							 allPoints.sort(function(a, b) {
									return parseFloat(a.PID) - parseFloat(b.PID);
								});
											  
									 
							for(var p = 0; p < allPoints.length; p++){			 
							
								  dataMoveWeightedEpsilon.push({
									                   	Technique:"WEIGHTED",													
														TStep: stepCounter, 
														IsMove: allPoints[p].IsMove,
														PID:allPoints[p].PID, 															 
														posXt:allPoints[p].posXt,
														posYt:allPoints[p].posYt,															 
														RadiusRt:allPoints[p].RadiusRt,													
														//VertPowerID: allPoints[p].VertPowerID,
														//PowerX:   allPoints[p].PowerX,
														//PowerY:   allPoints[p].PowerY,
														//EdgePolyVertex: allPoints[p].EdgePolyVertex,
														InitID:   allPoints[p].InitID,
														TrialID:  allPoints[p].TrialID,
														PolyID:   allPoints[p].PolyID,
														RecodedTimeMouseDuration:  allPoints[p].RecodedTimeMouseDuration
                                               });
																					  
							}
							   allPoints.length=0;
							   // dataMoveWeightedEpsilon.push({TStep: stepCounter, Epsilon:  epsilon   ,  MinEpsilon: minEpsilon , MaxEpsilon: maxEpsilon, MisMatchNr: misMatchNr, CellsNumber:cellsNumber,  MouseDuration:(stepMuseMove * frameCount)});		 
							   /////////////		

//							   ++stepCounter;
							   //console.log("Move"+stepCounter);
//							   timeStep=currentTime;	
							
								var endTime= new Date().getTime();
								var totalElappsedInrun=endTime-currentTime;  
							    //accum=accum+totalElappsedInrun;//endTime-startTime;
								
								if(stepCounter==19){
/*								  console.log("indexbetaStepMove   indexTrialIniliz");
								  console.log(indexbetaStepMove+" "+indexTrialIniliz);
								  console.log(stepCounter+" in run end timer ");	//duration+
								  console.log(totalElappsedInrun);
								  console.log("accum=");	//duration+
								  console.log(accum);
								  console.log("beta");
								  console.log(beta[betaCount]);
								  console.log("stepMuseMove");
								  console.log(stepMuseMove);*/
								}

                                //////////								
								 ++stepCounter;
								 //console.log("Move"+stepCounter);
								 timeStep=currentTime;
								 if(stepCounter <20){
									isFinished=false;              
							     }
											
														   
							   
							   //console.log("Call-"+stepCounter);
							   requestAnimationFrame(run);
													 									 
						}else{
                              if(++stepMuseMoveIndex < stepMuseMoveValues.length){				
							  
								   runOneWeight( stepMuseMoveIndex,  indexTrialIniliz , polygoneIndex);	
								   
							  }else if(++indexTrialIniliz < trialInitialIndexes.length){
								  
								 var nexttrialIndex=trialInitialIndexes[indexTrialIniliz][0];
								 var nextInilizIndex=trialInitialIndexes[indexTrialIniliz][1];
								 var nextpolygoneIndex=trialInitialIndexes[indexTrialIniliz][2];
								 if(nextInilizIndex==0){
									 initOne(nextInilizIndex, nextpolygoneIndex);
									 console.log("initOne="+nextInilizIndex);
								 }
								 console.log("WeighttrialNr="+nexttrialIndex+" "+nextInilizIndex);                                		 
								 runWeightedExperiment(indexTrialIniliz,  nextpolygoneIndex);
								 
							 }
							
						}
												
															   
				
				}
				
			    timeStep=startTime;
                run();
				

										
				//totalElappsed=totalElappsed+duration;
				
}

//async 
function runOne(betaCount,stepMuseMoveIndex,Alpha_OptOrginal,indexbetaStepMove,indexTrialIniliz, polygoneIndex){  
    var polyCopy=polygonalParentCells[polygoneIndex];	
	console.log("runOne"+indexbetaStepMove+" "+indexTrialIniliz+" "+polygoneIndex);
	console.log(betaCount+" "+stepMuseMoveIndex);
	Alpha_Opt=Alpha_OptOrginal *  beta[betaCount];
	var  stepMuseMove = stepMuseMoveValues[stepMuseMoveIndex];
	
		    

			//////////////
					     		  		  			
		    for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
			  //Ri[Cindex]= computeRadius(Wi[Cindex]  , Alpha_Opt); 
			  Ri[Cindex]=  Math.sqrt(Alpha_Opt * parentArea * Wi[Cindex] / Math.PI);			  
			  nodes[Cindex].radius= Ri[Cindex];
			  updateCircleNodePositition(Cindex, Cix_Opt[Cindex], Ciy_Opt[Cindex]);	
			}
			
			computePolyCircles(polyCopy);
			//drawCicles();
			//cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
			var cells =computePowerDiagram(nodes, polyCopy);
            drawVoronoiCells(cells);
            drawCicles();
            //findAllDealunyNearestNeighber(cells);
            
			
			switchSimulationStaticToMoveMode();	
 
			
			var tickCounter=0;
			while (tickCounter <100 ){
			  ++tickCounter;
			  simulation.tick(); ticked(); 	  
			  //console.log("tick="+tickCounter);
			};
			
			computePolyCircles(polyCopy);
			drawCicles();
			 //var localparentIndexStartDragChild= findBottomLeftCellID(cells);
			 var localparentIndexStartDragChild =findPathStartCellID(cells, polygoneIndex);
             console.log("findPathStartCellID="+localparentIndexStartDragChild);
			 computePolyCircles(polyCopy);
			 drawCicles();
		    //cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
			cells =computePowerDiagram(nodes, polyCopy);
            drawVoronoiCells(cells);	
			drawAllDealunyNearestNeighber(cells);
			drawRectCircleCenter(cells);
			drawCicles();
//			drawAllDealunyNearestNeighber(cells);
			
			
			simulation.alphaTarget(.01).restart();
			
			var tickCounter=0;
			while (tickCounter <100 ){
			  ++tickCounter;
			  simulation.tick(); ticked(); 	  
			  //console.log("tick="+tickCounter);
			};
  
		       
			  
				
			  // console.log("t=0");
			   //console.log(JSON.stringify(nodesAtT0));
				
			   var move =  nodes[localparentIndexStartDragChild];  // the node to move around
 					 
			   // We don't want the force layout to mess with our node.
			   //var beforeMoveCircle=d3.select("#circleID"+localparentIndexStartDragChild);
                
				move.fx = move.x;  
				move.fy = move.y; 
							
				 
				
				
				/////
				
				//compute intermediate positions
				//var frameCount = 20; // move from X to Y over 20 frames
				var frames = []; // array of coordinates we'll compute
				frames.length=0;
				// "dumb" tween: "move X pixels every frame"
				  
				//var distance=computeDistance([finalPos.x,finalPos.y] , [move.x,move.y]);
				var targetX= parseInt(allPolygoneDiameter[polygoneIndex][1][0]);
		        var targetY= parseInt(allPolygoneDiameter[polygoneIndex][1][1]);
		  
				var delataX= Math.abs(targetX- move.x);
				var delataY= Math.abs(targetY - move.y);
				
				//var tweenAmount = (distance)/frameCount;
				var tweenAmountX = (delataX)/frameCount;
				var tweenAmountY = (delataY)/frameCount;
				for (var i=0; i<frameCount; i++) {
				  // calculate the points to animate
				  //frames[i].x = move.x+(tweenAmount*i);
				  //frames[i].y = move.y-(tweenAmount*i);	  
				  var xPos= move.x+(tweenAmountX*i);
				  var yPos=0;
				  if(move.y>targetY){
					  yPos= move.y-(tweenAmountY*i);	
				  }else{
					  yPos= move.y+(tweenAmountY*i);	
				  }
				  	
				  frames.push({x:xPos,y:yPos});
				}
				

				var startTime, time, timeStep, accum;
                var duration = stepMuseMove * frameCount;// 2000;
				var stepCounter=0;
				startTime = new Date().getTime();
				var isFinished=false;
				var run = function() {
				
				
				        if(!isFinished){
				        //if(stepCounter <20){ 
							//var currentTime=new Date().getTime();
							//time = currentTime - startTime;
							//time = time / duration;
							
							//console.log(time+" Run "+currentTime);
							//if((currentTime-timeStep) > stepMuseMove){//100
							//if(!isFinished){
								var currentTime=new Date().getTime();
								 //console.log("Call+"+stepCounter);
								 move.fx = move.px = parseInt( frames[stepCounter].x );
								 move.fy = move.py = parseInt( frames[stepCounter].y ); 

								var tickCounter=0;
								//var simStart=currentTime;
								var nextCurrentTime=currentTime;
								var recodedTimeMouseDuration=0;
								
								//while (tickCounter <100 ){//
								//while ((nextCurrentTime-currentTime) < stepMuseMove ){//
								while (!isFinished){
									simulation.tick(); ticked(); 
									nextCurrentTime=new Date().getTime();
									++tickCounter;
									//isFinished=false;
									if((nextCurrentTime-currentTime) >= stepMuseMove){
										recodedTimeMouseDuration=nextCurrentTime-currentTime;
										isFinished=true;
									}
								}
								
					
					             computePolyCircles(polyCopy);
					             //drawCicles();
								 //cells=computePowerDiagram(nodes, Ri, xmin , ymin, height, width);//computePowerDiagram(nodes);	 		
								 cells =computePowerDiagram(nodes, polyCopy);
								 drawVoronoiCells(cells);
								 drawAllDealunyNearestNeighber(cells);
								 drawRectCircleCenter(cells);
								 //drawAllDealunyNearestNeighberByLibrary(cells);
								 drawCicles();
								 
								////////////
								var allPoints=[];
								
								
								//var misMatchNr=0;
								//var epsilon=0;
								//var minEpsilon=Number.MAX_VALUE;
								//var maxEpsilon=Number.MIN_VALUE;
								//console.log("epsilon");
								//var cellsNumber= cells.length;
								var cellsNumber=childrenNumber;
								for(var index=0; index<cellsNumber ; ++index){ 
								
								    if(cells[index]=="undefined" || cells[index]==null){								   
								        allPoints.push({
											              IsMove:  false,
														  PID:-1,												 
														 // AreaTID:areaCell ,
														  posXt:-1 ,
														  posYt:-1 , 
														  //posXtmouse:move.px, 
														 // posYtmouse:move.py ,
														  RadiusRt:-1 ,
														  //VertPowerID: -1,
														  //PowerX:  -1,
														  //PowerY:  -1,
														  InitID:  -1,
														  TrialID: -1,
														  PolyID:  -1,
														  RecodedTimeMouseDuration:-1
												 });
												 												 												        												 
							            continue;
							         }
								
									  var sitePoly=cells[index].site;	   
									  var cellPolygon=Array.from(sitePoly.polygon);
									  
									 //cliping cell with parent polygn
									 for(var y=0; y<cellPolygon.length; ++y){	  
										cellPolygon[y][0]= Math.max(cellPolygon[y][0], xmin);
										cellPolygon[y][0]= Math.min(cellPolygon[y][0], xmax);
										  
										cellPolygon[y][1]=Math.max(cellPolygon[y][1], ymin);
										cellPolygon[y][1]=Math.min(cellPolygon[y][1], ymax);	  
									 }


									  var cell_Id=sitePoly.originalObject.id;	
									  
                                     //var isEdgePoly=[];
									 //isEdgePoly.length=0;
									 //isEdgePoly=getIsEdgePoly(cellPolygon, polyCopy);
									  
									  var isMove= (cell_Id==move.id);
									  //for(var cID=0; cID<cellPolygon.length; ++cID){										  
										  allPoints.push({
														  IsMove: isMove,
														  PID:cell_Id,													 
														 // AreaTID:areaCell ,
														  posXt:nodes[cell_Id].x ,
														  posYt:nodes[cell_Id].y , 
														  //posXtmouse:move.px, 
														 // posYtmouse:move.py ,
														  RadiusRt:nodes[cell_Id].radius ,
														 // VertPowerID: cID,
														 // PowerX:  cellPolygon[cID][0],
														 // PowerY:  cellPolygon[cID][1],
														 // EdgePolyVertex: isEdgePoly[cID],
														  InitID:  trialInitialIndexes[indexTrialIniliz][1],
														  TrialID: trialInitialIndexes[indexTrialIniliz][0],
														  PolyID:  polygoneIndex,
														  RecodedTimeMouseDuration: recodedTimeMouseDuration
														  });
									 // }
									 																	
								}
								
								allPoints.sort(function(a, b) {
									return parseFloat(a.PID) - parseFloat(b.PID);
								});
											  
									 
							    for(var p = 0; p < allPoints.length; p++){		 
								      dataMoveEpsilon.push({Technique:"BUBBLE",
										                    TStep: stepCounter, 
									                        IsMove: allPoints[p].IsMove,
															PID:allPoints[p].PID, 															 
															posXt:allPoints[p].posXt,
															posYt:allPoints[p].posYt,															 
															RadiusRt:allPoints[p].RadiusRt,													
															//VertPowerID: allPoints[p].VertPowerID,
															//PowerX:   allPoints[p].PowerX,
															//PowerY:   allPoints[p].PowerY,
															//EdgePolyVertex: allPoints[p].EdgePolyVertex,
															InitID:   allPoints[p].InitID,
															TrialID:  allPoints[p].TrialID,
															PolyID:   allPoints[p].PolyID,
															RecodedTimeMouseDuration:  allPoints[p].RecodedTimeMouseDuration
															});  
																						  
								}
								//dataMoveEpsilon.push({TStep: stepCounter, Epsilon:  epsilon , MinEpsilon: minEpsilon , MaxEpsilon: maxEpsilon, MisMatchNr:  misMatchNr , CellsNumber:cellsNumber, BetaValue:beta[betaCount], MouseDuration:(stepMuseMove * frameCount)});
								allPoints.length=0;
								/////////////
								

								var endTime= new Date().getTime();
								var totalElappsedInrun=endTime-currentTime;  
							    accum=accum+totalElappsedInrun;//endTime-startTime;
								
								if(stepCounter==19){
/*								  console.log("indexbetaStepMove   indexTrialIniliz");
								  console.log(indexbetaStepMove+" "+indexTrialIniliz);
								  console.log(stepCounter+" in run end timer ");	//duration+
								  console.log(totalElappsedInrun);
								  console.log("accum=");	//duration+
								  console.log(accum);
								  console.log("beta");
								  console.log(beta[betaCount]);
								  console.log("stepMuseMove");
								  console.log(stepMuseMove);*/
								}

                                //////////								
								 ++stepCounter;
								 //console.log("Move"+stepCounter);
								 timeStep=currentTime;
								 if(stepCounter <20){
									isFinished=false;              
							     }
											
														   
							   
							   //console.log("Call-"+stepCounter);
							   requestAnimationFrame(run);
						}else{
/*							 console.log(stepCounter+" > timer ");
							 console.log("final accum=");	//duration+
						     console.log(accum);*/ 
							 
						     move.fx=null;
			                 move.fy=null;	
						     simulation.stop();	
							 
							 //if(indexbetaStepMove==betaStepMoveIndexes.length-1){
								   var startTimePOS_FINAL=new Date().getTime();
								   runOneIteration(0.9 ,polygoneIndex);		
								   var cellsAfterStaticMode =computePowerDiagram(nodes, polyCopy);
								    recordBubbleStartFinalStepBeforeWeightOptimizData(cellsAfterStaticMode, "POS_FINAL",indexTrialIniliz,polygoneIndex,startTimePOS_FINAL);
								    drawVoronoiCells(cellsAfterStaticMode);
									
									drawAllDealunyNearestNeighber(cells);
								    drawRectCircleCenter(cells);
								    drawCicles();
									
									
								   var startTimeWEIGHT_FINAL=new Date().getTime();
								   var finalCells=runLastOneIterationBubleWeighted(nodes, polygoneIndex);	
                                   recordBubbleStartFinalStepAfterWeightOptimizData(finalCells, "WEIGHT_FINAL",indexTrialIniliz,polygoneIndex,startTimeWEIGHT_FINAL);						
							       drawWeightedVoronoiCells(finalCells);
			                       drawRectWeightedVoronoi(finalCells);	
							 
							 //}
							 
							 if(++indexbetaStepMove<betaStepMoveIndexes.length){
								   var stTime=new Date().getTime();	
								   runOneIteration(0.9 ,polygoneIndex);								   
								   var startCells=runLastOneIterationBubleWeighted(nodes, polygoneIndex);	
                                   recordBubbleStartFinalStepAfterWeightOptimizData(startCells, "start",indexTrialIniliz,polygoneIndex,stTime);						
								   
								   var nextbetaCount=betaStepMoveIndexes[indexbetaStepMove][0];
								   var nextstepMuseMoveIndex=betaStepMoveIndexes[indexbetaStepMove][1];
								   runOne(nextbetaCount,nextstepMuseMoveIndex,Alpha_OptOrginal,indexbetaStepMove,indexTrialIniliz , polygoneIndex);
								   
							 }else if(++indexTrialIniliz < trialInitialIndexes.length){
								 var nexttrialIndex=trialInitialIndexes[indexTrialIniliz][0];
								 var nextInilizIndex=trialInitialIndexes[indexTrialIniliz][1];
								 var nextpolygoneIndex=trialInitialIndexes[indexTrialIniliz][2];
								 if(nextInilizIndex==0){
									 initOne(nextInilizIndex, nextpolygoneIndex);
									 console.log("initOne="+nextInilizIndex);
								 }
								 console.log("BubbletrialNr="+nexttrialIndex+" "+nextInilizIndex);                                		 
								 runBubbleExperiment(0,indexTrialIniliz,  nextpolygoneIndex);
							 }
 							 
						}
				}
				accum=0;
			    timeStep=startTime;
                run();
				
				
				
				
                				

					
				//var endTime= new Date().getTime();
				//var totalElappsed=endTime-startTime;
			    //console.log("out end timer ");	//duration+
				//console.log(totalElappsed);
	
}

//async 
function runOne1(betaCount,stepMuseMoveIndex,Alpha_OptOrginal,indexbetaStepMove,indexTrialIniliz, polygoneIndex){  
    var polyCopy=polygonalParentCells[polygoneIndex];	
	console.log("runOne"+indexbetaStepMove+" "+indexTrialIniliz+" "+polygoneIndex);
	console.log(betaCount+" "+stepMuseMoveIndex);
	Alpha_Opt=Alpha_OptOrginal *  beta[betaCount];
	var  stepMuseMove = stepMuseMoveValues[stepMuseMoveIndex];
	
		    

			//////////////
			
		    for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
			  Ri[Cindex]= computeRadius(Wi[Cindex]  , Alpha_Opt); 
			  nodes[Cindex].radius= Ri[Cindex];
			  updateCircleNodePositition(Cindex, Cix_Opt[Cindex], Ciy_Opt[Cindex]);	
			}
			
			computePolyCircles(polyCopy);
			drawCicles();
			//cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
			var cells =computePowerDiagram(nodes, polyCopy);
            drawVoronoiCells(cells);
            //drawCicles();
            //findAllDealunyNearestNeighber(cells);
            
			
			switchSimulationStaticToMoveMode();	
 
			
			var tickCounter=0;
			while (tickCounter <100 ){
			  ++tickCounter;
			  simulation.tick(); ticked(); 	  
			  //console.log("tick="+tickCounter);
			};
			
			computePolyCircles(polyCopy);
			drawCicles();
			 //var localparentIndexStartDragChild= findBottomLeftCellID(cells);
			 var localparentIndexStartDragChild =findPathStartCellID(cells, polygoneIndex);
             console.log("findPathStartCellID="+localparentIndexStartDragChild);
			 computePolyCircles(polyCopy);
			 drawCicles();
		    //cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
			cells =computePowerDiagram(nodes, polyCopy);
            drawVoronoiCells(cells);	
			drawAllDealunyNearestNeighber(cells);
			drawRectCircleCenter(cells);
			drawCicles();
//			drawAllDealunyNearestNeighber(cells);
			
			
			simulation.alphaTarget(.01).restart();
			
			var tickCounter=0;
			while (tickCounter <100 ){
			  ++tickCounter;
			  simulation.tick(); ticked(); 	  
			  //console.log("tick="+tickCounter);
			};
  
		       
			  
				
			  // console.log("t=0");
			   //console.log(JSON.stringify(nodesAtT0));
				
			   var move =  nodes[localparentIndexStartDragChild];  // the node to move around
 					 
			   // We don't want the force layout to mess with our node.
			   //var beforeMoveCircle=d3.select("#circleID"+localparentIndexStartDragChild);
                
				move.fx = move.x;  
				move.fy = move.y; 
							
				 
				
				
				/////
				
				//compute intermediate positions
				//var frameCount = 20; // move from X to Y over 20 frames
				var frames = []; // array of coordinates we'll compute
				frames.length=0;
				// "dumb" tween: "move X pixels every frame"
				  
				//var distance=computeDistance([finalPos.x,finalPos.y] , [move.x,move.y]);
				var delataX= Math.abs(finalPos.x - move.x);
				var delataY= Math.abs(finalPos.y - move.y);
				
				//var tweenAmount = (distance)/frameCount;
				var tweenAmountX = (delataX)/frameCount;
				var tweenAmountY = (delataY)/frameCount;
				for (var i=0; i<frameCount; i++) {
				  // calculate the points to animate
				  //frames[i].x = move.x+(tweenAmount*i);
				  //frames[i].y = move.y-(tweenAmount*i);	  
				  var xPos= move.x+(tweenAmountX*i);
				  var yPos= move.y-(tweenAmountY*i);	
				  frames.push({x:xPos,y:yPos});
				}
				

				var startTime, time, timeStep, accum;
                var duration = stepMuseMove * frameCount;// 2000;
				var stepCounter=0;
				startTime = new Date().getTime();
				var isFinished=false;
				var run = function() {
				
				
				        if(!isFinished){
				        //if(stepCounter <20){ 
							//var currentTime=new Date().getTime();
							//time = currentTime - startTime;
							//time = time / duration;
							
							//console.log(time+" Run "+currentTime);
							//if((currentTime-timeStep) > stepMuseMove){//100
							//if(!isFinished){
								var currentTime=new Date().getTime();
								 //console.log("Call+"+stepCounter);
								 move.fx = move.px = parseInt( frames[stepCounter].x );
								 move.fy = move.py = parseInt( frames[stepCounter].y ); 

								var tickCounter=0;
								//var simStart=currentTime;
								var nextCurrentTime=currentTime;
								
								//while (tickCounter <100 ){//
								//while ((nextCurrentTime-currentTime) < stepMuseMove ){//
								while (!isFinished){
									simulation.tick(); ticked(); 
									nextCurrentTime=new Date().getTime();
									++tickCounter;
									//isFinished=false;
									if((nextCurrentTime-currentTime) >= stepMuseMove)
										isFinished=true;
								}
								
								//console.log("nextCurrentTime-currentTime");
								//console.log(nextCurrentTime-currentTime);
								
								/*while (tickCounter <1000 ){
								  								  
								  ++tickCounter;
								  simulation.tick(); ticked(); 
                                  
								  locCurrentTime=new Date().getTime();
								  if((locCurrentTime-simStart) > stepMuseMove){
									  //console.log("tick="+tickCounter);
								      //console.log(locCurrentTime-simStart);
									  break;								 
								  }									  
								  								   
								};*/
					

					
					
					
					             computePolyCircles(polyCopy);
					             drawCicles();
								 //cells=computePowerDiagram(nodes, Ri, xmin , ymin, height, width);//computePowerDiagram(nodes);	 		
								 cells =computePowerDiagram(nodes, polyCopy);
								 drawVoronoiCells(cells);
								 drawAllDealunyNearestNeighber(cells);
								 drawRectCircleCenter(cells);
								 //drawAllDealunyNearestNeighberByLibrary(cells);
								 //drawCicles();
								 
								////////////
								var allPoints=[];
								
								
								var misMatchNr=0;
								var epsilon=0;
								var minEpsilon=Number.MAX_VALUE;
								var maxEpsilon=Number.MIN_VALUE;
								//console.log("epsilon");
								//var cellsNumber= cells.length;
								var cellsNumber=childrenNumber;
								for(var index=0; index<cellsNumber ; ++index){ 
								
								    if(cells[index]=="undefined" || cells[index]==null){								   
								        allPoints.push({PID:-1,
								                 AreaTID:0 ,
								                 posXt:0 ,
												 posYt:0 , 
											     posXtmouse:move.x, 
												 posYtmouse:move.y,
												 RadiusRt:0
												 });
												 
							            continue;
							         }
								
									  var sitePoly=cells[index].site;	   
									  var cellPolygon=Array.from(sitePoly.polygon);
									  
									 //cliping cell with parent polygn
									 for(var y=0; y<cellPolygon.length; ++y){	  
										cellPolygon[y][0]= Math.max(cellPolygon[y][0], xmin);
										cellPolygon[y][0]= Math.min(cellPolygon[y][0], xmax);
										  
										cellPolygon[y][1]=Math.max(cellPolygon[y][1], ymin);
										cellPolygon[y][1]=Math.min(cellPolygon[y][1], ymax);	  
									 }

									  var areaCell= d3.polygonArea(cellPolygon);
									  var cell_Id=sitePoly.originalObject.id;		
									  var e = (Math.abs(Wi[cell_Id] - (areaCell/parentArea)) ) / Wi[cell_Id]; /// Wi[cell_Id]
									  minEpsilon = Math.min(e, minEpsilon) ;
									  maxEpsilon = Math.max(e, maxEpsilon) ;
						 
									  epsilon= epsilon + e * Wi[cell_Id];
									  
									  allPoints.push({PID:cell_Id,AreaTID:areaCell ,posXt:nodes[cell_Id].x ,posYt:nodes[cell_Id].y , posXtmouse:move.px, posYtmouse:move.py , RadiusRt:nodes[cell_Id].radius });
									  
									  ///updateCircleNodePositition(cell_Id, sitePoly.x, sitePoly.y);	
									  //if(cell_Id!=localparentIndexStartDragChild){				     
										   var currenCellPos= [nodes[cell_Id].x, nodes[cell_Id].y] ;
										   var nnCellID=findNearestNeighber(currenCellPos);
										   //console.log(parseInt(nnCellID)+"-"+ parseInt(cell_Id));
										   if(parseInt(nnCellID)!= parseInt(cell_Id) ){
												misMatchNr= misMatchNr + 1;
										   }  
									  //}
																	
								}
								
								allPoints.sort(function(a, b) {
									return parseFloat(a.PID) - parseFloat(b.PID);
								});
											  
									 
							    for(var p = 0; p < allPoints.length; p++){		 
								      dataMoveEpsilon.push({TStep: stepCounter, 
															Epsilon:  epsilon, 
															MinEpsilon: minEpsilon, 
															MaxEpsilon: maxEpsilon,
															MisMatchNr:  misMatchNr, 
															CellsNumber: cells.length,//cellsNumber,
															BetaValue:beta[betaCount],
															MouseDuration:(stepMuseMove * frameCount),
															PID:allPoints[p].PID, 
															AreaTID: allPoints[p].AreaTID,
															posXt:allPoints[p].posXt,
															posYt:allPoints[p].posYt,
															posXtmouse: allPoints[p].posXtmouse,
															posYtmouse:allPoints[p].posYtmouse,
															RadiusRt:nodes[cell_Id].radius
															});  
																						  
								}
								//dataMoveEpsilon.push({TStep: stepCounter, Epsilon:  epsilon , MinEpsilon: minEpsilon , MaxEpsilon: maxEpsilon, MisMatchNr:  misMatchNr , CellsNumber:cellsNumber, BetaValue:beta[betaCount], MouseDuration:(stepMuseMove * frameCount)});
								allPoints.length=0;
								/////////////
								

								var endTime= new Date().getTime();
								var totalElappsedInrun=endTime-currentTime;  
							    accum=accum+totalElappsedInrun;//endTime-startTime;
								
								if(stepCounter==19){
/*								  console.log("indexbetaStepMove   indexTrialIniliz");
								  console.log(indexbetaStepMove+" "+indexTrialIniliz);
								  console.log(stepCounter+" in run end timer ");	//duration+
								  console.log(totalElappsedInrun);
								  console.log("accum=");	//duration+
								  console.log(accum);
								  console.log("beta");
								  console.log(beta[betaCount]);
								  console.log("stepMuseMove");
								  console.log(stepMuseMove);*/
								}

                                //////////								
								 ++stepCounter;
								 //console.log("Move"+stepCounter);
								 timeStep=currentTime;
								 if(stepCounter <20){
									isFinished=false;              
							     }
											
														   
							   
							   //console.log("Call-"+stepCounter);
							   requestAnimationFrame(run);
						}else{
/*							 console.log(stepCounter+" > timer ");
							 console.log("final accum=");	//duration+
						     console.log(accum);*/ 
							 
						     move.fx=null;
			                 move.fy=null;	
						     simulation.stop();	
							 
							 if(++indexbetaStepMove<betaStepMoveIndexes.length){
								 
							   var nextbetaCount=betaStepMoveIndexes[indexbetaStepMove][0];
							   var nextstepMuseMoveIndex=betaStepMoveIndexes[indexbetaStepMove][1];
							   runOne(nextbetaCount,nextstepMuseMoveIndex,Alpha_OptOrginal,indexbetaStepMove,indexTrialIniliz , polygoneIndex);
							   
							 }else if(++indexTrialIniliz < trialInitialIndexes.length){
								 var nexttrialIndex=trialInitialIndexes[indexTrialIniliz][0];
								 var nextInilizIndex=trialInitialIndexes[indexTrialIniliz][1];
								 var nextpolygoneIndex=trialInitialIndexes[indexTrialIniliz][2];
								 if(nextInilizIndex==0){
									 initOne(nextInilizIndex, nextpolygoneIndex);
									 console.log("initOne="+nextInilizIndex);
								 }
								 console.log("BubbletrialNr="+nexttrialIndex+" "+nextInilizIndex);							 
								 runBubbleExperiment(0,indexTrialIniliz,  nextpolygoneIndex);
							 }
 							 
						}
				}
				accum=0;
			    timeStep=startTime;
                run();
				
				
				
				
                				

					
				//var endTime= new Date().getTime();
				//var totalElappsed=endTime-startTime;
			    //console.log("out end timer ");	//duration+
				//console.log(totalElappsed);
	
}


function getIsEdgePoly(cellPolygon, polyCopy){
	  var PolyVertexIsEdgePol=new Array(cellPolygon.length);
	  for(var cID=0; cID<cellPolygon.length; ++cID){
		  PolyVertexIsEdgePol[cID]=false;
	  }
	  
	  for(var cID=0; cID<cellPolygon.length; ++cID){										  
		  if(cID< cellPolygon.length-1){
			var isEdgePolyVertex= idEdgePartOfPoly(cellPolygon[cID],cellPolygon[cID+1], polyCopy);
			if(isEdgePolyVertex){
				PolyVertexIsEdgePol[cID]=isEdgePolyVertex;
				PolyVertexIsEdgePol[cID+1]=isEdgePolyVertex;
			}
		  }else{
			var isEdgePolyVertex= idEdgePartOfPoly(cellPolygon[cID],cellPolygon[0], polyCopy);  
				
			if(isEdgePolyVertex){
				PolyVertexIsEdgePol[cID]=isEdgePolyVertex;
				PolyVertexIsEdgePol[0]=isEdgePolyVertex;
			}
		  }
	  }
	  
	  return PolyVertexIsEdgePol;
}

function idEdgePartOfPoly(p1,p2,polyCopy){
	
	if(!d3.polygonContains(polyCopy,p1) && !d3.polygonContains(polyCopy,p2))
		return true;
	else return false;
	
	/*for(var cID=0; cID<polyCopy.length; ++cID){
		 if(cID< cellPolygon.length-1){
			  cellPolygon[cID] cellPolygon[cID+1]
		 }else{
			  cellPolygon[cID] cellPolygon[0]
		 }
	}*/
	
}


function initOne(initIndez, polygoneIndex){
   // console.log("BubbletrialNr="+0);
	nodesOrginal.length=0;	
	nodesOrginal=	 AllnodesOrginal[initIndez].concat();			

   //to make sure nodes have initial values again	
	for(var Nindex=0; Nindex<Ni.length; ++Nindex){    
		  nodes[Nindex].x= nodesOrginal[Nindex].x;
		  nodes[Nindex].y= nodesOrginal[Nindex].y;
		  nodes[Nindex].radius= nodesOrginal[Nindex].radius;
		  nodes[Nindex].id= nodesOrginal[Nindex].id;
		  nodes[Nindex].type= nodesOrginal[Nindex].type;

	
		  nodesCopy[Nindex].x= nodesOrginal[Nindex].x;
		  nodesCopy[Nindex].y= nodesOrginal[Nindex].y;
		  nodesCopy[Nindex].radius= nodesOrginal[Nindex].radius;
		  nodesCopy[Nindex].id= nodesOrginal[Nindex].id;
		  nodesCopy[Nindex].type= nodesOrginal[Nindex].type;			  	  
	}		
	
	
 ////// set polygone
	var polyCopy=[];
	var poly=[];
	poly.length=0;	
	polyCopy.length=0;

	
	polyCopy=polygonalParentCells[polygoneIndex];
	//polyCopyDiameterPoints.length=0;
    //polyCopyDiameterPoints=  allPolygoneDiameter[polygoneIndex];
	
	for(var i=0;i<polyCopy.length;++i){
			 var x=polyCopy[i][0];
			 var y=polyCopy[i][1];
			 xminPolygone = Math.min(xminPolygone,x);
			 xmaxPolygone = Math.max(xmaxPolygone,x);
			 yminPolygone = Math.min(yminPolygone,y);
			 ymaxPolygone = Math.max(ymaxPolygone,y); 
			 var cordinateObj={"x":x, "y":y};
			 poly.push(cordinateObj);
    }
		
	setParentArea(d3.polygonArea(polyCopy));
    drawGrandParentCell(poly);
///////	
	
//		console.log("initOne");
//	    console.log(polyCircles);
		
		
	computePolyCircles(polyCopy); 
	

		 
//		console.log("after initOne");
//	    console.log(polyCircles);
	
}


function waitFun(){

	var old_sim_time= getTime();//new Date();
	var sim_elappsed=0;
	while(sim_elappsed < 500){
	
	   //simulation.tick(); ticked(); 
	   
	   var new_sim_time  = getTime();//new Date();
	   sim_elappsed=new_sim_time-old_sim_time;
	   
	};	
}



function switchSimulationStaticToMoveMode(){
	//modify parameters of simulation to switch from static mode to move mode
   simulation.nodes(nodes)
  .force("charge", d3.forceManyBody().strength(0))
  .force("center", null)
  .force('x', d3.forceX().x(function(d) {
	 return nodes[d.id].x; 
  }).strength(10))
  .force('y', d3.forceY().y(function(d) {
	return nodes[d.id].y;
  }).strength(10))
  .force('collision', d3.forceCollide().strength(2).iterations(10).radius(function(d) {
	return Ri[d.id] ; 
  }));
	

  var tickCounter=0;
  while (tickCounter <100 ){
	  ++tickCounter;
	  simulation.tick(); ticked(); 	  
	  //console.log("tick="+tickCounter);
  };
									
	
/* simulation.nodes(nodes)								
  .force("charge", d3.forceManyBody().strength(0))
  .force("center", null)//.strength(0)
 .force('x', d3.forceX().x(function(d) {
	 return nodes[d.id].x; 
  }).strength(10))
.force('y', d3.forceY().y(function(d) {
	return nodes[d.id].y;
  }).strength(10))
.force('collision', d3.forceCollide().strength(2).iterations(100).radius(function(d) {
				return Ri[d.id] ; 
  })).on('tick', ticked);*/
								  
}



function findNearestNeighber(currenCell){
     var nearestNeighberID=-1;
     var minDistance= Number.MAX_VALUE ;
	 //nodesAtT0=shuffle(nodesAtT0);
	 
	 for(var cellInd=0; cellInd<nodesAtT0.length; ++cellInd){
         var nodeCell= [nodesAtT0[cellInd].x, nodesAtT0[cellInd].y] ;
		 
	     var distance=computeDistance(currenCell , nodeCell);
		 
		 if(minDistance>distance){
		    minDistance=distance;
			nearestNeighberID=cellInd;
		 }
	 }
	 
	 return nearestNeighberID;
}


function checkEdgeExist(edge,cellpolygonEdges) {
	var edges=cellpolygonEdges.filter(e => (   (e.x1 == edge.x1  && e.y1 == edge.y1 && e.x2 == edge.x2  && e.y2 == edge.y2))    );
    return edges.length;
}

function checkEdgeReverseExist(edge,cellpolygonEdges) {
	var edges=cellpolygonEdges.filter(e => (  	(e.x1 == edge.x2  && e.y1 == edge.y2 && e.x2 == edge.x1  && e.y2 == edge.y1) )    );
    return edges.length;
}



function computePowerDistance(x1,y1,x,y,r){
	
	return (Math.pow( (x1  - x),2) + Math.pow( (y1 - y), 2) - Math.pow(r, 2));
	
}

function drawAllDealunyNearestNeighber(cells){
	var delunyEdges=[];
	var cellpolygonEdges=[];
	var midP=[];
	var nodesNeibureMap=new Map();
    for(var ind=0; ind<cells.length ; ++ind){
		  var sitePoly=cells[ind].site;	
		  var cell_Id=sitePoly.originalObject.id;
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
			  var r=parseInt(nodes[cell_Id].radius);// Ri[cell_Id]
			  
			  distancePower=computePowerDistance(midx,midy,x,y,r);
					  
			  distArray.push({dist:distancePower,cell_Id:cell_Id});
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
			    delunyEdges.push(
					{x1: nodes[min1ID].x, 
					 y1: nodes[min1ID].y, 
					 x2: nodes[min2ID].x, 
					 y2: nodes[min2ID].y,
					 Delaunay_edge_start: min1ID,
					 Delaunay_edge_end: min2ID
					 }
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
	
	
	 //console.log("delunyEdges");	
	 //console.log(delunyEdges);


       var lin=d3.select('svg g')
		.selectAll('line')
		.data(delunyEdges);

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

        	   
      /* svg.selectAll('.midP')
			.remove();
	  
	    svg.selectAll('.midP')
		.data(midP)
		.enter().append("rect")
		  .attr("x", function (d) { return d.x; }) // x position of rect node
		  .attr("y", function (d) { return d.y ; }) // y position of rect node 
		  .attr("width", function(d,i){ return   5 ; })// initial width of rect  
		  .attr("height", function(d,i){ return  5   ; } )// initial height of rect  
		  .attr("class", "midP")		   
		  .style("stroke-width", 1) // initial thickhness of border is 1
		  .style("stroke",  "blue") // color points
		  .style("fill", "blue");*/
  
  ////////////
		  
		 // console.log("nodesNeibureMap");		  
		 // nodesNeibureMap.forEach(function(value, key) {
			//  console.log(key + ' = ' + value)
		  //})
					  
	
	
}


function getAllDealunyNearestNeighber(cells, techniqe){
	
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
			  var r=parseInt(nodes[cell_Id].radius);// Ri[cell_Id]
			  
			  distancePower=computePowerDistance(midx,midy,x,y,r);
					  
			  distArray.push({dist:distancePower,cell_Id:cell_Id});
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
			    delunyEdges.push(
					{x1: nodes[min1ID].x, 
					 y1: nodes[min1ID].y, 
					 x2: nodes[min2ID].x, 
					 y2: nodes[min2ID].y,
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
	
	
	return delunyEdges;
}



function drawAllDealunyNearestNeighberByLibrary(cells){
	
	var delunyEdges=[];
	delunyEdges.length=0;
	
    for(var ind=0; ind<cells.length ; ++ind){
		  var sitePoly=cells[ind].site;	
		  var cell_Id=sitePoly.originalObject.id;
		  var cellneighbours=Array.from(sitePoly.neighbours);
		  console.log("cellneighbours");
		  console.log(cellneighbours);
		  
	      for(var y=0; y<cellneighbours.length; ++y){	
			  delunyEdges.push(
				{x1: nodes[cell_Id].x, 
				 y1: nodes[cell_Id].y, 
				 x2: cellneighbours[y].x, 
				 y2: cellneighbours[y].y}
			  );
		  }
		  

		  cellneighbours.length=0;		  
	}
	
		
			
	   var lin=d3.select('svg g')
		.selectAll('line')
		.data(delunyEdges);

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




//for testing purpose
function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}


function runWeightedExperiment( indexTrialIniliz, polygoneIndex){
	
	runOneWeight(0, indexTrialIniliz, polygoneIndex);
}

async function runWeightedExperiment1(){


  //var cellsOuter=computeWeighted(nodesCopy); 
  //copyNodesCopyAt0(cellsOuter);
  
  /*var outernodesCopy= JSON.parse(JSON.stringify(nodesCopy)); 
	
  for(var index=0; index<cellsOuter.length ; ++index){ 
		  var sitePoly=cellsOuter[index].site;			  
		  var sitePolyX=sitePoly.x;
		  var sitePolyY=sitePoly.y;
		  var sitePolyWeight=sitePoly.weight;
			  
		  var cell_id=sitePoly.originalObject.data.originalData.id;
		  //outernodesCopy[cell_id].x=  sitePolyX;
	      //outernodesCopy[cell_id].y=  sitePolyY;
		  outernodesCopy[cell_id].previousX= sitePolyX;
		  outernodesCopy[cell_id].previousY= sitePolyY;
		  outernodesCopy[cell_id].previousWeight= sitePolyWeight;					 	          
   }*/
   

  //updatecopyNodesPreviousNodes1(cells);
  
    var totalElappsed=0;
    for(var stepMuseMoveIndex=0; stepMuseMoveIndex< stepMuseMoveValues.length; ++stepMuseMoveIndex ){
	 
		  var stepMuseMove= stepMuseMoveValues[stepMuseMoveIndex];	
		  
		  var arrayOfFixedPositionsNodesSim=[];
		  arrayOfFixedPositionsNodesSim.length=0;
		  var cells=computeWeightedWithFixed(nodesCopy, arrayOfFixedPositionsNodesSim, xmin ,ymin , width, height);
		  
		  copyNodesCopyAt0(cells);
				  
		  //var cells =computeWeightedBasedOnPrevoius(outernodesCopy, arrayOfFixedPositionsNodesSim , xmin ,ymin , width, height);		
		  drawWeightedVoronoiCells(cells);
		  drawRectWeightedVoronoi(cells);
		 
		 
		  
		  ////// have snapshot from cells (Not from nodes) at step 0

		  

   
   
	  
	      // drawWeightedVoronoiCells(cells);
//		  drawRectWeightedVoronoi(cells); // calling this function is needed for store xy positions in nodesCopy except node of mouse 
		  ////////////////////
		  //parentIndexStartDragChild = findBottomLeftWeightedCellID(cells);
		  parentIndexStartDragChild =findPathStartCellID(cells);
		  console.log("findBottomLeftCellID="+parentIndexStartDragChild);
          arrayOfFixedPositionsNodesSim.push(parentIndexStartDragChild+"");
					   
		  var move =  nodesCopy[parentIndexStartDragChild];  // the node to move around
		  
		  //compute intermediate positions
		  //var frameCount = 20; // move from X to Y over 20 frames
		  var frames = []; // array of coordinates we'll compute
		  frames.length=0;
		  // "dumb" tween: "move X pixels every frame"
		  
		  //var distance=computeDistance([finalPos.x,finalPos.y] , [move.x,move.y]);
		  var delataX= Math.abs(finalPos.x - move.x);
		  var delataY= Math.abs(finalPos.y - move.y);
		
		  //var tweenAmount = (distance)/frameCount;
		  var tweenAmountX = (delataX)/frameCount;
		  var tweenAmountY = (delataY)/frameCount;
		  for (var i=0; i<frameCount; i++) {
		     // calculate the points to animate
		     //frames[i].x = move.x+(tweenAmount*i);
		     //frames[i].y = move.y-(tweenAmount*i);	  
		     var xPos= move.x+(tweenAmountX*i);
		     var yPos= move.y-(tweenAmountY*i);	
		     frames.push({x:xPos,y:yPos});
		  }
		
		  //do{
		  //console.log("frames");	
		  //console.log(frames);
		  
		  
		  var startTime, time, timeStep;
		  var duration = stepMuseMove * frameCount;// 2000;
		  var stepCounter=0;
		  startTime = new Date().getTime();
		  var run = function() {
		
				if(stepCounter <20){ 
						var currentTime=new Date().getTime();
						time = currentTime - startTime;
						time = time / duration;
						
						//console.log(time+" Run "+currentTime);
						if((currentTime-timeStep) > stepMuseMove){//100
							 //console.log("Call+"+stepCounter);
							 
							 move.x = parseInt( frames[stepCounter].x ); //= move.px 
							 move.y =  parseInt( frames[stepCounter].y ); 		//move.py =
							 
							 nodesCopy[parentIndexStartDragChild].x=  move.x;
							 nodesCopy[parentIndexStartDragChild].y=  move.y;			
							 
							 //console.log("nodesCopy"+stepCounter);
							 //console.log(nodesCopy[parentIndexStartDragChild].x +" "+nodesCopy[parentIndexStartDragChild].y);		 
							

							 cells =computeWeightedBasedOnPrevoius(nodesCopy, arrayOfFixedPositionsNodesSim , xmin ,ymin , width, height);		
		                     drawWeightedVoronoiCells(cells);
			                 drawRectWeightedVoronoi(cells);
			
                             ////////////		
                             var allPoints=[];
							 
							 var epsilon=0;
							 var misMatchNr=0;
							 var minEpsilon=Number.MAX_VALUE;
							 var maxEpsilon=Number.MIN_VALUE;
							 //console.log("epsilon");
							 //var cellsNumber= cells.length;
							 var cellsNumber=childrenNumber;
							 
							 for(var index=0; index<cellsNumber ; ++index){ 
							 
							      if(cells[index]=="undefined" || cells[index]==null){
								   
								       allPoints.push({PID:-1,
								                 AreaTID:0 ,
								                 posXt:0 ,
												 posYt:0 , 
											     posXtmouse:move.x, 
												 posYtmouse:move.y});
												 
							           continue;
							      }
								  
								  var sitePoly=cells[index].site;	   
								  var cellPolygon=Array.from(sitePoly.polygon);
								  
								 //cliping cell with parent polygn
								 /*for(var y=0; y<cellPolygon.length; ++y){	  
									cellPolygon[y][0]= Math.max(cellPolygon[y][0], xmin);
									cellPolygon[y][0]= Math.min(cellPolygon[y][0], xmax);
									  
									cellPolygon[y][1]=Math.max(cellPolygon[y][1], ymin);
									cellPolygon[y][1]=Math.min(cellPolygon[y][1], ymax);	  
								 }*/
							

								  var cell_Id=sitePoly.originalObject.data.originalData.id; 	
								  
								  var areaCell= d3.polygonArea(cellPolygon);
								  var e = (Math.abs(WiCopy[cell_Id] - (areaCell/parentArea)) ) / WiCopy[cell_Id]; /// Wi[cell_Id]
								  minEpsilon = Math.min(e, minEpsilon) ;
								  maxEpsilon = Math.max(e, maxEpsilon) ;
					 
								  epsilon= epsilon + e * WiCopy[cell_Id];

								  allPoints.push({PID:cell_Id,
								                 AreaTID:areaCell ,
								                 posXt:nodesCopy[cell_Id].x ,
												 posYt:nodesCopy[cell_Id].y , 
											     posXtmouse:move.x, 
												 posYtmouse:move.y});
								  
								  ///updateCircleNodePositition(cell_Id, sitePoly.x, sitePoly.y);	
								  var currenCellPos= [nodesCopy[cell_Id].x, nodesCopy[cell_Id].y] ;	
								  
								  var nnCellID=findNearestNeighberWeighted(currenCellPos);
								  //console.log(parseInt(nnCellID)+"-"+ parseInt(cell_Id));
								  if(parseInt(nnCellID)!= parseInt(cell_Id) )
								  {
									misMatchNr= misMatchNr + 1;
								  }		
								 

							 }
									  
							 allPoints.sort(function(a, b) {
									return parseFloat(a.PID) - parseFloat(b.PID);
								});
											  
									 
							for(var p = 0; p < allPoints.length; p++){			 
							
								  dataMoveWeightedEpsilon.push({TStep: stepCounter, 
														Epsilon:  epsilon, 
														MinEpsilon: minEpsilon, 
														MaxEpsilon: maxEpsilon,
														MisMatchNr:  misMatchNr, 
														CellsNumber:cells.length,//cellsNumber,
														MouseDuration:(stepMuseMove * frameCount),
														PID:allPoints[p].PID, 
														AreaTID: allPoints[p].AreaTID,
														posXt:allPoints[p].posXt,
														posYt:allPoints[p].posYt,
														posXtmouse: allPoints[p].posXtmouse,
														posYtmouse:allPoints[p].posYtmouse});  
																					  
							}
							allPoints.length=0;
							// dataMoveWeightedEpsilon.push({TStep: stepCounter, Epsilon:  epsilon   ,  MinEpsilon: minEpsilon , MaxEpsilon: maxEpsilon, MisMatchNr: misMatchNr, CellsNumber:cellsNumber,  MouseDuration:(stepMuseMove * frameCount)});		 
							 /////////////		

							  ++stepCounter;
							  //console.log("Move"+stepCounter);
							  timeStep=currentTime;							 									 
						}
												
															   
								   
						//console.log("Call-"+stepCounter);
						requestAnimationFrame(run);
					}else{
						 
											   
					}
				}
				
			    timeStep=startTime;
                run();
				

					
					
				totalElappsed=totalElappsed+duration;
			    //console.log(duration+" end timer "+totalElappsed);	
				
				//nodesCopy= JSON.parse(JSON.stringify(nodesOrginal)); 
				/*for(var Nindex=0; Nindex<Ni.length; ++Nindex){    
					  nodesCopy[Nindex].x= nodesOrginal[Nindex].x;
					  nodesCopy[Nindex].y= nodesOrginal[Nindex].y;
					  nodesCopy[Nindex].radius= nodesOrginal[Nindex].radius;
					  nodesCopy[Nindex].id= nodesOrginal[Nindex].id;
					  nodesCopy[Nindex].type= nodesOrginal[Nindex].type;		  	  
				}*/			
                //await sleep(3000);		
				await sleep(3000);

							
				  
	  
    }
   
   
   
 
   console.log("runWeightedExperiment finished");
}





function findNearestNeighberWeighted(currenCell){
     var nearestNeighberID=-1;
     var minDistance= Number.MAX_VALUE ;
	
	 //nodesCopyAtT0=shuffle(nodesCopyAtT0);
	 
	 for(var cellInd=0; cellInd<nodesCopyAtT0.length; ++cellInd){
         var nodeCell= [nodesCopyAtT0[cellInd].x, nodesCopyAtT0[cellInd].y] ;
		 
	     var distance=computeDistance(currenCell , nodeCell);
		 
		 if(minDistance>distance){
		    minDistance=distance;
			nearestNeighberID=cellInd;
		 }
	 }
	 
	 return nearestNeighberID;
}


//async
 function runOneIteration(scaleAlphaT ,polygoneIndex){
         var polyCopy=polygonalParentCells[polygoneIndex];
		 
		//recompute  Ri  
		for(var i=0; i<Wi.length; ++i){
		  //Ri[i]= computeRadius(Wi[i]  , scaleAlphaT);//  Math.sqrt( scaleAlphaT * parentArea  * Wi[i] / Math.PI);  // 
		  Ri[i]=  Math.sqrt(scaleAlphaT * parentArea * Wi[i] / Math.PI);
		  nodes[i].radius= Ri[i];
		}
				
				
        
 
		computePolyCircles(polyCopy);
 
		
        drawCicles();
		
		//do force simulation  	
	    runSimulation(initialMode, nodes);
		
		computePolyCircles(polyCopy);
        drawCicles();		
	    //var cells=computePowerDiagram(nodes, Ri, xmin , ymin, height, width);//computePowerDiagram(nodes);
		var cells =computePowerDiagram(nodes, polyCopy);	
	    var totalErr=0;
	    //console.log("totalErr");
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
		
			  var areaCell= d3.polygonArea(cellPolygon);	
			  var cell_Id=sitePoly.originalObject.id;
			
			  updateCircleNodePositition(cell_Id, sitePoly.x, sitePoly.y);
  
			  totalErr= totalErr + Math.pow( Wi[cell_Id] - (areaCell/parentArea) , 2);//( parseFloat(eps.toFixed(4)) );		///N
	    }
           		  
		 
//         dataAlphaEpsilon.push({Alpha: scaleAlphaT, Epsilon:  epsilon});
		  
		 if( epsilon_Opt > totalErr){
			 //having copy of optimal totalErr, Alpha, Ci
			 epsilon_Opt=totalErr;
			 Alpha_Opt= scaleAlphaT;// parseFloat(scaleAlphaT.toFixed(5)) ;
			 d3.select('#AlphaOptimalOutput').text(Alpha_Opt);
			 d3.select('#OutputSlider').text(Alpha_Opt);
			 
			 for(var Cindex=0; Cindex<Cix.length ; ++Cindex){ 			 
			     	Cix_Opt[Cindex]=Cix[Cindex] ;
			        Ciy_Opt[Cindex]=Ciy[Cindex] ;
			 }		 
		 }	   

}


function fixNodeXY(d){
    d.fx = d.x;  
	d.fy = d.y; 
}

function unfixNodeXY(d){
    d.fx = null;  
	d.fy = null; 
}


	
var currentMoveX=0;
var currentMoveY=0;

//async 
function runOptimalStatic(){
       //Ri Ci recompute it using Alpha_Opt
	    console.log("runOptimalStatic: Alpha_Opt="+Alpha_Opt); 
		scaleAlphaT=Alpha_Opt;
 	   
		for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]= computeRadius(Wi[Cindex]  , Alpha_Opt);
		  nodes[Cindex].radius= Ri[Cindex];
		  updateCircleNodePositition(Cindex, Cix_Opt[Cindex], Ciy_Opt[Cindex]);		  
		}
         
        //do force simulation 
		 runSimulation(initialMode , nodes);
		 //drawCicles();
		 //var cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);//computePowerDiagram(nodes);//, Ri, xmin , ymin, height, width);
		 //drawVoronoiCells(cells);
}









// STEP 3: given some tradeoff on scaleAlpha to be determined by user, we enter the drag mode with that specific scaleAlpha value, 
//           it should be between scaleAlphaOptim (approximately weighted voronoi) and 0 (unweighted voronoi cells)


//async 
function runOptimalMove(){
       
       //Ri Ci recompute it using Alpha_Opt
	   console.log("runOptimalMove: AlphaMove="+AlphaMove); scaleAlphaT=AlphaMove;
	   	   
		for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(AlphaMove * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		}

       
        //run simulation in move mode
		 //await sleep(500);
		 d3.select('#CurrentModeOutput').text("Move Mode");
		 runSimulation(moveMode , nodes);
         //await sleep(500);		
        // var cells=computePowerDiagram(nodes, Ri, xmin , ymin, height, width);//computePowerDiagram(nodes);
         //drawVoronoiCells(cells);		 
}

  
// STEP 4, out of drag mode, go back to step 2.  
//async 
function runOptimalStop(){
        console.log("runOptimalStop: Alpha_Opt="+Alpha_Opt); scaleAlphaT=Alpha_Opt;
			   
	  	for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(Alpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  //keep ci fixed without change
		}
		
		//run simulation in static (stop) mode
		 //await sleep(500);
		 //var localSim=
		 d3.select('#CurrentModeOutput').text("Static Mode");
		 runSimulation(staticMode , nodes);
// 		 await sleep(500);
		 
		// if(simulation.alpha() <= simulation.alphaMin())
		 {     simulation.stop();
		       var cells=computePowerDiagram(nodes, Ri, xmin , ymin, height, width);//computePowerDiagram(nodes);
               //drawVoronoiCells(cells);
		 }
		 		 				
}  


///run simulation based on mode
function runSimulation(mode , nodes){

  if(mode==initialMode){
  
           simulation = d3.forceSimulation(nodes)
		                           //.alphaDecay(0).alphaMin(-1).velocityDecay(0)
                                  //simulation.nodes(nodes)
                                  .force("charge", d3.forceManyBody().strength(1000))
                                  .force('center', d3.forceCenter(width / 2, height / 2))
                                  //.force('x', d3.forceX(200).strength(1) )
                                  //.force('y',  d3.forceY(200).strength(1))
                                  //.force('x', d3.forceX().x(function(d) {
                                   // return xCenter[d.id];
                                  //}).strength(1))
                                  //.force('y', d3.forceY().y(function(d) {
                                  //  return yCenter[d.id];
                                  //}).strength(1))
								  //.alphaMin(0.991)
		                          //.alphaTarget(0.990);
                                  .force('collision', d3.forceCollide().strength(1).iterations(100).radius(function(d) {
                                                return Ri[d.id] ; //
                                  }));//.on('tick', ticked);
								    
								  var tickCounter=0;
								  //while (simulation.alpha() > simulation.alphaMin()) { 
								  while (tickCounter <100 ){
								      ++tickCounter;
								      //console.log("still manula ticking");
								      simulation.tick(); ticked(); 
									  
									  //if(simulation.alpha()<= simulation.alphaMin()){
									  //   console.log("end init manula ticking");
									  //}
								  };
									
                                  //simulation.alphaTarget(.01).restart();  
                                  //Ci will be changed when ticked  is called
								  
                                   d3.select('#CurrentModeOutput').text("Initial Mode");
        
  }else if(mode==moveMode){
  
                                 simulation.nodes(nodes)
								  //.alphaMin(0.3)
                                  .force("charge", d3.forceManyBody().strength(0))
                                  .force("center", null)//.strength(0)
								  //.force("center").strength(0)
                                  //.force('center', d3.forceCenter(width / 2, height / 2)//.strength(0))
                                 .force('x', d3.forceX().x(function(d) {
                                     return nodes[d.id].x; 
                                  }).strength(10))
                                .force('y', d3.forceY().y(function(d) {
                                    return nodes[d.id].y;
                                  }).strength(10))
                                .force('collision', d3.forceCollide().strength(2).iterations(10).radius(function(d) {
                                                return Ri[d.id] ; 
                                  }));//.on('tick', ticked);
								  
								  simulation.alpha(0.1).restart();
								  
								  while (simulation.alpha() > simulation.alphaMin()) { 
								      //console.log("still manula ticking");
								      simulation.tick(); ticked(); 
									  
									  if(simulation.alpha()<= simulation.alphaMin()){
									     console.log("end move manula ticking");
									  }
								  };
								  
                               // d3.select('#CurrentModeOutput').text("move Mode");
  }else if(mode==staticMode){
                                //simulation.alphaTarget(0.07);
                                simulation.nodes(nodes)
								 //.alphaMin(0.3)
                                //.force("charge", d3.forceManyBody().strength(1000))
                                .force("center", null)
                                // .force('center', d3.forceCenter(width / 2, height / 2).strength(0))
                               .force('x', d3.forceX().x(function(d) {
                                     return nodes[d.id].x; 
                                  }).strength(1))
                                .force('y', d3.forceY().y(function(d) {
                                    return nodes[d.id].y;
                                  }).strength(1))
                                .force('collision', d3.forceCollide().strength(1).iterations(10).radius(function(d) {
                                    return Ri[d.id] ; 
                                  }));//.on('tick', ticked);
								  //.on('tickedEnd',tickedEnd)
								  
								    while (simulation.alpha() > simulation.alphaMin()) { 
								      //console.log("still manula ticking");
								      simulation.tick(); ticked(); 
									  
									  if(simulation.alpha()<= simulation.alphaMin()){
									     console.log("end stop manula ticking");
									  }
								  };
								  
								  d3.select('#CurrentModeOutput').text("Static Mode");
                                  
   }
   
                                   
     return simulation;

}


 function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
                                
  
  // to use during drag
// SOLUTION FOUND FOR DURING DRAG DO NOT CHANGE
/*var simulation = d3.forceSimulation(nodes)
  .force('x', d3.forceX().x(function(d) {
    return xCenter[d.id];
  }).strength(10))
  .force('y', d3.forceY().y(function(d) {
    return yCenter[d.id];
  }).strength(10))
  .force('collision', d3.forceCollide().strength(2).iterations(100).radius(function(d) {
    return d.radius;
  }))
  .on('tick', ticked); */