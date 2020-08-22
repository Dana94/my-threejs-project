/**
 * entry.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */

import { WebGLRenderer, PerspectiveCamera, Scene, Vector3, LoadingManager, DDSLoader, MeshBasicMaterial, Mesh, TextureLoader, RepeatWrapping, sRGBEncoding } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


import Sphere from './objects/Sphere/sphere.obj'
import BrickMaterial from './objects/Sphere/brick.jpg'

import SphereMaterials from './objects/Sphere/sphere.mtl'

// import SeedScene from './objects/Scene.js';

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });
// const seedScene = new SeedScene();

// scene
// scene.add(seedScene);

//move around scene
const controls = new OrbitControls(camera, renderer.domElement);
// increases/decreases the z axis on mouse control
controls.target.set(0, 0, 10);
controls.update();

// brick texture works
var texture = new TextureLoader().load(BrickMaterial);
texture.wrapS = RepeatWrapping;
texture.wrapT = RepeatWrapping;
texture.repeat.set(4, 4);

var brick_material = new MeshBasicMaterial({ map: texture });
// pink material works works, so mtl isn't working...
var pink_material = new MeshBasicMaterial({ color: 0xFF0085 });
// var loader = new OBJLoader();
// loader.load( Sphere,
//     function( obj ){
//         obj.traverse( function( child ) {
//             if ( child instanceof Mesh ) {
//                 // child.material = pink_material;
//                 child.material = brick_material;

//             }
//         } );
//         scene.add( obj );
//     },
//     function( xhr ){
//         console.log( (xhr.loaded / xhr.total * 100) + "% loaded")
//     },
//     function( err ){
//         console.error( "Error loading 'sphere'")
//     }
// );
//---

// var mtlLoader = new MTLLoader();

// mtlLoader.load('src/objects/Sphere/sphere.mtl', (materials) => {
//     materials.preload();

//     console.log(materials);

//     var objLoader = new OBJLoader();
//     objLoader.setMaterials(materials);
//     objLoader.load('src/objects/Sphere/sphere.obj',
//       function (obj) {
//         scene.add(obj);
//       },
//       function (xhr) {
//         console.log((xhr.loaded / xhr.total * 100) + "% loaded")
//       },
//       function (err) {
//         console.error("Error loading 'sphere'")
//       }
//     );
//   }
// );

var gltfLoader = new GLTFLoader();
// Load a glTF resource
gltfLoader.load(
	// resource URL
	'src/objects/Sphere/gtLF/sphere.glb',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		// gltf.animations; // Array<THREE.AnimationClip>
		// gltf.scene; // THREE.Group
		// gltf.scenes; // Array<THREE.Group>
		// gltf.cameras; // Array<THREE.Camera>
		// gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);


// camera
camera.position.set(6, 3, -10);
// camera.position.set(0,0,0);

camera.lookAt(new Vector3(0, 0, 0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x7ec0ee, 1); // bg blue color

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  renderer.render(scene, camera);
  // seedScene.update && seedScene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
}
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHandler = () => {
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler);

// dom
document.body.style.margin = 0;
document.body.appendChild(renderer.domElement);

