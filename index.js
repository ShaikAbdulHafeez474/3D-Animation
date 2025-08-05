import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 8;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Torus Knot Geometry
const geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);

// Add vertex colors (rainbow gradient)
const colors = [];
const color = new THREE.Color();
const count = geometry.attributes.position.count;
for (let i = 0; i < count; i++) {
  color.setHSL(i / count, 1.0, 0.5);
  colors.push(color.r, color.g, color.b);
}
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

// Material that supports vertex colors
const material = new THREE.MeshStandardMaterial({
  metalness: 0.8,
  roughness: 0.3,
  vertexColors: true // ✅ REQUIRED to show the rainbow gradient
});

// Mesh
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Animate
function animate() {
  requestAnimationFrame(animate);
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.02;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
