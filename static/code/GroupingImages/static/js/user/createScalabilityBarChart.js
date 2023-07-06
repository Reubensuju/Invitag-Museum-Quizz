
//### Test for updating size of visible categories in InViTag
//### VERSION 2 with visibility limit on each category can be set at will
//### 

//####################
//## CONSTANT
//####################
var numObj; //# total num of obj
var numCat;  //# number of categories (can be set to the ongoing max num of categories)
var visBudget=10;  //# num of visible obj in the Voronoi treemap
//# MUST HAVE: 0 < visBudget < numObj



//drawScalabilityBarChart();

var counterCat=[];
var visLimitCat=[];

var counterVis=[];

var localParentChildrenMap=null;
var keysScale=[];
	
function getUpdateData(){
  localParentChildrenMap=new Map(getParentChildrenMap());
    
  //localParentChildrenMap=getParentChildrenMap();

//console.log("getUpdateData");
//console.log(localParentChildrenMap);

var indexsCollapsedParentNodes=[];
indexsCollapsedParentNodes.length=0;
indexsCollapsedParentNodes=getCollapsedParentNodes();
//console.log(indexsCollapsedParentNodes);

  keysScale=[];
  keysScale.length=0;
  //keysScale=[...localParentChildrenMap.keys()];
  keysScale=Array.from(localParentChildrenMap.keys());

 // console.log("keysScale"); 
//  console.log(keysScale);
  keysScale.sort(function(a, b){return a - b});
 
  counterCat=[];
  counterCat.length=0;
  
  for(var index=0; index<=keysScale.length-1;++index){	
	//	console.log(keysScale[index]);
	   //var parentChildrensc=  [...localParentChildrenMap.get(keysScale[index])];
	   var parentChildrensc= Array.from( localParentChildrenMap.get(keysScale[index]) );
	   
	   //parentChildren=getGroupSizeSubChildren(parentChildren);
	   //counterCat[index]=[];
	   //counterCat[index]["parentID"]=keysScale[index];
	   //counterCat[index]["totalChildren"]=parentChildrensc.length;
	   
	   const x=keysScale[index];
	   const y=parentChildrensc.length;
	   
	   //console.log("indexsCollapsedParentNodes");	   
	   //console.log(indexsCollapsedParentNodes.indexOf(keysScale[index]));
	   
	   //category is collapsed, we will consider its vis as if it has one child  
	   if(indexsCollapsedParentNodes.indexOf(keysScale[index])!=-1)
		   counterCat.push({parentID:x,totalChildren:1});
	   else 
		   counterCat.push({parentID:x,totalChildren:y});
	   
	    
	   
	   //console.log(x);
	   //console.log(y);
	   
	}
	
	numObj=childNodes.length;
	numCat=counterCat.length;	
	
	//console.log([...counterCat]);
	
}




//####################
//## FUNCTIONS
//####################

//####################
//## INITIALIZATION
var catLists=[];
var isVisible=[];
var isInCat=[];

function resetCat(numObj,numCat,visBudget){
  //  console.log("resetCat");
	getUpdateData();

	numObj=childNodes.length;
	numCat=counterCat.length;

	//console.log(numCat);
	
    // limit for visibility of each category, set to max possible by default
	visLimitCat=[];
	visLimitCat.length=0;

    var visLimitCatThreshold=0;//computeVisLimitCatThreshold();
	
	for(var i=0;i<counterCat.length;++i){	 
	   visLimitCat.push({parentID:i,totalChildren:visLimitCatThreshold});//10
	}

//    visLimitCat=Array.from(counterCat);

	//vector storing total num of obj in each category
	counterVis=[];
	counterVis.length=0;
	counterVis=rep(0,numCat);//[...counterCat];
	//initial visible obj in each category (sum(counterVis)=visBudget)
	counterVis[0] =visBudget; //.totalChildren
	//number of invisible object in each category is given by counterCat-counterVis
	
	
	
    var localParentChildrenMap=getParentChildrenMap();
	//var keysOfCurrentMap=[...localParentChildrenMap.keys()];
	var keysOfCurrentMap=Array.from(localParentChildrenMap.keys());
	
    keysOfCurrentMap.sort(function(a, b){return a - b});
  	
	//ordered list of objects in each of the numCat categories
	//initially, category 1 contain obj 1 to numObj in that order.
    catLists=[];
	catLists[0]= [... localParentChildrenMap.get(keysOfCurrentMap[0])];
	

	//visibility state of each object: visibilityOfObj = isVisible[obj]
    isVisible=[];
	isVisible.length=0;
	isInCat=[];
	isInCat.length=0;
	
	//var i=0;
	for(var i=0;i<childNodes.length;++i){

		//makes visible the first visBudget objects in cat 1
		if(i<visBudget){
		   isVisible[i]=true;
		}else{
		   isVisible[i]=false;
		}
		
		//category of each object: catOfObj = isInCat[obj]
		isInCat[i]=getParentIdFrmChildIndxGlobal(childNodes[i].n);//childNodes[i].GroupID;
		
		
	}
		
	
	//console.log("end resetCat");
   // console.log(visLimitCat);
	
}

