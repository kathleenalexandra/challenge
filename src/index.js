import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, BoxBufferGeometry, MeshBasicMaterial, Mesh } from 'three/build/three.module';

// scene setup
const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
const renderer = new WebGLRenderer();
const light = new AmbientLight(0x444444);

scene.add(light);

function initButtons() { 
    var btnRed = document.getElementById("red");
    btnRed.addEventListener( 'click',function(){cubeColor(red)});
    var btnYellow = document.getElementById("yellow");
    btnYellow.addEventListener( 'click',function(){cubeColor(yellow)});
    var btnGreen = document.getElementById("green");
    btnGreen.addEventListener( 'click',function(){cubeColor(green)});
    var btnBlue = document.getElementById("blue");
    btnBlue.addEventListener( 'click',function(){cubeColor(blue)});
    var btnBlue = document.getElementById("purple");
    btnBlue.addEventListener( 'click',function(){cubeColor(purple)});
    var btnRandom = document.getElementById("random");
    btnRandom.addEventListener( 'click',function(){cubeColor(randomColor)});
}
initButtons(); 

var currentColor = 0x7a7a7a;
var red = 0xFF0000;
var yellow = 0xa8a843; 
var green = 0x00ff00; 
var blue = 0x0000bb; 
var purple = 0xf000ff; 

// create option for random color selection
var colorArray = [red, yellow, green, blue, purple]; 
var randomColor; 

var size = 0.5;
var currentSize; 

var slider = document.getElementById("myRange");
var output = document.getElementById("sizeValue");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  var selectedSize = this.value; 
  cubeSize(selectedSize);
}

const geometry = new BoxBufferGeometry( size, size, size );
const material = new MeshBasicMaterial( { color: currentColor } );


setInterval(function() {
  const mesh = new Mesh( geometry, material );
  mesh.position.y = Math.random()* 10 - 5; //spawn new cube at random x, y and z
  mesh.position.x = Math.random()* 10 - 5; 
  // mesh.position.z = Math.random()* 10 - 5;  //commented out to demonstrate all cubes appear at same initial size
  mesh.rotation.y = Math.random()* 10 - 5;
  mesh.rotation.x = Math.random()* 10 - 5; 
  mesh.rotation.z = Math.random()* 10 - 5;
  scene.add(mesh)
}, 1000);


// The following functions, grab all instances of Mesh in leiu of looping through all mesh material objects,
// and cube objects, looping through an array and assining new values to each, every time there is user input 


function cubeSize(passedSize) {
scene.traverse( function( node ) {
    if ( node instanceof Mesh ){
        node.scale.set(passedSize,passedSize,passedSize);
        currentSize = passedSize; //set current color varialbe to spawn new cube as user selected size
    	}
	});
} 

function cubeColor(passedColor) {
scene.traverse( function( node ) {
    if ( node instanceof Mesh ) {
        node.material.color.setHex( passedColor );
        randomColor = colorArray[Math.floor(Math.random()*colorArray.length)];
        currentColor = passedColor; //set current color varialbe to spawn new cube as user selected color 
    	}
	});
} 


camera.position.z = 5; 
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
 

// render loop
const update = () =>{
  requestAnimationFrame(update);
  renderer.render(scene, camera);
}

// function calls
update();
