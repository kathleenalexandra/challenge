import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, BoxBufferGeometry, MeshBasicMaterial, Mesh } from 'three/build/three.module';

const dat = require('dat.gui'); // via https://github.com/dataarts/dat.gui 

// scene setup
const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
const renderer = new WebGLRenderer();
const light = new AmbientLight(0x444444);

scene.add(light);

// initial setup for cubes 
var currentSize = 0.5;
var currentColor = 0x7a7a7a; 
var geometry = new BoxBufferGeometry( currentSize, currentSize, currentSize );
var material = new MeshBasicMaterial( { color: currentColor } );

 var userChoice = {
        greetingMessage: 'Hello Blippar!!',
        selectedSize: 0.5,
        selectedColor: "#ff0000",
    };

    var gui = new dat.gui.GUI();
    gui.remember(userChoice);
    gui.add(userChoice, 'greetingMessage');
    var userSize = gui.add(userChoice, 'selectedSize').min(-10).max(10).step(0.25).listen();
    var userColor = gui.addColor( userChoice, 'selectedColor' ).name('Color').listen();


//change cubes in scene to user preference for size
  userSize.onChange(function(value) {   
    scene.traverse( function( node ) {
      if ( node instanceof Mesh ){
          node.scale.set(value,value,value); 
        }
        currentSize = value; //set current color varialbe to spawn new cube as user selected size
    }); 
  });

//change cubes in scene to user preference for color
userColor.onChange(function(value) {   
  scene.traverse( function( node ) {
      if ( node instanceof Mesh ) {
          node.material.color.setHex( value.replace("#", "0x") );
        }
        currentColor = value.replace("#", "0x"); //set current color varialbe to spawn new cube as user selected color 
    });
  });


// spawn cube every second at random x and y position, and random orientation 
setInterval(function() {
  var mesh = new Mesh( geometry, material );
  mesh.position.y = Math.random()* 10 - 5; 
  mesh.position.x = Math.random()* 10 - 5; 
  // mesh.position.z = Math.random()* 10 - 5;  //commented out to demonstrate all cubes appear at same initial size
  mesh.rotation.set(Math.random()* 10 - 5, Math.random()* 10 - 5, Math.random()* 10 - 5,); 
  scene.add(mesh)
}, 1000);


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
