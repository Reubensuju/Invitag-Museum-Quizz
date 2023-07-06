//run trials
//runTrials();
//runTrialsDebugMode();

var ParentCellID=-1;

function runTrials(){
    console.log("trials started");
	isDebugMode=false;
	
//    polygonalParentCells= generateParentCell();
	//add sqaure polygone
//	polygonalParentCells.unshift(polyCopySquare);

     ParentCellID=1;
	 runPol(ParentCellID);
	/* runPol(0);//polygonalParentCells
	 runPol(1);
	 runPol(2);
	 runPol(3);
	 runPol(4);
	 runPol(5);
	 runPol(6);
	 runPol(7);
	 runPol(8);
	 runPol(9);
	 runPol(10);*/

	
}


function runTrials1(){
    console.log("trials started");
	isDebugMode=false;
	
 	var polygonalParentCells= generateParentCell();
	//add sqaure polygone
	polygonalParentCells.unshift(polyCopySquare);
	//console.log("polygonalParentCells");
    //console.log(polygonalParentCells);
	//console.log(polygonalParentCells.length);
	
	for(var c=0; c<polygonalParentCells.length ; ++c){//
		

		var polyCopy=[];
		var poly=[];
		poly.length=0;	
		polyCopy.length=0;

		
		polyCopy=polygonalParentCells[c];
		
		grandParentCellsCoordinates.push({"x":"FileNr", "y":c });
		grandParentCellsCoordinates.push({"x":"x", "y":"y"});
		
		for(var i=0;i<polyCopy.length;++i){
			 var x=polyCopy[i][0];
			 var y=polyCopy[i][1];
			 xminPolygone = Math.min(xminPolygone,x);
			 xmaxPolygone = Math.max(xmaxPolygone,x);
			 yminPolygone = Math.min(yminPolygone,y);
			 ymaxPolygone = Math.max(ymaxPolygone,y); 
			 var cordinateObj={"x":x, "y":y};
			 poly.push(cordinateObj);
			 grandParentCellsCoordinates.push(cordinateObj);
		}
		
	//	polyCopy=polyCopySquare;	
	//	poly=polySquare;
		setParentArea(d3.polygonArea(polyCopy));
		drawGrandParentCell(poly);
		
		
		for(var trialNr=0 ; trialNr < trialsNumber; ++trialNr){	
			console.log("trialNr="+trialNr);
			
			//initilaize wi randomly //different wi 
			initaliz(); 
			computePolyCircles(polyCopy);
			
			//// draw initial power diagram
			 for(var inilizzNr=0; inilizzNr<inilaizingNumber ; ++inilizzNr){		
				runBubbleExperiment(trialNr, inilizzNr,polyCopy);				
				copyNodes();			
			}
			 
			 
/*	 	    for(var inilizzNr=0; inilizzNr<inilaizingNumber ; ++inilizzNr){			
				runBubbleWeightedExperiment(trialNr, inilizzNr, polyCopy);				
				copyNodes();			
			}
*/				 
			
			for(var inilizzNr=0; inilizzNr<inilaizingNumber ; ++inilizzNr){
				runWeightedExperiment(trialNr, inilizzNr,polyCopy);	
				copyCopyNodes();
			}
	 							
		}
		

		dataFiles.push(JSON.parse(JSON.stringify(dataAlphaEpsilonBubleWeighted)));
		dataAlphaEpsilonBubleWeighted.length=0;
		
	}	
	
	console.log("trials finished");
}

//,polygonalParentCells
function runPol(c){
	    console.log("runPol="+c);
	    var polyCopy=[];
		var poly=[];
		poly.length=0;	
		polyCopy.length=0;

		
		polyCopy=polygonalParentCells[c];
		
		grandParentCellsCoordinates.push({"x":"FileNr", "y":c });
		grandParentCellsCoordinates.push({"x":"x", "y":"y"});
		
		for(var i=0;i<polyCopy.length;++i){
			 var x=polyCopy[i][0];
			 var y=polyCopy[i][1];
			 xminPolygone = Math.min(xminPolygone,x);
			 xmaxPolygone = Math.max(xmaxPolygone,x);
			 yminPolygone = Math.min(yminPolygone,y);
			 ymaxPolygone = Math.max(ymaxPolygone,y); 
			 var cordinateObj={"x":x, "y":y};
			 poly.push(cordinateObj);
			 grandParentCellsCoordinates.push(cordinateObj);
		}
		
	//	polyCopy=polyCopySquare;	
	//	poly=polySquare;
		setParentArea(d3.polygonArea(polyCopy));
		drawGrandParentCell(poly);
		
		includeAllOrginalNodesInploygone(polyCopy);
		runPolOneIter(0,polyCopy,c);
		runPolOneIter(1,polyCopy,c);
		runPolOneIter(2,polyCopy,c);
		runPolOneIter(3,polyCopy,c);
		runPolOneIter(4,polyCopy,c);
		runPolOneIter(5,polyCopy,c);
		runPolOneIter(6,polyCopy,c);
		runPolOneIter(7,polyCopy,c);
		runPolOneIter(8,polyCopy,c);
		runPolOneIter(9,polyCopy,c);
		
		
/*		for(var trialNr=0 ; trialNr < trialsNumber; ++trialNr){	
			console.log("trialNr="+trialNr);
			
			//initilaize wi randomly //different wi 
			//initaliz(); 
//			initalizWeights(trialNr);
			//console.log("targetWeightesTrialsArray");
			//console.log(targetWeightesTrialsArray);
			//computePolyCircles(polyCopy);
			
			//// draw initial power diagram
			 for(var inilizzNr=0; inilizzNr<inilaizingNumber ; ++inilizzNr){
				 initalizWeights(trialNr);
				 copyOrginalNodes(trialNr,inilizzNr);
                //initalizPositions(inilizzNr);		           								
				computePolyCircles(polyCopy);
				//console.log("nodes");
			    //console.log(JSON.stringify(nodes));
			
				runBubbleExperiment(trialNr, inilizzNr,c);				
				//copyNodes();			
			 }
			 
			for(var inilizzNr=0; inilizzNr<inilaizingNumber ; ++inilizzNr){
				initalizWeights(trialNr);
				copyOrginalNodes(trialNr,inilizzNr);
				//initalizPositions(inilizzNr);
				computePolyCircles(polyCopy);
			    runBubbleExperimentFixedAlphaOpt(trialNr, inilizzNr,c);
				//copyNodes();
			}
			 
				 
	 	    for(var inilizzNr=0; inilizzNr<inilaizingNumber ; ++inilizzNr){	
			    initalizWeights(trialNr);
                copyOrginalNodes(trialNr,inilizzNr);
				//initalizPositions(inilizzNr);	
                computePolyCircles(polyCopy);				
				runBubbleWeightedExperiment(trialNr, inilizzNr, c);				
				//copyNodes();			
			}
		
			for(var inilizzNr=0; inilizzNr<inilaizingNumber ; ++inilizzNr){	
              initalizWeights(trialNr);			
			  copyOrginalNodes(trialNr,inilizzNr);
			  //initalizPositions(inilizzNr);
			  computePolyCircles(polyCopy);
			  runBubbleWeightedExperimentFixedAlphaOptimal(trialNr, inilizzNr, c);
			  //copyNodes();
			  //copyCopyNodes();
			}	 
			
			for(var inilizzNr=0; inilizzNr<inilaizingNumber ; ++inilizzNr){
				initalizWeights(trialNr);
				copyOrginalNodes(trialNr,inilizzNr);
				//initalizPositions(inilizzNr);
				computePolyCircles(polyCopy);
				runWeightedExperiment(trialNr, inilizzNr,c);	
				//copyCopyNodes();
			}
	 							
		}
*/		

		dataFiles.push(JSON.parse(JSON.stringify(dataAlphaEpsilonBubleWeighted)));
		dataAlphaEpsilonBubleWeighted.length=0;
}


function runPolOneIter(trialNr,polyCopy,c){
				console.log("trialNr="+trialNr);
				 // console.log(JSON.stringify(nodes));
			//initilaize wi randomly //different wi 
			//initaliz(); 
//			initalizWeights(trialNr);
			//console.log("targetWeightesTrialsArray");
			//console.log(targetWeightesTrialsArray);
			//computePolyCircles(polyCopy);
			
			//// draw initial power diagram
			 for(var inilizzNr=0; inilizzNr<inilaizingNumber ; ++inilizzNr){
				 clearAllTmpArrays();
				 initalizWeights(trialNr);
				 copyOrginalNodes(trialNr,inilizzNr);
                //initalizPositions(inilizzNr);		           								
				computePolyCircles(polyCopy);
				//console.log("nodes");
			    //console.log(JSON.stringify(nodes));
			
				runBubbleExperiment(trialNr, inilizzNr,c);				
				//copyNodes();			
			 }
			 
			for(var inilizzNr=0; inilizzNr<inilaizingNumber ; ++inilizzNr){
				clearAllTmpArrays();
				initalizWeights(trialNr);
				copyOrginalNodes(trialNr,inilizzNr);
				//initalizPositions(inilizzNr);
				computePolyCircles(polyCopy);
			    runBubbleExperimentFixedAlphaOpt(trialNr, inilizzNr,c);
				//copyNodes();
			}
			 
				 
	 	    for(var inilizzNr=0; inilizzNr<inilaizingNumber ; ++inilizzNr){	
			    clearAllTmpArrays();
			    initalizWeights(trialNr);
                copyOrginalNodes(trialNr,inilizzNr);
				//initalizPositions(inilizzNr);	
                computePolyCircles(polyCopy);				
				runBubbleWeightedExperiment(trialNr, inilizzNr, c);				
				//copyNodes();			
			}
		
			for(var inilizzNr=0; inilizzNr<inilaizingNumber ; ++inilizzNr){	
			  clearAllTmpArrays();
              initalizWeights(trialNr);			
			  copyOrginalNodes(trialNr,inilizzNr);
			  //initalizPositions(inilizzNr);
			  computePolyCircles(polyCopy);
			  runBubbleWeightedExperimentFixedAlphaOptimal(trialNr, inilizzNr, c);
			  //copyNodes();
			  //copyCopyNodes();
			}	 
			
			for(var inilizzNr=0; inilizzNr<inilaizingNumber ; ++inilizzNr){
				clearAllTmpArrays();
				initalizWeights(trialNr);
				copyOrginalNodes(trialNr,inilizzNr);
				//initalizPositions(inilizzNr);
				computePolyCircles(polyCopy);
				runWeightedExperiment(trialNr, inilizzNr,c);	
				//copyCopyNodes();
			}
	
}

