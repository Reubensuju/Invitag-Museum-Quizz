//----------------------------------------------------------


//epsilon_Opt is min error .  initially it is large number 	  
var  epsilon_Opt=Number.MAX_VALUE;


var width = 1000, height = 1000;
// authorized  box to re-center escaped nodes
var xmin = 0;
var xmax = 1000;
var ymin = 0;
var ymax = 1000;
//define global variables for simualtion
var simulation;// force simulation global variable 

var childrenNumber=10; //10 of weighted children
var maxLeavesNumber=childrenNumber;//max leaves for each weighed child

// var N = sum of N_i; // total number of leaves represented by the parent cell
var N=0;
		   		 
// INPUT number of leaves represented by the child cell i
var Ni=[];

// var Wi = Ni/N weight of each child i, so proprotion of area the cell of child i should take in the parent cell
// target area Ai = Ni/N = Wi
var Wi =[]; 
 


//assign random color for each child
var  NiColor=[];

var scaleAlphaInit=0.8;
var Alpha_Opt=scaleAlphaInit;
var AlphaMove=scaleAlphaInit;

var initialMode=0;
var moveMode=1;
var staticMode=3;



var Cix = []; //Ci    circle centres x y 
var Ciy = [];

var  Cix_Opt=[];  // copy of centres x y  when optimal position
var  Ciy_Opt=[];


//  radius for each circle based on number of children
var Ri = [];

var nodes = [];


var parentArea=0;// d3.polygonArea(polyCopySquare);
var globalPolygon;
function setParentArea(globalPolygonLocal){
   var parentAreaLocal=d3.polygonArea(globalPolygonLocal);
	parentArea=parentAreaLocal;
	globalPolygon=globalPolygonLocal;
}


//function for creating number of weighted children in the parent cell  with random leaves (up to 10 leaves for each child cell)  
function createNi(parentNodes, parentChildrenMap){
  console.log("createNi");	
  N=0;
  Ni=[];
  Ni.length=0;
  
  for(var cn=0; cn<parentNodes.length ; ++cn){
    //Ni[cn]= getRandomInt(maxLeavesNumber);
	Ni[cn]=getGroupSizeSubChildrenBubble(parentChildrenMap.get(parentNodes[cn].n)).length;
	//Ni[cn]=parentChildrenMap.get(parentNodes[cn].n).length;
	N= N + Ni[cn];
  } 
  
  console.log(Ni);	
}


//function for creating Wi
function createWi(){
	console.log("createWi");
	
    Wi=[];
    Wi.length=0;

    for(var wn=0; wn < Ni.length ; ++wn){
	  Wi[wn]= Ni[wn]/N;
	  //WiCopy[wn]= Ni[wn]/N;
	}
	
	console.log(Wi);
}


function assignColors(parentCellsColors){
  NiColor=[];
  NiColor.length=0;
  
  NiColor=[...parentCellsColors];
}


// function to compute radiuse of a circle 
function computeRadius(Wii, scaleAlphaTcopy){
  return Math.sqrt( scaleAlphaTcopy * parentArea  * Wii / Math.PI);
}


//function for creating radius for each circle based on number of children
function createRadius(){
  console.log("createRadius");
  
  Ri=[];
  Ri.length=0;
  
  for(var Rindex=0; Rindex<Ni.length; ++Rindex){
    Ri[Rindex]= computeRadius(Wi[Rindex]  , scaleAlphaInit);// scaleAlpha* Ni[Rindex] * 10;
    //RiCopy[Rindex]=Ri[Rindex];
  }		  
  console.log(Ri);
}


//function for create nodes randomly 
function createNodes(parentNodes){ 
  console.log("createNodes");
  nodes=[];
  nodes.length=0;
  
  for(var Nindex=0; Nindex<parentNodes.length; ++Nindex){
     //var xValue= getRandomIntbetween(xmin,xmax);//Math.floor((Math.random() * xmax) + xmin); //xmax*Math.random()+xmin;
     //var yValue= getRandomIntbetween(ymin,ymax);//Math.floor((Math.random() * ymax) + ymin); //ymax*Math.random()+ymin;
     //var xValue= getRandomIntbetween(xminPolygone,xmaxPolygone); 
     //var yValue= getRandomIntbetween(yminPolygone,ymaxPolygone); 
	 
	 var xValue=parentNodes[Nindex].x;
	 var yValue=parentNodes[Nindex].y;
	 
	 var radiusValue= Ri[Nindex];
	 
     
	 nodes.push({x: xValue,y: yValue,radius: radiusValue,id: Nindex,type: 1 });  
     //nodesOrginal.push({x: xValue,y: yValue,radius: radiusValue,id: Nindex,type: 1 }); 	 
  }	
  
    console.log(nodes);
  
}


