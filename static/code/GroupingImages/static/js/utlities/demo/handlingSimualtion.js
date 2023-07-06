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

 

// var N = sum of N_i; // total number of leaves represented by the parent cell
var N=0;
		   		 
// INPUT number of leaves represented by the child cell i
var Ni=[];

// var Wi = Ni/N weight of each child i, so proprotion of area the cell of child i should take in the parent cell
// target area Ai = Ni/N = Wi
var Wi =[]; 
 


//assign random color for each child
var  NiColor=[];

var scaleAlphaInit=0.45;//0.78;//0.90; gives error when there is a big parent cell (use 0.8)
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

//////////////////////////////
//drawing

var circlesFillObacity=1;
var circlesEdgeObacity=1;

var polygonsFillObacity=0;
var polygonsEdgeObacity=0.5;


//////////////////////////////


var parentArea=0;// d3.polygonArea(polyCopySquare);
var globalPolygon;
var parentLayerCopy;


function setParentArea(globalPolygonLocal){
   var parentAreaLocal=d3.polygonArea(globalPolygonLocal);
	parentArea=parentAreaLocal;
	globalPolygon=globalPolygonLocal;
}


//function for creating number of weighted children in the parent cell  with random leaves (up to 10 leaves for each child cell)  
function createNi(parentNodes, parentChildrenMap, prototypesChildrenNodes){
  console.log("createNi");	
  N=0;
  Ni=[];
  Ni.length=0;
  
  for(var cn=0; cn<parentNodes.length ; ++cn){
    //Ni[cn]= getRandomInt(maxLeavesNumber);
	Ni[cn]=getGroupSizeSubChildrenBubble(parentChildrenMap.get(parentNodes[cn].n), prototypesChildrenNodes).length;
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
	 
     
	 nodes.push({x: xValue,y: yValue,radius: radiusValue,id: Nindex,n: Nindex, type: 1 });  
     //nodesOrginal.push({x: xValue,y: yValue,radius: radiusValue,id: Nindex,type: 1 }); 	 
  }	
  
    console.log(nodes);
  
}