//async 
async function runTrialsDebugMode(){
    console.log("trials started");
	
	isDebugMode=true;
	
	var polygonalParentCells= generateParentCell();
	//add sqaure polygone
	polygonalParentCells.unshift(polyCopySquare);
	//console.log("polygonalParentCells");
    //console.log(polygonalParentCells);
	//console.log(polygonalParentCells.length);
	
	var c=-1;
	while(++c < polygonalParentCells.length ){
	//for(var c=0; c<polygonalParentCells.length ; ++c){//
		

		var polyCopy=[];
		var poly=[];
		poly.length=0;	
		polyCopy.length=0;

		
		polyCopy=polygonalParentCells[c];
		
		grandParentCellsCoordinates.push({"x":"FileNr", "y":c });
		grandParentCellsCoordinates.push({"x":"x", "y":"y"});
		

		for(var i=0;i<polyCopy.length;++i){
			 var x=polyCopy[i][0];
			 var y=polyCopy[i][1];
			 xminPolygone = Math.min(xminPolygone,x);
			 xmaxPolygone = Math.max(xmaxPolygone,x);
			 yminPolygone = Math.min(yminPolygone,y);
			 ymaxPolygone = Math.max(ymaxPolygone,y); 
			 var cordinateObj={"x":x, "y":y};
			 poly.push(cordinateObj);
			 grandParentCellsCoordinates.push(cordinateObj);
		}
		
	//	polyCopy=polyCopySquare;	
	//	poly=polySquare;
		setParentArea(d3.polygonArea(polyCopy));
		drawGrandParentCell(poly);
		
		var trialNr=-1;
		while(++trialNr<trialsNumber){
		//for(var trialNr=0 ; trialNr < trialsNumber; ++trialNr){	
			console.log("trialNr="+trialNr);
			
			//initilaize wi randomly //different wi 
			initaliz(); 
			computePolyCircles(polyCopy);
			
			//// draw initial power diagram
			var inilizzNr1=-1;
			while(++inilizzNr1<inilaizingNumber){
			//for(var inilizzNr=0; inilizzNr<inilaizingNumber ; ++inilizzNr){		
				runBubbleExperiment(trialNr, inilizzNr1,polyCopy);				
				copyNodes();			
				await sleep(500);
			}
			 
			 
/*	 	    for(var inilizzNr=0; inilizzNr<inilaizingNumber ; ++inilizzNr){			
				runBubbleWeightedExperiment(trialNr, inilizzNr, polyCopy);				
				copyNodes();			
			}
*/				 
			var inilizzNr2=-1;
			while(++inilizzNr2<inilaizingNumber){
			//for(var inilizzNr=0; inilizzNr<inilaizingNumber ; ++inilizzNr){
				runWeightedExperiment(trialNr, inilizzNr2,polyCopy);	
				copyCopyNodes();
				await sleep(500);
			}
	 							
		}
		

		dataFiles.push(JSON.parse(JSON.stringify(dataAlphaEpsilonBubleWeighted)));
		dataAlphaEpsilonBubleWeighted.length=0;
		
	}	
	
	console.log("trials finished");
}

		  
//async 
var bestError=Number.MAX_VALUE;

function runBubbleExperiment(trialNr, inilizzNr,c){
	  console.log("runBubbleExperiment started");

	  var polyCopy=polygonalParentCells[c];

	  epsilon_Opt=Number.MAX_VALUE;
	  Alpha_Opt = scaleAlphaMin;

	  //first pass
	  //STEP 1: grow alpha from scaleAlphaMin to scaleAlphaMax, so to find the position of the centers of the circles (use gravity toward CG of parent cell + low anti-collision force)	  		  
	  for(var scaleAlphaT=scaleAlphaMin; scaleAlphaT < sacaleAlphaMax ; scaleAlphaT=scaleAlphaT+0.1){ //
		//scaleAlphaT=0.7;
		//await sleep(500);
		runOneIteration(scaleAlphaT,"C1.0", trialNr , inilizzNr,  c);	  	

	//	await sleep(500);
	  }
	  

	  
console.log("1 pass started");
	   var firstPassPosX=Array.from(Cix_Opt);
	   var firstPassPosY=Array.from(Ciy_Opt);
	   
	  //--------  go to first recorded optimum opt alpha and its positions:
	   var FirstPassAlpha_Opt=Alpha_Opt;
	   var recodedTimeFirstPassAlpha_Opt=recodedTimeAlpha_Opt;
	   for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(FirstPassAlpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  updateCircleNodePositition(Cindex, firstPassPosX[Cindex], firstPassPosY[Cindex]);		  
	   }	
	   	computePolyCircles(polyCopy);
	    drawCicles();
        var firstPasscells=computePowerDiagram(nodes,polyCopy);
		//drawVoronoiCells(firstPasscells);
	   computeError(firstPasscells, "Bubble", trialNr, inilizzNr,"C1.0", "BubblePass1", FirstPassAlpha_Opt, recodedTimeFirstPassAlpha_Opt); 
	  
//console.log("2 pass started");	  
	  //----second pass
	   epsilon_Opt=Number.MAX_VALUE;
	   var scaleAlphaTO=FirstPassAlpha_Opt;

	   for(var countO=1 ; countO< 10 ; ++countO){  
	     scaleAlphaTO=scaleAlphaTO+0.01;
		 runOneIteration(scaleAlphaTO,"C1.0", trialNr , inilizzNr,  c);	

	   }
	   
   
	   
	   
	   var secondPassPosX=Array.from(Cix_Opt);
	   var secondPassPosY=Array.from(Ciy_Opt);
	   var SecondPassAlpha_Opt=Alpha_Opt;
	   var recodedTimeSecondPassAlpha_Opt= recodedTimeAlpha_Opt;
	   for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(SecondPassAlpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  updateCircleNodePositition(Cindex, secondPassPosX[Cindex], secondPassPosY[Cindex]);		  
	   }	
	   computePolyCircles(polyCopy);
	   drawCicles();
	   var secondPasscells=computePowerDiagram(nodes,polyCopy);
	   computeError(secondPasscells, "Bubble" ,  trialNr, inilizzNr,"C1.0","BubblePass2",SecondPassAlpha_Opt, recodedTimeSecondPassAlpha_Opt); 
		var firstbestError=bestError;
	   //----end second pass
	   
	   
	   //--------  go to first recorded optimum opt alpha and its positions:
	   for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(FirstPassAlpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  updateCircleNodePositition(Cindex, firstPassPosX[Cindex], firstPassPosY[Cindex]);		  
	   }	
	   	computePolyCircles(polyCopy);
	    drawCicles();
		firstPasscells.length=0;
		firstPasscells=computePowerDiagram(nodes,polyCopy);
	    computeError(firstPasscells, "Bubble" ,  trialNr, inilizzNr,"C1.0", "BubblePass1", FirstPassAlpha_Opt, recodedTimeFirstPassAlpha_Opt); 
		
	   //--------
	   
	   
//console.log("3 pass started");	   
	   //----third pass
	   epsilon_Opt=Number.MAX_VALUE;
	   scaleAlphaTO=FirstPassAlpha_Opt;


	   for(var countO=1 ; countO< 10 ; ++countO){  
	   	 scaleAlphaTO=scaleAlphaTO-0.01;
		 runOneIteration(scaleAlphaTO ,"C1.0", trialNr , inilizzNr,  c);	
	   }
	   	
	   
	   var thirdPassPosX=Array.from(Cix_Opt);
	   var thirdPassPosY=Array.from(Ciy_Opt);
	   
	   var ThirdPassAlpha_Opt=Alpha_Opt;
	   var recodedTimeThirdPassAlpha_Opt= recodedTimeAlpha_Opt;
	   for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(ThirdPassAlpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  updateCircleNodePositition(Cindex, thirdPassPosX[Cindex], thirdPassPosY[Cindex]);		  
	   }
	   computePolyCircles(polyCopy);	   
	   drawCicles();
	   var thirdPasscells=computePowerDiagram(nodes,polyCopy);
	   computeError(thirdPasscells, "Bubble" ,  trialNr, inilizzNr,"C1.0", "BubblePass3",ThirdPassAlpha_Opt, recodedTimeThirdPassAlpha_Opt);  
	   var secondbestError=bestError;
	   //----end third pass
	   
//console.log("end pass started");		
	   //choose the best of second and third pass
		if(secondbestError<firstbestError){
			 
		     for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
			   Ri[Cindex]=  Math.sqrt(ThirdPassAlpha_Opt * parentArea * Wi[Cindex] / Math.PI);
			   nodes[Cindex].radius= Ri[Cindex];
			   updateCircleNodePositition(Cindex, thirdPassPosX[Cindex], thirdPassPosY[Cindex]);		  
		     }	
			 computePolyCircles(polyCopy);
		     drawCicles();
		     var finalcells=computePowerDiagram(nodes,polyCopy);
			 computeError(finalcells, "Bubble" ,  trialNr, inilizzNr,"C1.0","BubbleBest",ThirdPassAlpha_Opt, recodedTimeThirdPassAlpha_Opt); 
             if(isDebugMode){
			 drawVoronoiCells(finalcells);
             recordCellsExperiment.push({"LocAlNodes": JSON.parse(JSON.stringify(nodes))   , "cells":finalcells }) ;		//JSON.parse(JSON.stringify(finalcells))		 
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
			 computeError(finalcells, "Bubble" ,  trialNr, inilizzNr,"C1.0","BubbleBest",SecondPassAlpha_Opt,  recodedTimeSecondPassAlpha_Opt);    
             if(isDebugMode){
			 drawVoronoiCells(finalcells);
             recordCellsExperiment.push({"LocAlNodes": JSON.parse(JSON.stringify(nodes))     , "cells": finalcells }) ;			 //JSON.parse(JSON.stringify(finalcells))
		     }
		}
		
 	   
}


