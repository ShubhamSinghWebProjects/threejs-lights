import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import Stats from 'stats.js'
// import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

const BASE_PATH = '/threejs-lights'

/**
 LOW COST PERFORMANCE LIGHTS
    * 1. Ambient Light:
    * 2. Hemisphere Light:
    
 MODERATE COST PERFORMANCE LIGHTS
    * 3. Directional Light:
    * 4. Point Light:
    * 
 HIGH COST PERFORMANCE LIGHTS
    * 5. Spot Light:
    * 6. Rect Area Light:
 */
const stats = new Stats();
document.body.appendChild(stats.dom);

/**
 * 
 * Texture
 */

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(`${BASE_PATH}/textures/matcaps/3.png`)

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const AxesHelper = new THREE.AxesHelper(3)
AxesHelper.visible = false
scene.add(AxesHelper)
const AxesHelperFolder = gui.addFolder('Axes Helper');
AxesHelperFolder.add(AxesHelper, 'visible').name('Axes Helper Visible');


/**
 * Lights:
 * 
 * 1. Ambient Light: 
 *     - Light that is present everywhere in the scene
 *     - Doesn't have a direction
 *     - Doesn't cast shadows
 * 

White ambient light simulating the even lighting from the sky, intensity is very low because we don't want to wash out our other lights

A warm, slightly yellowish light simulating the sun. Intensity is slightly stronger.

A light blue and green hemisphere light simulating the ground reflecting light from the sun.
It also helps to highlight undersides of objects that the directional light can't reach.
 */

// Dark blue ambient light, a bit stronger to make up for the lack of a strong directional light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const ambientLightFolder = gui.addFolder('Ambient Light');
ambientLightFolder.addColor(new function() {
    this.color = '#ffffff';
}, 'color').onChange(function (value) {
    ambientLight.color.set(value);
});
ambientLightFolder.add(ambientLight, 'intensity').min(0).max(1).step(0.001);


// A dim, cool directional light that isn't too noticeable
const directionalLight = new THREE.DirectionalLight(0xfff4e6, 0.6);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

const directionalLightFolder = gui.addFolder('Directional Light');
directionalLightFolder.addColor(new function() {
    this.color = '#fff4e6';
}, 'color').onChange(function (value) {
    directionalLight.color.set(value);
});
directionalLightFolder.add(directionalLight, 'intensity').min(0).max(1).step(0.001);

// A bright blue and purple hemisphere light to simulate bright city lights reflecting off the ground and buildings
const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x228b22, 0.2);
scene.add(hemisphereLight);

const hemisphereLightFolder = gui.addFolder('Hemisphere Light');
hemisphereLightFolder.addColor(new function() {
    this.skyColor = '#87ceeb';
}, 'skyColor').onChange(function (value) {
    hemisphereLight.color.set(value);
});
hemisphereLightFolder.addColor(new function() {
    this.groundColor = '#228b22';
}, 'groundColor').onChange(function (value) {
    hemisphereLight.groundColor.set(value);
});
hemisphereLightFolder.add(hemisphereLight, 'intensity').min(0).max(1).step(0.001);


// Add PointLight
const pointLight = new THREE.PointLight(0xff9000, 0.5, 10);
pointLight.position.set(1, 1, 1);
scene.add(pointLight);

// Add PointLight controls to the GUI
const pointLightFolder = gui.addFolder('Point Light');
pointLightFolder.addColor(new function() {
    this.color = '#ffffff';
}, 'color').onChange(function (value) {
    pointLight.color.set(value);
});
pointLightFolder.add(pointLight, 'intensity').min(0).max(1).step(0.001);
pointLightFolder.add(pointLight, 'distance').min(0).max(10).step(0.1);
pointLightFolder.add(pointLight.position, 'x').min(-10).max(10).step(0.1);
pointLightFolder.add(pointLight.position, 'y').min(-10).max(10).step(0.1);
pointLightFolder.add(pointLight.position, 'z').min(-10).max(10).step(0.1);

// RectAreaLight: A light that shines from a rectangle in a specific direction
const rectLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectLight.position.set(1, 0.25, 0);
rectLight.lookAt(new THREE.Vector3());
scene.add(rectLight);

// // Create a helper for visualization
// const rectLightHelper = new RectAreaLightHelper(rectLight);
// rectLight.add(rectLightHelper);



const rectLightFolder = gui.addFolder('RectArea Light');
rectLightFolder.addColor(new function() {
    this.color = '#ffffff';
}, 'color').onChange(function (value) {
    rectLight.color.set(value);
});
rectLightFolder.add(rectLight, 'intensity').min(0).max(10).step(0.1);
rectLightFolder.add(rectLight.position, 'x').min(-10).max(10).step(0.1);
rectLightFolder.add(rectLight.position, 'y').min(-10).max(10).step(0.1);
rectLightFolder.add(rectLight.position, 'z').min(-10).max(10).step(0.1);
rectLightFolder.add(rectLight, 'width').min(0).max(20).step(0.1);
rectLightFolder.add(rectLight, 'height').min(0).max(20).step(0.1);


// SpotLight
const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 7, Math.PI*0.1, 0.25, 0.1);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);


// To visualize the spotLight position
// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

// GUI controls for the SpotLight
const spotLightFolder = gui.addFolder('Spot Light');
spotLightFolder.addColor(new function() {
    this.color = '#ffffff';
}, 'color').onChange(function (value) {
    spotLight.color.set(value);
});
spotLightFolder.add(spotLight, 'intensity').min(0).max(1).step(0.01);
spotLightFolder.add(spotLight, 'distance').min(0).max(50).step(0.1);
spotLightFolder.add(spotLight, 'angle').min(0).max(Math.PI / 2).step(0.01);
spotLightFolder.add(spotLight, 'penumbra').min(0).max(1).step(0.01);
spotLightFolder.add(spotLight.position, 'x').min(-10).max(10).step(0.1);
spotLightFolder.add(spotLight.position, 'y').min(-10).max(10).step(0.1);
spotLightFolder.add(spotLight.position, 'z').min(-10).max(10).step(0.1);


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4
material.metalness = 0.7
material.map = texture

const textureFolder = gui.addFolder('Texture');

textureFolder.add({
    toggleTexture: true
}, 'toggleTexture').name('Toggle Texture').onChange(function (value) {
    if (value) {
        // Load and apply the texture
        texture = textureLoader.load('/textures/matcaps/3.png');
        material.map = texture;
    } else {
        // Dispose of the texture and remove it from the material
        texture.dispose();
        material.map = null;
    }

    material.needsUpdate = true;
});

textureFolder.add(material, 'roughness').min(0).max(1).step(0.001).name('Material Roughness')
textureFolder.add(material, 'metalness').min(0).max(1).step(0.001).name('Material Metalness')
textureFolder.add(material, 'wireframe').name('Material Wireframe')

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{   
    stats.begin();
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Update SpotLight Helper
    // spotLightHelper.update();
    // Render
    renderer.render(scene, camera)
    stats.end();
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



