/**
 * entry.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */

import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });

//move around scene
const controls = new OrbitControls(camera, renderer.domElement);
// increases/decreases the z axis on mouse control
controls.target.set(0, 0, 10);
controls.update();

var gltfLoader = new GLTFLoader();
// Load a glTF resource
gltfLoader.load(
  // resource URL
  'src/objects/Sphere/gtLF/sphere.glb',
  // called when the resource is loaded
  function (gltf) {
    scene.add(gltf.scene);
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  // called when loading has errors
  function (error) {
    console.log('An error happened', error);
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