function runBubbleExperimentFixedAlphaOpt(trialNr, inilizzNr,c){
	        var polyCopy=polygonalParentCells[c];
	        console.log("runBubbleExperimentFixedAlphaOpt started");
			var currentTime=new Date().getTime();
	        epsilon_Opt=Number.MAX_VALUE;
	        Alpha_Opt = scaleAlphaMin;
	        //bestError=Number.MAX_VALUE;


	         runOneIteration(0.9,"C1.1", trialNr , inilizzNr,  c);			
//			 computePolyCircles(polyCopy);
//		     drawCicles();
//		     var finalcells=computePowerDiagram(nodes,polyCopy);
//			 computeError(finalcells, "Bubble" ,  trialNr, inilizzNr,"C1.1","BubbleFixedAlphaOpt0.9",0.9);    
             if(isDebugMode){
			  // drawVoronoiCells(finalcells);
              // recordCellsExperiment.push({"LocAlNodes": JSON.parse(JSON.stringify(nodes))     , "cells": finalcells }) ;			 //JSON.parse(JSON.stringify(finalcells))
		     }
			 var nextCurrentTime=new Date().getTime();
			 console.log("time eleapsed="+(nextCurrentTime-currentTime));
}

function runBubbleWeightedExperiment( trialNr, inilizzNr,c){		
      var polyCopy=polygonalParentCells[c];	 		 	
	  console.log("runBubbleWeightedExperiment started");
	  epsilon_Opt=Number.MAX_VALUE;
	  Alpha_Opt = scaleAlphaMin;
	  bestError=Number.MAX_VALUE;
	  
	  //first pass
	  //STEP 1: grow alpha from scaleAlphaMin to scaleAlphaMax, so to find the position of the centers of the circles (use gravity toward CG of parent cell + low anti-collision force)	  		  

	for(var scaleAlphaT=scaleAlphaMin; scaleAlphaT < sacaleAlphaMax ; scaleAlphaT=scaleAlphaT+0.1){ //
		//scaleAlphaT=0.7;
		//await sleep(500);
		runOneIterationBubleWeighted(scaleAlphaT,"C2",   trialNr, inilizzNr,c);	  	
	//	await sleep(500);
	  }

	
console.log("1 pass started");
       var firstPassPosX=Array.from(Cix_Opt);
	   var firstPassPosY=Array.from(Ciy_Opt);

	  //--------  go to first recorded optimum opt alpha and its positions:
	   var FirstPassAlpha_Opt=Alpha_Opt;
	    var recodedTimeFirstPassAlpha_Opt= recodedTimeAlpha_Opt;
	   for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(FirstPassAlpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  updateCircleNodePositition(Cindex, firstPassPosX[Cindex], firstPassPosY[Cindex]);		  
	   }	
	   	computePolyCircles(polyCopy);
	    drawCicles();
        var firstPasscells=computePowerDiagram(nodes,polyCopy);
		// drawVoronoiCells(firstPasscells);
	   //computeError(firstPasscells, "powerDigramBubbleWeighted", FirstPassAlpha_Opt, "BubblePass1");
	   computeError(firstPasscells, "powerDigramBubbleWeighted",   trialNr, inilizzNr,"C2", "BubblePass1", FirstPassAlpha_Opt,recodedTimeFirstPassAlpha_Opt);
	   
	  
//console.log("2 pass started");	  
	  //----second pass
	   epsilon_Opt=Number.MAX_VALUE;
	   var scaleAlphaTO=FirstPassAlpha_Opt;
	   for(var countO=1 ; countO< 10 ; ++countO){  
	   	 scaleAlphaTO=scaleAlphaTO+0.01;
		 runOneIterationBubleWeighted(scaleAlphaTO,"C2", trialNr , inilizzNr,c);
	   }
	   
	   var secondPassPosX=Array.from(Cix_Opt);
	   var secondPassPosY=Array.from(Ciy_Opt);
	   var SecondPassAlpha_Opt=Alpha_Opt;
	   var recodedTimeSecondPassAlpha_Opt= recodedTimeAlpha_Opt;
	   for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(SecondPassAlpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  updateCircleNodePositition(Cindex, secondPassPosX[Cindex], secondPassPosY[Cindex]);		  
	   }	
	   computePolyCircles(polyCopy);
	   drawCicles();
	   var secondPasscells=computePowerDiagram(nodes,polyCopy);
	   //computeError(secondPasscells, "powerDigram");
	   computeError(secondPasscells, "powerDigramBubbleWeighted" , trialNr, inilizzNr,"C2","BubblePass2", SecondPassAlpha_Opt, recodedTimeSecondPassAlpha_Opt);

		var firstbestError=bestError;
	   //----end second pass
	   
	   
	   //--------  go to first recorded optimum opt alpha and its positions:
	   for(var Cindex=0; Cindex<Cix.length; ++Cindex){
		  Ri[Cindex]=  Math.sqrt(FirstPassAlpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  updateCircleNodePositition(Cindex, firstPassPosX[Cindex], firstPassPosY[Cindex]);		  
	   }	
	   	computePolyCircles(polyCopy);
	    drawCicles();
		firstPasscells.length=0;
		firstPasscells=computePowerDiagram(nodes,polyCopy);
	    computeError(firstPasscells, "powerDigramBubbleWeighted" ,  trialNr, inilizzNr,"C2","BubblePass1",FirstPassAlpha_Opt, recodedTimeFirstPassAlpha_Opt);

	   //--------
	   
	   
	   
	   //----third pass
	   epsilon_Opt=Number.MAX_VALUE;
	   scaleAlphaTO=FirstPassAlpha_Opt;
	   for(var countO=1 ; countO< 10 ; ++countO){ 
		 scaleAlphaTO=scaleAlphaTO-0.01;	   
		 runOneIterationBubleWeighted(scaleAlphaTO,"C2", trialNr  , inilizzNr,c);
	   }
	   
	   var thirdPassPosX=Array.from(Cix_Opt);
	   var thirdPassPosY=Array.from(Ciy_Opt);
	   
	   var ThirdPassAlpha_Opt=Alpha_Opt;
	   var recodedTimeThirdPassAlpha_Opt= recodedTimeAlpha_Opt;
	   for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(ThirdPassAlpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  updateCircleNodePositition(Cindex, thirdPassPosX[Cindex], thirdPassPosY[Cindex]);		  
	   }	
	   computePolyCircles(polyCopy);
	   drawCicles();
	   var thirdPasscells=computePowerDiagram(nodes,polyCopy);
	   //computeError(thirdPasscells, "powerDigram");
	   computeError(thirdPasscells, "powerDigramBubbleWeighted" , trialNr, inilizzNr,"C2","BubblePass3",ThirdPassAlpha_Opt,recodedTimeThirdPassAlpha_Opt); 

	   
	   var secondbestError=bestError;
	   //----end third pass
	   
		var finalcells=null;
		var bestAlpha=-1;
	   //choose the best of second and third pass
		if(secondbestError<firstbestError){
			 bestAlpha=ThirdPassAlpha_Opt;
		     for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
			   Ri[Cindex]=  Math.sqrt(ThirdPassAlpha_Opt * parentArea * Wi[Cindex] / Math.PI);
			   nodes[Cindex].radius= Ri[Cindex];
			   updateCircleNodePositition(Cindex, thirdPassPosX[Cindex], thirdPassPosY[Cindex]);		  
		     }
		     computePolyCircles(polyCopy);			 
		     drawCicles();
		     finalcells=computePowerDiagram(nodes,polyCopy);
			 //drawVoronoiCells(finalcells);
			 computeError(finalcells, "powerDigramBubbleWeighted" ,  trialNr, inilizzNr,"C2","BubbleBest",ThirdPassAlpha_Opt,recodedTimeThirdPassAlpha_Opt);

		}else{
			 bestAlpha=SecondPassAlpha_Opt;
			 for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
			   Ri[Cindex]=  Math.sqrt(SecondPassAlpha_Opt * parentArea * Wi[Cindex] / Math.PI);
			   nodes[Cindex].radius= Ri[Cindex];
			   updateCircleNodePositition(Cindex, secondPassPosX[Cindex], secondPassPosY[Cindex]);		  
		     }	
			 computePolyCircles(polyCopy);
		     drawCicles();
		     finalcells=computePowerDiagram(nodes,polyCopy);
			 //drawVoronoiCells(finalcells);
			 computeError(finalcells, "powerDigramBubbleWeighted" ,  trialNr, inilizzNr,"C2","BubbleBest",SecondPassAlpha_Opt,recodedTimeSecondPassAlpha_Opt);
						 	   	 
		}
	  
	  
        //-------- run only weighted based on initil node
//	     runOneLastIterationWeighted(nodesCopy);
		 
	   //---- run weighted  based on bubble
  		 runLastOneIterationBubleWeighted(nodes, finalcells , trialNr, inilizzNr, bestAlpha,c,"C2.0","C2.1");
	  //-------
 	
}