function updateNodes(parentNodes){ 
   for(var Nindex=0; Nindex<parentNodes.length; ++Nindex){
	    nodes[Nindex].x =parentNodes[Nindex].x;
		nodes[Nindex].y =parentNodes[Nindex].y;
		
		Cix[Nindex]= nodes[Nindex].x;
        Ciy[Nindex]= nodes[Nindex].y;
   }

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




function initaliz(d,parentLayer,parentNodes, parentChildrenMap,  parentCellsColors, globalPolygon, prototypesChildrenNodes){
	
	parentLayerCopy=parentLayer;

   // console.log("initaliz="+myrng()); 
   console.log("start bubble initaliz=");  
   setParentArea(globalPolygon);
   
   createNi(parentNodes , parentChildrenMap, prototypesChildrenNodes); 
   createWi();
   assignColors(parentCellsColors);
   createRadius();
   createNodes(parentNodes);   
   
   setSvg(parentLayerCopy);
   computePolyCircles(globalPolygon,nodes);  
   	drawCicles(nodes);	
   
   runAllIterations(scaleAlphaInit);
   
    dragstarted(d);
	//dragged(d);

 // d.fx = d3.event.x;
 // d.fy = d3.event.y;
  
  //var cells=computePowerDiagram(nodes);
  //var cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
  var cells =computePowerDiagram(nodes, Ri,globalPolygon);
  
   return cells;
}
   

//call initialize data   
//initaliz();  
//computePolyCircles(polyCopy);   
//start running all iteration   
//runAllIterations();
	  
		  
		  
//---------------------------------------------
//calling force directed simualtion iterativly		  
async function runAllIterations(scaleAlphaInit){

  //STEP 1: grow alpha from scaleAlphaMin to scaleAlphaMax, 
  //so to find the position of the centers of the circles (finding optimal alpha)
  //(use gravity toward CG of parent cell + low anti-collision force)	  		  
//  for(var scaleAlphaT=scaleAlphaMin; scaleAlphaT<=sacaleAlphaMax ; scaleAlphaT=scaleAlphaT+0.1){
    runOneIteration(scaleAlphaInit);	  	
	await sleep(500);
//  }
  
  console.log("loop finished");


  
  // STEP 2: now keep ci center fixed, then decrease alpha toward scaleAlphaOptim
  // which minimizes difference between target area Ai = Ni/N = Wi and Power Diagram 
  // cells (Weighted Voronoi cells) areas		
    //await sleep(500); 

   Alpha_Opt=Alpha_Opt*0.5;
   
   runOptimalStatic();		 
    await sleep(500); 
	
    //drawEpsilonChart();	

}


// calling  simualtion one time
async function runOneIteration(scaleAlphaT){
  
		//recompute  Ri  
		for(var i=0; i<Wi.length; ++i){
		  Ri[i]= computeRadius(Wi[i]  , scaleAlphaT);
		  nodes[i].radius= Ri[i];
		}

		computePolyCircles(globalPolygon,nodes); 
        
		drawCicles(nodes);			 
		//do force simulation  	
	    runSimulation(initialMode, nodes);
      
	    //computePolyCircles(globalPolygon,nodes); 
			
	    drawCicles(nodes);	
		//var cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
		var cells =computePowerDiagram(nodes, Ri,globalPolygon);
		drawVoronoiCells(cells);		
		drawRectCircleCenter(cells);
		
	    var epsilon=0;
	    //console.log("epsilon");
	    for(var index=0; index<cells.length ; ++index){ 
		  var sitePoly=cells[index].site;	   
		  var cellPolygon=Array.from(sitePoly.polygon);
		  var areaCell= d3.polygonArea(cellPolygon);	
		  var cell_Id=sitePoly.originalObject.id;
		
		  updateCircleNodePositition(cell_Id, sitePoly.x, sitePoly.y);

		  //var eps=Math.pow( Wi[cell_Id] - (areaCell/parentArea) , 2) ;  
		  epsilon= epsilon + Math.pow( Wi[cell_Id] - (areaCell/parentArea) , 2);
	    }
           		  
		 
         //dataAlphaEpsilon.push({Alpha: scaleAlphaT, Epsilon:  epsilon});
		  
		 if( epsilon_Opt > epsilon){
			 //having copy of optimal epsilon, Alpha, Ci
			 epsilon_Opt=epsilon;
			 Alpha_Opt= scaleAlphaT;// parseFloat(scaleAlphaT.toFixed(5)) ;
			 //d3.select('#AlphaOptimalOutput').text(Alpha_Opt);
			 //d3.select('#OutputSlider').text(Alpha_Opt);
			 
			 for(var Cindex=0; Cindex<Cix.length ; ++Cindex){ 			 
			     	Cix_Opt[Cindex]=Cix[Cindex] ;
			        Ciy_Opt[Cindex]=Ciy[Cindex] ;
			 }		 
		 }
	   
}


// run simualtion for optimal alpha
async function runOptimalStatic(){
       //Ri Ci recompute it using Alpha_Opt
	    console.log("runOptimalStatic: Alpha_Opt="+Alpha_Opt); scaleAlphaT=Alpha_Opt;
						
		for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(Alpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  updateCircleNodePositition(Cindex, Cix_Opt[Cindex], Ciy_Opt[Cindex]);		  
		}
         
		computePolyCircles(globalPolygon,nodes); 
	    drawCicles(nodes);
        //do force simulation 
		 //await sleep(500);
		 runSimulation(initialMode , nodes);
//		 await sleep(500);

		//computePolyCircles(globalPolygon,nodes); 
         drawCicles(nodes);
		 //var cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
		 var cells =computePowerDiagram(nodes, Ri,globalPolygon);
		 drawVoronoiCells(cells);			 
		 
		 AlphaMove=Alpha_Opt;
}




// STEP 3: given some tradeoff on scaleAlpha to be determined by user, 
// we enter the drag mode with that specific scaleAlpha value, 
// it should be between scaleAlphaOptim (approximately weighted voronoi) 
// and 0 (unweighted voronoi cells)

//run simualtion using alphaMove determined by user slider 
async function runOptimalMove(){

   
 if(isSimulationMove){	 
   //Ri Ci recompute it using Alpha_Opt
	   console.log("runOptimalMove: AlphaMove="+AlphaMove+" isSimulationMove="+isSimulationMove);  
	   	   
		for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(AlphaMove * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		}

         computePolyCircles(globalPolygon,nodes);         
		drawCicles(nodes);		
        //run simulation in move mode
		 //await sleep(500);
		 //d3.select('#CurrentModeOutput').text("Move Mode");
		 runSimulation(moveMode , nodes);
         await sleep(500);		
		
		 drawCicles(nodes);
		 //var cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
         var cells =computePowerDiagram(nodes, Ri,globalPolygon);
		 drawVoronoiCells(cells);	

  isSimulationMove=false;
 }	
	 
}

  
// STEP 4, out of drag mode, go back to step 2.  
async function runOptimalStop(){
        
 console.log("runOptimalStop: Alpha_Opt="+Alpha_Opt+" isSimulationStop="+isSimulationStop);  
			 
 if(isSimulationStop){
			 
	  	for(var Cindex=0; Cindex<Cix.length; ++ Cindex){
		  Ri[Cindex]=  Math.sqrt(Alpha_Opt * parentArea * Wi[Cindex] / Math.PI);
		  nodes[Cindex].radius= Ri[Cindex];
		  //keep ci fixed without change
		}
		
		computePolyCircles(globalPolygon,nodes);          
		drawCicles(nodes);	
		//run simulation in static (stop) mode
		 //await sleep(500);
		 //var localSim=
		 //d3.select('#CurrentModeOutput').text("Static Mode");
		 runSimulation(staticMode , nodes);
//		 runSimulation(initialMode, nodes);
 		 await sleep(500);
		 
		// if(simulation.alpha() <= simulation.alphaMin())
		 {     simulation.stop();
			   //var cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
			   
			   //computePolyCircles(globalPolygon,nodes); 
			   drawCicles(nodes);
               var cells =computePowerDiagram(nodes, Ri,globalPolygon);
			   drawVoronoiCells(cells);
		 }
	
  isSimulationStop=false;
 }		
}  


///run simulation based on mode type  with different parameters
function runSimulation(mode , nodes){

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

///run simulation based on mode
function runSimulation2(mode , nodes){

  if(mode==initialMode){
  
           simulation = d3.forceSimulation(nodes)
                                  .force("charge", d3.forceManyBody().strength(1000))
                                  .force('center', d3.forceCenter(width / 2, height / 2))
  
                                  .force('collision', d3.forceCollide().strength(1).iterations(100).radius(function(d) {
                                                return Ri[d.id] ; //
                                  }));//.on('tick', ticked);
								    
								  var tickCounter=0;
								  //while (simulation.alpha() > simulation.alphaMin()) { 
								  while (tickCounter <100 ){
								      ++tickCounter;
								      //console.log("still manula ticking");
								      simulation.tick(); ticked(); 
								  };
					
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

///run simulation based on mode
function runSimulation1(mode , nodes){

  if(mode==initialMode){
  
      try{     simulation = d3.forceSimulation(nodes)
		  .force("charge", d3.forceManyBody().strength(1000))//1000
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
		//	console.log(++counter);
		  }
		  
		  }catch(e){
		  }
					         
  }else if(mode==moveMode){

		 simulation.nodes(nodes)
		  .force("charge", d3.forceManyBody().strength(0))
		  //.force("center", null)//.strength(0)
		 .force('x', d3.forceX().x(function(d) {
			 return nodes[d.id].x; 
		  }).strength(10))
		.force('y', d3.forceY().y(function(d) {
			return nodes[d.id].y;
		  }).strength(10))
		.force('collision', d3.forceCollide().strength(2).iterations(100).radius(function(d) {
						return Ri[d.id] ; 
		  })).on('tick', ticked);
		  
		  
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
                                
  

/////////////////drawing


// function for drawing voronoi cells
function drawVoronoiCells(parentCells){
  //create parent cells			
  	   //remove parent cells
	   //parentLayerCopy
	   d3.select('#vis-container-scatterplot').select('g').selectAll('.polygonsParent')
	   .remove();			
			
	   //parentLayerCopy
	   d3.select('#vis-container-scatterplot').select('g').selectAll('.polygonsParent')
		  .data(parentCells)
		  .enter().append("path")
		  .attr('d', renderCell)
	      .attr("class", "polygonsParent")
		  .attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.id; } )//i  
		  //.style ('fill', "none") 	  
		  .style('fill', function(d) {return  NiColor[d.site.originalObject.id];})	//
          .style("fill-opacity",1)		  
		  .style('stroke', "gray")
		  .style('stroke-width', 3)
		  .style("stroke-opacity", 0.3);	

       //parentLayerCopy
	   d3.select('#vis-container-scatterplot').select('g').selectAll(".polygonsParent").lower();

       //parentLayerCopy
       d3.select('#vis-container-scatterplot').select('g').selectAll(".polygonsParent").call(d3.drag() // call specific function when circle is dragged
         .on("start", dragstarted)
         .on("drag", dragged)
         .on("end", dragended)); 	   
}		


// function for update drawing voronoi cells
function updateVoronoiCells(){
  //var cells =computePowerDiagram(nodes);	
  //var cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
   var cells =computePowerDiagram(nodes, Ri,globalPolygon);
   //update cells 
  parentLayerCopy.selectAll('.polygonsParent')
	.data(cells)					
	.enter().append("path")
	 .attr('d', renderCell)
	 .attr("class", "polygonsParent")
	 .attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.id; } )//i  
	 //.style ('fill', "none") 
	 .style('fill',  "none")// function(d) {return  NiColor[d.site.originalObject.id];})  //
	 .style("fill-opacity", polygonsFillObacity)
	 .style('stroke', "gray")
	 .style('stroke-width', 3)
	 .style("stroke-opacity", polygonsEdgeObacity);	 
} 



// a tick function that called by simualtion to draw circles  
function ticked() { 
   drawCicles(nodes);
};



function drawCicles(nodes){
    var newpos=[];
              
    var u=d3.select('#vis-container-scatterplot').select('g')//parentLayerCopy//d3.select('svg g')
    .selectAll('circle')
    .data(nodes);

    u.enter().append('circle')
	 .attr('class','parentCircles')
     .style('fill', function(d) { return  NiColor[d.id];})
	 .style('stroke', function(d) { return  NiColor[d.id]; })
	 .style('fill-opacity',0)
	 .style('stroke-width', 0)//1.5
	 .style('stroke-opacity', circlesEdgeObacity)
     .merge(u)
    .attrs(  function(d) {
		  d.radius=Ri[d.id];	
		  
		   var newpos= inPolygon(d.x,d.y,d.radius,d.id);
		   d.x = newpos[0] ;
		   d.y = newpos[1] ;
		  //var newpos= inRect(d.x,d.y,d.radius);
		  //d.x = newpos.x ;
		  //d.y = newpos.y ;
		  //console.log("drawCicles");
		  //console.log(newpos);
		  updateCircleNodePositition(d.id, d.x, d.y);
		  updateRectCircleCenter();

		  return {cx: d.x, cy: d.y , r:d.radius};                                             
	   } 
     ).call(d3.drag() // call specific function when circle is dragged
         .on("start", dragstarted)
         .on("drag", dragged)
         .on("end", dragended)); 

  u.exit().remove();				
}


/*function tickedEnd(){
 console.log("tickedEnd");
 console.log("scaleAlphaT="+scaleAlphaT); 
  var cells=computePowerDiagram(nodes);
  drawVoronoiCells(cells);
 // updateRectCircleCenter();
  //updateVoronoiCells();
}*/




// What happens when a circle is dragged?
var isSimulationMove=false;
function activateSimulationMove(){
  isSimulationMove=true;
}

function deActivateSimulationMove(){
	 isSimulationMove=false;
}


var isSimulationStop=false;
function activateSimulationStop(){
  isSimulationStop=true;
}

function deActivateSimulationStop(){
	isSimulationStop=false;
}


function dragstarted(d) {

 // if (!d3.event.active){ 
		 runOptimalMove();
		 simulation.alphaTarget(.01).restart();	 
    //} 
 	 	 
	 
  d.fx = d.x;
  d.fy = d.y;
}


function dragged(d) {
	
  console.log("dragged-handle");
  if(isSimulationStop && isSimulationMove){
	//moved to create weighted  
	  d.fx = d3.event.x;
	  d.fy = d3.event.y;
	  var cells =computePowerDiagram(nodes, Ri,globalPolygon);
	  drawVoronoiCells(cells);
  }
  
}


function dragended(d) {
  if (!d3.event.active) {      
		 runOptimalStop();		  		 		 
		 simulation.alphaTarget(.01).restart();  
  }
  
  
  d.fx = null;
  d.fy = null;
  
}

  
// function for drawing small rectangles as circle center   
function drawRectCircleCenter(parentCells){
   //create parent rectangles	  
	   
	    //parent parent rectangles
	    parentLayerCopy.selectAll('.rectsParent')
			.remove();
	  
	    parentLayerCopy.selectAll('.rectsParent')
		.data(parentCells)
		.enter().append("rect")
		  .attr("x", function (d) { return nodes[d.site.originalObject.id].x; }) // x position of rect node
		  .attr("y", function (d) { return nodes[d.site.originalObject.id].y ; }) // y position of rect node 
		  .attr("width", function(d,i){ return   5 ; })// initial width of rect  
		  .attr("height", function(d,i){ return  5   ; } )// initial height of rect  
		  .attr("class", "rectsParent")
		  .attr("id", function(d,i){ return 'parentRectname' +d.site.originalObject.id; })// id of rect
		  .attr("iIndex", function(d,i){ return d.site.originalObject.id; })// index of rect
		  .style("stroke-width", 1) // initial thickhness of border is 1
		  .style("stroke",  "black") // color points
		  .style("fill", "black")//  // color points
		  .append("svg:title") 
		  .text(function(d,i) { return 'parent node: ' + d.site.originalObject.id;});	
		  
		  parentLayerCopy.selectAll(".rectsParent").raise(); 
}
		

 		

// function for updating drawing small rectangles
function updateRectCircleCenter(){
  //update rects positions
   parentLayerCopy.selectAll('.rectsParent')
  .attr("x", function (d) { return ( nodes[d.site.originalObject.id].x ); }) // x position of rect node
  .attr("y", function (d) { return ( nodes[d.site.originalObject.id].y ); }); // y position of rect node 
  
  parentLayerCopy.selectAll(".rectsParent").raise(); 
}

		  
function renderCell(d) {
  return d == null ? null : "M" + d.join("L") + "Z"; // (d) => d ? "M" + d.join("L") + "Z" : null)
}


function getGroupSizeSubChildrenBubble1(allGroupChildren){
		    if(allGroupChildren.length>=50) 
			   return allGroupChildren.slice(0,50);
		    else 
			   return allGroupChildren;
		} 
		
		
function getGroupSizeSubChildrenBubble(allGroupChildren, prototypesChildrenNodes){
				
			var proto=[];
			proto.length=0;
									
			for(var i=0; i<allGroupChildren.length;++i){
				if(prototypesChildrenNodes.length>0){
				  for(var p=0; p<prototypesChildrenNodes.length ; ++p){							 
						if( parseInt(allGroupChildren[i])== parseInt(prototypesChildrenNodes[p]) ){
							proto.push(prototypesChildrenNodes[p]);							
							return proto;
						}
				   }				   
				}
			}
			
		    return allGroupChildren;
} 
				



function runLastOneIterationBubleWeighted(nodes,parentChildrenMap,totalInitialNodesSize,  globalPolygon, parentIndexStartDragChild){ 
        // runOptimalStop();
		// simulation.alphaTarget(.01).restart();  
		// var powerCells=computePowerDiagram(nodes , globalPolygon);
		var powerCells= computePowerDiagram(nodes, Ri,globalPolygon);
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
			 nodesTmp[Nindex].n= nodes[Nindex].n   ;
			 nodesTmp[Nindex].type= nodes[Nindex].type   ;
			 
			 nodesTmp[Nindex].weight= Wi[Nindex] ; //nodes[Nindex].weight;//
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
//		computeWeightedInitialLoc0(nodesTmp, arrayOfFixedPositionsNodesSimt,polyCopy);//, xmin ,ymin , width, height
		//---- compute Weighted voro based on init Weighted voro 

		//var cellsWeighted=computeWeightedBasedOnPrevoiusLoc(nodesTmp, arrayOfFixedPositionsNodesSimt, xmin ,ymin , width, height, true);
//		var cellsWeighted0=computeWeightedBasedOnPrevoiusLocW0(nodesTmp, arrayOfFixedPositionsNodesSimt, polyCopy);//, xmin ,ymin , width, height, true, trialNr, inilizzNr, alpha



//	    var cell=computeWeightedInitialLoc0(nodesTmp,parentChildrenMap,totalInitialNodesSize, [] ,polyCopyGlobal);
//	    var cellsWeighted0 =computeWeightedBasedOnPrevoiusLocW00(nodesTmp, [] ,polyCopyGlobal);	


	    var cell=computeWeightedInitialLoc0(nodesTmp,parentChildrenMap,totalInitialNodesSize, arrayOfFixedPositionsNodesSimt ,polyCopyGlobal);
	    var cellsWeighted0 =computeWeightedBasedOnPrevoiusLocW00(nodesTmp, arrayOfFixedPositionsNodesSimt ,polyCopyGlobal);	
											

		//compute and record errors
//		computeError(cellsWeighted,"BubbleWeighted", "BubbleWeighted");		
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
			drawRectWeightedVoronoi(cellsWeighted0, parentIndexStartDragChild);
			//arrayOfFixedPositionsNodesSimt.length=0;
            //computePolyCircles(globalPolygon,nodes);  
			//drawCicles(nodes);
		  
		  return cellsWeighted0;
}


function drawWeightedVoronoiCells(parentCells){
  //create parent cells
  
       // console.log("drawVoronoiCells");
			
  	   //remove parent cells
	   parentLayerCopy.selectAll('.polygonsParent')
	   .remove();			
			
	   parentLayerCopy.selectAll('.polygonsParent')
		  .data(parentCells)
		  .enter().append("path")
		  .attr('d', renderCell)
	      .attr("class", "polygonsParent")
		  .attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.data.originalData.id; } )//i    
		  //.style ('fill', "none") 	  
		  .style('fill',"none")//  function(d) {return  NiColor[d.site.originalObject.id];})	//
          .style("fill-opacity", 1)		  
		  .style('stroke', "gray")
		  .style('stroke-width', 3)
		  .style("stroke-opacity", 0.3);	  	  
}


