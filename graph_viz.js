// $(document).ready(function() {
//     $.ajax({
//         type: "GET",
//         url: "http://web.mit.edu/uayyaz/www/final_output.txt",
//         dataType: "text",
//         success: function(data) {processData(data);}
//      });
// });

function loadFile(time){
    $.ajax({
        type: "GET",
        url: "http://web.mit.edu/uayyaz/www/final_output.csv",
        dataType: "text",
        success: function(data) {processData(data,time);}
     });
}

function processData(allText,time) {
    var allTextLines = allText.split('\n');
    lines = allTextLines.length
    // var headers = allTextLines[0].split('\t');
    var lines = [];
    var twids = [];
    graph = {}
    count = 0
    for (var i=1; i<allTextLines.length/time; i++) {
        var data = allTextLines[i].split('\t');
        if(data[3]!= ""){
            count+=1
            var size;
            if(data[2]=="bombing"){
                size = 2
            }

            if(data[2]=="takeover"){
                size = 3
            }
            else{
                size = 0
            }
            var randomness = 0.0000//1;
            lines.push([parseFloat(data[4]) + (Math.random()-0.5)*randomness,parseFloat(data[5])+ (Math.random()-0.5)*randomness,parseInt(data[6]),size]);
            twids.push(data[0]);
        }
    }
    console.log(count)
    updateGraph(lines, twids);

}


function updateGraph(lines, twids){
    google.charts.load('upcoming', {'packages': ['geochart']});
    google.charts.setOnLoadCallback(drawMarkersMap);

      function drawMarkersMap() {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Lat');                                
        data.addColumn('number', 'Long');
        data.addColumn('number', 'Color');
        data.addColumn('number', 'Size'); 

            data.addRows(lines)

      var options = {
        region: 'SY',
        displayMode: 'markers',
        colorAxis: {colors: ['green', 'red', "yellow", "black", "orange"],minValue: 0,maxValue:4},
        backgroundColor: "#2b8cbe",
        sizeAxis: {minValue: 1, maxValue:4},
      };

      var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
      google.visualization.events.addListener(chart, 'select', function () {
          var item = chart.getSelection()[0];
          if (item) {
              var index = item.row;
              var tweet_box = document.getElementById('twitter_id');

               $.ajax({
                   type: "GET",
                   data: {
                       url: "https://twitter.com/malekbr/status/"+twids[index]
                   },
                   url: "https://publish.twitter.com/oembed",
                   dataType: "json",
                   success: function(data) {tweet_box.innerHTML = data.html;}
                });
          }
      });
      chart.draw(data, options);
    };
}



loadFile(1)



 // 02 Jun 2012

 //14 Nov 2016
