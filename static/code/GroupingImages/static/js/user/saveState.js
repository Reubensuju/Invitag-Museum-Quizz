
var SaveState=function(){
							   
//var currentInstance = this;					   
					   
var this_parentChildrenMapClone=new Map();
var this_parentPolygonsMapClone= new Map();
var this_parentSitePositionPolygonsMapClone=new Map();
var this_parentCellsChildrenLayersMapClone=new Map();	  
var this_parentCellsColorsClone;	  
var this_nodeColorMappingClone=new Map();	  
var this_childNodesClone;	  
var this_initialNodesSizeClone=0; 
var this_totalInitialNodesSizeClone=0;
var this_tempNodesPositionClone;
var this_parentNodesClone;

var this_parentCellsClone;
	  
	  
	  
       this.saveDataStructures =function(parentChildrenMap, parentPolygonsMap,parentSitePositionPolygonsMap, parentCellsChildrenLayersMap, parentCellsColors, nodeColorMapping, childNodes, initialNodesSize, totalInitialNodesSize,  tempNodesPosition, parentNodes, parentCells){
							   
			    this_parentChildrenMapClone=  new Map(parentChildrenMap);//JSON.parse(JSON.stringify(parentChildrenMap)); //new Map();
			    this_parentPolygonsMapClone= new Map(parentPolygonsMap);//JSON.parse(JSON.stringify(parentPolygonsMap)); //new Map();
			    this_parentSitePositionPolygonsMapClone=new Map(parentSitePositionPolygonsMap);//JSON.parse(JSON.stringify(parentSitePositionPolygonsMap)); //new Map();
			    this_parentCellsChildrenLayersMapClone=new Map(parentCellsChildrenLayersMap);//JSON.parse(JSON.stringify(parentCellsChildrenLayersMap)); //new Map();	  			   			  
			    this_nodeColorMappingClone=new Map(nodeColorMapping);//JSON.parse(JSON.stringify(nodeColorMapping)); //new Map();	  

                this_parentCellsColorsClone=  [...parentCellsColors];//JSON.parse(JSON.stringify(parentCellsColors)); //[];	  			    
				this_childNodesClone= [...childNodes];//JSON.parse(JSON.stringify(childNodes)); //[];	  
			    this_initialNodesSizeClone=initialNodesSize; 
			    this_totalInitialNodesSizeClone=totalInitialNodesSize;
			    this_tempNodesPositionClone= [...tempNodesPosition];//JSON.parse(JSON.stringify(tempNodesPosition)); //[];
			    this_parentNodesClone=[...parentNodes];//JSON.parse(JSON.stringify(parentNodes)); //[];	
                this_parentCellsClone= [...parentCells];// JSON.parse(JSON.stringify(parentCells)) ;		
		  
	  };
	  
	  this.getState_parentChildrenMapClone = function(){
		  
		  return this_parentChildrenMapClone;
		  
	  };
	  
	  this.getState_parentPolygonsMapClone= function(){
		  return this_parentPolygonsMapClone;
	  };
	  
	  
	  this.getState_parentSitePositionPolygonsMapClone= function(){
		  return this_parentSitePositionPolygonsMapClone;
	  };
	  
	  this.getState_parentCellsChildrenLayersMapClone= function(){
		  return this_parentCellsChildrenLayersMapClone;
	  };
	  
	  this.getState_parentCellsColorsClone= function(){
		  return this_parentCellsColorsClone;
	  };
	  
	  this.getState_nodeColorMappingClone= function(){
		  return this_nodeColorMappingClone;
	  };
	  
	  
	  this.getState_childNodesClone= function(){
		  return this_childNodesClone;
	  };
	  
	  this.getState_initialNodesSizeClone= function(){
		  return this_initialNodesSizeClone;
	  };
	  
	  this.getState_totalInitialNodesSizeClone= function(){
		  return this_totalInitialNodesSizeClone;
	  };
	  
	  this.getState_tempNodesPositionClone= function(){
		  return this_tempNodesPositionClone;
	  };
	  
	  this.getState_parentNodesClone= function(){
		  return this_parentNodesClone;
	  };
	  
	  this.getState_parentCellsClone = function(){
		  return this_parentCellsClone;
	  };
	  
}



