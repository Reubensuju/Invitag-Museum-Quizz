//define global variables for layout, parent polygon,  
//-----------------------------------------

var myrng = new Math.seedrandom('repeatedRandom.');
var isDebugMode=true;


var width = 600, height = 600;


// authorized  box to re-center escaped nodes
var xmin = 0;
var xmax = 600;
var ymin = 0;
var ymax = 600;

var xminPolygone = 0;
var xmaxPolygone = 600;
var yminPolygone = 0;
var ymaxPolygone = 600;

// parentPoly =... // INPUT: polygon representing the parent cell
// polygonal boundary
/*var poly =[
  {"x": width ,"y": ymin },
  {"x": xmin ,"y": ymin },
  {"x": xmin ,"y": height },
  {"x": width ,"y": height } 
  ];

var polyCopy =[
  [ width ,ymin ],
  [ xmin , ymin ],
  [ xmin , height ],
  [ width , height ]
  ];
*/
  
 /*var poly =[ 
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
  
var polyCopyDiameterPoints= computePolygoneDiameter(polyCopy);  
*/

var polySquare =[
  {"x": width ,"y": ymin },
  {"x": xmin ,"y": ymin },
  {"x": xmin ,"y": height },
  {"x": width ,"y": height } 
  ];

var polyCopySquare =[
  [ width ,ymin ],
  [ xmin , ymin ],
  [ xmin , height ],
  [ width , height ]
  ];
  
var polyCopyDiameterPoints= [];//  [ [5,height/2] , [595,  height/2] ];
  
//var sTime1 = new Date().getTime();
var polygonalParentCells=generatePolygonsAsExperimentOne10Children();
console.log(polygonalParentCells);
var allPolygoneDiameter=computeAllPolygoneDiameter(polygonalParentCells);
//allPolygoneDiameter[0]=[ [5,height/2] , [595,  height/2] ];
console.log(allPolygoneDiameter);
//var sTime2 = new Date().getTime();
//console.log("sTime2-sTime1");
//console.log(sTime2-sTime1);
  
var circlesFillObacity=1;
var circlesEdgeObacity=1;
var polygonsFillObacity=0;
var polygonsEdgeObacity=0.5;

//  --------------------------------------------------------
//define global variables for trials
var trialsNumber=10;
var inilaizingNumber=10;



//----------------------------------------------------------
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
var WiCopy =[]; 


//assign random color for each child
var  NiColor=[];

var scaleAlphaMin = 0.1;
var sacaleAlphaMax =2.0; // arbitrary meta-parameters
var AlphaMove= scaleAlphaMin; 

var Alpha_Opt= scaleAlphaMin;
var scaleAlphaInit =1.0; // the proportion of sum of circles area over total parent cell area 
// (we ignore the fact that some circles may overlap, so even if alpha=1, we may still have white empty space in between the circles)
var beta=[0.1, 0.5, 0.8, 1];
//var beta=[0.1, 0.5];

var dataAlphaEpsilon = [];	
 
var dataAlphaEpsilonWeightedLayout = [];	

var initialMode=0;
var moveMode=1;
var staticMode=3;

var Cix = []; //Ci    circle centres x y 
var Ciy = [];

var  Cix_Opt=[];  // copy of centres x y  when optimal position
var  Ciy_Opt=[];


//  radius for each circle based on number of children
var Ri = [];
var RiCopy = [];

//  nodes randomly  // type: 1 parent, 2 mouse, 3 border
var nodes = [];
var nodesCopy=[];
var nodesOrginal=[];


//epsilon_Opt is min error .  initially it is large number 	  
var  epsilon_Opt=Number.MAX_VALUE;

//---------------------------------------------------------
//id of bottom left corner cell  
var parentIndexStartDragChild =0; 
var pointAtbottomLeft=[10,height/2]; //   height-50
var dataMoveEpsilon = [];
var dataMoveWeightedEpsilon = [];
var dataDelaunayTable=[];
var dataAreaTable=[];
var dataGrandParenTable=[];
//var maxMoveSteps=11;

//var	durationMuseMove = 1000;        // duration of the movement
var frameCount = 20; // move from X to Y over 20 frames
//var stepMuseMove=100;  // it will make duration 2000
var stepMuseMoveValues=[25,50,100]; // it will make duration 0.5  1.5  2  seconds
var betaStepMoveIndexes=[[0,0],[0,1],[0,2],
                         [1,0],[1,1],[1,2],
						 [2,0],[2,1],[2,2],
						 [3,0],[3,1],[3,2],
                         ];
