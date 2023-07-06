
//compute power diagrams
//--------------------------------------------

/*function computePowerDiagram(nodes){
  var weightedVoronoi = d3.weightedVoronoi()
  .x(function(d){ return  d.x; }     )               
  .y(function(d){ return  d.y; }     )               
  .weight(function(d){ return  Math.pow(Ri[d.id], 2) ; } )            //*Math.PI / parentArea *0.5    Math.pow(Ri[d.id], 2) /  Math.PI
  .clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]]); 
		  		  
  var cells = weightedVoronoi(nodes);
  
  return cells;
}*/

// function for creating power diagram 
function computePowerDiagram(localnodes, polyCopy){//Ri, xmin , ymin, height, width){
  var weightedVoronoi = d3.weightedVoronoi()
  .x(function(d){ return  d.x; }     )               
  .y(function(d){ return  d.y; }     )               
  .weight(function(d){ return Math.pow(d.radius , 2) ; } )    //Math.pow(Ri[d.id], 2)        //*Math.PI / parentArea *0.5    Math.pow(Ri[d.id], 2) /  Math.PI
  //.clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]]); 
	.clip(polyCopy); 
	
  var cells = weightedVoronoi(localnodes);
  
  return cells;
}
  

function findBottomLeftCellID(cells){
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
		      cell_Id=sitePoly.originalObject.id;
			  break;
		  }
    }
     
    return cell_Id;
	
}

function findPathStartCellID(cells, polygoneIndex){
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
		      cell_Id=sitePoly.originalObject.id;
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

//drawing function
//-----------------------------------------------

function drawCicles(){
/*    var newpos=[];
              
    var u=d3.select('svg g')
    .selectAll('circle')
    .data(nodes);

    u.enter().append('circle')
     .style('fill', function(d) { return  NiColor[d.id];})
	 .style('stroke', function(d) { return  NiColor[d.id]; })
	 .style('stroke-width', 1.5)
	 .style('stroke-opacity', circlesEdgeObacity)
     .merge(u)
    .attrs(  function(d) {
		  d.radius=Ri[d.id];		   
		   var newpos= inPolygon(d.x,d.y,d.radius,d.id);
		   d.x = newpos[0];
		   d.y = newpos[1];
		  //var newpos= inRect(d.x,d.y,d.radius);
		  //d.x = newpos.x ;
		 // d.y = newpos.y ;
		  
		  updateCircleNodePositition(d.id, d.x, d.y);
		 // updateRectCircleCenter();
		  //Cix[d.id]= d.x;
		 // Ciy[d.id]= d.y;
		  //nodes[d.id].x= d.x;
		  //nodes[d.id].y= d.y;
         // 
		   
		  return {cx: d.x, cy: d.y , r:d.radius};                                             
	   } 
     ).call(d3.drag() // call specific function when circle is dragged
         .on("start", dragstarted)
         .on("drag", dragged)
         .on("end", dragended)); 

  u.exit().remove();
*/

  updateAllCircleNodePositition();
  
  if(isDebugMode){
	   var u=d3.select('svg g')
		.selectAll('circle')
		.data(nodes);

		u.enter().append('circle')
		 .style('fill', function(d) { return  NiColor[d.id];})
		 .style('stroke', function(d) { return  NiColor[d.id]; })
		 .style('stroke-width', 1.5)
		 .style('stroke-opacity', circlesEdgeObacity)
		 .merge(u)
		 .attrs(  function(d) { 
		  return {cx: d.x, cy: d.y , r:d.radius};                                             
		   } 
		 ).call(d3.drag() // call specific function when circle is dragged
			 .on("start", dragstarted)
			 .on("drag", dragged)
			 .on("end", dragended)); 

	  u.exit().remove();
   }
}

// tick function   
function ticked() {
  
   drawCicles();

  //console.log("scaleAlphaT="+scaleAlphaT);  
  //console.log(simulation.alpha());
  //console.log(simulation.alphaMin());
  //simulation.alpha() > simulation.alphaMin();
};



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

function tickedEnd(){
 console.log("tickedEnd");
 console.log("scaleAlphaT="+scaleAlphaT); 
  var cells=computePowerDiagram(nodes);
  drawVoronoiCells(cells);
 // updateRectCircleCenter();
  //updateVoronoiCells();
}

  

function updateCircleNodePositition(id, x, y){
    Cix[id]= x;
    Ciy[id]= y;
    nodes[id].x= x;
    nodes[id].y= y;
}  


// What happens when a circle is dragged?
function dragstarted(d) {

  //if (!d3.event.active)
  { 
		 runOptimalMove();
		 simulation.alphaTarget(.01).restart();	 
		 

	 }	 	 	 
	 
  d.fx = d.x;
  d.fy = d.y;
}


function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
  
  var cells=computePowerDiagram(nodes);
  drawVoronoiCells(cells);
  
}

function draggedModified(d) {
  d.fx = currentMoveX;//d.x;
  d.fy = currentMoveY;//d.y;
  
  //var cells=computePowerDiagram(nodes);
  //drawVoronoiCells(cells);
  
}

function dragended(d) {
  //if (!d3.event.active)
  {      
		 runOptimalStop();		  		 		 
		 simulation.alphaTarget(.01).restart();  
  }
  
  
  d.fx = null;
  d.fy = null;
}



function drawVoronoiCells(parentCells){
  //create parent cells
  
       // console.log("drawVoronoiCells");
			
  	   //remove parent cells
	   svg.selectAll('.polygonsParent')
	   .remove();			
			
	   svg.selectAll('.polygonsParent')
		  .data(parentCells)
		  .enter().append("path")
		  .attr('d', renderCell)
	      .attr("class", "polygonsParent")
		  .attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.id; } )//i  
		  //.style ('fill', "none") 	  
		  .style('fill',"none")//  function(d) {return  NiColor[d.site.originalObject.id];})	//
          .style("fill-opacity", polygonsFillObacity)		  
		  .style('stroke', "gray")
		  .style('stroke-width', 3)
		  .style("stroke-opacity", polygonsEdgeObacity);	  	  
}		


