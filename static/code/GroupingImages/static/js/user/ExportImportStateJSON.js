
var stateJSON=function(){
							   
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
	  
var combinedJSON={};	  
	  
       this.saveDataStructuresJSON =function(parentChildrenMap, parentPolygonsMap,parentSitePositionPolygonsMap, parentCellsChildrenLayersMap, parentCellsColors, nodeColorMapping, childNodes, initialNodesSize, totalInitialNodesSize,  tempNodesPosition, parentNodes, parentCells){
							   
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
		  
		        
				var obj1= JSON.stringify(Array.from(this_parentChildrenMapClone.entries()));
				//combinedJSON.push(JSON.parse(obj1));
                combinedJSON[0]=obj1;
								
				var obj2= JSON.stringify(Array.from(this_parentPolygonsMapClone.entries()));
				//combinedJSON.push(JSON.parse(obj2));				
				combinedJSON[1]=obj2;
				
				var obj3= JSON.stringify(Array.from(this_parentSitePositionPolygonsMapClone.entries()));
				//combinedJSON.push(JSON.parse(obj3));
				combinedJSON[2]=obj3;
				
				var obj4= JSON.stringify(Array.from(this_parentCellsChildrenLayersMapClone.entries()));
				//combinedJSON.push(JSON.parse(obj4));
				combinedJSON[3]=obj4;
				
				var obj5= JSON.stringify(Array.from(this_nodeColorMappingClone.entries()));
				//combinedJSON.push(JSON.parse(obj5));
				combinedJSON[4]=obj5;
				
				//var obj6= JSON.stringify(Array.from(this_parentCellsColorsClone));
				var obj6= JSON.stringify(this_parentCellsColorsClone);	
                //var obj6= JSON.stringify(Object.assign({},	parentCellsColors));			
				//combinedJSON.push(JSON.parse(obj6));
				combinedJSON[5]=obj6;
				
				//var obj7= JSON.stringify(Array.from(this_childNodesClone));
				var obj7= JSON.stringify(this_childNodesClone);
				//var obj7= JSON.stringify(Object.assign({}, childNodes));
				//combinedJSON.push(JSON.parse(obj7));
				combinedJSON[6]=obj7;
				
				//var obj8= JSON.stringify(Array.from(this_initialNodesSizeClone));
				var obj8= JSON.stringify(this_initialNodesSizeClone);				
				//combinedJSON.push(JSON.parse(obj8));				
				combinedJSON[7]=obj8;	
				
				//var obj9= JSON.stringify(Array.from(this_totalInitialNodesSizeClone));
				var obj9= JSON.stringify(this_totalInitialNodesSizeClone);
				//combinedJSON.push(JSON.parse(obj9));	
				combinedJSON[8]=obj9;
				
				//var obj10= JSON.stringify(Array.from(this_tempNodesPositionClone));
				var obj10= JSON.stringify(this_tempNodesPositionClone);
				//var obj10= JSON.stringify(Object.assign({},tempNodesPosition));
				
				//combinedJSON.push(JSON.parse(obj10));
				combinedJSON[9]=obj10;
				
				
				//var obj11= JSON.stringify(Array.from(this_parentNodesClone));
				var obj11= JSON.stringify(this_parentNodesClone);
				//var obj11= JSON.stringify(Object.assign({},parentNodes));
				//combinedJSON.push(JSON.parse(obj11));
				combinedJSON[10]=obj11;				
				
				//var obj12= JSON.stringify(Array.from(this_parentCellsClone));
				//var obj12= JSON.stringify(this_parentCellsClone);
				//var obj12= JSON.stringify(parentCells);
				//var obj12= JSON.stringify(Object.assign({}, parentCells)); 
				//var obj12=JSON.stringify(Object.entries(parentCells));
				
				//combinedJSON.push(JSON.parse(obj12));				
				//combinedJSON[11]=obj12;	
				//console.log("obj12");
				//console.log(obj12);				
		        return combinedJSON;
	  };
	  

	  
}