function runBubbleWeightedExperimentFixedAlphaOptimal( trialNr, inilizzNr,c){		
      var polyCopy=polygonalParentCells[c];
      console.log("runBubbleWeightedExperimentFixedAlphaOptimal started");
	  epsilon_Opt=Number.MAX_VALUE;
	  Alpha_Opt = scaleAlphaMin;
	  bestError=Number.MAX_VALUE;

      runOneIterationBubleWeighted(0.9,"C4",   trialNr, inilizzNr,c);	
	  
	  computePolyCircles(polyCopy);
	  drawCicles();
	  var finalcells=computePowerDiagram(nodes,polyCopy);
	  //drawVoronoiCells(finalcells);
	  computeError(finalcells, "powerDigramBubbleWeighted" ,  trialNr, inilizzNr,"C4","BubbleFixedAlphaOpt0.9",0.9,recodedTimeAlpha_Opt);

	  
      //---- run weighted  based on bubble
  		 runLastOneIterationBubleWeighted(nodes, finalcells , trialNr, inilizzNr, 0.9,c,"C4.0","C4.1");
	  //-------
}

function runWeightedExperiment(trialNr, inilizzNr,c){
	var polyCopy=polygonalParentCells[c];
	//var cells=computeWeighted0(nodesCopy,  xmin ,ymin , width, height,polyCopy);
	//drawWeightedVoronoiCells(cells);

     //first pass weighted voronoi 0
	var counter0=25;
	var obt0=null; 
	var obt0Index=-1;  
	var optPolygons0=null;
	var minTotalErr=Number.MAX_VALUE;
	
	while(--counter0>-1){	
	   ///weight0
	  //var cells=computeWeighted(nodesCopy); 
	  var currentTime=new Date().getTime();
	  
	  var cells=computeWeighted0(nodesCopy,  xmin ,ymin , width, height,c);
	  
	  var nextCurrentTime=new Date().getTime();
	  var recodedTime=nextCurrentTime-currentTime;
		
	  var totalErr=0;
	  var minEpsilon=Number.MAX_VALUE;
	  var maxEpsilon=Number.MIN_VALUE;

	  //compute totalErr   
	  var cellsNumber=cells.length;
	  for(var index=0; index<cellsNumber ; ++index){ 
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
			  var cell_Id=sitePoly.originalObject.data.originalData.id;
			  
			  var e=(Math.abs(WiCopy[cell_Id] - (areaCell/parentArea)) )/ WiCopy[cell_Id]   ;		
			  minEpsilon = Math.min(e, minEpsilon) ;
			  maxEpsilon = Math.max(e, maxEpsilon) ;
				  
			  totalErr= totalErr + e * WiCopy[cell_Id];// Math.pow( WiCopy[cell_Id] - (areaCell/parentArea) , 2);//( parseFloat(eps.toFixed(4)) );
	   }
	   
	   if(cellsNumber==childrenNumber)
	   if(minTotalErr> totalErr){
		   minTotalErr=totalErr;
		   optPolygons0=cells;
		   obt0Index=dataAlphaEpsilonBubleWeighted.length;	
	   }
	   //cells.length=0;
		
	   //epsilon= epsilon/N;	

	   //store epsilon
	   //dataAlphaEpsilonWeightedLayout.push({TrialNr:trialNr,Epsilon: epsilon , MinEpsilon: minEpsilon , MaxEpsilon: maxEpsilon, CellsNumber:cellsNumber});   		  
		dataAlphaEpsilonBubleWeighted.push({TrialNr: trialNr, InilizzNr: inilizzNr,CaseNr:"C3.0", CaseName: "weight0",  Alpha: -1, TotalErr:  totalErr, MinEpsilon: minEpsilon , MaxEpsilon: maxEpsilon, CellsNumber:cellsNumber, RecodedTime:recodedTime});
		
	}


	if(optPolygons0!=null){	 
		 obt0 = JSON.parse(JSON.stringify(dataAlphaEpsilonBubleWeighted[obt0Index]));	 
		 obt0.CaseName="weight0Best";
		 dataAlphaEpsilonBubleWeighted.push(obt0);   
         
        if(isDebugMode){		 
		//recordCellsExperiment.push({"Description":trialNr+" "+inilizzNr+" C3.0 "+" weight0Best "  , "cells":JSON.parse(JSON.stringify(optPolygons0))}) ;			 		 				 
	    //drawWeightedVoronoiCells(optPolygons0)
	    }
	}else{
		 dataAlphaEpsilonBubleWeighted.push({TrialNr: trialNr, InilizzNr: inilizzNr,CaseNr:"C3.0", CaseName: "weight0Best",  Alpha: -1, TotalErr:  -1, MinEpsilon: -1 , MaxEpsilon: -1, CellsNumber:-1,RecodedTime:-1});
		
	}
		

    //second pass weighted voronoi 1
	var counter1=25;
	var obt1=null; 
	var obt1Index=-1;  
	var optPolygons1=null;  
	var minTotalErr1=Number.MAX_VALUE; 
	while(--counter1>-1){
	   ///////weight1
	   var currentTime=new Date().getTime();
	   
	   var cells1=computeWeighted1(nodesCopy,  xmin ,ymin , width, height,c);
	   
	   var nextCurrentTime=new Date().getTime();
	   var recodedTime=nextCurrentTime-currentTime;
		

		
	   var totalErr1=0;
	   var minEpsilon1=Number.MAX_VALUE;
	   var maxEpsilon1=Number.MIN_VALUE;
	  
	  var cellsNumber1=cells1.length;
	  for(var index=0; index<cellsNumber1 ; ++index){ 
			  var sitePoly=cells1[index].site;	   
			  var cellPolygon=Array.from(sitePoly.polygon);
		  
			 //cliping cell with parent polygn
			 for(var y=0; y<cellPolygon.length; ++y){	  
				cellPolygon[y][0]= Math.max(cellPolygon[y][0], xmin);
				cellPolygon[y][0]= Math.min(cellPolygon[y][0], xmax);
				  
				cellPolygon[y][1]=Math.max(cellPolygon[y][1], ymin);
				cellPolygon[y][1]=Math.min(cellPolygon[y][1], ymax);	  
			 }
		
			  var areaCell= d3.polygonArea(cellPolygon);	
			  var cell_Id=sitePoly.originalObject.data.originalData.id;
			  
			  var e=(Math.abs(WiCopy[cell_Id] - (areaCell/parentArea)) )/ WiCopy[cell_Id]   ;		
			  minEpsilon1 = Math.min(e, minEpsilon1) ;
			  maxEpsilon1 = Math.max(e, maxEpsilon1) ;
				  
			  totalErr1= totalErr1 + e * WiCopy[cell_Id];// Math.pow( WiCopy[cell_Id] - (areaCell/parentArea) , 2);//( parseFloat(eps.toFixed(4)) );
	   }
	   
	   
	   //cells1.length=0;
	   if(cellsNumber1==childrenNumber)
	   if(minTotalErr1> totalErr1){
		   minTotalErr1=totalErr1;
		   optPolygons1=cells1;
		   obt1Index=dataAlphaEpsilonBubleWeighted.length;	   
	   }
	   
	   dataAlphaEpsilonBubleWeighted.push({TrialNr: trialNr, InilizzNr: inilizzNr,CaseNr:"C3.1", CaseName: "weight1",  Alpha: -1, TotalErr:  totalErr1, MinEpsilon: minEpsilon1 , MaxEpsilon: maxEpsilon1, CellsNumber:cellsNumber1, RecodedTime:recodedTime});
		 
	}

	if(optPolygons1!=null){
		 obt1 = JSON.parse(JSON.stringify(dataAlphaEpsilonBubleWeighted[obt1Index]));
		 obt1.CaseName="weight1Best";
		 dataAlphaEpsilonBubleWeighted.push(obt1); 
    		
        if(isDebugMode){			
		//recordCellsExperiment.push({"Description":trialNr+" "+inilizzNr+" C3.1 "+" weight1Best "  , "cells":JSON.parse(JSON.stringify(optPolygons1))}) ;			 		 
		//drawWeightedVoronoiCells(optPolygons1)			 
	    }
	}else{
		 dataAlphaEpsilonBubleWeighted.push({TrialNr: trialNr, InilizzNr: inilizzNr,CaseNr:"C3.1", CaseName: "weight1Best",  Alpha: -1, TotalErr:  -1, MinEpsilon: -1 , MaxEpsilon: -1, CellsNumber:-1 , RecodedTime:-1});
		
	}

	  
	   console.log("runWeightedExperiment finished");
}





function runOneIteration(scaleAlphaT,caseNr, trialNr, inilizzNr ,c){
        var polyCopy=polygonalParentCells[c];
		//recompute  Ri  
		for(var i=0; i<Wi.length; ++i){
		  Ri[i]= Math.sqrt(scaleAlphaT * parentArea * Wi[i] / Math.PI);//computeRadius(Wi[i]  , scaleAlphaT);//  Math.sqrt( scaleAlphaT * parentArea  * Wi[i] / Math.PI);  // 
		  nodes[i].radius= Ri[i];
		  
		}
		
		
		
		try{
		computePolyCircles(polyCopy);
        //drawCicles();	
		var currentTime=new Date().getTime();		
		//do force simulation  	
	    runSimulation(initialMode, nodes);
	    //drawCicles();
		console.log("cells.length");
	    var cells=computePowerDiagram(nodes, polyCopy); 
		console.log(cells.length);
		//drawVoronoiCells(cells);
		//drawCicles();
		
		var nextCurrentTime=new Date().getTime();
		var recodedTime=nextCurrentTime-currentTime;
		
	    var totalErr=0;
		var minEpsilon=Number.MAX_VALUE;
		var maxEpsilon=Number.MIN_VALUE;
	    //console.log("epsilon");
 

		var cellsNumber=cells.length;
		
	    for(var index=0; index<cellsNumber ; ++index){ 
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
			  //console.log("cell_Id="+cell_Id);
			  updateCircleNodePositition(cell_Id, sitePoly.x, sitePoly.y);
              
			  var e = (Math.abs(Wi[cell_Id] - (areaCell/parentArea)) )/ Wi[cell_Id]; /// Wi[cell_Id]
			  minEpsilon = Math.min(e, minEpsilon) ;
		      maxEpsilon = Math.max(e, maxEpsilon) ;
		 
			  totalErr= totalErr + e *  Wi[cell_Id];//*  Wi[cell_Id] Math.pow( Wi[cell_Id] - (areaCell/parentArea) , 2);//( parseFloat(eps.toFixed(4)) );		///N
              	   
	   }
         

		 		 
		 if( epsilon_Opt > totalErr){
			 //having copy of optimal totalErr, Alpha, Ci
			 epsilon_Opt=totalErr;
			 Alpha_Opt= scaleAlphaT;// parseFloat(scaleAlphaT.toFixed(5)) ;
			 recodedTimeAlpha_Opt=recodedTime;
			 for(var Cindex=0; Cindex<Cix.length ; ++Cindex){ 			 
			     	Cix_Opt[Cindex]=Cix[Cindex] ;
			        Ciy_Opt[Cindex]=Ciy[Cindex] ;
			 }		 
		 }	   
		 
		 		 dataAlphaEpsilonBubleWeighted.push({TrialNr: trialNr, InilizzNr: inilizzNr, CaseNr:caseNr,CaseName: "Bubbl",  Alpha: scaleAlphaT, TotalErr:  totalErr, MinEpsilon: minEpsilon , MaxEpsilon: maxEpsilon, CellsNumber:cellsNumber , RecodedTime:recodedTime});

        }catch(err){
		    dataAlphaEpsilonBubleWeighted.push({TrialNr: trialNr, InilizzNr: inilizzNr, CaseNr:caseNr,CaseName: "Bubbl",  Alpha: scaleAlphaT, TotalErr:  -1, MinEpsilon: -1 , MaxEpsilon: -1, CellsNumber:-1 , RecodedTime:-1});
		}


}