function drawWeightedVoronoiCells(parentCells){
  //create parent cells
  
       // console.log("drawVoronoiCells");
			
  	   //remove parent cells
	   svg.selectAll('.polygonsParent')
	   .remove();			
			
	   svg.selectAll('.polygonsParent')
		  .data(parentCells)
		  .enter().append("path")
		  .attr('d', renderCell)
	      .attr("class", "polygonsParent")
		  .attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.data.originalData.id; } )//i    
		  //.style ('fill', "none") 	  
		  .style('fill',"none")//  function(d) {return  NiColor[d.site.originalObject.id];})	//
          .style("fill-opacity", polygonsFillObacity)		  
		  .style('stroke', "gray")
		  .style('stroke-width', 3)
		  .style("stroke-opacity", polygonsEdgeObacity);	  	  
}


function drawRectWeightedVoronoi(parentCells){
   //create parent rectangles	  
	   
	    //parent parent rectangles
	    svg.selectAll('.rectsParent')
			.remove();
	  
	    svg.selectAll('.rectsParent')
		.data(parentCells)
		.enter().append("rect")//if(d.site.originalObject.data.originalData.id!=parentIndexStartDragChild)
		  .attr("x", function (d) { if(d.site.originalObject.data.originalData.id!=parentIndexStartDragChild) nodesCopy[d.site.originalObject.data.originalData.id].x=d.site.x ; return nodesCopy[d.site.originalObject.data.originalData.id].x; }) // x position of rect node
		  .attr("y", function (d) { if(d.site.originalObject.data.originalData.id!=parentIndexStartDragChild) nodesCopy[d.site.originalObject.data.originalData.id].y=d.site.y ; return nodesCopy[d.site.originalObject.data.originalData.id].y ; }) // y position of rect node 
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
		  
		  svg.selectAll(".rectsParent").raise(); 
}


function drawRectCircleCenter(parentCells){
   //create parent rectangles	  
	   
	    //parent parent rectangles
	    svg.selectAll('.rectsParent')
			.remove();
	  
	    svg.selectAll('.rectsParent')
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
		  
		  svg.selectAll(".rectsParent").raise(); 
}
		

function updateVoronoiCells(){
  var cells =computePowerDiagram(nodes);
   //update cells 
  svg.selectAll('.polygonsParent')
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


function updateRectCircleCenter(){
  //update rects positions
  svg.selectAll('.rectsParent')
  .attr("x", function (d) { return ( nodes[d.site.originalObject.id].x ); }) // x position of rect node
  .attr("y", function (d) { return ( nodes[d.site.originalObject.id].y ); }); // y position of rect node 
  
  svg.selectAll(".rectsParent").raise(); 
}

		  
function renderCell(d) {
  return d == null ? null : "M" + d.join("L") + "Z"; // (d) => d ? "M" + d.join("L") + "Z" : null)
}
	  
	  
	  
// function for drawing errors chart
//-----------------------------------------	  
function drawEpsilonChart(){

     console.log("drawEpsilonChart");
	 console.log(dataAlphaEpsilon);
	 
		 
    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain([0.0,sacaleAlphaMax+0.2])  //scaleAlphaMin-0.2   d3.extent(dataAlphaEpsilon, function(d) { return d.Alpha; })  
      .range([ 0, 200 ]);
	    

    // Add Y axis
	var minMaxEpsilon=d3.extent(dataAlphaEpsilon, function(d) { return d.Epsilon; });

    var y = d3.scaleLinear()
      .domain([0.0, minMaxEpsilon[1]])  //d3.extent(dataAlphaEpsilon, function(d) { return d.Epsilon; })  0,0.1
      .range([ 100, 0 ]);
	  
   
    // Initialize line with group a
	
	var lineGenerator=  d3.line()
	     .curve(d3.curveBasis) 
        .x(function(d) { return x(d.Alpha) ;})
        .y(function(d) { return y(d.Epsilon); });
					
		/*var lineGenerator=  d3.line()
        .x(function(d,i) { return x(+i) ;})
        .y(function(d,i) { return y(+d.value); });*/
		
	svg.selectAll('.line')
			.remove();
	
	svg.selectAll('.xAxis')
			.remove();

	svg.selectAll('.yAxis')
			.remove();		

    svg.selectAll('.xAxisText')
			.remove();	

	svg.selectAll('.yAxisText')
			.remove();	
			
			
    var line = svg .append("path")	 
  	    .attr("transform", "translate(50," + 650 + ")")
        .data([dataAlphaEpsilon])
		.attr("class", "line")
        .attr("d", lineGenerator)
		.style("stroke", "#000")
        .style("stroke-width", 2)
       .style("fill", "none");
	   	
		
	svg.append("g")
	  .attr("class", "xAxis")
      .attr("transform", "translate(50," + 750 + ")")
      .call(d3.axisBottom(x));
	  
	svg.append("text")             
    .attr("class", "xAxisText")
	.attr("transform", "translate(120," + 790 + ")")
	.style("text-anchor", "middle")
    .text("Alpha");
		  
		  
    svg.append("g")
	  .attr("class", "yAxis")
	  .attr("transform", "translate(50," + 650 + ")")
      .call(d3.axisLeft(y));	

   svg.append("text")             
    .attr("class", "yAxisText")
	.attr("transform", "translate(30," + 640 + ")")	
	.style("text-anchor", "middle")
    .text("Error");
}
