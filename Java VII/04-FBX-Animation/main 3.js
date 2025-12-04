import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x87CEEB); // Sky blue background
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0, 1, 0);

// Clock and mixer for animations
const clock = new THREE.Clock();
let mixer = null;
let currentAction = null;
let actions = {};

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(20, 20, 10);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
scene.add(directionalLight);

// Ground plane
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x90EE90 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Add some environment objects
const cubes = [];
for (let i = 0; i < 5; i++) {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshLambertMaterial({ 
        color: new THREE.Color().setHSL(i / 5, 0.7, 0.5) 
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(
        (Math.random() - 0.5) * 30,
        1,
        (Math.random() - 0.5) * 30
    );
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);
    cubes.push(cube);
}

// Camera position
camera.position.set(0, 5, 10);
camera.lookAt(0, 1, 0);

// UI elements
const loadingElement = document.getElementById('loading');
const infoElement = document.getElementById('info');
const controlsElement = document.getElementById('controls');
const currentAnimationElement = document.getElementById('currentAnimation');
const animTimeElement = document.getElementById('animTime');

// Model and animation variables
let model = null;
let isLoaded = false;
let isPaused = false;

// Create a simple animated character since we don't have an actual FBX file
function createAnimatedCharacter() {
    const group = new THREE.Group();
    
    // Body
    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.7, 2, 8);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x4444ff });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1.5;
    body.castShadow = true;
    group.add(body);
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const headMaterial = new THREE.MeshLambertMaterial({ color: 0xffddaa });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 3;
    head.castShadow = true;
    group.add(head);
    
    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.5, 8);
    const armMaterial = new THREE.MeshLambertMaterial({ color: 0xffddaa });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.8, 2, 0);
    leftArm.castShadow = true;
    group.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.8, 2, 0);
    rightArm.castShadow = true;
    group.add(rightArm);
    
    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 8);
    const legMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.3, 0.25, 0);
    leftLeg.castShadow = true;
    group.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.3, 0.25, 0);
    rightLeg.castShadow = true;
    group.add(rightLeg);
    
    // Store references for animation
    group.userData = {
        body: body,
        head: head,
        leftArm: leftArm,
        rightArm: rightArm,
        leftLeg: leftLeg,
        rightLeg: rightLeg
    };
    
    return group;
}