//scaleAlphaT,caseNr, trialNr, inilizzNr ,c
function runOneIteration2(scaleAlphaT,caseNr, trialNr, inilizzNr ,c){
         var polyCopy=polygonalParentCells[c];
		 
		//recompute  Ri  
		for(var i=0; i<Wi.length; ++i){
		  //Ri[i]= computeRadius(Wi[i]  , scaleAlphaT);//  Math.sqrt( scaleAlphaT * parentArea  * Wi[i] / Math.PI);  // 
		  Ri[i]=  Math.sqrt(scaleAlphaT * parentArea * Wi[i] / Math.PI);
		  nodes[i].radius= Ri[i];
		}
				
				
        
 
		computePolyCircles(polyCopy);
 
		var currentTime=new Date().getTime();
        drawCicles();
		
		//do force simulation  	
	    runSimulation(initialMode, nodes);
		
		computePolyCircles(polyCopy);
        drawCicles();		
	    //var cells=computePowerDiagram(nodes, Ri, xmin , ymin, height, width);//computePowerDiagram(nodes);
		var cells =computePowerDiagram(nodes, polyCopy);	
		
		var nextCurrentTime=new Date().getTime();
		var recodedTime=nextCurrentTime-currentTime;
		
	    var totalErr=0;
	    var minEpsilon=Number.MAX_VALUE;
		var maxEpsilon=Number.MIN_VALUE;
		
	    //console.log("totalErr");
		var cellsNumber=cells.length;
	    for(var index=0; index<cellsNumber ; ++index){ 
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
			  var e=Math.pow( Wi[cell_Id] - (areaCell/parentArea) , 2);
  			  minEpsilon = Math.min(e, minEpsilon) ;
		      maxEpsilon = Math.max(e, maxEpsilon) ;
			  totalErr= totalErr + e;//( parseFloat(eps.toFixed(4)) );		///N
	    }
           		  
		 
//         dataAlphaEpsilon.push({Alpha: scaleAlphaT, Epsilon:  epsilon});
		  
		 if( epsilon_Opt > totalErr){
			 //having copy of optimal totalErr, Alpha, Ci
			 epsilon_Opt=totalErr;
			 Alpha_Opt= scaleAlphaT;// parseFloat(scaleAlphaT.toFixed(5)) ;
			 recodedTimeAlpha_Opt=recodedTime;
			 d3.select('#AlphaOptimalOutput').text(Alpha_Opt);
			 d3.select('#OutputSlider').text(Alpha_Opt);
			 
			 for(var Cindex=0; Cindex<Cix.length ; ++Cindex){ 			 
			     	Cix_Opt[Cindex]=Cix[Cindex] ;
			        Ciy_Opt[Cindex]=Ciy[Cindex] ;
			 }		 
		 }	   
		 
		 
		 dataAlphaEpsilonBubleWeighted.push({TrialNr: trialNr, InilizzNr: inilizzNr, CaseNr:caseNr,CaseName: "Bubbl",  Alpha: scaleAlphaT, TotalErr:  totalErr, MinEpsilon: minEpsilon , MaxEpsilon: maxEpsilon, CellsNumber:cellsNumber, RecodedTime:recodedTime});//recodedTime


}



//async 
function runOneIteration1(scaleAlphaT,caseNr, trialNr, inilizzNr ,c){
	    var polyCopy=polygonalParentCells[c];
				

		//recompute  Ri  
		for(var i=0; i<Wi.length; ++i){
		  Ri[i]=  Math.sqrt(scaleAlphaT * parentArea * Wi[i] / Math.PI);//Math.sqrt(scaleAlphaT * parentArea * Wi[i] / Math.PI);  Math.sqrt( scaleAlphaT * parentArea  * Wi[i] / Math.PI);  // 
		  nodes[i].radius= Ri[i];
		  
		}
		
		computePolyCircles(polyCopy);
		//var cells=computePowerDiagram(nodes, polyCopy);
        //drawCicles();		

		var currentTime=new Date().getTime();
		
		//do force simulation  			
	    runSimulation(initialMode, nodes);
	    //drawCicles();
	     var  cells=computePowerDiagram(nodes, polyCopy); 
		
		var nextCurrentTime=new Date().getTime();
		var recodedTime=nextCurrentTime-currentTime;
				
	    var totalErr=0;
		var minEpsilon=Number.MAX_VALUE;
		var maxEpsilon=Number.MIN_VALUE;
	    //console.log("epsilon");
 

		var cellsNumber=cells.length;
		
	    for(var index=0; index<cellsNumber ; ++index){ 
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
			  //console.log("cell_Id="+cell_Id);
			  updateCircleNodePositition(cell_Id, sitePoly.x, sitePoly.y);
              
			  var e = (Math.abs(Wi[cell_Id] - (areaCell/parentArea)) )/ Wi[cell_Id]; /// Wi[cell_Id]
			  minEpsilon = Math.min(e, minEpsilon) ;
		      maxEpsilon = Math.max(e, maxEpsilon) ;
		 
			  totalErr= totalErr + e *  Wi[cell_Id];//*  Wi[cell_Id] Math.pow( Wi[cell_Id] - (areaCell/parentArea) , 2);//( parseFloat(eps.toFixed(4)) );		///N
              	   
	   }
         

		 		 
		 if( epsilon_Opt > totalErr){
			 //having copy of optimal totalErr, Alpha, Ci
			 epsilon_Opt=totalErr;
			 Alpha_Opt= scaleAlphaT;// parseFloat(scaleAlphaT.toFixed(5)) ;
			 recodedTimeAlpha_Opt=recodedTime;
			 for(var Cindex=0; Cindex<Cix.length ; ++Cindex){ 			 
			     	Cix_Opt[Cindex]=Cix[Cindex] ;
			        Ciy_Opt[Cindex]=Ciy[Cindex] ;
			 }		 
		 }	   
		 
		 dataAlphaEpsilonBubleWeighted.push({TrialNr: trialNr, InilizzNr: inilizzNr, CaseNr:caseNr,CaseName: "Bubbl",  Alpha: scaleAlphaT, TotalErr:  totalErr, MinEpsilon: minEpsilon , MaxEpsilon: maxEpsilon, CellsNumber:cellsNumber, RecodedTime:recodedTime});

}



function runOneIterationBubleWeighted(scaleAlphaT,caseNr,trialNr, inilizzNr,c){
        var polyCopy=polygonalParentCells[c];	 
		//recompute  Ri  
		for(var i=0; i<Wi.length; ++i){
		   Ri[i]=  Math.sqrt(scaleAlphaT * parentArea * Wi[i] / Math.PI);
		  //Ri[i]= computeRadius(Wi[i]  , scaleAlphaT);//  Math.sqrt( scaleAlphaT * parentArea  * Wi[i] / Math.PI);  // 
		  nodes[i].radius= Ri[i];
		  
		}
		

    try{	
        computePolyCircles(polyCopy);	
		//drawCicles();		
		
		var currentTime=new Date().getTime();
		//do force simulation  	
	    runSimulation(initialMode, nodes);
		//drawCicles();	
	    var cells=computePowerDiagram(nodes,polyCopy);
		//drawVoronoiCells(cells);
		//drawCicles();	
		var nextCurrentTime=new Date().getTime();
		var recodedTime=nextCurrentTime-currentTime;
		
		
				
	    var totalErr=0;
		var minEpsilon=Number.MAX_VALUE;
		var maxEpsilon=Number.MIN_VALUE;
	    //console.log("totalErr");
 

		var cellsNumber=cells.length;
		
	    for(var index=0; index<cellsNumber ; ++index){ 
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
			  //console.log("cell_Id="+cell_Id);
			  updateCircleNodePositition(cell_Id, sitePoly.x, sitePoly.y);
              
			  var e = (Math.abs(Wi[cell_Id] - (areaCell/parentArea)) )/ Wi[cell_Id]; /// Wi[cell_Id]
			  minEpsilon = Math.min(e, minEpsilon) ;
		      maxEpsilon = Math.max(e, maxEpsilon) ;
		 
			  totalErr= totalErr + e *  Wi[cell_Id];//*  Wi[cell_Id] Math.pow( Wi[cell_Id] - (areaCell/parentArea) , 2);//( parseFloat(eps.toFixed(4)) );		///N
              	   
	   }
         

		 		 
		 if( epsilon_Opt > totalErr){
			 //having copy of optimal totalErr, Alpha, Ci
			 epsilon_Opt=totalErr;
			 Alpha_Opt= scaleAlphaT;// parseFloat(scaleAlphaT.toFixed(5)) ;
			 recodedTimeAlpha_Opt=recodedTime;			 
			 for(var Cindex=0; Cindex<Cix.length ; ++Cindex){ 			 
			     	Cix_Opt[Cindex]=Cix[Cindex] ;
			        Ciy_Opt[Cindex]=Ciy[Cindex] ;
			 }		 
		 }	   
		 
		 dataAlphaEpsilonBubleWeighted.push({TrialNr: trialNr, InilizzNr: inilizzNr,CaseNr:caseNr, CaseName: "Bubbl",  Alpha: scaleAlphaT, TotalErr:  totalErr, MinEpsilon: minEpsilon , MaxEpsilon: maxEpsilon, CellsNumber:cellsNumber,RecodedTime:recodedTime});


  }catch(err){
		    dataAlphaEpsilonBubleWeighted.push({TrialNr: trialNr, InilizzNr: inilizzNr, CaseNr:caseNr,CaseName: "Bubbl",  Alpha: scaleAlphaT, TotalErr:  -1, MinEpsilon: -1 , MaxEpsilon: -1, CellsNumber:-1 , RecodedTime:-1});
		}
}