function copyNodes(){
   for(var Nindex=0; Nindex<Ni.length; ++Nindex){    	   
	 nodes[Nindex].x= nodesCopy[Nindex].x   ;
	 nodes[Nindex].y= nodesCopy[Nindex].y   ;
	 nodes[Nindex].radius= nodesCopy[Nindex].radius   ;
	 nodes[Nindex].id= nodesCopy[Nindex].id   ;
	 nodes[Nindex].type= nodesCopy[Nindex].type   ;
	 //nodes.= nodesCopy.   ;
	 // nodes.push({x: xValue,y: yValue,radius: radiusValue,id: Nindex,type: 1 });   
  }	

}


//function for update data for a node
function updateCircleNodePositition(id, x, y){
    Cix[id]= x;
    Ciy[id]= y;
    nodes[id].x= x;
    nodes[id].y= y;
}  


var parentLayerCopy;
function initaliz(d,parentLayer,parentNodes, parentChildrenMap,  parentCellsColors, globalPolygon){
	
	parentLayerCopy=parentLayer;

   // console.log("initaliz="+myrng()); 
   console.log("start bubble initaliz=");  
   setParentArea(globalPolygon);
   // create childrenNumber of weighted children
   createNi(parentNodes , parentChildrenMap); 
   createWi();
   assignColors(parentCellsColors);
   createRadius();
   createNodes(parentNodes);   
   
   setSvg(parentLayerCopy);
   computePolyCircles(globalPolygon,nodes);   

   //runOneIterationBubleWeightedInitial(0.9, globalPolygon);
   runAllIterations(scaleAlphaInit,globalPolygon);
   

   //dragstartedBubble(d);
	  
	  
	  
   console.log("End bubble initaliz"); 
   nodesCopy=[];
   nodesCopy.length=0;
   

  
}


//calling force directed simualtion iterativly		  
//async 
function runAllIterations(scaleAlphaT,globalPolygon){
   console.log("start runAllIterations");
  //STEP 1: grow alpha from scaleAlphaMin to scaleAlphaMax, 
  //so to find the position of the centers of the circles (finding optimal alpha)
  //(use gravity toward CG of parent cell + low anti-collision force)	  		  
 // for(var scaleAlphaT=scaleAlphaMin; scaleAlphaT<=sacaleAlphaMax ; scaleAlphaT=scaleAlphaT+0.1){
    
	runOneIteration(scaleAlphaT,globalPolygon);	  	
///	await sleep(500);
 // }
  
  
       var firstPassPosX=Array.from(Cix_Opt);
	   var firstPassPosY=Array.from(Ciy_Opt);
	   
	  //--------  go to first recorded optimum opt alpha and its positions:
	    Alpha_Opt=Alpha_Opt*0.5;
	   var FirstPassAlpha_Opt=Alpha_Opt;  
	   

	   
	   for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(FirstPassAlpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  updateCircleNodePositition(Cindex, firstPassPosX[Cindex], firstPassPosY[Cindex]);		  
	   }	
	   	   computePolyCircles(globalPolygon,nodes);
	    drawCicles();
		
		
		
		
 
 
        //do force simulation 
		 //await sleep(500);
		 runSimulation(initialMode , nodes);
//		 await sleep(500);
         drawCicles();
		 //var cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
		 var cells =computePowerDiagram(nodes, Ri,globalPolygon);
		 drawVoronoiCellsBubble(cells);		
		
  console.log("loop finished");
  
  

 // console.log("switchSimulationStaticToMoveMode");
	
  // STEP 2: now keep ci center fixed, then decrease alpha toward scaleAlphaOptim
  // which minimizes difference between target area Ai = Ni/N = Wi and Power Diagram 
  // cells (Weighted Voronoi cells) areas		
    //await sleep(500); 
//   Alpha_Opt=Alpha_Opt*0.5;
//   runOptimalStatic(globalPolygon);		 
//    await sleep(500); 
    //drawEpsilonChart();	
	
 console.log("end runAllIterations");

}