function drawRectWeightedVoronoi(parentCells, parentIndexStartDragChild){
   //create parent rectangles	  
	   
	    //parent parent rectangles
	    parentLayerCopy.selectAll('.rectsParent')
			.remove();
	  
	    parentLayerCopy.selectAll('.rectsParent')
		.data(parentCells)
		.enter().append("rect")//if(d.site.originalObject.data.originalData.id!=parentIndexStartDragChild)
		  .attr("x", function (d) { if(d.site.originalObject.data.originalData.id!=parentIndexStartDragChild) nodes[d.site.originalObject.data.originalData.id].x=d.site.x ; return nodes[d.site.originalObject.data.originalData.id].x; }) // x position of rect node
		  .attr("y", function (d) { if(d.site.originalObject.data.originalData.id!=parentIndexStartDragChild) nodes[d.site.originalObject.data.originalData.id].y=d.site.y ; return nodes[d.site.originalObject.data.originalData.id].y ; }) // y position of rect node 
		  .attr("width", function(d,i){ return   5 ; })// initial width of rect  
		  .attr("height", function(d,i){ return  5   ; } )// initial height of rect  
		  .attr("class", "rectsParent")
		  .attr("id", function(d,i){ return 'parentRectname' +d.site.originalObject.data.originalData.id; })// id of rect
		  .attr("iIndex", function(d,i){ return d.site.originalObject.data.originalData.id; })// index of rect
		  .style("stroke-width", 1) // initial thickhness of border is 1
		  .style("stroke",  "black") // color points
		  .style("fill", "black")//  // color points
		  .append("svg:title") 
		  .text(function(d,i) { return 'parent node: ' + d.site.originalObject.data.originalData.id;});	
		  
		  parentLayerCopy.selectAll(".rectsParent").raise(); 
}