function runLastOneIterationBubleWeighted(nodes, powerCells, trialNr, inilizzNr, alpha,c, caseNr1,caseNr2){
	 var polyCopy=polygonalParentCells[c];
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
		computeWeightedInitialLoc0(nodesTmp, arrayOfFixedPositionsNodesSimt, xmin ,ymin , width, height,polyCopy);
		//---- compute Weighted voro based on init Weighted voro 
		//(it runs 25 times inside function) and choosing 
		//one that gives minimal total error 
		//var cellsWeighted=computeWeightedBasedOnPrevoiusLoc(nodesTmp, arrayOfFixedPositionsNodesSimt, xmin ,ymin , width, height, true);
		var cellsWeighted0=computeWeightedBasedOnPrevoiusLocW0(nodesTmp, arrayOfFixedPositionsNodesSimt, xmin ,ymin , width, height, true, trialNr, inilizzNr, alpha, polyCopy,caseNr1);
        if(cellsWeighted0!=null){		
		  cellsWeighted0.length=0;
		}
	  
	    computeWeightedInitialLoc1(nodesTmp, arrayOfFixedPositionsNodesSimt, xmin ,ymin , width, height, polyCopy);
		var cellsWeighted1=computeWeightedBasedOnPrevoiusLocW1(nodesTmp, arrayOfFixedPositionsNodesSimt, xmin ,ymin , width, height, true, trialNr, inilizzNr, alpha, polyCopy,caseNr2);
        if(cellsWeighted1!=null){		
 		  cellsWeighted1.length=0;
		}
		//compute and record errors
//		computeError(cellsWeighted,"BubbleWeighted", "BubbleWeighted");		
		arrayOfFixedPositionsNodesSimt.length=0;
	    	
		//drawWeightedVoronoiCells(cellsWeighted);

		//if(cellsWeighted!=null)		
		 // cellsWeighted.length=0;		
		nodesTmp.length=0;
	   //----
          
}


function runOneLastIterationWeighted(nodesCopy){
	
	    
		
		//create nodesTmp as copy of nodes with additional info (weight,
		//previousX, previousY, and previousWeight) to be used by weighted vor 
		 var nodesTmp=[];
		 for(var Nindex=0; Nindex<nodesCopy.length; ++Nindex){  
             nodesTmp[Nindex]=[];		 
			 nodesTmp[Nindex].x=  nodesCopy[Nindex].x   ;
			 nodesTmp[Nindex].y=  nodesCopy[Nindex].y   ;
			 nodesTmp[Nindex].radius=  nodesCopy[Nindex].radius   ;
			 nodesTmp[Nindex].id= nodesCopy[Nindex].id   ;
			 nodesTmp[Nindex].type= nodesCopy[Nindex].type   ;
			 
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
		computeWeightedInitialLoc(nodesTmp, arrayOfFixedPositionsNodesSimt, xmin ,ymin , width, height);
		//---- compute Weighted voro based on init Weighted voro 
		//(it runs 25 times inside function) and choosing 
		//one that gives minimal total error 
		var cellsWeighted=computeWeightedBasedOnPrevoiusLoc(nodesTmp, arrayOfFixedPositionsNodesSimt, xmin ,ymin , width, height, false);
		
		//compute and record errors
		if(cellsWeighted!=null)	{
		  computeError(cellsWeighted,"BubbleWeighted", "", "Weighted");		
		  cellsWeighted.length=0;	
		}
		arrayOfFixedPositionsNodesSimt.length=0;
	    	
		//drawWeightedVoronoiCells(cellsWeighted);

			
			
		nodesTmp.length=0;
	   //----
          
}


async function runOptimalStatic(){
       //Ri Ci recompute it using Alpha_Opt
	    //console.log("runOptimalStatic: Alpha_Opt="+Alpha_Opt);  
 	   
		for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(Alpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  updateCircleNodePositition(Cindex, Cix_Opt[Cindex], Ciy_Opt[Cindex]);		  
		}
         
        //do force simulation 
		 //await sleep(500);
		 runSimulation(initialMode , nodes);
//		 await sleep(500);

		 AlphaMove=Alpha_Opt;
}




// STEP 3: given some tradeoff on scaleAlpha to be determined by user, we enter the drag mode with that specific scaleAlpha value, 
//it should be between scaleAlphaOptim (approximately weighted voronoi) and 0 (unweighted voronoi cells)


async function runOptimalMove(){
       
       //Ri Ci recompute it using Alpha_Opt
	   console.log("runOptimalMove: AlphaMove="+AlphaMove);  
	   	   
		for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(AlphaMove * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		}

       
        //run simulation in move mode
		 runSimulation(moveMode , nodes);
         await sleep(500);		
         var cells=computePowerDiagram(nodes);
         //drawVoronoiCells(cells);		 
}

  
// STEP 4, out of drag mode, go back to step 2.  
async function runOptimalStop(){
        console.log("runOptimalStop: Alpha_Opt="+Alpha_Opt); 
			   
	  	for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(Alpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  //keep ci fixed without change
		}
		
		//run simulation in static (stop) mode
		 runSimulation(staticMode , nodes);
 		 await sleep(500);
		 
		// if(simulation.alpha() <= simulation.alphaMin())
		 {     simulation.stop();
		       var cells=computePowerDiagram(nodes);
               //drawVoronoiCells(cells);
		 }
		 		 				
}  


///run simulation based on mode
function runSimulation(mode , nodes){

  if(mode==initialMode){
  
      try{     simulation = d3.forceSimulation(nodes)
		  .force("charge", d3.forceManyBody().strength(1000))
		  .force('center', d3.forceCenter(width / 2, height / 2))
		  .force('collision', d3.forceCollide().strength(1).iterations(100).radius(function(d) {
						return Ri[d.id] ; //
		  }));//.on('tick', ticked);
			
		  var currentTime=new Date().getTime();
          var nextCurrentTime=currentTime;		  
		  var counter=0;	
	      //while (++counter <100) { 
		  while ((nextCurrentTime-currentTime) < 100 ){
		  
		  //while (simulation.alpha() > simulation.alphaMin()) { 
			  simulation.tick(); ticked(); 			  
			  //if(simulation.alpha()<= simulation.alphaMin()){
				// console.log("end manula ticking");
			  //}
			nextCurrentTime=new Date().getTime();  
			//if(simulation.alpha() < simulation.alphaMin())break;
			console.log(++counter);
		  }
		  
		  }catch(e){
		  }
					         
  }else if(mode==moveMode){

		 simulation.nodes(nodes)
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
		  })).on('tick', ticked);
		  
  }else if(mode==staticMode){
		//simulation.alphaTarget(0.07);
		simulation.nodes(nodes)
		.force("center", null)
	   .force('x', d3.forceX().x(function(d) {
			 return nodes[d.id].x; 
		  }).strength(1))
		.force('y', d3.forceY().y(function(d) {
			return nodes[d.id].y;
		  }).strength(1))
		.force('collision', d3.forceCollide().strength(1).iterations(100).radius(function(d) {
			return Ri[d.id] ; 
		  })).on('tick', ticked);
                                  
   }
   
                                   
     return simulation;

}


 function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function computeError(cells, name,   trialNr, inilizzNr, caseNr,caseName,alpha, recdTime){


        var totalErr=0;
		var minEpsilon=Number.MAX_VALUE;
		var maxEpsilon=Number.MIN_VALUE;
	    //console.log("totalErr");
 

		var cellsNumber=cells.length;
		
	    for(var index=0; index<cellsNumber ; ++index){ 
			  var sitePoly=cells[index].site;	   
			  var cellPolygon=Array.from(sitePoly.polygon);
					
			  var areaCell= d3.polygonArea(cellPolygon);

              var cell_Id;
              if(name=="Bubble" || name=="powerDigramBubbleWeighted"){			  
			     cell_Id=sitePoly.originalObject.id;
				 //updateCircleNodePositition(cell_Id, sitePoly.x, sitePoly.y);
			  }else if(name=="BubbleWeighted" || name=="weightedVoronoi"){
			     cell_Id=sitePoly.originalObject.data.originalData.id;
			  }
              
			  var e = (Math.abs(Wi[cell_Id] - (areaCell/parentArea)) )/ Wi[cell_Id]; /// Wi[cell_Id]
			  minEpsilon = Math.min(e, minEpsilon) ;
		      maxEpsilon = Math.max(e, maxEpsilon) ;
		 
			  totalErr= totalErr + e *  Wi[cell_Id];//*  Wi[cell_Id] Math.pow( Wi[cell_Id] - (areaCell/parentArea) , 2);//( parseFloat(eps.toFixed(4)) );		///N
              	   
	   }
	   
	   //console.log(name+"totalErr="+totalErr);

       if(name=="Bubble"){
		   bestError=totalErr;
		   dataAlphaEpsilonBubleWeighted.push({TrialNr:trialNr ,InilizzNr: inilizzNr,CaseNr:caseNr, CaseName: caseName,  Alpha: alpha, TotalErr:  totalErr, MinEpsilon: minEpsilon , MaxEpsilon: maxEpsilon, CellsNumber:cellsNumber, RecodedTime:recdTime});
	       //dataAlphaEpsilon
	   }else if(name=="weightedVoronoi"){		   
           //dataAlphaEpsilonWeightedLayout.push({TrialNr:trialNr ,Epsilon: epsilon , MinEpsilon: minEpsilon , MaxEpsilon: maxEpsilon, CellsNumber:cellsNumber});   		  		   
	       dataAlphaEpsilonBubleWeighted.push({TrialNr: trialNr, InilizzNr: inilizzNr,CaseNr:caseNr, CaseName: caseName,  Alpha: alpha, TotalErr:  totalErr, MinEpsilon: minEpsilon , MaxEpsilon: maxEpsilon, CellsNumber:cellsNumber, RecodedTime:recdTime});

	   }else if(name=="BubbleWeighted"  || name=="powerDigramBubbleWeighted"){	
           bestError=totalErr;	   
	       //dataAlphaEpsilonBubleWeighted.push({TrialNr: trialNr ,Alpha: label, Epsilon:  epsilon, MinEpsilon: minEpsilon , MaxEpsilon: maxEpsilon, CellsNumber:cellsNumber});			   
	       dataAlphaEpsilonBubleWeighted.push({TrialNr:trialNr ,InilizzNr: inilizzNr,CaseNr:caseNr, CaseName: caseName,  Alpha: alpha, TotalErr:  totalErr, MinEpsilon: minEpsilon , MaxEpsilon: maxEpsilon, CellsNumber:cellsNumber, RecodedTime:recdTime});			   
	   }

}	
                   

