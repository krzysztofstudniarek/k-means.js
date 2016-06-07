$(document).ready(function(){	
	var canvas;
	var context;
	
	var elems;
	var clusters;
	
	init(5000, 100);
	setInterval(loop, 250);
	
	function loop(){
			update();
			drawScene();
	}

	
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
		context.clearRect(0, 0, canvas.width, canvas.height);
		for(var i = 0; i<elems.length; i++){
			drawPoint(elems[i], false);
		}
		
		for(var i = 0; i<clusters.length; i++){
			drawPoint(clusters[i], true);
		}
	}
	
	function calculateDistance(point, cluster){
		var d =  Math.sqrt((point.x-cluster.x)*(point.x-cluster.x)+(point.y-cluster.y)*(point.y-cluster.y));
		return d;
	}
	
	function drawPoint(point, isCluster){
		if(!isCluster){
			context.beginPath();
			context.arc(point.x,point.y,3,0,2*Math.PI);
			context.lineWidth = 0;
			context.fillStyle = point.color;
			context.fill();
		}else{
			context.beginPath();
			context.arc(point.x,point.y,4,0,2*Math.PI);
			context.lineWidth = 0;
			context.fillStyle = "red";
			context.fill();
			context.closePath();
			context.beginPath();
			context.arc(point.x,point.y,3,0,2*Math.PI);
			context.lineWidth = 0;
			context.fillStyle = point.color;
			context.fill();
			context.closePath();

		}//context.stroke();
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



