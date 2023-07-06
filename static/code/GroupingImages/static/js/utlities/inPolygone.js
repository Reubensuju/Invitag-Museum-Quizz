
/*
var width = 600, height = 600;

 

var colorScale = ['orange', 'lightblue', '#B19CD9'];

var xCenter = [100, 200, 300,

               100, 200, 300,

               100, 200, 300];

var yCenter = [100, 100, 100,

               200, 200, 200,

               300, 300, 300];

 

// authorized  box to re-center escaped nodes

var xmin = 5;

var xmax = 450;

var ymin = 5;

var ymax = 450;

// radius of border nodes

 

 

 

//////////////////////////////////////////////////////////

// SPECIFIC TO CIRCLE BOUNDARY FOR POLYGON PARENT

//////////////////////////////////////////////////////////

var Rbound=1000000; // Radius of boundary circles

//////////////////////////////////////////////////////////

 

 

var scaleAlpha =1; // the proportion of sum of circles area over total parent cell area

 

// type: 1 parent, 2 mouse, 3 border

var nodes = [

  {radius: scaleAlpha*40, id:0, type: 1},

  {radius:  scaleAlpha*20, id:1, type: 1},

  {radius:  scaleAlpha*30, id:2, type: 1},

  {radius:  scaleAlpha*40, id:3, type: 1},

  {radius:  scaleAlpha*30, id:4, type: 1},

  {radius:  scaleAlpha*10, id:5, type: 1},

  {radius:  scaleAlpha*20, id:6, type: 1},

  {radius: scaleAlpha* 40, id:7, type: 1},

  {radius: scaleAlpha* 90, id:8, type: 1}

  ];

 

 

 

//////////////////////////////////////////////////////////

// polygonal boundary

//////////////////////////////////////////////////////////

var polyParent =[

  [ 10 , 10 ],

  [ 400 ,15 ],

  [ 450 , 300 ],

  [ 180 , 400 ],

  [ 20 , 250 ]

  ];

 */

// centroid of Parent polygon

//var cgParent= null;

 

// list of polygons, one for each circle

// inPolygon 
var Rbound=1000000;
var cgParent= null;
var polyCircles=[];

function computePolyCircles(polyParent,nodes){

    cgParent=d3.polygonCentroid(polyParent);
	polyCircles.length=0;
    
	console.log("start computePolyCircles");
	console.log(JSON.stringify(nodes));
	console.log(JSON.stringify(polyParent));
	console.log(JSON.stringify(cgParent));
	
    for (let k = 0; k < nodes.length; k++){
	  let polyCircle=offsetPoly(polyParent,cgParent,Rbound,nodes[k].radius);
	  
	  console.log(JSON.stringify(polyCircle));
	  
	  polyCircles.push(polyCircle);

	}
	
	console.log("end computePolyCircles");
	console.log(JSON.stringify(polyCircles));

}
 

 

 /*

var svg=d3.select("#viz_area")

 

// Drawing polygon offset

//var poly8=poly2obj(polyCircles[0])

 

  

  svg.selectAll("polygon")

//    .data([poly2obj(polyParent),poly8])

    .data([poly2obj(polyParent)])

  .enter().append("polygon")

    .attr("points",function(d) {

        return d.map(function(d) {

            return [d.x,d.y].join(",");

        }).join(" ");

    })

    .attr("stroke","red")

    .attr("fill","none");

 

   

// Drawing rect 

svg.append('rect')

           .attrs({ x: xmin, y: ymin, width: 445, height: 445,stroke:"black",  fill: 'none' });

                               

// Drawing three circles for test purpuse                

svg.append("circle")

   .attr("class","testOrange")

  .attr("id", "A")

  .attr("r", 4)

  .attr("cx", 5)

  .attr("cy", 5)

  .attr("fill","orange");

 

svg.append("circle")

   .attr("class","testYellow")

  .attr("id", "B")

  .attr("r", 4)

  .attr("cx", 5)

  .attr("cy", 5)

  .attr("fill","yellow");

  

svg.append("circle")

   .attr("class","testProject")

   .attr("id", "p")

  .attr("r", 4)

  .attr("cx", 5)

  .attr("cy", 5)

  .attr("fill","red");

 

svg.append("circle")

   .attr("class","myP")

   .attr("id", "p")

  .attr("r", 4)

  .attr("cx", 5)

  .attr("cy", 5)

  .attr("fill","black");

 

svg.append("circle")

   .attr("class","myM")

   .attr("id", "p")

  .attr("r", 4)

  .attr("cx", 5)

  .attr("cy", 5)

  .attr("fill","blue");

 

////////////////////////////////////////////////////////////

// TICK

////////////////////////////////////////////////////////////

// tick function  

function ticked() {

 

    var newpos=[];

             

    var u=d3.select('svg g')

    .selectAll('circle')

    .data(nodes);

 

    u.enter().append('circle')

     .attr('r', function(d) {

      return d.radius;

     })

     .style('fill', function(d) {

      return colorScale[d.type];

     })

     .merge(u)

     .attrs(  function(d) {

        var newpos= inPolygon(d.x,d.y,d.radius,d.id);

        //var newpos= inRect(d.x,d.y,d.radius);

        console.log("tick "+newpos[0]+" "+newpos[1])

        return {cx: newpos[0], cy: newpos[1]};                                             

        }

    )

    .call(d3.drag() // call specific function when circle is dragged

         .on("start", dragstarted)

         .on("drag", dragged)

         .on("end", dragended))

 

  u.exit().remove();

}

 

/////////////////////////////////////////////////////////////////////

// SIMULATION

////////////////////////////////////////////////////////////////////

// to use during drag start and drag end

 

var simulation = d3.forceSimulation(nodes)

  .force("charge", d3.forceManyBody().strength(1000))

  .force("center", d3.forceCenter().x(225).y(225))

  .force('collision', d3.forceCollide().strength(1).iterations(1000).radius(function(d) {

    return d.radius;

  }))

  .on('tick', ticked);

 
*/
/////////////////////////////////////////////////////////////

