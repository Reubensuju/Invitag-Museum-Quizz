//encode csv as string variable as we can Not read csv data locally from  Path
//we only add \ at end of each row 

var localReadResults="device_id,addedClasses \
0,class0 \
1,class0 \
2,class0 \
3,class0 \
4,class0 \
5,class0 \
6,class0 \
7,class0 \
8,class0 \
9,class0 \
10,class0 \
11,class0 \
12,class0 \
13,class0 \
14,class0 \
15,class0 \
16,class0 \
17,class0 \
18,class0 \
19,class0 \
20,class0 \
21,class0 \
22,class0 \
23,class0 \
24,class0 \
25,class0 \
26,class0 \
27,class0 \
28,class0 \
29,class0 \
30,class0 \
31,class0 \
32,class0 \
33,class0 \
34,class0 \
35,class0 \
36,class0 \
37,class0 \
38,class0 \
39,class0 \
40,class0 \
41,class0 \
42,class0 \
43,class0 \
44,class0";

var dataCSVRead=[];
var rows = localReadResults.split(' ');
//console.log(rows);

var cols=rows[0].split(',');
//console.log("cols");
//console.log(cols);

for(var r=1;r<rows.length;++r){
	dataCSVRead[r-1]=[];
    dataCSVRead[r-1].length=0;
	
	var row=rows[r].split(','); 
	for(var c=0;c<cols.length;++c){
		//console.log(cols[c]);
		//console.log(row[c]);
		dataCSVRead[r-1][cols[c]]= row[c];	
	}
	
}

//console.log(dataCSVRead);

function getFeaturesData(){			 						
	var rows = localReadResults.split(' ');
	//csvContent += ["x","y","id","classID"].join(",")+ "\r\n";	
	var csvContent = rows[0]+ "\r\n"  ;
				
	for(var i=1; i<=rows.length-1;++i){	               
	  csvContent += rows[i] + "\r\n"  ;           			  
	}
	
	return csvContent;
						
}



