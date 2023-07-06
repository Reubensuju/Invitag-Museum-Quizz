  //to download user data, send myLassoSelectedArrayAll and myLassoSelectedArrayName as json data to views.py (result()) 
  $('#save').click(function() {
    $.ajax({
    type: "POST",
    url: "/mlMetric",
    contentType: 'application/json;charset=UTF-8',
    data: JSON.stringify({x: myLassoSelectedArrayAll, y: myLassoSelectedArrayName, xdata: xdata, ydata: ydata}),
    dataType: 'json'/*,
    success: function (data) {
                         handleData(data); // handle the returned data at client frontend side (it works fine when fast calculation on server. but it needs to test when long calclation occures on server). 
                    }*/
   });
   });
   
   

   
   $("#load_btn").click(function() { 
    
	
	$.ajax({
    type: "POST",
    url: "/mlMetricResult",
	
	  success: function (data) {
                        handleData(data);  // handle the returned data from server at client frontend side in createScatterplot.js          
                    }
   });
   
   
   });
   
   
