//define global variables for layout, parent polygon,  
//-----------------------------------------
   
var width = 600, height = 600;

// authorized  box to re-center escaped nodes
var xmin = 5;
var xmax = width;
var ymin = 5;
var ymax = height;


// define color opacity of circles and polygones.
var circlesFillObacity=1;
var circlesEdgeObacity=1;

var polygonsFillObacity=0;
var polygonsEdgeObacity=0.5;

//assign random color for each child
var  NiColor=[]; 


// parentPoly =... // INPUT: polygon representing the parent cell
// polygonal boundary
/*var poly =[
  {"x": width ,"y": ymin },
  {"x": xmin ,"y": ymin },
  {"x": xmin ,"y": height },
  {"x": width ,"y": height } 
  ];*/
 
var poly =[ 
{"x": 238 ,"y":543},
{"x": 512 ,"y":458}, 
{"x": 512 ,"y":93},
{"x": 138 ,"y":90},
{"x": 46  ,"y":399} 
  ];


var polyCopy =[
  [ 238 ,543 ],
  [ 512 , 458 ],
  [ 512 , 93 ],
  [ 138 , 90 ],
  [ 46 , 399 ]
  ];

// var parentArea = areaPolygon(parentPoly) // INPUT area of the parent polygonal enclosing cell
var parentArea= d3.polygonArea(polyCopy);

var svg=d3.select("#viz_area");

// Drawing polygon
svg.selectAll("polygon")
.data([poly])
.enter().append("polygon")
.attr("points",function(d) { 
	return d.map(function(d) {
		return [d.x,d.y].join(",");
	}).join(" ");
})
.attr("stroke","black")
.attr("fill","none");
              



//--------------------------------------------------------------------                                                      
//drawing part

// function for creating power diagram 
/*function computePowerDiagram(nodes){
  var weightedVoronoi = d3.weightedVoronoi()
  .x(function(d){ return  d.x; }     )               
  .y(function(d){ return  d.y; }     )               
  .weight(function(d){ return  Math.pow(Ri[d.id], 2) ; } )            //*Math.PI / parentArea *0.5    Math.pow(Ri[d.id], 2) /  Math.PI
  .clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]]); 
		  		  
  var cells = weightedVoronoi(nodes);
  
  return cells;
}*/
  

// function for drawing voronoi cells
function drawVoronoiCells(parentCells){
  //create parent cells			
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
		  .style('fill', function(d) {return  NiColor[d.site.originalObject.id];})	//
          .style("fill-opacity", polygonsFillObacity)		  
		  .style('stroke', "gray")
		  .style('stroke-width', 3)
		  .style("stroke-opacity", polygonsEdgeObacity);	

       svg.selectAll(".polygonsParent").lower();		  
}		


// function for update drawing voronoi cells
function updateVoronoiCells(){
  //var cells =computePowerDiagram(nodes);	
  //var cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
   var cells =computePowerDiagram(nodes, Ri,polyCopy);
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



// a tick function that called by simualtion to draw circles  
function ticked() { 
   drawCicles();
};



function drawCicles(){
    var newpos=[];
              
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
		   d.x = newpos[0] ;
		   d.y = newpos[1] ;
		  //var newpos= inRect(d.x,d.y,d.radius);
		  //d.x = newpos.x ;
		  //d.y = newpos.y ;
		  
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
function dragstarted(d) {

  if (!d3.event.active){ 
		 runOptimalMove();
		 simulation.alphaTarget(.01).restart();	 
	 }	 	 	 
	 
  d.fx = d.x;
  d.fy = d.y;
}


function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
  
  //var cells=computePowerDiagram(nodes);
  //var cells =computePowerDiagram(nodes, Ri, xmin , ymin, height, width);
  var cells =computePowerDiagram(nodes, Ri,polyCopy);
  drawVoronoiCells(cells);
  
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
		

 		

// function for updating drawing small rectangles
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
	  
	  
//function for drawing errors chart  	  
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