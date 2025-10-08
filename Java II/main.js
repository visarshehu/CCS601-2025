import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(     
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000 
);
camera.position.z = 10;



const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial(
    {
        color:0xff0000
    }
);

const cubeMesh = new THREE.Mesh(geometry, material);

const sphereGeometry = new THREE.SphereGeometry(1,16,16)
const sphereMaterial = new THREE.MeshStandardMaterial(
    {
        color:0xffff00,
        wireframe:true
    }
);

const sphereeMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);


scene.add(cubeMesh);
scene.add(sphereeMesh);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 3);
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

const controls = new OrbitControls( camera, renderer.domElement );


cubeMesh.translateX(-3);
sphereeMesh.position.set(3, 2, 4);
controls.update();


function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cubeMesh.rotation.y += 0.01;
    controls.update();

    
}

animate();

document.body.appendChild( renderer.domElement );