function runOneIteration(scaleAlphaT,globalPolygon){
        console.log("start runOneIteration");
		 
		//recompute  Ri  
		for(var i=0; i<Wi.length; ++i){
		  //Ri[i]= computeRadius(Wi[i]  , scaleAlphaT);//  Math.sqrt( scaleAlphaT * parentArea  * Wi[i] / Math.PI);  // 
		  Ri[i]=  Math.sqrt(scaleAlphaT * parentArea * Wi[i] / Math.PI);
		  nodes[i].radius= Ri[i];
		}
								      
		computePolyCircles(globalPolygon,nodes);		
        drawCicles();
		//updateAllCircleNodePositition();
		
		//do force simulation  	
	    runSimulation(initialMode, nodes);
		
		computePolyCircles(globalPolygon,nodes);
        drawCicles();		
		//updateAllCircleNodePositition();
		
	    //var cells=computePowerDiagram(nodes, Ri, xmin , ymin, height, width);//computePowerDiagram(nodes);
		var cells =computePowerDiagram(nodes, Ri, globalPolygon);	
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
			// d3.select('#AlphaOptimalOutput').text(Alpha_Opt);
			 //d3.select('#OutputSlider').text(Alpha_Opt);
			 
			 for(var Cindex=0; Cindex<Cix.length ; ++Cindex){ 			 
			     	Cix_Opt[Cindex]=Cix[Cindex] ;
			        Ciy_Opt[Cindex]=Ciy[Cindex] ;
			 }		 
		 }


        console.log("end runOneIteration");		 

}



// run simualtion for optimal alpha
async function runOptimalStatic(globalPolygon){
       //Ri Ci recompute it using Alpha_Opt
	    console.log("runOptimalStatic: Alpha_Opt="+Alpha_Opt); scaleAlphaT=Alpha_Opt;
						
		for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(Alpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  updateCircleNodePositition(Cindex, Cix_Opt[Cindex], Ciy_Opt[Cindex]);		  
		}
         
		computePolyCircles(globalPolygon,nodes);
	    drawCicles();
		//updateAllCircleNodePositition();
        //do force simulation 
		 //await sleep(500);
		 runSimulation(initialMode , nodes);
//		 await sleep(500);
         drawCicles();
		 //updateAllCircleNodePositition();
		 //var cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
		 var cells =computePowerDiagram(nodes,  Ri,globalPolygon);
		 drawVoronoiCellsBubble(cells);			 
		 
		 AlphaMove=Alpha_Opt;
}

//run simualtion using alphaMove determined by user slider 
async function runOptimalMove(){
       
       //Ri Ci recompute it using Alpha_Opt
	   console.log("runOptimalMove: AlphaMove="+AlphaMove);  
	   	   
		for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(AlphaMove * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		}

        computePolyCircles(globalPolygon,nodes);         
		drawCicles();		
        //run simulation in move mode
		 //await sleep(500);
		// d3.select('#CurrentModeOutput').text("Move Mode");
		 runSimulation(moveMode , nodes);
         await sleep(500);		
		
		 drawCicles();
		 //var cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
         var cells =computePowerDiagram(nodes, Ri,globalPolygon);
		 drawVoronoiCellsBubble(cells);		 
}

// STEP 4, out of drag mode, go back to step 2.  
async function runOptimalStop(){
        console.log("runOptimalStop: Alpha_Opt="+Alpha_Opt);  
			   
	  	for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(Alpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  //keep ci fixed without change
		}
		
		computePolyCircles(globalPolygon,nodes);         
		drawCicles();	
		//run simulation in static (stop) mode
		 //await sleep(500);
		 //var localSim=
		 //d3.select('#CurrentModeOutput').text("Static Mode");
		 runSimulation(staticMode , nodes);
 		 await sleep(500);
		 
		// if(simulation.alpha() <= simulation.alphaMin())
		 {     simulation.stop();
			   //var cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
			   drawCicles();
               var cells =computePowerDiagram(nodes, Ri,globalPolygon);
			   drawVoronoiCellsBubble(cells);
		 }
		 		 				
}  