var trialInitialIndexes=[];
var AllnodesOrginal=[];						 
var	finalPos = { x: 500, y:  250}; //  50
//---------------------------------------------------------
// INPUT area of the parent polygonal enclosing cell
// var parentArea = areaPolygon(parentPoly) 
//var parentArea= d3.polygonArea(polyCopy);
var parentArea=0;// d3.polygonArea(polyCopySquare);

function setParentArea(parentAreaLocal){
	parentArea=parentAreaLocal;
}

//define drawing svg area
var svg=d3.select("#viz_area");
drawGrandParentCell(polySquare);
// Drawing polygon
/*  svg.selectAll("polygon")
    .data([poly])
  .enter().append("polygon")
    .attr("points",function(d) { 
        return d.map(function(d) {
            return [d.x,d.y].join(",");
        }).join(" ");
    })
    .attr("stroke","black")
    .attr("fill","none");*/
	
 
              
              



//function for creating number of weighted children in the parent cell  with random leaves (up to 10 leaves for each child cell)  
function createNi(childrenNumber){
  N=0;
  Ni=[];
  Ni.length=0;
  
  for(var cn=0; cn<childrenNumber ; ++cn){
    Ni[cn]= getRandomInt(maxLeavesNumber);
	N= N + Ni[cn];
  } 
  
}


//function for creating Wi
function createWi(){
    Wi=[];
    Wi.length=0;

    for(var wn=0; wn < Ni.length ; ++wn){
	  Wi[wn]= Ni[wn]/N;
	  //WiCopy[wn]= Ni[wn]/N;
	}
}




//function for assign random color for each child
function assignColors(){
  NiColor=[];
  NiColor.length=0;
  
  for(var c=0; c<Ni.length; c++){
    NiColor[c]=  "hsl(" + Math.random() * 360 + ",100%,50%)";
  }
}


// function to compute radiuse of a circle 
function computeRadius(Wii, scaleAlphaTcopy){
  return Math.sqrt( scaleAlphaTcopy * parentArea  * Wii / Math.PI);
}



//function for creating radius for each circle based on number of children
function createRadius(){
  Ri=[];
  Ri.length=0;
  
  for(var Rindex=0; Rindex<Ni.length; ++Rindex){
    Ri[Rindex]= computeRadius(Wi[Rindex]  , scaleAlphaInit);// scaleAlpha* Ni[Rindex] * 10;
    //RiCopy[Rindex]=Ri[Rindex];
  }		  
}

		 		
			
