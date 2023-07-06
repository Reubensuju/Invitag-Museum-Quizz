function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

var browserWidth=getWidth();
var browserHeight=getHeight();
console.log('Width:  ' + browserWidth  );
console.log('Height: ' + browserHeight );



//get scatterplot div to determine div height and width  
var chartDiv = document.getElementById("vis-container-scatterplot"); //,chartDivStyle = window.getComputedStyle(chartDiv);
var headerDiv = document.getElementById("c0");
var widthChart = chartDiv.offsetWidth-40; //browserWidth* 0.75;//1260; //1510 chartDivStyle.width  offsetWidth;
var heightChart = browserHeight-2*headerDiv.offsetHeight; // browserHeight;//860;//1510 screen.height;
console.log("widthChart="+widthChart+" heightChart="+heightChart);


var voronoiWidth=widthChart;
var voronoiHeight=heightChart;
var polyCopyGlobal=[[0,0], [0,voronoiHeight], [voronoiWidth, voronoiHeight], [voronoiWidth,0]];
var prototypesChildrenNodes=[];
var freeRepresentiveParentNodes=[];

var imgFileReaderBase64Txt;
var childNodes=[];
var tempNodesPosition=[]; 

//API for voronoi treemap (see API for Voronoi treemap code)
var SaveTreemapGlobal;//done
var AddToTreemap;//done
var AddToTreemapOneObject; //done
var getObjectsArray; //done
var getObjectById; //done
var getGroupsArray; //done
//----------------ongoing

var UpdateObject;

var getParentById;

var RemoveObject; 
var mergeTwoTreemap;
var setOption;
var getOption;
var options=[]; // array of objects.
// an object contains following info: 
// Image ON/OFF (if ON but no image, display nothing)
// Text ON/OFF (if ON but no text, display nothing) 
// ObjectID (as text) ON/OFF (default is ON if Image is OFF and Text is OFF)
// For each groupID, which ObjectID is the representative to  be shown when moving th group
// ColorMap: array of colors to be used for parent cells of the groups 0,1,2,3…
// Display the Voronoi cell edges (OFF/ON with user-defined color)
// Display colored/thickness of outline of images (table of color for each objectID)
// Display colored/thickness of outline/background text (table of color for each objectID)
//
var onHoverCell;
//OUTPUT display in a “Text area”, on hover: (objectID) of the hovered cell
var onClickCell;
//OUTPUT display in a “Text area”, on click: (objectID) of the selected cells 
//(-> allow for delete or rename the selected items)
var onDoubleClickCell;
//OUTPUT display in a “Text area”, on double-click: (objectID) of the selected cells 
//(-> allow for create a prototype for instance)
var SavePolygons;
var CreateGroupFrmObjects;

//----------------
//contol on/off on all interactions
var disableGroupCreation; //done

var disableChildrenScalability;

//----------
//update scale children rectanagle 
var updateScaleRectanagles; //done

//update scale children rectanagle
var updateScaleImages; //done

// save image from interface
var saveImage; //done

// clone voronoi treemap
var saveStateClientInterface; //done
var recoverStateClientInterface; //done

var saveStateJSONClientInterface; //done
var recoverStateJSONClientInterface; //done
var getchildNodesFromJSON;

var getUserData;
var updateGroupID;

var getParentChildrenMap;
var getParentIdFrmChildIndxGlobal;
var getCollapsedParentNodes;
var reDrawAllGlobal;
var reDrawAllChildrenGlobal;
var showLevelsGlobal;

var printLogInteractionsArray;
var updateParentNodesWeightGlobal;
var computeManyLevelingsFrmParentsChildrenNodesGlobal;
var sortByProbabilityOwnClassGlobal;

try{
    setVisBudget(32);
	createChart(widthChart,heightChart);
	resetCat(childNodes.length,1,childNodes.length);
	setVisBudget(childNodes.length);
	drawScalabilityBarChart();
}catch(e){
	 
}

function createChart(width, height){

	
	//show the plot after press "Reset-Positions" button
 //function run()
 {
		
	  var groupChildrenSize=32;	
	  //initial varaiables for control on/off interactions
	  var isCreateGroup=true;
	  var isChildrenScalability=false;//false;
	  
	  var grandParentPolygone=[ [0,0], [0,voronoiHeight], [voronoiWidth, voronoiHeight], [voronoiWidth,0] ] ;	  
	  var grandParentArea= d3.polygonArea(grandParentPolygone);

	  const visibleAllChildren = new Set();
	  
	  //constant values for initial width, height, thickhness of image, zoom scales (view & images) 
	  //
	  var rectParentWidthInitial=4;
	  var rectParentHeightInitial=4; 
	  
	  
	  var rectChildWidthInitial=72;
	  var rectChildHeightInitial=50; 
	  
 
 
	  var rectChildCenterOffsetY= rectChildHeightInitial *0.5;
	  
	  var scaleRectChild=0.1;
	  var scaleImgChild=0.1;

 
	   
	  
	  var strockParentWidth=2;
	  var colorParent="blue";
	  
	  var imageWidthInitial= 70;//100;//
	  var imageHeightInitial= 50;//64.5; //
	  
  
	  
	  
	  var stroke_width_repres=5;
	  var zoomedscale=1;
	  var imagesscale=1;
	  
	  
	  var imagesObacity=1;
	  var childrenVoronoiEdgesObacity=0;//1;
	  var parentVoronoiEdgesObacity=1;
	  
	  
	  var strockWidth=0.1;
	  var color="black";
	  
	  
	  // constants values for data
	  //const childrenNodesNumber=100;




	  
	  var parentChildrenMap=new Map();
      var parentPolygonsMap=new Map();
	  var parentSitePositionPolygonsMap=new Map();
	  var parentCellsChildrenLayersMap=new Map();
	  
	  //var colorCategory20=d3.scaleLinear()
        //.domain([0, 20])
        //.range(['#d73027', '#1a9850'])
        //.interpolate(d3.interpolateHcl);
		
	  //var colorCategory20=d3.scaleOrdinal(d3.schemeCategory20);
	  /*var parentCellsColors=[];
	  parentCellsColors[0]="#d3d3d3";//"lightgray" ;
	  console.log("colors");
	  for(var c=1; c<=19; c++){
		  parentCellsColors[c]=colorCategory20(c);
	  }*/
	  
	 var parentCellsColors=["#d3d3d3","#6c1d45" ,'#f2f2f2'  , "#c4a5b5",   "#7b3458", "#d3bbc7", "#894a6a", "#e2d2da", "#98617d",   "#f0e8ec", "#a7778f" ,"#d3d3d3","#6c1d45" ,'#ffffff'  , "#c4a5b5",   "#7b3458", "#d3bbc7", "#894a6a", "#e2d2da", "#98617d",   "#f0e8ec", "#a7778f" ];

          	  
	  var nodeColorMapping=new Map();

	  // create childrenNodesNumber  child nodes array with random x y position per each node   
	 // var childNodes = createRandomChildNodes(childrenNodesNumber);
	  
	 // var fetauredata;
     childNodes = createDataChildFromCSVFile(); //createEmptyDataChild();

	 var childrenNodesNumber=childNodes.length;
	 
     
	 
	  //console.log(fetauredata);
	  
	 // const newArray=JSON.parse(JSON.stringify(fetauredata));
	  
	 // const newArray= fetauredata.map(element => element.id);
	  
	  //console.log("loop");
	  //console.log(newArray);
	  /*newArray.forEach(function (arrayItem) {
			var x = arrayItem.id;
			console.log(x);
	  });*/
	  
	  /*for(var v=0; v<childNodes.length; ++v){
	    
		console.log(newArray[v]); //
		childNodes[v].id=newArray[v];
	  
	  }*/
	  
	  console.log("childNodes");
	  console.log(childNodes);
	  
	  //var childrenNodesNumber= childNodes.length;
	  

	  var initialNodesSize = childNodes.length;
	  //var totalInitialNodesSize = childNodes.length;
	  var totalInitialNodesSize = counterVisSum();


	  // add array with temproray position of each node    
	  tempNodesPosition=[]; 
	  for(var i=0;i<childNodes.length;i++){
		  tempNodesPosition.push({tempX:0,tempY:0});
	  }
	  
	  
	  // create parent nodes array with x y position per each node 
//	  var parentNodes= createParentNodes();	  
//	  buildHierarchy();
	  
	  
//create one parent node	  
 	  var parentNodes= createOneParentNode();
	  buildHierarchyOneParent();
	  
	
	 
	  updateLabelsTextFields();
	  
		//define top, right, bottom, and left margin values
	  var margin = {top: 0, right: 0, bottom: 0, left: 0};
									
	   //the main svg where the chart will be drawn
	  var mainSvg = d3.select('#vis-container-scatterplot')
	   .append('svg')
	   .attr("id","mainSvg")
	   .attr('width', (width + margin.right))//+ + margin.right + margin.left
	   .attr('height', (height + margin.bottom));// + margin.top + margin.bottom	
		
    
	  //define main layer (an empty group)
	  var parentLayer= mainSvg.append('g')
	   .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');   
	   
	   //define main layer (an empty group)
	  var mainChildrenLayer= mainSvg.append('g')
	   .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); 
	
	  var linesMouseDragGroup=mainSvg.append("g"); 
	
	  
/*	  var simulation = d3.voronoiMapSimulation(parentNodes)
	   .clip([[0,0], [0,voronoiHeight], [voronoiWidth, voronoiHeight], [voronoiWidth,0]])
	   .stop();
	   
	   
	   var state = simulation.state(); 
	   
	   while (!state.ended) {                                    // manually launch each iteration until the simulation ends
        simulation.tick();
        state = simulation.state();
       }

       var parentCells =[];
	   parentCells = state.polygons; 
*/
       var parentCells =computeWeightedWithFixed(parentNodes,[] ,polyCopyGlobal);
	   
       //store parent cell in parentPolygonsMap
	   //store site x,y, and weight of parent cell  in parentSitePositionPolygonsMap
	   storeParentPolygonsInMap();
	   
     /*addNewChild(0,0);
	 addNewChild(1,0);
	 addNewChild(2,0);
	 addNewChild(3,1);*/
	 
	 
	
	 
	   //create parent cells
	   parentLayer.selectAll('.polygonsParent')
		  .data(parentCells)
		  .enter().append("path")
		  .attr('d', renderCell)
	      .attr("class", "polygonsParent")
		  .attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.data.originalData.n; } )//i  
		  .style ('fill', "none") // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
		  .style('stroke', "gray")
		  .style('stroke-width', 3)
		  .style('stroke-opacity',parentVoronoiEdgesObacity);
		  
		  
	   //create parent rectangles	  
	   parentLayer.selectAll('.rectsParent')
		.data(parentCells)
		.enter().append("rect")
		  .attr("x", function (d) { return ( parentSitePositionPolygonsMap.get(d.site.originalObject.data.originalData.n)[0] ); }) // x position of rect node
		  .attr("y", function (d) { return ( parentSitePositionPolygonsMap.get(d.site.originalObject.data.originalData.n)[1] ); }) // y position of rect node 
		  .attr("width", function(d,i){ return   rectParentWidthInitial ; })// initial width of rect  
		  .attr("height", function(d,i){ return  rectParentHeightInitial   ; } )// initial height of rect  
		  .attr("class", "rectsParent")
		  .attr("id", function(d,i){ return 'parentRectname' +d.site.originalObject.data.originalData.n; })// id of rect
		  .attr("iIndex", function(d,i){ return d.site.originalObject.data.originalData.n; })// index of rect
		  .style("stroke-width", strockParentWidth) // initial thickhness of border is 1
		  .style("stroke",  colorParent) // color points
		  .style("fill", colorParent)//  // color points
		  .append("svg:title") 
		  .text(function(d,i) { return 'parent node: ' + d.site.originalObject.data.originalData.n;});
		
		
			  

	   
	  // updateLayout(parentLayer, true); 
      // var rectsParent=parentLayer.selectAll("rect");	
	   
	   //for each parent node store previousX, previousY, and previousWeight
	   updateParentNodes();
	   
		
//	   createParentCellsChildrenLayers();
       //////
	   
	   //move children to be inside their parent boundary
	   //this function is used only at the begining to generate random position as it is  initial position
       moveChildrenPositionInsideParentCells();
	  
	  //create children cells 
	  var totalArrCell2=[];
	  totalArrCell2.length=0;
	  var keysOfCurrentMap=Array.from(parentPolygonsMap.keys());
	  
	  if(childNodes.length>0)
	  for(var index=0; index<=keysOfCurrentMap.length-1;++index){		    				  
	     //delaunay=computeCenterOfMass();	  
		  console.log(keysOfCurrentMap[index]);
		  delaunay=computeCenterOfMassParentChildren(keysOfCurrentMap[index]);
//		  delaunay=computeDelaunyParentChildren(keysOfCurrentMap[index]);
		  diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 
			
//          drawAllChildrenDealunyNearestNeighber(diagram,keysOfCurrentMap[index]);			
		  //drawAllChildrenDealunyNearestNeighber(delaunay,keysOfCurrentMap[index]);
         
		  var arrCells1=Array.from(diagram.cellPolygons());
		
		  
		  var arrCells2=[];
		  arrCells2.length=0;
		  console.log("arrCells1");
		  console.log(arrCells1);
		  
		  var arrCell2Id=[];
		  arrCell2Id.length=0;
		  
		  
		  
		  var parentPolygon= parentPolygonsMap.get(keysOfCurrentMap[index]);
		  var parentChildren= parentChildrenMap.get(keysOfCurrentMap[index]);
		  
		  parentChildren=getGroupSizeSubChildren(parentChildren);
					
		  for(var i=0; i<=arrCells1.length-1; ++i){
	  
			
			var childPolygone= Array.from(arrCells1[i]); 
			var intersectedPolygone= findIntersectionTwoPolygons(childPolygone, parentPolygon); 
			//console.log(i);
			//console.log(childPolygone);
			//console.log(parentPolygon);
//			console.log("intersectedPolygon1");
//			console.log(intersectedPolygone);
			//if(intersectedPolygone!=null)
		    var intersectedPolygon	= intersectedPolygone["geometry"]["coordinates"];	
			  arrCells2.push(intersectedPolygon);//Array.from
			  arrCell2Id.push(childNodes[parentChildren[i]].n);
			// else 
			//  arrCells2.push(childPolygone);
//		    console.log("intersectedPolygon2");
//		    console.log(intersectedPolygon[0].length);
//			console.log(intersectedPolygon);
			if(intersectedPolygon[0].length<4){
			  continue;
			}
		    var intersected = turf.polygon([intersectedPolygon[0]]);
								  					  
		    var centerInfo = turf.centerOfMass(intersected);
 
		    //var center=[centerInfo["geometry"]["coordinates"][0], centerInfo["geometry"]["coordinates"][1]];
			console.log(i+" child= "+parentChildren[i]);
			console.log(centerInfo["geometry"]["coordinates"][0] +" "+centerInfo["geometry"]["coordinates"][1]);
			childNodes[parentChildren[i]].x=parseFloat( centerInfo["geometry"]["coordinates"][0]);
			childNodes[parentChildren[i]].y=parseFloat( centerInfo["geometry"]["coordinates"][1]);
            console.log(childNodes[parentChildren[i]]);
			
			nodeColorMapping.set( parentChildren[i], parentCellsColors[keysOfCurrentMap[index]] );
		  
			visibleAllChildren.add(childNodes[parentChildren[i]].n );		  
		  
		  }
		  
		  console.log("arrCells2");
		  console.log(arrCells2);
		  totalArrCell2.push(...arrCells2);
		  console.log("totalArrCell2");
		  console.log(totalArrCell2);
		  
		  //var group = parentCellsChildrenLayersMap.get(keysOfCurrentMap[index]);
		  //		   
		  parentLayer.selectAll('.polygonsChild')
		  .data(totalArrCell2)
		  .enter().append("path") 
		  .attr("d", renderCell)
		  .attr("class", "polygonsChild")
		  .attr("id", function(d,i){ return "childVorCell"+arrCell2Id[arrCells2.indexOf(d)]  ; } )//+"-"+ keysOfCurrentMap[index] 
		  .attr("parentId", function(d,i){ return keysOfCurrentMap[index]} )
		  .attr('stroke', "black")
		  .attr('stroke-width', 0.2)
		  .style('stroke-opacity',childrenVoronoiEdgesObacity)
		  .attr('fill', parentCellsColors[keysOfCurrentMap[index]]) // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
		   .style('fill-opacity', 0.8);
		  //.style("fill", "none")
		   //.attr("polygonePoints", function(d,i){ return  arrCells2[i]; } )
		   //.attr("polygonePoints1", function(d,i){ return  diagram.cellPolygons(i);} )
		 		  		   

           						   
	  }
	  

	  //drawAllVisibleChildrenDealunyNearestNeighber(nodesToDraw);
	  
	  
	  //create children rectangles	   		   
	   /////////updateLayout(group, false);
	  parentLayer.selectAll(".rectsChild")
	  //.data(childNodes)
	  .data(childNodes.filter(function(d){return visibleAllChildren.has(d.n);}))
	  .enter().append("rect")
	  .attr("x", function (d) { return d.x -rectChildWidthInitial  *0.5 ; }) // x position of rect node
	  .attr("y", function (d) { return d.y -rectChildHeightInitial  *0.5 ; }) // y position of rect node 
	  .attr("width", function(d,i){ return   rectChildWidthInitial ; })// initial width of rect   
	  .attr("height", function(d,i){ return  rectChildHeightInitial ; } )// initial height of rect  
	  .attr("class", "rectsChild")
	  .attr("id", function(d,i){ return 'childRectname' +d.n; })// id of rect
	  .attr("iIndex", function(d,i){ return d.n; })// index of rect
	  .attr("isRepre",false)
	  .style("stroke-width", 0.1) // initial thickhness of border is 1
	  .style("stroke",  "black") // color points
	  .style("fill", "white")//"none" "black"  // color points
	  .append("svg:title") 
	  .text(function(d,i) { return ' child node: ' + d.n;});
  
      //create children lables
	  parentLayer.selectAll(".textChild")
	  .data(childNodes)
	  .data(childNodes.filter(function(d){return visibleAllChildren.has(d.n);}))
	  .enter().append("text")
	  .attr("x", function (d) { return (d.x -rectChildWidthInitial  *0.5); }) // x position of rect node
	  .attr("y", function (d) { return (d.y -rectChildHeightInitial  *0.5); }) 
	  .attr("class", "textChild")
	  .attr("id", function(d,i){ return 'childTextname' +d.n; })// id of rect
	  .attr("iIndex", function(d,i){ return d.n; })// index of rect
	  .text(function(d,i) { return d.txt;});
//	  .call(wrap);
	  
	  
	  function doInitialScale(){
	    scaleImgChild=scaleImgChild+0.5;
	
        autoScallingImgChild();	

        scaleRectChild=scaleImgChild;
		autoScallingRectChild();
		//updateScaleRectanaglesLocal(scaleRectChild);
									
		parentLayer.selectAll('.imagesChild') 
		  .attr("x", function(d) { return d.x - imageWidthInitial  *0.5 ;}) //- (imageWidthInitial/2)
		  .attr("y", function(d) { return d.y - imageHeightInitial *0.5 ;}) //- (imageHeightInitial/2)			  
		  .attr("height", imageWidthInitial)
		  .attr("width", imageHeightInitial);
		  
		parentLayer.selectAll('.rectsChild')
		  .attr("x", function (d) { return d.x -rectChildWidthInitial  *0.5 ; }) // x position of rect node
		  .attr("y", function (d) { return d.y -rectChildHeightInitial  *0.5 ; }) // y position of rect node 
		  .attr("width", function(d,i){ return   rectChildWidthInitial ; })// initial width of rect   
		 .attr("height", function(d,i){ return  rectChildHeightInitial ; } )	  
	  
	  }
	  
	  
	  doInitialScale();
	  
	  
	  var clickCounter=0;
	  function clicked(d) {//event,, i
	           if (d3.event.defaultPrevented) return;  //d3.select(this).attr('fill', 'blue');
						  
      }	  
	  
	  
	  
	 function dbclicked(d){
		  if (d3.event.defaultPrevented) return;
		  

		  		  
	 }
	  
	  
	 	  
	  
	  var startTimeMouseDown=0;
	  function mouseDownHandle(d, i) {//event,
          
		  
	  }
	  
	  function mouseUpHandle(d, i) {//event,
         
		  
	  }
	  
	  	  function mouseOverHandle(d, i) {
			     
			}
			
	 function mouseOutHandle(d) {

	 }
	 
	 
	 /*function mouseOutHandleStartDrag(selectedNodeIndex) {
	     d3.select('#childImagename'+selectedNodeIndex)
		 .transition()
                  .attr("x", function(d) { return d.x - (imageWidthInitial/2) ;}) //- (imageWidthInitial/2)
                  .attr("y", function(d) { return d.y - (imageHeightInitial/2) ;}) //- (imageHeightInitial/2)			  
				  .attr("height", imageHeightInitial )
                  .attr("width", imageWidthInitial);
	 }*/
	 
	  
      function mouseWheelHandler(d,i){
		        d3.event.preventDefault(); 
                d3.event.stopPropagation();
	 
		        var direction = d3.event.wheelDelta < 0 ? 'down' : 'up';
			    if(direction === 'up'){
                  scaleImgChild=scaleImgChild+0.1;
				  //updateScaleImagessLocal(scaleImgChild);
                  autoScallingImgChild();				  
				}else if(direction ==='down' ){
				  scaleImgChild=scaleImgChild-0.1;
				  if(scaleImgChild<0.1)scaleImgChild=0.1;
				  //updateScaleImagessLocal(scaleImgChild);
				  autoScallingImgChild();
				}
								
				scaleRectChild=scaleImgChild;
				autoScallingRectChild();
				//updateScaleRectanaglesLocal(scaleRectChild);
											
				parentLayer.selectAll('.imagesChild') 
                  .attr("x", function(d) { return d.x - imageWidthInitial  *0.5 ;}) //- (imageWidthInitial/2)
                  .attr("y", function(d) { return d.y - imageHeightInitial *0.5 ;}) //- (imageHeightInitial/2)			  
				  .attr("height", imageWidthInitial)
                  .attr("width", imageHeightInitial);
				  
				parentLayer.selectAll('.rectsChild')
				  .attr("x", function (d) { return d.x -rectChildWidthInitial  *0.5 ; }) // x position of rect node
	              .attr("y", function (d) { return d.y -rectChildHeightInitial  *0.5 ; }) // y position of rect node 
	              .attr("width", function(d,i){ return   rectChildWidthInitial ; })// initial width of rect   
	             .attr("height", function(d,i){ return  rectChildHeightInitial ; } )
	  }


 
	  //create children images
	   //appendImages(group);	   
	   parentLayer.selectAll(".imagesChild")
	      //.data(childNodes)
		  .data(childNodes.filter(function(d){return visibleAllChildren.has(d.n);}))
	      .enter().append("image")
//		  .attr("xlink:href", function (d,i) { return "static/images/BCLCimagesHighchart/" +d.id+".png" ; })//".webp" FoodData TextData Demographic BCLCimagesHighchartTest MNIST30Test  AirQuality  image path   
          .attr("xlink:href", function(d) { return    d.img; } )	  
		  .attr("x", function (d) { return d.x - imageWidthInitial  *0.5  ; } ) //+(imageWidthInitial/2) x position of image (center) +(imageWidthInitial/2)
		  .attr("y", function (d) { return d.y - imageHeightInitial *0.5  ; } ) //+ y position of image (center) +(imageHeightInitial/2)
		  .attr("iid", function (d,i) { return d.n; } )// id of image 
		  .attr("id", function(d,i){ return 'childImagename' + d.n; }) // In d3, id should start with letters  
		  .attr("iIndex",function (d,i) { return d.n; } ) // index of value in data (to fast look up in data)
		  .attr("width", imageWidthInitial) // initial width of image
		  .attr("height", imageHeightInitial) // initial height of image
		  .attr("class", "imagesChild")
		  //.on("click",clicked)
		  //.on('mouseover',mouseOverHandle )
		  //.on('mouseup',mouseUpHandle)
		  //.on('contextmenu',mouseOverHandle )		  
		  .on('mouseout',mouseOutHandle)
		  .on('wheel',mouseWheelHandler )
		  .style('opacity',imagesObacity)
		  .append("svg:title") 
		  .text(function(d,i) { return 'id: ' + d.n;});	   
			  
			  
			
			
	      
     
	
		  //define drag events for children rects and images  
//		   group.selectAll("rect").on("mouseout" ,function(){ console.log("rect"); d3.event.preventDefault(); d3.event.stopPropagation(); }); //
		  //group.selectAll("rect").on("mouseout" , function() { } );
		  parentLayer.selectAll(".rectsChild").call(d3.drag().on("start",startDragChild).on("drag", draggedChild).on("end",endDragChild));//.on("click", clicked); //  clickDistance(10). .on('click', clicked)
		  
		  parentLayer.selectAll(".imagesChild").call(d3.drag().on("start",startDragChild).on("drag", draggedChild).on("end",endDragChild));//.on("click", clicked);
		  //define drag (stitching) events for children cells  
//		  parentLayer.selectAll('.polygonsChild').call(d3.drag().on("start",startDragCell).on("drag", draggedCell).on("end",endDragCell)) ; 


          //parentLayer.selectAll(".imagesChild")
		  //.on('mousedown',mouseDownHandle)
		  //.on('mouseup',mouseUpHandle);
////////

	   /////////
		 
	   parentLayer.selectAll(".polygonsChild").lower();	
	   //mainChildrenLayer.selectAll('.polygons').selectAll("rect").raise();   
	   parentLayer.selectAll(".imagesChild").raise();
	   parentLayer.selectAll("rect").raise(); 
		   
		

/////////////////////////////

 //     addNewChild(0,0);
//      updateChildrenCells(0,0);
	//  addNewChild(1,0);
	  //updateChildrenCells(1,0);
	  
      


/////////////////////////////	
var logInteractionsArray=[];
function printLogInteractionsArrayLocal(){
	console.log("logInteractionsArray");
	console.log(logInteractionsArray);
	logInteractionsArray=[];
	logInteractionsArray.length=0;
	
}
printLogInteractionsArray=printLogInteractionsArrayLocal;


if(childNodes.length> 1){
      reDrawAll();	
	  showRepresentativeRects(); 
}	  
	 
	 
/////////////////////////////////
/// change belw this part for eurovis demo 
///
//////////////////////
	  var mousePosition=[];
	  var mouseCoordinates=[]; // to track parent cells when mouse move
	   mouseCoordinates.length=0;
	   
	   var mouseLineCrossImgsIds=[];
	   mouseLineCrossImgsIds.length=0;	  
	   
	   var dblclickCell=0;
	  //function will be triggered when start drag cell
      //it will capture mouse position and start parent cell  
	  function startDragCell(){	
          
		
	  }
	 
	 
	 var wasMoveCell=false;
	 //function will be triggered while  drag cell
     //it will capture mouse position and current parent cell 	
	 //and track and draw mouse segment
	 function draggedCell(){
		    
			   
			
	  }
	  
	  
	  function endDragCell(){
               
	 
	  }
	  
	
function runLineSelectionTranistion(counter,lastId2, collapseNodeParent , parentTargetTeleport,startChildPosX, startChildPosY){
	

      
   
}

	  
	 //function will be triggered at end of drag cell
     //it will capture mouse position
     //call handleStitching	 
	 //having three seconds color delay of children of previus parent
	 //and clear mouse line
	  function endDragCell1(){
							
	  }
	  
	  
	 //update  nodeColorMapping
	 function updateChildNodeColorMappingBeforeMergeParentTwoNodes(parent1Id){
		console.log("updateChildNodeColorMappingBeforeMergeParentTwoNodes");		  
        console.log("parent1Id");	
        console.log(parent1Id);	
		//console.log(Array.from(parentChildrenMap.keys()));		
	    var parentChildren= parentChildrenMap.get(parent1Id);
	    parentChildren=getGroupSizeSubChildren(parentChildren);
		var parent2Children=Array.from(parentChildren);
	    //console.log(parent2Children);

		//setTimeout(function() { 		
		 for(var i=0; i<=parent2Children.length-1;++i){
			 nodeColorMapping.set( parent2Children[i], parentCellsColors[parent1Id] );
		 }
				 			 
	  }
	  
	  
	 //having three seconds color delay of children of previus parent 
	 function updateChildColorsAfterMergeParentTwoNodes(parent1Id){ 
	 	   
		 setTimeout(function() {   
		   
/*		   for(var i=0; i<=childNodes.length-1;++i){
			    d3.select("#gChild-"+childNodes[i].n).select("path")				
			  .attr('fill', nodeColorMapping.get(childNodes[i].n) )
			  .style('fill-opacity',  0.8);			  			  
		   }
*/		   

          for(var i=0; i<=childNodes.length-1;++i){	 
	         var polygonsChildGroup = parentLayer.selectAll('.polygonsChild')
			  .filter(function(d) { return   parseInt(this.getAttribute("id").substring(12).split("-").shift())== parseInt(childNodes[i].n)  ;}); 
			                              
				
			  polygonsChildGroup.style('fill', nodeColorMapping.get(childNodes[i].n) )
			  .style('fill-opacity',  0.8);			  			  
		   }
		   
		   
		   /*var keysOfCurrentMap=Array.from(parentChildrenMap.keys()); //Array.from(parentPolygonsMap.keys());		   
		   for(var index=0; index<=keysOfCurrentMap.length-1; ++index){		    				  			  								  
			  var polygonsChildGroup = parentLayer.selectAll('.polygonsChild')
			  .filter(function(d) { return   parseInt(this.getAttribute("id").split("-").pop())==parseInt(keysOfCurrentMap[index]);});// 							 							 
		      
			  polygonsChildGroup.attr('fill', function(d,i){ return parentCellsColors[keysOfCurrentMap[index]];} );
			  polygonsChildGroup.style('fill', function(d,i){ return parentCellsColors[keysOfCurrentMap[index]];} );
		   }*/
		   
		   //parseInt(this.getAttribute("id").substring(12).split("-").shift())==parseInt(selectedNodeIndex)
		   
		 }, 2000); 		   
	   		  
	  }
	  
	  
	
	var mouselinks =[];   
    //draw mouse line
	function addLinesMouseDrag(edgeLine){       
      
    }
	
	
	
	//clear mouse drawn line
    function clearLinesMouseDrag(){

	}
	
	
	
	//combine children when Stitching two parent cells
	function handleStitching(isMaxWeight){
		  		   			   

	 }		
	   
	   
	 
	 function handleRemoveParentCell(d){
		    
			console.log("handleRemoveParentCell");
		 
		 	parentCells=computeWeightedInitialLoc0(parentNodes,parentChildrenMap,totalInitialNodesSize, [] ,polyCopyGlobal);
						
			parentCells =computeWeightedBasedOnPrevoiusLocW00(parentNodes, [] ,polyCopyGlobal);	
		 
		 
		    //recompute weighted voronoi of  parents with updated weight
			/*simulation = d3.voronoiMapSimulation(parentNodes)
			   .clip([[0,0], [0,voronoiHeight], [voronoiWidth, voronoiHeight], [voronoiWidth,0]])
			   .initialPosition((d)=>[d.previousX, d.previousY])
			   .initialWeight((d)=>d.previousWeight);
		   
			simulation.stop();
		   		   
			state = simulation.state(); 

				
			while (!state.ended) {                               
			  simulation.tick();
			  state = simulation.state();
			}

			parentCells.length=0;
			parentCells=state.polygons; */
			
			parentSitePositionPolygonsMap.clear();
			parentPolygonsMap.clear();
			
			//store parent cell in parentPolygonsMap
	        //store site x,y, and weight of parent cell  in parentSitePositionPolygonsMap
			storeParentPolygonsInMap();
			updateParentNodes();
						
						
			/* parentLayer.selectAll('.polygonsChild')
			.filter(function(d) {  return  parseInt(this.getAttribute("id").split("-").pop())==parentIndexCurrentDragChild && parseInt(this.getAttribute("id").substring(12).split("-").shift())==parseInt(selectedNodeIndex);})
			.remove();*/					
		   
		    //remove parent cells
			parentLayer.selectAll('.polygonsParent')
			.remove();
			//parent parent rectangles
			parentLayer.selectAll('.rectsParent')
			.remove();
			
			//draw updated parent cells
			parentLayer.selectAll('.polygonsParent')
			.data(parentCells)					
			.enter().append("path")
			.attr('d', renderCell)
			.attr("class", "polygonsParent")
			.attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.data.originalData.n; } )//i  
			.style ('fill', "none") // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
			.style('stroke', "gray")
			.style('stroke-width', 3)
			.style('stroke-opacity',parentVoronoiEdgesObacity);
				   

			parentLayer.selectAll('.polygonsParent').lower();
			
			//remove children cells
			parentLayer.selectAll('.polygonsChild')				
			.remove();
            
			//translate children position to the min square of their parent polygon 
			moveChildrenPositionInsideParentCellsStitching();
			
			//draw children cells
			visibleAllChildren.clear();
			totalArrCell2.length=0;
			var keysOfCurrentMap=Array.from(parentPolygonsMap.keys()); //Array.from(parentChildrenMap.keys());//
			for(var index=0; index<=keysOfCurrentMap.length-1;++index){		    				    
				  console.log(keysOfCurrentMap[index]);
				  delaunay=computeCenterOfMassParentChildren(keysOfCurrentMap[index]);
				  //delaunay=computeDelaunyParentChildren(keysOfCurrentMap[index]);
				  diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 
															
				  var arrCells1=Array.from(diagram.cellPolygons());
									  
				  var arrCells2=[];
				  arrCells2.length=0;
				  console.log("arrCells1");
				  console.log(arrCells1);
				  
				  var arrCell2Id=[];
				  arrCell2Id.length=0;
														  
				  var parentPolygon= parentPolygonsMap.get(keysOfCurrentMap[index]);
				  var parentChildren= parentChildrenMap.get(keysOfCurrentMap[index]);
				  parentChildren=getGroupSizeSubChildren(parentChildren);
									
				  for(var i=0; i<=arrCells1.length-1; ++i){
									
					var childPolygone= Array.from(arrCells1[i]); 
					var intersectedPolygone= findIntersectionTwoPolygons(childPolygone, parentPolygon); 
					
					console.log("intersectedPolygon1");
					console.log(intersectedPolygone);
					//if(intersectedPolygone!=null)
					var intersectedPolygon	= intersectedPolygone["geometry"]["coordinates"];	
					  arrCells2.push(intersectedPolygon);//Array.from
					  arrCell2Id.push(childNodes[parentChildren[i]].n);
					// else 
					//  arrCells2.push(childPolygone);
					console.log("intersectedPolygon2");
					console.log(intersectedPolygon[0].length);
					console.log(intersectedPolygon);
					if(intersectedPolygon[0].length<4){
					  continue;
					}
					var intersected = turf.polygon([intersectedPolygon[0]]);
															  
					var centerInfo = turf.centerOfMass(intersected);
		 
					//var center=[centerInfo["geometry"]["coordinates"][0], centerInfo["geometry"]["coordinates"][1]];
					console.log(i+" child= "+parentChildren[i]);
					console.log(centerInfo["geometry"]["coordinates"][0] +" "+centerInfo["geometry"]["coordinates"][1]);
					childNodes[parentChildren[i]].x=parseFloat( centerInfo["geometry"]["coordinates"][0]);
					childNodes[parentChildren[i]].y=parseFloat( centerInfo["geometry"]["coordinates"][1]);
					console.log(childNodes[parentChildren[i]]);
					
					nodeColorMapping.set( parentChildren[i], parentCellsColors[keysOfCurrentMap[index]] );
				    visibleAllChildren.add(childNodes[parentChildren[i]].n );
					
					childNodes[parentChildren[i]].GroupID =parentNodes[keysOfCurrentMap[index]].GroupID;
					
				  }
				  
				  
				   var allParentChildren= parentChildrenMap.get(keysOfCurrentMap[index]);
				  
				  for(var i=0; i<=allParentChildren.length-1; ++i){				  
				  	childNodes[allParentChildren[i]].GroupID =parentNodes[keysOfCurrentMap[index]].GroupID;			  
				  }
				  
				  console.log("arrCells2");
				  console.log(arrCells2);
				  totalArrCell2.push(...arrCells2);
				  console.log("totalArrCell2");
				  console.log(totalArrCell2);
						   
				  parentLayer.selectAll('.polygonsChild')
				  .data(totalArrCell2)
				  .enter().append("path") 
				  .attr("d", renderCell)
				  .attr("class", "polygonsChild")
				  .attr("id", function(d,i){ return "childVorCell"+arrCell2Id[arrCells2.indexOf(d)]  ; } )//+"-"+ keysOfCurrentMap[index] 
				  .attr("parentId", function(d,i){ return  keysOfCurrentMap[index];})
				  .attr('stroke', "black")
				  .attr('stroke-width', 0.2)
				  .style('stroke-opacity',childrenVoronoiEdgesObacity)
				  .attr('fill', parentCellsColors[keysOfCurrentMap[index]]) // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
				  .style('fill-opacity', 0.8);												 
			}
			  
		
//		   reDrawAllChildren1();
           //redraw children cells, rects, and lables 
//		   reDrawAllChildren();
			 
	 }
	 
	 
	 function deleteParentCell(selectedNodeIndex,parentIndexStartDragChild,sourceChildNumber){
		 					//////////////////////////////
					/// modify source of target  
					var parentSelectedNode=-1;
															
					if(sourceChildNumber<=1 && prototypesChildrenNodes.indexOf(selectedNodeIndex)==-1){
						 console.log("end Drag parent"+parentIndexStartDragChild);
						 console.log("remove parentNode");
						 //remove parentNode  that has no children 
						 parentNodes.splice(parentIndexStartDragChild , 1);
						 parentChildrenMap.delete(parseInt(parentIndexStartDragChild));
						 parentPolygonsMap.delete(parentIndexStartDragChild);
						 parentCellsColors.splice(parentIndexStartDragChild , 1);
						 
						 //modify indexs of parentNodes
						 for(var ind= 0; ind<=parentNodes.length-1 ; ind++){
							parentNodes[ind].n=ind;	
						 }
						 
						 //get sorted keys of parents
						 var keysOfCurrentMap=Array.from(parentChildrenMap.keys());                
						 keysOfCurrentMap.sort(function(a, b) {
						   return a - b;
						 });
						 
						 //modify keys in parentChildrenMap
						 for(var index=0; index<=keysOfCurrentMap.length-1;++index){
							 parentChildrenMap.set(index, parentChildrenMap.get(keysOfCurrentMap[index]));						 
							 parentPolygonsMap.set(index, parentPolygonsMap.get(keysOfCurrentMap[index]));
							 if( parentChildrenMap.get(keysOfCurrentMap[index]).indexOf(selectedNodeIndex)!=-1 ){
								 parentSelectedNode=keysOfCurrentMap[index];
							 }
						 }
						 
						 //keysOfCurrentMap.sort(function(a, b) {
						   //return a - b;
						 //});
						 parentChildrenMap.delete(keysOfCurrentMap.length);
						 //if( parentChildrenMap.get(nodeCurreId)==null ){
				             //nodeCurreId=nodePreId;
			              //}
											 
						parentIndexStartDragChild=-1;
						
						console.log("parentChildrenMap");
                        console.log(keysOfCurrentMap);						
                        console.log(parentChildrenMap);	
					}
						  				  

				    parentIndexEndDragChild=parentIndexPrevoiusDragChild;
//					parentIndexEndDragChild=parentIndexPrevoiusDragChild;			
					//parentIndexEndDragChild=findParentPolygon(xMouseCoordinate,yMouseCoordinate);

					if(sourceChildNumber==1){			
                        			 	
						parentIndexEndDragChild = parentSelectedNode;
					    
						handleRemoveParentCell();	

                        drawScalabilityBarChart();
							
	                    updateLabelsTextFields();
                        reDrawAllChildren();
                        showRepresentativeRects();							
					}

					/*if(parentIndexStartDragChild != parentIndexEndDragChild){															  
					    moveChildFromParentToParent(parentIndexEndDragChild, parentIndexStartDragChild);																			   
					
					    	var checkCollapsedParent= isCollapsedParentNode(parentIndexEndDragChild);					
							if(checkCollapsedParent){
								//parentNodes[parentIndexEndDragChild].weight=parentNodes[parentIndexEndDragChild].previousWeight;
								totalInitialNodesSize=counterVisSum();
								parentNodes[parentIndexEndDragChild].weight= 1/totalInitialNodesSize;
								console.log("after-drag-Weight");
								console.log(parentNodes[parentIndexEndDragChild].weight);
							}
					
					   	if(sourceChildNumber!=1)
					       reDrawAll();
					} */
						 
				    reDrawAllChildren();
	//				reDrawRectsParents();
						 
																										 
				
				
					

					
				   parentIndexStartDragChild = -1;
				   parentIndexEndDragChild = -1;
				   parentIndexPrevoiusDragChild=-1;
			
			
			
						   
			   copyOfparentNodes.length=0;
			   firstDragFlag=true;
//			   d3.select("#currentCell"+selectedNodeIndex).remove();

          
		  parentLayer.selectAll(".polygonsChild").raise();
		  parentLayer.selectAll('.rectsChild').raise() ;
		  parentLayer.selectAll('.rectsParent').raise() ;
		  parentLayer.selectAll('.textChild').raise();
		  
		  d3.selectAll("image").style("opacity", imagesObacity);
	      parentLayer.selectAll(".imagesChild").raise();
		  
			console.log("enddrag" );

			//wrapAllTextRect();	
			
			 
			
			try{	
			      
				  
				  combineData();				
				  drawScalabilityBarChart();
				  updateParentNodesWeightGlobal();
				  reDrawAll();
				  reDrawAllChildren();
				  wrapAllTextRect();
			}catch(e){

			}
		 
	 }
	 
	 
	  function buildHierarchyOneParent(){
          var arrayChildrenIds1=[];
		  arrayChildrenIds1.length=0;
		  for(var index=0; index<=childrenNodesNumber-1;++index){ //childNodes.length-1 
			  arrayChildrenIds1.push(childNodes[index].n);
		  }
		  
		  parentChildrenMap.set(parentNodes[0].n, arrayChildrenIds1);
		  //parentNodes[0]["representative"] =childNodes[0].n;
		  parentNodes[0]["representative"] =arrayChildrenIds1[0];
	  }
	   
	  function buildHierarchy(){
	  
	      var arrayChildrenIds1=[];
		  arrayChildrenIds1.length=0;
		  for(var index=0; index<=9;++index){ //childNodes.length-1 
			  arrayChildrenIds1.push(childNodes[index].n);
		  }
		  
		  parentChildrenMap.set(parentNodes[0].n, arrayChildrenIds1);
		  
		  var arrayChildrenIds2=[];
		  arrayChildrenIds2.length=0;
		  for(var index=10; index<=14  ;++index){
			  arrayChildrenIds2.push(childNodes[index].n);
		  }
		  
		  parentChildrenMap.set(parentNodes[1].n, arrayChildrenIds2);
		  
		  
		  var arrayChildrenIds3=[];
		  arrayChildrenIds3.length=0;
		  for(var index=15; index<=19  ;++index){
			  arrayChildrenIds3.push(childNodes[index].n);
		  }
		  
		  parentChildrenMap.set(parentNodes[2].n, arrayChildrenIds3);
		  
		  
		  var arrayChildrenIds4=[];
		  arrayChildrenIds4.length=0;
		  for(var index=20; index<=24  ;++index){
			  arrayChildrenIds4.push(childNodes[index].n);
		  }
		  
		  parentChildrenMap.set(parentNodes[3].n, arrayChildrenIds4);
		  
		  
		  var arrayChildrenIds5=[];
		  arrayChildrenIds5.length=0;
		  for(var index=25; index<=27  ;++index){
			  arrayChildrenIds5.push(childNodes[index].n);
		  }
		  
		  parentChildrenMap.set(parentNodes[4].n, arrayChildrenIds5);
		  
		  
		  var arrayChildrenIds6=[];
		  arrayChildrenIds6.length=0;
		  for(var index=28; index<=29  ;++index){
			  arrayChildrenIds6.push(childNodes[index].n);
		  }
		  
		  parentChildrenMap.set(parentNodes[5].n, arrayChildrenIds6);
		  
	  }
	  
	  
	  
	  function storeParentPolygonsInMap(){
	      //var keysOfCurrentMap=Array.from(parentChildrenMap.keys());
		  console.log("storeParentPolygonsInMap: parentCells");
		  //console.log(parentCells);
		  for(var index=0; index<=parentCells.length-1;++index){			  
			  console.log("parentCells site: "+parentCells[index].site.originalObject.data.originalData.n);			  
			  var cellPolygon=JSON.parse(JSON.stringify(parentCells[index].site.polygon));//Array.from(parentCells[index].site.polygon);
			  cellPolygon.push(cellPolygon[0]);
			  parentPolygonsMap.set(parentCells[index].site.originalObject.data.originalData.n, cellPolygon);
			  var sitePolyX=parentCells[index].site.x;
			  var sitePolyY=parentCells[index].site.y;
			  
			  var sitePolyWeight=parentCells[index].site.weight;
			  //var sitePolyWeight=parentNodes[parentCells[index].site.originalObject.data.originalData.n].weight;
              parentSitePositionPolygonsMap.set(parentCells[index].site.originalObject.data.originalData.n , [sitePolyX,sitePolyY,sitePolyWeight] );			  
		  }
		   		  	  
	  }
	  
	  
	  
	  
	  
	  function updateLayout(group, isParent, data){  
		   //appendRects(group, isParent, data);
		   //appendImages(group);
		   //group.selectAll('.polygons').lower();
		   //group.selectAll('.polygons').raise();
	   }
	   
	   
	   // define function to add nodes as rectangles
	  function appendRects(group, isInitial, data){

	  }
	  
	  
	   function updateParentNodes(){
		  for(var index=0; index<=parentNodes.length-1; ++index){
			  var parentNodeSite=parentSitePositionPolygonsMap.get(parentNodes[index].n);
			  //parentNodes[index].x=parentNodeSite[0];
			 // parentNodes[index].y=parentNodeSite[1];
             // parentNodes[index].weight=parentNodeSite[2];			
              console.log(parentNodes[index].n);
			  //if(parentNodeSite!=null)
			  {
			     parentNodes[index].previousX= parentNodeSite[0];
			     parentNodes[index].previousY= parentNodeSite[1];
                 parentNodes[index].previousWeight= parentNodeSite[2];			
			  }//else{
				//  parentSitePositionPolygonsMap.set(parentNodes[index].n , [sitePolyX,sitePolyY,sitePolyWeight] );	 
			  //}

            // if(index==3){				 
			//	 parentNodes[index].x= 100;
		    //     parentNodes[index].y= 100;
			// }			  
		  }
	  }
	  
	  
// funtion  to update parents nodes weights after increase/decrease scalability slider in index.html .	  
	  function updateParentNodesWeights(){
		  
		      parentCells=computeWeightedInitialLoc0(parentNodes,parentChildrenMap,totalInitialNodesSize, [] ,polyCopyGlobal);	        			
				
		  
		      totalInitialNodesSize= counterVisSum();
		  	  for(var index=0; index<parentNodes.length; ++index){
	 
	            //////////////////////////////
				var pcTarget= getGroupSizeSubChildren(parentChildrenMap.get(parentNodes[index].n));		
				var targetChildNumber=pcTarget.length;
				
				//var targetChildNumber=parentChildrenMap.get(parentIndexEndDragChild).length;							
				var checkCollapsedParent= isCollapsedParentNode(parentNodes[index].n);

				var newTargetWeight= (targetChildNumber)/totalInitialNodesSize;							
				if(checkCollapsedParent){
					newTargetWeight= 1/totalInitialNodesSize;	
					parentNodes[index].previousWeight=newTargetWeight;									
					parentNodes[index].weight=newTargetWeight;
				}else{
				   parentNodes[index].previousWeight=newTargetWeight;
				   parentNodes[index].weight=newTargetWeight;														 
			    }
			  
			  }
			  
			  
			    parentCells =computeWeightedBasedOnPrevoiusLocW00(parentNodes, [] ,polyCopyGlobal);
		   
				parentSitePositionPolygonsMap.clear();
				parentPolygonsMap.clear();									
				storeParentPolygonsInMap();																	   
				updateParentNodes();
				
				
				//remove parent cells
				parentLayer.selectAll('.polygonsParent')
				.remove();
				//parent parent rectangles
				parentLayer.selectAll('.rectsParent')
				.remove();
				
				parentLayer.selectAll('.imagesParent').remove();
				
				//draw updated parent cells
				parentLayer.selectAll('.polygonsParent')
				.data(parentCells)					
				.enter().append("path")
				.attr('d', renderCell)
				.attr("class", "polygonsParent")
				.attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.data.originalData.n; } )//i  
				.style ('fill', "none") // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
				.style('stroke', "gray")
				.style('stroke-width', 3)
				.style('stroke-opacity',parentVoronoiEdgesObacity);
				
				moveChildrenPositionInsideParentCellsStitching(); 
				 
				
				//drawScalabilityBarChart();
                			  			 							 				 
	  } 

updateParentNodesWeightGlobal=updateParentNodesWeights;	  
	  
	  var minDistanceInPolygon=Number.MAX_VALUE;
	  
	  function moveChildrenPositionInsideParentCells(){
		  
		  var keysOfCurrentMap=Array.from(parentPolygonsMap.keys());//=Array.from(parentChildrenMap.keys()); 
		  for(var indexPolygon=0; indexPolygon<=keysOfCurrentMap.length-1;++indexPolygon){
			      minDistanceInPolygon=Number.MAX_VALUE;
			//if(keysOfCurrentMap[indexPolygon]>=0){
				// compute only for non boundary parent polygon 
				  var parentPolygon=parentPolygonsMap.get(keysOfCurrentMap[indexPolygon]);
				  
				  var polygon=turf.polygon([ parentPolygon ]);
				  var centerInfo = turf.centerOfMass(polygon);
				  
				  //console.log("center of "+keysOfCurrentMap[indexPolygon]);
				  var center=[centerInfo["geometry"]["coordinates"][0], centerInfo["geometry"]["coordinates"][1]];
				  //console.log(center);
				  
				  //console.log("poly points");
				  //console.log(parentPolygon);
				  
 
				  //console.log("dist");
				  for(var p=0; p<=parentPolygon.length-1;++p){
					  var dist= computeDistance(parentPolygon[p], center);
					  
					  //console.log(dist);
					  minDistanceInPolygon=Math.min(dist, minDistanceInPolygon);
				  }
				  
				  console.log("before minDistanceInPolygon");
				  console.log(minDistanceInPolygon);
				  //minDistance=
				  var minDistanceInPolygonObject = {objectValue: minDistanceInPolygon};
				  minDistanceInPolygon=checkSquareInPolygon(polygon,center,minDistanceInPolygonObject);
				  //minDistanceInPolygon=minDistanceInPolygonObject.objectValue;
				  console.log("after minDistanceInPolygon");
				  console.log(minDistanceInPolygon);
				  if(minDistanceInPolygon==null  || minDistanceInPolygon == "undefined"){					  
				     minDistanceInPolygon=100;
					 console.log("change undefined to "+minDistanceInPolygon);					 
				  }
				  //get children of parent
				  var parentChildren=parentChildrenMap.get(keysOfCurrentMap[indexPolygon]);	
							  
				  //console.log("childNodes[indexChildNode]");		  
				  for(var i=0; i<=parentChildren.length-1; ++i){
					  var indexChildNode=parentChildren[i];			      
					  childNodes[indexChildNode].x=getRandom(center[0]-minDistanceInPolygon, center[0]+minDistanceInPolygon);
					  childNodes[indexChildNode].y=getRandom(center[1]-minDistanceInPolygon, center[1]+minDistanceInPolygon);
					  //console.log(childNodes[indexChildNode]);
				  }
		  
		    //}		
		  } 
	  }
	  
	  
	  function checkSquareInPolygon(polygon,center,minDistanceInPolygonObject) {
		  var minDistanceInPolygon=parseInt(minDistanceInPolygonObject.objectValue);
		  var minDistanceInPolygonLocal= parseInt(minDistanceInPolygon/2);
		  var cx=parseInt(center[0]);
		  var cy=parseInt(center[1]);
		  
		  var squarerP0x= cx- minDistanceInPolygonLocal;
		  var squarerP0y= cy- minDistanceInPolygonLocal;
		  var pt0 = turf.point([squarerP0x, squarerP0y]);
		  
		  var squarerP1x= cx - minDistanceInPolygonLocal;
		  var squarerP1y= cy + minDistanceInPolygonLocal;
		  var pt1 = turf.point([squarerP1x, squarerP1y]);
		  
		  var squarerP2x= cx + minDistanceInPolygonLocal;
		  var squarerP2y= cy + minDistanceInPolygonLocal;
		  var pt2 = turf.point([squarerP2x, squarerP2y]);
		  
		  
		  var squarerP3x= cx + minDistanceInPolygonLocal;
		  var squarerP3y= cy - minDistanceInPolygonLocal;
		  var pt3 = turf.point([squarerP3x, squarerP3y]);
		  
		  
		  var isPt0InPolygon= turf.booleanPointInPolygon(pt0, polygon);
		  var isPt1InPolygon= turf.booleanPointInPolygon(pt1, polygon);
		  var isPt2InPolygon= turf.booleanPointInPolygon(pt2, polygon);
		  var isPt3InPolygon= turf.booleanPointInPolygon(pt3, polygon);
		  
		  //console.log("checkSquareInPolygon");
		  //console.log(pt0);
		  minDistanceInPolygonObject.objectValue= minDistanceInPolygonLocal;
		  //console.log(minDistanceInPolygonLocal);
		  //console.log(isPt0InPolygon);
		  
		  //console.log(pt1);
		  //console.log(isPt1InPolygon);
		  
		  //console.log(pt2);
		  //console.log(isPt2InPolygon);
		  
		  //console.log(pt3);
		  //console.log(isPt3InPolygon);
		  

		  //if(minDistanceInPolygonLocal<=1){
		  	//console.log("minDistanceLocal");
			//console.log(minDistanceLocal);
		    //return 10;//minDistanceLocal;
		  //}else 
			  
		  if( isPt0InPolygon && isPt1InPolygon  && isPt2InPolygon && isPt3InPolygon ){
			//console.log("minDistanceLocal");
			//console.log(minDistanceLocal);
			return parseInt(minDistanceInPolygonObject.objectValue);//	minDistanceInPolygonLocal;  
		  }else {
			  //return 200;
		     checkSquareInPolygon(polygon,center,minDistanceInPolygonObject);
		  }
	  }
	  
	  
	   function createRandomChildNodes(childrenNodesNumber){
			var localarr=[];
			
			var n = 0;
			var localNodes=d3.range(childrenNodesNumber).map(function() {
			 return {
			  n: n++,   
			  x: getRandom(250,750), 
			  y: getRandom(250,750),
              id: 0			  
			 };
			});
			  
			return localarr.concat(localNodes); 
		
		}
		

function createEmptyDataChild(){
   var localNodes=[];
   
   return localNodes;
}





function addNewChild(childID, parentID){
	       
		   var centerParentPolygonePoint=centerParentPolygone(parentID);
		   
           childNodes.push({
			  n: childNodes.length,   
			  x: centerParentPolygonePoint.x,//getRandom(250,750), 
			  y: centerParentPolygonePoint.y,//getRandom(250,750),
			  id: childID,
              img: "",
              txt: ""			  
		   });
		   
		   //update global variables
		   childrenNodesNumber=childNodes.length;
		   initialNodesSize = childNodes.length;
	       //totalInitialNodesSize = childNodes.length;
		   totalInitialNodesSize = counterVisSum();


		  // update array with temproray position of each node    
		  tempNodesPosition=[]; 
		  for(var i=0;i<childNodes.length;i++){
			  tempNodesPosition.push({tempX:0,tempY:0});
		  }
	  
		   //update Hierarchy	  
		   buildHierarchyOneParent();
	   

		   
		   
			   
		    /*var arrayChildrenIds1=parentChildrenMap.get(parentNodes[0].n);
			arrayChildrenIds1.push(id);
			parentChildrenMap.set(parentNodes[0].n, arrayChildrenIds1);*/
			
			/*var targetParent=parentNodes[0].n;
			var targetParentChildren=Array.from(parentChildrenMap.get(targetParent));
		   if(targetParentChildren.indexOf(parseInt(id))==-1)
			  targetParentChildren.push(parseInt(id));
		   
		   parentChildrenMap.delete(targetParent);
		   parentChildrenMap.set(targetParent,targetParentChildren);*/
	   
	   
			
		   
}


function centerParentPolygone(parentPolygoneID){
	
		   var parentPolygon= parentPolygonsMap.get(parentPolygoneID);
		   if(parentPolygon==null || parentPolygon==undefined)
			   parentPolygon= parentPolygonsMap.get(0);
		   parentPolygon=turf.polygon([ parentPolygon ]);
		   var center = turf.centerOfMass(parentPolygon);  

		   var centerX= center["geometry"]["coordinates"][0];
		   var centerY= center["geometry"]["coordinates"][1];
	
	       return {x: centerX, y: centerY};
}


function updateChildrenCells(newChildId, parentPolygoneID){
	
	
	
////////////////////
/*
parentSitePositionPolygonsMap.clear();
parentPolygonsMap.clear();
			
storeParentPolygonsInMap();

updateParentNodes();
	
 
// relayout update parent cells
parentLayer.selectAll('.polygonsParent')
.data(parentCells)
.attr('d', renderCell) 
.attr('fill', "none");
   

parentLayer.selectAll('.polygonsParent')
.attr('fill', "none" );

parentLayer.selectAll('.polygonsParent').lower();																		   
moveChildrenPositionInsideParentCellsStitching();
*/


/////////////////////
	
	

    var parentChildren=parentChildrenMap.get(parentPolygoneID);
	
	var subChildrenNodes=[]; 
	subChildrenNodes.length=0;
	for(var i=0;i<parentChildren.length;i++){
	   var nodeData=childNodes[parentChildren[i]];
	   subChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
	}					
						
	var delaunay = d3.Delaunay.from(subChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
	var diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 
	var arrCells2=[];
	arrCells2.length=0;
	arrCells2=clippBoundaryCellsOfParentCell(diagram, parentPolygoneID); 

	///////////////////

	var currPolygonsChildGroup = parentLayer.selectAll('.polygonsChild')	 
	.filter(function(d) { return   parseInt(this.getAttribute("parentId"))==parentPolygoneID;});// 

	var currPolygonsChildCells = currPolygonsChildGroup.data(arrCells2)                    
	.attr("id", function(d,i){ return "childVorCell"+ childNodes[parentChildren[arrCells2.indexOf(d)]].n  ; } ) //+"-"+ parentIndexCurrentDragChild 
	.attr("parentId", function(d,i){ return parentPolygoneID} )
	.attr("d", renderCell).style('fill-opacity', 0.8);


	 //currPolygonsChildCells.enter().append("path");
	 
	currPolygonsChildCells.selectAll("path")
	.attr("d", renderCell)
	.attr("class", "polygonsChild")
	.attr("id", function(d,i){ return "childVorCell"+ childNodes[parentChildren[arrCells2.indexOf(d)]].n  ; } )//+"-"+ parentIndexCurrentDragChild 
	.attr("parentId", function(d,i){ return parentPolygoneID} )
	.attr('fill', parentCellsColors[parentPolygoneID])  
	.style('fill-opacity', 0.8);
	//.attr('class', 'polygonsChild').lower();

									  
    var indexLocalOfCurrentNod= parentChildren.indexOf(parseInt(newChildId));
	console.log(newChildId+"indexLocalOfCurrentNod"+indexLocalOfCurrentNod);
	console.log(parentChildren);
	console.log(arrCells2[indexLocalOfCurrentNod]);
	parentLayer.append("path")
	 .data(Array.from(arrCells2[indexLocalOfCurrentNod]))
   .attr('d', renderCell)
   .attr("class", "polygonsChild")
   .attr("id", function(d,i){ return "childVorCell"+ newChildId ;} )//i  +"-"+ parentIndexCurrentDragChild  
   .attr("parentId", function(d,i){ return parentPolygoneID} )				   
   .style ('fill', parentCellsColors[parentPolygoneID]) // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
   .style('stroke', "gray")
   .style('stroke-width', 3)
   .style('stroke-opacity',parentVoronoiEdgesObacity)
   .style('fill-opacity', 0.8);
	
	d3.selectAll('.polygonsChild').lower();
	d3.select("#childVorCell"+newChildId).raise();	//+"-"+ parentIndexCurrentDragChild

	d3.selectAll("image").style("opacity", imagesObacity);
	parentLayer.selectAll(".imagesChild").raise();
	parentLayer.selectAll("rect").raise();		

	drawChildRects();
	addChildrenTexts();
	addChildrenImages();
   reDrawAllChildren();
   
   
   

   
}
	
function drawChildRects(){
	   var u= parentLayer.selectAll(".rectsChild")
	  .data(childNodes);
	  
	  u.enter().append('rect')
	   .attr("width", function(d,i){ return   rectChildWidthInitial   ; })// initial width of rect   
	  .attr("height", function(d,i){ return  rectChildHeightInitial  ; } )// initial height of rect  
	  .attr("class", "rectsChild")
	  .attr("id", function(d,i){ return 'childRectname' +d.n; })// id of rect
	  .attr("iIndex", function(d,i){ return d.n; })// index of rect
	  .style("stroke-width", 0.1) // initial thickhness of border is 1
	  .style("stroke",  "black") // color points
	  .style("fill", "none")//"black"  // color points
	  .append("svg:title") 
	  .text(function(d,i) { return ' child node: ' + d.n;})
	  .merge(u)
	  .attr("x", function (d) { return d.x-rectChildWidthInitial  *0.5; }) // x position of rect node
	  .attr("y", function (d) { return d.y-rectChildHeightInitial  *0.5; });
	  
	   u.exit().remove();
	  
	   parentLayer.selectAll(".rectsChild").call(d3.drag().on("start",startDragChild).on("drag", draggedChild).on("end",endDragChild));//.on("click", clicked); //  clickDistance(10). .on('click', clicked)
		//parentLayer.selectAll(".imagesChild").on("click",clicked);  
}


function addChildrenTexts(){
	 var u= parentLayer.selectAll(".textChild")
	  .data(childNodes);
	  
	   u.enter().append('text')
	   .attr("class", "textChild")
	  .attr("id", function(d,i){ return 'childTextname' +d.n; })// id of rect
	  .attr("iIndex", function(d,i){ return d.n; })// index of rect
	  .text(function(d,i) { return d.n;})
	  .merge(u)
	  .attr("x", function (d) { return (d.x -rectChildWidthInitial  *0.5); }) // x position of rect node
	  .attr("y", function (d) { return (d.y -rectChildHeightInitial  *0.5); }) ;
	  
	   u.exit().remove();
	  	
}


function addChildrenImages(){
	var u= parentLayer.selectAll(".imagesChild")
	  .data(childNodes);
	  
	   u.enter().append('image')	   
//	   .attr("xlink:href", function (d,i) { return "static/images/BCLCimagesHighchart/" +d.id+".png" ; })//".webp" FoodData TextData Demographic BCLCimagesHighchartTest MNIST30Test  AirQuality  image path   		 
       .attr("xlink:href", function(d) { return    d.img; } )		
		.attr("iid", function (d,i) { return d.n; } )// id of image 
		  .attr("id", function(d,i){ return 'childImagename' + d.n; }) // In d3, id should start with letters  
		  .attr("iIndex",function (d,i) { return d.n; } ) // index of value in data (to fast look up in data)
		  .attr("width", imageWidthInitial) // initial width of image
		  .attr("height", imageHeightInitial) // initial height of image
		  .attr("class", "imagesChild")
		  .style('opacity',imagesObacity)
		  .append("svg:title") 
		  .text(function(d,i) { return 'id: ' + d.n;})
	      .merge(u)		  
		  .attr("x", function (d) { return d.x - imageWidthInitial  *0.5  ; } ) //+(imageWidthInitial/2) x position of image (center) +(imageWidthInitial/2)
		  .attr("y", function (d) { return d.y - imageHeightInitial *0.5  ; } ); //+ y position of image (center) +(imageHeightInitial/2)
	  
       	 u.exit().remove();
		   
       parentLayer.selectAll(".imagesChild").call(d3.drag().on("start",startDragChild).on("drag", draggedChild).on("end",endDragChild)); 
		//parentLayer.selectAll(".imagesChild").on("click",clicked); 
}


function createDataChildFromCSVFile(){
	console.log("createDataChildFromCSVFile");
	
	var localNodes=[];
	localNodes.length=0;
	//console.log(dataCSVRead);
	console.log(dataCSVRead.length);
	
	for(var i=0; i<dataCSVRead.length ; ++i){ //
		 localNodes.push(  {
					  n: i,   
					  x: getRandom(250,750), 
					  y: getRandom(250,750),
					  id: dataCSVRead[i].device_id,//
					  GroupID: "group0",
					  img:  "",
                      txt: ""	
				   } );				   				
	}
					      			   			 			                
		
		
		
	createchildImgs(localNodes);	
		
		
	return localNodes;
}


function createchildImgs(localNodes){
	console.log("createchildImgs");
	for(var n=0; n< localNodes.length;++n){
	  var node=localNodes[n];
	  node.img="static/code/GroupingImages/static/images/BCLCimagesHighchart/webp/"+node.id+".webp" ; 	   	   
	}
}

	
function createDataChildFromCSVFile1(){

				
				var url= "static/sampleData/features.csv";
				var request = new XMLHttpRequest();  
				request.open("GET", url, false);   
				request.send(null);  

				var csvData = new Array();
				var jsonObject = request.responseText.split(/\r?\n|\r/);
				for (var i = 0; i < jsonObject.length; i++) {			
                  csvData.push(jsonObject[i].split(','));
				}
				
				
				 
		        var localNodes=[];
		
		        for (var i = 1; i <=50 ; i++) {	//243		
                  csvData.push(jsonObject[i].split(','));
				  localNodes.push(  {
					  n: i-1,   
					  x: getRandom(250,750), 
					  y: getRandom(250,750),
					  id: csvData[i][0]			  
				   } );
				}
				
				
				
				
				
				// Retrived data from csv file content
				console.log(localNodes);
				
				return localNodes;
				
	}
				
			

  
  
	  
	  function getRandom(min, max) {
		return (Math.random() * (max - min + 1) ) + min;
	  } 
	  
	  
	  function renderCell(d) {
        return d == null ? null : "M" + d.join("L") + "Z"; // (d) => d ? "M" + d.join("L") + "Z" : null)
      }
	  
	  
	  function findParentCell(childIndex){
		  
		  var keysOfCurrentMap=Array.from(parentChildrenMap.keys());
//		  console.log(keysOfCurrentMap);
		  for(var index=0; index<=keysOfCurrentMap.length-1;++index){
		    
			 var parentChildren=parentChildrenMap.get(keysOfCurrentMap[index]);	
			 if(parentChildren.indexOf(childIndex)!=-1){				
			   return keysOfCurrentMap[index];
			 }
		  }
		  
		  
	  }
	  
	  
	 
	 function findParentPolygon(pointX,pointY){         		  
		  var keysOfCurrentMap=Array.from(parentPolygonsMap.keys());
		  var point=[pointX,pointY];
		  //console.log("point");
		  //console.log(point);
		  for(var index=0; index<=keysOfCurrentMap.length-1;++index){		    
			 var parentPolygon=parentPolygonsMap.get(keysOfCurrentMap[index]);
             //console.log(keysOfCurrentMap[index]);			 
			 //console.log(parentPolygon);
			 
			 if(d3.polygonContains(parentPolygon, point) ){				
			   return keysOfCurrentMap[index];
			 }
		  }		  
      }	  
	  
	  
	  function findChildImage(parentIndexCurrentDragCellChild, xMouseCoordinate,yMouseCoordinate){
		 
		  var point=[xMouseCoordinate,yMouseCoordinate] ;
		  var parentChildren= parentChildrenMap.get(parentIndexCurrentDragCellChild);		  						
          parentChildren=getGroupSizeSubChildren(parentChildren);
		  
		  var foundID=null;
		  
		  for(var indexChild=0; indexChild<parentChildren.length ; ++indexChild){
			  var xCenter= childNodes[parentChildren[indexChild]].x;
			  var yCenter= childNodes[parentChildren[indexChild]].y;
			  
			  var p0=[xCenter-(imageWidthInitial/2) , yCenter -(imageWidthInitial/2)];   
			  var p1=[xCenter+(imageWidthInitial/2) , yCenter -(imageWidthInitial/2)];   
			  var p2=[xCenter-(imageWidthInitial/2) , yCenter +(imageWidthInitial/2)];
			  var p3=[xCenter+(imageWidthInitial/2) , yCenter +(imageWidthInitial/2)];
			  
			  
			  
			  var boundingRect=[p0,p1,p2,p3,p0];
			  //console.log(parentChildren[indexChild]);
			  //console.log(boundingRect);
			  
			  if(d3.polygonContains(boundingRect, point) ){	
                 foundID = parentChildren[indexChild];			 
			     //return parentChildren[indexChild];
			  }
			  
		  }
		  
		  return foundID;
		  		  
	  }
	  
	  
	  function findChildCell(parentIndexCurrentDragCellChild, xMouseCoordinate,yMouseCoordinate){
		  		var point=[xMouseCoordinate,yMouseCoordinate] ;
		        var parentChildren= parentChildrenMap.get(parentIndexCurrentDragCellChild);		  						
                parentChildren=getGroupSizeSubChildren(parentChildren);
		  
		        console.log("findChildCell");
		        
				var foundID=null;
				
				for(var i=0;i<parentChildren.length;i++){
					//console.log(parentChildren2[i]);
					var rect=d3.select("#childVorCell"+parseInt(parentChildren[i])).node().getBBox();
					var x1= rect.x;
			        var y1= rect.y;
					
					
					var p0=[x1 , y1];   
			        var p1=[x1+rect.width , y1 ];   
			        var p2=[x1+rect.width , y1 + rect.height];
			        var p3=[x1 , y1 + rect.height];
			  
			  
			  
			        var boundingRect=[p0,p1,p2,p3,p0];
					
					if(d3.polygonContains(boundingRect, point) ){	
                       foundID = parentChildren[i];	
                       break;					   
			        }
					 
				}
				
				return foundID;
	  }
	  
	  
	  function createOneParentNode(){
		  var B=10000; 
		  
		  var localarr=[];
		  var relativeTotalNodesSize= totalInitialNodesSize;
		  
		  var weightParent = 1;// B * 10/relativeTotalNodesSize;

		  localarr.push({x:500, y:500, weight: weightParent, previousX: NaN , previousY: NaN, previousWeight: NaN,  n:0, GroupID:"group0"});//
		  
		  return localarr;
	  }
	  
	  

	  
	  
	  function project(x, y, slope, yint) {
        var slope2 = -1 / slope;
        var yint2 = y - slope2 * x;
        var nx = (yint2 - yint) / (slope - slope2);
        return {x: nx, y: (slope * nx) + yint};
      }	
	  
	  
	  
	  function computeDistance(p1 , p2){
		   var x1=parseFloat(p1[0]);
		   var x2=parseFloat(p2[0]);
		   var y1=parseFloat(p1[1]);
		   var y2=parseFloat(p2[1]);
		   
		   var deltaAvgX= x1 - x2;
           var deltaAvgY= y1 - y2;
           var distance = Math.sqrt( deltaAvgX * deltaAvgX + deltaAvgY * deltaAvgY ); 
		   
		   return distance;
	  }
	  
	 
	 
	var copyOfCenterparentNodes=[];
    copyOfCenterparentNodes.length=0;

    function computeCenterOfParents(){    


		    copyOfCenterparentNodes.length=0;	
		    for(var i=0;i<=parentNodes.length-1;i++){

			   copyOfCenterparentNodes.push({x:parentNodes[i].x,y:parentNodes[i].y,n:parentNodes[i].n});
		    }
									
			var lastNodeIndex=copyOfCenterparentNodes.length-1;
													  
		    // for each node compute avg position of its neighbor            
		    for(var nodeIndex=0; nodeIndex <= lastNodeIndex; ++nodeIndex){ // boundary nodes 0-7 were exceluded
													  
			   var parentNodeIndex = copyOfCenterparentNodes[nodeIndex].n;
			  
			   var parentPolygon= parentPolygonsMap.get(parentNodeIndex);
			   try{
				   parentPolygon=turf.polygon([ parentPolygon ]);
				   var center = turf.centerOfMass(parentPolygon);  

				   var centerX= center["geometry"]["coordinates"][0];
				   var centerY= center["geometry"]["coordinates"][1];
					
				   copyOfCenterparentNodes[nodeIndex].x= centerX;
				   copyOfCenterparentNodes[nodeIndex].y= centerY;
			   
			   }catch(e){
				    //parentPolygon=clipPloygonGlobal(parentPolygon );	
					var center=d3.polygonCentroid(parentPolygon); 
					copyOfCenterparentNodes[nodeIndex].x= parseFloat(center[0]);
				    copyOfCenterparentNodes[nodeIndex].y= parseFloat(center[1]);
				   
			   }
			   			  
		    }
									  
     }
	 
	 
	 var copyOfparentNodes=[];
	 copyOfparentNodes.length=0;
	 
     function computeCenterOfMassParents(){    
	     
	     var maxDistanceThreshold=1.0;        
         var maxLoop=50;
         var countLoop=1;
    
            computeCenterOfParents();
			
	        copyOfparentNodes.length=0;	
		    for(var i=0;i<=copyOfCenterparentNodes.length-1;i++){
			   copyOfparentNodes.push({x:copyOfCenterparentNodes[i].x,y:copyOfCenterparentNodes[i].y, n:copyOfCenterparentNodes[i].n});
		    }
			
			/*for(var i=0;i<=parentNodes.length-1;i++){
			   copyOfparentNodes.push({x:parentNodes[i].x,y:parentNodes[i].y, n:parentNodes[i].n});
		    }*/
			
		    var tempNodesPosition=[];
		    tempNodesPosition.length=0;	
		    for(var i=0;i<=copyOfparentNodes.length-1;i++){
			  tempNodesPosition.push({tempX:0,tempY:0});
		    }
			
			
	 
	 
         do {    
 
            var maxDistance=0.0; 
            var delaunay = d3.Delaunay.from(copyOfparentNodes, p => p.x, p => p.y); // create dealuny from updates nodes
			var diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 
				  				  
									
			var lastNodeIndex=copyOfparentNodes.length-1;
									
													  
		    // for each node compute avg position of its neighbor            
		    for(var nodeIndex=0; nodeIndex <= lastNodeIndex; ++nodeIndex){ // boundary nodes 0-7 were exceluded
					var neighbors=[];
					neighbors.length=0; 							                                                                                		  
														   
					var cellPoly=diagram.cellPolygon(nodeIndex);     
						  
					if(cellPoly==null){ console.log(cellPoly+" "+nodeIndex);   
						continue ;
					 }
				   
					neighbors=Array.from(cellPoly);
					
					var polyArray=neighbors; 
			 
					var parentPolygon = turf.polygon([polyArray]); 
					
			  

				   var center = turf.centerOfMass(parentPolygon);  

				   var centerX= center["geometry"]["coordinates"][0];
				   var centerY= center["geometry"]["coordinates"][1];
					
				   tempNodesPosition[nodeIndex].tempX= centerX;
				   tempNodesPosition[nodeIndex].tempY= centerY;
				   
				   var xCurrent= copyOfparentNodes[nodeIndex].x;
				   var yCurrent= copyOfparentNodes[nodeIndex].y;
				   
				   var deltaAvgX= centerX - xCurrent;
				   var deltaAvgY= centerY - yCurrent;
				   var avgDistance = Math.sqrt( deltaAvgX * deltaAvgX + deltaAvgY * deltaAvgY ); 
				   maxDistance=Math.max(maxDistance ,avgDistance ); 
			   
			   			  
		    }
			
			
			//store new x y position of all nodes (except boundary) in nodes array
			 for(var nodeIndex=0; nodeIndex <= lastNodeIndex; ++nodeIndex){ 
				  //to collapse group of nodes	  
				  /*if(collapsedNodes!=null && collapsedNodes!="undefined"){
					if(collapsedNodes.indexOf(nodeIndex)!=-1){
					  //console.log("collapsedNodes"+nodeIndex);
					  continue;
					}
				  }*/     
				  
				   copyOfparentNodes[nodeIndex].x=tempNodesPosition[nodeIndex].tempX;
				   copyOfparentNodes[nodeIndex].y=tempNodesPosition[nodeIndex].tempY;           
			 }           
                      
		  countLoop =countLoop +1;
		}//  continue loop when current maxDistance is bigger than maxDistanceThreshold 
		 //  and #loop is less than max #loop allowed
		 while (maxDistance >= maxDistanceThreshold    );    //countLoop<=maxLoop &&     countLoop<=maxLoop
               
         return delaunay;
									  
     }




     function computeDelaunyParentChildren(parentIndex){ 

	   }	   
	 
	 
	 function computeCenterOfMassParentChildren(parentIndex){ 
            console.log("computeCenterOfMassParentChildren");	 
			var maxDistanceThreshold=1.0;        
			var maxLoop=50;
			var countLoop=1;
			
			var skipNodes=[];

	  
			
			var parentChildren=parentChildrenMap.get(parentIndex);
			parentChildren=getGroupSizeSubChildren(parentChildren);
		    var subChildrenNodes=[]; 
		    subChildrenNodes.length=0;
		    for(var i=0;i<=parentChildren.length-1;i++){
			   var nodeData=childNodes[parentChildren[i]];
			   subChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
		    }
			
			var tempSubNodesPosition=[];
		    tempSubNodesPosition.length=0;	
		    for(var i=0;i<=subChildrenNodes.length-1;i++){
			  tempSubNodesPosition.push({tempX:0,tempY:0});
		    }
			
			//execute block before testing maxDistanceThreshold threshold (to find first maxDistance)
			do {    
			  //console.log("Loop#="+countLoop);
			  var maxDistance=0.0; 
			  
			  
//			  console.log("subChildrenNodes");
//			  console.log(subChildrenNodes);
//			  console.log("subChildrenNodes.length");
//			  console.log(subChildrenNodes.length);
			  
			  //if(subChildrenNodes.length>2)
			  {
					  
				  var delaunay = d3.Delaunay.from(subChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
				  //diagram = delaunay.voronoi([200,200,800,800]); 
				  var diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 
				  
				  var lastNodeIndex=subChildrenNodes.length-1;
				  

				  
				  // for each node compute avg position of its neighbor            
				  for(var nodeIndex=0; nodeIndex <= lastNodeIndex; ++nodeIndex){ // boundary nodes 0-7 were exceluded
				      
					  
					  
					  var nodeIndexFromSubchildren = subChildrenNodes[nodeIndex] ;
					  var nodeIndexFromAllchildren=childNodes[nodeIndexFromSubchildren.n];	

                      //childCellMap.set( nodeIndexFromAllchildren.n , nodeIndex);					  
					  var neighbors=[];
					  neighbors.length=0; 
									  
					  var cellPoly=diagram.cellPolygon(nodeIndex);     
					  //console.log(cellPoly+" "+nodeIndex);        
					  if(cellPoly==null){ console.log("cellPoly "+cellPoly+" "+nodeIndex);   
						continue ;
					  }
				   
					  neighbors=Array.from(cellPoly);// //d3.select(nodes[nodeIndex].n);
					  
					  var polyArray=neighbors; 
	//				  console.log("nodeIndex "+nodeIndex);
	//				  console.log(polyArray);
					  if(polyArray.length<4){
						  console.log("skip"+nodeIndex+" "+nodeIndexFromAllchildren.n);
						  //if(skipNodes.indexOf(nodeIndex)==-1){
							skipNodes.push(nodeIndex);
							continue;
						  //}
					  }
					  
					  try{
					  var polygon = turf.polygon([polyArray]); 		
					  //console.log("polygon");
					  //console.log(polygon);
					  
					  var parentCellIndex=parentIndex;//findParentCell(nodeIndexFromAllchildren.n);
//					  console.log("parentCellIndex");
//					  console.log(parentCellIndex);
//					  console.log("parentPolygonsMap");
//					  console.log(parentPolygonsMap);
					  var parentPolygon= parentPolygonsMap.get(parentCellIndex);
//					  console.log("parentPolygon");
//					  console.log(parentPolygon);
					  parentPolygon=turf.polygon([ parentPolygon ]);
							
	 
					  polygon = turf.intersect(polygon, parentPolygon);
					  //console.log("intersect polygon="+polygon); 
					  if(polygon==null){ console.log(" "+nodeIndexFromAllchildren.n);   
						continue ;
					  }
					  
					  }catch(e){
						  continue ;
					  }
					  var center = turf.centerOfMass(polygon);  
			//          console.log("center="+center["geometry"]["coordinates"]);
					  var centerX= center["geometry"]["coordinates"][0];
					  var centerY= center["geometry"]["coordinates"][1];
															
					  //------ find max shift
					  // var currentNodeIndex=parseInt(currentNode.attr("iIndex")); 

					  tempSubNodesPosition[nodeIndex].tempX=centerX;
					  tempSubNodesPosition[nodeIndex].tempY=centerY;

					   var xCurrent= subChildrenNodes[nodeIndex].x;
					   var yCurrent= subChildrenNodes[nodeIndex].y;
					   
					   var deltaAvgX= centerX - xCurrent;
					   var deltaAvgY= centerY - yCurrent;
					   var avgDistance = Math.sqrt( deltaAvgX * deltaAvgX + deltaAvgY * deltaAvgY ); 
					   maxDistance=Math.max(maxDistance ,avgDistance );                                                  
				  }
				  
				  
				  //console.log("maxDistance="+maxDistance);  
				   
				  //store new x y position of all nodes (except boundary) in nodes array
				  for(var nodeIndex=0; nodeIndex <= lastNodeIndex; ++nodeIndex){    
 
					  var nodeIndexFromAllchildren=childNodes[subChildrenNodes[nodeIndex].n];	
					  
					  if(skipNodes.indexOf(nodeIndex)==-1){
						  
					    childNodes[nodeIndexFromAllchildren.n].x=tempSubNodesPosition[nodeIndex].tempX;
					    childNodes[nodeIndexFromAllchildren.n].y=tempSubNodesPosition[nodeIndex].tempY;  
					   
					    subChildrenNodes[nodeIndex].x=tempSubNodesPosition[nodeIndex].tempX;
					    subChildrenNodes[nodeIndex].y=tempSubNodesPosition[nodeIndex].tempY;  					   
					  }				   
				  }
				  skipNodes.length=0;			  
								  
				  countLoop =countLoop +1;
			  
			  }
			}//  continue loop when current maxDistance is bigger than maxDistanceThreshold 
			 //  and #loop is less than max #loop allowed
			 while (maxDistance >= maxDistanceThreshold    );    //countLoop<=maxLoop &&     countLoop<=maxLoop
		 
					   		   
			 return delaunay;
	  }
	  
	  
	   function findIntersectionTwoPolygons(polygone1 , polygone2){		   		    								
		 polygone1 = turf.polygon([polygone1]); 											  			  
		 polygone2 = turf.polygon([polygone2]);
				 
		 var polygon = turf.intersect(polygone1, polygone2);
		 
		 return polygon;
	   }
	   
	   
	  
	  function dragParentByCopyParentnode(parentIndexStartDragChild, xMouseCoordinate, yMouseCoordinate){
		          
	  }
	  
	  
	  function dragParentByBubbleSimulation(d,parentIndexStartDragChild, xMouseCoordinate, yMouseCoordinate){
		    
	  }
	  
	  
	  function dragParent(d){
		  
	  }
	  
	  function endDragParent(d){
		  
	  }
	  
	  var parentIndexStartDragChild = -1;
	  var parentIndexEndDragChild = -1;
	  
	  
	  var sourceWeight=-1;
	  var newSourceWeight=-1;
	  var sourceChildNumber = -1;
	  
	   var startTime=0;
	   var isParentNodeMove=false;
	   var time=-1;	

       var dblclick=0;
       var dblclickArray=[];
	   var wasMoved = false;
		
	   var dragDistance=0;
	   var startDragPoint={x:0,y:0};
	   var draggingPoint={x:0,y:0};
	   var endDragPoint={x:0,y:0};
		   
	   var xStartTeleImgPos;
       var yStartTeleImgPos;
	   
	  function startDragChild(d){
		  //saveStateClientFunction();
		    console.log("startDragChild");
			logInteractionsArray.push("startDragChild");
		    //document.getElementById("InteractionID").innerHTML="startDragChild"+dragDistance;
			
			wasMoved = false;
		 // d3.select(this).select("rect").on("click", function() { d3.event.preventDefault(); });
		 		 
		  
	        var mousePos=d3.mouse(mainSvg.node());//d3.mouse(this);  //get mouse position //use d3.mouse(this) on drag end
			var xMouseCoordinate=mousePos[0];//get x mouse position
			var yMouseCoordinate=mousePos[1];//get y mouse position 
			
			dragDistance=0;draggingPoint.x= 0;draggingPoint.y= 0; endDragPoint.x= 0;  endDragPoint.y= 0; startDragPoint.x= 0;  startDragPoint.y= 0; 
			startDragPoint.x=xMouseCoordinate;
			startDragPoint.y=yMouseCoordinate;
			
			var selectedRect=d3.select(this);//.select("rect");  
			
			var selectedNodeIndex=selectedRect.attr("iIndex");
			console.log("start drag child: selectedNodeIndex="+selectedNodeIndex);
			//zooming out image
			//mouseOutHandleStartDrag(selectedNodeIndex);

			//var parentId= getParentIdFrmChildIndx(selectedNodeIndex); 
			var parentId= getParentByIdLocal(childNodes[selectedNodeIndex].GroupID).n; 	
			 console.log(parentId); 
			var parentChildren= parentChildrenMap.get(parentId);		

			parentIndexStartDragChild=findParentPolygon(xMouseCoordinate,yMouseCoordinate );//findParentCell(parseInt(selectedNodeIndex));

////
            parentChildren=parentChildrenMap.get(parentIndexStartDragChild);
			sourceChildNumber=getGroupSizeSubChildren(parentChildren).length;
            console.log("start sourceChildNumber");
            console.log(sourceChildNumber);
			if(sourceChildNumber==1 || prototypesChildrenNodes.indexOf(selectedNodeIndex)!=-1){
				
				parentIndexPrevoiusDragChild= parentIndexStartDragChild;	
					
				try{
				  wrapAllTextRect();
				}catch(e){

				}

			}
////


			if(parentChildren.length>1 || prototypesChildrenNodes.indexOf(selectedNodeIndex)!=-1){							  				  												
						
																		
						console.log("parentIndexStartDragChild");
						console.log(parentIndexStartDragChild);
						//console.log(parentSitePositionPolygonsMap);
						
						var parentNodeSiteSource=null;
						parentCells.forEach((p)=>{
						  if(p.site.originalObject.data.originalData.n==parentIndexStartDragChild){
							parentNodeSiteSource=p; 
							//break;
						  }
						});
						console.log("parentNodeSiteSource");
						console.log(parentNodeSiteSource);
						sourceWeight=parentNodeSiteSource.site.weight;			
						//sourceWeight=parentSitePositionPolygonsMap.get(parentIndexStartDragChild)[2] ;
						
						//var parentNodeSiteSource=parentSitePositionPolygonsMap.get(parentIndexStartDragChild);
						//var sourceWeight=parentNodeSiteSource[2];			
						var parentChildren=parentChildrenMap.get(parentIndexStartDragChild);
						//sourceChildNumber=pr.length;
						sourceChildNumber=getGroupSizeSubChildren(parentChildren).length;
						


						//var sourceUnitWeight = parseInt(sourceWeight / sourceChildNumber);
						
						newSourceWeight = 1/totalInitialNodesSize;
						if(sourceChildNumber>1)
						  newSourceWeight =  (sourceChildNumber-1)/totalInitialNodesSize;//10000 * sourceWeight - sourceUnitWeight;
						//var newSourceWeight = parentNodes[parentIndexStartDragChild].weight -10000;
						
						console.log("parentWeightStartDragChild "+sourceWeight+" new"+newSourceWeight);	
						console.log("parentChildLengthStartDragChild "+sourceChildNumber);
						console.log(parentChildrenMap.get(parentIndexStartDragChild));			
									
						parentIndexPrevoiusDragChild= parentIndexStartDragChild;	
						
						console.log("startTime");
						startTime = new Date().getTime(); //.getSeconds();//
						console.log(startTime);	
						console.log("startdrag" );
						
						
						

						
						//else
						
						{
							
							
							try{
							  wrapAllTextRect();
							}catch(e){

							}

							
						}				
						
						
						///////////
						
						
						
			}	


			if(parentChildren.length==1){
				if(freeRepresentiveParentNodes.indexOf(parentIndexStartDragChild)){
				  freeRepresentiveParentNodes.push(parentIndexStartDragChild);
				}else{
				  freeRepresentiveParentNodes.splice(parentIndexStartDragChild,1);
				}						
			}
			
			targetParentPolygoneCenetrXGlobal= childNodes[selectedNodeIndex].x;
			targetParentPolygoneCenetrYGlobal= childNodes[selectedNodeIndex].y;
			 
            
			xStartTeleImgPos=d3.select("#childImagename"+selectedNodeIndex).attr("x");
			yStartTeleImgPos=d3.select("#childImagename"+selectedNodeIndex).attr("y");		
	  }
	   
	   
	   

	  //function clicked(d, i) {
                            
							//if (d3.event.defaultPrevented) 
							 // return; 
						     //console.log("clicked");
						    //isParentNodeMove=true;	
							//console.log("clicked"+isParentNodeMove);
							/*console.log("startTime1");		
							console.log(startTime);
							
							console.log("endTime");	
							//time = new Date().getSeconds()-startTime;
							 time = (new Date().getTime() - startTime) / 1000;
							
							//time = (new Date().getTime()- startTime) /1000 * 60*60*24*60;
							 
							console.log(time);
							if (time >2 ){
								console.log("click-time="+time);
								isParentNodeMove=true;							
							}*/
     // }

       	  
var targetParentPolygoneCenetrXGlobal;
var targetParentPolygoneCenetrYGlobal;
	 
	  var parentIndexPrevoiusDragChild=-1;
	  var currentDragChildPolygon=null;
	  var firstDragFlag=true;
	  var prevDragtime=0;
	  var teleportCounter=0;
	  
	  var parentTargetTeleport=-1;
	  var parentSourceTeleportGlobal=-1;
	  
	  function draggedChild(d){
		   console.log("draggedChild");
           if(logInteractionsArray[logInteractionsArray.length-1]!="draggedChild"){		   
               logInteractionsArray.push("draggedChild");		   
		       //document.getElementById("InteractionID").innerHTML ="draggedChild"+dragDistance;
		   }
		   
		   wasMoved = true;
		   //dblclick=0;
		   
		  
				  
		  //var timeTmp = (new Date().getTime() - startTime ) / 1000;
		  //console.log("timeTmp");
          //console.log(timeTmp);
			  
		 // d3.select(this).select("rect").on("click", function() { d3.event.preventDefault(); });
		  
		  	var mousePos=d3.mouse(mainSvg.node());//d3.mouse(this);  //get mouse position //use d3.mouse(this) on drag end
			var xMouseCoordinate=mousePos[0];//get x mouse position
			var yMouseCoordinate=mousePos[1];//get y mouse position 
			
			draggingPoint.x= xMouseCoordinate;
			draggingPoint.y= yMouseCoordinate;
			
			dragDistance= getDistanceTwoPoints(draggingPoint,startDragPoint);
			
if(dragDistance>30)
{			
			console.log("drag x="+xMouseCoordinate+"- y="+yMouseCoordinate);
			//console.log("selectedNodeIndex=");
			var selectedRect=d3.select(this);//.select("rect");  
			var selectedNodeIndex=selectedRect.attr("iIndex");
			console.log("selectedNodeIndex="+selectedNodeIndex);
//mouseOutHandleStartDrag(selectedNodeIndex);

var parentId= getParentIdFrmChildIndx(selectedNodeIndex); 	  
var parentChildren= parentChildrenMap.get(parentId);	

console.log(parentChildrenMap);
console.log("check "+parentId);	
console.log(parentChildren);
	  
if(parentChildren.length>1  && freeRepresentiveParentNodes.indexOf(parentIndexStartDragChild)==-1 )

{	//&& dblclickArray.indexOf(selectedNodeIndex)==-1|| prototypesChildrenNodes.indexOf(selectedNodeIndex)!=-1		

			var parentSourceTeleport = findParentPolygon(xMouseCoordinate,yMouseCoordinate);//parentId;//			
			console.log("drag tele="+teleportCounter);
			console.log(parentSourceTeleport);
			console.log(parentTargetTeleport);
			
			
			var repres=isRepresentativeNode(selectedNodeIndex);
			console.log("repres");
			console.log(repres);
			
			if(repres!=-1){

              /* if(firstDragFlag){
			      console.log("drag  Collapse");
			      firstDragFlag=false;	
                  //if(teleportCounter==0 && parentTargetTeleport==-1)				  
			        runCollapse(d);	
			   }else if( !firstDragFlag){
				  console.log("draging parent"+parentIndexStartDragChild);
				  //dragParentByCopyParentnode(parentIndexStartDragChild, xMouseCoordinate, yMouseCoordinate);
				  //if(teleportCounter==0 && parentTargetTeleport==-1)
				    dragParentByBubbleSimulation(d, parentIndexStartDragChild, xMouseCoordinate, yMouseCoordinate)				
			   }*/
			
			
			}else if(parentTargetTeleport!=-1 ){
				 
				 ++teleportCounter;
				 if(teleportCounter==1 && parentTargetTeleport!=parentSourceTeleport){
					var keysOfCurrentMap=Array.from(parentPolygonsMap.keys());
					//console.log(keysOfCurrentMap);
					var parentPolygon=parentPolygonsMap.get(parentTargetTeleport);
					var  parentPolygonTurf= turf.polygon([parentPolygon]);								  					  
					var centerInfo = turf.centerOfMass(parentPolygonTurf);
					
					//console.log(centerInfo["geometry"]["coordinates"][0] +" "+centerInfo["geometry"]["coordinates"][1]);
					var targetParentPolygoneCenetrX=parseFloat( centerInfo["geometry"]["coordinates"][0]);
					var targetParentPolygoneCenetrY=parseFloat( centerInfo["geometry"]["coordinates"][1]);
															
					childNodes[selectedNodeIndex].x=targetParentPolygoneCenetrX;
					childNodes[selectedNodeIndex].y=targetParentPolygoneCenetrY;					
					
					//selectedRect.attr("x", d.x = targetParentPolygoneCenetrX ).attr("y", d.y = targetParentPolygoneCenetrY );

					
					parentSourceTeleportGlobal=parentSourceTeleport;
					   																	 											

					setTimeout(function() { 
					
						  
						 d3.select("#childImagename"+selectedNodeIndex)
						 .attr("x",xStartTeleImgPos) //xMouseCoordinate
			             .attr("y",yStartTeleImgPos);//yMouseCoordinate
						 selectedRect.attr("x", d.x = yStartTeleImgPos ).attr("y", d.y = yStartTeleImgPos );//xMouseCoordinate yMouseCoordinate
						
						 // console.log("transition2");
						 //var xChi=d3.select("#childRectname"+selectedNodeIndex).attr("x");
						 //var yChi=d3.select("#childRectname"+selectedNodeIndex).attr("y");
						 
						 
                        d3.select("#childImagename"+selectedNodeIndex).transition()
						.attr("x",targetParentPolygoneCenetrX)
						.attr("y", targetParentPolygoneCenetrY)
						.duration(500);	

                        selectedRect.transition()
						.attr("x", d.x = targetParentPolygoneCenetrX )
						.attr("y", d.y = targetParentPolygoneCenetrY )
						.duration(500);						
						
					},500);
					
					
					setTimeout(function() {  
					   teleportChidCell(selectedNodeIndex, parentSourceTeleport , parentTargetTeleport);
				 	},1000);

				 }
				 
				 
				 if( parentTargetTeleport==parentSourceTeleport){//teleportCounter==1 &&
				 
					 var parentIndexCurrentDragChild = findParentPolygon(xMouseCoordinate,yMouseCoordinate);
					 console.log("parentIndexCurrentDragChild "+parentIndexCurrentDragChild);
					
					 if(isCreateGroup==true || parentId ==parentIndexCurrentDragChild){	
					   childNodes[selectedNodeIndex].x= xMouseCoordinate;
					   childNodes[selectedNodeIndex].y= yMouseCoordinate;     
					   selectedRect.attr("x", d.x = xMouseCoordinate).attr("y", d.y = yMouseCoordinate);
					 }
					 dragChildInParentCell(d, selectedNodeIndex, parentIndexStartDragChild,parentIndexCurrentDragChild);
				 }
				 
				 
			}else{	
			
			
			
					  if(firstDragFlag){
						
						
						var isInsideViewBoundary=d3.polygonContains([[0,0], [0,voronoiHeight], [voronoiWidth, voronoiHeight], [voronoiWidth,0]], [xMouseCoordinate, yMouseCoordinate]);
						console.log("isInsideViewBoundary="+isInsideViewBoundary);
						if(isInsideViewBoundary) {
											
							var parentIndexCurrentDragChild = findParentPolygon(xMouseCoordinate,yMouseCoordinate);
							console.log("parentIndexCurrentDragChild "+parentIndexCurrentDragChild);
							
							if(isCreateGroup==true || parentId ==parentIndexCurrentDragChild){	
							  childNodes[selectedNodeIndex].x= xMouseCoordinate;
							  childNodes[selectedNodeIndex].y= yMouseCoordinate;     
							  selectedRect.attr("x", d.x = xMouseCoordinate).attr("y", d.y = yMouseCoordinate);
							}
							
							
							
							var checkCollapsedParent= isCollapsedParentNode(parentIndexCurrentDragChild);
							console.log("checkCollapsedParent");
							console.log(checkCollapsedParent);	
							
							var repres=isRepresentativeNode(selectedNodeIndex);
							
							if(checkCollapsedParent ){
							   
							   if(repres==parentIndexCurrentDragChild){
								   firstDragFlag=false;				
								   //runCollapse(d);
							   }else{
				///////////////////////////////////////////////////					
								if(parentIndexCurrentDragChild==parentIndexPrevoiusDragChild){
								console.log("inside drag");
								var parentChildren=parentChildrenMap.get(parentIndexCurrentDragChild);						
								parentChildren=getGroupSizeSubChildren(parentChildren);
												
								parentChildren.push(selectedNodeIndex);
								
								var subChildrenNodes=[]; 
								subChildrenNodes.length=0;
								for(var i=0;i<parentChildren.length;i++){
								   var nodeData=childNodes[parentChildren[i]];
								   subChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
								}
								
								
								delaunay = d3.Delaunay.from(subChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
								diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 

								var arrCells2=[];
								arrCells2.length=0;
								//arrCells2=diagram;
								//arrCells2=clippBoundaryCellsOfParentCell(diagram, parentIndexCurrentDragChild); 
								arrCells2=clippBoundaryCellsOfParentCellCollapsed(diagram, parentIndexCurrentDragChild, parentChildren);
							
							var polygonsChildGroup = parentLayer.selectAll('.polygonsChild')
			//					.filter(function(d) {return   parseInt(this.getAttribute("id").split("-").pop())==parentIndexCurrentDragChild;});// 
								.filter(function(d) {return   parseInt(this.getAttribute("parentId") )==parentIndexCurrentDragChild;}); 
								
								var polygonsChildCells = polygonsChildGroup.data(arrCells2)
								.attr("id", function(d,i){ return "childVorCell"+ childNodes[parentChildren[arrCells2.indexOf(d)]].n  ; } )//+"-"+ parentIndexCurrentDragChild 
								.attr("parentId", function(d,i){ return parentIndexCurrentDragChild} )					
								.attr("d", renderCell).style('fill-opacity', 0.8);
								
								
								polygonsChildCells.selectAll("path")
								.attr('fill', parentCellsColors[parentIndexCurrentDragChild])  
								.style('fill-opacity', 0.8)
								.attr('class', 'polygonsChild').lower();
								//.attr('fill', "none" );	


																								   
								parentLayer.selectAll('.rectsChild')//.selectAll("rect")
								.attr("x", function (d) { return (childNodes[d.n].x)  - (imageWidthInitial/2); }) // x position of rect node
								.attr("y", function (d) { return (childNodes[d.n].y) - (rectChildHeightInitial/2); });
								
								
								parentLayer.selectAll('.imagesChild')
								.attr("x", function (d) { return (childNodes[d.n].x) - (imageWidthInitial/2)  ; } ) //+(imageWidthInitial/2) x position of image (center) +(imageWidthInitial/2)
								.attr("y", function (d) { return (childNodes[d.n].y) - (imageHeightInitial/2)  ; } );
								
								parentLayer.selectAll('.textChild')//.selectAll("text")
									.attr("x", function (d) { return (childNodes[d.n].x -3); }) // x position of rect node
									.attr("y", function (d) { return (childNodes[d.n].y -3); }) 
									.text(function(d,i) { return d.n;});
						  

								parentLayer.selectAll('.polygonsChild').lower();
								polygonsChildCells.selectAll('.polygonsChild').lower();
								d3.selectAll('.polygonsChild').lower();
								d3.selectAll("image").style("opacity", imagesObacity);
								parentLayer.selectAll("rect").raise();
								parentLayer.selectAll(".imagesChild").raise();

								}else {
									
								console.log("not equal parentIndexPrevoiusDragChild "+parentIndexPrevoiusDragChild);
											   
								//var groupPrevius = parentCellsChildrenLayersMap.get(parentIndexPrevoiusDragChild);	
								//d3.select("#gParentChildren"+parentIndexPrevoiusDragChild).select("#gChild-"+selectedNodeIndex).remove();									   
								
								updateHierarchy(selectedNodeIndex, parentIndexPrevoiusDragChild, parentIndexCurrentDragChild);
								//storeParentPolygonsInMap();
								
								
								
								var PreviuosParentChildren=parentChildrenMap.get(parentIndexPrevoiusDragChild);	
								PreviuosParentChildren=getGroupSizeSubChildren(PreviuosParentChildren);
								console.log("PreviuosParentChildren");
								console.log(PreviuosParentChildren);
								
			//					var parentChildren=parentChildrenMap.get(parentIndexCurrentDragChild);	
			//					parentChildren=getGroupSizeSubChildren(parentChildren);					
			//					console.log("parentChildren");
			//					console.log(parentChildren);
								
								moveChildrenPositionInsideOneParent(parentIndexPrevoiusDragChild);
								var presubChildrenNodes=[]; 
								presubChildrenNodes.length=0;
								for(var i=0;i<PreviuosParentChildren.length;i++){
								   var nodeData=childNodes[PreviuosParentChildren[i]];
								   presubChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
								}
								
								///////////////////
								var delaunayPrev = d3.Delaunay.from(presubChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
								var diagramPrev = delaunayPrev.voronoi([0,0,voronoiWidth,voronoiHeight]); 
								var arrCellsPrev=[];
								arrCellsPrev.length=0;
								arrCellsPrev=clippBoundaryCellsOfParentCell(diagramPrev, parentIndexPrevoiusDragChild); 
								///////////////////
								
								var prevPolygonsChildGroup = parentLayer.selectAll('.polygonsChild')
								//.filter(function(d) {  return   parseInt(this.getAttribute("id").split("-").pop())==parentIndexPrevoiusDragChild;});// 
								.filter(function(d) {  return   parseInt(this.getAttribute("parentId") )==parentIndexPrevoiusDragChild;});// 
								
								var prevPolygonsChildCells = prevPolygonsChildGroup.data(arrCellsPrev)
								.attr("id", function(d,i){ return "childVorCell"+ childNodes[PreviuosParentChildren[arrCellsPrev.indexOf(d)]].n  ; } )//+"-"+ parentIndexPrevoiusDragChild 
								.attr("parentId", function(d,i){ return parentIndexPrevoiusDragChild} )	
								.attr("d", renderCell).style('fill-opacity', 0.8);
								 
								prevPolygonsChildCells.exit()
								.remove();
								
								
								 prevPolygonsChildCells.selectAll("path")
								 .attr("class", "polygonsChild")
								.attr('fill', parentCellsColors[parentIndexPrevoiusDragChild])  
								.style('fill-opacity', 0.8)
								.attr('class', 'polygonsChild').lower();
											
								////////////////////
								var parentChildren=parentChildrenMap.get(parentIndexCurrentDragChild);	
								parentChildren=getGroupSizeSubChildren(parentChildren);	
			//					console.log("2parentChildren");
			//					console.log(parentChildren);
								moveChildrenPositionInsideOneParent(parentIndexCurrentDragChild);
								var subChildrenNodes=[]; 
								subChildrenNodes.length=0;
								for(var i=0;i<parentChildren.length;i++){
								   var nodeData=childNodes[parentChildren[i]];
								   subChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
								}
								
								//subChildrenNodes.sort((a, b) => (a.n > b.n) ? 1 : -1);
								
								///////////////////
								var delaunay = d3.Delaunay.from(subChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
								var diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 
								var arrCells2=[];
								arrCells2.length=0;
								//arrCells2=clippBoundaryCellsOfParentCell(diagram, parentIndexCurrentDragChild); 
								arrCells2=clippBoundaryCellsOfParentCellCollapsed(diagram, parentIndexCurrentDragChild, parentChildren);
								///////////////////
								
								//d3.select("#childVorCell"+ selectedNodeIndex+"-"+ parentIndexPrevoiusDragChild).remove(); 
								//parentLayer.select("#childVorCell"+ selectedNodeIndex+"-"+ parentIndexPrevoiusDragChild).attr("id","childVorCell"+ selectedNodeIndex+"-"+ parentIndexCurrentDragChild); 
								
								var currPolygonsChildGroup = parentLayer.selectAll('.polygonsChild')
				//				.filter(function(d) { return   parseInt(this.getAttribute("id").split("-").pop())==parentIndexCurrentDragChild;});// 
								.filter(function(d) { return   parseInt(this.getAttribute("parentId"))==parentIndexCurrentDragChild;});// 
								
								var currPolygonsChildCells = currPolygonsChildGroup.data(arrCells2)                    
								.attr("id", function(d,i){ return "childVorCell"+ childNodes[parentChildren[arrCells2.indexOf(d)]].n  ; } ) //+"-"+ parentIndexCurrentDragChild 
								.attr("parentId", function(d,i){ return parentIndexCurrentDragChild} )
								.attr("d", renderCell).style('fill-opacity', 0.8);
								
								
								 //currPolygonsChildCells.enter().append("path");
								 

								
								//var u= currPolygonsChildCells.selectAll("path");
							  
								currPolygonsChildCells.enter().append('path')
								.attr('d', renderCell)
								.merge(currPolygonsChildCells)
							   .attr("class", "polygonsChild")
								.attr("id", function(d,i){ return "childVorCell"+ childNodes[parentChildren[arrCells2.indexOf(d)]].n  ; } )//+"-"+ parentIndexCurrentDragChild 
								.attr("parentId", function(d,i){ return parentIndexCurrentDragChild} )
								.attr('fill', function(d){   return parentCellsColors[parentIndexCurrentDragChild];})  
								.style('fill-opacity', 0.8);
														  
							   currPolygonsChildCells.exit().remove();
								
								
								parentLayer.selectAll('.rectsChild')//.selectAll("rect")
								.attr("x", function (d) { return (childNodes[d.n].x)  - (imageWidthInitial/2); }) // x position of rect node
								.attr("y", function (d) { return (childNodes[d.n].y) - (rectChildHeightInitial/2); });
								
								parentLayer.selectAll('.imagesChild')
								.attr("x", function (d) { return (childNodes[d.n].x) - (imageWidthInitial/2)  ; } ) //+(imageWidthInitial/2) x position of image (center) +(imageWidthInitial/2)
								.attr("y", function (d) { return (childNodes[d.n].y) - (imageHeightInitial/2)  ; } );
								
								parentLayer.selectAll('.textChild')//.selectAll("text")
									.attr("x", function (d) { return (childNodes[d.n].x -3); }) // x position of rect node
									.attr("y", function (d) { return (childNodes[d.n].y -3); }) 
									.text(function(d,i) { return d.n;});
								
																
							
								var indexLocalOfCurrentNod= parentChildren.indexOf(parseInt(selectedNodeIndex));
								console.log(selectedNodeIndex+"indexLocalOfCurrentNod"+indexLocalOfCurrentNod);
								console.log(parentChildren);
								console.log(arrCells2[indexLocalOfCurrentNod]);
																	
								  
						
								
								d3.selectAll('.polygonsChild').lower();
								d3.select("#childVorCell"+selectedNodeIndex).raise();	//+"-"+ parentIndexCurrentDragChild

								d3.selectAll("image").style("opacity", imagesObacity);
								parentLayer.selectAll(".imagesChild").raise();
								parentLayer.selectAll("rect").raise();

								d3.select("#childVorCell"+ selectedNodeIndex)
								.style('fill', parentCellsColors[parentIndexStartDragChild]);
							
								}
								
							}
			/////////////////////////////////////////					
								
							
							}else if(parentIndexCurrentDragChild==parentIndexPrevoiusDragChild){
											
								dragChildInParentCell(d, selectedNodeIndex, parentIndexStartDragChild,parentIndexCurrentDragChild);
								
								/*console.log("equal parentIndexPrevoiusDragChild "+parentIndexPrevoiusDragChild);
								
								var parentChildren=parentChildrenMap.get(parentIndexCurrentDragChild);	
								parentChildren=getGroupSizeSubChildren(parentChildren);
								
								console.log("parentChildren");
								console.log(parentChildren);
								
								var subChildrenNodes=[]; 
								subChildrenNodes.length=0;
								for(var i=0;i<parentChildren.length;i++){
								   var nodeData=childNodes[parentChildren[i]];
								   subChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
								}
								
								
								delaunay = d3.Delaunay.from(subChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
								diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 

								var arrCells2=[];
								arrCells2.length=0;
								arrCells2=clippBoundaryCellsOfParentCell(diagram, parentIndexCurrentDragChild); 
								
							
								var polygonsChildGroup = parentLayer.selectAll('.polygonsChild')
			//					.filter(function(d) {return   parseInt(this.getAttribute("id").split("-").pop())==parentIndexCurrentDragChild;});// 
								.filter(function(d) {return   parseInt(this.getAttribute("parentId") )==parentIndexCurrentDragChild;}); 
								
								var polygonsChildCells = polygonsChildGroup.data(arrCells2)
								.attr("id", function(d,i){ return "childVorCell"+ childNodes[parentChildren[arrCells2.indexOf(d)]].n  ; } )//+"-"+ parentIndexCurrentDragChild 
								.attr("parentId", function(d,i){ return parentIndexCurrentDragChild} )					
								.attr("d", renderCell).style('fill-opacity', 0.8);
								
								
								polygonsChildCells.selectAll("path")
								//.attr('fill', parentCellsColors[parentIndexCurrentDragChild]) 
								.style ('fill', parentCellsColors[parentIndexCurrentDragChild]) 
								.style('fill-opacity', 0.8)
								.attr('class', 'polygonsChild').lower();
								//.attr('fill', "none" );	


                                for(var i=0;i<parentChildren.length;i++){
									var strWidth= 0.2;
									var currColor=parentCellsColors[parentIndexCurrentDragChild]
                                    if(selectedNodeIndex==parentChildren[i]){
								      strWidth=3;
									  currColor=parentCellsColors[parentIndexStartDragChild];
								    }	
									
								    d3.select("#childVorCell"+parentChildren[i]) 
								    .style ('fill', currColor)	
								    .style('stroke-fill', "gray")
								    .style('stroke-width', strWidth)
								    .style('stroke-opacity',childrenVoronoiEdgesObacity);
								   
								}
								
								
                                //d3.select("#childVorCell"+selectedNodeIndex)	
                                //.style ('fill', parentCellsColors[parentIndexStartDragChild]) ;
								//.style('stroke-fill', "gray")
								//.style('stroke-width', 3)
							    //.style('stroke-opacity',childrenVoronoiEdgesObacity);
																
								
								parentLayer.selectAll('.rectsChild')//.selectAll("rect")
								.attr("x", function (d) { return (childNodes[d.n].x)-rectChildWidthInitial  *0.5; }) // x position of rect node
								.attr("y", function (d) { return (childNodes[d.n].y)-rectChildHeightInitial  *0.5; });
								
								
								parentLayer.selectAll('.imagesChild')
								.attr("x", function (d) { return (childNodes[d.n].x) - imageWidthInitial  *0.5  ; } ) //+(imageWidthInitial/2) x position of image (center) +(imageWidthInitial/2)
								.attr("y", function (d) { return (childNodes[d.n].y) - imageHeightInitial *0.5  ; } );
								
			//					parentLayer.selectAll('.textChild')//.selectAll("text")
			//						.attr("x", function (d) { return (childNodes[d.n].x )-rectChildWidthInitial  *0.5; }) // x position of rect node
			//						.attr("y", function (d) { return (childNodes[d.n].y)-rectChildHeightInitial  *0.5; }) // 
									//.text(function(d,i) { return d.n;});
			//			            .text(function(d,i) { return d.txt;});
									
								
								for(var i=0;i<childNodes.length;i++){
									 //var nodeIndex= parentChildren[i];
									 //var node=childNodes[nodeIndex];
									 d3.select("#childTextname"+i)
									 .attr("x", function (d) { return (childNodes[i].x ) -rectChildWidthInitial  *0.5; }) // x position of rect node
									 .attr("y", function (d) { return (childNodes[i].y) -rectChildHeightInitial  *0.5;  }) // 
									 .text(function(d,i) { return d.txt;});
								}

			//wrapAllTextRect();
							try{
							  wrapAllTextRect();
							}catch(e){

							}	


								parentLayer.selectAll('.polygonsChild').lower();
								polygonsChildCells.selectAll('.polygonsChild').lower();
								d3.selectAll('.polygonsChild').lower();
								d3.selectAll("image").style("opacity", imagesObacity);
								parentLayer.selectAll(".imagesChild").raise();
								parentLayer.selectAll("rect").raise();
								parentLayer.selectAll('.textChild').raise();
			 
								*/
							}else if(isCreateGroup){
								console.log("not equal parentIndexPrevoiusDragChild "+parentIndexPrevoiusDragChild);
											   
								//var groupPrevius = parentCellsChildrenLayersMap.get(parentIndexPrevoiusDragChild);	
								//d3.select("#gParentChildren"+parentIndexPrevoiusDragChild).select("#gChild-"+selectedNodeIndex).remove();									   
								
								updateHierarchy(selectedNodeIndex, parentIndexPrevoiusDragChild, parentIndexCurrentDragChild);
								//storeParentPolygonsInMap();
								
								
								
								var PreviuosParentChildren=parentChildrenMap.get(parentIndexPrevoiusDragChild);	
								PreviuosParentChildren=getGroupSizeSubChildren(PreviuosParentChildren);
								console.log("PreviuosParentChildren");
								console.log(PreviuosParentChildren);
								
								var parentChildren=parentChildrenMap.get(parentIndexCurrentDragChild);	
								parentChildren=getGroupSizeSubChildren(parentChildren);
								console.log("parentChildren");
								console.log(parentChildren);
								
								var presubChildrenNodes=[]; 
								presubChildrenNodes.length=0;
								for(var i=0;i<PreviuosParentChildren.length;i++){
								   var nodeData=childNodes[PreviuosParentChildren[i]];
								   presubChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
								}
								
								///////////////////
								var delaunayPrev = d3.Delaunay.from(presubChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
								var diagramPrev = delaunayPrev.voronoi([0,0,voronoiWidth,voronoiHeight]); 
								var arrCellsPrev=[];
								arrCellsPrev.length=0;
								arrCellsPrev=clippBoundaryCellsOfParentCell(diagramPrev, parentIndexPrevoiusDragChild); 
								///////////////////
								
								var prevPolygonsChildGroup = parentLayer.selectAll('.polygonsChild')
								//.filter(function(d) {  return   parseInt(this.getAttribute("id").split("-").pop())==parentIndexPrevoiusDragChild;});// 
								.filter(function(d) {  return   parseInt(this.getAttribute("parentId") )==parentIndexPrevoiusDragChild;});// 
								
								var prevPolygonsChildCells = prevPolygonsChildGroup.data(arrCellsPrev)
								.attr("id", function(d,i){ return "childVorCell"+ childNodes[PreviuosParentChildren[arrCellsPrev.indexOf(d)]].n  ; } )//+"-"+ parentIndexPrevoiusDragChild 
								.attr("parentId", function(d,i){ return parentIndexPrevoiusDragChild} )	
								.attr("d", renderCell).style('fill-opacity', 0.8);
								 
								prevPolygonsChildCells.exit()
								.remove();
								
								
								 prevPolygonsChildCells.selectAll("path")
								 .attr("class", "polygonsChild")
								 .attr('fill', parentCellsColors[parentIndexPrevoiusDragChild])  
								 .style('fill-opacity', 0.8)
								 .attr('class', 'polygonsChild')
								 .style('stroke-fill', "gray")
								 .style('stroke-width', 0.2)
		                         .style('stroke-opacity',childrenVoronoiEdgesObacity)
								 .lower();
								
								
								for(var i=0;i<PreviuosParentChildren.length;i++){								
									 d3.select("#childVorCell"+PreviuosParentChildren[i]) 
                                    .style ('fill', parentCellsColors[parentIndexPrevoiusDragChild])	
									.style('stroke-fill', "gray")
								    .style('stroke-width',  0.2)
		                            .style('stroke-opacity',childrenVoronoiEdgesObacity);								
								}
								
								           
								////////////////////
								parentChildren=parentChildrenMap.get(parentIndexCurrentDragChild);	
								//console.log("1parentChildren");
								//console.log(parentChildren);
								parentChildren=getGroupSizeSubChildren(parentChildren);
								console.log("2parentChildren");
								console.log(parentChildren);
								
								var subChildrenNodes=[]; 
								subChildrenNodes.length=0;
								for(var i=0;i<parentChildren.length;i++){
								   var nodeData=childNodes[parentChildren[i]];
								   subChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
								}
								
								//subChildrenNodes.sort((a, b) => (a.n > b.n) ? 1 : -1);
								
								///////////////////
								var delaunay = d3.Delaunay.from(subChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
								var diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 
								var arrCells2=[];
								arrCells2.length=0;
								arrCells2=clippBoundaryCellsOfParentCell(diagram, parentIndexCurrentDragChild); 
								///////////////////
								
								//d3.select("#childVorCell"+ selectedNodeIndex+"-"+ parentIndexPrevoiusDragChild).remove(); 
								//parentLayer.select("#childVorCell"+ selectedNodeIndex+"-"+ parentIndexPrevoiusDragChild).attr("id","childVorCell"+ selectedNodeIndex+"-"+ parentIndexCurrentDragChild); 
								
								var currPolygonsChildGroup = parentLayer.selectAll('.polygonsChild')
				//				.filter(function(d) { return   parseInt(this.getAttribute("id").split("-").pop())==parentIndexCurrentDragChild;});// 
								.filter(function(d) { return   parseInt(this.getAttribute("parentId"))==parentIndexCurrentDragChild;});// 
								
								var currPolygonsChildCells = currPolygonsChildGroup.data(arrCells2)                    
								.attr("id", function(d,i){ return "childVorCell"+ childNodes[parentChildren[arrCells2.indexOf(d)]].n  ; } ) //+"-"+ parentIndexCurrentDragChild 
								.attr("parentId", function(d,i){ return parentIndexCurrentDragChild} )
								.attr("d", renderCell).style('fill-opacity', 0.8);
								
								
								 //currPolygonsChildCells.enter().append("path");
								 
								currPolygonsChildCells.selectAll("path")
								.attr("d", renderCell)
								.attr("class", "polygonsChild")
								.attr("id", function(d,i){ return "childVorCell"+ childNodes[parentChildren[arrCells2.indexOf(d)]].n  ; } )//+"-"+ parentIndexCurrentDragChild 
								.attr("parentId", function(d,i){ return parentIndexCurrentDragChild} )
								.attr('fill', parentCellsColors[parentIndexCurrentDragChild])  
								.style('fill-opacity', 0.8);
								//.attr('class', 'polygonsChild').lower();
								
								
								
								parentLayer.selectAll('.rectsChild')//.selectAll("rect")
								.attr("x", function (d) { return (childNodes[d.n].x)-rectChildWidthInitial  *0.5; }) // x position of rect node
								.attr("y", function (d) { return (childNodes[d.n].y)-rectChildHeightInitial  *0.5; });
								
								parentLayer.selectAll('.imagesChild')
								.attr("x", function (d) { return (childNodes[d.n].x) - imageWidthInitial  *0.5  ; } ) //+(imageWidthInitial/2) x position of image (center) +(imageWidthInitial/2)
								.attr("y", function (d) { return (childNodes[d.n].y) - imageHeightInitial *0.5  ; } );
								
								parentLayer.selectAll('.textChild')//.selectAll("text")
									.attr("x", function (d) { return (childNodes[d.n].x ); }) //-rectChildWidthInitial  *0.5 x position of rect node
									.attr("y", function (d) { return (childNodes[d.n].y ); }) //-rectChildHeightInitial  *0.5
									//.text(function(d,i) { return d.n;});
									.text(function(d,i) { return d.txt;});
																
							
								var indexLocalOfCurrentNod= parentChildren.indexOf(parseInt(selectedNodeIndex));
								console.log(selectedNodeIndex+"indexLocalOfCurrentNod"+indexLocalOfCurrentNod);
								console.log(parentChildren);
								console.log(arrCells2[indexLocalOfCurrentNod]);
								
								try{
								parentLayer.append("path")
								 .data(Array.from(arrCells2[indexLocalOfCurrentNod]))
							   .attr('d', renderCell)
							   .attr("class", "polygonsChild")
							   .attr("id", function(d,i){ return "childVorCell"+ selectedNodeIndex ;} )//i  +"-"+ parentIndexCurrentDragChild  
							   .attr("parentId", function(d,i){ return parentIndexCurrentDragChild} )				   
							   .style ('fill', parentCellsColors[parentIndexStartDragChild]) // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
							   .style('stroke', "gray")
							   //.style('stroke-width', 3)
							   .style('stroke-opacity',parentVoronoiEdgesObacity)
							   .style('fill-opacity', 0.8);
								}catch(e){
								}
								d3.selectAll('.polygonsChild').lower();
								d3.select("#childVorCell"+selectedNodeIndex).raise();	//+"-"+ parentIndexCurrentDragChild

								d3.selectAll("image").style("opacity", imagesObacity);
								parentLayer.selectAll("rect").raise();
								parentLayer.selectAll(".imagesChild").raise();
								
								
							}				
							
							parentIndexPrevoiusDragChild=parentIndexCurrentDragChild;
						}
						
						
						}
						
						//console.log("dragging="+(timetmp-prevDragtime));
						//console.log(firstDragFlag+"dragging" +timetmp);
						 
						//prevDragtime=timetmp;
                 }	
}

if(freeRepresentiveParentNodes.indexOf(parentIndexStartDragChild)!=-1 ){ 
	 handleMoveFreeRepresentitive(d,parentId, selectedNodeIndex, xMouseCoordinate, yMouseCoordinate, selectedRect);
}else if(parentChildren.length==1 && !isCollapsedParentNode(parentIndexCurrentDragChild)){
	           /*if(firstDragFlag){
			      console.log("drag  Collapse");
			      firstDragFlag=false;	
                  //if(teleportCounter==0 && parentTargetTeleport==-1)				  
			        runCollapse(d);	
			   }else if( !firstDragFlag){
				  console.log("draging parent"+parentIndexStartDragChild);
				  //dragParentByCopyParentnode(parentIndexStartDragChild, xMouseCoordinate, yMouseCoordinate);
				  //if(teleportCounter==0 && parentTargetTeleport==-1)
				    dragParentByBubbleSimulation(d, parentIndexStartDragChild, xMouseCoordinate, yMouseCoordinate)				
			   }*/
}
 
}

}


//function dragChildInParentCell(d,parentId,selectedNodeIndex,selectedRect,parentIndexStartDragChild,xMouseCoordinate,yMouseCoordinate){
function  dragChildInParentCell(d, selectedNodeIndex, parentIndexStartDragChild,parentIndexCurrentDragChild){                             
							    console.log("dragChildInParentCell ");
								
								console.log("equal parentIndexPrevoiusDragChild "+parentIndexPrevoiusDragChild);
								
								var parentChildren=parentChildrenMap.get(parentIndexCurrentDragChild);	
								parentChildren=getGroupSizeSubChildren(parentChildren);
								
								console.log("parentChildren");
								console.log(parentChildren);
								
								var subChildrenNodes=[]; 
								subChildrenNodes.length=0;
								for(var i=0;i<parentChildren.length;i++){
								   var nodeData=childNodes[parentChildren[i]];
								   subChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
								}
								
								
								delaunay = d3.Delaunay.from(subChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
								diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 

								var arrCells2=[];
								arrCells2.length=0;
								arrCells2=clippBoundaryCellsOfParentCell(diagram, parentIndexCurrentDragChild); 
								
							
								var polygonsChildGroup = parentLayer.selectAll('.polygonsChild')
			//					.filter(function(d) {return   parseInt(this.getAttribute("id").split("-").pop())==parentIndexCurrentDragChild;});// 
								.filter(function(d) {return   parseInt(this.getAttribute("parentId") )==parentIndexCurrentDragChild;}); 
								
								var polygonsChildCells = polygonsChildGroup.data(arrCells2)
								.attr("id", function(d,i){ return "childVorCell"+ childNodes[parentChildren[arrCells2.indexOf(d)]].n  ; } )//+"-"+ parentIndexCurrentDragChild 
								.attr("parentId", function(d,i){ return parentIndexCurrentDragChild} )					
								.attr("d", renderCell).style('fill-opacity', 0.8);
								
								
								polygonsChildCells.selectAll("path")
								//.attr('fill', parentCellsColors[parentIndexCurrentDragChild]) 
								.style ('fill', parentCellsColors[parentIndexCurrentDragChild]) 
								.style('fill-opacity', 0.8)
								.attr('class', 'polygonsChild').lower();
								//.attr('fill', "none" );	


                                for(var i=0;i<parentChildren.length;i++){
									var strWidth= 0.2;
									var currColor=parentCellsColors[parentIndexCurrentDragChild]
                                    if(selectedNodeIndex==parentChildren[i]){
								      strWidth=3;
									  currColor=parentCellsColors[parentIndexStartDragChild];
								    }	
									
								    d3.select("#childVorCell"+parentChildren[i]) 
								    .style ('fill', currColor)	
								    .style('stroke-fill', "gray")
								    .style('stroke-width', strWidth)
								    .style('stroke-opacity',childrenVoronoiEdgesObacity);
								   
								}
								
								
                                //d3.select("#childVorCell"+selectedNodeIndex)	
                                //.style ('fill', parentCellsColors[parentIndexStartDragChild]) ;
								//.style('stroke-fill', "gray")
								//.style('stroke-width', 3)
							    //.style('stroke-opacity',childrenVoronoiEdgesObacity);
																
								
								parentLayer.selectAll('.rectsChild')//.selectAll("rect")
								.attr("x", function (d) { return (childNodes[d.n].x)-rectChildWidthInitial  *0.5; }) // x position of rect node
								.attr("y", function (d) { return (childNodes[d.n].y)-rectChildHeightInitial  *0.5; });
								
								
								parentLayer.selectAll('.imagesChild')
								.attr("x", function (d) { return (childNodes[d.n].x) - imageWidthInitial  *0.5  ; } ) //+(imageWidthInitial/2) x position of image (center) +(imageWidthInitial/2)
								.attr("y", function (d) { return (childNodes[d.n].y) - imageHeightInitial *0.5  ; } );
								
			//					parentLayer.selectAll('.textChild')//.selectAll("text")
			//						.attr("x", function (d) { return (childNodes[d.n].x )-rectChildWidthInitial  *0.5; }) // x position of rect node
			//						.attr("y", function (d) { return (childNodes[d.n].y)-rectChildHeightInitial  *0.5; }) // 
									//.text(function(d,i) { return d.n;});
			//			            .text(function(d,i) { return d.txt;});
									
								
								for(var i=0;i<childNodes.length;i++){
									 //var nodeIndex= parentChildren[i];
									 //var node=childNodes[nodeIndex];
									 d3.select("#childTextname"+i)
									 .attr("x", function (d) { return (childNodes[i].x ) -rectChildWidthInitial  *0.5; }) // x position of rect node
									 .attr("y", function (d) { return (childNodes[i].y) -rectChildHeightInitial  *0.5;  }) // 
									 .text(function(d,i) { return d.txt;});
								}

		   	                //wrapAllTextRect();
							try{
							  wrapAllTextRect();
							}catch(e){

							}	


								parentLayer.selectAll('.polygonsChild').lower();
								polygonsChildCells.selectAll('.polygonsChild').lower();
								d3.selectAll('.polygonsChild').lower();
								d3.selectAll("image").style("opacity", imagesObacity);
								
								parentLayer.selectAll("rect").raise();
								parentLayer.selectAll('.textChild').raise();
								parentLayer.selectAll(".imagesChild").raise();

	
}



function handleMoveFreeRepresentitive(d,parentId, selectedNodeIndex, xMouseCoordinate, yMouseCoordinate, selectedRect){
	
						console.log("handleMoveFreeRepresentitive");	
						
						var isInsideViewBoundary=d3.polygonContains([[0,0], [0,voronoiHeight], [voronoiWidth, voronoiHeight], [voronoiWidth,0]], [xMouseCoordinate, yMouseCoordinate]);
						console.log("isInsideViewBoundary="+isInsideViewBoundary);
						
						var parentSourceTeleport = findParentPolygon(xMouseCoordinate,yMouseCoordinate);//parentId;//			
			            console.log("drag tele="+teleportCounter);
			            console.log(parentSourceTeleport);
			            console.log(parentTargetTeleport);
									
			
						if(parentTargetTeleport!=-1 ){
				 
							 ++teleportCounter;
							 if(teleportCounter==1 && parentTargetTeleport!=parentSourceTeleport){
								var keysOfCurrentMap=Array.from(parentPolygonsMap.keys());
								//console.log(keysOfCurrentMap);
								var parentPolygon=parentPolygonsMap.get(parentTargetTeleport);
								var  parentPolygonTurf= turf.polygon([parentPolygon]);								  					  
								var centerInfo = turf.centerOfMass(parentPolygonTurf);
								
								//console.log(centerInfo["geometry"]["coordinates"][0] +" "+centerInfo["geometry"]["coordinates"][1]);
								var targetParentPolygoneCenetrX=parseFloat( centerInfo["geometry"]["coordinates"][0]);
								var targetParentPolygoneCenetrY=parseFloat( centerInfo["geometry"]["coordinates"][1]);
								
								childNodes[selectedNodeIndex].x=targetParentPolygoneCenetrX;
								childNodes[selectedNodeIndex].y=targetParentPolygoneCenetrY;
								 
								
								selectedRect.attr("x", d.x = targetParentPolygoneCenetrX ).attr("y", d.y = targetParentPolygoneCenetrY );
								parentSourceTeleportGlobal=parentSourceTeleport;
								//teleportChidCell(selectedNodeIndex, parentSourceTeleport , parentTargetTeleport);							    
								//teleportLastChidCell(selectedNodeIndex, parentSourceTeleport , parentTargetTeleport);
							    
								updateHierarchy(selectedNodeIndex, parentSourceTeleport, parentTargetTeleport);
							 }
							 
							 
						}else if(firstDragFlag){
							
						if(isInsideViewBoundary) {
											
							var parentIndexCurrentDragChild = findParentPolygon(xMouseCoordinate,yMouseCoordinate);
							console.log("parentIndexCurrentDragChild "+parentIndexCurrentDragChild);
							
							if(isCreateGroup==true || parentId ==parentIndexCurrentDragChild){	
							  childNodes[selectedNodeIndex].x= xMouseCoordinate;
							  childNodes[selectedNodeIndex].y= yMouseCoordinate;     
							  selectedRect.attr("x", d.x = xMouseCoordinate).attr("y", d.y = yMouseCoordinate);
							}
							
							
							
							var checkCollapsedParent= isCollapsedParentNode(parentIndexCurrentDragChild);
							console.log("checkCollapsedParent");
							console.log(checkCollapsedParent);	
							
							var repres=isRepresentativeNode(selectedNodeIndex);
							
							
							
							if(parentIndexCurrentDragChild==parentIndexPrevoiusDragChild){
											
								console.log("equal parentIndexPrevoiusDragChild "+parentIndexPrevoiusDragChild);
								
								var parentChildren=parentChildrenMap.get(parentIndexCurrentDragChild);	
								parentChildren=getGroupSizeSubChildren(parentChildren);
								
								console.log("parentChildren");
								console.log(parentChildren);
								
								var subChildrenNodes=[]; 
								subChildrenNodes.length=0;
								for(var i=0;i<parentChildren.length;i++){
								   var nodeData=childNodes[parentChildren[i]];
								   subChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
								}
								
								
								delaunay = d3.Delaunay.from(subChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
								diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 

								var arrCells2=[];
								arrCells2.length=0;
								arrCells2=clippBoundaryCellsOfParentCell(diagram, parentIndexCurrentDragChild); 
								
							
								var polygonsChildGroup = parentLayer.selectAll('.polygonsChild')
			//					.filter(function(d) {return   parseInt(this.getAttribute("id").split("-").pop())==parentIndexCurrentDragChild;});// 
								.filter(function(d) {return   parseInt(this.getAttribute("parentId") )==parentIndexCurrentDragChild;}); 
								
								var polygonsChildCells = polygonsChildGroup.data(arrCells2)
								.attr("id", function(d,i){ return "childVorCell"+ childNodes[parentChildren[arrCells2.indexOf(d)]].n  ; } )//+"-"+ parentIndexCurrentDragChild 
								.attr("parentId", function(d,i){ return parentIndexCurrentDragChild} )					
								.attr("d", renderCell).style('fill-opacity', 0.8);
								
								
								polygonsChildCells.selectAll("path")
								.attr('fill', parentCellsColors[parentIndexCurrentDragChild])  
								.style('fill-opacity', 0.8)
								.attr('class', 'polygonsChild').lower();
								//.attr('fill', "none" );					
								
								parentLayer.selectAll('.rectsChild')//.selectAll("rect")
								.attr("x", function (d) { return (childNodes[d.n].x)-rectChildWidthInitial  *0.5; }) // x position of rect node
								.attr("y", function (d) { return (childNodes[d.n].y)-rectChildHeightInitial  *0.5; });
								
								
								parentLayer.selectAll('.imagesChild')
								.attr("x", function (d) { return (childNodes[d.n].x) - imageWidthInitial  *0.5  ; } ) //+(imageWidthInitial/2) x position of image (center) +(imageWidthInitial/2)
								.attr("y", function (d) { return (childNodes[d.n].y) - imageHeightInitial *0.5  ; } );
								
			//					parentLayer.selectAll('.textChild')//.selectAll("text")
			//						.attr("x", function (d) { return (childNodes[d.n].x )-rectChildWidthInitial  *0.5; }) // x position of rect node
			//						.attr("y", function (d) { return (childNodes[d.n].y)-rectChildHeightInitial  *0.5; }) // 
									//.text(function(d,i) { return d.n;});
			//			            .text(function(d,i) { return d.txt;});
									
								
								for(var i=0;i<childNodes.length;i++){
									 //var nodeIndex= parentChildren[i];
									 //var node=childNodes[nodeIndex];
									 d3.select("#childTextname"+i)
									 .attr("x", function (d) { return (childNodes[i].x ) -rectChildWidthInitial  *0.5; }) // x position of rect node
									 .attr("y", function (d) { return (childNodes[i].y) -rectChildHeightInitial  *0.5;  }) // 
									 .text(function(d,i) { return d.txt;});
								}

			//wrapAllTextRect();
							try{
							  wrapAllTextRect();
							}catch(e){

							}	


								parentLayer.selectAll('.polygonsChild').lower();
								polygonsChildCells.selectAll('.polygonsChild').lower();
								d3.selectAll('.polygonsChild').lower();
								d3.selectAll("image").style("opacity", imagesObacity);
								parentLayer.selectAll(".imagesChild").raise();
								parentLayer.selectAll("rect").raise();
								parentLayer.selectAll('.textChild').raise();
			 
								
							}else if(isCreateGroup){
								console.log("not equal parentIndexPrevoiusDragChild "+parentIndexPrevoiusDragChild);
											   
								//var groupPrevius = parentCellsChildrenLayersMap.get(parentIndexPrevoiusDragChild);	
								//d3.select("#gParentChildren"+parentIndexPrevoiusDragChild).select("#gChild-"+selectedNodeIndex).remove();									   
								
								updateHierarchy(selectedNodeIndex, parentIndexPrevoiusDragChild, parentIndexCurrentDragChild);
								//storeParentPolygonsInMap();
								
								
								
								var PreviuosParentChildren=parentChildrenMap.get(parentIndexPrevoiusDragChild);
								if(PreviuosParentChildren!=null && PreviuosParentChildren!=undefined&& PreviuosParentChildren.length>0){
									console.log("PreviuosParentChildren" );
									console.log(parentIndexPrevoiusDragChild );
									console.log(PreviuosParentChildren );
									PreviuosParentChildren=getGroupSizeSubChildren(PreviuosParentChildren);
									console.log("PreviuosParentChildren");
									console.log(PreviuosParentChildren);
									var presubChildrenNodes=[]; 
									presubChildrenNodes.length=0;
									for(var i=0;i<PreviuosParentChildren.length;i++){
									   var nodeData=childNodes[PreviuosParentChildren[i]];
									   presubChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
									}
								
								    
																	///////////////////
									var delaunayPrev = d3.Delaunay.from(presubChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
									var diagramPrev = delaunayPrev.voronoi([0,0,voronoiWidth,voronoiHeight]); 
									var arrCellsPrev=[];
									arrCellsPrev.length=0;
									arrCellsPrev=clippBoundaryCellsOfParentCell(diagramPrev, parentIndexPrevoiusDragChild); 
									///////////////////
									
									var prevPolygonsChildGroup = parentLayer.selectAll('.polygonsChild')
									//.filter(function(d) {  return   parseInt(this.getAttribute("id").split("-").pop())==parentIndexPrevoiusDragChild;});// 
									.filter(function(d) {  return   parseInt(this.getAttribute("parentId") )==parentIndexPrevoiusDragChild;});// 
									
									var prevPolygonsChildCells = prevPolygonsChildGroup.data(arrCellsPrev)
									.attr("id", function(d,i){ return "childVorCell"+ childNodes[PreviuosParentChildren[arrCellsPrev.indexOf(d)]].n  ; } )//+"-"+ parentIndexPrevoiusDragChild 
									.attr("parentId", function(d,i){ return parentIndexPrevoiusDragChild} )	
									.attr("d", renderCell).style('fill-opacity', 0.8);
									 
									prevPolygonsChildCells.exit()
									.remove();
									
									
									 prevPolygonsChildCells.selectAll("path")
									 .attr("class", "polygonsChild")
									.attr('fill', parentCellsColors[parentIndexPrevoiusDragChild])  
									.style('fill-opacity', 0.8)
									.attr('class', 'polygonsChild').lower();
								
								
								}
								
								var parentChildren=parentChildrenMap.get(parentIndexCurrentDragChild);	
								parentChildren=getGroupSizeSubChildren(parentChildren);
								console.log("parentChildren");
								console.log(parentChildren);
								
								
								

											
								////////////////////
								parentChildren=parentChildrenMap.get(parentIndexCurrentDragChild);	
								//console.log("1parentChildren");
								//console.log(parentChildren);
								parentChildren=getGroupSizeSubChildren(parentChildren);
								console.log("2parentChildren");
								console.log(parentChildren);
								
								var subChildrenNodes=[]; 
								subChildrenNodes.length=0;
								for(var i=0;i<parentChildren.length;i++){
								   var nodeData=childNodes[parentChildren[i]];
								   subChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
								}
								
								//subChildrenNodes.sort((a, b) => (a.n > b.n) ? 1 : -1);
								
								///////////////////
								var delaunay = d3.Delaunay.from(subChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
								var diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 
								var arrCells2=[];
								arrCells2.length=0;
								arrCells2=clippBoundaryCellsOfParentCell(diagram, parentIndexCurrentDragChild); 
								///////////////////
								
								//d3.select("#childVorCell"+ selectedNodeIndex+"-"+ parentIndexPrevoiusDragChild).remove(); 
								//parentLayer.select("#childVorCell"+ selectedNodeIndex+"-"+ parentIndexPrevoiusDragChild).attr("id","childVorCell"+ selectedNodeIndex+"-"+ parentIndexCurrentDragChild); 
								
								var currPolygonsChildGroup = parentLayer.selectAll('.polygonsChild')
				//				.filter(function(d) { return   parseInt(this.getAttribute("id").split("-").pop())==parentIndexCurrentDragChild;});// 
								.filter(function(d) { return   parseInt(this.getAttribute("parentId"))==parentIndexCurrentDragChild;});// 
								
								var currPolygonsChildCells = currPolygonsChildGroup.data(arrCells2)                    
								.attr("id", function(d,i){ return "childVorCell"+ childNodes[parentChildren[arrCells2.indexOf(d)]].n  ; } ) //+"-"+ parentIndexCurrentDragChild 
								.attr("parentId", function(d,i){ return parentIndexCurrentDragChild} )
								.attr("d", renderCell).style('fill-opacity', 0.8);
								
								
								 //currPolygonsChildCells.enter().append("path");
								 
								currPolygonsChildCells.selectAll("path")
								.attr("d", renderCell)
								.attr("class", "polygonsChild")
								.attr("id", function(d,i){ return "childVorCell"+ childNodes[parentChildren[arrCells2.indexOf(d)]].n  ; } )//+"-"+ parentIndexCurrentDragChild 
								.attr("parentId", function(d,i){ return parentIndexCurrentDragChild} )
								.attr('fill', parentCellsColors[parentIndexCurrentDragChild])  
								.style('fill-opacity', 0.8);
								//.attr('class', 'polygonsChild').lower();
								
								
								
								parentLayer.selectAll('.rectsChild')//.selectAll("rect")
								.attr("x", function (d) { return (childNodes[d.n].x)-rectChildWidthInitial  *0.5; }) // x position of rect node
								.attr("y", function (d) { return (childNodes[d.n].y)-rectChildHeightInitial  *0.5; });
								
								parentLayer.selectAll('.imagesChild')
								.attr("x", function (d) { return (childNodes[d.n].x) - imageWidthInitial  *0.5  ; } ) //+(imageWidthInitial/2) x position of image (center) +(imageWidthInitial/2)
								.attr("y", function (d) { return (childNodes[d.n].y) - imageHeightInitial *0.5  ; } );
								
								parentLayer.selectAll('.textChild')//.selectAll("text")
									.attr("x", function (d) { return (childNodes[d.n].x ); }) //-rectChildWidthInitial  *0.5 x position of rect node
									.attr("y", function (d) { return (childNodes[d.n].y ); }) //-rectChildHeightInitial  *0.5
									//.text(function(d,i) { return d.n;});
									.text(function(d,i) { return d.txt;});
																
							
								var indexLocalOfCurrentNod= parentChildren.indexOf(parseInt(selectedNodeIndex));
								console.log(selectedNodeIndex+"indexLocalOfCurrentNod"+indexLocalOfCurrentNod);
								console.log(parentChildren);
								console.log(arrCells2[indexLocalOfCurrentNod]);
								
								try{
								parentLayer.append("path")
								 .data(Array.from(arrCells2[indexLocalOfCurrentNod]))
							   .attr('d', renderCell)
							   .attr("class", "polygonsChild")
							   .attr("id", function(d,i){ return "childVorCell"+ selectedNodeIndex ;} )//i  +"-"+ parentIndexCurrentDragChild  
							   .attr("parentId", function(d,i){ return parentIndexCurrentDragChild} )				   
							   .style ('fill', parentCellsColors[parentIndexStartDragChild]) // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
							   .style('stroke', "gray")
							   .style('stroke-width', 3)
							   .style('stroke-opacity',parentVoronoiEdgesObacity)
							   .style('fill-opacity', 0.8);
								}catch(e){
								}
								d3.selectAll('.polygonsChild').lower();
								d3.select("#childVorCell"+selectedNodeIndex).raise();	//+"-"+ parentIndexCurrentDragChild

								d3.selectAll("image").style("opacity", imagesObacity);
								parentLayer.selectAll(".imagesChild").raise();
								parentLayer.selectAll("rect").raise();
								
							}				
							
							parentIndexPrevoiusDragChild=parentIndexCurrentDragChild;
						}

	                    }
}
	    
	   
	   function runCollapse(d){
		
   		 
	   
	   }
	   
	   
	   function runCollapseDoubleClick(d,parentIndexStartDragChildLocal, selectedNodeIndex ){
		        totalInitialNodesSize=counterVisSum();
				
				
		   		for(var index=0; index<parentCells.length ; ++index){ 
			        var sitePoly=parentCells[index].site;
			        var cell_id=sitePoly.originalObject.data.originalData.n; 
				    var cellPolygon=Array.from(sitePoly.polygon);
					for(var y=0; y<cellPolygon.length; ++y){	  
					    cellPolygon[y][0]= Math.max(cellPolygon[y][0], xmin);
					    cellPolygon[y][0]= Math.min(cellPolygon[y][0], xmax);					  
					    cellPolygon[y][1]= Math.max(cellPolygon[y][1], ymin);
					    cellPolygon[y][1]= Math.min(cellPolygon[y][1], ymax);	  
				    }
				   
				    var intersected =d3.polygonCentroid(cellPolygon);
				    parentNodes[cell_id].x=parseFloat( intersected[0]);
				    parentNodes[cell_id].y=parseFloat( intersected[1]);
				}
				
				
				parentNodes[parentIndexStartDragChildLocal].weight=1/totalInitialNodesSize ;
				
				if(prototypesChildrenNodes.indexOf(selectedNodeIndex)==-1)				   
				   prototypesChildrenNodes.push(selectedNodeIndex);
			


				
				
				
				for(var p=0; p<prototypesChildrenNodes.length ; ++p){					
				    //var collapseNodeId=childNodes[prototypesChildrenNodes[p]].n;					
				    //var collapseNodeParent=parseInt(d3.select("#childVorCell"+collapseNodeId).attr("parentId"));
				   	var collapseNodeParent=getParentByIdLocal(childNodes[prototypesChildrenNodes[p]].GroupID).n;	
					//parentNodes[collapseNodeParent].previousWeight=1/totalInitialNodesSize ;
				    parentNodes[collapseNodeParent].weight=1/totalInitialNodesSize ;				   				   
				}
				
				
				hideOneGroupChildren(parentIndexStartDragChildLocal, selectedNodeIndex);
				
				handleCollapesedParent(parentIndexStartDragChildLocal);
				
								
			   parentCells=computeWeightedInitialLoc0(parentNodes,parentChildrenMap,totalInitialNodesSize, [] ,polyCopyGlobal);	        			
				
				for(var p=0; p<prototypesChildrenNodes.length ; ++p){					
				    //var collapseNodeId=childNodes[prototypesChildrenNodes[p]].n;	  
				    //var collapseNodeParent=parseInt(d3.select("#childVorCell"+collapseNodeId).attr("parentId"));
				   	var collapseNodeParent=getParentByIdLocal(childNodes[prototypesChildrenNodes[p]].GroupID).n;	
  				    parentNodes[collapseNodeParent].previousWeight=1/totalInitialNodesSize ;
				    parentNodes[collapseNodeParent].weight=1/totalInitialNodesSize ;				   				   
				}
				
				parentNodes[parentIndexStartDragChildLocal].previousWeight=1/totalInitialNodesSize ;
				parentNodes[parentIndexStartDragChildLocal].weight=1/totalInitialNodesSize ;				
				//parentCells=computeWeightedBasedOnPrevoius(parentNodes,parentChildrenMap,totalInitialNodesSize, arrayMouseCell ,polyCopyGlobal);								
				parentCells =computeWeightedBasedOnPrevoiusLocW00(parentNodes, [] ,polyCopyGlobal);
		   
				parentSitePositionPolygonsMap.clear();
				parentPolygonsMap.clear();									
				storeParentPolygonsInMap();																	   
				updateParentNodes();
				
				
				//remove parent cells
				parentLayer.selectAll('.polygonsParent')
				.remove();
				//parent parent rectangles
				parentLayer.selectAll('.rectsParent')
				.remove();
				
				parentLayer.selectAll('.imagesParent').remove();
				
				//draw updated parent cells
				parentLayer.selectAll('.polygonsParent')
				.data(parentCells)					
				.enter().append("path")
				.attr('d', renderCell)
				.attr("class", "polygonsParent")
				.attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.data.originalData.n; } )//i  
				.style ('fill', "none") // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
				.style('stroke', "gray")
				.style('stroke-width', 3)
				.style('stroke-opacity',parentVoronoiEdgesObacity);
				

				
				  
				
				moveChildrenPositionInsideParentCellsStitching(); 
				
				drawScalabilityBarChart();
                reDrawAll();
				

				//runCollapseDoubleClickTransition(childrenOneParentPosition,selectedNodeIndex);
			
				
	   }
	   
	   
	     function runCollapseDoubleClickTransition(d,parentIndexStartDragChildLocal, selectedNodeIndex){ 
               	var childrenOneParentPosition=[]
				var parentChildren= parentChildrenMap.get(parentIndexStartDragChildLocal);
               //parentChildren=getGroupSizeSubChildren(parentChildren);	
		        var finalChild=childNodes[selectedNodeIndex] ;
		        for(var i=0; i<=parentChildren.length-1; ++i){			  			  
			      var childNode=childNodes[parentChildren[i]];
				  childrenOneParentPosition.push({n:childNode.n,xStart:childNode.x,yStart:childNode.y,xFinal: finalChild.x ,yFinal:finalChild.y});
			    }
		 
			  setTimeout(function() { 
				runCollapseDoubleClick(d,parentIndexStartDragChildLocal, selectedNodeIndex );				
				var finalChild=childNodes[selectedNodeIndex] ;
				for(var i=0;i<childrenOneParentPosition.length;++i){
						var childNode=childrenOneParentPosition[i];
					   // console.log("transition2");
					   //childNode.xFinal==d3.select("#childRectname"+childNode.n).attr("x");
					   //childNode.yFinal==d3.select("#childRectname"+childNode.n).attr("y");
					   childNode.xFinal==d3.select("#childRectname"+finalChild.n).attr("x");
					   childNode.yFinal==d3.select("#childRectname"+finalChild.n).attr("y");
					   
					   d3.select("#childImagename"+childNode.n)					
					   .attr("x",childNode.xStart)
					   .attr("y", childNode.yStart);
				}


				 
                for(var i=0;i<childrenOneParentPosition.length;++i){
					 var childNode=childrenOneParentPosition[i];	 
					 d3.select("#childImagename"+childNode.n).transition()
					 //.delay((p+1)*500)
					.attr("x", childNode.xFinal)
					.attr("y", childNode.yFinal).duration(1000);
				
				}
		 
			  }, 2000);
		 
		 }
	   
	   function runUnCollapseDoubleClick(d,parentIndexStartDragChildLocal, selectedNodeIndex ){
		        console.log("runUnCollapseDoubleClick");
				totalInitialNodesSize=counterVisSum();
				
		   		for(var index=0; index<parentCells.length ; ++index){ 
			        var sitePoly=parentCells[index].site;
			        var cell_id=sitePoly.originalObject.data.originalData.n; 
				    var cellPolygon=Array.from(sitePoly.polygon);
					for(var y=0; y<cellPolygon.length; ++y){	  
					    cellPolygon[y][0]= Math.max(cellPolygon[y][0], xmin);
					    cellPolygon[y][0]= Math.min(cellPolygon[y][0], xmax);					  
					    cellPolygon[y][1]= Math.max(cellPolygon[y][1], ymin);
					    cellPolygon[y][1]= Math.min(cellPolygon[y][1], ymax);	  
				    }
				   
				    var intersected =d3.polygonCentroid(cellPolygon);
				    parentNodes[cell_id].x=parseFloat( intersected[0]);
				    parentNodes[cell_id].y=parseFloat( intersected[1]);
				}
				
//				var pc=getGroupSizeSubChildren(parentChildrenMap.get(parentIndexStartDragChildLocal)).length/totalInitialNodesSize;
				
//				parentNodes[parentIndexStartDragChildLocal].weight=	parentChildrenMap.get(parentIndexStartDragChildLocal).length/totalInitialNodesSize;
//                parentNodes[parentIndexStartDragChildLocal].previousWeight=pc;
//				parentNodes[parentIndexStartDragChildLocal].weight=pc;
				
				var elementIndex=prototypesChildrenNodes.indexOf(selectedNodeIndex);
				if(elementIndex!=-1){
					console.log(prototypesChildrenNodes);
					//prototypesChildrenNodes=
					prototypesChildrenNodes.splice(elementIndex , 1);
					console.log(prototypesChildrenNodes);
					
				}
				
				console.log(parentNodes);
				for(var p=0; p<prototypesChildrenNodes.length ; ++p){					
				    //var collapseNodeId=childNodes[prototypesChildrenNodes[p]].n;	  
				    //var collapseNodeParent=parseInt(d3.select("#childVorCell"+collapseNodeId).attr("parentId"));
                    var collapseNodeParent=getParentByIdLocal(childNodes[prototypesChildrenNodes[p]].GroupID).n;	
				    console.log(collapseNodeParent);
					//parentNodes[collapseNodeParent].previousWeight=1/totalInitialNodesSize ;
				    parentNodes[collapseNodeParent].weight=1/totalInitialNodesSize ;				   				   
				}
				  				
				   
				
				//hideOneGroupChildren(parentIndexStartDragChildLocal, selectedNodeIndex);
				
//				handleCollapesedParent(parentIndexStartDragChildLocal);

                drawScalabilityBarChart();
				var pc=getGroupSizeSubChildren(parentChildrenMap.get(parentIndexStartDragChildLocal)).length/totalInitialNodesSize;
                parentNodes[parentIndexStartDragChildLocal].previousWeight=pc;
				parentNodes[parentIndexStartDragChildLocal].weight=pc;				
						
			    parentCells=computeWeightedInitialLoc0(parentNodes,parentChildrenMap,totalInitialNodesSize, [] ,polyCopyGlobal);	        			
				
				
								
				for(var p=0; p<prototypesChildrenNodes.length ; ++p){					
				    //var collapseNodeId=childNodes[prototypesChildrenNodes[p]].n;	  
				    //var collapseNodeParent=parseInt(d3.select("#childVorCell"+collapseNodeId).attr("parentId"));
				   	
					var collapseNodeParent=getParentByIdLocal(childNodes[prototypesChildrenNodes[p]].GroupID).n;	
					parentNodes[collapseNodeParent].previousWeight=1/totalInitialNodesSize ;
				    parentNodes[collapseNodeParent].weight=1/totalInitialNodesSize ;				   				   
				}
//				parentNodes[parentIndexStartDragChildLocal].previousWeight=parentChildrenMap.get(parentIndexStartDragChildLocal).length/totalInitialNodesSize;
//				parentNodes[parentIndexStartDragChildLocal].weight=parentChildrenMap.get(parentIndexStartDragChildLocal).length/totalInitialNodesSize;	

                pc=getGroupSizeSubChildren(parentChildrenMap.get(parentIndexStartDragChildLocal)).length/totalInitialNodesSize;


                parentNodes[parentIndexStartDragChildLocal].previousWeight=pc;				
                parentNodes[parentIndexStartDragChildLocal].weight=pc;	
				
				//isRepresentativeNode( selectedNodeIndex)
				
				//parentCells=computeWeightedBasedOnPrevoius(parentNodes,parentChildrenMap,totalInitialNodesSize, arrayMouseCell ,polyCopyGlobal);								
				parentCells =computeWeightedBasedOnPrevoiusLocW00(parentNodes, [] ,polyCopyGlobal);
		   
				parentSitePositionPolygonsMap.clear();
				parentPolygonsMap.clear();									
				storeParentPolygonsInMap();																	   
				updateParentNodes();
				
				
				//remove parent cells
				parentLayer.selectAll('.polygonsParent')
				.remove();
				//parent parent rectangles
				parentLayer.selectAll('.rectsParent')
				.remove();
				
				parentLayer.selectAll('.imagesParent').remove();
				
				//draw updated parent cells
				parentLayer.selectAll('.polygonsParent')
				.data(parentCells)					
				.enter().append("path")
				.attr('d', renderCell)
				.attr("class", "polygonsParent")
				.attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.data.originalData.n; } )//i  
				.style ('fill', "none") // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
				.style('stroke', "gray")
				.style('stroke-width', 3)
				.style('stroke-opacity',parentVoronoiEdgesObacity);
				
				moveChildrenPositionInsideParentCellsStitching(); 
				 drawScalabilityBarChart();
                reDrawAll();
			
			 
				
	   }
	   
	   
	   	function handleCollapesedParent(parentIndexStartDragChildLocal){
		   		    	   	        
	        parentCells=computeWeightedInitialLoc0(parentNodes,parentChildrenMap,totalInitialNodesSize, [] ,polyCopyGlobal);	        			
			parentCells =computeWeightedBasedOnPrevoiusLocW00(parentNodes, [] ,polyCopyGlobal);
	   
	   		parentSitePositionPolygonsMap.clear();
			parentPolygonsMap.clear();									
			storeParentPolygonsInMap();																	   
			updateParentNodes();
			
			
			parentLayer.selectAll('.polygonsParent')
			.data(parentCells)					
			.enter().append("path")
			.attr('d', renderCell)
			.attr("class", "polygonsParent")
			.attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.data.originalData.n; } )//i  
			.style ('fill', "none") // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
			.style('stroke', "gray")
			.style('stroke-width', 3)
			.style('stroke-opacity',parentVoronoiEdgesObacity);
			
			updateLabelsTextFields();
			
			moveChildrenPositionInsideParentCellsStitching(); 
	  
	  }
	   
	   
	   //first appoach making copy of power diagram for parentnodes 
	   function runCollapseByCopyParentNodes(diagram){
		   
	   }
	   
	   
	   function runCollapseByBubbleSimualtion(d){
		      
		   
		   
	   }


	   
	   function endDragChild(d){
		   console.log("endDragChild");
		   logInteractionsArray.push("endDragChild");
		   //document.getElementById("InteractionID").innerHTML="endDragChild"+dragDistance;
		   //var timetmp = (new Date().getTime() - startTime) / 1000;



	
		    //d3.select(this).select("rect").on("click", function() { d3.event.preventDefault(); });
		    var mousePos=d3.mouse(mainSvg.node());//d3.mouse(this);  //get mouse position //use d3.mouse(this) on drag end
			var xMouseCoordinate=mousePos[0];//get x mouse position
			var yMouseCoordinate=mousePos[1];//get y mouse position 
           
		   endDragPoint.x=xMouseCoordinate;
		   endDragPoint.y=yMouseCoordinate;

		  dragDistance= getDistanceTwoPoints(endDragPoint,startDragPoint);
			
		   var selectedRect=d3.select(this);//.select("rect");  
           var selectedNodeIndex=selectedRect.attr("iIndex");			
           var parentId= getParentIdFrmChildIndx(selectedNodeIndex); 
			
if(dragDistance>30)
{	



//if( dblclickArray.indexOf(selectedNodeIndex)!=-1 ){//dblclick>=2


if(wasMoved) {

teleportCounter=0;
	  
var parentChildren= parentChildrenMap.get(parentId);



if( (parentChildren.length>1  || prototypesChildrenNodes.indexOf(selectedNodeIndex)!=-1)
 && freeRepresentiveParentNodes.indexOf(parentIndexStartDragChild)==-1
)
{  


		    if(!firstDragFlag){
				console.log("end Drag parent"+parentIndexStartDragChild);
				console.log("moveParentNode");
               // moveParentNode(parentIndexStartDragChild, parentIndexPrevoiusDragChild);
			   //if(parentTargetTeleport==-1)
			  // setTimeout(function() {
			   //  endMoveParentNodeByBubbleSimualtion(d,parentIndexStartDragChild, parentIndexPrevoiusDragChild);
				 
				  //drawScalabilityBarChart();
                  //updateParentNodesWeightGlobal();
				  
				  setTimeout(function() { 
				    reDrawAll();
				  },500);
				  
				  //reDrawAllChildren();
   
			   //},500);
				
			}else{
			
				var selectedRect=d3.select(this);//.select("rect");  
				var selectedNodeIndex=selectedRect.attr("iIndex");
				console.log("end drag child: selectedNodeIndex="+selectedNodeIndex);
			  
				var isInsideViewBoundary=d3.polygonContains([[0,0], [0,voronoiHeight], [voronoiWidth, voronoiHeight], [voronoiWidth,0]], [xMouseCoordinate, yMouseCoordinate]);
				console.log("isInsideViewBoundary="+isInsideViewBoundary);
				
				updateIfRepresentativeNode(selectedNodeIndex);
				
				
				if(isInsideViewBoundary){
					//////////////////////////////
					/// modify source of target  
					var parentSelectedNode=-1;
															
					if(sourceChildNumber<=1 && prototypesChildrenNodes.indexOf(selectedNodeIndex)==-1){
						 console.log("end Drag parent"+parentIndexStartDragChild);
						 console.log("remove parentNode");
						 //remove parentNode  that has no children 
						 parentNodes.splice(parentIndexStartDragChild , 1);
						 parentChildrenMap.delete(parentIndexStartDragChild);
						 parentPolygonsMap.delete(parentIndexStartDragChild);
						 parentCellsColors.splice(parentIndexStartDragChild , 1);
						 
						 //modify indexs of parentNodes
						 for(var ind= 0; ind<=parentNodes.length-1 ; ind++){
							parentNodes[ind].n=ind;	
						 }
						 
						 //get sorted keys of parents
						 var keysOfCurrentMap=Array.from(parentChildrenMap.keys());                
						 keysOfCurrentMap.sort(function(a, b) {
						   return a - b;
						 });
						 
						 //modify keys in parentChildrenMap
						 for(var index=0; index<=keysOfCurrentMap.length-1;++index){
							 parentChildrenMap.set(index, parentChildrenMap.get(keysOfCurrentMap[index]));						 
							 parentPolygonsMap.set(index, parentPolygonsMap.get(keysOfCurrentMap[index]));
							 if( parentChildrenMap.get(keysOfCurrentMap[index]).indexOf(selectedNodeIndex)!=-1 ){
								 parentSelectedNode=keysOfCurrentMap[index];
							 }
						 }
											 
						parentIndexStartDragChild=-1;
					}
						  				  

				    parentIndexEndDragChild=parentIndexPrevoiusDragChild;
//					parentIndexEndDragChild=parentIndexPrevoiusDragChild;			
					//parentIndexEndDragChild=findParentPolygon(xMouseCoordinate,yMouseCoordinate);

					if(sourceChildNumber==1){										
						parentIndexEndDragChild = parentSelectedNode;	
						handleRemoveParentCell();	

	                    updateLabelsTextFields();
                        reDrawAllChildren();
                        showRepresentativeRects();							
					}

					if(parentIndexStartDragChild != parentIndexEndDragChild){															  
					    moveChildFromParentToParent(parentIndexEndDragChild, parentIndexStartDragChild);																			   
					
					    	var checkCollapsedParent= isCollapsedParentNode(parentIndexEndDragChild);					
							if(checkCollapsedParent){
								//parentNodes[parentIndexEndDragChild].weight=parentNodes[parentIndexEndDragChild].previousWeight;
								totalInitialNodesSize=counterVisSum();
								parentNodes[parentIndexEndDragChild].weight= 1/totalInitialNodesSize;
								console.log("after-drag-Weight");
								console.log(parentNodes[parentIndexEndDragChild].weight);
							}
					
					   	if(sourceChildNumber!=1)
					       reDrawAll();
					} 
						 
				    reDrawAllChildren();
	//				reDrawRectsParents();
						 
																										 
				}else if(isCreateGroup==true){
					
					
					if(sourceChildNumber==1){
						
						if(parentIndexStartDragChild==parentIndexPrevoiusDragChild){
							 //drag child node from parent node (the parent located on boundary) 
							 //directly  to outisede view (not drag to another parent)
							 //where the parent has only this child 
						     moveChildFromParentToParent(parentIndexPrevoiusDragChild, parentIndexStartDragChild);
					   
					    }else{
							  
							 moveChildFromParentToParent(parentIndexPrevoiusDragChild, parentIndexStartDragChild);
							 
							 parentNodes.splice(parentIndexStartDragChild , 1);
							 parentChildrenMap.delete(parentIndexStartDragChild);
							 parentPolygonsMap.delete(parentIndexStartDragChild);
							 parentCellsColors.splice(parentIndexStartDragChild , 1);
							 
							 //modify indexs of parentNodes
							 for(var ind= 0; ind<=parentNodes.length-1 ; ind++){
								parentNodes[ind].n=ind;	
							 }
							 
							 //get sorted keys of parents
							 var keysOfCurrentMap=Array.from(parentChildrenMap.keys());                
							 keysOfCurrentMap.sort(function(a, b) {
							   return a - b;
							 });
							 
							 //modify keys in parentChildrenMap
							 for(var index=0; index<=keysOfCurrentMap.length-1;++index){
								 parentChildrenMap.set(index, parentChildrenMap.get(keysOfCurrentMap[index]));						 
								 parentPolygonsMap.set(index, parentPolygonsMap.get(keysOfCurrentMap[index]));
								 if( parentChildrenMap.get(keysOfCurrentMap[index]).indexOf(selectedNodeIndex)!=-1 ){
									 parentSelectedNode=keysOfCurrentMap[index];
								 }
							 }
												 
										
										
							//parentIndexEndDragChild = parentSelectedNode;
							//parentIndexStartDragChild= parentSelectedNode;//parentIndexPrevoiusDragChild;
							//parentIndexPrevoiusDragChild=parentSelectedNode;
							handleRemoveParentCell();
							
						}												

					}else{									
					   createNewParentCell(selectedNodeIndex, xMouseCoordinate, yMouseCoordinate, parentIndexPrevoiusDragChild, sourceWeight, parentIndexStartDragChild);			   
					}
					
				}
				
					
					
				   parentIndexStartDragChild = -1;
				   parentIndexEndDragChild = -1;
				   parentIndexPrevoiusDragChild=-1;
			}
			   //if(isParentNodeMove)
			   // isParentNodeMove=false;
			   
			   copyOfparentNodes.length=0;
			   firstDragFlag=true;
//			   d3.select("#currentCell"+selectedNodeIndex).remove();

          
		  parentLayer.selectAll(".polygonsChild").raise();
		  parentLayer.selectAll('.rectsChild').raise() ;
		  parentLayer.selectAll('.rectsParent').raise() ;
		  parentLayer.selectAll('.textChild').raise();
		  
		  d3.selectAll("image").style("opacity", imagesObacity);
	      parentLayer.selectAll(".imagesChild").raise();
		  
			console.log("enddrag" );

			//wrapAllTextRect();	
			
			 
			
			try{				  
				  
				  reDrawAll();
				  //reDrawAllChildren();
				  wrapAllTextRect();
			}catch(e){

			}	
}	

//var isFreeRepres=false;
if(freeRepresentiveParentNodes.indexOf(parentIndexStartDragChild) !=-1){
	    if(wasMoved) {

					 teleportCounter=0;
						  
					 handleEndMoveFreeRepresentitive( selectedNodeIndex, xMouseCoordinate, yMouseCoordinate);
                      
					 //isFreeRepres=true;
						  
		}

}else if(parentChildren.length==1){
	         //reDrawAll();
	        //updateParentNodesWeightGlobal();
		    reDrawAll();
				  
			if(!firstDragFlag){
				console.log("end Drag single parent"+parentIndexStartDragChild);
				console.log("moveParentNode");
               // moveParentNode(parentIndexStartDragChild, parentIndexPrevoiusDragChild);
			   //if(parentTargetTeleport==-1)
			  // setTimeout(function() {
			    // endMoveParentNodeByBubbleSimualtion(d,parentIndexStartDragChild, parentIndexPrevoiusDragChild);
				 
				  //drawScalabilityBarChart();
                  updateParentNodesWeightGlobal();
				  reDrawAll();
				  //reDrawAllChildren();
   
			  // },500);
				
			}
}


}

if(parentTargetTeleport!=-1 ){  //&& isFreeRepres

setTimeout(function() { 
                    
					drawScalabilityBarChart();
					updateParentNodesWeightGlobal();
	                reDrawAll();

					d3.select("#parentvorCell"+ parentNodes[parentTargetTeleport].n).raise();
					//clickchildImagename
					d3.select("#parentvorCell"+ parentNodes[parentTargetTeleport].n)  	    //parentNodes[parentIndexStartDragChild].n  
					//.style("fill", "red");
				   .style('stroke-width', 10)	   
				   .style('stroke-opacity',1); 
				   
				   
				   	///////////////////
					///1 second delay color for teleported cell
					if(parentSourceTeleportGlobal!=-1){
					   var parentChildren2=parentChildrenMap.get(parentTargetTeleport);	
					   d3.select("#childVorCell"+ selectedNodeIndex) 
					   .style('fill', parentCellsColors[parentSourceTeleportGlobal] );

					   updateChildNodeColorMappingBeforeMergeParentTwoNodes(parentTargetTeleport);						
					   updateChildColorsAfterMergeParentTwoNodes(parentTargetTeleport);	
					}
					/////////////////////
				   

									      
},1000);                     
				   


/*					 
setTimeout(function() {					 

					 //d3.select("#childImagename"+selectedNodeIndex)					
				     //.attr("x",startDragPoint.x)
					 //.attr("y", startDragPoint.y);

					 // console.log("transition2");
					 var xChi=d3.select("#childRectname"+selectedNodeIndex).attr("x");
					 var yChi=d3.select("#childRectname"+selectedNodeIndex).attr("y");
					 
					 //var xChi=childNodes[selectedNodeIndex].x;
					 //var yChi=childNodes[selectedNodeIndex].y;
					 
                     d3.select("#childImagename"+selectedNodeIndex).transition()
				    .attr("x",xChi)
					.attr("y", yChi).duration(2000);
					//childNodes[selectedNodeIndex].x
},2000); 	*/							  
					
}

//parentLayer.selectAll(".rectsChild").call(d3.drag().on("start",startDragChild).on("drag", draggedChild).on("end",endDragChild));//.on("click", clicked); //  clickDistance(10). .on('click', clicked)		  
//parentLayer.selectAll(".imagesChild").call(d3.drag().on("start",startDragChild).on("drag", draggedChild).on("end",endDragChild));//.on("click", clicked); 					
	
wasMoved = false;
showRepresentativeRects(); 

}//else{


	 
	 
 
	 
	 
//}

//drawScalabilityBarChart();	
//updateParentNodesWeightGlobal();

if(parentTargetTeleport==-1){
    drawScalabilityBarChart();
try{	
updateParentNodesWeightGlobal();
}catch(e){
}

reDrawAll();  
}

/* console.log("transition1");
if(parentTargetTeleport!=-1){

                     console.log("transition2");
                     d3.select("#childImagename"+selectedNodeIndex).transition()
					//d3.select(this).transition()
					//.attr("transform", "translate("+childNodes[selectedNodeIndex].x+", "+childNodes[selectedNodeIndex].y+")").duration(5000);
				    .attr("transform", "translate(500,500)").duration(2000);

	
}*/


//parentLayer.selectAll(".imagesChild").raise();
//parentLayer.selectAll(".imagesChild").call(d3.drag().on("start",startDragChild).on("drag", draggedChild).on("end",endDragChild));

		 
dragDistance=0;draggingPoint.x= 0;draggingPoint.y= 0; endDragPoint.x= 0;  endDragPoint.y= 0; startDragPoint.x= 0;  startDragPoint.y= 0; 
	  
	  
	  }
	  
	
function handleEndMoveFreeRepresentitive( selectedNodeIndex, xMouseCoordinate, yMouseCoordinate){
	
	
         {
			    freeRepresentiveParentNodes.splice(parentIndexStartDragChild,1);

				console.log("handleEndMoveFreeRepresentitive drag child: selectedNodeIndex="+selectedNodeIndex);
			  
				var isInsideViewBoundary=d3.polygonContains([[0,0], [0,voronoiHeight], [voronoiWidth, voronoiHeight], [voronoiWidth,0]], [xMouseCoordinate, yMouseCoordinate]);
				console.log("isInsideViewBoundary="+isInsideViewBoundary);
				
				updateIfRepresentativeNode(selectedNodeIndex);
				
				
				if(isInsideViewBoundary){
					//////////////////////////////
					/// modify source of target  
					var parentSelectedNode=-1;
															
					if(sourceChildNumber<=1 && prototypesChildrenNodes.indexOf(selectedNodeIndex)==-1){
						 console.log("end Drag parent"+parentIndexStartDragChild);
						 console.log("remove parentNode");
						 //remove parentNode  that has no children 
						 parentNodes.splice(parentIndexStartDragChild , 1);
						 parentChildrenMap.delete(parseInt(parentIndexStartDragChild));
						 parentPolygonsMap.delete(parentIndexStartDragChild);
						 parentCellsColors.splice(parentIndexStartDragChild , 1);
						 
						 //modify indexs of parentNodes
						 for(var ind= 0; ind<=parentNodes.length-1 ; ind++){
							parentNodes[ind].n=ind;	
						 }
						 
						 //get sorted keys of parents
						 var keysOfCurrentMap=Array.from(parentChildrenMap.keys());                
						 keysOfCurrentMap.sort(function(a, b) {
						   return a - b;
						 });
						 
						 //modify keys in parentChildrenMap
						 for(var index=0; index<=keysOfCurrentMap.length-1;++index){
							 parentChildrenMap.set(index, parentChildrenMap.get(keysOfCurrentMap[index]));						 
							 parentPolygonsMap.set(index, parentPolygonsMap.get(keysOfCurrentMap[index]));
							 if( parentChildrenMap.get(keysOfCurrentMap[index]).indexOf(selectedNodeIndex)!=-1 ){
								 parentSelectedNode=keysOfCurrentMap[index];
							 }
						 }
						 
						 parentChildrenMap.delete(keysOfCurrentMap.length);
						 //if( parentChildrenMap.get(nodeCurreId)==null ){
				             //nodeCurreId=nodePreId;
			              //}
											 
						parentIndexStartDragChild=-1;
						
						console.log("parentChildrenMap");
                        console.log(keysOfCurrentMap);						
                        console.log(parentChildrenMap);	
					}
						  				  

				    parentIndexEndDragChild=parentIndexPrevoiusDragChild;
//					parentIndexEndDragChild=parentIndexPrevoiusDragChild;			
					//parentIndexEndDragChild=findParentPolygon(xMouseCoordinate,yMouseCoordinate);

					if(sourceChildNumber==1){			
                        					
						parentIndexEndDragChild = parentSelectedNode;
					
						handleRemoveParentCell();	

                        drawScalabilityBarChart();
	                    updateLabelsTextFields();
                        reDrawAllChildren();
                        showRepresentativeRects();							
					}

					if(parentIndexStartDragChild != parentIndexEndDragChild){															  
					    moveChildFromParentToParent(parentIndexEndDragChild, parentIndexStartDragChild);																			   
					
					    	var checkCollapsedParent= isCollapsedParentNode(parentIndexEndDragChild);					
							if(checkCollapsedParent){
								//parentNodes[parentIndexEndDragChild].weight=parentNodes[parentIndexEndDragChild].previousWeight;
								totalInitialNodesSize=counterVisSum();
								parentNodes[parentIndexEndDragChild].weight= 1/totalInitialNodesSize;
								console.log("after-drag-Weight");
								console.log(parentNodes[parentIndexEndDragChild].weight);
							}
					
					   	if(sourceChildNumber!=1)
					       reDrawAll();
					} 
						 
				    reDrawAllChildren();
	//				reDrawRectsParents();
						 
																										 
				}else if(isCreateGroup==true){
					
				
					
				}
				
					

					
				   parentIndexStartDragChild = -1;
				   parentIndexEndDragChild = -1;
				   parentIndexPrevoiusDragChild=-1;
			}
			
			
						   
			   copyOfparentNodes.length=0;
			   firstDragFlag=true;
//			   d3.select("#currentCell"+selectedNodeIndex).remove();

          
		  parentLayer.selectAll(".polygonsChild").raise();
		  parentLayer.selectAll('.rectsChild').raise() ;
		  parentLayer.selectAll('.rectsParent').raise() ;
		  parentLayer.selectAll('.textChild').raise();
		  
		  d3.selectAll("image").style("opacity", imagesObacity);
	      parentLayer.selectAll(".imagesChild").raise();
		  
			console.log("enddrag" );

			//wrapAllTextRect();	
			
			 
			
			try{	
			      
				  
				  combineData();				
				  drawScalabilityBarChart();
				  updateParentNodesWeightGlobal();
				  reDrawAll();
				  reDrawAllChildren();
				  wrapAllTextRect();
			}catch(e){

			}	
			
			
			if(parentTargetTeleport!=-1){
								reDrawAll();
								d3.select("#parentvorCell"+ parentNodes[parentTargetTeleport].n).raise();
								//clickchildImagename
								d3.select("#parentvorCell"+ parentNodes[parentTargetTeleport].n)  	    //parentNodes[parentIndexStartDragChild].n  
								//.style("fill", "red");
							   .style('stroke-width', 10)	   
							   .style('stroke-opacity',1); 
							   
							   
								///////////////////
								///1 second delay color for teleported cell
								if(parentSourceTeleportGlobal!=-1){
								   var parentChildren2=parentChildrenMap.get(parentTargetTeleport);	
								   d3.select("#childVorCell"+ selectedNodeIndex) 
								   .style('fill', parentCellsColors[parentSourceTeleportGlobal] );

								   updateChildNodeColorMappingBeforeMergeParentTwoNodes(parentTargetTeleport);						
								   updateChildColorsAfterMergeParentTwoNodes(parentTargetTeleport);	
								}
								/////////////////////
							   
							   
			}			
			
			wasMoved = false;
            showRepresentativeRects(); 
			
			
            dragDistance=0;draggingPoint.x= 0;draggingPoint.y= 0; endDragPoint.x= 0;  endDragPoint.y= 0; startDragPoint.x= 0;  startDragPoint.y= 0; 
	  
			
}

	  function moveParentNode(parentIndexStartDragChild, parentIndexPrevoiusDragChild){
		  				//
				
				/*parentNodes[parentIndexStartDragChild].previousX= xMouseCoordinate;//parentNodes[parentIndexPrevoiusDragChild].x;//
				parentNodes[parentIndexStartDragChild].previousY= yMouseCoordinate;//parentNodes[parentIndexPrevoiusDragChild].y;//			  
			    //parentNodes[parentIndexStartDragChild].previousWeight=sourceWeight;
				
				parentNodes[parentIndexStartDragChild].x= xMouseCoordinate;
				parentNodes[parentIndexStartDragChild].y= yMouseCoordinate;*/
				
				parentNodes[parentIndexStartDragChild].previousX=  copyOfparentNodes[parentIndexStartDragChild].x;// 
				parentNodes[parentIndexStartDragChild].previousY=  copyOfparentNodes[parentIndexStartDragChild].y;//			  
				//parentNodes[parentIndexStartDragChild].previousWeight=sourceWeight;
				
				parentNodes[parentIndexStartDragChild].x= copyOfparentNodes[parentIndexStartDragChild].x;
				parentNodes[parentIndexStartDragChild].y= copyOfparentNodes[parentIndexStartDragChild].y;
								
				
///////////////				
/*				simulation = d3.voronoiMapSimulation(parentNodes)
			   .clip([[0,0], [0,1000], [1000, 1000], [1000,0]])
			   .stop();
			   
			   
				state = simulation.state(); 
			   
			   while (!state.ended) {                                    // manually launch each iteration until the simulation ends
				simulation.tick();
				state = simulation.state();
			   }

			   
			   parentCells = state.polygons; 		
*/			   
//////////////								
//for bubble
 /*             for(var index=0; index<parentNodes.length ; ++index){ 
			         parentNodes[index].previousX= nodes[index].x;
			         parentNodes[index].previousY= nodes[index].y;
					 parentNodes[index].x= nodes[index].x;
			         parentNodes[index].y= nodes[index].y;			 
			   }*/
			   
			   
							
   			    parentCells=computeWeightedInitialLoc0(parentNodes,parentChildrenMap,totalInitialNodesSize, [] ,polyCopyGlobal);													
				parentCells =computeWeightedBasedOnPrevoiusLocW00(parentNodes, [] ,polyCopyGlobal);					
			 



				
				parentSitePositionPolygonsMap.clear();
				parentPolygonsMap.clear();
				
				//store parent cell in parentPolygonsMap
				//store site x,y, and weight of parent cell  in parentSitePositionPolygonsMap
				storeParentPolygonsInMap();
				updateParentNodes();
							
							
				/* parentLayer.selectAll('.polygonsChild')
				.filter(function(d) {  return  parseInt(this.getAttribute("id").split("-").pop())==parentIndexCurrentDragChild && parseInt(this.getAttribute("id").substring(12).split("-").shift())==parseInt(selectedNodeIndex);})
				.remove();*/					
			   
				//remove parent cells
				parentLayer.selectAll('.polygonsParent')
				.remove();
				//parent parent rectangles
				parentLayer.selectAll('.rectsParent')
				.remove();
				
				parentLayer.selectAll('.imagesParent').remove();
				
				//draw updated parent cells
				parentLayer.selectAll('.polygonsParent')
				.data(parentCells)					
				.enter().append("path")
				.attr('d', renderCell)
				.attr("class", "polygonsParent")
				.attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.data.originalData.n; } )//i  
				.style ('fill', "none") // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
				.style('stroke', "gray")
				.style('stroke-width', 3)
				.style('stroke-opacity',parentVoronoiEdgesObacity);
			
			     
				moveChildrenPositionInsideParentCellsStitching();
				reDrawAllChildren();
				showAllchildren();
		  
	  }
	  
	  
	  
	  function endMoveParentNodeByBubbleSimualtion(d,parentIndexStartDragChild, parentIndexPrevoiusDragChild){

         parentCells.length=0;

	     //for bubble
		  console.log(nodes);
		  console.log(parentNodes);
          for(var index=0; index<parentNodes.length ; ++index){ 
		         if(nodes[index]==null || nodes[index]==undefined) continue;
				
				 parentNodes[index].previousX= nodes[index].x;
				 parentNodes[index].previousY= nodes[index].y;
				 parentNodes[index].x= nodes[index].x;
				 parentNodes[index].y= nodes[index].y;			 
	      }



		  for(var p=0; p<prototypesChildrenNodes.length ; ++p){					
			//var collapseNodeId=childNodes[prototypesChildrenNodes[p]].n;	  
			//var collapseNodeParent=parseInt(d3.select("#childVorCell"+collapseNodeId).attr("parentId"));
		    var collapseNodeParent=getParentByIdLocal(childNodes[prototypesChildrenNodes[p]].GroupID).n;	
			//console.log(collapseNodeParent);
			//parentNodes[collapseNodeParent].previousWeight=1/totalInitialNodesSize ;
			parentNodes[collapseNodeParent].weight=1/totalInitialNodesSize ;				   				   
		  }




           parentCells=computeWeightedInitialLoc0(parentNodes,parentChildrenMap,totalInitialNodesSize, [] ,polyCopyGlobal);
				
		    for(var p=0; p<prototypesChildrenNodes.length ; ++p){					
						//var collapseNodeId=childNodes[prototypesChildrenNodes[p]].n;	  
						//var collapseNodeParent=parseInt(d3.select("#childVorCell"+collapseNodeId).attr("parentId"));
						var collapseNodeParent=getParentByIdLocal(childNodes[prototypesChildrenNodes[p]].GroupID).n;	
						//console.log(collapseNodeParent);
						//parentNodes[collapseNodeParent].previousWeight=1/totalInitialNodesSize ;
						parentNodes[collapseNodeParent].weight=1/totalInitialNodesSize ;				   				   
		    }
				
		    parentCells =computeWeightedBasedOnPrevoiusLocW00(parentNodes, [] ,polyCopyGlobal);					
			 
//setTimeout(function() {
					
				

			console.log("parentCells");
			console.log(parentCells);
			parentSitePositionPolygonsMap.clear();
			parentPolygonsMap.clear();
			
			//parentPolygonsMap=new Map();
				
			//store parent cell in parentPolygonsMap
			//store site x,y, and weight of parent cell  in parentSitePositionPolygonsMap
			storeParentPolygonsInMap();
			updateParentNodes();


            //remove parent cells
			parentLayer.selectAll('.polygonsParent')
			.remove();
			
			//d3.selectAll('.polygonsParent')
			//.remove();
			//parent parent rectangles
			parentLayer.selectAll('.rectsParent')
			.remove();
			
			parentLayer.selectAll('.imagesParent').remove();
			
			
			
			//draw updated parent cells
			parentLayer.selectAll('.polygonsParent')
			.data(parentCells)					
			.enter().append("path")
			.attr('d', renderCell)
			.attr("class", "polygonsParent")
			.attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.data.originalData.n; } )//i  
			.style ('fill', "none") // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
			.style('stroke', "gray")
			.style('stroke-width', 3)
			.style('stroke-opacity',parentVoronoiEdgesObacity);



			//this if parentnode is collapsed			
			/*var checkCollapsedParent1= isCollapsedParentNode(parentIndexStartDragChild);
			var checkCollapsedParent2= isCollapsedParentNode(parentIndexPrevoiusDragChild);
			if(checkCollapsedParent1 || checkCollapsedParent2 ){	
							  reDrawAll();			   
			  moveChildrenPositionInsideParentCellsStitching();
			  reDrawAll();
		   }else*/
		   
		   {
			   
	    

		
			

			//reDrawAllChildren();		   
			moveChildrenPositionInsideParentCellsStitching();				
			//reDrawAll();
			reDrawAllChildren();
			showAllchildren();
			
		    //d3.selectAll(".polygonsParent").on( ,null);
		   }

/*	drawScalabilityBarChart();	
	updateParentNodesWeightGlobal();
	reDrawAll();
	reDrawAllChildren();
}, 1000);
*/


		//deActivateSimulationMove();
		//deActivateSimulationStop();
						 
     }






	  
	  function moveChildFromParentToParent(parentIndexEndDragChild, parentIndexStartDragChild){
		  					//parentIndexEndDragChild=2;
							console.log("parentIndexEndDragChild");
							console.log(parentIndexEndDragChild);
							
							
/*							var parentNodeSiteTarget=null;
							parentCells.forEach((p)=>{
							  //console.log(p.site.originalObject.data.originalData.n);
                              //console.log(p);	
							  if(p.site.originalObject.data.originalData.n==parentIndexEndDragChild){							
								parentNodeSiteTarget=p; 
								//break;
							  }
							});
							var targetWeight=parentNodeSiteTarget.site.weight;
							console.log("parentNodeSiteTarget");
							console.log(parentNodeSiteTarget);

*/							
							
							//var parentNodeSiteTarget=parentSitePositionPolygonsMap.get(parentIndexEndDragChild);
							//var targetWeight=parentNodeSiteTarget[2];
/*							var targetChildNumber=parentChildrenMap.get(parentIndexEndDragChild).length;
							//var targetUnitWeight= parseInt(targetWeight/targetChildNumber);
							
							var newTargetWeight= (targetChildNumber+1)/totalInitialNodesSize;//10000 *targetWeight + targetUnitWeight;
							//var newTargetWeight=parentNodes[parentIndexEndDragChild].weight +10000;
							console.log("parentWeightEndDragChild");
							console.log(targetWeight+ " new="+newTargetWeight+" old="+ parentNodes[parentIndexEndDragChild].weight+" prv="+parentNodes[parentIndexEndDragChild].previousWeight);						
							console.log("parentChildLengthEndDragChild "+targetChildNumber);
							console.log(parentChildrenMap.get(parentIndexEndDragChild));
					        console.log("parentChildrenMap");
					        console.log(parentChildrenMap);						
							//////////////////////////////
							/// modify weight of target 
							//parentNodes[parentIndexEndDragChild].previousWeight=parseInt(newTargetWeight);
							parentNodes[parentIndexEndDragChild].previousWeight=targetWeight;//parentNodes[parentIndexEndDragChild].weight;
//							parentNodes[parentIndexEndDragChild].previousWeight=parentNodes[parentIndexEndDragChild].weight;
							
//							newSourceWeight=parentNodes[parentIndexEndDragChild].weight+(parentNodes[parentIndexEndDragChild].weight/parentChildrenMap.get(parentIndexEndDragChild).length) ;
                            parentNodes[parentIndexEndDragChild].weight=targetWeight;// + (Math.random()-0.5)*5; //+ newTargetWeight;  
//							parentNodes[parentIndexEndDragChild].weight=newTargetWeight;
*/							
							
							
							//////////////////////////////
							var pcTarget= getGroupSizeSubChildren(parentChildrenMap.get(parentIndexEndDragChild));		
							var targetChildNumber=pcTarget.length;
							
							//var targetChildNumber=parentChildrenMap.get(parentIndexEndDragChild).length;							
							var checkCollapsedParent= isCollapsedParentNode(parentIndexEndDragChild);

							var newTargetWeight= (targetChildNumber+1)/totalInitialNodesSize;							
							if(checkCollapsedParent){
								 //parentNodes[parentIndexEndDragChild].weight=parentNodes[parentIndexEndDragChild].previousWeight;
								newTargetWeight= 1/totalInitialNodesSize;	
                                parentNodes[parentIndexEndDragChild].previousWeight=newTargetWeight;									
								parentNodes[parentIndexEndDragChild].weight=newTargetWeight;
								console.log("newTargetWeight");
								console.log(newTargetWeight);
							}else{
							   parentNodes[parentIndexEndDragChild].weight=newTargetWeight;
							}

							
							
							
							var prSource= getGroupSizeSubChildren(parentChildrenMap.get(parentIndexStartDragChild));
							var sourceLocChildNumber= prSource.length;
                            //var sourceLocChildNumber=parentChildrenMap.get(parentIndexStartDragChild).length;
							
							if(sourceLocChildNumber>1){ 							   
							   parentNodes[parentIndexStartDragChild].weight= (sourceLocChildNumber-1)/ totalInitialNodesSize;
						    
							}else{
					           parentNodes[parentIndexStartDragChild].weight= 1/totalInitialNodesSize;
					        }
							
							/*simulation = d3.voronoiMapSimulation(parentNodes)
						   .clip([[0,0], [0,voronoiHeight], [voronoiWidth, voronoiHeight], [voronoiWidth,0]])
						   .stop();
						   
						   
						    state = simulation.state(); 
						   
						   while (!state.ended) {                                    // manually launch each iteration until the simulation ends
							simulation.tick();
							state = simulation.state();
						   }

						   
						   parentCells = state.polygons; 
                           var parentCellsCopy= JSON.parse(JSON.stringify(parentCells)) ;
						   */
						   
						   parentCells=computeWeightedInitialLoc0(parentNodes,parentChildrenMap,totalInitialNodesSize, [] ,polyCopyGlobal);
						   
						   //update previousWeight for nodes    
						   /*for(var index=0; index<=parentCells.length-1;++index){
								  var id= parentCells[index].site.originalObject.data.originalData.n;			  
								  var sitePolyWeight=parentCells[index].site.weight;
								  parentNodes[id].previousWeight= sitePolyWeight;			  
						   }*/
						   
						   //store parent cell in parentPolygonsMap
						   //store site x,y, and weight of parent cell  in parentSitePositionPolygonsMap
						   //storeParentPolygonsInMap();
							// updateParentNodes();
							
							
							
							///////////////////////////////
							/// recompute weighted voronoi
							if(sourceChildNumber==1){
								handleRemoveParentCell();
							}else{
								var counter=1;
								
							    var decreasedWeight=parentNodes[parentIndexStartDragChild].weight;
												

                                    if(checkCollapsedParent){
								      //parentNodes[parentIndexEndDragChild].weight=parentNodes[parentIndexEndDragChild].previousWeight;
								      newTargetWeight= 1/totalInitialNodesSize;	
                                      parentNodes[parentIndexEndDragChild].previousWeight=newTargetWeight;									  
								      parentNodes[parentIndexEndDragChild].weight=newTargetWeight;
								      console.log("newTargetWeight");
								      console.log(newTargetWeight);
							       }
							
									parentCells =computeWeightedBasedOnPrevoiusLocW00(parentNodes, [] ,polyCopyGlobal);	
				   
				   
								 	//if (counter ==6){
									//	console.log("error happen");
									  // parentCells= state.polygons; //JSON.parse(JSON.stringify(parentCellsCopy)) ;
									//}			
								

									console.log("updated-End drag-parentCells");
								   
									parentSitePositionPolygonsMap.clear();
									parentPolygonsMap.clear();
									
					 //              updateHierarchy(selectedNodeIndex, parentIndexStartDragChild, parentIndexEndDragChild);				
								   storeParentPolygonsInMap();
								   //moveChildrenPositionInsideParentCells();
					/*			   checkChildrenPositionInsideParentCells();
								   
								  delaunay=computeCenterOfMass();	  	  
								  delaunay = d3.Delaunay.from(childNodes, p => p.x, p => p.y); // create dealuny from updates nodes
								  diagram = delaunay.voronoi([0,0,1000,1000]); 
						  
					*/	  
					               updateParentNodes();
									
								//////////////////////////////
								// relayout update parent cells
								parentLayer.selectAll('.polygonsParent')
								.data(parentCells)
								.attr('d', renderCell) 
								.attr('fill', "none");
								   

							   parentLayer.selectAll('.polygonsParent')
							   .attr('fill', "none" );

                              /* computeCenterOfMassParents();							   
							   for(var index=0; index<=copyOfparentNodes.length-1; ++index){
							      d3.select('#parentRectname'+ copyOfparentNodes[index].n) 
								  .attr("x", copyOfparentNodes[index].x)
								  .attr("y", copyOfparentNodes[index].y);
                               }							   
							   */
							   
							  /*parentLayer.selectAll('.rectsParent')
							   .attr("x", function (d) { return ( parentSitePositionPolygonsMap.get(d.site.originalObject.data.originalData.n)[0] ); }) // x position of rect node
							   .attr("y", function (d) { return ( parentSitePositionPolygonsMap.get(d.site.originalObject.data.originalData.n)[1] ); }); // y position of rect node 
							   */
							   

							   parentLayer.selectAll('.polygonsParent').lower();
																											   
							   //moveChildrenPositionInsideParentCells(); 
								moveChildrenPositionInsideParentCellsStitching();
							
							}  
	  }
	  
	  
	  
	  function findNearestCornerPointPolygone(polygon, point){
		  
		var minDistanceInPolygon=Number.MAX_VALUE;  
        var nearestPoint=[];
		console.log("findNearestCornerPointPolygone");	
		console.log(point);		
		console.log(polygon);
		for(var p=0; p<=polygon.length-1;++p){
			  var dist= computeDistance(polygon[p], point);			  
			  if(dist<minDistanceInPolygon){
			    minDistanceInPolygon=dist;  
                nearestPoint=polygon[p];  
                console.log(nearestPoint);				
			  }				
		}
		
		return nearestPoint;
		
	  }
	  
	  
	  function createNewParentCell(selectedNodeIndex, xMouseCoordinate, yMouseCoordinate, parentIndexPrevoiusDragChild, sourceWeight, parentIndexStartDragChild){
		  		    console.log("parentIndexPrevoiusDragChild");
					console.log(parentIndexPrevoiusDragChild);
					var pcSite=parentSitePositionPolygonsMap.get(parentIndexPrevoiusDragChild);
					console.log("before-pcSite-parentIndexPrevoiusDragChild");
					console.log(pcSite);
					 
					
				    //create new parent node at border		
					var weightNewParent = 1/totalInitialNodesSize; //1000
					
					//position of new parent node should be in clipped area.
					var newParentNodeX=parseInt(xMouseCoordinate);//950;//950;//;
					var newParentNodeY=parseInt(yMouseCoordinate);//50;//
					if (xMouseCoordinate>=voronoiWidth && yMouseCoordinate<1000){
					   newParentNodeX= (parseInt(pcSite[0])+voronoiWidth)/2;//getRandom(1000,1010)  ;
					   newParentNodeY= (parseInt(pcSite[1])+yMouseCoordinate)/2;
					}

					
					if (yMouseCoordinate>=voronoiHeight && xMouseCoordinate<voronoiWidth){
						newParentNodeY=(parseInt(pcSite[1])+voronoiHeight)/2;// 900;//getRandom(1000,1010) ;
					    newParentNodeX= (parseInt(pcSite[0])+xMouseCoordinate)/2;//getRandom(1000,1010)  ;
					}
					
					if (yMouseCoordinate>voronoiHeight && xMouseCoordinate>voronoiWidth){
					   newParentNodeY=(parseInt(pcSite[1])+voronoiHeight)/2;
					   newParentNodeX= (parseInt(pcSite[0])+voronoiWidth)/2;
					}
				   
				    
					console.log("newParentNodeX-newParentNodeY");	 
				    console.log(newParentNodeX+" "+newParentNodeY);	
					
					
                    parentIndexCurrentDragChild=parentNodes.length;					 
					//parentNodes.push({x: newParentNodeX, y: newParentNodeY, weight: weightNewParent, previousX: newParentNodeX , previousY: newParentNodeY, previousWeight: pcSite[2], n:parentIndexCurrentDragChild});
					
					var allGroups =childNodes.map(function(oneObject) {return oneObject.GroupID; } );
					var newGroupID="group"+parentIndexCurrentDragChild;
					if( allGroups.indexOf(newGroupID)!=-1 ){
						console.log("allGroups");
						console.log(newGroupID);
						//newGroupID=Math.max(allGroups) +parentIndexCurrentDragChild;
						newGroupID="group"+parentIndexCurrentDragChild+"-"+parentIndexCurrentDragChild;
						console.log(newGroupID);
					}						
					  parentNodes.push({x: newParentNodeX-5, y: newParentNodeY-5, weight: weightNewParent, previousX:  newParentNodeX , previousY: newParentNodeY, previousWeight: weightNewParent, n:parentIndexCurrentDragChild, GroupID: newGroupID }); //"group"+parentIndexCurrentDragChild
					
					 var arrayChildrenIdsNew=[];	
                     arrayChildrenIdsNew.length=0;					 
			         arrayChildrenIdsNew.push(parseInt(selectedNodeIndex));
		  
		            parentChildrenMap.set(parentIndexCurrentDragChild, arrayChildrenIdsNew);
					parentNodes[parentIndexCurrentDragChild]["representative"] =arrayChildrenIdsNew[0];
					
					if(sourceChildNumber>1){
						 parentNodes[parentIndexStartDragChild].previousWeight=sourceWeight;//parentNodes[parentIndexStartDragChild].weight;
						 var pc=getGroupSizeSubChildren(parentChildrenMap.get(parentIndexStartDragChild));
                         newSourceWeight=parentNodes[parentIndexStartDragChild].weight-(parentNodes[parentIndexStartDragChild].weight/pc.length) ;						 
						 //newSourceWeight=parentNodes[parentIndexStartDragChild].weight-(parentNodes[parentIndexStartDragChild].weight/parentChildrenMap.get(parentIndexStartDragChild).length) ;
											 
						 parentNodes[parentIndexStartDragChild].weight=newSourceWeight;
						 //updateHierarchy(selectedNodeIndex, parentIndexPrevoiusDragChild, parentIndexCurrentDragChild);
						 
					     var sourceParentChildren=[];
						 sourceParentChildren.length=0;
						 sourceParentChildren=Array.from(parentChildrenMap.get(parentIndexStartDragChild));
						 var indexChildSourceParent= sourceParentChildren.indexOf(parseInt(selectedNodeIndex));
						 if(indexChildSourceParent!=-1){  
						    sourceParentChildren.splice(indexChildSourceParent, 1);
						    parentChildrenMap.delete(parentIndexStartDragChild);
						    parentChildrenMap.set(parentIndexStartDragChild,sourceParentChildren);
						 }
						 
						 var sourcePrevParentChildren=[];
						 sourcePrevParentChildren.length=0;
						 sourcePrevParentChildren=Array.from(parentChildrenMap.get(parentIndexPrevoiusDragChild));
						 indexChildSourceParent= sourcePrevParentChildren.indexOf(parseInt(selectedNodeIndex));
						 if(indexChildSourceParent!=-1){
							sourcePrevParentChildren.splice(indexChildSourceParent, 1);
						    parentChildrenMap.delete(parentIndexPrevoiusDragChild);
						    parentChildrenMap.set(parentIndexPrevoiusDragChild,sourcePrevParentChildren);  
						 }
						 
						 /*var sourceCurrParentChildren=[];
						 sourceCurrParentChildren.length=0;
						 sourceCurrParentChildren=Array.from(parentChildrenMap.get(parentIndexCurrentDragChild));
						 indexChildSourceParent= sourceCurrParentChildren.indexOf(parseInt(selectedNodeIndex));
						 if(indexChildSourceParent!=-1){
							sourceCurrParentChildren.splice(indexChildSourceParent, 1);
						    parentChildrenMap.delete(parentIndexCurrentDragChild);
						    parentChildrenMap.set(parentIndexCurrentDragChild,sourceCurrParentChildren);  
						 }*/
						 
						 
						 
					}
					
					console.log("source Pnode");
					console.log(parentChildrenMap.get(parentIndexStartDragChild) );
					console.log("new Pnode");
					console.log(parentChildrenMap.get(parentIndexCurrentDragChild) );
					console.log("parentChildrenMap");
					console.log(parentChildrenMap);
					
                   var tmp=parentIndexCurrentDragChild+1;
				   
				   /////////////////////////////////////
				   
						
					 
			
					
					
					var sourceLoc1ChildNumber=parentChildrenMap.get(parentIndexStartDragChild).length;
					if(sourceLoc1ChildNumber>1){ 
					   parentNodes[parentIndexStartDragChild].weight= (sourceLoc1ChildNumber-1)/totalInitialNodesSize;
					} else{
					   parentNodes[parentIndexStartDragChild].weight= 1/totalInitialNodesSize;
					} 
					
					
						for(var p=0; p<prototypesChildrenNodes.length ; ++p){					
								//var collapseNodeId=childNodes[prototypesChildrenNodes[p]].n;	  
								//var collapseNodeParent=parseInt(d3.select("#childVorCell"+collapseNodeId).attr("parentId"));
							    var collapseNodeParent=getParentByIdLocal(childNodes[prototypesChildrenNodes[p]].GroupID).n;	
								//console.log(collapseNodeParent);
								//parentNodes[collapseNodeParent].previousWeight=1/totalInitialNodesSize ;
								parentNodes[collapseNodeParent].weight=1/totalInitialNodesSize ;				   				   
							}
							
							
parentCells=computeWeightedInitialLoc0(parentNodes,parentChildrenMap,totalInitialNodesSize, [] ,polyCopyGlobal);						   


	for(var p=0; p<prototypesChildrenNodes.length ; ++p){					
								//var collapseNodeId=childNodes[prototypesChildrenNodes[p]].n;	  
								//var collapseNodeParent=parseInt(d3.select("#childVorCell"+collapseNodeId).attr("parentId"));
								var collapseNodeParent=getParentByIdLocal(childNodes[prototypesChildrenNodes[p]].GroupID).n;	
								//console.log(collapseNodeParent);
								//parentNodes[collapseNodeParent].previousWeight=1/totalInitialNodesSize ;
								parentNodes[collapseNodeParent].weight=1/totalInitialNodesSize ;				   				   
							}


parentCells =computeWeightedBasedOnPrevoiusLocW00(parentNodes, [] ,polyCopyGlobal);	
					/*simulation = d3.voronoiMapSimulation(parentNodes)
				   .clip([[0,0], [0,voronoiHeight], [voronoiWidth, voronoiHeight], [voronoiWidth,0]])
				   .stop();
				   
				   
					state = simulation.state(); 
				   
				   while (!state.ended) {                                    // manually launch each iteration until the simulation ends
					simulation.tick();
					state = simulation.state();
				   }

				   
				   parentCells = state.polygons; 
				   
				   
				   var parentNodeSiteCurrent=null;
					parentCells.forEach((p)=>{
					  if(p.site.originalObject.data.originalData.n==parentIndexCurrentDragChild){
						parentNodeSiteCurrent=p; 
						//break;
					  }
					});
 
					var currentWeight=parentNodeSiteCurrent.site.weight;
			
				   
				   //update previousWeight for nodes    
				   //for(var index=0; index<=parentCells.length-1;++index){
					//	  var id= parentCells[index].site.originalObject.data.originalData.n;			  
					//	  var sitePolyWeight=parentCells[index].site.weight;
					//	  parentNodes[id].previousWeight= sitePolyWeight;			  
				   //}
				   
				   var parentCellsCopy= JSON.parse(JSON.stringify(parentCells)) ;
*/
				   //store parent cell in parentPolygonsMap
				   //store site x,y, and weight of parent cell  in parentSitePositionPolygonsMap
				   //storeParentPolygonsInMap();
					// updateParentNodes();
					
											   
				   /////////////////////////////////////
				   //var state;
					//do{
/*					var counter=1;	
				    var reCompute=false;
					var decreasedWeight=parentNodes[parentIndexStartDragChild].weight;
					var decreasedCurrentPreWeight=parentNodes[parentIndexCurrentDragChild].previousWeight;
					var decreasedCurrentWeight=parentNodes[parentIndexCurrentDragChild].weight;
					do{

						if(counter!=1){
							if(sourceChildNumber>1){	
                               parentNodes[parentIndexStartDragChild].previousWeight=sourceWeight /counter;						
							   parentNodes[parentIndexStartDragChild].weight = decreasedWeight /counter;


 
// 							   parentNodes[parentIndexCurrentDragChild].previousWeight=currentWeight /counter;		//decreasedCurrentPreWeight				
// 							   parentNodes[parentIndexCurrentDragChild].weight = decreasedCurrentWeight /counter;
						    }
						}
						
						//counter++;
						
						try{									
							simulation = d3.voronoiMapSimulation(parentNodes)
							   .clip([[0,0], [0,voronoiHeight], [voronoiWidth, voronoiHeight], [voronoiWidth,0]])
							   .initialPosition((d)=>[d.previousX, d.previousY])
							   .initialWeight((d)=>d.previousWeight);
						   
							   simulation.stop();
						   
						   
							   state = simulation.state(); 
							   //console.log(state.polygons.length+" "+tmp);
							   //}while(state.polygons.length<tmp)
								
							  while (!state.ended) {                                    // manually launch each iteration until the simulation ends
								simulation.tick();
								state = simulation.state();
							  }
							  
 							  parentCells.length=0;
					          parentCells=state.polygons;
							  counter=5;
					    }catch(err){
							console.log("error");
							console.log(err);			
							++counter;
                            parentNodes[parentIndexCurrentDragChild].x= parentNodes[parentIndexCurrentDragChild].x-5;
                            parentNodes[parentIndexCurrentDragChild].y= parentNodes[parentIndexCurrentDragChild].y-5;
							//parentNodes[parentIndexCurrentDragChild].previousX=parentNodes[parentIndexCurrentDragChild].previousX -5;
							//parentNodes[parentIndexCurrentDragChild].previousY=parentNodes[parentIndexCurrentDragChild].previousY -5;
							
//							parentNodes[parentIndexCurrentDragChild].previousWeight=decreasedCurrentPreWeight/counter;						
//							parentNodes[parentIndexCurrentDragChild].weight = decreasedCurrentWeight /counter;
								
								
						    if(counter==5)	
							 counter=6;
						}	
							
							
					}while( counter<5  )		//state.polygons.length<tmp  
						
                   // parentCells.length=0;
					//parentCells=state.polygons; 
                   
				   console.log("outer-counter");					
                   console.log(counter);
				   
					if (counter==6){
						console.log("error happen");
						
						 parentNodes[parentIndexStartDragChild].previousWeight=sourceWeight ;						
					     parentNodes[parentIndexStartDragChild].weight = decreasedWeight ;
						
						 var sourcePrevParentChildren=[];
						 sourcePrevParentChildren.length=0;
						 sourcePrevParentChildren=Array.from(parentChildrenMap.get(parentIndexPrevoiusDragChild));
						 //add child of not succes back to parentIndexPrevoius  
						 sourcePrevParentChildren.push(selectedNodeIndex);
                         parentChildrenMap.delete(parentIndexPrevoiusDragChild);
						 parentChildrenMap.set(parentIndexPrevoiusDragChild,sourcePrevParentChildren);  
						 //remove new parent
						 parentNodes.pop();
						 parentChildrenMap.delete(parentIndexCurrentDragChild);
						 
						 simulation = d3.voronoiMapSimulation(parentNodes)
						   .clip([[0,0], [0,voronoiHeight], [voronoiWidth, voronoiHeight], [voronoiWidth,0]])
						   .initialPosition((d)=>[d.previousX, d.previousY])
						   .initialWeight((d)=>d.previousWeight);
					   
						 simulation.stop();
					   
					   
						 state = simulation.state(); 
						   //console.log(state.polygons.length+" "+tmp);
						   //}while(state.polygons.length<tmp)
							
						 while (!state.ended) {                                    // manually launch each iteration until the simulation ends
							simulation.tick();
							state = simulation.state();
						 }
					  
					     parentCells.length=0;
					     parentCells=state.polygons;
						 
						 parentIndexCurrentDragChild=parentIndexPrevoiusDragChild;
					}						
*/					
                        //JSON.parse(JSON.stringify(parentCellsCopy)) ;
						
 

					
					parentSitePositionPolygonsMap.clear();
					parentPolygonsMap.clear();
					
					storeParentPolygonsInMap();
	                updateParentNodes();
													   
	                pcSite=parentSitePositionPolygonsMap.get(parentIndexPrevoiusDragChild);
					console.log("after-pcSite-parentIndexPrevoiusDragChild="+parentIndexPrevoiusDragChild);
					console.log(pcSite);
					
				    pcSite=parentSitePositionPolygonsMap.get(parentIndexCurrentDragChild);
					console.log("after-pcSite-parentIndexCurrentDragChild="+parentIndexCurrentDragChild);
					console.log(pcSite);
									  
					
				    parentLayer.selectAll('.polygonsChild')
//			        .filter(function(d) {  return  parseInt(this.getAttribute("id").split("-").pop())==parentIndexPrevoiusDragChild && parseInt(this.getAttribute("id").substring(12).split("-").shift())==parseInt(selectedNodeIndex);})
                    .filter(function(d) {  return  parseInt(this.getAttribute("parentId") )==parentIndexPrevoiusDragChild && parseInt(this.getAttribute("id").substring(12).split("-").shift())==parseInt(selectedNodeIndex);})
					.remove();
					
				    /* parentLayer.selectAll('.polygonsChild')
			        .filter(function(d) {  return  parseInt(this.getAttribute("id").split("-").pop())==parentIndexCurrentDragChild && parseInt(this.getAttribute("id").substring(12).split("-").shift())==parseInt(selectedNodeIndex);})
					.remove();*/					
				   
					parentLayer.selectAll('.polygonsParent')
					.remove();
					
				    parentLayer.selectAll('.rectsParent')
					.remove();
					
					
					parentLayer.selectAll('.polygonsParent')
					.data(parentCells)					
				    .enter().append("path")
				    .attr('d', renderCell)
				    .attr("class", "polygonsParent")
				    .attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.data.originalData.n; } )//i  
				    .style ('fill', "none") // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
				    .style('stroke', "gray")
				    .style('stroke-width', 3)
				    .style('stroke-opacity',parentVoronoiEdgesObacity);
					
                    updateLabelsTextFields();
													
				  // parentLayer.selectAll('.polygonsParent')
				   //.attr('fill', "none" );

/*				   parentLayer.selectAll('.rectsParent')
				   .attr("x", function (d) { return ( parentSitePositionPolygonsMap.get(d.site.originalObject.data.originalData.n)[0] ); }) // x position of rect node
				   .attr("y", function (d) { return ( parentSitePositionPolygonsMap.get(d.site.originalObject.data.originalData.n)[1] ); }); // y position of rect node 
*/				   

				   parentLayer.selectAll('.polygonsParent').lower();
							   							   				   
					
				/*   var newChildLayer= mainChildrenLayer.append('g')
	               .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                   .attr('id', "gParentChildren"+parentIndexCurrentDragChild );		//function(d) {return 	    ; }*/
			   
					var subChildrenNodes=[]; 
				    subChildrenNodes.length=0;
					var nodeData=childNodes[selectedNodeIndex];
		            subChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
				   				    
					var delaunay = d3.Delaunay.from(subChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
					var diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 
					var arrCells2=[];
					arrCells2.length=0;
					arrCells2=clippBoundaryCellsOfParentCell(diagram, parentIndexCurrentDragChild);
					
										
//				   parentCellsChildrenLayersMap.set(parentIndexCurrentDragChild,  newChildGroup);
			   
			       
				   
				   	parentLayer.append("path")
					.data(Array.from(arrCells2[0]))
				   .attr('d', renderCell)
				   .attr("class", "polygonsChild")
				   .attr("id", "childVorCell"+selectedNodeIndex )//i  +"-"+ parentIndexCurrentDragChild 
				   .attr("parentId", function(d,i){ return parentIndexCurrentDragChild} )				   
				   .style ('fill', parentCellsColors[parentIndexCurrentDragChild]) // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
				   .style('stroke', "black")
				   .style('stroke-width', 0.2)
				   .style('stroke-opacity',childrenVoronoiEdgesObacity)
				   .style('fill-opacity', 0.8);
			   
										
									   				   
			       //moveChildrenPositionInsideParentCells();
				   moveChildrenPositionInsideParentCellsStitching();
//				   reDrawAllChildren();
				   
//				   reDrawRectsParents();
		  
		  childNodes[selectedNodeIndex].GroupID= newGroupID;// "group"+parentIndexCurrentDragChild;

		  moveObj(selectedNodeIndex,parentIndexCurrentDragChild);//scalability bar chart
          
reDrawAll();		  


	  }
	  
	  
function createNewParentCellManyChildren(selectedNodeIndex, xMouseCoordinate, yMouseCoordinate, parentIndexPrevoiusDragChild, sourceWeight, parentIndexStartDragChild){
 		  		    console.log("createNewParentCell");
 		  		    console.log(selectedNodeIndex+" "+xMouseCoordinate+" "+yMouseCoordinate+" "+parentIndexPrevoiusDragChild+" "+sourceWeight+" "+parentIndexStartDragChild);
 				    sourceChildNumber=parentChildrenMap.get(parentIndexStartDragChild).length;
//		  		    console.log("parentIndexPrevoiusDragChild");
//					console.log(parentIndexPrevoiusDragChild);
					var pcSite=parentSitePositionPolygonsMap.get(parentIndexPrevoiusDragChild);
//					console.log("before-pcSite-parentIndexPrevoiusDragChild");
//					console.log(pcSite);
					 
					
				    //create new parent node at border		
					var weightNewParent = 1/totalInitialNodesSize; //1000
					
					//position of new parent node should be in clipped area.
					var newParentNodeX=parseInt(xMouseCoordinate);//950;//950;//;
					var newParentNodeY=parseInt(yMouseCoordinate);//50;//
					if (xMouseCoordinate>=voronoiWidth && yMouseCoordinate<1000){
					   newParentNodeX= (parseInt(pcSite[0])+voronoiWidth)/2;//getRandom(1000,1010)  ;
					   newParentNodeY= (parseInt(pcSite[1])+yMouseCoordinate)/2;
					}

					
					if (yMouseCoordinate>=voronoiHeight && xMouseCoordinate<voronoiWidth){
						newParentNodeY=(parseInt(pcSite[1])+voronoiHeight)/2;// 900;//getRandom(1000,1010) ;
					    newParentNodeX= (parseInt(pcSite[0])+xMouseCoordinate)/2;//getRandom(1000,1010)  ;
					}
					
					if (yMouseCoordinate>voronoiHeight && xMouseCoordinate>voronoiWidth){
					   newParentNodeY=(parseInt(pcSite[1])+voronoiHeight)/2;
					   newParentNodeX= (parseInt(pcSite[0])+voronoiWidth)/2;
					}
				   
				    
//					console.log("newParentNodeX-newParentNodeY");	 
//				    console.log(newParentNodeX+" "+newParentNodeY);	
					
					
                    parentIndexCurrentDragChild=parentNodes.length;					 
					//parentNodes.push({x: newParentNodeX, y: newParentNodeY, weight: weightNewParent, previousX: newParentNodeX , previousY: newParentNodeY, previousWeight: pcSite[2], n:parentIndexCurrentDragChild});
					
					
					var allGroups =childNodes.map(function(oneObject) {return oneObject.GroupID; } );
					var newGroupID="group"+parentIndexCurrentDragChild;
					if( allGroups.indexOf(newGroupID)!=-1 ){
						console.log("allGroups");
						console.log(newGroupID);
						//newGroupID=Math.max(allGroups) +parentIndexCurrentDragChild;
						newGroupID="group"+parentIndexCurrentDragChild+"-"+parentIndexCurrentDragChild;
						console.log(newGroupID);
					}	
					
					
					parentNodes.push({x: newParentNodeX-5, y: newParentNodeY-5, weight: weightNewParent, previousX:  newParentNodeX , previousY: newParentNodeY, previousWeight: weightNewParent, n:parentIndexCurrentDragChild , GroupID: newGroupID});
					parentNodes[parentIndexCurrentDragChild]["representative"] =childNodes[selectedNodeIndex].n;
					
					 var arrayChildrenIdsNew=[];	
                     arrayChildrenIdsNew.length=0;					 
			         arrayChildrenIdsNew.push(parseInt(selectedNodeIndex));
		  
		            parentChildrenMap.set(parentIndexCurrentDragChild, arrayChildrenIdsNew);
					//console.log(JSON.stringify(parentChildrenMap));
					//console.log(parentChildrenMap);
					
					if(sourceChildNumber>1){
						 parentNodes[parentIndexStartDragChild].previousWeight=sourceWeight;//parentNodes[parentIndexStartDragChild].weight;
						 
						 newSourceWeight=parentNodes[parentIndexStartDragChild].weight-(parentNodes[parentIndexStartDragChild].weight/parentChildrenMap.get(parentIndexStartDragChild).length) ;
											 
						 parentNodes[parentIndexStartDragChild].weight=newSourceWeight;
						 //updateHierarchy(selectedNodeIndex, parentIndexPrevoiusDragChild, parentIndexCurrentDragChild);
						 
					     var sourceParentChildren=[];
						 sourceParentChildren.length=0;
						 sourceParentChildren=Array.from(parentChildrenMap.get(parentIndexStartDragChild));
						 
						 var indexChildSourceParent= sourceParentChildren.indexOf(parseInt(selectedNodeIndex));
						 if(indexChildSourceParent!=-1){  
						    sourceParentChildren.splice(indexChildSourceParent, 1);
						    parentChildrenMap.delete(parentIndexStartDragChild);
						    parentChildrenMap.set(parentIndexStartDragChild,sourceParentChildren);
						 }
						 
						 var sourcePrevParentChildren=[];
						 sourcePrevParentChildren.length=0;
						 sourcePrevParentChildren=Array.from(parentChildrenMap.get(parentIndexPrevoiusDragChild));
						 indexChildSourceParent= sourcePrevParentChildren.indexOf(parseInt(selectedNodeIndex));
						 
						 if(indexChildSourceParent!=-1){					
						    sourcePrevParentChildren.splice(indexChildSourceParent, 1);
						    parentChildrenMap.delete(parentIndexPrevoiusDragChild);
						    parentChildrenMap.set(parentIndexPrevoiusDragChild,sourcePrevParentChildren);
						 }
						 
						 /*var sourceCurrParentChildren=[];
						 sourceCurrParentChildren.length=0;
						 sourceCurrParentChildren=Array.from(parentChildrenMap.get(parentIndexCurrentDragChild));
						 indexChildSourceParent= sourceCurrParentChildren.indexOf(parseInt(selectedNodeIndex));
						 if(indexChildSourceParent!=-1){
							sourceCurrParentChildren.splice(indexChildSourceParent, 1);
						    parentChildrenMap.delete(parentIndexCurrentDragChild);
						    parentChildrenMap.set(parentIndexCurrentDragChild,sourceCurrParentChildren);  
						 }*/
						 					
					}
					
/*					console.log("source Pnode");
					console.log(parentChildrenMap.get(parentIndexStartDragChild) );
					console.log("new Pnode");
					console.log(parentChildrenMap.get(parentIndexCurrentDragChild) );
					console.log("parentChildrenMap");
					console.log(parentChildrenMap);
*/					
                   var tmp=parentIndexCurrentDragChild+1;
				   
				   /////////////////////////////////////
				   
						
					 
			
					
					
					var sourceLoc1ChildNumber=parentChildrenMap.get(parentIndexStartDragChild).length;
					if(sourceLoc1ChildNumber>1){ 
					   parentNodes[parentIndexStartDragChild].weight= (sourceLoc1ChildNumber-1)/totalInitialNodesSize;
					} else{
					   parentNodes[parentIndexStartDragChild].weight= 1/totalInitialNodesSize;
					} 
						   

///block4
//////////// 

	for(var p=0; p<prototypesChildrenNodes.length ; ++p){					
								var collapseNodeId=childNodes[prototypesChildrenNodes[p]].n;	  
								var collapseNodeParent=parseInt(d3.select("#childVorCell"+collapseNodeId).attr("parentId"));
								//console.log(collapseNodeParent);
								//parentNodes[collapseNodeParent].previousWeight=1/totalInitialNodesSize ;
								parentNodes[collapseNodeParent].weight=1/totalInitialNodesSize ;				   				   
							}
							
                parentCells=computeWeightedInitialLoc0(parentNodes,parentChildrenMap,totalInitialNodesSize, [] ,polyCopyGlobal);
				
					for(var p=0; p<prototypesChildrenNodes.length ; ++p){					
								var collapseNodeId=childNodes[prototypesChildrenNodes[p]].n;	  
								var collapseNodeParent=parseInt(d3.select("#childVorCell"+collapseNodeId).attr("parentId"));
								//console.log(collapseNodeParent);
								//parentNodes[collapseNodeParent].previousWeight=1/totalInitialNodesSize ;
								parentNodes[collapseNodeParent].weight=1/totalInitialNodesSize ;				   				   
							}
				
				parentCells =computeWeightedBasedOnPrevoiusLocW00(parentNodes, [] ,polyCopyGlobal);					
										
                   // parentCells.length=0;
					//parentCells=state.polygons; 
                   
//				   console.log("outer-counter");					
 //                  console.log(counter);
 
				   											
                        //JSON.parse(JSON.stringify(parentCellsCopy)) ;
						

					
					parentSitePositionPolygonsMap.clear();
					parentPolygonsMap.clear();
					
					storeParentPolygonsInMap();
	                updateParentNodes();
													   
	                pcSite=parentSitePositionPolygonsMap.get(parentIndexPrevoiusDragChild);
//					console.log("after-pcSite-parentIndexPrevoiusDragChild="+parentIndexPrevoiusDragChild);
//					console.log(pcSite);
					
				    pcSite=parentSitePositionPolygonsMap.get(parentIndexCurrentDragChild);
//					console.log("after-pcSite-parentIndexCurrentDragChild="+parentIndexCurrentDragChild);
//					console.log(pcSite);
									  
					
				    parentLayer.selectAll('.polygonsChild')
//			        .filter(function(d) {  return  parseInt(this.getAttribute("id").split("-").pop())==parentIndexPrevoiusDragChild && parseInt(this.getAttribute("id").substring(12).split("-").shift())==parseInt(selectedNodeIndex);})
                    .filter(function(d) {  return  parseInt(this.getAttribute("parentId") )==parentIndexPrevoiusDragChild && parseInt(this.getAttribute("id").substring(12).split("-").shift())==parseInt(selectedNodeIndex);})
					.remove();
					
				    /* parentLayer.selectAll('.polygonsChild')
			        .filter(function(d) {  return  parseInt(this.getAttribute("id").split("-").pop())==parentIndexCurrentDragChild && parseInt(this.getAttribute("id").substring(12).split("-").shift())==parseInt(selectedNodeIndex);})
					.remove();*/					
				   
					parentLayer.selectAll('.polygonsParent')
					.remove();
					
				    parentLayer.selectAll('.rectsParent')
					.remove();
					
					
					parentLayer.selectAll('.polygonsParent')
					.data(parentCells)					
				    .enter().append("path")
				    .attr('d', renderCell)
				    .attr("class", "polygonsParent")
				    .attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.data.originalData.n; } )//i  
				    .style ('fill', "none") // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
				    .style('stroke', "gray")
				    .style('stroke-width', 3)
				    .style('stroke-opacity',parentVoronoiEdgesObacity);
					
                    updateLabelsTextFields();
													
				  // parentLayer.selectAll('.polygonsParent')
				   //.attr('fill', "none" );

/*				   parentLayer.selectAll('.rectsParent')
				   .attr("x", function (d) { return ( parentSitePositionPolygonsMap.get(d.site.originalObject.data.originalData.n)[0] ); }) // x position of rect node
				   .attr("y", function (d) { return ( parentSitePositionPolygonsMap.get(d.site.originalObject.data.originalData.n)[1] ); }); // y position of rect node 
*/				   

				   parentLayer.selectAll('.polygonsParent').lower();
							   							   				   
					
				/*   var newChildLayer= mainChildrenLayer.append('g')
	               .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                   .attr('id', "gParentChildren"+parentIndexCurrentDragChild );		//function(d) {return 	    ; }*/
			   
			   
			      
				    var parentPolygon= parentPolygonsMap.get(parentIndexCurrentDragChild);
					var polygon=turf.polygon([ parentPolygon ]);
				    var centerInfo = turf.centerOfMass(polygon);							  
				    var center=[centerInfo["geometry"]["coordinates"][0], centerInfo["geometry"]["coordinates"][1]];
				   
			   
			   
					var subChildrenNodes=[]; 
				    subChildrenNodes.length=0;
					childNodes[selectedNodeIndex].x= center[0] + getRandom(1,20);
					childNodes[selectedNodeIndex].y= center[1] + getRandom(1,20);
					var nodeData=childNodes[selectedNodeIndex];
 
		            subChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
				   				    
					var delaunay = d3.Delaunay.from(subChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
					var diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 
					var arrCells2=[];
					arrCells2.length=0;
					arrCells2=clippBoundaryCellsOfParentCell(diagram, parentIndexCurrentDragChild);
					
								

 
					var polygonClipped=turf.polygon(arrCells2[0]);
				    var centerClippedInfo = turf.centerOfMass(polygonClipped);							  
				    var centerClipped=[centerClippedInfo["geometry"]["coordinates"][0], centerClippedInfo["geometry"]["coordinates"][1]];
				   
			   
					childNodes[selectedNodeIndex].x= centerClipped[0] + getRandom(1,20);
					childNodes[selectedNodeIndex].y= centerClipped[1] + getRandom(1,20);


								
//				   parentCellsChildrenLayersMap.set(parentIndexCurrentDragChild,  newChildGroup);
			   
			       
				   
				   	parentLayer.append("path")
					.data(Array.from(arrCells2[0]))
				   .attr('d', renderCell)
				   .attr("class", "polygonsChild")
				   .attr("id", "childVorCell"+selectedNodeIndex )//i  +"-"+ parentIndexCurrentDragChild 
				   .attr("parentId", function(d,i){ return parentIndexCurrentDragChild} )				   
				   //.style ('fill', parentCellsColors[parentIndexCurrentDragChild]) // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
				   .style ('fill', "red")
				   .style('stroke', "black")
				   .style('stroke-width', 0.2)
				   .style('stroke-opacity',childrenVoronoiEdgesObacity)
				   .style('fill-opacity', 0.8);
			   
										
									   				   
			       //moveChildrenPositionInsideParentCells();
				   moveChildrenPositionInsideParentCellsStitching();
				   
				 //  	childNodes[selectedNodeIndex].x= centerClipped[0] + getRandom(1,20);
				//	childNodes[selectedNodeIndex].y= centerClipped[1] + getRandom(1,20);
					
					
				   //moveChildrenPositionInsideOneParent(parentIndexStartDragChild);
				   //moveChildrenPositionInsideOneParent(parentIndexCurrentDragChild);
//				   reDrawAllChildren();

          childNodes[selectedNodeIndex].GroupID= newGroupID;// "group"+parentIndexCurrentDragChild;
		  moveObj(selectedNodeIndex,parentIndexCurrentDragChild);//scalability bar chart
          	
reDrawAll();				   
				   
//				   reDrawRectsParents();
		  
		  				
		  
	  }
	    
	  
	  function hideAllchildren(){
		  parentLayer.selectAll('.polygonsChild').style('fill-opacity',0);
		  parentLayer.selectAll(".polygonsChild").style("stroke-opacity", 0);
		  parentLayer.selectAll('.rectsChild').style('fill-opacity',0) ;
		  parentLayer.selectAll('.rectsChild').style("stroke-width", 0)  ;		  
		  parentLayer.selectAll('.textChild').style('fill-opacity',0) ;
		  parentLayer.selectAll('.imagesChild').style('opacity',0);
		  
		  parentLayer.selectAll(".rectsChildShadow1").style("stroke-width", 0)  ;
          parentLayer.selectAll(".rectsChildShadow2").style("stroke-width", 0)  ;
		  		  
	  }
	  
	 
	 function showAllchildren(){
		  parentLayer.selectAll('.polygonsChild').style('fill-opacity',childrenVoronoiEdgesObacity);
		  parentLayer.selectAll(".polygonsChild").style("stroke-opacity", childrenVoronoiEdgesObacity);
 
		  parentLayer.selectAll('.rectsChild').style('fill-opacity',1) ;
		  parentLayer.selectAll('.textChild').style('fill-opacity',1) ;
		  parentLayer.selectAll('.imagesChild').style('opacity',imagesObacity);
		  		  
	  }
	  
	  
	  function hideOneGroupChildren(parentIndexStartDragChildLocal, selectedNodeIndex){
		  		  
		  var parentChildren= parentChildrenMap.get(parentIndexStartDragChildLocal);
          //parentChildren=getGroupSizeSubChildren(parentChildren);	
		  
		  for(var i=0; i<=parentChildren.length-1; ++i){
			  
			  if(selectedNodeIndex==parentChildren[i])
				  continue;
			  
			  var childNode=childNodes[parentChildren[i]];	
			  
			  //d3.select('#childVorCell'+childNode.n).style('fill-opacity',0);
			  d3.select('#childVorCell'+childNode.n).style("stroke-opacity", 0);			  
			  d3.select('#childRectname'+childNode.n).style('fill-opacity',0) ;			  
			  d3.select('#childTextname'+childNode.n).style('fill-opacity',0) ;			  
			  d3.select('#childImagename'+childNode.n).style('opacity',0);			  
		  }
		  		  
	  }
	  
	  function reDrawRectsParents(){
	      computeCenterOfParents();
		  parentLayer.selectAll('.rectsParent')
			.data(copyOfCenterparentNodes)
			.enter().append("rect")
			  .attr("x", function (d) { return d.x ; }) // x position of rect node
			  .attr("y", function (d) { return d.y ; }) // y position of rect node 
			  .attr("width", function(d,i){ return   rectParentWidthInitial ; })// initial width of rect  
			  .attr("height", function(d,i){ return  rectParentHeightInitial   ; } )// initial height of rect  
			  .attr("class", "rectsParent")
			  .attr("id", function(d,i){ return 'parentRectname' +d.n; })// id of rect
			  .attr("iIndex", function(d,i){ return d.n; })// index of rect
			  .style("stroke-width", strockParentWidth) // initial thickhness of border is 1
			  .style("stroke",  colorParent) // color points
			  .style("fill", colorParent)//  // color points
			  .append("svg:title") 
			  .text(function(d,i) { return 'parent node: ' + d.n;});
		  
	     parentLayer.selectAll('.rectsParent').raise();
	  }
	  
	  
	  function reDrawAllChildren(){
		  console.log("reDrawAllChildren");
	   	  visibleAllChildren.clear(); 
		   			   			   			   
		  var keysOfCurrentMap=Array.from(parentPolygonsMap.keys()); //Array.from(parentChildrenMap.keys()); //
		   
		  for(var index=0; index<=keysOfCurrentMap.length-1; ++index){		    				  
			 //delaunay=computeCenterOfMass();	  
//			  console.log(keysOfCurrentMap[index]);
			  					
			  
			  var polygonsChildGroup = parentLayer.selectAll('.polygonsChild')
			  //.filter(function(d) {if(parseInt(this.getAttribute("id").split("-").pop())==parseInt(keysOfCurrentMap[index])) console.log("end-redraw"+this.getAttribute("id")); return   parseInt(this.getAttribute("id").split("-").pop())==parseInt(keysOfCurrentMap[index]);});// 
			  .filter(function(d) {  return   parseInt(this.getAttribute("parentId") )==parseInt(keysOfCurrentMap[index]);});// 
			  						           							
			  

			  var delaunay=computeCenterOfMassParentChildren(keysOfCurrentMap[index]);
//			  var delaunay=computeDelaunyParentChildren(keysOfCurrentMap[index]);
			  var diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 
					
							

			  var arrCells1=[];
			  arrCells1.length=0;
			  arrCells1=Array.from(diagram.cellPolygons());
			  
			  
			  var arrCells2=[];
			  arrCells2.length=0;
//			  console.log("arrCells1");
//			  console.log(arrCells1);
			  
			  var parentPolygon= parentPolygonsMap.get(keysOfCurrentMap[index]);
			  var parentChildren= parentChildrenMap.get(keysOfCurrentMap[index]);
			  parentChildren=getGroupSizeSubChildren(parentChildren);
//			  console.log("reDrawAllChildren");
//			  console.log(parentChildren);
			  
			  for(var i=0; i<=arrCells1.length-1; ++i){
		  
				
				var childPolygone= Array.from(arrCells1[i]); 
				var intersectedPolygone= findIntersectionTwoPolygons(childPolygone, parentPolygon); 
//				console.log(i);
//				console.log(childPolygone);
//				console.log(parentPolygon);
//				console.log("intersectedPolygon1");
//				console.log(intersectedPolygone);
				var intersectedPolygon;
				if(intersectedPolygone!=null){
				  intersectedPolygon	= intersectedPolygone["geometry"]["coordinates"];	
				  arrCells2.push(intersectedPolygon);//Array.from
				 }else{ 
				  intersectedPolygon =childPolygone;
				  arrCells2.push(childPolygone);
				  }
				  
//				console.log("intersectedPolygon2");
//				console.log(intersectedPolygon[0].length);
//				console.log(intersectedPolygon);
				if(intersectedPolygon[0].length<4){
				  continue;
				}
				var intersected = turf.polygon([intersectedPolygon[0]]);
														  
				var centerInfo = turf.centerOfMass(intersected);
	 
				//var center=[centerInfo["geometry"]["coordinates"][0], centerInfo["geometry"]["coordinates"][1]];
//				console.log(i+" child= "+parentChildren[i]);
				
//				console.log(centerInfo["geometry"]["coordinates"][0] +" "+centerInfo["geometry"]["coordinates"][1]);
				childNodes[parentChildren[i]].x=parseFloat( centerInfo["geometry"]["coordinates"][0]);
				childNodes[parentChildren[i]].y=parseFloat( centerInfo["geometry"]["coordinates"][1]);
//				console.log(childNodes[parentChildren[i]]);
				nodeColorMapping.set( parentChildren[i], parentCellsColors[keysOfCurrentMap[index]] );
				
				visibleAllChildren.add(childNodes[parentChildren[i]].n );
			  }
			  
//			  console.log("arrCells2");
//			  console.log(arrCells2);
			  			   
			   
			  var polygonsChildCells = polygonsChildGroup.data(arrCells2)//.attr("d", renderCell).style('fill-opacity', 0.8); 			  
			  		.attr("id", function(d,i){ return "childVorCell"+ childNodes[parentChildren[arrCells2.indexOf(d)]].n  ; } ) //+"-"+ keysOfCurrentMap[index] 
					.attr("parentId", function(d,i){ return keysOfCurrentMap[index]} )
					.attr("class", "polygonsChild")
					.attr("d", renderCell)
					.style('fill', function(d,i){ return parentCellsColors[keysOfCurrentMap[index]];} )
					.style('fill-opacity', 0.8)
					.style('stroke', "black")
		            .style('stroke-width', 0.2)
		            .style('stroke-opacity',childrenVoronoiEdgesObacity);
					
														   										
			 // polygonsChildCells.selectAll(".polygonsChild")
					//.attr("d", renderCell)
					//.attr("class", "polygonsChild")
		           // .attr("id", function(d,i){ return "childVorCell"+ childNodes[parentChildren[arrCells2.indexOf(d)]].n +"-"+ keysOfCurrentMap[index] ; } )
					//.style('fill', function(d,i){ return parentCellsColors[keysOfCurrentMap[index]];} )  
					//.style('fill-opacity', 0.8)
				   // .attr('stroke', "black")
		           // .attr('stroke-width', 0.2)
		           // .style('stroke-opacity',childrenVoronoiEdgesObacity);
					
					
					//.attr('fill', "none" );
					
					//d3.select("#gParentChildren"+parentIndexStartDragChild).selectAll(".nodeGroup")
					//d3.select(this.parentNode).selectAll(".polygons").attr('fill', parentCellsColors[parentIndexStartDragChild]); 
                    
					parentLayer.selectAll('.rectsChild')//.selectAll("rect")
					.attr("x", function (d) { return (childNodes[d.n].x)-rectChildWidthInitial  *0.5; }) // x position of rect node
					.attr("y", function (d) { return (childNodes[d.n].y)-rectChildHeightInitial  *0.5; });
										
					parentLayer.selectAll('.imagesChild')
				    .attr("x", function (d) { return (childNodes[d.n].x) - imageWidthInitial  *0.5  ; } ) //+(imageWidthInitial/2) x position of image (center) +(imageWidthInitial/2)
		            .attr("y", function (d) { return (childNodes[d.n].y) - imageHeightInitial *0.5  ; } )
					
					parentLayer.selectAll('.textChild')//.selectAll("text")
						.attr("x", function (d) { return (childNodes[d.n].x -rectChildWidthInitial  *0.5); }) // x position of rect node
						.attr("y", function (d) { return (childNodes[d.n].y -rectChildHeightInitial  *0.5); }) 
						.text(function(d,i) { return d.txt;});
//					    .call(wrap);
			  
					//group.selectAll('.polygons').lower();
					//cells.selectAll('.polygons').lower();
//					parentLayer.selectAll('.polygonsChild').lower();
					polygonsChildCells.selectAll('.polygonsChild').raise();
//					d3.selectAll('.polygonsChild').lower();
					
				                
			   
			     //group.selectAll("rect").on("mouseout" ,function(){ console.log("rect"); d3.event.preventDefault(); d3.event.stopPropagation(); }); //
			     //group.selectAll("rect").on("mouseout" , function() { } );
				 parentLayer.selectAll(".rectsChild").call(d3.drag().on("start",startDragChild).on("drag", draggedChild).on("end",endDragChild));//.on("click", clicked);
				 parentLayer.selectAll("imagesChild").call(d3.drag().on("start",startDragChild).on("drag", draggedChild).on("end",endDragChild)); 
//                 parentLayer.selectAll('.polygonsChild').call(d3.drag().on("start",startDragCell).on("drag", draggedCell).on("end",endDragCell)); 				 
                 //parentLayer.selectAll(".imagesChild").on("click",clicked);
			   /////////
//			   parentLayer.selectAll('.polygonsChild').raise();	 
		       //group.selectAll('.polygons').lower();	  
//		       parentLayer.selectAll(".rectsChild").raise(); 
//			   group.selectAll("image").raise(); 
			   
//			   parentCellsChildrenLayersMap.set(keysOfCurrentMap[index], group);
		   
		  }
		  
		   //parentLayer.selectAll(".imagesChild").on("click",clicked);
		  		  		 	   
	   }
	  
reDrawAllChildrenGlobal=reDrawAllChildren;	  
	     
	   function reDrawAllChildren1(){
	   	   
	   
	   }
	  
	  
	  
	  function clippBoundaryCellsOfParentCell(diagram, parentIndex){
		  var arrCells1=[];
		  arrCells1.length=0;
		  arrCells1=Array.from(diagram.cellPolygons());
		  console.log("clippBoundaryCellsOfParentCell");
//		  console.log("arrCells1");
//		  console.log(arrCells1);
		  
		  var arrCells2=[];
		  arrCells2.length=0;
		  
				  
		  var parentPolygon= parentPolygonsMap.get(parentIndex);
		  var parentChildren= parentChildrenMap.get(parentIndex);
console.log(parentChildren);			  
		  parentChildren=getGroupSizeSubChildren(parentChildren);
console.log(parentChildren);		  
		  for(var i=0; i<=arrCells1.length-1; ++i){	  			
			var childPolygone= Array.from(arrCells1[i]); 
			
			var intersectedPolygone= findIntersectionTwoPolygons(childPolygone, parentPolygon); 
			console.log(i);
			console.log(childPolygone);
			console.log(parentPolygon);
//			console.log("intersectedPolygon1");
//			console.log(intersectedPolygone);
			//if(intersectedPolygone!=null)
				
		    if(intersectedPolygone==null || intersectedPolygone==undefined) continue;
			
		    var intersectedPolygon	= intersectedPolygone["geometry"]["coordinates"];	
			  arrCells2.push(intersectedPolygon);//Array.from
			// else 
			//  arrCells2.push(childPolygone);
//		    console.log("intersectedPolygon2");
//		    console.log(intersectedPolygon[0].length);
//			console.log(intersectedPolygon);
			if(intersectedPolygon[0].length<4){
			  continue;
			}
		    var intersected = turf.polygon([intersectedPolygon[0]]);
								  					  
		    var centerInfo = turf.centerOfMass(intersected);
			

			if(parentChildren[i]==null || parentChildren[i]== undefined){
			   console.log("clipping error");
			   console.log(childNodes[parentChildren[i]]);
			   continue;
			}
			
		    //var center=[centerInfo["geometry"]["coordinates"][0], centerInfo["geometry"]["coordinates"][1]];
//			console.log(i+" child= "+parentChildren[i]);
//			console.log(centerInfo["geometry"]["coordinates"][0] +" "+centerInfo["geometry"]["coordinates"][1]);
			childNodes[parentChildren[i]].x=parseFloat( centerInfo["geometry"]["coordinates"][0]);
			childNodes[parentChildren[i]].y=parseFloat( centerInfo["geometry"]["coordinates"][1]);
//          console.log(childNodes[parentChildren[i]]);
		  }
		  
		  
//		  console.log("arrCells2");
//		  console.log(arrCells2);
		  
		  return arrCells2;
	  }
	  
	  
	  function clippBoundaryCellsOfParentCellCollapsed(diagram, parentIndex, parentChildren){
		  var arrCells1=[];
		  arrCells1.length=0;
		  arrCells1=Array.from(diagram.cellPolygons());
		  
		  var arrCells2=[];
		  arrCells2.length=0;		  
				  
		  var parentPolygon= parentPolygonsMap.get(parentIndex);
		  
		  for(var i=0; i<=arrCells1.length-1; ++i){	  			
			var childPolygone= Array.from(arrCells1[i]); 
			var intersectedPolygone= findIntersectionTwoPolygons(childPolygone, parentPolygon); 

		    var intersectedPolygon	= intersectedPolygone["geometry"]["coordinates"];	
			  arrCells2.push(intersectedPolygon);//Array.from

			if(intersectedPolygon[0].length<4){
			  continue;
			}
		    var intersected = turf.polygon([intersectedPolygon[0]]);
								  					  
		    var centerInfo = turf.centerOfMass(intersected);		  
			childNodes[parentChildren[i]].x=parseFloat( centerInfo["geometry"]["coordinates"][0]);
			childNodes[parentChildren[i]].y=parseFloat( centerInfo["geometry"]["coordinates"][1]);
		  }
	  
		  return arrCells2;
	  }
	  
	  
	  //translate and interpolate children positions to the min square inside their parent polygon
	  	  function moveChildrenPositionInsideParentCellsStitching1(){
		  
		  var keysOfCurrentMap=Array.from(parentPolygonsMap.keys());    //Array.from(parentChildrenMap.keys()); // 
		  for(var indexPolygon=0; indexPolygon<=keysOfCurrentMap.length-1;++indexPolygon){
			      minDistanceInPolygon=Number.MAX_VALUE;

                  //get weighted cell polygone in new position
				  var parentPolygonEnd=parentPolygonsMap.get(keysOfCurrentMap[indexPolygon]);				  
				  var polygonEnd=turf.polygon([ parentPolygonEnd ]);
				  var centerInfo = turf.centerOfMass(polygonEnd);			  
//				  console.log(parentPolygon);
//				  console.log("center of "+keysOfCurrentMap[indexPolygon]);
				  var centerPolygoneEnd=[centerInfo["geometry"]["coordinates"][0], centerInfo["geometry"]["coordinates"][1]];
			  
                  //find min Distance of  Polygon points and polygone cnter
				  //console.log("dist");
				  for(var p=0; p<=parentPolygonEnd.length-1;++p){
					  var dist= computeDistance(parentPolygonEnd[p], centerPolygoneEnd);					  
					  //console.log(dist);
					  minDistanceInPolygon=Math.min(dist, minDistanceInPolygon);
				  }
				  
				  
				  // find minDistance of min sqaure in Polygon
//				  console.log("before minDistanceInPolygon");
//				  console.log(minDistanceInPolygon);
				  //minDistance=
				  var minDistanceInPolygonObject = {objectValue: minDistanceInPolygon};
				  minDistanceInPolygon=checkSquareInPolygon(polygonEnd,centerPolygoneEnd,minDistanceInPolygonObject );//minDistanceInPolygon
				  minDistanceInPolygon=minDistanceInPolygonObject.objectValue;
//				  console.log("after minDistanceInPolygon");
//				  console.log(minDistanceInPolygon);
				  if(minDistanceInPolygon==null  || minDistanceInPolygon == "undefined"){					  
				     minDistanceInPolygon=100;
//					 console.log("change undefined to "+minDistanceInPolygon);					 
				  }
				  
				  
				  //get children of parent
				  var parentChildren=parentChildrenMap.get(keysOfCurrentMap[indexPolygon]);	
                  parentChildren=getGroupSizeSubChildren(parentChildren);

				  //get min x y of min square at polygone end 
				  //and max x y of min square  MinSquare
				  //console.log("childNodes[indexChildNode]");
				  var xMaxParentMinSquare= centerPolygoneEnd[0]+minDistanceInPolygon;
                  var yMaxParentMinSquare= centerPolygoneEnd[1]+minDistanceInPolygon;
				  var xMinParentMinSquare= centerPolygoneEnd[0]-minDistanceInPolygon;
				  var yMinParentMinSquare= centerPolygoneEnd[1]-minDistanceInPolygon;
				  
				  //variables for min x y of children nodes before move polygone (start) 
				  //(bounding box)
				  var xMaxStart=Number.MIN_VALUE;
                  var yMaxStart=Number.MIN_VALUE;
				  var xMinStart=Number.MAX_VALUE;
				  var yMinStart=Number.MAX_VALUE;
				  
				
				  
				  
                  //check if current mode is move parent mode
				  if(!firstDragFlag){
					  //at move parent mode
					  //get weighted cell polygone at initial position
					  var startPolygoneClone=polygonsMapClone.get(keysOfCurrentMap[indexPolygon]);
					  var startPolygone=turf.polygon([ startPolygoneClone ]);
					  var startcenterInfo = turf.centerOfMass(startPolygone);
					  var startcenter=[startcenterInfo["geometry"]["coordinates"][0], startcenterInfo["geometry"]["coordinates"][1]];
					  var startCenterX=startcenter[0] ;
					  var startCenterY=startcenter[1] ;
					  
					  //store children vectors at initial (childrent distance from center polygone start)
					  var vecorsAtInitialMovePosition=[];
					  vecorsAtInitialMovePosition.length=0;
					  
					  for(var i=0; i<=parentChildren.length-1; ++i){
						  var indexChildNode=parentChildren[i];			      					 
							vecorsAtInitialMovePosition[indexChildNode]=[];
							vecorsAtInitialMovePosition[indexChildNode]["x"]= childNodes[indexChildNode].x -startCenterX;
							vecorsAtInitialMovePosition[indexChildNode]["y"]= childNodes[indexChildNode].y -startCenterY;
						  //console.log(childNodes[indexChildNode]);
				      }
					  
					  
					  
					  //store min x y 
                      //and max x y of children nodes at initial position start	(bounding box)				  
					  for(var i=0; i<=parentChildren.length-1; ++i){
						  var indexChildNode=parentChildren[i];	
						  if(childNodes[indexChildNode].x>xMaxStart)
							 xMaxStart=childNodes[indexChildNode].x;
						 
						  if(childNodes[indexChildNode].x<xMinStart)
							 xMinStart=childNodes[indexChildNode].x;
						 
						 
						  if(childNodes[indexChildNode].y>yMaxStart)
							 yMaxStart=childNodes[indexChildNode].y;
						 
						  if(childNodes[indexChildNode].y<yMinStart)
							 yMinStart=childNodes[indexChildNode].y;					 
					  }
					  
					  
					  // alpha to scale
					  var xAlpha= (xMaxParentMinSquare-xMinParentMinSquare)/(xMaxStart-xMinStart);
					  var yAlpha= (yMaxParentMinSquare-yMinParentMinSquare)/(yMaxStart-yMinStart);
					  
					  //var xAlpha= 0.2;
					  //var yAlpha= 0.2;
					  
					  //use alpha to scale 
					  for(var i=0; i<=parentChildren.length-1; ++i){
						  //var xAlpha= (childNodes[indexChildNode].x-xMin)/(xMax-xMin);
						  //var yAlpha= (childNodes[indexChildNode].y-yMin)/(yMax-yMin);
						  
						  var indexChildNode=parentChildren[i];			      
						  childNodes[indexChildNode].x= xAlpha * (vecorsAtInitialMovePosition[indexChildNode].x) +  centerPolygoneEnd[0];// (1-xAlpha) * xMin ;//getRandom(center[0]-minDistanceInPolygon, center[0]+minDistanceInPolygon);
						  childNodes[indexChildNode].y= yAlpha * (vecorsAtInitialMovePosition[indexChildNode].y) +  centerPolygoneEnd[1];//(1-yAlpha) * yMin ;//getRandom(center[1]-minDistanceInPolygon, center[1]+minDistanceInPolygon);
						  //console.log(childNodes[indexChildNode]);
					  }
				  
					  
					  
				  }else{
					     //other cases (modes), remove parent, create new parent, stitching, move child from/to parent, reDrawall
					     // min x y  and max x y at ploygon end
						 //let initiall them with min square
					     var xMaxEnd=xMaxParentMinSquare;
						 var yMaxEnd=yMaxParentMinSquare;
						 var xMinEnd=xMinParentMinSquare;
						 var yMinEnd=yMinParentMinSquare;
				  
				      var vecorsAtEndMovePosition=[];
					  vecorsAtEndMovePosition.length=0;
					  
					  for(var i=0; i<=parentChildren.length-1; ++i){
						  var indexChildNode=parentChildren[i];							  
						  vecorsAtEndMovePosition[indexChildNode]=[];
					      vecorsAtEndMovePosition[indexChildNode]["x"]= childNodes[indexChildNode].x -centerPolygoneEnd[0];
					      vecorsAtEndMovePosition[indexChildNode]["y"]= childNodes[indexChildNode].y -centerPolygoneEnd[1];							
						  //console.log(JSON.stringify(childNodes[indexChildNode]));
					  }
					  
					  
					  for(var i=0; i<=parentChildren.length-1; ++i){
						  var indexChildNode=parentChildren[i];	
						  if(childNodes[indexChildNode].x>xMaxEnd)
							 xMaxEnd=childNodes[indexChildNode].x;
						 
						  if(childNodes[indexChildNode].x<xMinEnd)
							 xMinEnd=childNodes[indexChildNode].x;
						 
						 
						  if(childNodes[indexChildNode].y>yMaxEnd)
							 yMaxEnd=childNodes[indexChildNode].y;
						 
						  if(childNodes[indexChildNode].y<yMinEnd)
							 yMinEnd=childNodes[indexChildNode].y;					 
				     }
				  
					  
					  var xAlpha= (xMaxParentMinSquare-xMinParentMinSquare)/(xMaxEnd-xMinEnd);
					  var yAlpha= (yMaxParentMinSquare-yMinParentMinSquare)/(yMaxEnd-yMinEnd);
					  //var xAlpha= 0.2;
					  //var yAlpha= 0.2;
					  for(var i=0; i<=parentChildren.length-1; ++i){
						  var indexChildNode=parentChildren[i];			      
						  childNodes[indexChildNode].x= xAlpha * (vecorsAtEndMovePosition[indexChildNode].x  ) + centerPolygoneEnd[0] ;//getRandom(center[0]-minDistanceInPolygon, center[0]+minDistanceInPolygon);
						  childNodes[indexChildNode].y= yAlpha * (vecorsAtEndMovePosition[indexChildNode].y  ) + centerPolygoneEnd[1]  ;//getRandom(center[1]-minDistanceInPolygon, center[1]+minDistanceInPolygon);
						  //console.log(childNodes[indexChildNode]);
					  }
					  					  
				  
				  }
				  				
		  
		    //}		
		  } 
	  }	 
	  
	  function moveChildrenPositionInsideParentCellsStitching(){
		  console.log("moveChildrenPositionInsideParentCellsStitching");
		  var keysOfCurrentMap=Array.from(parentPolygonsMap.keys());    //Array.from(parentChildrenMap.keys()); // 
		  //keysOfCurrentMap.sort(function(a, b) {
			   //return a - b;
		  //});
						 
		  for(var indexPolygon=0; indexPolygon<=keysOfCurrentMap.length-1;++indexPolygon){
			  
			  //get children of parent
			  var parentChildren=parentChildrenMap.get(keysOfCurrentMap[indexPolygon]);	
			  parentChildren=getGroupSizeSubChildren(parentChildren);
				  
				  
			  var maxInitX=Number.MIN_VALUE;
			  var maxInitY=Number.MIN_VALUE;
			  var minInitX=Number.MAX_VALUE;
			  var minInitY=Number.MAX_VALUE;
			  
			  var centerInitial=[];
			  if(parentChildren.length>1){
				  for(var i=0; i<=parentChildren.length-1; ++i){		      					
						  
						  var indexChildNode=parentChildren[i];	
						  if(childNodes[indexChildNode].x>maxInitX)
							 maxInitX=childNodes[indexChildNode].x;
						 
						  if(childNodes[indexChildNode].x<minInitX)
							 minInitX=childNodes[indexChildNode].x;
						 
						 
						  if(childNodes[indexChildNode].y>maxInitY)
							 maxInitY=childNodes[indexChildNode].y;
						 
						  if(childNodes[indexChildNode].y<minInitY)
							 minInitY=childNodes[indexChildNode].y;	
				  }
				  
				  
			       centerInitial=[(maxInitX + minInitX)/2 ,(maxInitY + minInitY)/2];
			  

			  
              
			  //console.log("centerInitial");
			  //console.log(centerInitial);
			  
			  //console.log("parentChildren");
			  //console.log(parentChildren);
			  
			  //radiusOuterCircleInitial = max(dist(posChildInitial, CGparentInitial))
			  var maxDistanceInPolygon=100;//Number.MIN_VALUE;


			  for(var i=0; i<=parentChildren.length-1; ++i){
					  var indexChildNode=parentChildren[i];
					  var pointChild=[childNodes[indexChildNode].x, childNodes[indexChildNode].y ];
					  var dist1= computeDistance(pointChild, centerInitial);
					  
					  //console.log(dist);
					  maxDistanceInPolygon=Math.max(dist1, maxDistanceInPolygon);
			  }


			  
			  var radiusOuterCircleInitial =maxDistanceInPolygon;
			  
			  var parentPolygon=parentPolygonsMap.get(keysOfCurrentMap[indexPolygon]);
              //console.log("clipPloygonGlobal");
              //console.log(parentPolygon);	
			  			  
			  //var polyCentroid1= d3.polygonCentroid(parentPolygon);

              parentPolygon=clipPloygonGlobal(parentPolygon );	
              //console.log(parentPolygon);
			  
			  //var polyCentroid2= d3.polygonCentroid(parentPolygon);
			  //console.log("polyCentroid");
			  //console.log(polyCentroid1);
			  //console.log(polyCentroid2);
						  
			  var polygon=turf.polygon([ parentPolygon ]);
			  var centerInfo = turf.centerOfMass(polygon);			  
			  //console.log("center of "+keysOfCurrentMap[indexPolygon]);
			  var centerMassFinal=[parseInt(centerInfo["geometry"]["coordinates"][0]), parseInt(centerInfo["geometry"]["coordinates"][1])];
			  //console.log("centerMassFinal");  
			  //console.log(centerMassFinal); 				  
			    
			  for(var i=0; i<=parentChildren.length-1; ++i){
					  var indexChildNode=parentChildren[i];			      
					  childNodes[indexChildNode].x= (childNodes[indexChildNode].x + (centerMassFinal[0]-centerInitial[0]) ) ;// xcenterMassFinal-xCenterMassInitial getRandom(center[0]-minDistanceInPolygon, center[0]+minDistanceInPolygon);
					  childNodes[indexChildNode].y= (childNodes[indexChildNode].y + (centerMassFinal[1]-centerInitial[1]) );//getRandom(center[1]-minDistanceInPolygon, center[1]+minDistanceInPolygon);
					  //console.log(childNodes[indexChildNode]);
			  }
			  			  			  
			 			   

			 
			 
//////////////////////

			var C={"x":centerMassFinal[0],"y":centerMassFinal[1]};
			  
			 var radiusInnerCircleFinal = getRadiusInnerCirclePolygon(C,parentPolygon);
			 
			//console.log("radiusInnerCircleFinal");	
			//console.log(radiusInnerCircleFinal);

			 var scaleFactor = radiusInnerCircleFinal / radiusOuterCircleInitial ;  
			 
			 for(var i=0; i<=parentChildren.length-1; ++i){
					  var indexChildNode=parentChildren[i];			      
					  childNodes[indexChildNode].x= scaleFactor * childNodes[indexChildNode].x + (1- scaleFactor) * centerMassFinal[0] ;  // xcenterMassFinal-xCenterMassInitial getRandom(center[0]-minDistanceInPolygon, center[0]+minDistanceInPolygon);
					  childNodes[indexChildNode].y= scaleFactor * childNodes[indexChildNode].y + (1- scaleFactor) * centerMassFinal[1] ; //getRandom(center[1]-minDistanceInPolygon, center[1]+minDistanceInPolygon);			  
			 }
			 
			 
			 
			}else {
				  
				  var indexChildNode=parentChildren[0];	
				  centerInitial=[childNodes[indexChildNode].x,childNodes[indexChildNode].y];
				   
				  var parentPolygon=parentPolygonsMap.get(keysOfCurrentMap[indexPolygon]);
				  //console.log("clipPloygonGlobal");
				  //console.log(parentPolygon);	
				  
				  parentPolygon=clipPloygonGlobal(parentPolygon );	
				  //console.log(parentPolygon);
				  
				  var polygon=turf.polygon([ parentPolygon ]);
				  var centerInfo = turf.centerOfMass(polygon);			  
				  //console.log("center of "+keysOfCurrentMap[indexPolygon]);
				  var centerMassFinal=[parseFloat(centerInfo["geometry"]["coordinates"][0]), parseFloat(centerInfo["geometry"]["coordinates"][1])];
				  //console.log("centerMassFinal");  
				  //console.log(centerMassFinal); 
				  
				  
				  childNodes[indexChildNode].x= (childNodes[indexChildNode].x + (centerMassFinal[0]-centerInitial[0]) ) ;
				  childNodes[indexChildNode].y= (childNodes[indexChildNode].y + (centerMassFinal[1]-centerInitial[1]) );
			  
			  
			}
			 
		  }
		  
	  }
	  
	  
	  function moveChildrenPositionInsideParentCellsStitching2(){
		  
		  var keysOfCurrentMap=Array.from(parentPolygonsMap.keys());    //Array.from(parentChildrenMap.keys()); // 
		  for(var indexPolygon=0; indexPolygon<=keysOfCurrentMap.length-1;++indexPolygon){
			      minDistanceInPolygon=Number.MAX_VALUE;
			//if(keysOfCurrentMap[indexPolygon]>=0){
				// compute only for non boundary parent polygon 
				  var parentPolygon=parentPolygonsMap.get(keysOfCurrentMap[indexPolygon]);
				  
				  var polygon=turf.polygon([ parentPolygon ]);
				  var centerInfo = turf.centerOfMass(polygon);
				  
//				  console.log(parentPolygon);
				  console.log("center of "+keysOfCurrentMap[indexPolygon]);
				  var center=[centerInfo["geometry"]["coordinates"][0], centerInfo["geometry"]["coordinates"][1]];
				  console.log(center);
				  
				  //console.log("poly points");
				  //console.log(parentPolygon);
				  
 
				  //console.log("dist");
				  for(var p=0; p<=parentPolygon.length-1;++p){
					  var dist= computeDistance(parentPolygon[p], center);
					  
					  //console.log(dist);
					  minDistanceInPolygon=Math.min(dist, minDistanceInPolygon);
				  }
				  
				  console.log("before minDistanceInPolygon");
				  console.log(minDistanceInPolygon);
				  //minDistance=
				  var minDistanceInPolygonObject = {objectValue: minDistanceInPolygon};
				  minDistanceInPolygon=checkSquareInPolygon(polygon,center,minDistanceInPolygonObject );//minDistanceInPolygon
				  minDistanceInPolygon=minDistanceInPolygonObject.objectValue;
				  console.log("after minDistanceInPolygon");
				  console.log(minDistanceInPolygon);
				  if(minDistanceInPolygon==null  || minDistanceInPolygon == "undefined"){					  
				     minDistanceInPolygon=100;
					 console.log("change undefined to "+minDistanceInPolygon);					 
				  }
				  //get children of parent
				  var parentChildren=parentChildrenMap.get(keysOfCurrentMap[indexPolygon]);	
				  parentChildren=getGroupSizeSubChildren(parentChildren);
									
				  //console.log("childNodes[indexChildNode]");
				  var xMaxParent= center[0]+minDistanceInPolygon;
                  var yMaxParent= center[1]+minDistanceInPolygon;
				  var xMinParent= center[0]-minDistanceInPolygon;
				  var yMinParent= center[1]-minDistanceInPolygon;
				  
				  var xMax=xMaxParent;
                  var yMax=yMaxParent;
				  var xMin=xMinParent;
				  var yMin=yMinParent;
				  
				  
				  for(var i=0; i<=parentChildren.length-1; ++i){
					  var indexChildNode=parentChildren[i];			      
					  childNodes[indexChildNode].x= (childNodes[indexChildNode].x + xMinParent) ;// xcenterMassFinal-xCenterMassInitial getRandom(center[0]-minDistanceInPolygon, center[0]+minDistanceInPolygon);
					  childNodes[indexChildNode].y= (childNodes[indexChildNode].y + yMinParent);//getRandom(center[1]-minDistanceInPolygon, center[1]+minDistanceInPolygon);
					  //console.log(childNodes[indexChildNode]);
				  }
				  
                  for(var i=0; i<=parentChildren.length-1; ++i){
					  var indexChildNode=parentChildren[i];	
                      if(childNodes[indexChildNode].x>xMax)
						 xMax=childNodes[indexChildNode].x;
					 
					  if(childNodes[indexChildNode].x<xMin)
						 xMin=childNodes[indexChildNode].x;
					 
					 
					  if(childNodes[indexChildNode].y>yMax)
						 yMax=childNodes[indexChildNode].y;
					 
					  if(childNodes[indexChildNode].y<yMin)
						 yMin=childNodes[indexChildNode].y;					 
				  }
				  

                  var Vx=xMin-xMinParent;// 
		          var Vy=yMin-yMinParent;//
			
				  
				  var xAlpha= (xMaxParent-xMinParent)/(xMax-xMin);
				  var yAlpha= (yMaxParent-yMinParent)/(yMax-yMin);
				  
				  for(var i=0; i<=parentChildren.length-1; ++i){
					  var indexChildNode=parentChildren[i];			      
					  childNodes[indexChildNode].x= xAlpha * (childNodes[indexChildNode].x +Vx) + (1-xAlpha) * xMin ;//getRandom(center[0]-minDistanceInPolygon, center[0]+minDistanceInPolygon);
					  childNodes[indexChildNode].y= yAlpha * (childNodes[indexChildNode].y +Vy) + (1-yAlpha) * yMin ;//getRandom(center[1]-minDistanceInPolygon, center[1]+minDistanceInPolygon);
					  //console.log(childNodes[indexChildNode]);
				  }
		  
		    //}		
		  } 
	  }
	  

	  function moveChildrenPositionInsideOneParent(keyParent){
	              minDistanceInPolygon=Number.MAX_VALUE;
		  
		          var parentPolygon=parentPolygonsMap.get(keyParent);
		  		  var polygon=turf.polygon([ parentPolygon ]);
				  var centerInfo = turf.centerOfMass(polygon);
				  
//				  console.log(parentPolygon);
//				  console.log("center of "+keysOfCurrentMap[indexPolygon]);
				  var center=[centerInfo["geometry"]["coordinates"][0], centerInfo["geometry"]["coordinates"][1]];
//				  console.log(center);
				  
				  //console.log("poly points");
				  //console.log(parentPolygon);
				  

				  
				  //get children of parent
				  var parentChildren=parentChildrenMap.get(keyParent);	
                  parentChildren=getGroupSizeSubChildren(parentChildren);
				  
				  for(var i=0; i<=parentChildren.length-1; ++i){
					  var indexChildNode = parentChildren[i];
					  var point=[childNodes[indexChildNode].x,childNodes[indexChildNode].y];
					  
					  if(!d3.polygonContains(parentPolygon, point)){					      
					     childNodes[indexChildNode].x= center[0]+getRandom(1,10);
					     childNodes[indexChildNode].y= center[1]+getRandom(1,10);
					  }
					 
				  }
				  
				  /*
 
				  //console.log("dist");
				  for(var p=0; p<=parentPolygon.length-1;++p){
					  var dist= computeDistance(parentPolygon[p], center);
					  
					  //console.log(dist);
					  minDistanceInPolygon=Math.min(dist, minDistanceInPolygon);
				  }
				  
//				  console.log("before minDistanceInPolygon");
//				  console.log(minDistanceInPolygon);
				  //minDistance=
				  var minDistanceInPolygonObject = {objectValue: minDistanceInPolygon};
				  minDistanceInPolygon=checkSquareInPolygon(polygon,center,minDistanceInPolygonObject );//minDistanceInPolygon
				  minDistanceInPolygon=minDistanceInPolygonObject.objectValue;
//				  console.log("after minDistanceInPolygon");
//				  console.log(minDistanceInPolygon);
				  if(minDistanceInPolygon==null  || minDistanceInPolygon == "undefined"){					  
				     minDistanceInPolygon=100;
//					 console.log("change undefined to "+minDistanceInPolygon);					 
				  }
				  //get children of parent
				  var parentChildren=parentChildrenMap.get(keyParent);	
                  parentChildren=getGroupSizeSubChildren(parentChildren);
				  
				  //console.log("childNodes[indexChildNode]");
				  var xMaxParent= center[0]+minDistanceInPolygon;
                  var yMaxParent= center[1]+minDistanceInPolygon;
				  var xMinParent= center[0]-minDistanceInPolygon;
				  var yMinParent= center[1]-minDistanceInPolygon;
				  
				  var xMax=xMaxParent;
                  var yMax=yMaxParent;
				  var xMin=xMinParent;
				  var yMin=yMinParent;
				  
				  
				  for(var i=0; i<=parentChildren.length-1; ++i){
					  var indexChildNode=parentChildren[i];			      
					  childNodes[indexChildNode].x= (childNodes[indexChildNode].x + xMinParent) ;//getRandom(center[0]-minDistanceInPolygon, center[0]+minDistanceInPolygon);
					  childNodes[indexChildNode].y= (childNodes[indexChildNode].y + yMinParent);//getRandom(center[1]-minDistanceInPolygon, center[1]+minDistanceInPolygon);
					  //console.log(childNodes[indexChildNode]);
				  }
				  
                  for(var i=0; i<=parentChildren.length-1; ++i){
					  var indexChildNode=parentChildren[i];	
                      if(childNodes[indexChildNode].x>xMax)
						 xMax=childNodes[indexChildNode].x;
					 
					  if(childNodes[indexChildNode].x<xMin)
						 xMin=childNodes[indexChildNode].x;
					 
					 
					  if(childNodes[indexChildNode].y>yMax)
						 yMax=childNodes[indexChildNode].y;
					 
					  if(childNodes[indexChildNode].y<yMin)
						 yMin=childNodes[indexChildNode].y;					 
				  }
				  

                  var Vx=xMin-xMinParent;// 
		          var Vy=yMin-yMinParent;//
			
				  
				  var xAlpha= (xMaxParent-xMinParent)/(xMax-xMin);
				  var yAlpha= (yMaxParent-yMinParent)/(yMax-yMin);
				  
				  for(var i=0; i<=parentChildren.length-1; ++i){
					  var indexChildNode=parentChildren[i];			      
					  childNodes[indexChildNode].x= xAlpha * (childNodes[indexChildNode].x +Vx) + (1-xAlpha) * xMin ;//getRandom(center[0]-minDistanceInPolygon, center[0]+minDistanceInPolygon);
					  childNodes[indexChildNode].y= yAlpha * (childNodes[indexChildNode].y +Vy) + (1-yAlpha) * yMin ;//getRandom(center[1]-minDistanceInPolygon, center[1]+minDistanceInPolygon);
					  //console.log(childNodes[indexChildNode]);
				  }
		  
		  */
	  }	  
	  
	  function updateHierarchy(child, sourceParent, targetParent){
	   console.log("updateHierarchy");
//	   childNodes[child].GroupID="group"+targetParent;
	   childNodes[child].GroupID=parentNodes[targetParent].GroupID;	   
	   //modify source parent if it has children
	   if(sourceParent!=-1){
		   var sourceParentChildren=Array.from(parentChildrenMap.get(sourceParent));
		   var indexChildSourceParent= sourceParentChildren.indexOf(parseInt(child));
		   sourceParentChildren.splice(indexChildSourceParent, 1);
		   
		   parentChildrenMap.delete(sourceParent);
		   parentChildrenMap.set(sourceParent,sourceParentChildren);
	   }
	   
	   var targetParentChildren=Array.from(parentChildrenMap.get(targetParent));
	   var tpc=getGroupSizeSubChildren(targetParentChildren);
	   
	   var firstTimeAdd=false;
	   if(targetParentChildren.indexOf(parseInt(child))==-1){
		   if(targetParentChildren.length==tpc.length)
		      targetParentChildren.push(parseInt(child));
           else		 
		      //targetParentChildren.splice(tpc.length-1,0, ...child);		 
              targetParentChildren.unshift(parseInt(child));		 
		   
		   firstTimeAdd=true;
	   }
	   
	   parentChildrenMap.delete(targetParent);
	   parentChildrenMap.set(targetParent,targetParentChildren);
	   

	   if(firstTimeAdd){
		  console.log("bef");
	      console.log(JSON.stringify(parentChildrenMap.get(targetParent)));
	      moveObj(child,targetParent);//scalability bar chart
       }
	   console.log("after");
       console.log(JSON.stringify(parentChildrenMap.get(targetParent)));	   
	 }
	 
	 
	 function updateHierarchyWithNewChild(childIndex, targetParent){
	   console.log("updateHierarchyWithNewChild"+childIndex);
	   
//	   childNodes[childIndex].GroupID= "group"+targetParent;
	   childNodes[childIndex].GroupID=parentNodes[targetParent].GroupID;		   
	   //modify target parent if it has children
	   
	   var targetParentChildren=Array.from(parentChildrenMap.get(targetParent));
	   console.log(JSON.stringify(targetParentChildren));
	   //console.log(targetParentChildren);
	   
	   if(targetParentChildren.indexOf(parseInt(childIndex))==-1){
	      targetParentChildren.push(parseInt(childIndex));
		  //parentNodes[targetParent].previousWeight= parentNodes[targetParent].weight;
		  //parentNodes[targetParent].previousWeight= targetParentChildren.length/childNodes.length;
		  //parentNodes[targetParent].weight = targetParentChildren.length/childNodes.length;		  
	   }
	  
	   console.log(JSON.stringify(targetParentChildren));
	   
	   parentChildrenMap.delete(targetParent);
	   parentChildrenMap.set(targetParent,targetParentChildren);
       
       console.log(parentChildrenMap);	   
	 } 
	 
	 
	 function updateHierarchyWithSetChildren(setChildren, targetParent){
		   /*var targetParentChildren=Array.from(parentChildrenMap.get(targetParent));
		   
		   for(var i=0;i<setChildren.length;++i){
			   var index=targetParentChildren.indexOf(parseInt(setChildren[i]));
		      if(index==-1){
			     targetParentChildren.unshift(setChildren[i]);
			  }else{
			      targetParentChildren.splice(index , 1);
				  targetParentChildren.unshift(setChildren[i]);
			  }
			  
		   }*/
		   
		   parentChildrenMap.delete(targetParent);
		   parentChildrenMap.set(targetParent,setChildren);
	       //parentChildrenMap.set(targetParent,targetParentChildren);
	 }
	 
	 function updateHierarchyWithAllChildren(){
			console.log("updateHierarchyWithAllChildren");
			for(childNode of childNodes){
				 //console.log(childNode);			 
				 var parentNode=getParentByIdLocal(childNode.GroupID);			 
				 updateHierarchyWithNewChild(childNode.n , parentNode.n );  
			}		 		 
		 
	 }
	   
	  /* document.getElementById("imagesCheckboxID").style.display = 'none';
       document.getElementById("childrenVoronoiEdgesCheckboxID").style.display = 'none';
       document.getElementById("parentVoronoiEdgesCheckboxID").style.display = 'none';

	   document.getElementById("imagesCheckboxID").addEventListener("click", showImages);
	   document.getElementById("childrenVoronoiEdgesCheckboxID").addEventListener("click", showchildrenVoronoiEdges);
	   document.getElementById("parentVoronoiEdgesCheckboxID").addEventListener("click", showParentVoronoiEdges);	  
	  */
	  //document.getElementById("imagesCheckboxID").onclick= showImages;
		
	   function showImages(){         
            
           var checkBox = document.getElementById("imagesCheckboxID");	
		   var active   = checkBox.checked ;
		   //var newOpacity;
		   
		   if (active == true){
			  imagesObacity = 1;
		   } else {
			  imagesObacity=0;
		   }		   
	   
	        
	       d3.selectAll("image").style("opacity", imagesObacity);
		   d3.selectAll("image").raise();
	   }
		 
	   
	   
	 
	   //document.getElementById("childrenVoronoiEdgesCheckboxID").onclick= showchildrenVoronoiEdges;
	   
	   function showchildrenVoronoiEdges(){         
	   
            var checkBox = document.getElementById("childrenVoronoiEdgesCheckboxID");
		    var active   = checkBox.checked ;
			 
		    //var newOpacity;
		   
		    if (active == true){
			  childrenVoronoiEdgesObacity = 1;
		    }else {
			  childrenVoronoiEdgesObacity=0;
		    }		   
	   
	        parentLayer.selectAll(".polygonsChild").style("stroke-opacity", childrenVoronoiEdgesObacity);  
			//mainChildrenLayer.selectAll(".polygons").raise();
			
				  
	   }
	   

	   //document.getElementById("parentVoronoiEdgesCheckboxID").onclick= showParentVoronoiEdges;
	   
	   function showParentVoronoiEdges(){  
       
            var checkBox = document.getElementById("parentVoronoiEdgesCheckboxID");	  
			var active   = checkBox.checked ;
		    //var newOpacity;
		   
		    if (active == true){
			  parentVoronoiEdgesObacity = 1;
		    }else {
			  parentVoronoiEdgesObacity=0;
		    }		   
	   
	       parentLayer.selectAll(".polygonsParent").style("stroke-opacity", parentVoronoiEdgesObacity);   

				  
	   }
	   
	   
	   //document.getElementById("grpupName").style.display = 'none';
	   function updateLabelsTextFields(){
		   
		    var list = document.getElementById("grpupName");
            while (list.hasChildNodes()) {
               list.removeChild(list.firstChild);
            }
			 
			//modify indexs of parentNodes
			for(var ind= 0; ind<=parentNodes.length-1 ; ind++){
				 	
				addLabel(parentNodes[ind].n, parentCellsColors[parentNodes[ind].n]);
				
				
			}
			
			//for(var ind= 0; ind<=parentNodes.length-1 ; ind++){
			   //document.getElementById("group"+ parentNodes[ind].n).value=parentNodes[ind].n;//parentNodes[ind].GroupID; 
		       //document.getElementById('group0').value=parentNodes[ind].n;
			//}
	   }
	   
	   function addLabel(id, color){    		
				var node = document.createElement('div');    				
				//node.innerHTML = '<label style= "background-color:'+color+ '"; >  '+ id +'     </label> <input type="text" id="group' + id + '" value='+parentNodes[id].GroupID+' > </input> <br></br>';     				
				node.innerHTML = '<label style= "background-color:'+color+ '"; >  '+ " &nbsp;&nbsp; "+'     </label> <input type="text" id="group' + id + '" value='+parentNodes[id].GroupID+' > </input> <br></br>'; 
				document.getElementById('grpupName').appendChild(node);    												
	    }
		
		
		function updateGroupIDLocal(parentIndex,newGroupID){
			
			var  currentParent=parentNodes[parentIndex];
		   //var currentParent=parentNodes.filter(function(objParent) {
	         // return objParent.GroupID == oldGroupID;
           //});
		   
		   var oldGroupID=currentParent.GroupID;
		   currentParent.GroupID=newGroupID;
		   
		   
		   var currentChildrens=childNodes.filter(function(objChild) {
	          return objChild.GroupID == oldGroupID;
           });
		   
		   for(child of currentChildrens){
			   child.GroupID=newGroupID;
		   }
		
		}
		
		updateGroupID=updateGroupIDLocal;
		
		
		function SaveTreemap(){
			
			var csvContent = "data:text/csv;charset=utf-8,";
			
			csvContent += ["x","y","id","GroupID"].join(",")+ "\r\n";	
			
			for(var i=0; i<=childNodes.length-1;++i){
			  var id= d3.select("#childVorCell"+parseInt(childNodes[i].n))
			  .attr("id").substring(12);	 
			  
			  var parentId= d3.select("#childVorCell"+parseInt(childNodes[i].n))
			  .attr("parentId");	
			  
			  var parentIdInputText=document.getElementById('group' + parentId ).value;
			  if(parentIdInputText=='')
				  parentIdInputText=parentId;
			  
			  var x=d3.select("#childRectname"+parseInt(childNodes[i].n))
			  .attr("x");
			  console.log(x);
			  var y=d3.select("#childRectname"+parseInt(childNodes[i].n))
			  .attr("y");
			  console.log(y);		  
			  var row=[x,y,id,parentIdInputText].join(",");	
              
              csvContent += row + "\r\n";
              			  
			}
						
			var encodedUri = encodeURI(csvContent);
			var link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "output.csv");
			document.getElementById('grpupName').appendChild(link); // Required for FF

			link.click(); 		
		}

	  SaveTreemapGlobal=SaveTreemap;

      /* document.getElementById("downloadResultButtonID").onclick=  saveResultFromClientInterface;
	   
       function saveResultFromClientInterface(){
		   
			var csvContent = "data:text/csv;charset=utf-8,";
			
			csvContent += ["x","y","id","classID"].join(",")+ "\r\n";	
			
			for(var i=0; i<=childNodes.length-1;++i){
			  var id= d3.select("#childVorCell"+parseInt(childNodes[i].n))
			  .attr("id").substring(12);	 
			  
			  var parentId= d3.select("#childVorCell"+parseInt(childNodes[i].n))
			  .attr("parentId");	
			  
			  var parentIdInputText=document.getElementById('group' + parentId ).value;
			  if(parentIdInputText=='')
				  parentIdInputText=parentId;
			  var x=d3.select("#childRectname"+parseInt(childNodes[i].n))
			  .attr("x");
			  console.log(x);
			  var y=d3.select("#childRectname"+parseInt(childNodes[i].n))
			  .attr("y");
			  console.log(y);		  
			  var row=[x,y,id,parentIdInputText].join(",");	
              
              csvContent += row + "\r\n";
              			  
			}
						
			var encodedUri = encodeURI(csvContent);
			var link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "output.csv");
			document.getElementById('grpupName').appendChild(link); // Required for FF

			link.click(); 			
	   }
	   
	   */
	   
//	   document.getElementById("addCardButtonID").onclick=  addCardFunction;
	     function addCardFunction(){         
            
           var cardID = document.getElementById("cardID").value;
		   console.log("cardID");
		   console.log(cardID);
           //call voronoi treemap functions
		   addNewChild(parseInt(cardID),0);
		   
		   try{
	          updateChildrenCells(parseInt(cardID),0);	   
		   }catch(e){
			   childNodes[childNodes.length-1].x = childNodes[childNodes.length-1].x -15;
			   childNodes[childNodes.length-1].y = childNodes[childNodes.length-1].y -15;
			   updateChildrenCells(parseInt(cardID),0);
		   }
		   
		   

	   }
	   
       
	   
	   //document.getElementById("imageFileID").onchange=  encodeImageFileAsURL(this);
	   
	   /////////////////////////////
	   function reDrawAll(){
	        console.log("reDrawAll");
			 //updateParentNodesWeights();
		  
		    //remove parent cells
			//parentLayer.selectAll('.polygonsParent')
			//d3.selectAll("path")
			mainSvg.selectAll("path")
			.remove();
			//parent parent rectangles
			//parentLayer.selectAll('.rectsParent')
			//d3.selectAll("rect")
			mainSvg.selectAll("rect")
			.remove();
			
				
			//parentLayer.selectAll('.imagesParent')
			//d3.selectAll("image")
			mainSvg.selectAll("image")
			.remove();
				
		     //d3.selectAll("text")
		     mainSvg.selectAll("text")
			.remove();	
				
			
			  //draw updated parent cells
             // console.log(parentCells);			  
			  //console.log(JSON.stringify(parentCells));
			  
			   //create parent cells
			   parentLayer.selectAll('.polygonsParent')
				  .data(parentCells)
				  .enter().append("path")
				  .attr('d', renderCell)
				  .attr("class", "polygonsParent")
				  .attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.data.originalData.n; } )//i  
				  .style ('fill', "none") // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
				  .style('stroke', "gray")
				  .style('stroke-width', 3)
				  .style('stroke-opacity',parentVoronoiEdgesObacity);
				  
				  
			   //create parent rectangles	  
			  /* parentLayer.selectAll('.rectsParent')
				.data(parentCells)
				.enter().append("rect")
				  .attr("x", function (d) { return ( parentSitePositionPolygonsMap.get(d.site.originalObject.data.originalData.n)[0] ); }) // x position of rect node
				  .attr("y", function (d) { return ( parentSitePositionPolygonsMap.get(d.site.originalObject.data.originalData.n)[1] ); }) // y position of rect node 
				  .attr("width", function(d,i){ return   rectParentWidthInitial ; })// initial width of rect  
				  .attr("height", function(d,i){ return  rectParentHeightInitial   ; } )// initial height of rect  
				  .attr("class", "rectsParent")
				  .attr("id", function(d,i){ return 'parentRectname' +d.site.originalObject.data.originalData.n; })// id of rect
				  .attr("iIndex", function(d,i){ return d.site.originalObject.data.originalData.n; })// index of rect
				  .style("stroke-width", strockParentWidth) // initial thickhness of border is 1
				  .style("stroke",  colorParent) // color points
				  .style("fill", colorParent)//  // color points
				  .append("svg:title") 
				  .text(function(d,i) { return 'parent node: ' + d.site.originalObject.data.originalData.n;});
					  
					 */ 
				   

			parentLayer.selectAll('.polygonsParent').lower();
			
			//remove children cells
			parentLayer.selectAll('.polygonsChild')				
			.remove();
			
			
			
	
	//////////////
	//translate children position to the min square of their parent polygon 
			moveChildrenPositionInsideParentCellsStitching();
			
			//draw children cells
			visibleAllChildren.clear();
			totalArrCell2.length=0;
			var keysOfCurrentMap=Array.from(parentChildrenMap.keys());//Array.from(parentPolygonsMap.keys());
			for(var index=0; index<=keysOfCurrentMap.length-1;++index){		    				    
//				  console.log(keysOfCurrentMap[index]);
				  delaunay=computeCenterOfMassParentChildren(keysOfCurrentMap[index]);
				  //delaunay=computeDelaunyParentChildren(keysOfCurrentMap[index]);
				  diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 
															
				  var arrCells1=Array.from(diagram.cellPolygons());
									  
				  var arrCells2=[];
				  arrCells2.length=0;
//				  console.log("arrCells1");
//				  console.log(arrCells1);
				  
				  var arrCell2Id=[];
				  arrCell2Id.length=0;
														  
				  var parentPolygon= parentPolygonsMap.get(keysOfCurrentMap[index]);
				  var parentChildren= parentChildrenMap.get(keysOfCurrentMap[index]);
				  parentChildren=getGroupSizeSubChildren(parentChildren);
				  
				  for(var i=0; i<=arrCells1.length-1; ++i){
									
					var childPolygone= Array.from(arrCells1[i]); 
					var intersectedPolygone= findIntersectionTwoPolygons(childPolygone, parentPolygon); 
					
//					console.log("intersectedPolygon1");
//					console.log(intersectedPolygone);
					//if(intersectedPolygone!=null)
				    if(intersectedPolygone==null || intersectedPolygone==undefined) continue;
					var intersectedPolygon	= intersectedPolygone["geometry"]["coordinates"];	
					  arrCells2.push(intersectedPolygon);//Array.from
					  arrCell2Id.push(childNodes[parentChildren[i]].n);
					// else 
					//  arrCells2.push(childPolygone);
//					console.log("intersectedPolygon2");
//					console.log(intersectedPolygon[0].length);
//					console.log(intersectedPolygon);
					if(intersectedPolygon[0].length<4){
					  continue;
					}
					var intersected = turf.polygon([intersectedPolygon[0]]);
															  
					var centerInfo = turf.centerOfMass(intersected);
					
					if(parentChildren[i]==null || parentChildren[i]== undefined){
						   console.log("clipping error");
						   console.log(childNodes[parentChildren[i]]);
						   continue;
				    }
		 
					//var center=[centerInfo["geometry"]["coordinates"][0], centerInfo["geometry"]["coordinates"][1]];
//					console.log(i+" child= "+parentChildren[i]);
//					console.log(centerInfo["geometry"]["coordinates"][0] +" "+centerInfo["geometry"]["coordinates"][1]);
					childNodes[parentChildren[i]].x=parseFloat( centerInfo["geometry"]["coordinates"][0]);
					childNodes[parentChildren[i]].y=parseFloat( centerInfo["geometry"]["coordinates"][1]);
//					console.log(childNodes[parentChildren[i]]);
					
					nodeColorMapping.set( parentChildren[i], parentCellsColors[keysOfCurrentMap[index]] );
				    visibleAllChildren.add(childNodes[parentChildren[i]].n );
				  }
				  
//				  console.log("arrCells2");
//				  console.log(arrCells2);
				  totalArrCell2.push(...arrCells2);
//				  console.log("totalArrCell2");
//				  console.log(totalArrCell2);
						   
				  parentLayer.selectAll('.polygonsChild')
				  .data(totalArrCell2)
				  .enter().append("path") 
				  .attr("d", renderCell)
				  .attr("class", "polygonsChild")
				  .attr("id", function(d,i){ return "childVorCell"+arrCell2Id[arrCells2.indexOf(d)]  ; } )//+"-"+ keysOfCurrentMap[index] 
				  .attr("parentId", function(d,i){ return  keysOfCurrentMap[index];})
				  .attr('stroke', "black")
				  .attr('stroke-width', 0.2)
				  .style('stroke-opacity',childrenVoronoiEdgesObacity)
				  .attr('fill', parentCellsColors[keysOfCurrentMap[index]]) // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
				  .style('fill-opacity', 0.8);
				  												 
			}
			  
		


///////////

 
	  //create children rectangles	   		   
	   /////////updateLayout(group, false);
	 
 //     drawChildRects();
	  parentLayer.selectAll(".rectsChild")
	  //.data(childNodes)
	  .data(childNodes.filter(function(d){return visibleAllChildren.has(d.n);}))
	  .enter().append("rect")
	  .attr("x", function (d) { return d.x-rectChildWidthInitial  *0.5  ; }) // x position of rect node
	  .attr("y", function (d) { return d.y-rectChildHeightInitial  *0.5  ; }) // y position of rect node 
	  .attr("width", function(d,i){ return   rectChildWidthInitial  ; })// initial width of rect   
	  .attr("height", function(d,i){ return  rectChildHeightInitial  ; } )// initial height of rect  
	  .attr("class", "rectsChild")
	  .attr("id", function(d,i){ return 'childRectname' +d.n; })// id of rect
	  .attr("iIndex", function(d,i){ return d.n; })// index of rect
	  .style("stroke-width", 0.1) // initial thickhness of border is 1
	  .style("stroke",  "none") //"black" color points
	  .style("fill","none" )//"white" "black"  // color points
	  .append("svg:title") 
	  .text(function(d,i) { return ' child node: ' + d.n;});
   

   
      //create children lables
	  parentLayer.selectAll(".textChild")
	  //.data(childNodes)
	  .data(childNodes.filter(function(d){return visibleAllChildren.has(d.n);}))
	  .enter().append("text")
	  .attr("x", function (d) { return (d.x -rectChildWidthInitial  *0.5); }) // x position of rect node
	  .attr("y", function (d) { return (d.y -rectChildHeightInitial  *0.5); }) 
	  .attr("class", "textChild")
	  .attr("id", function(d,i){ return 'childTextname' +d.n; })// id of rect
	  .attr("iIndex", function(d,i){ return d.n; })// index of rect
	  .text(function(d,i) { return d.txt;});
//	  .call(wrap);
	  
	  
	  
	  //create children images
	   //appendImages(group);	   
	   parentLayer.selectAll(".imagesChild")
	      //.data(childNodes)
		  .data(childNodes.filter(function(d){return visibleAllChildren.has(d.n);}))
	      .enter().append("image")
//		  .attr("xlink:href", function (d,i) { return "static/images/BCLCimagesHighchart/" +d.id+".png" ; })
//		  .attr("xlink:href", function (d,i) { return "code/GroupingImages/static/images/BCLCimagesHighchart/" +d.id+".png" ; })//".webp" FoodData TextData Demographic BCLCimagesHighchartTest MNIST30Test  AirQuality  image path   
          .attr("xlink:href", function(d) { return    d.img; } )			  
		  .attr("x", function (d) { return d.x - imageWidthInitial  *0.5  ; } ) //+(imageWidthInitial/2) x position of image (center) +(imageWidthInitial/2)
		  .attr("y", function (d) { return d.y - imageHeightInitial *0.5  ; } ) //+ y position of image (center) +(imageHeightInitial/2)
		  .attr("iid", function (d,i) { return d.n; } )// id of image 
		  .attr("id", function(d,i){ return 'childImagename' + d.n; }) // In d3, id should start with letters  
		  .attr("iIndex",function (d,i) { return d.n; } ) // index of value in data (to fast look up in data)
		  .attr("width", imageWidthInitial) // initial width of image
		  .attr("height", imageHeightInitial) // initial height of image
		  .attr("class", "imagesChild")
		  .style('opacity',imagesObacity)
		  //.on("click",clicked)
		  //.on('mouseover',mouseOverHandle )
		  //.on('mouseup',mouseUpHandle)
		  //.on('contextmenu',mouseOverHandle )
		  .on('mouseout',mouseOutHandle)
		  .on('wheel',mouseWheelHandler )
		  //.on("click",clicked)    
		  .append("svg:title") 
		  .text(function(d,i) { return 'id: ' + d.n;});	   
			 
			 
	
		  //define drag events for children rects and images
//		   group.selectAll("rect").on("mouseout" ,function(){ console.log("rect"); d3.event.preventDefault(); d3.event.stopPropagation(); }); //
		  //group.selectAll("rect").on("mouseout" , function() { } );
		  parentLayer.selectAll(".rectsChild").call(d3.drag().on("start",startDragChild).on("drag", draggedChild).on("end",endDragChild));//.on("click", clicked); //  clickDistance(10). .on('click', clicked)
		  
		  parentLayer.selectAll(".imagesChild").call(d3.drag().on("start",startDragChild).on("drag", draggedChild).on("end",endDragChild)).on("click", clicked).on("dblclick",dbclicked);
		  //define drag (stitching) events for children cells  
//		  parentLayer.selectAll('.polygonsChild').call(d3.drag().on("start",startDragCell).on("drag", draggedCell).on("end",endDragCell)); 
          //parentLayer.selectAll(".imagesChild").on("click",clicked);
	   /////////
	   
	   //parentLayer.selectAll(".imagesChild")
	   //.on('mousedown',mouseDownHandle)
	   //.on('mouseup',mouseUpHandle);
			
	   parentLayer.selectAll(".polygonsChild").lower();	
	   	   parentLayer.selectAll("rect").raise(); 
	   //mainChildrenLayer.selectAll('.polygons').selectAll("rect").raise();   
	   parentLayer.selectAll(".imagesChild").raise();

		   
	//////////////
            reDrawAllChildren();
			
		    parentIndexStartDragChild = -1;
		    parentIndexEndDragChild = -1;
		  
		  
		    sourceWeight=-1;
		    newSourceWeight=-1;
		    sourceChildNumber = -1;
		  
		     startTime=0;
		     isParentNodeMove=false;
		     time=-1;	
	  
	  
		    parentIndexPrevoiusDragChild=-1;
	        currentDragChildPolygon=null;
	        firstDragFlag=true;
	        //prevDragtime== 0;
		  
		  


	        parentLayer.selectAll('.polygonsParent')
	  	   .style('stroke-opacity',0);
		   
		   
		     // parentLayer.selectAll(".imagesChild").on("click",clicked);
		  
		    showRepresentativeRects(); 
			
            			
		}

reDrawAllGlobal= reDrawAll;



function showLevels(){
  
    //reDrawAll();
	
    for(var i=0; i<=childNodes.length-1;++i){
		  var level=  parseInt(childNodes[i].level);
		  var prob=  childNodes[i].p;
		  var textNode= "id:"+ childNodes[i].n+  " level="+level+"  p="+prob;
		  
		  d3.select("#childVorCell"+ childNodes[i].n).style('fill-opacity', 0.9/(level+1));	
		  d3.select("#childTextname"+ childNodes[i].n).text(textNode);       		 
	}

}

showLevelsGlobal=showLevels;

        function teleportChidCell(selectedNodeIndex, parentSourceTeleportLocal , parentTargetTeleportLocal){	
           console.log("teleportChidCell");
//////////////////start 
	       var parentNodeSiteSource=null;
			parentCells.forEach((p)=>{
			  if(p.site.originalObject.data.originalData.n==parentSourceTeleportLocal){
			    parentNodeSiteSource=p; 
				//break;
			  }
			});
			

			sourceWeight=parentNodeSiteSource.site.weight;	           
			sourceChildNumber=parentChildrenMap.get(parentSourceTeleportLocal).length;
			
			
			newSourceWeight = 1/totalInitialNodesSize;
			if(sourceChildNumber>1)
			  newSourceWeight =  (sourceChildNumber-1)/totalInitialNodesSize;//10000 * sourceWeight - sourceUnitWeight;
					
						
//			parentIndexPrevoiusDragChild= parentSourceTeleportLocal;	
			
//			console.log("startTime");
//			startTime = new Date().getTime(); //.getSeconds();//

///////////////////		
					updateHierarchy(selectedNodeIndex, parentSourceTeleportLocal, parentTargetTeleportLocal);
					//storeParentPolygonsInMap();
															
					var PreviuosParentChildren=parentChildrenMap.get(parentSourceTeleportLocal);	
					console.log("PreviuosParentChildren");
					console.log(PreviuosParentChildren);
					
					var parentChildren=parentChildrenMap.get(parentTargetTeleportLocal);	
//					console.log("parentChildren");
//					console.log(parentChildren);
					
					var presubChildrenNodes=[]; 
					presubChildrenNodes.length=0;
					for(var i=0;i<PreviuosParentChildren.length;i++){
					   var nodeData=childNodes[PreviuosParentChildren[i]];
					   presubChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
					}
					
					///////////////////
					
					var delaunayPrev = d3.Delaunay.from(presubChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
					var diagramPrev = delaunayPrev.voronoi([0,0,voronoiWidth,voronoiHeight]); 
					var arrCellsPrev=[];
					arrCellsPrev.length=0;
					//if(presubChildrenNodes.length!=0){
				    //try{
					 arrCellsPrev=clippBoundaryCellsOfParentCell(diagramPrev, parentSourceTeleportLocal); 
					//}catch(e){
					//}
					///////////////////
					
                	var prevPolygonsChildGroup = parentLayer.selectAll('.polygonsChild')
					//.filter(function(d) {  return   parseInt(this.getAttribute("id").split("-").pop())==parentIndexPrevoiusDragChild;});// 
					.filter(function(d) {  return   parseInt(this.getAttribute("parentId") )==parentSourceTeleportLocal;});// 
					
					var prevPolygonsChildCells = prevPolygonsChildGroup.data(arrCellsPrev)
					.attr("id", function(d,i){ return "childVorCell"+ childNodes[PreviuosParentChildren[arrCellsPrev.indexOf(d)]].n  ; } )//+"-"+ parentIndexPrevoiusDragChild 
					.attr("parentId", function(d,i){ return parentSourceTeleportLocal} )	
					.attr("d", renderCell).style('fill-opacity', 0.8);
                     
                    prevPolygonsChildCells.exit()
					.remove();
					
					
					 prevPolygonsChildCells.selectAll("path")
					 .attr("class", "polygonsChild")
					.attr('fill', parentCellsColors[parentSourceTeleportLocal])  
					.style('fill-opacity', 0.8)
					.attr('class', 'polygonsChild').lower();
								
					////////////////////
					parentChildren=parentChildrenMap.get(parentTargetTeleportLocal);	
//					console.log("2parentChildren");
//					console.log(parentChildren);
					
					var subChildrenNodes=[]; 
					subChildrenNodes.length=0;
					for(var i=0;i<parentChildren.length;i++){
					   var nodeData=childNodes[parentChildren[i]];
					   subChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
					}
					
					//subChildrenNodes.sort((a, b) => (a.n > b.n) ? 1 : -1);
					
					///////////////////
					var delaunay = d3.Delaunay.from(subChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
					var diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 
					var arrCells2=[];
					arrCells2.length=0;
					arrCells2=clippBoundaryCellsOfParentCell(diagram, parentTargetTeleportLocal); 
					///////////////////
					
					//d3.select("#childVorCell"+ selectedNodeIndex+"-"+ parentIndexPrevoiusDragChild).remove(); 
					//parentLayer.select("#childVorCell"+ selectedNodeIndex+"-"+ parentIndexPrevoiusDragChild).attr("id","childVorCell"+ selectedNodeIndex+"-"+ parentIndexCurrentDragChild); 
					
                    var currPolygonsChildGroup = parentLayer.selectAll('.polygonsChild')
	//				.filter(function(d) { return   parseInt(this.getAttribute("id").split("-").pop())==parentIndexCurrentDragChild;});// 
					.filter(function(d) { return   parseInt(this.getAttribute("parentId"))==parentTargetTeleportLocal;});// 
					
					var currPolygonsChildCells = currPolygonsChildGroup.data(arrCells2)                    
					.attr("id", function(d,i){ return "childVorCell"+ childNodes[parentChildren[arrCells2.indexOf(d)]].n  ; } ) //+"-"+ parentIndexCurrentDragChild 
					.attr("parentId", function(d,i){ return parentTargetTeleportLocal} )
					.attr("d", renderCell).style('fill-opacity', 0.8);
					
					
					 //currPolygonsChildCells.enter().append("path");
					 
					currPolygonsChildCells.selectAll("path")
					.attr("d", renderCell)
					.attr("class", "polygonsChild")
		            .attr("id", function(d,i){ return "childVorCell"+ childNodes[parentChildren[arrCells2.indexOf(d)]].n  ; } )//+"-"+ parentIndexCurrentDragChild 
					.attr("parentId", function(d,i){ return parentTargetTeleportLocal} )
					.attr('fill', parentCellsColors[parentTargetTeleportLocal])  
					.style('fill-opacity', 0.8);
					//.attr('class', 'polygonsChild').lower();
					
					
					
					parentLayer.selectAll('.rectsChild')//.selectAll("rect")
					.attr("x", function (d) { return (childNodes[d.n].x) - (imageWidthInitial/2); }) // x position of rect node
					.attr("y", function (d) { return (childNodes[d.n].y) - (rectChildHeightInitial/2); });
					
										 					  					
					parentLayer.selectAll('.imagesChild')
				    .attr("x", function (d) { return (childNodes[d.n].x) - (imageWidthInitial/2)  ; } ) //+(imageWidthInitial/2) x position of image (center) +(imageWidthInitial/2)
		            .attr("y", function (d) { return (childNodes[d.n].y) - (imageHeightInitial/2)  ; } );
					
					parentLayer.selectAll('.textChild')//.selectAll("text")
						.attr("x", function (d) { return (childNodes[d.n].x -3); }) // x position of rect node
						.attr("y", function (d) { return (childNodes[d.n].y -3); }) 
						.text(function(d,i) { return d.n;});
					
													
				
					var indexLocalOfCurrentNod= parentChildren.indexOf(parseInt(selectedNodeIndex));
//					console.log(selectedNodeIndex+"indexLocalOfCurrentNod"+indexLocalOfCurrentNod);
//					console.log(parentChildren);
//					console.log(arrCells2[indexLocalOfCurrentNod]);
					parentLayer.append("path")
					 .data(Array.from(arrCells2[indexLocalOfCurrentNod]))
				   .attr('d', renderCell)
				   .attr("class", "polygonsChild")
				   .attr("id", function(d,i){ return "childVorCell"+ selectedNodeIndex ;} )//i  +"-"+ parentIndexCurrentDragChild  
				   .attr("parentId", function(d,i){ return parentTargetTeleportLocal} )				   
				   .style ('fill', parentCellsColors[parentSourceTeleportLocal]) // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
				   .style('stroke', "gray")
				   .style('stroke-width', 3)
				   .style('stroke-opacity',parentVoronoiEdgesObacity)
				   .style('fill-opacity', 0.8);
					
					d3.selectAll('.polygonsChild').lower();
                    d3.select("#childVorCell"+selectedNodeIndex).raise();	//+"-"+ parentIndexCurrentDragChild

                    d3.selectAll("image").style("opacity", imagesObacity);
				    parentLayer.selectAll(".imagesChild").raise();
					parentLayer.selectAll("rect").raise();
					
					
					
					
					////////////////////end
					/// modify source of target  
					var parentSelectedNode=-1;
															
					if(sourceChildNumber<=1){
						 //remove parentNode  that has no children 
						 parentNodes.splice(parentSourceTeleportLocal , 1);
						 parentChildrenMap.delete(parentSourceTeleportLocal);
						 parentPolygonsMap.delete(parentSourceTeleportLocal);
						 parentCellsColors.splice(parentSourceTeleportLocal , 1);
						 
						 //modify indexs of parentNodes
						 for(var ind= 0; ind<=parentNodes.length-1 ; ind++){
							parentNodes[ind].n=ind;	
						 }
						 
						 //get sorted keys of parents
						 var keysOfCurrentMap=Array.from(parentChildrenMap.keys());                
						 keysOfCurrentMap.sort(function(a, b) {
						   return a - b;
						 });
						 
						 //modify keys in parentChildrenMap
						 for(var index=0; index<=keysOfCurrentMap.length-1;++index){
							 parentChildrenMap.set(index, parentChildrenMap.get(keysOfCurrentMap[index]));						 
							 parentPolygonsMap.set(index, parentPolygonsMap.get(keysOfCurrentMap[index]));
							 if( parentChildrenMap.get(keysOfCurrentMap[index]).indexOf(selectedNodeIndex)!=-1 ){
								 parentSelectedNode=keysOfCurrentMap[index];
							 }
						 }
											 
						parentSourceTeleportLocal=-1;
					}
						  				  

				    parentIndexEndDragChild=parentTargetTeleportLocal;
//					parentIndexEndDragChild=parentIndexPrevoiusDragChild;			
					//parentIndexEndDragChild=findParentPolygon(xMouseCoordinate,yMouseCoordinate);

					if(sourceChildNumber==1){										
						parentIndexEndDragChild = parentSelectedNode;	
						handleRemoveParentCell();					
					}

                    
					if(parentSourceTeleportLocal != parentIndexEndDragChild){                    
					    moveChildFromParentToParent(parentIndexEndDragChild, parentSourceTeleportLocal);																			   					       					   					
					}				
					
					reDrawAllChildren();
				    
					
					  parentIndexStartDragChild = -1;
				   parentIndexEndDragChild = -1;
				   parentIndexPrevoiusDragChild=-1;
			
			   //if(isParentNodeMove)
			   // isParentNodeMove=false;
			   
			      copyOfparentNodes.length=0;
			      firstDragFlag=true;
//			   d3.select("#currentCell"+selectedNodeIndex).remove();
					
				  parentLayer.selectAll(".polygonsChild").raise();
				  parentLayer.selectAll('.rectsChild').raise() ;
				  parentLayer.selectAll('.rectsParent').raise() ;
				  parentLayer.selectAll('.textChild').raise();
				  
				  d3.selectAll("image").style("opacity", imagesObacity);
				  parentLayer.selectAll(".imagesChild").raise();
		  
					///////////////////
				 
					/////////////////////
					
		}


/*function teleportLastChidCell(selectedNodeIndex, parentSourceTeleportLocal , parentTargetTeleportLocal){	    
	sourceChildNumber=parentChildrenMap.get(parentSourceTeleportLocal).length;	
	updateHierarchy(selectedNodeIndex, parentSourceTeleportLocal, parentTargetTeleportLocal);

	if(sourceChildNumber<=1){
		 //remove parentNode  that has no children 
		 parentNodes.splice(parentSourceTeleportLocal , 1);
		 parentChildrenMap.delete(parentSourceTeleportLocal);
		 parentPolygonsMap.delete(parentSourceTeleportLocal);
		 parentCellsColors.splice(parentSourceTeleportLocal , 1);
		 
		 //modify indexs of parentNodes
		 for(var ind= 0; ind<=parentNodes.length-1 ; ind++){
			parentNodes[ind].n=ind;	
		 }
		 
		 //get sorted keys of parents
		 var keysOfCurrentMap=Array.from(parentChildrenMap.keys());                
		 keysOfCurrentMap.sort(function(a, b) {
		   return a - b;
		 });
		 
		 //modify keys in parentChildrenMap
		 for(var index=0; index<=keysOfCurrentMap.length-1;++index){
			 parentChildrenMap.set(index, parentChildrenMap.get(keysOfCurrentMap[index]));						 
			 parentPolygonsMap.set(index, parentPolygonsMap.get(keysOfCurrentMap[index]));
			 if( parentChildrenMap.get(keysOfCurrentMap[index]).indexOf(selectedNodeIndex)!=-1 ){
				 parentSelectedNode=keysOfCurrentMap[index];
			 }
		 }
							 
		parentSourceTeleportLocal=-1;
	
						  

		parentIndexEndDragChild=parentTargetTeleportLocal;
//					parentIndexEndDragChild=parentIndexPrevoiusDragChild;			
		//parentIndexEndDragChild=findParentPolygon(xMouseCoordinate,yMouseCoordinate);

		parentChildrenMap.delete(keysOfCurrentMap.length);

	}
	
	
}*/



function getUserDataLocal(){
			//var csvContent = "data:text/csv;charset=utf-8,";
			
			var csvContent = ["id","classID","color"].join(",")+ "\r\n";	
			
			for(var i=0; i<=childNodes.length-1;++i){
			  var id= childNodes[i].id; 	 
			  var childIndex=childNodes[i].n;
			  
			  var  parentIndex = getParentIdFrmChildIndx(childIndex); 
			  
			  var  parentId= parentNodes[parentIndex].GroupID ;
			  
			  var cellColor= parentCellsColors[parentIndex];
			  
			  
			  //var parentIdInputText=document.getElementById('group' + parentId ).value;
			  //if(parentIdInputText=='')
				  //parentIdInputText="group"+parentId;
			  
			  //if(parentIdInputText==''){
				 // parentIdInputText="group"+parentId;
				  //document.getElementById('group' + parentId ).value=parentIdInputText;
			  //}
				  
			  var row=[id,parentId,cellColor].join(",");	
              
              csvContent += row + "\r\n";
              			  
			}
			
			return csvContent;
						
}		
	   
getUserData=getUserDataLocal;


function getParentChildrenMapLocal(){
   return  parentChildrenMap;
}

getParentChildrenMap=getParentChildrenMapLocal;

	
	   /////////////////////////////
	   
	    function lineSelectionChidCell(selectedNodeIndex, parentSourceTeleportLocal , parentTargetTeleportLocal){	
           console.log("lineSelectionChidCell");
		   console.log(selectedNodeIndex);
		   console.log(parentSourceTeleportLocal);
		   console.log(parentTargetTeleportLocal);
//////////////////start 
	       var parentNodeSiteSource=null;
			parentCells.forEach((p)=>{
			  if(p.site.originalObject.data.originalData.n==parentSourceTeleportLocal){
			    parentNodeSiteSource=p; 
				//break;
			  }
			});
			

			sourceWeight=parentNodeSiteSource.site.weight;	           
			sourceChildNumber=parentChildrenMap.get(parentSourceTeleportLocal).length;
			
			
			newSourceWeight = 1/totalInitialNodesSize;
			if(sourceChildNumber>1)
			  newSourceWeight =  (sourceChildNumber-1)/totalInitialNodesSize;//10000 * sourceWeight - sourceUnitWeight;
					
						
//			parentIndexPrevoiusDragChild= parentSourceTeleportLocal;	
			
//			console.log("startTime");
//			startTime = new Date().getTime(); //.getSeconds();//

///////////////////		
					updateHierarchy(selectedNodeIndex, parentSourceTeleportLocal, parentTargetTeleportLocal);
					//storeParentPolygonsInMap();
															
					var PreviuosParentChildren=parentChildrenMap.get(parentSourceTeleportLocal);	
                    PreviuosParentChildren=getGroupSizeSubChildren(PreviuosParentChildren);
//					console.log("PreviuosParentChildren");
//					console.log(PreviuosParentChildren);
					
					var parentChildren=parentChildrenMap.get(parentTargetTeleportLocal);	
					parentChildren=getGroupSizeSubChildren(parentChildren);
//					console.log("parentChildren");
//					console.log(parentChildren);
					moveChildrenPositionInsideOneParent(parentSourceTeleportLocal);
					var presubChildrenNodes=[]; 
					presubChildrenNodes.length=0;
					for(var i=0;i<PreviuosParentChildren.length;i++){
					   var nodeData=childNodes[PreviuosParentChildren[i]];
					   presubChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
					}
					
					///////////////////
					var delaunayPrev = d3.Delaunay.from(presubChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
					var diagramPrev = delaunayPrev.voronoi([0,0,voronoiWidth,voronoiHeight]); 
					var arrCellsPrev=[];
					arrCellsPrev.length=0;
					arrCellsPrev=clippBoundaryCellsOfParentCell(diagramPrev, parentSourceTeleportLocal); 
					///////////////////
					
                	var prevPolygonsChildGroup = parentLayer.selectAll('.polygonsChild')
					//.filter(function(d) {  return   parseInt(this.getAttribute("id").split("-").pop())==parentIndexPrevoiusDragChild;});// 
					.filter(function(d) {  return   parseInt(this.getAttribute("parentId") )==parentSourceTeleportLocal;});// 
					
					var prevPolygonsChildCells = prevPolygonsChildGroup.data(arrCellsPrev)
					.attr("id", function(d,i){ return "childVorCell"+ childNodes[PreviuosParentChildren[arrCellsPrev.indexOf(d)]].n  ; } )//+"-"+ parentIndexPrevoiusDragChild 
					.attr("parentId", function(d,i){ return parentSourceTeleportLocal} )	
					.attr("d", renderCell).style('fill-opacity', 0.8);
                     
                    prevPolygonsChildCells.exit()
					.remove();
					
					
					 prevPolygonsChildCells.selectAll("path")
					 .attr("class", "polygonsChild")
					.attr('fill', parentCellsColors[parentSourceTeleportLocal])  
					.style('fill-opacity', 0.8)
					.attr('class', 'polygonsChild').lower();
								
					////////////////////
					parentChildren=parentChildrenMap.get(parentTargetTeleportLocal);	
					parentChildren=getGroupSizeSubChildren(parentChildren);
//					console.log("2parentChildren");
//					console.log(parentChildren);
					moveChildrenPositionInsideOneParent(parentTargetTeleportLocal);
					var subChildrenNodes=[]; 
					subChildrenNodes.length=0;
					for(var i=0;i<parentChildren.length;i++){
					   var nodeData=childNodes[parentChildren[i]];
					   subChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
					}
					
					//subChildrenNodes.sort((a, b) => (a.n > b.n) ? 1 : -1);
					
					///////////////////
					var delaunay = d3.Delaunay.from(subChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
					var diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 
					var arrCells2=[];
					arrCells2.length=0;
					arrCells2=clippBoundaryCellsOfParentCell(diagram, parentTargetTeleportLocal); 
					///////////////////
					
					//d3.select("#childVorCell"+ selectedNodeIndex+"-"+ parentIndexPrevoiusDragChild).remove(); 
					//parentLayer.select("#childVorCell"+ selectedNodeIndex+"-"+ parentIndexPrevoiusDragChild).attr("id","childVorCell"+ selectedNodeIndex+"-"+ parentIndexCurrentDragChild); 
					
                    var currPolygonsChildGroup = parentLayer.selectAll('.polygonsChild')
	//				.filter(function(d) { return   parseInt(this.getAttribute("id").split("-").pop())==parentIndexCurrentDragChild;});// 
					.filter(function(d) { return   parseInt(this.getAttribute("parentId"))==parentTargetTeleportLocal;});// 
					
					var currPolygonsChildCells = currPolygonsChildGroup.data(arrCells2)                    
					.attr("id", function(d,i){ return "childVorCell"+ childNodes[parentChildren[arrCells2.indexOf(d)]].n  ; } ) //+"-"+ parentIndexCurrentDragChild 
					.attr("parentId", function(d,i){ return parentTargetTeleportLocal} )
					.attr("d", renderCell).style('fill-opacity', 0.8);
					
					
					 //currPolygonsChildCells.enter().append("path");
					 
					currPolygonsChildCells.selectAll("path")
					.attr("d", renderCell)
					.attr("class", "polygonsChild")
		            .attr("id", function(d,i){ return "childVorCell"+ childNodes[parentChildren[arrCells2.indexOf(d)]].n  ; } )//+"-"+ parentIndexCurrentDragChild 
					.attr("parentId", function(d,i){ return parentTargetTeleportLocal} )
					.attr('fill', parentCellsColors[parentTargetTeleportLocal])  
					.style('fill-opacity', 0.8);
					//.attr('class', 'polygonsChild').lower();
					
					
					
					parentLayer.selectAll('.rectsChild')//.selectAll("rect")
					.attr("x", function (d) { return (childNodes[d.n].x) - (imageWidthInitial/2); }) // x position of rect node
					.attr("y", function (d) { return (childNodes[d.n].y) - (rectChildHeightInitial/2); });
					
					parentLayer.selectAll('.imagesChild')
				    .attr("x", function (d) { return (childNodes[d.n].x) - (imageWidthInitial/2)  ; } ) //+(imageWidthInitial/2) x position of image (center) +(imageWidthInitial/2)
		            .attr("y", function (d) { return (childNodes[d.n].y) - (imageHeightInitial/2)  ; } );
					
					parentLayer.selectAll('.textChild')//.selectAll("text")
						.attr("x", function (d) { return (childNodes[d.n].x -3); }) // x position of rect node
						.attr("y", function (d) { return (childNodes[d.n].y -3); }) 
						.text(function(d,i) { return d.n;});
					
													
				
					var indexLocalOfCurrentNod= parentChildren.indexOf(parseInt(selectedNodeIndex));
//					console.log(selectedNodeIndex+"indexLocalOfCurrentNod"+indexLocalOfCurrentNod);
//					console.log(parentChildren);
//					console.log(arrCells2[indexLocalOfCurrentNod]);
					try{
					    parentLayer.append("path")
					   .data(Array.from(arrCells2[indexLocalOfCurrentNod]))
					   .attr('d', renderCell)
					   .attr("class", "polygonsChild")
					   .attr("id", function(d,i){ return "childVorCell"+ selectedNodeIndex ;} )//i  +"-"+ parentIndexCurrentDragChild  
					   .attr("parentId", function(d,i){ return parentTargetTeleportLocal} )				   
					   .style ('fill', parentCellsColors[parentSourceTeleportLocal]) // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
					   .style('stroke', "gray")
					   .style('stroke-width', 3)
					   .style('stroke-opacity',parentVoronoiEdgesObacity)
					   .style('fill-opacity', 0.8);
					}catch(e){
					}
					
					d3.selectAll('.polygonsChild').lower();
                    d3.select("#childVorCell"+selectedNodeIndex).raise();	//+"-"+ parentIndexCurrentDragChild

                    d3.selectAll("image").style("opacity", imagesObacity);
				    parentLayer.selectAll(".imagesChild").raise();
					parentLayer.selectAll("rect").raise();
					
					
					
					
					////////////////////end
					/// modify source of target  
					var parentSelectedNode=-1;
															
					if(sourceChildNumber<=1){
						 //remove parentNode  that has no children 
						 parentNodes.splice(parentSourceTeleportLocal , 1);
						 parentChildrenMap.delete(parentSourceTeleportLocal);
						 parentPolygonsMap.delete(parentSourceTeleportLocal);
						 parentCellsColors.splice(parentSourceTeleportLocal , 1);
						 
						 //modify indexs of parentNodes
						 for(var ind= 0; ind<=parentNodes.length-1 ; ind++){
							parentNodes[ind].n=ind;	
						 }
						 
						 //get sorted keys of parents
						 var keysOfCurrentMap=Array.from(parentChildrenMap.keys());                
						 keysOfCurrentMap.sort(function(a, b) {
						   return a - b;
						 });
						 
						 //modify keys in parentChildrenMap
						 for(var index=0; index<=keysOfCurrentMap.length-1;++index){
							 parentChildrenMap.set(index, parentChildrenMap.get(keysOfCurrentMap[index]));						 
							 parentPolygonsMap.set(index, parentPolygonsMap.get(keysOfCurrentMap[index]));
							 if( parentChildrenMap.get(keysOfCurrentMap[index]).indexOf(selectedNodeIndex)!=-1 ){
								 parentSelectedNode=keysOfCurrentMap[index];
							 }
						 }
											 
						parentSourceTeleportLocal=-1;
					}
						  				  

				    parentIndexEndDragChild=parentTargetTeleportLocal;
//					parentIndexEndDragChild=parentIndexPrevoiusDragChild;			
					//parentIndexEndDragChild=findParentPolygon(xMouseCoordinate,yMouseCoordinate);

					if(sourceChildNumber==1){										
						parentIndexEndDragChild = parentSelectedNode;	
						handleRemoveParentCell();					
					}

					if(parentSourceTeleportLocal != parentIndexEndDragChild){															  
					    moveChildFromParentToParent(parentIndexEndDragChild, parentSourceTeleportLocal);																			   
					} 
						 
				    //reDrawAllChildren();
					reDrawAll();
					
					  parentIndexStartDragChild = -1;
				   parentIndexEndDragChild = -1;
				   parentIndexPrevoiusDragChild=-1;
			
			   //if(isParentNodeMove)
			   // isParentNodeMove=false;
			   
			      copyOfparentNodes.length=0;
			      firstDragFlag=true;
//			   d3.select("#currentCell"+selectedNodeIndex).remove();
					
				  parentLayer.selectAll(".polygonsChild").raise();
				  parentLayer.selectAll('.rectsChild').raise() ;
				  parentLayer.selectAll('.rectsParent').raise() ;
				  parentLayer.selectAll('.textChild').raise();
				  
				  d3.selectAll("image").style("opacity", imagesObacity);
				  parentLayer.selectAll(".imagesChild").raise();
		  
					///////////////////
					
					//moveChildrenPositionInsideOneParent(parentIndexPrevoiusDragChild);
					 //moveChildFromParentToParent(parentIndexEndDragChild, parentIndexStartDragChild);																			   
					
					    //if(sourceChildNumber!=1)
					       //reDrawAll();
					
					
		}

        
	   
function wrap(text) {
	width=100;
  text.each(function() {
    let text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      x = text.attr("x"),
      y = text.attr("y"),
      dy = 1.1,
      tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}
	  
	  
	  
	}
	

function setChildrenNodesColors(){

	for(var i=0; i<=childNodes.length-1;++i){

		  
		  var chilColor=d3.select("#childVorCell"+parseInt(childNodes[i].n))
			  .attr("fill");
			  
			   
		  childNodes[i]["color"]=chilColor;
					  
	}
}	

function AddToTreemapOneObjectLocal(oneObject){
	   console.log("AddToTreemapOneObjectLocal");	   

	   var childIndex= -1;
	   
	   var filterchildNodes =  childNodes.filter(function(obj) {
        	return obj.id == oneObject.objectId;
      });
	  
	   //console.log(childNodes);
	   //console.log(filterchildNodes);
	   
	   if(filterchildNodes.length==0){

		   if( childNodes[0].id=="0"){
			   
		       childNodes[0].n= 0;
			   childIndex=0;
			   childNodes[0].x= oneObject.x  +getRandom(1,20);
			   childNodes[0].y= oneObject.y  +getRandom(1,20);
			   childNodes[0].id= oneObject.objectId;
               childNodes[0].img= oneObject.img;
               childNodes[0].txt= oneObject.txt;
			   childNodes[0].GroupID= oneObject.GroupID;	

		   }else{
			   
			   childIndex=childNodes.length;
			   childNodes.push({
					  n: childNodes.length,   
					  x: oneObject.x + getRandom(1,20), //getRandom(250,750), 
					  y: oneObject.y + getRandom(1,20), //getRandom(250,750),
					  id: oneObject.objectId,
					  img: oneObject.img,
					  txt: oneObject.txt,
                      GroupID: oneObject.GroupID						  
				   });
				   
				   
	       }

		   
	   }else if(filterchildNodes.length==1){
		       childIndex=filterchildNodes[0].n; 
               filterchildNodes[0].img= oneObject.img;
               filterchildNodes[0].txt= oneObject.txt;	
               filterchildNodes[0].GroupID= oneObject.GroupID;				   
	   }

	   
	   
		//update global variables
	   childrenNodesNumber=childNodes.length;
	   initialNodesSize = childNodes.length;
	   //totalInitialNodesSize = childNodes.length;
	   totalInitialNodesSize = counterVisSum();


	  // update array with temproray position of each node    
	  tempNodesPosition=[]; 
	  for(var i=0;i<childNodes.length;i++){
		  tempNodesPosition.push({tempX:0,tempY:0});
	  }
  
	   //update Hierarchy	  
	   //buildHierarchyOneParent();
	   //updateChildrenCells(oneObject.objectId, oneObject.groupID);
	
	//updateHierarchyWithNewChild(childIndex, parentNodes[0].n);
	console.log(parseInt(oneObject.GroupID));
	console.log(parentNodes[0].n);	
	updateHierarchyWithNewChild(childIndex, parseInt(oneObject.GroupID));	
	
	
	//{"objectId": ("objectID" + i), "img":reader.result, "GroupID":"group0"}
	
	autoScallingRectChild();
	reDrawAll();
	
	wrapAllTextRect();	
	//console.log(d3.select("#childTextname0").attr("id"));
	
}

AddToTreemapOneObject=AddToTreemapOneObjectLocal;


function getObjectsArrayLocal(){
		
    setChildrenNodesColors();
			  
/*	for(var i=0; i<=childNodes.length-1;++i){

		  
		  var chilColor=d3.select("#childVorCell"+parseInt(childNodes[i].n))
			  .attr("fill");
			  
			   
		  local_childNodesClone[i]["color"]=chilColor;
					  
	}	*/	
	
	/*for(var i=0; i<=childNodes.length-1;++i){
			  var id= d3.select("#childVorCell"+parseInt(childNodes[i].n))
			  .attr("id").substring(12);	 
			  
			  var parentId= d3.select("#childVorCell"+parseInt(childNodes[i].n))
			  .attr("parentId");	
			  
			  var parentIdInputText=document.getElementById('group' + parentId ).value;
			  if(parentIdInputText=='')
				  parentIdInputText=parentId;
			 			  
              local_childNodesClone[i]["GroupId"]=[];
              local_childNodesClone[i].GroupId=parentId;
              			  
	}*/
			
 
   var local_childNodesClone= [...childNodes];
   
   return local_childNodesClone;
}

getObjectsArray=getObjectsArrayLocal;


function getObjectByIdLocal(id){
  console.log("getObjectByIdLocal="+id);
  var childFound=null;
  for (var i=0; i < childNodes.length; i++) {
	  console.log(childNodes[i].id+"  "+childNodes[i].txt);
      if (childNodes[i].id == id) {
          //return childNodes[i];
		  childFound =childNodes[i];
		  break;
      }
  }	 	
  
  return childFound;
}

getObjectById=getObjectByIdLocal;


function getParentByIdLocal(id){
	var parentFound=null;
    for(var i=0; i<parentNodes.length ;++i){
		//if(parentNodes[i].n==id)
		if(parentNodes[i].GroupID == id){	
		  parentFound=parentNodes[i];
		  break;
		}
	}
	
	return parentFound;
}

getParentById=getParentByIdLocal;

function getGroupsArrayLocal(){
  console.log("getGroupsArrayLocal");
  
  var groupsNames=[];
  for(var i=0; i<parentNodes.length ;++i){
	  //console.log(parentNodes[i]);
      groupsNames.push({"GroupID": parentNodes[i].n,
                 	    "color": parentCellsColors[i]}
						);	 		
  }
  
  console.log(groupsNames);
  
  return groupsNames;
}

getGroupsArray=getGroupsArrayLocal;
	




function AddToTreemapLocal(fileArray){
	
	console.log("addObjectArrayToTreeMap");
	console.log(fileArray);	
	for(var i=0; i<fileArray.length;++i){		
	
	     if(i==0){
			   childNodes[0].n= 0;
			   childNodes[0].id= fileArray[0].objectId;
               childNodes[0].img= fileArray[0].img;
               childNodes[0].txt= fileArray[0].txt;				   			 				   
			   childNodes[0].x= fileArray[0].x  +getRandom(1,20);
			   childNodes[0].y= fileArray[0].y  +getRandom(1,20);				   
               childNodes[0].GroupID= fileArray[0].GroupID;				  
		 }else{
			 childNodes.push({
			  n: childNodes.length,   
			  id: fileArray[i].objectId,
              img: fileArray[i].img,
              txt: fileArray[i].txt	,			  
			  x: fileArray[i].x + getRandom(1,20), //getRandom(250,750), 
			  y: fileArray[i].y + getRandom(1,20), //getRandom(250,750),			  
              GroupID: fileArray[i].GroupID				  
		   });
		   
		 }
	}
    
	//console.log(childNodes);	
	 //update global variables
	   childrenNodesNumber=childNodes.length;
	   initialNodesSize = childNodes.length;
	   //totalInitialNodesSize = childNodes.length;
       totalInitialNodesSize = counterVisSum();

	  // update array with temproray position of each node    
	  tempNodesPosition=[]; 
	  for(var i=0;i<childNodes.length;i++){
		  tempNodesPosition.push({tempX:0,tempY:0});
	  }
  
	   //update Hierarchy	  
	   buildHierarchyOneParent();
		   
	//{"objectId": ("objectID" + i), "img":reader.result, "GroupID":"group0"}	
//	reDrawAll();
	
	if(childNodes[0].txt!=""){
	  autoScallingRectChild();
	  reDrawAll();	
	  wrapAllTextRect();	
	}else if(childNodes[0].img!=""){
	  reDrawAll();  
	}
	
}

AddToTreemap=AddToTreemapLocal;



function UpdateObjectLocal(fileArray){
 
   	console.log("UpdateObjectLocal");
	console.log(fileArray);	
   
   for(var i=0; i<fileArray.length;++i){		
		      	
			   //In Case X,Y are provided 
			   //add it at xy with GroupID automatically 
			   //set to the one whose polygon contains that position 
			   if(fileArray[i].x !="" && fileArray[i].y !=""){
				   
				   fileArray[i].x= fileArray[i].x  +getRandom(1,20);
			       fileArray[i].y= fileArray[i].y  +getRandom(1,20);
				   var parentIndexCurrentDragChild = findParentPolygon(fileArray[i].x,fileArray[i].y);
                   //fileArray[i].GroupID= "group"+parentIndexCurrentDragChild;
				   fileArray[i].GroupID= parentNodes[parentIndexCurrentDragChild].GroupID ;
				//in case only GroupID provided
			   }else if(fileArray[i].GroupID !=""){				   
				    //check if GroupID is already available
				    var availableParent=getParentByIdLocal(fileArray[i].GroupID); 
					//if not avaialable, consider GroupID 0
				    if(availableParent==null){
					   availableParent= parentNodes[0]; // =0
				       //fileArray[i].GroupID= "group"+parentNodes[0].n; // =0
					   fileArray[i].GroupID=availableParent.GroupID;
				    }
				  
				    fileArray[i].x= availableParent.x  +getRandom(1,20);
			        fileArray[i].y= availableParent.y  +getRandom(1,20);
				 
				//In case neither X,Y nor GroupID are provided, 
				//X,Y is the center of gravity of the GroupID 0 with small random noise			
			   }else{
			        //fileArray[i].GroupID = "group"+parentNodes[0].n; // =0
					fileArray[i].GroupID = parentNodes[0].GroupID;
				    fileArray[i].x = parentNodes[0].x  +getRandom(1,20);
			        fileArray[i].y = parentNodes[0].y  +getRandom(1,20);										
			   }				   
 

             var childNode=getObjectByIdLocal(fileArray[i].objectId);
			 var childID;			 
			 if(childNode!=null)
				 childID= "ID"+ childNodes.length;
			 else
				 childID=  fileArray[i].objectId;
			 
			 if(childNodes.length==1 && childNodes[0].txt=="" && childNodes[0].img=="" ){
			   childNodes[0].n= 0;
			   childNodes[0].id=childID;
               childNodes[0].img= fileArray[0].img;
               childNodes[0].txt= fileArray[0].txt;				   			 				   
			   childNodes[0].x= fileArray[0].x  +getRandom(1,20);
			   childNodes[0].y= fileArray[0].y  +getRandom(1,20);				   
               childNodes[0].GroupID= fileArray[0].GroupID;				  
		    }else{
				 
				 childNodes.push({
				  n: childNodes.length,   

				  id: childID,//fileArray[i].objectId,
				  img: fileArray[i].img,
				  txt: fileArray[i].txt	,
				  
				  x: fileArray[i].x + getRandom(1,20), //getRandom(250,750), 
				  y: fileArray[i].y + getRandom(1,20), //getRandom(250,750),
				  
				  GroupID: fileArray[i].GroupID				  
				 });
		   	}	 
	}
	
	
	 //update global variables
	   childrenNodesNumber=childNodes.length;
	   initialNodesSize = childNodes.length;
	   //totalInitialNodesSize = childNodes.length;
       totalInitialNodesSize = counterVisSum();

	  // update array with temproray position of each node    
	  tempNodesPosition=[]; 
	  for(var i=0;i<childNodes.length;i++){
		  tempNodesPosition.push({tempX:0,tempY:0});
	  }
  
	   //update Hierarchy	  
	   //buildHierarchyOneParent();
	   updateHierarchyWithAllChildren();
	   
	   //update weights of parent nodes 
	   for(var targetParent=0; targetParent<parentChildrenMap.length; ++targetParent){
		   var targetParentChildren=Array.from(parentChildrenMap.get(targetParent));
	       parentNodes[targetParent].previousWeight= parentNodes[targetParent].weight;
		   parentNodes[targetParent].weight = targetParentChildren.length/childNodes.length;
	   }
	   
	   parentCells =computeWeightedInitialLoc0(parentNodes,parentChildrenMap,totalInitialNodesSize, [] ,polyCopyGlobal);	 		 
	   parentCells =computeWeightedBasedOnPrevoiusLocW00(parentNodes, [] ,polyCopyGlobal);					
	   
	   parentSitePositionPolygonsMap.clear();
	   parentPolygonsMap.clear();		
	   //store parent cell in parentPolygonsMap
	   //store site x,y, and weight of parent cell  in parentSitePositionPolygonsMap
	   storeParentPolygonsInMap();
	   updateParentNodes();
	   	   
		   
	//{"objectId": ("objectID" + i), "img":reader.result, "GroupID":"group0"}	
    //	reDrawAll();
	
	if(childNodes[0].txt!=""){
	  autoScallingRectChild();
	  reDrawAll();	
	  wrapAllTextRect();	
	}else if(childNodes[0].img!=""){
	  reDrawAll();  
	}
	
}

UpdateObject = UpdateObjectLocal;



function handleRemoveOneChildObj(){
   
}

function RemoveObjectsLocal(fileArray){
   console.log("RemoveObjectsLocal");
   console.log(fileArray);	
   
   //console.log(childNodes);//JSON.stringify
        
   
   //create array of ids from fileArray
   var idsArray= fileArray.map(function(oneObject) {return oneObject.objectId; } );
   console.log(idsArray);

   //filter childNodes that will remain (not removed)
   var filterchildNodes = childNodes.filter(function(obj) {
    return idsArray.indexOf(obj.id+"") == -1;
   });
   	
	
   childNodes=[];
   childNodes.length=0;
   childNodes=Array.from(filterchildNodes);
   
   for(var i=0; i<childNodes.length; i++){
	   childNodes[i].n= i;	   
   }
   
   //for(var p=0; p<parentNodes.length; ++p){
	   //parentNodes[p] ;
   //}
   
   console.log(childNodes);
   
   var allGroups =childNodes.map(function(oneObject) {return oneObject.GroupID; } );
   
   var allGroupsUniques = [...new Set(allGroups)]; 
   console.log(allGroupsUniques);


   //need update hierarchy map (two level)
    //parentSitePositionPolygonsMap.clear();
	nodeColorMapping.clear();	
	parentChildrenMap.clear();
	//parentPolygonsMap.clear();
	
	


	
	
	console.log("update parentChildrenMap");	
	console.log("before:");
	//console.log( parentChildrenMap );
	   
	//check if  there is a parentNode with all its children removed
	var parentNodesGroupID =[];//parentNodes.map(function(oneObject) {return oneObject.GroupID; } );	
	for( var i=0; i<parentNodes.length;++i){
		parentNodesGroupID.push(parentNodes[i].GroupID);
	}
	//a empty parentNode (without children) should be removed 
	//then update parentNodes 
	var hasParentRemoved= allGroupsUniques.length != parentNodes.length;
	if(hasParentRemoved){      
	   for(var p=0; p< parentNodesGroupID.length; ++p){
		   if(allGroupsUniques.indexOf( parentNodesGroupID[p] +"")==-1 ){
			   			//remove parentNode  that has no children 
						 parentNodes.splice(p , 1);
						 parentCellsColors.splice(p , 1);
						 
						 //modify indexs of parentNodes
						 for(var ind= 0; ind<=parentNodes.length-1 ; ind++){
							parentNodes[ind].n=ind;	
						 }
						 				           
		   }
	   }	   
	}	
	
	//update parentChildrenMap with children and parentNodes keys   
	for(var p=0; p < allGroupsUniques.length; ++p){
	   var idGroup=allGroupsUniques[p];
	   var currentParentNode=getParentByIdLocal(idGroup);
	   	//currentParentNode.GroupID=  idGroup; 
	   var currentParentChildNodes = [];
	   currentParentChildNodes.length=0;
	   
	   //get ChildNodes of  current Parent
	   currentParentChildNodes=childNodes.filter(function(objChild) {
          return objChild.GroupID == idGroup;
       });
	   
       //create array of n values (index) of currentParentChildNodes	   
	   var currentParentChildNodesMap = currentParentChildNodes.map(function(objChild) {return objChild.n; } );
	   	   
	   console.log( parentChildrenMap.get(currentParentNode.n)  ); //JSON.stringify   
	   parentChildrenMap.set(currentParentNode.n, Array.from(currentParentChildNodesMap));	
	   console.log( parentChildrenMap.get(currentParentNode.n)  ); //JSON.stringify 
	   
	   updateChildNodeColorMappingBeforeMergeParentTwoNodes(currentParentNode.n);  	   
	}
	
	console.log("after:");
	console.log( (parentChildrenMap) ); //JSON.stringify
	
 
	//handle removed empty parentnode 	
	if(hasParentRemoved){														   
	    parentPolygonsMap.clear();
		handleRemoveParentCell();
	    reDrawAll();  
	}else{
   	  reDrawAll();
	}
   
}


RemoveObject = RemoveObjectsLocal;



function CreateGroupLocal(selectedNodeIndex) {
	    var parentIDStartDragChild= childNodes[selectedNodeIndex].GroupID;
		var parentNodeStartDragChild= getParentByIdLocal(parentIDStartDragChild);
        var parentIndexStartDragChild = parentNodeStartDragChild.n;
		
		
		//determine nearest corner Point of a parent polygon for creating group at this point
        var  parentPolygon = parentPolygonsMap.get(parentIndexStartDragChild);
        var  childNodePoint= [childNodes[selectedNodeIndex].x ,  childNodes[selectedNodeIndex].y ];	
	    var  nearestPolygonePoint = findNearestCornerPointPolygone(parentPolygon, childNodePoint);

        var xMouseCoordinate = nearestPolygonePoint[0];
        var yMouseCoordinate = nearestPolygonePoint[1];
	
	
		parentIndexCurrentDragChild=parentNodes.length;					 
		 
		var weightNewParent = 1/totalInitialNodesSize;
							
		parentNodes.push({x: xMouseCoordinate, y: yMouseCoordinate, weight: weightNewParent, previousX:  xMouseCoordinate , previousY: yMouseCoordinate, previousWeight: weightNewParent, n:parentIndexCurrentDragChild, GroupID:"group"+parentIndexCurrentDragChild});
		
		 var arrayChildrenIdsNew=[];	
		 arrayChildrenIdsNew.length=0;					 
		 arrayChildrenIdsNew.push(parseInt(selectedNodeIndex));

		parentChildrenMap.set(parentIndexCurrentDragChild, arrayChildrenIdsNew);
		
		
		

		
		var sourceParentChildren=[];
		sourceParentChildren.length=0;
		sourceParentChildren=Array.from(parentChildrenMap.get(parentIndexStartDragChild));
		
        // update previous parent of childnode		
		if(sourceParentChildren.length>1){
			
	
		     parentNodes[parentIndexStartDragChild].previousWeight=parentNodes[parentIndexStartDragChild].weight; //sourceWeight;//
						 
			 var newSourceWeight=parentNodes[parentIndexStartDragChild].weight-(parentNodes[parentIndexStartDragChild].weight/parentChildrenMap.get(parentIndexStartDragChild).length) ;
								 
			 parentNodes[parentIndexStartDragChild].weight=newSourceWeight;
			 //updateHierarchy(selectedNodeIndex, parentIndexPrevoiusDragChild, parentIndexCurrentDragChild);
			 

			 var indexChildSourceParent= sourceParentChildren.indexOf(parseInt(selectedNodeIndex));
			 if(indexChildSourceParent!=-1){  
				sourceParentChildren.splice(indexChildSourceParent, 1);
				parentChildrenMap.delete(parentIndexStartDragChild);
				parentChildrenMap.set(parentIndexStartDragChild,sourceParentChildren);
			 }
			
		}


        parentCells=computeWeightedInitialLoc0(parentNodes,parentChildrenMap,totalInitialNodesSize, [] ,polyCopyGlobal);													
	    parentCells =computeWeightedBasedOnPrevoiusLocW00(parentNodes, [] ,polyCopyGlobal);					
			 
/*		
		simulation = d3.voronoiMapSimulation(parentNodes)
	   .clip([[0,0], [0,voronoiHeight], [voronoiWidth, voronoiHeight], [voronoiWidth,0]])
	   .stop();
	   
	   
		state = simulation.state(); 
	   
	   while (!state.ended) {                                    // manually launch each iteration until the simulation ends
		simulation.tick();
		state = simulation.state();
	   }

	   
	   parentCells = state.polygons; 
	   
	   
	   var parentNodeSiteCurrent=null;
		parentCells.forEach((p)=>{
		  if(p.site.originalObject.data.originalData.n==parentIndexCurrentDragChild){
			parentNodeSiteCurrent=p; 
			//break;
		  }
		});
 
	
					   /////////////////////////////////////
				   //var state;
					//do{
					var counter=1;	
				    var reCompute=false;
					var decreasedWeight=parentNodes[parentIndexStartDragChild].weight;
					var decreasedCurrentPreWeight=parentNodes[parentIndexCurrentDragChild].previousWeight;
					var decreasedCurrentWeight=parentNodes[parentIndexCurrentDragChild].weight;
					do{

						if(counter!=1){
							if(sourceChildNumber>1){	
                               //parentNodes[parentIndexStartDragChild].previousWeight=sourceWeight /counter;						
                               parentNodes[parentIndexStartDragChild].previousWeight=parentNodes[parentIndexStartDragChild].weight /counter;								   
							   parentNodes[parentIndexStartDragChild].weight = decreasedWeight /counter;

						    }
						}
						
						//counter++;
						
						try{									
							simulation = d3.voronoiMapSimulation(parentNodes)
							   .clip([[0,0], [0,voronoiHeight], [voronoiWidth, voronoiHeight], [voronoiWidth,0]])
							   .initialPosition((d)=>[d.previousX, d.previousY])
							   .initialWeight((d)=>d.previousWeight);
						   
							   simulation.stop();
						   
						   
							   state = simulation.state(); 
							   //console.log(state.polygons.length+" "+tmp);
							   //}while(state.polygons.length<tmp)
								
							  while (!state.ended) {                                    // manually launch each iteration until the simulation ends
								simulation.tick();
								state = simulation.state();
							  }
							  
 							  parentCells.length=0;
					          parentCells=state.polygons;
							  counter=5;
					    }catch(err){
							console.log("error");
							console.log(err);			
							++counter;
                            parentNodes[parentIndexCurrentDragChild].x= parentNodes[parentIndexCurrentDragChild].x-5;
                            parentNodes[parentIndexCurrentDragChild].y= parentNodes[parentIndexCurrentDragChild].y-5;
															
						    if(counter==5)	
							 counter=6;
						}	
							
							
					}while( counter<5  )		//state.polygons.length<tmp 
					
*/					
					
					
					
					parentSitePositionPolygonsMap.clear();
					parentPolygonsMap.clear();
					
					storeParentPolygonsInMap();
	                updateParentNodes();
					
					
					
					
					
					parentLayer.selectAll('.polygonsChild')
//			        .filter(function(d) {  return  parseInt(this.getAttribute("id").split("-").pop())==parentIndexPrevoiusDragChild && parseInt(this.getAttribute("id").substring(12).split("-").shift())==parseInt(selectedNodeIndex);})
                    .filter(function(d) {  return  parseInt(this.getAttribute("parentId") )==parentIndexPrevoiusDragChild && parseInt(this.getAttribute("id").substring(12).split("-").shift())==parseInt(selectedNodeIndex);})
					.remove();
					
				    /* parentLayer.selectAll('.polygonsChild')
			        .filter(function(d) {  return  parseInt(this.getAttribute("id").split("-").pop())==parentIndexCurrentDragChild && parseInt(this.getAttribute("id").substring(12).split("-").shift())==parseInt(selectedNodeIndex);})
					.remove();*/					
				   
					parentLayer.selectAll('.polygonsParent')
					.remove();
					
				    parentLayer.selectAll('.rectsParent')
					.remove();
					
					
					parentLayer.selectAll('.polygonsParent')
					.data(parentCells)					
				    .enter().append("path")
				    .attr('d', renderCell)
				    .attr("class", "polygonsParent")
				    .attr("id", function(d,i){ return "parentvorCell" +d.site.originalObject.data.originalData.n; } )//i  
				    .style ('fill', "none") // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
				    .style('stroke', "gray")
				    .style('stroke-width', 3)
				    .style('stroke-opacity',parentVoronoiEdgesObacity);
					
                    updateLabelsTextFields();
													
				  // parentLayer.selectAll('.polygonsParent')
				   //.attr('fill', "none" );

/*				   parentLayer.selectAll('.rectsParent')
				   .attr("x", function (d) { return ( parentSitePositionPolygonsMap.get(d.site.originalObject.data.originalData.n)[0] ); }) // x position of rect node
				   .attr("y", function (d) { return ( parentSitePositionPolygonsMap.get(d.site.originalObject.data.originalData.n)[1] ); }); // y position of rect node 
*/				   

				   parentLayer.selectAll('.polygonsParent').lower();
							   							   				   
					
				/*   var newChildLayer= mainChildrenLayer.append('g')
	               .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                   .attr('id', "gParentChildren"+parentIndexCurrentDragChild );		//function(d) {return 	    ; }*/
			   
					var subChildrenNodes=[]; 
				    subChildrenNodes.length=0;
					var nodeData=childNodes[selectedNodeIndex];
		            subChildrenNodes.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
				   				    
					var delaunay = d3.Delaunay.from(subChildrenNodes, p => p.x, p => p.y); // create dealuny from updates nodes
					var diagram = delaunay.voronoi([0,0,voronoiWidth,voronoiHeight]); 
					var arrCells2=[];
					arrCells2.length=0;
					arrCells2=clippBoundaryCellsOfParentCell(diagram, parentIndexCurrentDragChild);
					
										
//				   parentCellsChildrenLayersMap.set(parentIndexCurrentDragChild,  newChildGroup);
			   
			       
				   
				   	parentLayer.append("path")
					.data(Array.from(arrCells2[0]))
				   .attr('d', renderCell)
				   .attr("class", "polygonsChild")
				   .attr("id", "childVorCell"+selectedNodeIndex )//i  +"-"+ parentIndexCurrentDragChild 
				   .attr("parentId", function(d,i){ return parentIndexCurrentDragChild} )				   
				   .style ('fill', parentCellsColors[parentIndexCurrentDragChild]) // console.log(i+":"+nodesinHull.indexOf(i));  '#736AFF'  function(d, i){ return nodesinHull.indexOf(i)== -1  ?  "#d3d3d3"  :  "white";}
				   .style('stroke', "black")
				   .style('stroke-width', 0.2)
				   .style('stroke-opacity',childrenVoronoiEdgesObacity)
				   .style('fill-opacity', 0.8);
			   
										
									   				   
			       //moveChildrenPositionInsideParentCells();
				   moveChildrenPositionInsideParentCellsStitching();
//				   reDrawAllChildren();
				   
				   
				   
				   if(childNodes[selectedNodeIndex].txt!=""){
					  autoScallingRectChild();
					  reDrawAll();	
					  wrapAllTextRect();	
					}else if(childNodes[selectedNodeIndex].img!=""){
					  reDrawAll();  
					}
				   
//				   reDrawRectsParents();
		  
		  childNodes[selectedNodeIndex].GroupID= "group"+parentIndexCurrentDragChild;
		  
		  
		  
		  //for(var p=0; p<=mouseLineCrossImgsIds.length-2 ; ++p){					   
		    // var lastId2=mouseLineCrossImgsIds[p]; 
		     //var collapseNodeId=childNodes[lastId2].n;
		     //var collapseNodeParent=parseInt(d3.select("#childVorCell"+collapseNodeId).attr("parentId"));							                							 
		     //lineSelectionChidCell(lastId2, collapseNodeParent , parentNodes.length-1);							 							 
		  //}
		  
		  
	
}





function CreateGroupFrmObjectsLocal(fileArray){
   console.log("CreateGroupFrmObjectsLocal");
   //adding objects in fileArray into childNodes
   UpdateObjectLocal(fileArray);
   console.log(childNodes);
   
   //create Group and add first node fileArray into this group
   //the position of first node in childNodes is at  childNodes.length-fileArray.length
  // var firstChild=getObjectByIdLocal(fileArray[0].objectId);  
   var firstChild=childNodes[childNodes.length-fileArray.length];   
   CreateGroupLocal(firstChild.n);

   //adding remaining nodes of fileArray into this group
   //the start position in childNodes starts at fileArray.length-1
   //as first one was already added into group by calling CreateGroupLocal
   for(var i= fileArray.length-1; i>0; --i){
	   var childNode=childNodes[childNodes.length-i];  
	   console.log("i="+i);
	   var parentIndex=getParentIdFrmChildIndx(childNode.n);
       lineSelectionChidCell(childNode.n, parentIndex , parentNodes.length-1);
   }
   
   
   //for(var i=1; i<fileArray.length;++i){	   
       //var childNode=getObjectByIdLocal(fileArray[i].objectId);
       //lineSelectionChidCell(childNode.n, 0 , 1);
	   
   //}

}

CreateGroupFrmObjects=CreateGroupFrmObjectsLocal;


function mergeTwoTreemapsLocal(firstObjectsArray, secondObjectsArray){
	console.log("mergeTwoTreemapsLocal");
	parentSitePositionPolygonsMap.clear();
	nodeColorMapping.clear();	
	parentChildrenMap.clear();
	parentPolygonsMap.clear();
	
	//there are two treemaps  where each object  has objectId and GroupID
	//to merge them into one treemap, consider following:
	//1- first handle objects exists in both treemaps (objects with same IDs)  
	//   create new treemap by:  
	//   loop over each common object
	//   create new group (if not already created) with id = (GroupID in first array +  GroupID in second array)    
	//   add this object to this group
	//2-handle Non commons objects from first treemap:
	//  loop over each object
	//  create new group (if not already created) with new unique GroupID
	//3-handle Non commons objects from second treemap:
	//  loop over each object
	//  create new group (if not already created) with new unique GroupID


	var mergedObjectsArray=[];
    var newGroupsIDsSet= new Set();

	//create array of ids from fileArray
	var idsFirstArray= firstObjectsArray.map(function(oneObject) {return oneObject.objectId; } );
	console.log(idsFirstArray);

	var idsSecondArray= secondObjectsArray.map(function(oneObject) {return oneObject.objectId; } );
	console.log(idsSecondArray);

	//1- first handle objects exists in both treemaps (objects with same IDs) 
    for(var i=0 ; i < firstObjectsArray.length ; ++i ){	
	  var objectIndexSecondArray= idsSecondArray.indexOf(firstObjectsArray[i].objectId);
	  
	  if(objectIndexSecondArray!=-1){
		  
		 var newGroupID=firstObjectsArray[i].GroupID+ secondObjectsArray[objectIndexSecondArray].GroupID +"-CommonTreemap";
		 
		 if(newGroupsIDsSet.has(newGroupID)==false){
		   newGroupsIDsSet.add(newGroupID);  
		 }
		 
		 //clone object and update its GroupID
		 var newObject={    "objectId": firstObjectsArray[i].objectId,  
							"img":firstObjectsArray[i].img, 
							"txt":firstObjectsArray[i].txt, 
							"x":firstObjectsArray[i].x,
							"y":firstObjectsArray[i].y ,
							"GroupID":newGroupID}; 
							
	     mergedObjectsArray.push(newObject);
		 
	  }  
	  
	  
	}
	
	//2-handle Non commons objects from first treemap:	
	for(var i=0 ; i < firstObjectsArray.length ; ++i ){	
	  var objectIndexSecondArray= idsSecondArray.indexOf(firstObjectsArray[i].objectId);
	  if(objectIndexSecondArray==-1){
		  var newGroupID= firstObjectsArray[i].GroupID+"-FirstTreemap";
		  
		  if(newGroupsIDsSet.has(newGroupID)==false){
		    newGroupsIDsSet.add(newGroupID);  
		  }
		  
		   //clone object and update its GroupID
		   var newObject={  "objectId": firstObjectsArray[i].objectId,  
							"img":firstObjectsArray[i].img, 
							"txt":firstObjectsArray[i].txt, 
							"x":firstObjectsArray[i].x,
							"y":firstObjectsArray[i].y ,
							"GroupID":newGroupID}; 
							
	       mergedObjectsArray.push(newObject);		  
	  }
	}
	
	//3-handle Non commons objects from second treemap:	
	for(var i=0 ; i < secondObjectsArray.length ; ++i ){	
       	  var objectIndexFirstArray= idsFirstArray.indexOf(secondObjectsArray[i].objectId);
		  if(objectIndexFirstArray==-1){
			  var newGroupID= secondObjectsArray[i].GroupID+"-SecondTreemap";
			  
			  if(newGroupsIDsSet.has(newGroupID)==false){
		        newGroupsIDsSet.add(newGroupID);  
		      }
		  
		      //clone object and update its GroupID
		      var newObject={  "objectId": secondObjectsArray[i].objectId,  
							   "img":secondObjectsArray[i].img, 
							   "txt":secondObjectsArray[i].txt, 
							   "x":secondObjectsArray[i].x,
							   "y":secondObjectsArray[i].y ,
							   "GroupID":newGroupID}; 
		  
		      
	           mergedObjectsArray.push(newObject);	
		 
		  }
	}	
	
	
    console.log("newGroupsIDsSet");	
    console.log(newGroupsIDsSet);
    console.log("mergedObjectsArray");	
    console.log(mergedObjectsArray);
		
		
	//create childNodes from mergedObjectsArray
	childNodes.length=0;
	for(var i=0; i<mergedObjectsArray.length;++i){		
	
			 childNodes.push({
			  n: i,   
			  id: mergedObjectsArray[i].objectId,
              img: mergedObjectsArray[i].img,
              txt: mergedObjectsArray[i].txt	,			  
			  x: mergedObjectsArray[i].x + getRandom(1,20), //getRandom(250,750), 
			  y: mergedObjectsArray[i].y + getRandom(1,20), //getRandom(250,750),			  
              GroupID: mergedObjectsArray[i].GroupID				  
		   });
		   
		
	}
    
	//console.log(childNodes);	
	//update global variables
	 childrenNodesNumber=childNodes.length;
	 initialNodesSize = childNodes.length;
	 //totalInitialNodesSize = childNodes.length;
     totalInitialNodesSize = counterVisSum();

	 //update array with temproray position of each node    
	  tempNodesPosition=[]; 
	  for(var i=0;i<childNodes.length;i++){
		  tempNodesPosition.push({tempX:0,tempY:0});
	  }
	 //-----------------
	
	
	parentNodes=[];
	parentNodes.length=0;
	
    console.log("childNodes");
	console.log(childNodes);
    console.log("build");
	var arraynewGroupsIDsSet=  Array.from(newGroupsIDsSet);
	//for(id of newGroupsIDsSet){
 
	for(var k=0 ; k<arraynewGroupsIDsSet.length; ++k){	
        var id=arraynewGroupsIDsSet[k];	
        console.log("ID="+id);	
        var filterChildren=childNodes.filter(function(obj) { return (obj.GroupID+"")==(id+"") }) ;	
        console.log(filterChildren);			
		var arrayChildrenIds=filterChildren.map(function(oneObject) {return oneObject.n; } );
        console.log(arrayChildrenIds);		
	    var weightParent =arrayChildrenIds.length/childNodes.length;
		
	    parentNodes.push({x:getRandom(1,voronoiWidth), y:getRandom(1,voronoiHeight), weight: weightParent, previousX: NaN , previousY: NaN, previousWeight: NaN,  n:k, GroupID:id});//
	    parentChildrenMap.set(parentNodes.length-1, arrayChildrenIds);
	}
	
	    parentCells =computeWeightedWithFixed(parentNodes,[] ,polyCopyGlobal);
	   /*var simulation1 = d3.voronoiMapSimulation(parentNodes)
	   .clip([[0,0], [0,voronoiHeight], [voronoiWidth, voronoiHeight], [voronoiWidth,0]])
	   .stop();
	   
	   
	    var state1 = simulation1.state(); 
	   
	   while (!state1.ended) {                                    // manually launch each iteration until the simulation ends
        simulation1.tick();
        state1 = simulation1.state();
       }

       parentCells=[];
	   parentCells.length=0;
	   parentCells = state1.polygons;*/ 

       //store parent cell in parentPolygonsMap
	   //store site x,y, and weight of parent cell  in parentSitePositionPolygonsMap
	   storeParentPolygonsInMap();
	   
	   
	   
	   
	   
	   
	   console.log("parentPolygonsMap");
	   console.log(parentPolygonsMap);
	   updateParentNodes();
	   
	   
	   
	   	for(var i=0; i<childNodes.length; ++i){			
		      var parentNode=getParentByIdLocal(childNodes[i].GroupID);
		      var centerParentPolygon= centerParentPolygone(parentNode.n);
		      childNodes[i].x = centerParentPolygon.x + getRandom(1,20); //getRandom(250,750), 
			  childNodes[i].y = centerParentPolygon.y + getRandom(1,20); //getRandom(250,750),	
		   		   
		}
		   
    console.log("parentNodes");
	console.log("parentChildrenMap");	
	console.log(parentNodes);
	console.log(parentChildrenMap);	
    
	if(childNodes[0].txt!=""){
	  autoScallingRectChild();
	  reDrawAll();	
	  wrapAllTextRect();	
	}else if(childNodes[0].img!=""){
	  reDrawAll();  
	}
	
 

}

mergeTwoTreemap= mergeTwoTreemapsLocal;

function wrapAllTextRect(){
	console.log("wrapAllTextRect");
	
if(childNodes[0].txt!=""){	
	d3=d3plusVersion;
	
	console.log("d3");	
	console.log(d3);	

	 //add virtual text DOM node before first text DOM with id "childTextname0"
     //as required by d3plus library otherwise first text will disappear
     var parentDOM = document.getElementById("childTextname0").parentNode;
	 var newTextNode = document.createElement("text");
	 newTextNode.setAttribute("id", "virtualText");
	 var firstTextDM = document.getElementById("childTextname0");
	 parentDOM.insertBefore(newTextNode, firstTextDM);
	 
	var defs = mainSvg.append('defs');
	
	 for(var i=0;i<childNodes.length;i++){
		 //var text=d3.select("#childTextname"+childNodes[i].n);
		 //d3.select("#childTextname"+childNodes[i].n);
		
		 
		 //console.log(text.text());
		 var text="#childTextname"+i;
		 //console.log(text);
		 
         d3plus.textwrap()
		.container(text)
		//.padding(10)
		.shape("square") //circle
		.height(rectChildHeightInitial)//* 0.9 
		.width(rectChildWidthInitial)//* 0.9  .valign( String ) 
		.align("center")//middle
		//.align("middle")
		//.x( 50 )  
		//.y( 50 )
		//.valign("middle") //"top", "middle", or "bottom" 
		//.x(function(d) { return childNodes[i].x+100; })
		.resize(true)
		.draw();	
	 }	
	 

   //remove virtual text DOM node
   d3.select("#virtualText").remove();
	 
   d3= d3V1;
   
   console.log(d3);	
   
   
   //parentLayer.selectAll('.rectsChild').raise() ;
   parentLayer.selectAll(".rectsChild").call(d3.drag().on("start",startDragChild).on("drag", draggedChild).on("end",endDragChild));//.on("click", clicked); //  clickDistance(10). .on('click', clicked)
   parentLayer.selectAll(".imagesChild").call(d3.drag().on("start",startDragChild).on("drag", draggedChild).on("end",endDragChild)); 
   //parentLayer.selectAll(".imagesChild").on("click",clicked);
   
   parentLayer.selectAll(".rectsChild").style("stroke-width", 1);
   parentLayer.selectAll(".rectsChild").style("stroke", "black");  
   parentLayer.selectAll(".rectsChild").style("stroke-opacity", 1); 
   
   parentLayer.selectAll(".rectsChild").style("fill", "white");  
   parentLayer.selectAll(".rectsChild").style("opacity", 0.8);    

   parentLayer.selectAll('.textChild').raise() ;
   
   //increase recangle size to add padding for text
	parentLayer.selectAll('.rectsChild') 
	.attr("x", function (d) { return (childNodes[d.n].x)-rectChildWidthInitial  *0.5 - rectChildWidthInitial  * 0.1; })  
	.attr("y", function (d) { return (childNodes[d.n].y)-rectChildHeightInitial  *0.5 - rectChildHeightInitial * 0.1; })
	.attr("width", function(d,i){ return   rectChildWidthInitial + rectChildWidthInitial *0.2 ;  })   
	.attr("height", function(d,i){ return  rectChildHeightInitial + rectChildHeightInitial *0.2;  } );
 
} 
}


function wrapAllTextInVoronoiCell(){
	console.log("wrapAllTextInVoronoiCell");
	
//see shape-inside: https://www.w3.org/TR/SVG/text.html#TextShapeInside
//https://stackoverflow.com/questions/37100296/how-to-fill-an-image-inside-my-svg-circles-in-d3-js

	 //add virtual text DOM node before first text DOM with id "childTextname0"
     //as required by d3plus library otherwise first text will disappear
     var parentDOM = document.getElementById("childTextname0").parentNode;
	 var newTextNode = document.createElement("text");
	 newTextNode.setAttribute("id", "virtualText");
	 var firstTextDM = document.getElementById("childTextname0");
	 parentDOM.insertBefore(newTextNode, firstTextDM);
	 
	var defs = mainSvg.append('defs');
	
	 for(var i=0;i<childNodes.length;i++){
		 //var text=d3.select("#childTextname"+childNodes[i].n);
		 //d3.select("#childTextname"+childNodes[i].n)
		 //.style("shape-inside", function (d) { return "circle(+100px at "+childNodes[d.n].x +"px "+ childNodes[d.n].y+"px )" ;} );   
		  
		  
		  defs.append("pattern")
		  .attr("id",  function (d) { return  "childTextPattern"+childNodes[i].n ;} )
		  .attr("height",rectChildHeightInitial)//* 0.9 
		  .attr("width", rectChildWidthInitial)//* 0.9  .valign( String ) 
		  .append("text")
		  .attr("xlink:href", d3.select("#childTextname"+childNodes[i].n).text())
		  .attr("height",rectChildHeightInitial) 
		  .attr("width", rectChildWidthInitial)  
		  .attr("x", 0)
          .attr("y", 0);
		  
		  parentLayer.append("circle")
		   .attr("id",  function (d) { return  "childTextcircle"+childNodes[i].n ;} )
		  .attr("cx",  function (d) { return  childNodes[i].x; } )
          .attr("cy",  function (d) { return  childNodes[i].y; } )
          .attr("r", 50)
		  .style("fill", "#fff")
          .style("fill", "url(#childTextPattern" + i + ")");
		  
		  /*defs.append("circle")
	      .attr("id",  function (d) { return  "childTextcircle"+childNodes[i].n ;} )
		  .attr("cx",  function (d) { return  childNodes[i].x; } )
          .attr("cy",  function (d) { return  childNodes[i].y; } )
          .attr("r", 50);
			
           d3.select("#childTextname"+childNodes[i].n)			
		  .style("shape-inside: ", "url(#childTextcircle" + childNodes[i].n + ")" );*/
		 

	 }	
	 

   //remove virtual text DOM node
   d3.select("#virtualText").remove();
	 

   
   //parentLayer.selectAll('.rectsChild').raise() ;
   //parentLayer.selectAll(".rectsChild").call(d3.drag().on("start",startDragChild).on("drag", draggedChild).on("end",endDragChild));//.on("click", clicked); //  clickDistance(10). .on('click', clicked)
   parentLayer.selectAll(".rectsChild").style("stroke-width", 1);
   parentLayer.selectAll(".rectsChild").style("stroke", "black");  
   parentLayer.selectAll(".rectsChild").style("stroke-opacity", 1); 
   
   parentLayer.selectAll(".rectsChild").style("fill", "white");  
   parentLayer.selectAll(".rectsChild").style("opacity", 0.8);    

   parentLayer.selectAll('.textChild').raise() ;
   
   //increase recangle size to add padding for text
	parentLayer.selectAll('.rectsChild') 
	.attr("x", function (d) { return (childNodes[d.n].x)-rectChildWidthInitial  *0.5 - rectChildWidthInitial  * 0.1; })  
	.attr("y", function (d) { return (childNodes[d.n].y)-rectChildHeightInitial  *0.5 - rectChildHeightInitial * 0.1; })
	.attr("width", function(d,i){ return   rectChildWidthInitial + rectChildWidthInitial *0.2 ;  })   
	.attr("height", function(d,i){ return  rectChildHeightInitial + rectChildHeightInitial *0.2;  } );
   
}

//define function to move element to front in mainLayer (note this element is in mainLayer)
//https://stackoverflow.com/questions/14167863/how-can-i-bring-a-circle-to-the-front-with-d3
d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};


function disableGroupCreationLocal(flag){
  isCreateGroup=flag;
}


disableGroupCreation=disableGroupCreationLocal;


function disableChildrenScalabilityLocal(flag){
  isChildrenScalability=flag;
}

disableChildrenScalability=disableChildrenScalabilityLocal;


function getParentIdFrmChildIndx(childIndex){
   console.log("getParentIdFrmChildIndx");
  //var parentId= d3.select("#childVorCell"+parseInt(childNodes[childIndex].n))
  //.attr("parentId");

  //return  parseInt(parentId);
  //return  childNodes[childIndex].GroupID ;
  
//  console.log(childNodes[childIndex].GroupID );
  
  var currentParent=parentNodes.filter(function(objParent) {
	  return objParent.GroupID == childNodes[childIndex].GroupID;
   });
	   
//  console.log(parentNodes );  
//  console.log(currentParent[0]);  
  console.log(currentParent[0].n);
  return currentParent[0].n;   

  
}

getParentIdFrmChildIndxGlobal=getParentIdFrmChildIndx;

function getThumbnailRectArea(){
	 var thumbnailRectArea=  scaleRectChild * grandParentArea  / (childNodes.length  ); //* grandParentArea
     
	 return thumbnailRectArea;
}


function autoScallingRectChild(){
     var thumbnailRectArea= getThumbnailRectArea();	
	   	   	   
	   rectChildWidthInitial  =   Math.sqrt( thumbnailRectArea) ; 
	   rectChildHeightInitial =   Math.sqrt( thumbnailRectArea) ;	 
	 
}
  

function updateScaleRectanaglesLocal(scaleValue){
	
    scaleRectChild=scaleValue;
    //update treemap 
    autoScallingRectChild();
	reDrawAll();	
	wrapAllTextRect();
}

updateScaleRectanagles=updateScaleRectanaglesLocal;




function getThumbnailImgArea(){
	 var thumbnailImgtArea=  scaleImgChild * grandParentArea  / (childNodes.length  ); //* grandParentArea
     
	 return thumbnailImgtArea;
}

function autoScallingImgChild(){
     var thumbnailImgtArea= getThumbnailImgArea();	
	   	   	   
	   imageWidthInitial  =   Math.sqrt( thumbnailImgtArea) ;  
	   imageHeightInitial =   Math.sqrt( thumbnailImgtArea) ;	 


   	 
}

function updateScaleImagessLocal(scaleValue){
	
    scaleImgChild=scaleValue;
    //update treemap 
    autoScallingImgChild();
	
	reDrawAll();	
 
}
updateScaleImages=updateScaleImagessLocal;

function saveImageLocal(imageName){
	
		 
		d3.select('#vis-container-scatterplot').selectAll("g")
		.append('text')
		.text('Visit us again at our website  qnd.qcri.org')  
		.style("font", "28px times")
		.style("stroke-width", 0.6) // initial thickhness of border is 1
		.style("stroke",  "blue")		  
		.attr("x", 10) // x position of rect node
	    .attr("y", 990);
		
 
		
	try{
		
		var currentSVG=document.getElementById("mainSvg");	
       saveSvgAsPng(currentSVG, imageName+".png", {scale: 1});	   
	}catch(e){
       console.log("error image saving");
	} 
}

saveImage=saveImageLocal;


var saveStatesArray=[];	   

function saveStateClientInterfaceLocal(){
	var currentSaveState=new SaveState();
	currentSaveState.saveDataStructures(parentChildrenMap, parentPolygonsMap,parentSitePositionPolygonsMap, parentCellsChildrenLayersMap, parentCellsColors, nodeColorMapping, childNodes, initialNodesSize, totalInitialNodesSize,  tempNodesPosition, parentNodes, parentCells);
   
    console.log(JSON.stringify(currentSaveState));
	
    return currentSaveState;
}

saveStateClientInterface=saveStateClientInterfaceLocal;


function recoverStateClientInterfaceLocal(currentSaveState){
	if(currentSaveState!=null){
		parentChildrenMap.clear();
		parentPolygonsMap.clear();
		parentSitePositionPolygonsMap.clear();
		parentCellsChildrenLayersMap.clear();
		nodeColorMapping.clear();
		//clear arrays
		parentCellsColors.length=0;
		childNodes.length=0;
		tempNodesPosition.length=0;			
		parentNodes.length=0;
		parentCells.length=0;
		//clear variables
		initialNodesSize=0;
		totalInitialNodesSize=0;

		parentChildrenMap= currentSaveState.getState_parentChildrenMapClone();//
		parentPolygonsMap= currentSaveState.getState_parentPolygonsMapClone();
		parentSitePositionPolygonsMap= currentSaveState.getState_parentSitePositionPolygonsMapClone();
		parentCellsChildrenLayersMap= currentSaveState.getState_parentCellsChildrenLayersMapClone();
		parentCellsColors= currentSaveState.getState_parentCellsColorsClone();
		nodeColorMapping=  currentSaveState.getState_nodeColorMappingClone();
		childNodes=  currentSaveState.getState_childNodesClone();
		initialNodesSize=  currentSaveState.getState_initialNodesSizeClone();
		totalInitialNodesSize=  currentSaveState.getState_totalInitialNodesSizeClone();
		tempNodesPosition=  currentSaveState.getState_tempNodesPositionClone();
		
		parentNodes=  currentSaveState.getState_parentNodesClone();
		parentCells=  currentSaveState.getState_parentCellsClone();
		
		//update text fields
		//updateLabelsTextFields();
		
		//redraw voronoi cells
		  autoScallingRectChild();
	      reDrawAll();	
	      wrapAllTextRect();
	
	}
            
}			
	  
	  
recoverStateClientInterface=recoverStateClientInterfaceLocal;



function saveStateJSONClientInterfaceLocal(){
	var stateJSONObject=new stateJSON();
	
	var arrayJSONObjects=stateJSONObject.saveDataStructuresJSON(parentChildrenMap, parentPolygonsMap,parentSitePositionPolygonsMap, parentCellsChildrenLayersMap, parentCellsColors, nodeColorMapping, childNodes, initialNodesSize, totalInitialNodesSize,  tempNodesPosition, parentNodes, parentCells);
	
	return arrayJSONObjects;	
}


saveStateJSONClientInterface=saveStateJSONClientInterfaceLocal;


function getchildNodesFromJSONLocal(arrayJSONObjects){			
        return  Array.from(JSON.parse(arrayJSONObjects[6]));			
}

getchildNodesFromJSON=getchildNodesFromJSONLocal;

function recoverStateJSONFile(arrayJSONObjects){
	
	if(arrayJSONObjects!=null){
        parentChildrenMap.clear();
		parentPolygonsMap.clear();
		parentSitePositionPolygonsMap.clear();
		parentCellsChildrenLayersMap.clear();
		nodeColorMapping.clear();
		//clear arrays
		parentCellsColors.length=0;
		childNodes.length=0;
		tempNodesPosition.length=0;			
		parentNodes.length=0;
		parentCells.length=0;
		//clear variables
		initialNodesSize=0;
		totalInitialNodesSize=0;
		
		
		parentChildrenMap=new Map(JSON.parse(arrayJSONObjects[0]) );		
		parentPolygonsMap=new Map(JSON.parse(arrayJSONObjects[1]) );	
		parentSitePositionPolygonsMap=new Map(JSON.parse(arrayJSONObjects[2]) );	
		parentCellsChildrenLayersMap=new Map(JSON.parse(arrayJSONObjects[3]) );	
		nodeColorMapping=new Map(JSON.parse(arrayJSONObjects[4]) );	
		
		parentCellsColors=Array.from(JSON.parse(arrayJSONObjects[5]));	
		childNodes=Array.from(JSON.parse(arrayJSONObjects[6]));	
		initialNodesSize=childNodes.length;//parseInt(JSON.parse(arrayJSONObjects[7]));	
		totalInitialNodesSize=childNodes.length;//parseInt(JSON.parse(arrayJSONObjects[8]));	
		tempNodesPosition=Array.from(JSON.parse(arrayJSONObjects[9]));	
		parentNodes=Array.from(JSON.parse(arrayJSONObjects[10]));			
	}
	
	
}

function recoverStateJSONClientInterfaceLocal(arrayJSONObjects){
	if(arrayJSONObjects!=null){
		recoverStateJSONFile(arrayJSONObjects);
//		parentCells=(JSON.parse(arrayJSONObjects[11]));	//Array.from
		
	/*	parentCellsColors=(JSON.parse(arrayJSONObjects[5]));	
		childNodes=(JSON.parse(arrayJSONObjects[6]));	
		initialNodesSize=parseInt(JSON.parse(arrayJSONObjects[7]));	
		totalInitialNodesSize=parseInt(JSON.parse(arrayJSONObjects[8]));	
		tempNodesPosition=(JSON.parse(arrayJSONObjects[9]));	
		//parentNodes=(JSON.parse(arrayJSONObjects[10]));	
	    parentNodes=Array.from(JSON.parse(arrayJSONObjects[10]));	
		//parentCells=(JSON.parse(arrayJSONObjects[11]));	//Array.from*/
		
		
//		computeWeightedInitialLoc0(parentNodes);
//		parentCells= computeWeightedBasedOnPrevoiusLocW00(parentNodes);
parentCells=computeWeightedInitialLoc0(parentNodes,parentChildrenMap,totalInitialNodesSize, [] ,polyCopyGlobal);						   
parentCells =computeWeightedBasedOnPrevoiusLocW00(parentNodes, [] ,polyCopyGlobal);			
		
		//console.log("parentCells");
		//console.log(JSON.stringify(parentCells));		
	    //redraw voronoi cells
		autoScallingRectChild();
	    reDrawAll();	
				
	    wrapAllTextRect();
					
    }

}


recoverStateJSONClientInterface=  recoverStateJSONClientInterfaceLocal ;


//with scalability
/*function getGroupSizeSubChildren(allGroupChildren){
		    if(allGroupChildren.length>=groupChildrenSize) 
			   return allGroupChildren.slice(0,groupChildrenSize);
		    else 
			   return allGroupChildren;
		} */
		
		


       
//disabled scalability
function getGroupSizeSubChildren(allGroupChildren){
	//if(allGroupChildren.length>=groupChildrenSize) 
	//   return allGroupChildren.slice(0,groupChildrenSize);
	//else  return allGroupChildren;
		
	var proto=[];
	proto.length=0;
	/*for(var i=0; i<prototypesChildrenNodes.length;++i){
		//.filter(function(d) { return  parseInt
		if(prototypesChildrenNodes.length>0)
		if(allGroupChildren.indexOf(prototypesChildrenNodes[i]!=-1) ){
			proto.push(prototypesChildrenNodes[i]);
			//console.log("getGroupSizeSubChildren");
			//console.log(prototypesChildrenNodes[0]);
			//console.log(prototypesChildrenNodes);	
			//console.log(allGroupChildren);							
			return proto;
			//break;
		}
		
	}*/
			
			
	for(var i=0; i<allGroupChildren.length;++i){
		if(prototypesChildrenNodes.length>0){
		  //console.log("prototypesChildrenNodes");
		  //console.log(prototypesChildrenNodes);
		  for(var p=0; p<prototypesChildrenNodes.length ; ++p){	
				 
				if( parseInt(allGroupChildren[i])== parseInt(prototypesChildrenNodes[p]) ){
					proto.push(prototypesChildrenNodes[p]);
					//console.log("getGroupSizeSubChildren");
					//console.log(prototypesChildrenNodes[p]);
					//console.log(prototypesChildrenNodes);	
					//console.log(allGroupChildren);							
					return proto;
				}
		   }
		   
		}
	}
	
		
	//}

	//if(proto.length!=0)
	//   return proto;
	//else 
	
    if(isChildrenScalability){

	    
		var childIndex=allGroupChildren[0];		
		var parentIndex=getParentIdFrmChildIndx(childIndex);
		
		console.log("getGroupSizeSubChildren");
		//console.log(childIndex+" "+parentIndex);
		//console.log(getCounterVis(parentIndex));
		//console.log(counterVis[parentIndex]);

		/*if(allGroupChildren.length>=groupChildrenSize) 
		    return allGroupChildren.slice(0,groupChildrenSize);
	     else 
			return allGroupChildren;
        */        
		
		var lim=counterVis[parentIndex];
		
		console.log(counterVis);
		if(counterVis==undefined || counterVis.length==0){
		   if(allGroupChildren.length>=groupChildrenSize) 
		      return allGroupChildren.slice(0,groupChildrenSize);	   
		   else 
		      return allGroupChildren;
		  
		}else if(lim==undefined){           		   		   
		        lim=1; 
				return allGroupChildren.slice(0,lim);		   				 							   
		}else if(parentNodes.length!=1){
			
			    //if(allGroupChildren<=groupChildrenSize)++lim;
			
				if(allGroupChildren.length>lim){ 
				   //if(lim==15)return allGroupChildren.slice(0,lim);
				   //else return allGroupChildren.slice(0,++lim);
				   //return allGroupChildren.slice(0,lim);
                   //return allGroupChildren.slice(0,++lim);
                     return allGroupChildren.slice(0, Math.min(allGroupChildren.length,++lim));				   
				}else 
					return allGroupChildren;
		}else if(parentNodes.length==1){
			
			//if(allGroupChildren.length>=groupChildrenSize) 
		       //return allGroupChildren.slice(0,groupChildrenSize);
		    if(allGroupChildren.length>=lim)
		       return allGroupChildren.slice(0,lim);		   
	        else 
			   return allGroupChildren;
			
		}

 		
		
	}else{
		return allGroupChildren;
	}
} 
		
				
		
function showRepresentativeRects(){
	

}

function updateIfRepresentativeNode(selectedNodeIndex){// 
	var nodeN= childNodes[selectedNodeIndex].n;
	for(var p=0; p<parentNodes.length ; ++p){
		if(nodeN ==parentNodes[p]["representative"]){
			var parentChildren=parentChildrenMap.get(parentNodes[p].n);
			parentNodes[p]["representative"] = parentChildren[0];
		
		}
	}			
	
}

function isRepresentativeNode(selectedNodeIndex){
	var representParent=-1;
	/*var nodeN= childNodes[selectedNodeIndex].n;
	for(var p=0; p<parentNodes.length ; ++p){
		if(nodeN ==parentNodes[p]["representative"]){
			representParent=parentNodes[p].n;
			break;
		}
			
	}*/
	
	return representParent;
	
}


function isCollapsedParentNode(selectedParentNodeIndex){
	  console.log("isCollapsedParentNode");
	  var result=false;
	  
	  var representCildNode=parentNodes[selectedParentNodeIndex]["representative"];
	  console.log(representCildNode);			 			  
	  console.log(prototypesChildrenNodes);
	  
	  if(prototypesChildrenNodes.indexOf(representCildNode+"")!= -1 )
		  result= true;
	  
	  console.log(result);
				  
	  return result;			
}	


function getCollapsedParentNodesLocal(){
   var collapsedParentNodesArray=[];
   collapsedParentNodesArray.length=0;
   
   for(var i=0;i<prototypesChildrenNodes.length;++i){
       var parentNodeIndex= getParentIdFrmChildIndx(prototypesChildrenNodes[i]);
	   collapsedParentNodesArray.push(parentNodeIndex);
   }
   
   return collapsedParentNodesArray;
}	

getCollapsedParentNodes=getCollapsedParentNodesLocal;

function drawAllChildrenDealunyNearestNeighber(diagram,parentID){

	
	var delunyChildrenEdges=[];
	
	delunyChildrenEdges=getDelunyGraphFrmVoroni(diagram,parentID);
	
//	delunyChildrenEdges=getDelunyGraphFrmAllVisableChildrenNodes();
	
    /*
	for(var s=0; s<parentChildren.length; ++s){
       var pointNeighbors=Array.from(diagram.neighbors(s));
	   
	   console.log(pointNeighbors);
	   for(var e=0; e<pointNeighbors.length;++e){		   
		   //var edge= {edgeID: s+"-"+e,startNode: s ,endNode: e};
		   if(diagram.cellPolygon(e))
		   if(!edgesChildrenSet.has(s+"-"+e) && !edgesChildrenSet.has(e+"-"+s)){
			   
			    edgesChildrenSet.add(s+"-"+e);
			    //delunyChildrenEdges.push(edge);
	
				var n1= childNodes[parentChildren[s]];
				var n2= childNodes[parentChildren[e]];
					  
				delunyChildrenEdges.push(
					{x1: n1.x, 
					 y1: n1.y, 
					 x2: n2.x, 
					 y2: n2.y}
				  ); 
			  
		   }
		   
	   }
	   
	}*/
	
	
	var lin=d3.select('svg g')
	.selectAll('line')
	.data(delunyChildrenEdges);

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
		 			
	  console.log(delunyChildrenEdges);		
	
	
}

function drawAllVisibleChildrenDealunyNearestNeighber(nodesToDrawLocal){
	console.log("drawAllVisibleChildrenDealunyNearestNeighber");
	
	var delunyChildrenEdges=getDelunyGraphFrmAllVisableChildrenNodes(nodesToDrawLocal);
	
		
	var lin=d3.select('svg g')
	.selectAll('line')
	.data(delunyChildrenEdges);

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
		 			
	  console.log(delunyChildrenEdges);	

     // printLeveling(delunyChildrenEdges,0);	  
	
}


function getDelunyGraphFrmVoroni(diagramLocal,parentIDLocal){
	
	var delunyChildrenEdges=[];
	delunyChildrenEdges.length=0;
	
    var parentChildren= parentChildrenMap.get(parentIDLocal);		  
    parentChildren=getGroupSizeSubChildren(parentChildren);
	//console.log(parentChildren);
	
    console.log("drawAllChildrenDealunyNearestNeighber");
    const edgesChildrenSet = new Set();	

	
	for(var s=0; s<parentChildren.length; ++s){
	  const n = [];
      const ai = new Set((diagramLocal.cellPolygon(s) || []).map(String));
	  for (const e of diagramLocal.delaunay.neighbors(s))
          for (const c of diagramLocal.cellPolygon(e) || [])
              if (ai.has(String(c))){
                    if(!edgesChildrenSet.has(s+"-"+e) && !edgesChildrenSet.has(e+"-"+s)){
					    edgesChildrenSet.add(s+"-"+e);
					    var n1= childNodes[parentChildren[s]];
					    var n2= childNodes[parentChildren[e]];
					    delunyChildrenEdges.push(
						  {x1: n1.x, 
						   y1: n1.y, 
						   x2: n2.x, 
						   y2: n2.y}
					    ); 
					}
			  }
	
	}
	
	return delunyChildrenEdges;
	
}


function getDelunyGraphFrmAllVisableChildrenNodes(subChildrenNodesLocal){
  	  										
	var delaunayLocal = d3.Delaunay.from(subChildrenNodesLocal, p => p.x, p => p.y); // create dealuny from updates nodes
	var diagramLocal = delaunayLocal.voronoi([0,0,voronoiWidth,voronoiHeight]); 
	
	
	var delunyChildrenEdgesLocal=[];
	delunyChildrenEdgesLocal.length=0;
	
		
	const edgesChildrenSet = new Set();	
	
	for(var s=0; s<subChildrenNodesLocal.length; ++s){
	  const n = [];
      const ai = new Set((diagramLocal.cellPolygon(s) || []).map(String));
	  for (const e of diagramLocal.delaunay.neighbors(s))
          for (const c of diagramLocal.cellPolygon(e) || [])
              if (ai.has(String(c))){
                    if(!edgesChildrenSet.has(s+"-"+e) && !edgesChildrenSet.has(e+"-"+s)){
					    edgesChildrenSet.add(s+"-"+e);
					    var n1= childNodes[subChildrenNodesLocal[s].n];//childNodes[parentChildren[s]];
					    var n2= childNodes[subChildrenNodesLocal[e].n];//childNodes[parentChildren[e]];
					    delunyChildrenEdgesLocal.push(
						  {n1Id: n1.n,
						   n2Id: n2.n,
						   x1: n1.x, 
						   y1: n1.y, 
						   x2: n2.x, 
						   y2: n2.y}
					    ); 
					}
			  }
	
	}
	
	
	return delunyChildrenEdgesLocal; 
}


function computeOneGlobalLevelingFrmVisibleAllChildrenNodes(visibleAllChildren, rootNode){

  	  var visFilteredAllChildrenNodes= childNodes.filter(function(d){return visibleAllChildren.has(d.n);});
	  var nodesToLevel=[]; 
	  nodesToLevel.length=0;
	  for(var i=0;i<visFilteredAllChildrenNodes.length;i++){
		   var nodeData=visFilteredAllChildrenNodes[i];
		   nodesToLevel.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
	  }	
	  
	 var levelGlobal= computeLevelingFrmNodes(nodesToLevel,rootNode);
	  
	 return levelGlobal;
}



function computeManyLevelingsFrmParentsChildrenNodes(){
      console.log("computeManyLevelingsFrmParentsChildrenNodes");
	  console.log(parentChildrenMap);
	  
	  var levelAllParent=[];
	  
	  var keysOfCurrentMap=Array.from(parentChildrenMap.keys());
	  
	  keysOfCurrentMap.sort(function(a, b) {
			   return a - b;
	  });
	  
	  
	  for(var index=0; index<keysOfCurrentMap.length;++index){	
	  
	      var parentChildren= parentChildrenMap.get(keysOfCurrentMap[index]);		  
		  parentChildren=getGroupSizeSubChildren(parentChildren);
	      
		  
	      var nodesToLevel=[]; 
		  nodesToLevel.length=0;
		  for(var i=0;i<parentChildren.length;i++){
			   var nodeData=childNodes[parentChildren[i]];
			   nodesToLevel.push({n:nodeData.n, x:nodeData.x, y:nodeData.y});
		  }
		  
	
	
	      //find center point of a polygon
		  var parentPolygon=parentPolygonsMap.get(keysOfCurrentMap[index]);				  
		  var polygon=turf.polygon([ parentPolygon ]);
		  var centerInfo = turf.centerOfMass(polygon);
          var center=[centerInfo["geometry"]["coordinates"][0], centerInfo["geometry"]["coordinates"][1]];
		  				  
          //find child cell that contains this center point
		  var foundChildCell=findChildCell(keysOfCurrentMap[index], center[0],center[1]);
			 
		  //if(foundChildCell!=null){
				 //console.log("found findChildCell");
				 //console.log(foundChildCell);
		  //}
			 
		  //use this child	as root
		  var rootNode=foundChildCell;//childNodes[foundChildCell].n;
		  
//		  var rootNode=parentNodes[keysOfCurrentMap[index]]["representative"] ;
		  var levelParentChildren= computeLevelingFrmNodes(nodesToLevel,rootNode);
		  var levelParentChildrenObjArray=[];
		  levelParentChildrenObjArray.length=0;
		  
		  
		  console.log("ManyLevelings index="+index);
		  console.log(nodesToLevel);
		  console.log(rootNode);
		  console.log(levelParentChildren);
		  var jsonOjects= JSON.parse(JSON.stringify(levelParentChildren));
		  var jsonLevelingObjectsArray=[];
		  jsonLevelingObjectsArray.length=0;
		  console.log(jsonOjects);
		  for(var iv=0;iv<jsonOjects.length;++iv){
			  if(jsonOjects[iv]!=null){
			    //console.log(iv);
			    //console.log(jsonOjects[iv]);
			    jsonLevelingObjectsArray.push({nodeLocalId: iv, level:jsonOjects[iv]});
			  }
		  }
	  
	  
	      jsonLevelingObjectsArray.sort(function(a, b) {
	        return a.level - b.level;
	      });
	  
	      levelAllParent[keysOfCurrentMap[index]]=jsonLevelingObjectsArray;//levelParentChildren;//Array.from(levelParentChildren);
	  
	  }
	  
	  console.log("levelAllParent");	  
	  console.log(levelAllParent);
	  
	  return levelAllParent;
}

computeManyLevelingsFrmParentsChildrenNodesGlobal= computeManyLevelingsFrmParentsChildrenNodes;
 
function computeLevelingFrmNodes(nodesToLevelLocal,rootNode){
  	console.log("computeLevelingFrmNodes");		  	
	var delunyChildrenEdges=getDelunyGraphFrmAllVisableChildrenNodes(nodesToLevelLocal);		
	var graph=createGraphFrmEdges(delunyChildrenEdges);	
    var level=getLevelingFrmGraphBFS(graph,rootNode); 
	
	/*console.log("Nodes - level"); 
    for (var i = 0; i < level.length; i++) 
        console.log(i + "   -->   "  + level[i] ); */
	
	return level;
}

function printLeveling(edges,root){
	console.log("printLeveling");
	var graph=createGraphFrmEdges(edges);
	
    var level=getLevelingFrmGraphBFS(graph,root);
	
	
	console.log("Nodes - level"); 
    for (var i = 0; i < level.length; i++) 
        console.log(i + "   -->   "  + level[i] ); 
	
}

function getLevelingFrmGraphBFS(graph,root){
    var level=[];// number // size = nodes #
    var marked=[];// boolean // size = nodes #
	
	var que=[];
	
	que.push(root);
	
	level[root]=0;
	
	marked[root]=true;
	
	console.log("root");
	console.log(root);
	console.log("graph");
	console.log(graph);
			
	while(que.length!=0){
		
		x=que.shift();
		console.log("x");
		console.log(x);
		console.log(graph[x]);
		if(graph[x]!=null || graph[x]!=undefined){
			//it happen as we ignore direction of edge (reverse edge) when creating graph graph
			for (var i = 0; i < graph[x].length; i++) { 
				// b is neighbor of node x 
				var b = graph[x][i]; 
	  
				// if b is not marked already 
				if (!marked[b]) { 
	  
					// enqueue b in queue 
					que.push(b); 
	  
					// level of b is level of x + 1 
					level[b] = level[x] + 1; 
	  
					// mark b 
					marked[b] = true; 
				} 
			} 
	    }
	}
	
	return level;
	
}

function createGraphFrmEdges(edges){
   var graph=[];
   
   for(var i=0;i<edges.length;++i){
       var n1Id=parseInt(edges[i].n1Id);
	   var n2Id=parseInt(edges[i].n2Id);
	   
	   if(graph[n1Id]==null || graph[n1Id]==undefined){
		  graph[n1Id]=[];
		  graph[n1Id].push(n2Id);
	   }else{
	      graph[n1Id].push(n2Id);
	   }
	   
	   
	   if(graph[n2Id]==null || graph[n2Id]==undefined){
		  graph[n2Id]=[];
		  graph[n2Id].push(n1Id);
	   }else{
	      graph[n2Id].push(n1Id);
	   }
	   
   }
   
   return graph;
}


function sortByProbabilityOwnClassLocal(combinedDataFakeProbabilityLocal,groubsList){
	
	var levelAllParent = computeManyLevelingsFrmParentsChildrenNodesGlobal();

	//const groubsList=[...new Set(combinedData.map(x=>x.classID))];
	
	 
	console.log("groubsList");
	console.log(groubsList);
	console.log(groubsList.length);
	
	for(var c=0;c<groubsList.length ;++c){
	    console.log(c);
	    console.log(groubsList[c]);
	   
	    var group=groubsList[c];
		
		var groupColumn=combinedDataFakeProbabilityLocal.filter(function(objChild) {
		  return objChild.classID == group;
		});
		
	    groupColumn.sort(function(a, b) {
	      return a[group] - b[group];
	    });

//////
        var setChildren=[];
		setChildren.length=0;
		var copyProbability=[];
		copyProbability.length=0;
        for(var i=0;i<groupColumn.length;++i){
		    setChildren.push( parseInt(groupColumn[i]["id"]));
			copyProbability.push( groupColumn[i][group]);
		}

		console.log("group");			
		console.log(group);	
		console.log(groupColumn);	
		console.log(setChildren);
	
		//it is beter to move this function to API as function with probabilites as argument. 		
		// setChildren 
		 targetParent = getParentIdFrmChildIndx(setChildren[0]);
		
		 var currentLevel=levelAllParent[targetParent];

		 console.log("currentLevel");		 
		 console.log(currentLevel);
		 for(var sc=0;sc<setChildren.length;++sc){
			 if(currentLevel[sc]!=undefined){
				
               //prevouis pos of new vis nodes			
			   const x= childNodes[setChildren[sc]].x;
			   const y= childNodes[setChildren[sc]].y;
			   
			   //new pos of new vis nodes	
		       childNodes[setChildren[sc]].x=  childNodes[currentLevel[sc]["nodeLocalId"]].x  ;
			   childNodes[setChildren[sc]].y=  childNodes[currentLevel[sc]["nodeLocalId"]].y  ;
			   
			   //change pos of old vis nodes
			   childNodes[currentLevel[sc]["nodeLocalId"]].x= x;
			   childNodes[currentLevel[sc]["nodeLocalId"]].y= y;
				
			   childNodes[setChildren[sc]].level= currentLevel[sc]["level"];
			   childNodes[setChildren[sc]].p= copyProbability[sc].toFixed(3);
                
			}else{
			   //console.log("undefined SC="+sc);
			   //console.log("sc="+sc);
			   //console.log(currentLevel[sc]);
			}
		 }
		 

		  
	     updateHierarchyWithSetChildren(setChildren, targetParent);

	}
	
			 

}

sortByProbabilityOwnClassGlobal=sortByProbabilityOwnClassLocal;

//this variant fun still not work
function drawAllChildrenDealunyNearestNeighber1(delaunay,parentID){
    console.log("drawAllChildrenDealunyNearestNeighber");		
	var delunyChildrenEdges=[];
		
	
	const {points, triangles} = delaunay;
	 //console.log(triangles);
	 console.log(points);
	for(var i=0; i<triangles.length/3; ++i){
		 const t0 = triangles[i * 3 + 0];
		 const t1 = triangles[i * 3 + 1];
		 const t2 = triangles[i * 3 + 2];
		  
		 const p1x=t0 * 2;
		 const p1y=t0 * 2 + 1;
		  		  
		 const p2x=t1 * 2;
		 const p2y=t1 * 2 + 1;
		  
		 const p3x=t2 * 2;
		 const p3y=t2 * 2 + 1;
		  						  
		 delunyChildrenEdges.push(
			{x1: points[p1x], 
			 y1: points[p1y], 
			 x2: points[p2x], 
			 y2: points[p2y]}
		  ); 
				  		  
		  delunyChildrenEdges.push(
			{x1: points[p1x], 
			 y1: points[p1y], 
			 x2: points[p3x], 
			 y2: points[p3y]}
		  ); 
				  		 		 
		 delunyChildrenEdges.push(
			{x1: points[p2x], 
			 y1: points[p2y], 
			 x2: points[p3x], 
			 y2: points[p3y]}
		  ); 
	  	
	}
	
	

	/*
    var parentChildren= parentChildrenMap.get(parentID);		  
    parentChildren=getGroupSizeSubChildren(parentChildren);
    const edgesChildrenSet = new Set();	
	//console.log(parentChildren);
	for(var s=0; s<parentChildren.length; ++s){
       
	   var pointNeighbors= Array.from(delaunay.neighbors(s)) ;
	   
	   console.log(pointNeighbors);
	   for(var e=0; e<pointNeighbors.length;++e){		   
		   //var edge= {edgeID: s+"-"+e,startNode: s ,endNode: e};
		   
		   if(!edgesChildrenSet.has(s+"-"+e) && !edgesChildrenSet.has(e+"-"+s)){
			   
			    edgesChildrenSet.add(s+"-"+e);
			    //delunyChildrenEdges.push(edge);
	
				var n1= childNodes[parentChildren[s]];
				var n2= childNodes[parentChildren[e]];
					  
				delunyChildrenEdges.push(
					{x1: n1.x, 
					 y1: n1.y, 
					 x2: n2.x, 
					 y2: n2.y}
				  ); 
			  
		   }
		   
	   }	
   	   
	}
	*/

	
	  var lin=d3.select('svg g')
		.selectAll('line')
		.data(delunyChildrenEdges);

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
		 			
	  console.log(delunyChildrenEdges);				
	
}


//this variant fun still not work
function drawAllDealunyNearestNeighber1(cells, isWeighted){
	console.log("drawAllDealunyNearestNeighber");
	console.log(cells);
	var parentAreaLocal=d3.polygonArea(polyCopyGlobal);
   			   
			   
	var delunyEdges=[];
	var cellpolygonEdges=[];
	var midP=[];
	var nodesNeibureMap=new Map();
    for(var ind=0; ind<cells.length ; ++ind){
		  var sitePoly=cells[ind].site;	
		  //var cell_Id=sitePoly.originalObject.id;
		  var cell_Id;
		  
		  
			  cell_Id=sitePoly.originalObject.data.originalData.id;//id
			  if(cell_Id==null || cell_Id==undefined)
				 cell_Id=sitePoly.originalObject.data.originalData.n; 
		 
		  
		  
		  nodesNeibureMap.set(cell_Id,[]);
		  
		  var cellpolygon=Array.from(sitePoly.polygon);
		  
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
			  
			  var cell_id;
			   
				  cell_id=sitePoly.originalObject.data.originalData.id;//id
				  if(cell_id==null || cell_id==undefined)
					 cell_id=sitePoly.originalObject.data.originalData.n; 
				 
			   
			  var x=parseInt(sitePoly.x);//nodes[cell_Id].x
			  var y=parseInt(sitePoly.y);//nodes[cell_Id].y
			    
			  
			  //var r=parseInt(nodes[cell_Id].radius);// Ri[cell_Id]
			  
			  //console.log(sitePoly.originalObject.data.originalData.n);
			  //console.log(cell_id);
			  //console.log(parentNodes);
			  //console.log(parentNodes[cell_id].weight);
			  
			   				  
			       var r=parseInt( Math.sqrt(parentAreaLocal * parentNodes[cell_id].weight / Math.PI) );			  			  
				   distancePower=computePowerDistance(midx,midy,x,y,r);					  
			       distArray.push({dist:distancePower,cell_Id:cell_id});
			  	  				  
		  }
		  
		    distArray.sort(function(a, b){
				return a.dist-b.dist
			});
			
			min1ID=distArray[0].cell_Id;
			min2ID=distArray[1].cell_Id;
											  
				  
 		  if(min1ID!=-1 && min2ID!=-1){	

                var n1= childNodes[parentNodes[min1ID]["representative"]];
				var n2= childNodes[parentNodes[min2ID]["representative"]];
					  
			    delunyEdges.push(
					{x1: n1.x, 
					 y1: n1.y, 
					 x2: n2.x, 
					 y2: n2.y}
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

function clipPloygonGlobal(polygonLocal){
	var clipedPolygon=[];
	

	
	for(var i=0; i<polygonLocal.length;++i){
		
		var point=polygonLocal[i];
		
		if(point[0] <= 0){
			point[0]=0;
		}
		
		if(point[0] >= voronoiWidth){
			point[0]=voronoiWidth;
		}
		
	    if(point[1] <= 0){
			point[1]=0;
		}
		
		if( point[1] >= voronoiHeight){
			point[1]=voronoiHeight;
		}
		
		
		clipedPolygon.push(point);
	}
	
	return clipedPolygon;
	
}






	
}







	 