function updateAllCircleNodePositition(){
	for(var i=0;i<nodes.length;++i){
		var id=nodes[i].id;				   		   
		var newpos=[];
		newpos.length=0;
		newpos=inPolygon(nodes[i].x, nodes[i].y,  nodes[i].radius, id);
		 nodes[i].x = newpos[0];
		 nodes[i].y = newpos[1];		  
		 updateCircleNodePositition(id, nodes[i].x, nodes[i].y);
	}
	
	
}






function dragstartedBubble(d){
	
 /* if (!d3.event.active){ 
		 //runOptimalMove();
		 switchSimulationStaticToMoveMode();
		 simulation.alphaTarget(.01).restart();	 
	 }	 	 	 
	 
  d.fx = d.x;
  d.fy = d.y;*/
}



function draggedBubble(d) {
 /* d.fx = d3.event.x;
  d.fy = d3.event.y;
  
  //var cells=computePowerDiagram(nodes);
  //var cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
  var cells =computePowerDiagram(nodes, Ri,globalPolygon);
  drawVoronoiCellsBubble(cells);*/
  
}


function dragendedBubble(d) {
	/*
  if (!d3.event.active) {      
		 runOptimalStop();		  		 		 
		 simulation.alphaTarget(.01).restart();  
  }
  
  
  d.fx = null;
  d.fy = null;*/
}


// function for drawing voronoi cells
function drawVoronoiCellsBubble(parentCells){
  //create parent cells			
  	   //remove parent cells
	   parentLayerCopy.selectAll('.polygonsParent')
	   .remove();			
			
	   parentLayerCopy.selectAll('.polygonsParent')
		  .data(parentCells)
		  .enter().append("path")
		  .attr('d', renderCell)
	      .attr("class", "polygonsParent")
		  .attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.id; } )//i  
		  //.style ('fill', "none") 	  
		  .style('fill', function(d) {return  NiColor[d.site.originalObject.id];})	//
          .style("fill-opacity", 0.5)		  
		  .style('stroke', "gray")
		  .style('stroke-width', 3)
		  .style("stroke-opacity", 0.5);	

       parentLayerCopy.selectAll(".polygonsParent").lower();	

parentLayerCopy.selectAll(".polygonsParent").call(d3.drag() // call specific function when circle is dragged
        // .on("start", dragstartedBubble)
         .on("drag", draggedBubble)
         .on("end", dragendedBubble)); 	   
}

function renderCell(d) {
  return d == null ? null : "M" + d.join("L") + "Z"; // (d) => d ? "M" + d.join("L") + "Z" : null)
}



// a tick function that called by simualtion to draw circles  
function ticked() { 
   drawCicles();
};



function drawCicles(){
    var newpos=[];
              
    var u=d3.select('#vis-container-scatterplot').select('g') //d3.select('svg g') 
    .selectAll('circle')
    .data(nodes);
//d3.select('svg g')  parentLayerCopy

    u.enter().append('circle')
     .style('fill', function(d) { return  NiColor[d.id];})
	 .style('stroke', function(d) { return  NiColor[d.id]; })
	 .style('stroke-width', 1.5)
	 .style('stroke-opacity', 0.1)
     .merge(u)
    .attrs(  function(d) {
		  d.radius=Ri[d.id];		   
		   var newpos= inPolygon(d.x,d.y,d.radius,d.id);
		   d.x = newpos[0] ;
		   d.y = newpos[1] ;
		  //var newpos= inRect(d.x,d.y,d.radius);
		  //d.x = newpos.x ;
		  //d.y = newpos.y ;
		  
		  updateCircleNodePositition(d.id, d.x, d.y);
		  //updateRectCircleCenter();

		  return {cx: d.x, cy: d.y , r:d.radius};                                             
	   } 
     ).call(d3.drag() // call specific function when circle is dragged
         .on("start", dragstartedBubble)
         .on("drag", draggedBubble)
         .on("end", dragendedBubble)); 

  u.exit().remove();				
}




///run simulation based on mode type  with different parameters
/*function runSimulation(mode , nodes){

  if(mode==initialMode){
  
           simulation = d3.forceSimulation(nodes)
			  .force("charge", d3.forceManyBody().strength(1000))
			  .force('center', d3.forceCenter(width / 2, height / 2))
			  .force('collision', d3.forceCollide().strength(1).iterations(100).radius(function(d) {
							return Ri[d.id] ; //
			  })) 
				
			  while (simulation.alpha() > simulation.alphaMin()) { 
				  //console.log("still manula ticking");
				  simulation.tick(); ticked(); 									  									 
			  }
				
			  
			   //d3.select('#CurrentModeOutput').text("Initial Mode");
        
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
			  
			  //d3.select('#CurrentModeOutput').text("Static Mode");                                 
   }
   
                                   
     return simulation;
}
*/

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
} 
                              