//function for create nodes randomly 
function createNodes(){ 
  nodes=[];
  nodes.length=0;
  
  for(var Nindex=0; Nindex<Ni.length; ++Nindex){
     //var xValue= getRandomIntbetween(xmin,xmax);//Math.floor((Math.random() * xmax) + xmin); //xmax*Math.random()+xmin;
     //var yValue= getRandomIntbetween(ymin,ymax);//Math.floor((Math.random() * ymax) + ymin); //ymax*Math.random()+ymin;
     var xValue= getRandomIntbetween(xminPolygone,xmaxPolygone); 
     var yValue= getRandomIntbetween(yminPolygone,ymaxPolygone); 
	 
	 var radiusValue= Ri[Nindex];
	 
	 /*//debug
	 console.log("x,y");
	 console.log(xValue);
	 console.log(yValue);*/
     
	 nodes.push({x: xValue,y: yValue,radius: radiusValue,id: Nindex,type: 1 });  
     nodesOrginal.push({x: xValue,y: yValue,radius: radiusValue,id: Nindex,type: 1 }); 	 
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








//////////////////////////////////




function copyCopyNodes(){
   for(var Nindex=0; Nindex<Ni.length; ++Nindex){    	   
	 nodesCopy[Nindex].x=  nodes[Nindex].x   ;
	 nodesCopy[Nindex].y=  nodes[Nindex].y   ;
	 nodesCopy[Nindex].radius=  nodes[Nindex].radius   ;
	 nodesCopy[Nindex].id= nodes[Nindex].id   ;
	 nodesCopy[Nindex].type= nodes[Nindex].type   ;
	 
	 nodesCopy[Nindex].weight= Wi[Nindex] ;//nodes[Nindex]. weight  ;
     nodesCopy[Nindex].previousX= NaN  ;
     nodesCopy[Nindex].previousY= NaN   ;
	 nodesCopy[Nindex].previousWeight= NaN;
		 
	 //nodes.= nodesCopy.   ;
	 // nodes.push({x: xValue,y: yValue,radius: radiusValue,id: Nindex,type: 1 });   
  }	

}

function createCopyNodes(){
     nodesCopy=[];
     nodesCopy.length=0;
	 
	 for(var Nindex=0; Nindex<Ni.length; ++Nindex){ 
	     nodesCopy.push({x: nodes[Nindex].x,y: nodes[Nindex].y  , weight:Wi[Nindex], previousX:NaN , previousY:NaN, previousWeight: NaN ,radius: nodes[Nindex].radius,id: nodes[Nindex].id,type: nodes[Nindex].type }); 
		 
     }
	 
	 ///weight: weightParent, previousX: NaN , previousY: NaN

}



var nodesAtT0=[];

function copyNodesAt0(){
	nodesAtT0=[];
    nodesAtT0.length=0;
  
   for(var Nindex=0; Nindex<Ni.length; ++Nindex){  
	  nodesAtT0.push({x:  nodes[Nindex].x ,y: nodes[Nindex].y  ,radius: nodes[Nindex].radius ,id: nodes[Nindex].id,type: nodes[Nindex].type  });   
   }	

}


var nodesCopyAtT0=[];

function copyNodesCopyAt0(cells){
	nodesCopyAtT0=[];
    nodesCopyAtT0.length=0;
	
	var cellsLength= cells.length;
	for(var index=0; index<cellsLength ; ++index){ 
		var sitePoly=cells[index].site;	 
		var cell_Id=sitePoly.originalObject.data.originalData.id; 
		nodesCopy[cell_Id].x=parseInt(sitePoly.x);
		nodesCopy[cell_Id].y=parseInt(sitePoly.y);			
	}

   for(var Nindex=0; Nindex<Ni.length; ++Nindex){  
	  nodesCopyAtT0.push({x:  nodesCopy[Nindex].x ,y: nodesCopy[Nindex].y  ,radius: nodesCopy[Nindex].radius ,id: nodesCopy[Nindex].id,type: nodesCopy[Nindex].type  });   
   }	

}


function initaliz(){
	   console.log("initaliz="+myrng());  
   // create childrenNumber of weighted children
   createNi(childrenNumber); 
   createWi();
   assignColors();
   createRadius();
   createNodes();   

   WiCopy=[];
   WiCopy.length=0;  
   RiCopy=[];
   RiCopy.length=0;   
   nodesCopy=[];
   nodesCopy.length=0;
  
   WiCopy=Array.from(Wi);
   RiCopy=Array.from(Ri);
   //nodesCopy=Array.from(nodes);
   
   createCopyNodes();
}


function generatePolygonsAsExperimentOne10Children(){
	var allPolygonsLocalArray=[];
	allPolygonsLocalArray.length=0;
	
	var polyCopy0 =[ 
	[ 600 ,	0],
	[ 0	  ,0],
	[ 0	  ,600],
	[ 600 ,600]
	];
	
	var polyCopy1 =[ 
	[ 600 ,	0],
	[ 0	  ,0],
	[ 0	  ,600],
	[ 600 ,600]
	];


	 var polyCopy2 =[ 
	[238.0425675	,543.8255653],
	[512.5181769	,458.0855245],
	[512.5181769	,93.06430148],
	[138.3751894	,90.64905537],
	[46.60004101	,399.1401934]
	];


	 var polyCopy3 =[ 
	[522.0092623	,99.83470872],
	[129.968592	    ,108.3227725],
	[9.636760262	,330.5829759],
	[45.23908679	,427.4805649],
	[522.0092623	,534.5409476]
	];




	var polyCopy4 =[ 
	[91.51071346	,311.6534254],
	[238.5870126	,577.8996978],
	[524.7854498	,202.6259939],
	[359.3673827	,63.42499094]
	];


	var polyCopy5 =[ 
	[544.5533801	,187.2240954],
	[193.563486	    ,52.36519266],
	[107.830571	    ,110.7366495],
	[73.72877	    ,177.5880793],
	[113.3153516	,455.3857171],
	[293.5494674	,555.046208],
	[432.8522236	,497.2953422],
	[551.4494883	,323.2480054]
	];



	var polyCopy6 =[ 
	[347.2904314	,506.6350754],
	[518.5110229	,247.4309888],
	[351.8055045	,71.18221808],
	[31.95878973	,361.9455301]
	];



	var polyCopy7 =[ 
	[135.7074075	,559.3026054],
	[507.7242868	,499.7864367],
	[569.60428	    ,181.3948438],
	[319.0646313	,13.1827526],
	[11.31882909	,216.1257038]
	];




	var polyCopy8 =[ 
	[356.7895066	,555.755963],
	[483.1009036	,120.2846463],
	[132.8069878	,120.2846463],
	[208.3319768	,512.1363359]
	];


	var polyCopy9 =[ 
	[16.53830736	,369.0188177],
	[229.4137997	,584.0672944],
	[379.4081089	,598.9029026],
	[588.4870478	,364.7658727],
	[536.2214856	,113.3195969],
	[294.6255452	,1.376631648],
	[9.128191155	,182.3158416]
	];


	var polyCopy10 =[ 
	[110.122243	    ,66.38733143],
	[110.122243	    ,537.0997337],
	[416.0340987	,529.3188429],
	[568.8287744	,325.4822342],
	[374.3822639	,44.69113994]
	];


	var polyCopy11 =[ 
	[506.109543	    ,94.30023093],
	[118.1256329	,94.30023093],
	[52.52024389	,329.6302179],
	[188.687268	    ,526.2626369],
	[319.3842935	,552.6912877],
	[528.0682622	,412.2083389]
	];

	allPolygonsLocalArray.push(polyCopy0);	
	allPolygonsLocalArray.push(polyCopy1);	
	allPolygonsLocalArray.push(polyCopy2);	 
	allPolygonsLocalArray.push(polyCopy3);
    allPolygonsLocalArray.push(polyCopy4);	
    allPolygonsLocalArray.push(polyCopy5);		 
    allPolygonsLocalArray.push(polyCopy6);	
	allPolygonsLocalArray.push(polyCopy7);	 
	allPolygonsLocalArray.push(polyCopy8);
    allPolygonsLocalArray.push(polyCopy9);	
    allPolygonsLocalArray.push(polyCopy10);	
	allPolygonsLocalArray.push(polyCopy11);
	
	return allPolygonsLocalArray;
	
}


function generatePolygonsAsExperimentOne30Children(){
	var allPolygonsLocalArray=[];
	allPolygonsLocalArray.length=0;
	
	var polyCopy1 =[ 
	[ 600 ,	0],
	[ 0	  ,0],
	[ 0	  ,600],
	[ 600 ,600]
	];


	 var polyCopy2 =[ 
	[ 194.575162	,517.6021567],
	[389.2755504	,544.499427],
	[543.8188888	,421.0585667],
	[421.8747885	,39.68682067],
	[83.3470642	    ,140.8159337],
	[40.77109757	,249.6080287]

	];


	 var polyCopy3 =[ 
	 [352.866506	,53.88926261],
	[224.1377843	,54.8004018],
	[94.26943267	,158.5322172],
	[91.31272628	,417.1193266],
	[281.3705144	,570.4831281],
	[314.1153811	,572.9663206],
	[499.6606315	,439.3834293],
	[522.0419136	,196.627532]

	];




	var polyCopy4 =[ 
	 [118.1673449	,469.6513554],
	[574.8827516	,344.6734112],
	[369.2729302	,93.32135406],
	[50.61178237	,319.9779681]

	];


	var polyCopy5 =[ 
	[426.0809261	,71.49817016],
	[92.9847337	    ,121.9380163],
	[60.82920313	,441.2603599],
	[277.1161112	,547.5420663],
	[598.3323853	,351.6445883]

	];



	var polyCopy6 =[ 
	 [30.30623004	,360.3055634],
	[215.1162455	,561.1580754],
	[427.9559051	,550.7406923],
	[579.1332293	,270.6223426],
	[476.9159911	,82.30369317],
	[119.6447301	,57.90298948]

	];



	var polyCopy7 =[ 
	 [252.2074874	,37.67062551],
	[53.99461986	,106.329636],
	[142.3246727	,497.8071914],
	[387.3208708	,542.3283944],
	[561.0261539	,395.7327433],
	[572.367872	    ,279.7364732]

	];




	var polyCopy8 =[ 
	 [295.9287216	,46.65019264],
	[41.94134155	,290.55426],
	[166.6463721	,520.3030123],
	[508.2333479	,461.6833075],
	[487.8695587	,131.2693367]

	];


	var polyCopy9 =[ 
	[ 396.0972778	,21.95860217],
	[211.7537203	,15.75605965],
	[42.58277462	,168.1525558],
	[33.979205	    ,428.6944456],
	[101.3925208	,511.4884184],
	[352.0047905	,581.9724707],
	[533.0589788	,524.0710713],
	[561.6337732	,173.7731305]

	];


	var polyCopy10 =[ 
	 [520.145086	,477.9920237],
	[525.3295366	,471.3441029],
	[458.7677569	,71.14010123],
	[151.1864625	,71.14010123],
	[54.48750252	,317.1286917],
	[235.6680067	,562.9744717]

	];


	var polyCopy11 =[ 
	[177.1877946	,93.18141799],
	[46.87313753	,259.5707848],
	[203.8586126	,556.6293284],
	[532.2946286	,384.0484576],
	[538.8511823	,158.903618]

	];



	allPolygonsLocalArray.push(polyCopy1);	
	allPolygonsLocalArray.push(polyCopy2);	 
	allPolygonsLocalArray.push(polyCopy3);
    allPolygonsLocalArray.push(polyCopy4);	
    allPolygonsLocalArray.push(polyCopy5);		 
    allPolygonsLocalArray.push(polyCopy6);	
	allPolygonsLocalArray.push(polyCopy7);	 
	allPolygonsLocalArray.push(polyCopy8);
    allPolygonsLocalArray.push(polyCopy9);	
    allPolygonsLocalArray.push(polyCopy10);	
	allPolygonsLocalArray.push(polyCopy11);
	
	return allPolygonsLocalArray;
	
}

function computeAllPolygoneDiameter(allPolygons){
	var polyCopyAllDiameterPoints=[];
	/*for(var i=0; i < allPolygons.length;++i){
       var polyCopyDiameterPoints= computePolygoneDiameter(allPolygons[i]);
	   polyCopyAllDiameterPoints.push(polyCopyDiameterPoints);	   
	}*/
	
	    polyCopyAllDiameterPoints[0]=[ [5,height/2] , [595,  height/2] ];	
		
	    polyCopyAllDiameterPoints[1]=[ [5,height] , [595,  5] ];	
		polyCopyAllDiameterPoints[2]=[ [46 ,399 ] , [512 	,  93 ] ];
		polyCopyAllDiameterPoints[3]=[ [9 ,330 ] , [522 , 99 ] ];
		polyCopyAllDiameterPoints[4]=[ [91 ,311 ] , [524 ,  202 ] ];
		polyCopyAllDiameterPoints[5]=[ [73 ,177 ] , [551 ,  323 ] ];
		polyCopyAllDiameterPoints[6]=[ [31 ,361 ] , [518 ,  247 ] ];
		polyCopyAllDiameterPoints[7]=[ [11 ,216 ] , [569 ,  181 ] ];
		polyCopyAllDiameterPoints[8]=[ [132 ,120 ] , [356 ,  555 ] ];
		polyCopyAllDiameterPoints[9]=[ [9 ,182  ] , [588 ,  364 ] ];
		polyCopyAllDiameterPoints[10]=[ [110 ,537 ] , [374 ,  44 ] ];
	    polyCopyAllDiameterPoints[11]=[ [52 ,329 ] , [506 ,  94 ] ];	
		  	
	
	return polyCopyAllDiameterPoints;
}


 function drawGrandParentCell(polyLocal){

	   svg.selectAll('.grandParentCell')
	   .remove();	
	   
	// Drawing polygon
	  svg.selectAll("polygon")
		.data([polyLocal])
	  .enter().append("polygon")
		.attr("points",function(d) { 
			return d.map(function(d) {
				return [d.x,d.y].join(",");
			}).join(" ");
		})
		.attr("class", "grandParentCell")
		.attr("stroke","black")
		.attr("fill","none");
	
}