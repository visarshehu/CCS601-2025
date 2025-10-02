import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(     
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000 
);
camera.position.z = 10;

// Cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial({
    color: 0xff0000
});
const cubeMesh = new THREE.Mesh(geometry, material);
cubeMesh.translateX(-3.8);
scene.add(cubeMesh);

// Sphere
const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    wireframe: true
});
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.set(-5, 2, -3); // Start on the left
scene.add(sphereMesh);

// Cone
const coneGeometry = new THREE.ConeGeometry(1, 2, 32);
const coneMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ff00
});
const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
coneMesh.position.set(0, -3, 0); 
scene.add(coneMesh);

// Torus
const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000ff
});
const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
torusMesh.position.set(0, 3, 0); 
scene.add(torusMesh);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 3);
scene.add(light);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


let sphereDirection = 1; 


function animate() {
    requestAnimationFrame(animate);

    
    cubeMesh.rotation.y += 0.01;
    torusMesh.rotation.x += 0.01;
    torusMesh.rotation.y += 0.01;

    
    sphereMesh.position.x += 0.02 * sphereDirection;

    
    if (sphereMesh.position.x > 5) {
        sphereDirection = -1;
    } else if (sphereMesh.position.x < -5) {
        sphereDirection = 1;
    }

    renderer.render(scene, camera);
}

animate();