/*

function runOneIterationBubleWeightedInitial(scaleAlphaT, polyCopy){
	 console.log("runOneIterationBubleWeighted");
	 var cells=null;
	 try{	
	    console.log("computePolyCircles");
        computePolyCircles(polyCopy);	
		//drawCicles();		

 
		//do force simulation 
        console.log("runSimulation");		
	    runSimulation(initialMode, nodes);
		//drawCicles();	
		console.log("computePowerDiagram");
	    cells=computePowerDiagram(nodes,polyCopy);
		console.log(cells);		
		
		
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
		
			  //var areaCell= d3.polygonArea(cellPolygon);	
			  var cell_Id=sitePoly.originalObject.id;
			  //console.log("cell_Id="+cell_Id);
			  updateCircleNodePositition(cell_Id, sitePoly.x, sitePoly.y);
			  
		}
		
	 }catch(err){
			
	 }
	 
	 return cells;
		
	
}


function runOneIterationBubleWeighted(scaleAlphaT, polyCopy){
	 console.log("runOneIterationBubleWeighted");
	 var cells=null;
	 try{	
	    console.log("computePolyCircles");
        computePolyCircles(polyCopy);	
		//drawCicles();		

 
		//do force simulation 
        console.log("runSimulation");		
	    runSimulation( moveMode, nodes);
		//drawCicles();	
		console.log("computePowerDiagram");
	    cells=computePowerDiagram(nodes,polyCopy);
		console.log(cells);		
		
		
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
		
			  //var areaCell= d3.polygonArea(cellPolygon);	
			  var cell_Id=sitePoly.originalObject.id;
			  //console.log("cell_Id="+cell_Id);
			  updateCircleNodePositition(cell_Id, sitePoly.x, sitePoly.y);
			  
		}
		
		for(var Cindex=0; Cindex<Cix.length ; ++Cindex){ 			 
			     	Cix_Opt[Cindex]=Cix[Cindex] ;
			        Ciy_Opt[Cindex]=Ciy[Cindex] ;
		}	
		
	 }catch(err){
			
	 }
	 
	 return cells;
		
	
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


*/

/*
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
			 //d3.select('#AlphaOptimalOutput').text(Alpha_Opt);
			 //d3.select('#OutputSlider').text(Alpha_Opt);
			 
			 for(var Cindex=0; Cindex<Cix.length ; ++Cindex){ 			 
			     	Cix_Opt[Cindex]=Cix[Cindex] ;
			        Ciy_Opt[Cindex]=Ciy[Cindex] ;
			 }		 
		 }	   

}


*/


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
								  
                                   //d3.select('#CurrentModeOutput').text("Initial Mode");
        
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
								  
								  //d3.select('#CurrentModeOutput').text("Static Mode");
                                  
   }
   
                                   
     return simulation;

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


function getGroupSizeSubChildrenBubble(allGroupChildren){
		    if(allGroupChildren.length>=50) 
			   return allGroupChildren.slice(0,50);
		    else 
			   return allGroupChildren;
		} 
 


function runLastOneIterationBubleWeighted(nodes,  globalPolygon){//trialNr, inilizzNr, alpha,
 
	     
		 var powerCells=computePowerDiagram(nodes , globalPolygon);
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
		computeWeightedInitialLoc0(nodesTmp, arrayOfFixedPositionsNodesSimt,globalPolygon);//, xmin ,ymin , width, height
		//---- compute Weighted voro based on init Weighted voro 
		
		var cellsWeighted0=computeWeightedBasedOnPrevoiusLocW0(nodesTmp, arrayOfFixedPositionsNodesSimt, polyCopy);//, xmin ,ymin , width, height, true, trialNr, inilizzNr, alpha
	  	
		arrayOfFixedPositionsNodesSimt.length=0;
	    	
	
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
			computePolyCircles(globalPolygon);
			drawCicles();
		  
		  return cellsWeighted0;
}
