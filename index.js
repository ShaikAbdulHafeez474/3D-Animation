import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { FontLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/FontLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { TextGeometry } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/geometries/TextGeometry.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// ✅ Use FULL URL for font loading from GitHub Pages
const fontLoader = new FontLoader();
fontLoader.load(
  'https://shaikabdulhafeez474.github.io/3D-Animation/fonts/helvetiker_regular.typeface.json',
  (font) => {
    const textGeometry = new TextGeometry('Hafeez Shaik', {
      font: font,
      size: 2,
      height: 0.5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.05,
      bevelSegments: 5
    });

    textGeometry.center();

    const material = new THREE.MeshStandardMaterial({ color: 0x00ffff, metalness: 0.9, roughness: 0.3 });
    const textMesh = new THREE.Mesh(textGeometry, material);
    scene.add(textMesh);

    // Animate rotation
    const animate = () => {
      requestAnimationFrame(animate);
      textMesh.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  },
  undefined,
  (err) => {
    console.error('Error loading font:', err);
  }
);

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