function  computeWeightedInitialLoc(nodesTmp, arrayOfFixedPositionsNodes , xmin ,ymin , width, height){
	
	/*var simulationWeighted = d3.voronoiMapSimulation(nodesTmp,arrayOfFixedPositionsNodes)  
       .clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]])
	   .stop();
	   
	   
	    var state = simulationWeighted.state(); 
	   
	    while (!state.ended) { // manually launch each iteration until the simulation ends
         simulationWeighted.tick();
         state = simulationWeighted.state();
        }
		
		var polygons = state.polygons; 
		*/
		//----
		var simulationWeighted0 = d3.voronoiMapSimulation(nodesTmp,arrayOfFixedPositionsNodes,0)  
       .clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]])
	   .stop();
	   
	   
	    var state0 = simulationWeighted0.state(); 
	   
	    while (!state0.ended) { // manually launch each iteration until the simulation ends
         simulationWeighted0.tick();
         state0 = simulationWeighted0.state();
        }
       
	    var polygons0 = state0.polygons; 
	    var totalErr0=computeErrorWeightedWoronoi(polygons0);
	   
	   //----
		var simulationWeighted1 = d3.voronoiMapSimulation(nodesTmp,arrayOfFixedPositionsNodes,1)  
       .clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]])
	   .stop();
	   
	   
	    var state1 = simulationWeighted1.state(); 
	   
	    while (!state1.ended) { // manually launch each iteration until the simulation ends
         simulationWeighted1.tick();
         state1 = simulationWeighted1.state();
        }
       
	    var polygons1 = state1.polygons; 
		var totalErr1=computeErrorWeightedWoronoi(polygons1);
	   ///
	   
	   var polygons=null;
	   
	   if(totalErr1>totalErr0)
		   polygons= polygons0;
	   else 
		   polygons= polygons1; 
	   
	   
	   
	   //update nodes previous x,y, weight
	   	var cellsNumber1=polygons.length;		
	    for(var index=0; index<cellsNumber1 ; ++index){ 
			  var sitePoly=polygons[index].site;
			  var cell_id=sitePoly.originalObject.data.originalData.id;			  
			  nodesTmp[cell_id].previousX= nodesTmp[cell_id].x;
		      nodesTmp[cell_id].previousY= nodesTmp[cell_id].y;
			  //nodesCopy[cell_id].previousX= sitePoly.x;
		      //nodesCopy[cell_id].previousY= sitePoly.y;
	          nodesTmp[cell_id].previousWeight= sitePoly.weight;
		}
		
       
        return polygons; 	   
}				   


function  computeWeightedInitialLoc0(nodesTmp, arrayOfFixedPositionsNodes , xmin ,ymin , width, height,polyCopy){
	
	var simulationWeighted = d3.voronoiMapSimulation(nodesTmp,arrayOfFixedPositionsNodes,0)  
       //.clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]])
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
			  nodesTmp[cell_id].previousX= nodesTmp[cell_id].x;
		      nodesTmp[cell_id].previousY= nodesTmp[cell_id].y;
			  //nodesCopy[cell_id].previousX= sitePoly.x;
		      //nodesCopy[cell_id].previousY= sitePoly.y;
	          nodesTmp[cell_id].previousWeight= sitePoly.weight;
		}
		
       
        return polygons; 	
		
}


function  computeWeightedInitialLoc1(nodesTmp, arrayOfFixedPositionsNodes , xmin ,ymin , width, height, polyCopy){
	
	var simulationWeighted = d3.voronoiMapSimulation(nodesTmp,arrayOfFixedPositionsNodes,1)  
       //.clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]])
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
			  nodesTmp[cell_id].previousX= nodesTmp[cell_id].x;
		      nodesTmp[cell_id].previousY= nodesTmp[cell_id].y;
			  //nodesCopy[cell_id].previousX= sitePoly.x;
		      //nodesCopy[cell_id].previousY= sitePoly.y;
	          nodesTmp[cell_id].previousWeight= sitePoly.weight;
		}
		
       
        return polygons; 	
		
}


//compute  weighted voronoi based on previous position and weight 
function  computeWeightedBasedOnPrevoiusLoc(nodesTmp, arrayOfFixedPositionsNodes , xmin ,ymin , width, height, isErrorRecorded){
                   
				var Opt_polygons=null;
				var mintotalError=Number.MAX_VALUE;
                var counter=25;
				   
                while(--counter>-1){			
					/*var simulationWeighted = d3.voronoiMapSimulation(nodesTmp,arrayOfFixedPositionsNodes)  
					   .clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]])
					   .stop();
					   
					   
						var state = simulationWeighted.state(); 
					   
						while (!state.ended) { // manually launch each iteration until the simulation ends
						 simulationWeighted.tick();
						 state = simulationWeighted.state();
						}
						
						var polygons =null;
						polygons =state.polygons; */
						  var polygons0 = null;
						  var totalErr0=0;
						  try{
						   var simulationWeighted0 = d3.voronoiMapSimulation(nodesTmp,arrayOfFixedPositionsNodes,0)
							.clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]])
						   .initialPosition((d)=>[d.previousX, d.previousY])
						   .initialWeight((d)=>d.previousWeight);
						   
						   simulationWeighted0.stop();
						   
							var state0 = simulationWeighted0.state(); 
							while (!state0.ended) { // manually launch each iteration until the simulation ends
							  simulationWeighted0.tick();
							  state0 = simulationWeighted0.state();
							}
							
							  polygons0 = state0.polygons; 
							  totalErr0=computeErrorWeightedWoronoi(polygons0);
							 
						  }catch(err){
							  
						  }
					  
						//////
							var polygons1 =null;
							var totalErr1=0;
							try{
							var simulationWeighted1 = d3.voronoiMapSimulation(nodesTmp,arrayOfFixedPositionsNodes,1)
							.clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]])
							.initialPosition((d)=>[d.previousX, d.previousY])
							.initialWeight((d)=>d.previousWeight);
						   
							simulationWeighted1.stop();
						   
							var state1 = simulationWeighted1.state(); 
							while (!state1.ended) { // manually launch each iteration until the simulation ends
							  simulationWeighted1.tick();
							  state1 = simulationWeighted1.state();
							}
							  polygons1 = state1.polygons; 
							  totalErr1=computeErrorWeightedWoronoi(polygons1);						
							/////
							}catch(err){
								
							}

						/*var polygons =null;
						//polygons =state.polygons; 
					    if(totalErr1>totalErr0)
						   polygons= polygons0;
					    else 
						   polygons= polygons1; 	
                        
                        if(polygons==null){
							computeWeightedInitialLoc(nodesTmp, arrayOfFixedPositionsNodes, xmin ,ymin , width, height);
                            dataAlphaEpsilonBubleWeighted.push({TrialNr: "BubbleWeighted" ,Alpha: -1, Epsilon:  -1, MinEpsilon: -1 , MaxEpsilon: -1, CellsNumber:-1});			   
						   continue;		
						}*/						   
												
						//---------					
						/*var totalError=0;										 
						var cellsNumber=polygons.length;
						
						//if(cellsNumber==childrenNumber){
							for(var index=0; index<cellsNumber ; ++index){ 
								  var sitePoly=polygons[index].site;	   
								  var cellPolygon=Array.from(sitePoly.polygon);										
								  var areaCell= d3.polygonArea(cellPolygon);
								  var cell_Id=sitePoly.originalObject.data.originalData.id;					  
								  var e = (Math.abs(Wi[cell_Id] - (areaCell/parentArea)) )/ Wi[cell_Id]; /// Wi[cell_Id]							 
								  totalError= totalError + e *  Wi[cell_Id];//*  Wi[cell_Id] Math.pow( Wi[cell_Id] - (areaCell/parentArea) , 2);//( parseFloat(eps.toFixed(4)) );		///N									   
						    }
						   
						    if(totalError<mintotalError){
							   mintotalError=totalError;
							   Opt_polygons=polygons;
						    }
						//}
						
						//--------
						console.log("mintotalError="+mintotalError);
						if(isErrorRecorded){
							computeError(polygons,"BubbleWeighted", "", "BubbleWeighted");	
						}
						*/
						computeWeightedInitialLoc(nodesTmp, arrayOfFixedPositionsNodes, xmin ,ymin , width, height);
				}
				   
				console.log("FinalmintotalError="+mintotalError);
										
				return Opt_polygons; 	
}