// UTILS

////////////////////////////////////////////////////////////

 

// for drawing polygon, transform array [[x0,y0],[x1,y1]...] into list of objects [{x: ,y:},]

function poly2obj(poly){

  var listOfObjects=[];

  poly.forEach(function(entry) {

    var singleObj = {};

    singleObj['x'] = entry[0];

    singleObj['y'] = entry[1];

    listOfObjects.push(singleObj);

    });

  return listOfObjects;

}

 

// Cloning a polygon disrupting reference

function clonePoly(poly)

{

  var polyClone=JSON.parse(JSON.stringify(poly));

  return polyClone;

}

 

// compute distance between two points

function distvec(x1,y1,x2,y2){

  let dx=x1-x2;

  let dy=y1-y2;

  return Math.sqrt( dx*dx + dy*dy );

}

 

// compute projection of point C onto the segment [AB]

function footvec(xa,ya,xb,yb,xc,yc) {

  var xab=xb-xa;

  var yab=yb-ya;

  var q = ((xc-xa) * xab + (yc-ya) * yab) / (xab * xab + yab * yab);

 

  //projected point is not along AB segment

  if(q < 0){ return [xa,ya];} // A is the nearest point to C

  if(q > 1){ return [xb,yb];} // B is the nearest point to C

 

  // P is the nearest point to C

  var xp=xa+q*xab;

  var yp=ya+q*yab;

  return [xp,yp];

}

 

///////////////////////////////////////////////////////////////////

// SPECIFIC TO POLYGON BOUNDARY

///////////////////////////////////////////////////////////////////

// Compute all boundary circles

function getBoundaryCircles(polyParent,cgParent,Rbound)

