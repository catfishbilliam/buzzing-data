// Import Three.js as a module
import * as THREE from 'three';

// Set up the scene, camera, renderer, and bees just like before
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create bees and set up animations as before
const bees = [];
const numBees = 50;

for (let i = 0; i < numBees; i++) {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32); // Increased size for visibility
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const bee = new THREE.Mesh(geometry, material);

  bee.position.set(
    (Math.random() - 0.5) * 5,
    (Math.random() - 0.5) * 5,
    (Math.random() - 0.5) * 5
  );

  scene.add(bee);
  bees.push(bee);
}

camera.position.z = 10;

function animate() {
  requestAnimationFrame(animate);
  bees.forEach(bee => {
    bee.position.x += (Math.random() - 0.5) * 0.01;
    bee.position.y += (Math.random() - 0.5) * 0.01;
    bee.position.z += (Math.random() - 0.5) * 0.01;
    bee.rotation.y += 0.01;
  });
  renderer.render(scene, camera);
}

animate();