$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "data/final_output.csv",
        dataType: "text",
        success: function(data) {processData(data,1);}
     });
});

function loadFile(time){
    $.ajax({
        type: "GET",
        url: "data/final_output.csv",
        dataType: "text",
        success: function(data) {processData(data,time);}
     });
}

function processData(allText,time) {
    var allTextLines = allText.split('\n');
    var lines = [];
    var twids = [];
    graph = {}
    for (var i=1; i<time*300; i++) {
        var data = allTextLines[i].split('\t');
        if(data[3]!= "" && data[2]!= "irrelevant"){
            var size;
            if(data[2] == "bombing"){
                size = 1 
            }
            else if(data[2]=="takeover"){
                size = 2
            }
            else if(data[2]=="clash"){
                size = 0
            }
            var randomness = 0.0000//1;
            lines.push([parseFloat(data[4]) + (Math.random()-0.5)*randomness,parseFloat(data[5])+ (Math.random()-0.5)*randomness,parseInt(data[6]),size]);
            twids.push(data[0]);
        }
    }

    //Adding a tweet on initialization
    var tweet_box = document.getElementById('twitter_id');
    console.log(twids.length)
   // $.ajax({
   //     type: "GET",
   //     data: {
   //         url: "https://twitter.com/malekbr/status/"+565619773976104960
   //     },
   //     url: "https://publish.twitter.com/oembed",
   //     dataType: "jsonp",
   //     success: function(data) {tweet_box.innerHTML = data.html;}
   //  });

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
                   dataType: "jsonp",
                   success: function(data) {tweet_box.innerHTML = data.html;
                   console.log(data.html)}

                });
          }
      });
      chart.draw(data, options);
    };
}



// loadFile(1)



 // 02 Jun 2012

 //14 Nov 2016
