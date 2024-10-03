// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const light = new THREE.AmbientLight(0x404040); // Soft ambient light
scene.add(light);
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// List of states (50 U.S. states in alphabetical order)
const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

const bees = [];
const numBees = states.length; // Number of bees should match the number of states

// Create bees for each state
for (let i = 0; i < numBees; i++) {
  const geometry = new THREE.SphereGeometry(0.2, 32, 32); // Sphere to represent bee
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Yellow color like a bee
  const bee = new THREE.Mesh(geometry, material);

  // Randomly position bees in the scene
  bee.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10
  );

  // Store the state name as a property on the bee
  bee.state = states[i];

  // Add bee to scene and to the array
  scene.add(bee);
  bees.push(bee);
}

// Move the camera back to see all the spheres
camera.position.z = 10;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Animate the spheres to simulate flying bees
  bees.forEach(bee => {
    bee.position.x += (Math.random() - 0.5) * 0.01;
    bee.position.y += (Math.random() - 0.5) * 0.01;
    bee.position.z += (Math.random() - 0.5) * 0.01;
    bee.rotation.y += 0.01;
  });

  renderer.render(scene, camera);
}

animate();

// Fetch USDA APHIS Data
async function fetchAphisData(state) {
  try {
    const response = await fetch(`/api/state/${state}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    displayBeeData(data, state); // Function to display data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

function displayBeeData(data, state) {
  alert(`Data for ${state}: ${JSON.stringify(data)}`);
}

// Event listener for clicking on a bee
window.addEventListener('click', function(event) {
  bees.forEach(bee => {
    if (event.target === bee) {
      fetchAphisData(bee.state);
    }
  });
});