function updateCategoriesData(){
	//console.log("updateCategoriesData");
	
   var localParentChildrenMap=getParentChildrenMap();
	//var keysOfCurrentMap=[...localParentChildrenMap.keys()];
	var keysOfCurrentMap=Array.from(localParentChildrenMap.keys());
	
	keysOfCurrentMap.sort(function(a, b){return a - b});
	
	
	visLimitCat=[];
	visLimitCat.length=0;
	
	for(var t=0;t<keysOfCurrentMap.length;++t){
	   //catLists[t]= [... localParentChildrenMap.get(keysOfCurrentMap[t])];
	   catLists[t]= Array.from( localParentChildrenMap.get(keysOfCurrentMap[t]));
	   
	   visLimitCat.push({parentID:t,totalChildren:catLists[t].length});//10
	}
	
	
	//var i=0;
	for(var i=0;i<childNodes.length;++i){
		
		isInCat[i]=getParentIdFrmChildIndxGlobal(childNodes[i].n);
		
	}
	
}

//####################
//## adding an object obj to a category list cat in the first position
function pushFirstToCat(obj,cat){
  if(catLists[cat]==undefined)	
	 catLists[cat]=[];
 
  catLists[cat].unshift(obj);
}

//####################
//## removing an object from a category list cat given its position pos in that list
function remFromCat(cat,pos){
  
  var element=catLists[cat][pos];
  if(element!=undefined){
     catLists[cat].splice(element, pos);
  }
  
}


//####################
//## move object obj to category targetCat (iff obj is in the visible set)
function moveObj(obj,targetCat){
	//console.log("moveObj");
	getUpdateData();
  //# obj is the integer identifiying the object (1,2,3...)
  //# targetCat is the integer identifying the category (1,2,3...)
  
  curCat=isInCat[obj]; //# current category
  curPos=catLists[curCat].indexOf(obj);
  
  //# check object is visible
  if (isVisible[obj]==true){
    //# object is visible, make the move
    //# remove from current category, shifting the rest
    remFromCat(curCat,curPos);
  
    //# add to target category in first position, shifting all the rest
    pushFirstToCat(obj,targetCat);
	
	//# update category of object
    isInCat[obj]=targetCat;
	
	 //# update counters of origin and destination categories
    counterCat[curCat].totalChildren=counterCat[curCat].totalChildren-1 ;// # decrement current cat counter
    counterCat[targetCat].totalChildren=counterCat[targetCat].totalChildren+1 ; //# increment target cat counter
    
    //# adjust visibility of each category
    //updateVisibility(visBudget)
	drawScalabilityBarChart();
    
  }
  
  
  
}




//####################
//## set visLimitCat
function updateLimitCat(newLimitCat){
  visLimitCat=[...newLimitCat];  
  //# limit for visibility of each category, 
  //# must be >0 for each non-empty category (i.e. for which counterCat>0)
  
  //# adjust visibility of each category
  updateVisibility(visBudget);
}