{

  // polyParent: polygon of parent cell

  // cgParent: center of gravity of parent polygon

  // Rbound: Radius of boundary circle

  var nP=polyParent.length;

  var Pc=clonePoly(polyParent);

  Pc.push(polyParent[0]);

 

  var xcg=cgParent[0];

  var ycg=cgParent[1];

 

  var R2=Rbound*Rbound;

 

  var Cbound = [];

  var x1,y1,x2,y2,dx,dy,xm,ym,smcg,n2,Q,xc,yc;

  x1=y1=x2=y2=dx=dy=xm=ym=smcg=n2=Q=xc=yc=0;

  for (let i = 0; i < nP; i++)

  {

    x1=Pc[i][0];

    y1=Pc[i][1];

    x2=Pc[i+1][0];

    y2=Pc[i+1][1];

    // dx=x2-x1 and dy=y2-y1, then the normals are (-dy, dx)

    dx=x2-x1;

    dy=y2-y1;

   

    // mid point of line segment [P1,P2]

    xm=0.5*(x1+x2);

    ym=0.5*(y1+y2);

   

    // inner product between normal to [P1,P2] at M and MCg vector

    smcg=-dy*(xcg-xm)+dx*(ycg-ym);

   

    // intermedate quantity Q to locate the center of the boundary circle

    // on the normal vector N to [P1,P2]

    n2=dx*dx+dy*dy;

    Q=Math.sqrt((R2/n2)-0.25);

   

    // if smcg>0 N=-N # N must point outward of the polygon

    if (smcg>0){

      xc=xm+Q*dy;

      yc=ym-Q*dx;

    }else{

      xc=xm-Q*dy;

      yc=ym+Q*dx;

    }

    // add the center to the array of centers

    Cbound.push([xc,yc]);

  }

  return Cbound;

} 

 

// get intersection of all circles

function getAllCross(Cbound,cgParent,Roffset)

{

  // Cbound: list of boundary circle centers

  // cgParent: center of gravity of parent polygon

  // Roffset: Radius of boundary circle

  //          + offset (radius of small circle to be fit within parent polygon)

  var nC=Cbound.length;

  var xcg=cgParent[0];

  var ycg=cgParent[1];

 

  var Xcross=[];

  var R2=Roffset*Roffset;

  var RR2=4*R2;

  var x1,y1,x2,y2,dx,dy,n2,xm,ym,smcg,Q,xs,ys;

  x1=y1=x2=y2=dx=dy=n2=xm=ym=smcg=Q=xs=ys=0;

 

  for (let i = 0; i < (nC-1); i++)

  {

    x1=Cbound[i][0];

    y1=Cbound[i][1];

   

    for (let j = i+1; j < nC; j++)

    {

      x2=Cbound[j][0];

      y2=Cbound[j][1];

      dx=x2-x1;

      dy=y2-y1;

      n2=dx*dx+dy*dy;

      if (n2 < RR2) // check if C1 and C2 circles intersect

        {

        // mid point M of line segment [C1,C2]

        xm=0.5*(x1+x2);

        ym=0.5*(y1+y2);

       

        // inner product between normal to [C1,C2] at M and Mcg vector

        smcg=-dy*(xcg-xm)+dx*(ycg-ym);

       

        // intermedate quantity to locate the center of the boundary circle on the normal to [P1,P2]

        Q=Math.sqrt((R2/n2)-0.25);

        

        // if smcg>0 N=-N # N must point inward of the parent polygon

        if (smcg<0){

          xs=xm+Q*dy;

          ys=ym-Q*dx;

        }else{

          xs=xm-Q*dy;

          ys=ym+Q*dx;

        }

        // add the crossing point to the list

        Xcross.push([xs,ys,i,j]);

      }

    }

  }

  return Xcross;

}

 

// check which crossing points X to keep for the offset polygon

function checkCrossIn(Xcross,Cbound,Roffset)

{

  // Xcross: list of crossing points of boundary circles

  // Cbound: list of boundary circle centers

  // Roffset: Radius of boundary circle

  //          + offset (radius of small circle to be fit within parent polygon)

 

  var nX=Xcross.length;

  var nC=Cbound.length;

  var polyIn=[];

  var xs,ys,c1,c2,xc,yc,Stop,i,Roff;

 

  for (let k = 0; k < nX; k++)

  {

    xs=Xcross[k][0];

    ys=Xcross[k][1];

    c1=Xcross[k][2];

    c2=Xcross[k][3];

    // check if point is covered by any other boundary circle

    Stop=0;

    i=-1;

    while (Stop==0) {

      i=i+1;

      xc=Cbound[i][0];

      yc=Cbound[i][1];

     

      if (i==nC-1){

        Stop=1;

      }

      if ((i!=c1)&(i!=c2)){

        Roff=distvec(xs,ys,xc,yc);

        if (Roff<Roffset){

          Stop=-1; // crossing is covered by another boundary circle

        }

      }

    }

    if (Stop!=-1){

      polyIn.push([Xcross[k][0],Xcross[k][1]]);

    }

  } 

  // make sure the crossing points are ordered to form a convex polygon

  var polyInConv=d3.polygonHull(polyIn);

  return polyInConv;

}

 

