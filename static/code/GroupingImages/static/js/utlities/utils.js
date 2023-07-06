
  

// to use during drag
// SOLUTION FOUND FOR DURING DRAG DO NOT CHANGE
/*var simulation = d3.forceSimulation(nodes)
  .force('x', d3.forceX().x(function(d) {
    return xCenter[d.id];
  }).strength(10))
  .force('y', d3.forceY().y(function(d) {
    return yCenter[d.id];
  }).strength(10))
  .force('collision', d3.forceCollide().strength(2).iterations(100).radius(function(d) {
    return d.radius;
  }))
  .on('tick', ticked); */



// compute projected point C=foot(A,B,P) of poin P to a line segment [AB]
function foot(A, B, C) {
    
   
  const AB = {
    x: B.x - A.x,
    y: B.y - A.y
  };
  const k = ((C.x - A.x) * AB.x + (C.y - A.y) * AB.y) / (AB.x * AB.x + AB.y * AB.y);
  
  const P= {
    x: A.x + k * AB.x,
    y: A.y + k * AB.y
  };


  var dist_A_B =parseInt( getDistanceTwoPoints(A,B) );
  var dist_P_A =parseInt( getDistanceTwoPoints(P,A) );
  var dist_P_B =parseInt( getDistanceTwoPoints(P,B) );
  
  var sumDitance= parseInt(dist_P_A + dist_P_B);
  //projected point is not along AB segment
  if( sumDitance > dist_A_B ){
                                           
      if( dist_P_A < dist_P_B){
                
        return {
         x: A.x,
         y: A.y
        };
                
        }else{
                    
         return {
         x: B.x ,
         y: B.y 
        };
        }
     
   }
   
                              
   { //projected point is along AB segment
      return P;
   }
  
  
}




// function to make sure that circles are contained in their bounding polygone 
    //C represents circle center
    //G represent polygone center
    //P is projected point
    //A and B are end points of an edge for polygone 
              
function inPolygon(x,y,r){
              
              var C={"x":parseInt(x),"y":parseInt(y)};
                
              var polyCentroid= d3.polygonCentroid(polyCopy);
              var G={"x":polyCentroid[0],"y":polyCentroid[1]}; 
                                 
              var minDist_C_P =1000;
              var P={"x":0,"y":0};
              var A={"x":0,"y":0};
              var B={"x":0,"y":0};
                               
              // for any edge of polygon
              // to check if circle inside polygone 
              // test if distance between projected point on edge and circle center is less than circle radius  

                                                                        
              //find nearest project point of circle center
              for(var polyPointIndex=0; polyPointIndex < polyCopy.length; ++polyPointIndex){

                             //project c on edge e  - p 
                               var PTemp={"x":0,"y":0};
                               var ATemp={"x":0,"y":0};
                               var BTemp={"x":0,"y":0};
                               
                               //make an edge of two polygone points
                               if(polyPointIndex!=polyCopy.length-1){
                                           ATemp.x=  polyCopy[polyPointIndex][0];
                                           ATemp.y=  polyCopy[polyPointIndex][1];
                                           
                                            BTemp.x=  polyCopy[polyPointIndex+1][0];
                                           BTemp.y=  polyCopy[polyPointIndex+1][1];
                                           
                               }else{// last point connected to firt point
                                           ATemp.x=  polyCopy[polyPointIndex][0];
                                           ATemp.y=  polyCopy[polyPointIndex][1];
                                           
                                            BTemp.x=  polyCopy[0][0];
                                           BTemp.y=  polyCopy[0][1];
                               
                               };
                               
                               
                               
                               PTemp=foot(ATemp, BTemp, C);
                               
                               var dist_C_P = getDistanceTwoPoints(PTemp,C);
                               
                               if(minDist_C_P>dist_C_P){
                                           minDist_C_P=dist_C_P;
                                           
                                           P.x=PTemp.x;
                                           P.y=PTemp.y;
                                           
                                            A.x=ATemp.x;
                                           A.y=ATemp.y;
                                           
                                            B.x=BTemp.x;
                                           B.y=BTemp.y;
                                           
                               }   
              }

                                                                                                                                                  
                var dist_G_P =getDistanceTwoPoints(G,P);
                var dist_G_C = getDistanceTwoPoints(G,C);
                var dist_C_P = getDistanceTwoPoints(PTemp,C);
                 
                // choose  new circleCenter for circle that is nearest to polygone center 
                if(dist_G_P <  dist_G_C 
                              || (dist_G_C <dist_G_P ) && ( dist_C_P < r) ){
                             
								var angle = Math.atan2(A.y - B.y, A.x - B.x);
							   
								var C_1={"x":0,"y":0}; // C_1  and C_2  are possible new centers 
								var C_2={"x":0,"y":0};
							   
								 C_1.x =  Math.sin(angle)   * r + P.x;
								 C_1.y = -1*Math.cos(angle) * r + P.y;
							   
								 C_2.x=  -1* Math.sin(angle) *  r + P.x;
								 C_2.y=   Math.cos(angle)    *  r + P.y;     
								
								var dist_G_C_1 =getDistanceTwoPoints(G,C_1);
							   var dist_G_C_2 = getDistanceTwoPoints(G,C_2);
					  
								// choose the new center that exist inside in polygone
							   if(dist_G_C_1 < dist_G_C_2){
									C.x= C_1.x;
									C.y= C_1.y;
							   
								}else{
									C.x= C_2.x;
									C.y= C_2.y;                                 
								}
							   
							   
							   console.log("circleCenterXY");
							   console.log(C);
							   
							   svg.select(".testProject")
							   .attr("cx", P.x)
							   .attr("cy", P.y); 
                             }             
                                                                          
   return C;                                                         
}



