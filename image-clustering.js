var pixels, clusters, canvas, context;

var openFile = function(event) {
	var input = event.target;
	var reader = new FileReader();
	reader.onload = function(event){
		var img = new Image();
		
		canvas = document.getElementById("cluster");
		context = canvas.getContext("2d");
		
		
		
		img.onload = function(){
			canvas.width = img.width;
			canvas.height = img.height;
			context.drawImage(img,0,0);
			
			var imgData = context.getImageData(0,0,canvas.width, canvas.height);
			
			clusters = new Array(32);
			pixels = new Array(imgData.data.length/4);
			
			for (var i=0;i<imgData.data.length;i+=4)
			{
				pixels[i/4] = {
					red : imgData.data[i],
					green : imgData.data[i+1],
					blue : imgData.data[i+2],
					cluster : undefined
				}
			}
			
			for(var i =0;i<clusters.length; i++){
				clusters[i] = {
					red : Math.random()*255,
					green : Math.random()*255,
					blue : Math.random()*255
				}
			}
			
			for (var i =0; i<pixels.length; i++){
				var minDist = calculateDistance(pixels[i], clusters[0]);
				pixels[i].cluster = clusters[0];
				for(var j = 0; j<clusters.length; j++){
					if(calculateDistance(pixels[i], clusters[j])<minDist){
						minDist = calculateDistance(pixels[i], clusters[j]);
						pixels[i].cluster = clusters[j];
					}
				}
			}
			
			setInterval(loop, 250);
		}
		
		img.src = event.target.result;
	}

	reader.readAsDataURL(input.files[0]);
};

var loop = function(){
	update();
	drawScene();
}

function update(){
	for(var i = 0; i<clusters.length; i++){
		var meanRed = clusters[i].red;
		var meanGreen = clusters[i].green;
		var meanBlue = clusters[i].blue;
		for(var j = 0; j<pixels.length; j++){
			if(pixels[j].cluster == clusters[i]){
				meanRed = (meanRed + pixels[j].red)/2;
				meanGreen = (meanGreen + pixels[j].green)/2;
				meanBlue = (meanBlue + pixels[j].blue)/2;
			}
		}
		clusters[i].red = meanRed;
		clusters[i].green = meanGreen;
		clusters[i].blue = meanBlue;
	}
	
	for(var i = 0; i<pixels.length; i++){
		var minDist = calculateDistance(pixels[i], clusters[0]);
		for(var j = 0; j<clusters.length; j++){
			var dist = calculateDistance(pixels[i], clusters[j]);
			if(dist <= minDist){
				pixels[i].cluster = clusters[j];
				minDist = dist;
			}
		}
	}
}

function drawScene(){
	//
	var imgData = context.getImageData(0,0,canvas.width, canvas.height);
	context.clearRect(0, 0, canvas.width, canvas.height);
	for(var i = 0; i<pixels.length; i++){
		imgData.data[i*4] = pixels[i].cluster.red;
		imgData.data[i*4 + 1] = pixels[i].cluster.green;
		imgData.data[i*4 + 2] = pixels[i].cluster.blue;
	}
	context.putImageData(imgData,0,0);
}

function calculateDistance(pixel, cluster){
	var d =  Math.sqrt((pixel.red-cluster.red)*(pixel.red-cluster.red)+(pixel.green-cluster.green)*(pixel.green-cluster.green)+(pixel.blue-cluster.blue)*(pixel.blue-cluster.blue));
	return d;
}