//####################
//## determine how much of each category is visible
function updateVisibility(visBudgetLocal){
	//console.log("updateVisibility");

	
	//getUpdateData();
	
    counterVis=[];
	counterVis.length=0;
	counterVis=rep(0,numCat);
	//counterVis[0] =visBudget;
	
	isVisible=[];
	isVisible.length=0;
	isVisible=rep(false,numObj);
	
	var catUpdated=false; //# initial flag to check if any change in visibility updates
    var curLevel=0 ;//# initial level of "visibility" (water)
    var curCat=0 ; //# point to the first category
    var stop=false; 
	
	
	while (stop==false){ 
		//# until there is no visibility budget remaining or all visibility limits have been reached
		// console.log("counterCat="+counterCat.length);
		// console.log(counterCat);

		 //console.log("visLimitCat");
		// console.log(visLimitCat);
		// console.log(catLists);
		 
		////console.log("curCat "+curCat);
		//console.log("curLevel "+curLevel);
		const ck=Math.min(counterCat[curCat].totalChildren,visLimitCat[curCat].totalChildren);
		//console.log("ck "+ck);
		if (parseInt(ck)>curLevel){ 
		  ///# there is still an object to make visible in that category
		  //# get that current object
		  
		  

		  //console.log(catLists[curCat]);
		  

		  curObj=catLists[curCat][curLevel];

		  //if(curObj==undefined){
		    //console.log("curObj");
			//console.log(curObj);
			//continue;
		  //}
		  
		  
		  //# update isVisible visibility index of that current object
		  isVisible[curObj]=true;
		  //# increment visibility counter of that category
		  counterVis[curCat]=counterVis[curCat]+1;
		  //# decrement total visibility budget
		  visBudgetLocal=visBudgetLocal-1;
		  //# flag to tell at least one category got updated
		  catUpdated=true;
		}
		//# go to next category
		curCat=curCat+1;
		
		if (curCat>numCat-1) {
		  curLevel=curLevel+1 ;//# increment "visibility" (water) level
		  curCat=0; //# avoid overflow
		  if (catUpdated==false) 
			stop=true; //# visibility limit (visLimitCat) has been reached for all categories
		  catUpdated=false ; //# initialize the flag
		} 
		if (visBudgetLocal==0) 
			stop=true; //# no more visibility budget
	
    }
	
}

function getCounterVis(curCat){
	
	return counterVis[curCat];
}

function rep(x,arrayLength){
	var localArray=[];
	localArray.length=0;
	
	for(var i=0; i<arrayLength; ++i){
		localArray.push(x);
	}
	
	var localArrayClone= [...localArray];
	return localArrayClone;
	
}