function  computeWeightedBasedOnPrevoiusLocW0(nodesTmp, arrayOfFixedPositionsNodes , xmin ,ymin , width, height, isErrorRecorded, trialNr, inilizzNr, alpha,polyCopy, caseNr){
	
		var Opt_polygons=null;
		var recodedTimeOpt=0;
		var mintotalError=Number.MAX_VALUE;
		var counter=25;
		   
		while(--counter>-1){		
		      var currentTime=new Date().getTime();
			  var recodedTime=0;
			  var polygons0 = null;
			  var totalErr0=0;
			  try{
			   var simulationWeighted0 = d3.voronoiMapSimulation(nodesTmp,arrayOfFixedPositionsNodes,0)
				//.clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]])
				.clip(polyCopy)
			   .initialPosition((d)=>[d.previousX, d.previousY])
			   .initialWeight((d)=>d.previousWeight);
			   
			   simulationWeighted0.stop();
			   
				var state0 = simulationWeighted0.state(); 
				while (!state0.ended) { // manually launch each iteration until the simulation ends
				  simulationWeighted0.tick();
				  state0 = simulationWeighted0.state();
				}
				
				  polygons0 = state0.polygons; 
				  var nextCurrentTime=new Date().getTime();
		          recodedTime=nextCurrentTime-currentTime;
				  //totalErr0=computeErrorWeightedWoronoi(polygons0);
				 
			  }catch(err){
				  	
                    if(isErrorRecorded){
					  //dataAlphaEpsilonBubleWeighted.push({TrialNr: "BubbleWeighted0" ,Alpha: -1, Epsilon:  -1, MinEpsilon: -1 , MaxEpsilon: -1, CellsNumber:-1});			   
				       dataAlphaEpsilonBubleWeighted.push({TrialNr:trialNr ,InilizzNr: inilizzNr,CaseNr:caseNr, CaseName: "BubbleWeighted0",  Alpha: -1, TotalErr:  -1, MinEpsilon: -1 , MaxEpsilon: -1, CellsNumber:-1,RecodedTime:-1});			   
					}
					computeWeightedInitialLoc0(nodesTmp, arrayOfFixedPositionsNodes, xmin ,ymin , width, height,polyCopy);
					continue;				  
			  }
			  
			  var totalError=0;	
			  var cellsNumber=polygons0.length;
						
			//if(cellsNumber==childrenNumber){
				for(var index=0; index<cellsNumber ; ++index){ 
					  var sitePoly=polygons0[index].site;	   
					  var cellPolygon=Array.from(sitePoly.polygon);										
					  var areaCell= d3.polygonArea(cellPolygon);
					  var cell_Id=sitePoly.originalObject.data.originalData.id;					  
					  var e = (Math.abs(Wi[cell_Id] - (areaCell/parentArea)) )/ Wi[cell_Id]; /// Wi[cell_Id]							 
					  totalError= totalError + e *  Wi[cell_Id];//*  Wi[cell_Id] Math.pow( Wi[cell_Id] - (areaCell/parentArea) , 2);//( parseFloat(eps.toFixed(4)) );		///N									   
				}
			    
				if(cellsNumber!=null && cellsNumber==childrenNumber)
				if(totalError<mintotalError){
				   mintotalError=totalError;
				   Opt_polygons=polygons0;
				   recodedTimeOpt=recodedTime;
				}
			//}
			
			//--------
			console.log("mintotalError="+mintotalError);
			if(isErrorRecorded){
				computeError(polygons0,"BubbleWeighted",  trialNr, inilizzNr,caseNr, "BubbleWeighted0",alpha,recodedTime);	

			}
			
			computeWeightedInitialLoc0(nodesTmp, arrayOfFixedPositionsNodes, xmin ,ymin , width, height,polyCopy);
		}
		   
		if(Opt_polygons!=null){
			 computeError(Opt_polygons,"BubbleWeighted",  trialNr, inilizzNr,caseNr, "BubbleWeighted0Best",alpha,recodedTimeOpt);			
		}else{
		    dataAlphaEpsilonBubleWeighted.push({TrialNr:trialNr ,InilizzNr: inilizzNr,CaseNr:caseNr, CaseName: "BubbleWeighted0Best",  Alpha: -1, TotalErr:  -1, MinEpsilon: -1 , MaxEpsilon: -1, CellsNumber:-1 ,RecodedTime:-1});			   
		}			
		
		console.log("FinalmintotalError="+mintotalError);
								
		return Opt_polygons; 	
				
}



function  computeWeightedBasedOnPrevoiusLocW1(nodesTmp, arrayOfFixedPositionsNodes , xmin ,ymin , width, height, isErrorRecorded , trialNr, inilizzNr, alpha, polyCopy,caseNr){
	    var Opt_polygons=null;
		var recodedTimeOpt=0;
		var mintotalError=Number.MAX_VALUE;
		var counter=25;
		   
		while(--counter>-1){		
		
		      var currentTime=new Date().getTime();
			  var recodedTime=0;
			  
			  var polygons1 = null;
			  var totalErr1=0;
			  try{
			   var simulationWeighted0 = d3.voronoiMapSimulation(nodesTmp,arrayOfFixedPositionsNodes,1)
				//.clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]])
				.clip(polyCopy)
			   .initialPosition((d)=>[d.previousX, d.previousY])
			   .initialWeight((d)=>d.previousWeight);
			   
			   simulationWeighted0.stop();
			   
				var state1 = simulationWeighted0.state(); 
				while (!state1.ended) { // manually launch each iteration until the simulation ends
				  simulationWeighted0.tick();
				  state1 = simulationWeighted0.state();
				}
				
				  polygons1 = state1.polygons; 
				  
				  var nextCurrentTime=new Date().getTime();
		          recodedTime=nextCurrentTime-currentTime;
				  
				  totalErr1=computeErrorWeightedWoronoi(polygons1);
				 
				 
			  }catch(err){
				  	
                    if(isErrorRecorded){
					  //dataAlphaEpsilonBubleWeighted.push({TrialNr: "BubbleWeighted1" ,Alpha: -1, Epsilon:  -1, MinEpsilon: -1 , MaxEpsilon: -1, CellsNumber:-1});			   
				      dataAlphaEpsilonBubleWeighted.push({TrialNr:trialNr ,InilizzNr: inilizzNr,CaseNr:caseNr, CaseName: "BubbleWeighted1",  Alpha: -1, TotalErr:  -1, MinEpsilon: -1 , MaxEpsilon: -1, CellsNumber:-1,RecodedTime:-1});			   
					}
					computeWeightedInitialLoc1(nodesTmp, arrayOfFixedPositionsNodes, xmin ,ymin , width, height, polyCopy);
					continue;				  
			  }
			  
			  var totalError=0;	
			  var cellsNumber=polygons1.length;
						
			//if(cellsNumber==childrenNumber){
				for(var index=0; index<cellsNumber ; ++index){ 
					  var sitePoly=polygons1[index].site;	   
					  var cellPolygon=Array.from(sitePoly.polygon);										
					  var areaCell= d3.polygonArea(cellPolygon);
					  var cell_Id=sitePoly.originalObject.data.originalData.id;					  
					  var e = (Math.abs(Wi[cell_Id] - (areaCell/parentArea)) )/ Wi[cell_Id]; /// Wi[cell_Id]							 
					  totalError= totalError + e *  Wi[cell_Id];//*  Wi[cell_Id] Math.pow( Wi[cell_Id] - (areaCell/parentArea) , 2);//( parseFloat(eps.toFixed(4)) );		///N									   
				}
			   
			    if(cellsNumber!=null && cellsNumber==childrenNumber)
				if(totalError<mintotalError){
				   mintotalError=totalError;
				   Opt_polygons=polygons1;
				   recodedTimeOpt=recodedTime;
				}
			//}
			
			//--------
			console.log("mintotalError="+mintotalError);
			if(isErrorRecorded){
				//computeError(polygons1,"BubbleWeighted", "", "BubbleWeighted1");	
				computeError(polygons1,"BubbleWeighted",  trialNr, inilizzNr,caseNr, "BubbleWeighted1",alpha, recodedTime);
			}
			
			computeWeightedInitialLoc1(nodesTmp, arrayOfFixedPositionsNodes, xmin ,ymin , width, height, polyCopy);
		}
		   
		if(Opt_polygons!=null){
			 computeError(Opt_polygons,"BubbleWeighted",  trialNr, inilizzNr,caseNr, "BubbleWeighted1Best",alpha, recodedTimeOpt);			
		}else{
		    dataAlphaEpsilonBubleWeighted.push({TrialNr:trialNr ,InilizzNr: inilizzNr,CaseNr:caseNr, CaseName: "BubbleWeighted1Best",  Alpha: -1, TotalErr:  -1, MinEpsilon: -1 , MaxEpsilon: -1, CellsNumber:-1,RecodedTime:-1});			   
		}	   
		console.log("FinalmintotalError="+mintotalError);
								
		return Opt_polygons;
}

function drawWeightedVoronoiCells(parentCells){
  //create parent cells
  
       // console.log("drawVoronoiCells");
			
  	   //remove parent cells
	   svg.selectAll('.polygonsParentWeighted')
	   .remove();			
			
	   svg.selectAll('.polygonsParentWeighted')
		  .data(parentCells)
		  .enter().append("path")
		  .attr('d', renderCell)
	      .attr("class", "polygonsParent")
		  .attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.data.originalData.id; } )//i    
		  //.style ('fill', "none") 	  
		  .style('fill',"none")//  function(d) {return  NiColor[d.site.originalObject.id];})	//
          .style("fill-opacity", polygonsFillObacity)		  
		  .style('stroke', "blue")
		  .style('stroke-width', 3)
		  .style("stroke-opacity", polygonsEdgeObacity);	  	  
}