// Create animations programmatically
function createAnimations(character) {
    const clips = [];
    const parts = character.userData;
    
    // Idle animation
    const idleTracks = [];
    const idleTimes = [0, 1, 2];
    
    // Head bobbing
    const headPositionValues = [0, 3, 0, 0, 3.1, 0, 0, 3, 0];
    idleTracks.push(new THREE.VectorKeyframeTrack('.children[1].position', idleTimes, headPositionValues));
    
    // Body breathing
    const bodyScaleValues = [1, 1, 1, 1.05, 1, 1.05, 1, 1, 1];
    idleTracks.push(new THREE.VectorKeyframeTrack('.children[0].scale', idleTimes, bodyScaleValues));
    
    clips.push(new THREE.AnimationClip('idle', 2, idleTracks));
    
    // Walk animation
    const walkTracks = [];
    const walkTimes = [0, 0.25, 0.5, 0.75, 1];
    
    // Arm swinging
    const leftArmRotation = [0, 0, 0, 0.5, 0, 0, 0, 0, 0, -0.5, 0, 0, 0, 0, 0];
    const rightArmRotation = [0, 0, 0, -0.5, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0];
    walkTracks.push(new THREE.VectorKeyframeTrack('.children[2].rotation', walkTimes, leftArmRotation));
    walkTracks.push(new THREE.VectorKeyframeTrack('.children[3].rotation', walkTimes, rightArmRotation));
    
    // Leg movement
    const leftLegRotation = [0.3, 0, 0, 0, 0, 0, -0.3, 0, 0, 0, 0, 0, 0.3, 0, 0];
    const rightLegRotation = [-0.3, 0, 0, 0, 0, 0, 0.3, 0, 0, 0, 0, 0, -0.3, 0, 0];
    walkTracks.push(new THREE.VectorKeyframeTrack('.children[4].rotation', walkTimes, leftLegRotation));
    walkTracks.push(new THREE.VectorKeyframeTrack('.children[5].rotation', walkTimes, rightLegRotation));
    
    // Body bobbing
    const walkBodyPosition = [0, 1.5, 0, 0, 1.4, 0, 0, 1.5, 0, 0, 1.4, 0, 0, 1.5, 0];
    walkTracks.push(new THREE.VectorKeyframeTrack('.children[0].position', walkTimes, walkBodyPosition));
    
    clips.push(new THREE.AnimationClip('walk', 1, walkTracks));
    
    // Run animation (faster walk)
    const runTracks = [];
    const runTimes = [0, 0.15, 0.3, 0.45, 0.6];
    
    // More exaggerated arm swinging
    const runLeftArmRotation = [0, 0, 0, 0.8, 0, 0, 0, 0, 0, -0.8, 0, 0, 0, 0, 0];
    const runRightArmRotation = [0, 0, 0, -0.8, 0, 0, 0, 0, 0, 0.8, 0, 0, 0, 0, 0];
    runTracks.push(new THREE.VectorKeyframeTrack('.children[2].rotation', runTimes, runLeftArmRotation));
    runTracks.push(new THREE.VectorKeyframeTrack('.children[3].rotation', runTimes, runRightArmRotation));
    
    // More exaggerated leg movement
    const runLeftLegRotation = [0.5, 0, 0, 0, 0, 0, -0.5, 0, 0, 0, 0, 0, 0.5, 0, 0];
    const runRightLegRotation = [-0.5, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0, -0.5, 0, 0];
    runTracks.push(new THREE.VectorKeyframeTrack('.children[4].rotation', runTimes, runLeftLegRotation));
    runTracks.push(new THREE.VectorKeyframeTrack('.children[5].rotation', runTimes, runRightLegRotation));
    
    // More body bobbing
    const runBodyPosition = [0, 1.5, 0, 0, 1.2, 0, 0, 1.5, 0, 0, 1.2, 0, 0, 1.5, 0];
    runTracks.push(new THREE.VectorKeyframeTrack('.children[0].position', runTimes, runBodyPosition));
    
    clips.push(new THREE.AnimationClip('run', 0.6, runTracks));
    
    // Jump animation
    const jumpTracks = [];
    const jumpTimes = [0, 0.3, 0.6, 1.0];
    
    // Character jumps up and down
    const jumpPosition = [0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0];
    jumpTracks.push(new THREE.VectorKeyframeTrack('.position', jumpTimes, jumpPosition));
    
    // Arms go up during jump
    const jumpLeftArmRotation = [0, 0, 0, -1.2, 0, 0, -1.2, 0, 0, 0, 0, 0];
    const jumpRightArmRotation = [0, 0, 0, 1.2, 0, 0, 1.2, 0, 0, 0, 0, 0];
    jumpTracks.push(new THREE.VectorKeyframeTrack('.children[2].rotation', jumpTimes, jumpLeftArmRotation));
    jumpTracks.push(new THREE.VectorKeyframeTrack('.children[3].rotation', jumpTimes, jumpRightArmRotation));
    
    clips.push(new THREE.AnimationClip('jump', 1, jumpTracks));
    
    return clips;
}

// Initialize the scene with a character
function init() {
    // Create character
    model = createAnimatedCharacter();
    scene.add(model);
    
    // Create mixer
    mixer = new THREE.AnimationMixer(model);
    
    // Create animations
    const clips = createAnimations(model);
    
    // Create actions
    clips.forEach(clip => {
        const action = mixer.clipAction(clip);
        actions[clip.name] = action;
        
        if (clip.name === 'idle') {
            action.play();
            currentAction = action;
        }
    });
    
    // Hide loading, show controls
    loadingElement.classList.add('hidden');
    infoElement.classList.remove('hidden');
    controlsElement.classList.remove('hidden');
    
    currentAnimationElement.textContent = 'Idle';
    isLoaded = true;
}

// Global functions for controls
window.playAnimation = function(animationName) {
    if (!isLoaded || !actions[animationName]) return;
    
    const toAction = actions[animationName];
    
    if (currentAction !== toAction) {
        if (currentAction) {
            currentAction.fadeOut(0.3);
        }
        
        toAction.reset().fadeIn(0.3).play();
        currentAction = toAction;
        currentAnimationElement.textContent = animationName.charAt(0).toUpperCase() + animationName.slice(1);
    }
};

window.pauseAnimation = function() {
    if (!isLoaded) return;
    
    isPaused = !isPaused;
    
    Object.values(actions).forEach(action => {
        if (action.isRunning()) {
            action.paused = isPaused;
        }
    });
};

window.resetAnimation = function() {
    if (!isLoaded || !currentAction) return;
    
    currentAction.reset().play();
};

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    const deltaTime = clock.getDelta();
    
    // Update mixer
    if (mixer && !isPaused) {
        mixer.update(deltaTime);
    }
    
    // Update UI
    if (currentAction) {
        animTimeElement.textContent = currentAction.time.toFixed(1);
    }
    
    // Rotate environment cubes
    cubes.forEach((cube, index) => {
        cube.rotation.y += deltaTime * (0.5 + index * 0.1);
        cube.rotation.x += deltaTime * (0.3 + index * 0.05);
    });
    
    // Update controls
    controls.update();
    
    // Render
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize and start
init();
animate();