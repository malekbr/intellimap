	$(function () {
	    Highcharts.chart('container_pi', {
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	            type: 'pie'
	        },
	        title: {
	            text: 'Factions'
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                size:100,
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	            }
	        },
	        series: [{
	            name: 'Faction',
	            colorByPoint: true,
	            data: [{
	                name: 'Regime',
	                y: 91,
	                sliced: true,
	                color:"green"
	            }, {
	                name: 'Rebels',
	                y: 183,
	                color:"red"
	            }, {
	                name: 'Kurds',
	                y: 5,
	                sliced: true,
	                color:"yellow"
	            }, {
	                name: 'ISIS',
	                y: 34,
	                color:"black"
	            }, {
	                name: 'Ambiguous',
	                y: 133,
	                sliced: true,
	                color:"orange"
	            }]
	        }]
	    });
	});

	$(function () {
	    Highcharts.chart('container_pi2', {
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	            type: 'pie'
	        },
	        title: {
	            text: 'Event'
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                size:100,
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	            }
	        },
	        series: [{
	            name: 'Event',
	            colorByPoint: true,
	            data: [{
	                name: 'Takeover',
	                y: 37,
	                sliced: true,
	            }, {
	                name: 'Bombing',
	                y: 63
	            }]
	        }]
	    });
	});