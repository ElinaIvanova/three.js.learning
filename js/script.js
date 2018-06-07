/* Global THREE */

var container = document.getElementById('container');
var width = window.innerWidth;
var height = window.innerHeight;
var scene;
var camera;
var renderer;
var controls;

var knot;
var sphere;
var cube;
var metalTextureSrc = 'metal.jpg';

var iterator = 0;

function initSet() {
  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x777777);
}

function drawCube() {
  var cubeGeometry = new THREE.CubeGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshNormalMaterial();
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.x = 8;
  cube.position.y = 0;
  cube.position.z = 0;
  scene.add(cube);
}

function drawSphere() {
  var envMap = new THREE.TextureLoader().load(metalTextureSrc);
  envMap.mapping = THREE.SphericalReflectionMapping;
  var sphereGeometry = new THREE.SphereGeometry(4, 10, 50);
  var sphereMaterial = new THREE.MeshBasicMaterial({
    envMap: envMap,
    wireframe: true,
  });
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = 0;
  sphere.position.y = 0;
  sphere.position.z = 0;
  scene.add(sphere);
}

function drawKnot() {
  var knotGeometry = new THREE.TorusKnotGeometry(2.5, 1, 73, 13, 17, 1);
  var knotMaterial = new THREE.MeshNormalMaterial();
  knot = new THREE.Mesh(knotGeometry, knotMaterial);
  knot.position.x = -10;
  knot.position.y = 0;
  knot.position.z = 0;
  scene.add(knot);
}

function initGeometry() {
  drawCube();
  drawSphere();
  drawKnot();
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  scene.add(camera);
  camera.position.z = 45;
}

function initLight() {
  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 10, 10);
  scene.add(light);
}

function normalize(token) {
  return token.toFixed(2);
}

function rotate() {
  var rotationInt = normalize(iterator);
  knot.rotation.y = rotationInt;
  knot.rotation.x = rotationInt;
  cube.rotation.y = rotationInt;
  cube.rotation.x = rotationInt;
  sphere.rotation.y = rotationInt;
  sphere.rotation.x = rotationInt;
  iterator = iterator > 6.28 ? 0 : iterator + 0.02;
}

function initOrbitControls() {
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.object.position.set(10, 10, 45);
  controls.target.set(0, 0, 0);
}

function animate() {
  requestAnimationFrame(animate);
  render();
  rotate();
}

function render() {
  renderer.render(scene, camera);
  controls.update();
}

function onResize(event) {
  var width = window.innerWidth;
  var height = window.innerHeight;
  camera.aspect = width/height;
  renderer.setSize = (width/height);
}

function init() {
  initSet();
  initGeometry();
  initCamera();
  initLight();
  initOrbitControls();
  animate();
  window.addEventListener('resize', onResize);
}

init();
