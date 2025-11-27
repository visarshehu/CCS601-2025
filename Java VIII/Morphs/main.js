import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const clock = new THREE.Clock();

const geometry = new THREE.BoxGeometry(1, 1, 1);

const positionAttribute = geometry.attributes.position;
const vertex = new THREE.Vector3();
const skinIndices = [];
const skinWeights = [];

const target1 = [];
const target2 = [];
const target3 = [];

for (let i = 0; i < positionAttribute.count; i++) {
    vertex.fromBufferAttribute(positionAttribute, i);
    
    target1.push(vertex.x, vertex.y + Math.random() * 0.5, vertex.z);
    target2.push(vertex.x + (Math.random() - 0.5) * 0.8, vertex.y, vertex.z + (Math.random() - 0.5) * 0.8);
    target3.push(vertex.x * 1.5, vertex.y * 0.5, vertex.z * 1.5);
}

geometry.morphAttributes.position = [
    new THREE.Float32BufferAttribute(target1, 3),
    new THREE.Float32BufferAttribute(target2, 3),
    new THREE.Float32BufferAttribute(target3, 3)
];

const material = new THREE.MeshStandardMaterial({
    color: 0x00ff88,
    morphTargets: true
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(2, 2, 3);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xf0f0f0);

function animate() {
    requestAnimationFrame(animate);
    
    const time = clock.getElapsedTime();
    
    mesh.morphTargetInfluences[0] = (Math.sin(time * 2) + 1) * 0.5;
    mesh.morphTargetInfluences[1] = (Math.sin(time * 3 + Math.PI) + 1) * 0.5;
    mesh.morphTargetInfluences[2] = (Math.sin(time * 1.5 + Math.PI * 0.5) + 1) * 0.5;
    
    mesh.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}

animate();

document.body.appendChild(renderer.domElement);
