import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Scene
const scene = new THREE.Scene();
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

// Generate random colors per face
const colors = [];
const color = new THREE.Color();
const position = geometry.attributes.position;
const faces = position.count / 3;

for (let i = 0; i < faces; i++) {
  // Pick a bright random hue
  color.setHSL(Math.random(), 1.0, 0.5);
  for (let j = 0; j < 3; j++) {
    colors.push(color.r, color.g, color.b);
  }
}
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

// Material supporting vertex colors
const material = new THREE.MeshStandardMaterial({
  vertexColors: true,
  flatShading: true,
  roughness: 0.4,
  metalness: 0.1,
  emissive: 0x222222,
  emissiveIntensity: 0.3
});

// Mesh
const icosahedron = new THREE.Mesh(geometry, material);
scene.add(icosahedron);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(-5, -5, -5);
scene.add(pointLight);

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
