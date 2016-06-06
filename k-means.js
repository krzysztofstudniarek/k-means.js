$(document).ready(function(){	
	var canvas;
	var context;
	
	var elems;
	var clusters;
	
	init(100, 5);
	update();
	drawScene();
	
	function init(numOfElements, numOfClusters){
		
		canvas = document.getElementById("cluster");
		context = canvas.getContext("2d");	
		
		elems = new Array(numOfElements);
		clusters = new Array(numOfClusters);
		
		for(var i =0; i<numOfClusters; i++){
			clusters[i] = {
				x : Math.random()*580 + 10,
				y : Math.random()*380 + 10,
				color : getRandomColor()
			}
		}
		
		for(var i = 0; i<numOfElements; i++){
			
			elems[i] = {
				x : Math.random()*580 + 10,
				y : Math.random()*380 + 10,
				color : "#000"
			}
			
			var minDist = 10000;
			for(var j = 0; j<clusters.length; j++){
				var dist = calculateDistance(elems[i], clusters[j]);
				if(dist < minDist){
					elems[i].color = clusters[j].color;
					minDist = dist;
				}
			}
		}
	}
	
	function update(){
		for(var i = 0; i<clusters.length; i++){
			var meanX = clusters[i].x;
			var meanY = clusters[i].y;
			for(var j = 0; j<elems.length; j++){
				if(elems[j].color == clusters[i].color){
					meanX = (meanX + elems[j].x)/2;
					meanY = (meanY + elems[j].y)/2;
				}
			}
			clusters[i].x = meanX;
			clusters[i].y = meanY;
		}
		
		for(var i = 0; i<elems.length; i++){
			var minDist = 10000;
			for(var j = 0; j<clusters.length; j++){
				var dist = calculateDistance(elems[i], clusters[j]);
				if(dist < minDist){
					elems[i].color = clusters[j].color;
					minDist = dist;
				}
			}
		}

	}
	
	function drawScene(){
		for(var i = 0; i<elems.length; i++){
			drawPoint(elems[i]);
		}
		
		for(var i = 0; i<clusters.length; i++){
			drawPoint(clusters[i]);
		}
	}
	
	function calculateDistance(point, cluster){
		var d =  Math.sqrt((point.x-cluster.x)*(point.x-cluster.x)+(point.y-cluster.y)*(point.y-cluster.y));
		return d;
	}
	
	function drawPoint(point){
		context.beginPath();
		context.arc(point.x,point.y,5,0,2*Math.PI);
		context.lineWidth = 0;
		context.fillStyle = point.color;
		context.fill();
		//context.stroke();
	}
	
	function getRandomColor() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	
});