// Boundary polygon for a given circle radius

function offsetPoly(polyParent,cgParent,Rbound,Rcircle){

  var Roffset=Rbound+Rcircle;

  var Cbound=getBoundaryCircles(polyParent,cgParent,Rbound);

  

  // get all potential polygon vertices

  var Xcross=getAllCross(Cbound,cgParent,Roffset);

   // get offset polygon vertices

  var polyInConv=checkCrossIn(Xcross,Cbound,Roffset);

  return polyInConv;

}

 

 

/////////////////////////////////////////////////////////

// in-polygon boundary test

////////////////////////////////////////////////////////

function inPolygon(x,y,r,indCircle){

        // console.log(x+" "+y+" "+r+" "+indCircle+" "+polyCircles.length);
		//console.log(r);
		//console.log(indCircle);
	    //console.log(polyCircles);
        var pc=polyCircles[indCircle];
       // console.log(pc.length);
        var polyBound=clonePoly(pc);

 

        // check if circle within its boundary polygon

        var inPolyBound=d3.polygonContains(polyBound, [x,y]);     

        

        if (inPolyBound==false){

         // circle is dragged out of its boundary polygon

         // project point onto each polygon edge

         // find the nearest projected point

         // return this point as new position

         var nP=polyBound.length;

         polyBound.push(pc[0]);

 

         var xa,ya,xb,yb,xp,yp,xptmp,yptmp,dmin,dproj;

         dmin=10000000;

         for (let j = 0; j < nP; j++)

           {

           xa=polyBound[j][0];

           ya=polyBound[j][1];

           xb=polyBound[j+1][0];

           yb=polyBound[j+1][1];

           proj=footvec(xa,ya,xb,yb,x,y);

           //console.log("proj="+proj)

           xptmp=proj[0];

           yptmp=proj[1];

           dproj=distvec(xptmp,yptmp,x,y);

           if (dproj<dmin) {

             dmin=dproj;

             xp=xptmp;

             yp=yptmp;

             }

           }

        }else{

        xp=x;

        yp=y;

        }

       

svg.select(".myM").attr("cx", xp).attr("cy", yp);

svg.select(".myP").attr("cx", x).attr("cy", y);

  

        return [xp,yp];

}

        

function setSvg(parentLayerCopy){
  svg=parentLayerCopy;
}	

 

 

        

              

 

//function to make sure that circles in bounding rect
/*
function inRect(x,y,r){

              var C={"x":parseInt(x),"y":parseInt(y)};

        // to put nodes back in the central area in case they escape

        if(C.x>(xmax-r))  C.x=xmax-r; //xCenter[d.id];

        if(C.x<(xmin+r))  C.x=xmin+r; //xCenter[d.id];

       

        if(C.y>(ymax-r))  C.y=ymax-r; //yCenter[d.id];

        if(C.y<(ymin+r))  C.y=ymin+r; //yCenter[d.id];

        

svg.select(".myP").attr("cx", C.x).attr("cy", C.y);

 

        return [C.x,C.y];

}

 

/////////////////////////////////////////////////////////////////

// DRAG EVENT

/////////////////////////////////////////////////////////////////

// What happens when a circle is dragged?

function dragstarted(d) {

  if (!d3.event.active) simulation.alphaTarget(.01).restart();

  d.fx = d.x;

  d.fy = d.y;

}

 

function dragged(d) {

  d.fx = d3.event.x;

  d.fy = d3.event.y;

       

  svg.select(".myM").attr("cx", d.x).attr("cy", d.y);

}

 

function dragended(d) {

  if (!d3.event.active) simulation.alphaTarget(.01);

  d.fx = null;

  d.fy = null;

}

 */