function drawScalabilityBarChart(){
	getUpdateData();
	
	//console.log("getUpdateData");
	/*console.log(numObj);
	console.log(numCat);
    console.log(visBudget);
	 console.log(counterCat);*/
	 
	//if(numCat==1){
	  // resetCat(numObj,numCat,visBudget);
    //} else 
	
	{ 
//	   visLimitCat=[];
//	   visLimitCat.length=0;
	   
//	   var visLimitCatThreshold=0;//computeVisLimitCatThreshold();
//	   for (var i = 0; i < numCat; i++) visLimitCat.push({parentID:i,totalChildren:visLimitCatThreshold}); //
//	   visLimitCat=Array.from(counterCat);	   
	   
	   //updateLimitCat(newLimitCat);
	   updateCategoriesData();
	   
	}
   
	updateVisibility(visBudget);
		
	var chartHeight=200;
	var chartWidth=100;



	
    //getUpdateData();

	   
	d3.select('#scaleGroupsBarCartDIV').selectAll("svg").remove();
	 
	const scaleBarChart = d3.select('#scaleGroupsBarCartDIV').append("svg")
	.attr("width", chartWidth + 40)
    .attr("height", chartHeight + 60)
	.append("g")
	.attr("transform","translate(" + 30 + "," +30 + ")");
     
  

      counterCat.sort(function(a, b){return a.parentID - b.parentID});
	  visLimitCat.sort(function(a, b){return a.parentID - b.parentID});
	  
	// X axis
	  var x = d3.scaleBand()
		.range([ 0, chartWidth ])
		.domain(counterCat.map(function(d) { return d.parentID; }))  
		.padding(0.05);
		
	  scaleBarChart.append("g")
		.attr("transform", "translate(0," + chartHeight + ")")
		.call(d3.axisBottom(x))
		.selectAll("text")
		.text("");//hide text labels on x axis
		
		//to add group names as text at x ticks
		/*.selectAll("text")
		  .attr("transform", "translate(-10,0)rotate(-45)")
		  .style("text-anchor", "end");
		 */
		 
		scaleBarChart.append("text")
				.attr("text-anchor", "end")
				.attr("x", chartWidth/2+20)
				.attr("y", chartHeight+25)
				.text("Groups");
        

	// Add Y axis
	  var y = d3.scaleLinear()
	     .range([ chartHeight, 0])
		 .domain([0, childNodes.length]);
		
	  //scaleBarChart.append("g")
		//.call(d3.axisLeft(y));
		//.call(d3.axisLeft(y).tickFormat(""));//remove labels of y axis

	  
	  var groupsColor=getGroupsArray();
	  //console.log(groupsColor);
		
	  var formatCount = d3.format(",.0f"); 
		
	  // Bars 1
	  scaleBarChart.selectAll(".bar1").remove();
	  scaleBarChart.selectAll(".bar1")
		.data(counterCat)
		.enter()
		.append("rect")
		   .attr("class", "bar1")
		  .attr("x", function(d) { return x(d.parentID); })//+x.bandwidth()/4
		  .attr("y", function(d) { return y(d.totalChildren); })
		  .attr("width", x.bandwidth())//x.bandwidth()
		  .attr("height", function(d) { return chartHeight - y(d.totalChildren); })
		  .attr("fill", function(d) {
		            var p=groupsColor.filter(function(objParent) {
				       return objParent.GroupID == d.parentID;
			        });
			        
				    //console.log(d.parentID);
			        return p[0].color;//"gray"
		          }
		  
		  ).style("opacity",0.4);
		  
		  
		  scaleBarChart.selectAll(".txt1").remove();
		  scaleBarChart.selectAll(".txt1")
		  .data(counterCat)
		  .enter()
		  .append("text")
          .attr("dy", ".25em")
		  .attr("x", function(d) { return x(d.parentID)+x.bandwidth()/2 ; })
		  .attr("y", function(d) { return y(d.totalChildren)-5; })//
		  .attr("text-anchor", "middle")
          .style("fill","steelblue")//"black"
          .text(function(d) { return formatCount(d.totalChildren); });
		  
		  

	 
      // Bars 2
	 var counterVisCopy =[] ;
	 counterVisCopy.length=0;
	 
	 for(var t=0;t<counterVis.length;++t){	   
	   counterVisCopy.push({parentID:t,totalChildren:counterVis[t]});//10
	 }
	
	  
	  scaleBarChart.selectAll(".bar2").remove();
	  scaleBarChart.selectAll(".bar2")
		.data(counterVisCopy)  //visLimitCat
		.enter()
		.append("rect")
		  .attr("class", "bar2")
		  .attr("x", function(d) { return x(d.parentID); })//+x.bandwidth()/4
		  .attr("y", function(d) { 		  
		        var p=counterCat.filter(function(objParent) {
				     return objParent.parentID == d.parentID;
			      });
		  
		        //console.log(d.parentID+"bar2="+d.totalChildren);
				//console.log(d.parentID+"bar2="+p[0].totalChildren);
				var minTotlaChildren=Math.min(parseInt(d.totalChildren), parseInt(p[0].totalChildren));
				//console.log("bar2-minTotlaChildren="+minTotlaChildren);
		        
				//return  y(d.totalChildren);
				//return  y(p[0].totalChildren); 
				return  y(parseInt(minTotlaChildren)); 
				
				
				})		  
		  .attr("width", x.bandwidth())//
		  .attr("height", function(d) { 
		  
		          var p=counterCat.filter(function(objParent) {
				     return objParent.parentID == d.parentID;
			      });
		           
				  var minTotlaChildren=Math.min(parseInt(d.totalChildren), parseInt(p[0].totalChildren));
		          return chartHeight - y(minTotlaChildren);
				  //return chartHeight - y(d.totalChildren); 
			 			 
			 })
		  .attr("fill", function(d) {  		  		   		  
			      var p=groupsColor.filter(function(objParent) {
				     return objParent.GroupID == d.parentID;
			      });
			   
			      return p[0].color;
		      }		  
		  );		//"orange"  
		  
		  
          //printValues();
}	  


function counterVisSum(){
  
  var sum =10;
  
  if(counterVis.length>1){
     sum =counterVis.reduce(function(a, b){
        return a + b;
      }, 0);
  }
	
   
  return sum;
	
}


function printValues(){
  
  console.log("printValues"); 
  console.log(counterVis);

  console.log(numObj);  
  console.log(numCat)    
  console.log(visBudget) 

  console.log(counterCat);
  console.log(visLimitCat);

  console.log(counterVis);

  //console.log(localParentChildrenMap);
  //console.log(keysScale);
   
  console.log(catLists);
  console.log(isVisible);
  console.log(isInCat);

}


function setVisBudget(visBudgetLocal){
	
	if( visBudgetLocal>= numCat)// this condition is to display  images at least equal number of categories
	  visBudget=visBudgetLocal;
	
}

function computeVisLimitCatThreshold(){
  return  Math.ceil(visBudget/numCat);
}




	
