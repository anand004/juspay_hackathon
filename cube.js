var a = 1/2 * Math.cos((Math.PI/180) * 30);
var b = 1/2 * Math.sin((Math.PI/180) * 30);
function convertVertices(){
	vertices_2d = [];
	for(var i=0;i<8;i++){
		var vertex = vertices[i];
		//console.log(vertex);
		var x = vertex[0]+a*vertex[2];
		//console.log(x);
		var y = vertex[1]+b*vertex[2];
		//console.log(y);
		vertices_2d.push([x,y]);

	}
}

function drawCube(){
	convertVertices();
	context.beginPath();
	context.moveTo(vertices_2d[0][0],vertices_2d[0][1]);
	for(var i=0;i<13;i++){
		context.lineTo(vertices_2d[edges[i][1]][0],vertices_2d[edges[i][1]][1]);
	}
	context.moveTo(vertices_2d[2][0],vertices_2d[2][1]);
	context.lineTo(vertices_2d[3][0],vertices_2d[3][1]);
	context.stroke();

}
function rotate_cube_x(theta){
	var sin = Math.sin(theta);
	var cos = Math.cos(theta);
	for(var i=0;i<8;i++){
		var vertex = vertices[i];
		var y = vertex[1]*cos-vertex[2]*sin;
		var z = vertex[2]*cos+vertex[1]*sin;
		vertices[i][1] = y;
		vertices[i][2] = z;
	}

}
function rotate_cube_y(theta){
	var sin = Math.sin(theta);
	var cos = Math.cos(theta);
	for(var i=0;i<8;i++){
		var vertex = vertices[i];
		var x = vertex[0]*cos-vertex[2]*sin;
		var z = vertex[2]*cos+vertex[0]*sin;
		vertices[i][0] = x;
		vertices[i][2] = z;
	}

}

var c = document.getElementById("myCanvas");
var context = c.getContext("2d");
var height = c.height;
var width = c.width;
context.fillStyle = "#FF0000";
//context.translate(300,300);
var vertices = [[-100,-100,-100],[-100,-100,100],[-100,100,-100],[-100,100,100],[100,100,100],[100,100,-100],[100,-100,100],[100,-100,-100]];
var edges = [[0,1],[1,6],[6,7],[7,0],[0,2],[2,5],[5,4],[4,3],[3,1],[1,6],[6,4],[4,5],[5,7]];
var vertices_2d = [];
//drawCube();
var x_rotation = 0;
var y_rotation = 0;
var friction_factor =  1.5;
function repeat(){
	requestAnimationFrame(repeat);
	//drawCube();
	context.clearRect(0,0,1000,1000);
	context.translate(300,300);
	rotate_cube_x(x_rotation*0.0001);
	rotate_cube_y(-y_rotation*0.0001);
	drawCube();
	context.translate(-300,-300);
	//console.log(vertices);
	
}
repeat();
window.addEventListener("mousemove", (event) => {

        x_rotation = friction_factor*event.pageX;
        y_rotation = friction_factor*event.pageY;

      });
window.addEventListener("click", (event) => {
	    x_rotation/=friction_factor;
        y_rotation/=friction_factor;
  
    

      });
//console.log(a);
//console.log(b);