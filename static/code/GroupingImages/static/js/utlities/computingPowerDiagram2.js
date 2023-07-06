// function for creating power diagram 
/*function computePowerDiagram(localnodes, Ri, xmin , ymin, height, width){
  var weightedVoronoi = d3.weightedVoronoi()
  .x(function(d){ return  d.x; }     )               
  .y(function(d){ return  d.y; }     )               
  .weight(function(d){ return  Math.pow(Ri[d.id], 2) ; } )            //*Math.PI / parentArea *0.5    Math.pow(Ri[d.id], 2) /  Math.PI
  .clip([[xmin,ymin], [xmin,height], [width, height], [width,ymin]]); 
		  		  
  var cells = weightedVoronoi(localnodes);
  
  return cells;
}*/
  
  
function computePowerDiagram(localnodes, Ri, polyCopy){
  var weightedVoronoi = d3.weightedVoronoi()
  .x(function(d){ return  d.x; }     )               
  .y(function(d){ return  d.y; }     )               
  .weight(function(d){ return  Math.pow(Ri[d.id], 2) ; } )            //*Math.PI / parentArea *0.5    Math.pow(Ri[d.id], 2) /  Math.PI
  .clip(polyCopy); 
		  		  
  var cells = weightedVoronoi(localnodes);
  
  return cells;
}  