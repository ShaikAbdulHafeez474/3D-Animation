import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { FontLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/FontLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Add a light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Load the font
const loader = new FontLoader();
loader.load('fonts/helvetiker_regular.typeface.json', function(font) {
  const geometry = new THREE.TextGeometry('Hafeez Shaik', {
    font: font,
    size: 1,
    height: 0.3,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelSegments: 5
  });

  geometry.center();

  const material = new THREE.MeshStandardMaterial({
    color: 0xff00ff,
    metalness: 0.8,
    roughness: 0.2
  });

  const textMesh = new THREE.Mesh(geometry, material);
  scene.add(textMesh);

  function animate() {
    requestAnimationFrame(animate);
    textMesh.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
});

// Handle resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
