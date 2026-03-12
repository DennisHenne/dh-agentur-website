<template>
  <section class="section">
    <!-- Header content unchanged -->
    <div class="container mb-10 text-center">
      <!-- Existing header content -->
    </div>

    <!-- Three.js Container -->
    <div
      ref="threeContainer"
      class="immersive-stage"
      @mousedown="startDrag"
      @touchstart.passive="startDrag"
    >
      <!-- CSS3DRenderer will render here -->
    </div>

    <!-- Navigation dots and CTA unchanged -->
    <div class="mt-8 flex justify-center gap-2">
      <!-- Existing navigation dots -->
    </div>

    <!-- Existing CTA link -->
  </section>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
// Import service data and other dependencies

// Refs
const threeContainer = ref<HTMLDivElement>();

// Three.js variables
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let css3dRenderer: CSS3DRenderer;
let controls: OrbitControls;
let animationId: number;

// Initialize Three.js scene
const initThreeJs = () => {
  // Create scene
  scene = new THREE.Scene();

  // Create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Create CSS3DRenderer
  css3dRenderer = new CSS3DRenderer();
  css3dRenderer.setSize(window.innerWidth, window.innerHeight);
  css3dRenderer.domElement.style.position = 'absolute';
  css3dRenderer.domElement.style.top = '0';
  css3dRenderer.domElement.style.left = '0';

  // Attach renderer to container
  if (threeContainer.value) {
    threeContainer.value.appendChild(css3dRenderer.domElement);
  }

  // Create OrbitControls
  controls = new OrbitControls(camera, css3dRenderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Animation loop
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    controls.update();
    css3dRenderer.render(scene, camera);
  };
  animate();
};

// Handle window resize
const handleResize = () => {
  if (camera && css3dRenderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    css3dRenderer.setSize(window.innerWidth, window.innerHeight);
  }
};

// Lifecycle hooks
onMounted(() => {
  initThreeJs();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (css3dRenderer && threeContainer.value) {
    threeContainer.value.removeChild(css3dRenderer.domElement);
  }
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
/* Existing styles mostly preserved */
/* Adjustments for Three.js container */
</style>