function getRadiusInnerCirclePolygon(C,parentPolygonLocal){
	        var minDistanceInPolygon=Number.MAX_VALUE;
           //find nearest project point of circle center
			for(var polyPointIndex=0; polyPointIndex < parentPolygonLocal.length; ++polyPointIndex){
				
				   //project c on edge e  - p 
				   var PTemp={"x":0,"y":0};
				   var ATemp={"x":0,"y":0};
				   var BTemp={"x":0,"y":0};
				
				   //make an edge of two polygone points
				   if(polyPointIndex!=parentPolygonLocal.length-1){
							   ATemp.x=  parentPolygonLocal[polyPointIndex][0];
							   ATemp.y=  parentPolygonLocal[polyPointIndex][1];
							   
							   BTemp.x=  parentPolygonLocal[polyPointIndex+1][0];
							   BTemp.y=  parentPolygonLocal[polyPointIndex+1][1];
							   
				   }else{// last point connected to firt point
							   ATemp.x=  parentPolygonLocal[polyPointIndex][0];
							   ATemp.y=  parentPolygonLocal[polyPointIndex][1];
							   
							   BTemp.x=  parentPolygonLocal[0][0];
							   BTemp.y=  parentPolygonLocal[0][1];
				   
				   };
				   
				   
				   
				   PTemp=foot(ATemp, BTemp, C);
				   
				   var dist_C_P = getDistanceTwoPoints(PTemp,C);
				   
				   if(minDistanceInPolygon>dist_C_P){
							   minDistanceInPolygon=dist_C_P;       
					}
					
			}

	
	        return  minDistanceInPolygon;
}


//function to make sure that circles in bounding rect 
function inRect(x,y,r){
        var C={"x":parseInt(x),"y":parseInt(y)};
        // to put nodes back in the central area in case they escape
        if(C.x>(xmax-r))  C.x=xmax-r; //xCenter[d.id];
        if(C.x<(xmin+r))  C.x=xmin+r; //xCenter[d.id];
                                    
        if(C.y>(ymax-r))  C.y=ymax-r; //yCenter[d.id];
        if(C.y<(ymin+r))  C.y=ymin+r; //yCenter[d.id];

        return C;
}

                                                          
                                                          
                                                          
function getDistanceTwoPoints(A,B){
  return Math.sqrt( (A.x - B.x) * (A.x - B.x) + (A.y - B.y) * (A.y - B.y) );
}
                                                          

function getDistanceTwoPoints1(x1,x2,y1,y2){
  return Math.sqrt( (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) );
}




/*function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}


function getRandomIntbetween(min, max) {
  min = Math.abs(Math.ceil(min));
  max = Math.abs(Math.floor(max));
  return Math.floor(Math.abs(Math.random()) * (max - min)) + min;  
}*/

function getRandomInt(max) {
  return Math.floor(myrng.quick() * Math.floor(max)) + 1;
}

function getRandomIntbetween(minLocal, maxLocal) {
  minLocal = Math.abs(Math.ceil(minLocal));
  maxLocal = Math.abs(Math.floor(maxLocal));
  return Math.floor(Math.abs(myrng.quick()) * (maxLocal - minLocal)) + minLocal;  
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


function computePolygoneDiameter(polygon){
	var maxDistance=Number.MIN_VALUE;
	var pointd1=-1;
	var pointd2=-1;
	for(var i=0;i<polygon.length-1;++i){
	  var p1=polygon[i];
	  if(i!=polygon.length-2){
		  for(var m=i+2;m<polygon.length;++m){
			// if(i!=m && Math.abs(m-i)>1){
			   if(i!=0 && m!=(polygon.length-1)  ){
				 var p2=polygon[m];
				 var distance=computeDistance(p1 , p2);
				 if(distance>maxDistance){
					 pointd1=i ;
					 pointd2=m ;
				 }
			   }
		  }
	  }else{
		  
		 var p2=polygon[0];
		 var distance=computeDistance(p1 , p2);
		 if(distance>maxDistance){
			 pointd1=i ;
			 pointd2=0 ;
		 }
		  
	  }
	  
	
	}
	
	
	
	var coordinates=[];
	coordinates.push(polygon[pointd1]);
    coordinates.push(polygon[pointd2]);
	
	coordinates.sort(function(a, b){
				return a[0]-b[0]
			});
			
	return coordinates;
		
	
}

