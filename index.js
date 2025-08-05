import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000010);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 8;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Torus Knot
const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 150, 32);
const material = new THREE.MeshPhongMaterial({
  color: 0xff00ff,
  emissive: 0x220033,
  shininess: 100,
  specular: 0xffffff
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Lights
const light1 = new THREE.PointLight(0xff00ff, 1);
light1.position.set(5, 5, 5);
scene.add(light1);

const light2 = new THREE.PointLight(0x00ffff, 1);
light2.position.set(-5, -5, -5);
scene.add(light2);

// 🌌 Starfield
const starGeometry = new THREE.BufferGeometry();
const starCount = 1000;
const starVertices = [];

for (let i = 0; i < starCount; i++) {
  const x = (Math.random() - 0.5) * 100;
  const y = (Math.random() - 0.5) * 100;
  const z = (Math.random() - 0.5) * 100;
  starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Animation
let hue = 0;
function animate() {
  requestAnimationFrame(animate);

  // 🌈 Dynamic color hue shifting
  hue += 0.002;
  if (hue > 1) hue = 0;
  const color = new THREE.Color().setHSL(hue, 1.0, 0.5);
  torusKnot.material.color = color;
  torusKnot.material.emissive = color.clone().multiplyScalar(0.4);

  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.015;
  renderer.render(scene, camera);
}
animate();

// Responsive canvas
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
