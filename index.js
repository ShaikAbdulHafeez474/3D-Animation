import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Scene
const scene = new THREE.Scene();
// Soft gradient background (dark blue)
scene.background = new THREE.Color(0x0a0a1a);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Icosahedron Geometry
const geometry = new THREE.IcosahedronGeometry(1.5, 0);

// Material
const material = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  metalness: 0.7,
  roughness: 0.2,
  emissive: 0x004040,
  emissiveIntensity: 0.5,
  flatShading: true // keeps faceted look
});

// Mesh
const icosahedron = new THREE.Mesh(geometry, material);
scene.add(icosahedron);

// Lights
const light1 = new THREE.PointLight(0xffffff, 1);
light1.position.set(5, 5, 5);
scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, 0.5);
light2.position.set(-5, -5, -5);
scene.add(light2);

// Animate
function animate() {
  requestAnimationFrame(animate);
  icosahedron.rotation.x += 0.005;
  icosahedron.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Handle resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
