import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);
const camera = new THREE.PerspectiveCamera(     
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000 
);
camera.position.set(0, 2, 4);

// Wood sphere
const woodGeometry = new THREE.SphereGeometry(1, 48, 48);
const woodMaterial = new THREE.MeshLambertMaterial({
    color: 0x8B4513,
    roughness: 0.8
});
const woodSphere = new THREE.Mesh(woodGeometry, woodMaterial);
woodSphere.position.set(-3, 1, 0);
woodSphere.castShadow = true;
scene.add(woodSphere);

// Metal sphere
const metalGeometry = new THREE.SphereGeometry(1, 48, 48);
const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    metalness: 1.0,
    roughness: 0.1
});
const metalSphere = new THREE.Mesh(metalGeometry, metalMaterial);
metalSphere.position.set(-1, 1, 0);
metalSphere.castShadow = true;
scene.add(metalSphere);

// Plastic sphere
const plasticGeometry = new THREE.SphereGeometry(1, 48, 48);
const plasticMaterial = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    shininess: 100
});
const plasticSphere = new THREE.Mesh(plasticGeometry, plasticMaterial);
plasticSphere.position.set(1, 1, 0);
plasticSphere.castShadow = true;
scene.add(plasticSphere);

// Glass sphere
const glassGeometry = new THREE.SphereGeometry(1, 48, 48);
const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xccffff,
    transmission: 0.7,
    opacity: 0.3,
    transparent: true,
    roughness: 0.0,
    metalness: 0.0,
    ior: 1.5,
    thickness: 0.5
});
const glassSphere = new THREE.Mesh(glassGeometry, glassMaterial);
glassSphere.position.set(3, 1, 0);
glassSphere.castShadow = true;
scene.add(glassSphere);

// Add a colored cube behind the glass sphere to showcase transparency
const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0xff4444
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(5, 1, -5
    
);
cube.castShadow = true;
scene.add(cube);

// Create a plane geometry for the ground
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    side: THREE.DoubleSide
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotation.x = -Math.PI / 2; // Rotate to be horizontal
planeMesh.position.y = -1; // Position below the spheres
planeMesh.receiveShadow = true;
//scene.add(planeMesh);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    woodSphere.rotation.x += 0.01;
    metalSphere.rotation.y += 0.01;
    plasticSphere.rotation.z += 0.01;
    glassSphere.rotation.x += 0.005;
    glassSphere.rotation.y += 0.005;
}

animate();

document.body.appendChild( renderer.domElement );
