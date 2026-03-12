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
      @mousemove="onDrag"
      @touchmove.passive="onDrag"
      @mouseup="stopDrag"
      @touchend="stopDrag"
    >
      <!-- CSS3DRenderer will render here -->
    </div>

    <!-- Navigation dots -->
    <div class="mt-8 flex justify-center gap-2">
      <button
        v-for="(service, index) in services"
        :key="index"
        @click="snapToIndex(index)"
        :class="['w-3 h-3 rounded-full transition-all duration-300', activeServiceIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70']"
      ></button>
    </div>

    <!-- Existing CTA link -->
  </section>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { gsap } from 'gsap';
// Import service data and other dependencies

const { locale } = useI18n()
const router = useRouter()

const navigateTo = (path: string) => router.push(path)

// WebGL detection function
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!window.WebGLRenderingContext &&
           (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
}

// Fallback flag
const webglSupported = ref(isWebGLAvailable());
console.log('WebGL supported:', webglSupported.value);
console.log('Component setup executed');

const services = computed(() => {
  return [
  {
    slug: 'web-development',
    gradient: 'linear-gradient(135deg, #0c2a35 0%, #1a4a3a 50%, #0d3328 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
    title: locale.value === 'de' ? 'Webentwicklung' : 'Web Development',
    desc:  locale.value === 'de' ? 'Schnelle, moderne Websites mit Top-Performance & sauberem Code.' : 'Fast, modern websites with top performance & clean code.',
  },
  {
    slug: 'process-optimization',
    gradient: 'linear-gradient(135deg, #0f2d1a 0%, #1c4030 50%, #0f2918 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',
    title: locale.value === 'de' ? 'Prozessoptimierung' : 'Process Optimization',
    desc:  locale.value === 'de' ? 'Automatisierung & Digitalisierung Ihrer Geschäftsprozesse.' : 'Automation & digitization of your business processes.',
  },
  {
    slug: 'digital-marketing',
    gradient: 'linear-gradient(135deg, #071e26 0%, #163a2a 50%, #0a1f1c 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>',
    title: 'Digital Marketing',
    desc:  locale.value === 'de' ? 'Strategisches Online-Marketing für nachhaltiges Wachstum.' : 'Strategic online marketing for sustainable growth.',
  },
  {
    slug: 'ai-projects',
    gradient: 'linear-gradient(135deg, #0a2630 0%, #1a3d30 50%, #0c2820 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/></svg>',
    title: locale.value === 'de' ? 'KI-Projekte' : 'AI Projects',
    desc:  locale.value === 'de' ? 'KI-Integration und Automatisierung für Ihr Unternehmen.' : 'AI integration and automation for your business.',
  },
  {
    slug: 'google-management',
    gradient: 'linear-gradient(135deg, #081c24 0%, #153525 50%, #0a1f1a 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>',
    title: 'Google Management',
    desc:  locale.value === 'de' ? 'Google Ads, SEO & My Business — alles aus einer Hand.' : 'Google Ads, SEO & My Business — all from one source.',
  },
  {
    slug: 'custom-web-apps',
    gradient: 'linear-gradient(135deg, #0c2a35 0%, #1a4535 50%, #0d2f25 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>',
    title: locale.value === 'de' ? 'Individual-Webapps' : 'Custom Web Apps',
    desc:  locale.value === 'de' ? 'Maßgeschneiderte Webanwendungen für komplexe Anforderungen.' : 'Tailored web applications for complex requirements.',
  },
  {
    slug: 'it-security-cloud',
    gradient: 'linear-gradient(135deg, #091e28 0%, #163828 50%, #0a1f1d 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
    title: locale.value === 'de' ? 'IT-Sicherheit & Cloud' : 'IT Security & Cloud',
    desc:  locale.value === 'de' ? 'Sichere Infrastruktur und Cloud-Lösungen für Ihr Business.' : 'Secure infrastructure and cloud solutions.',
  },
  {
    slug: 'digital-marketing-boost',
    gradient: 'linear-gradient(135deg, #0e2c1a 0%, #1c4530 50%, #0f2f1f 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>',
    title: locale.value === 'de' ? 'Marketing Boost' : 'Digital Marketing Boost',
    desc:  locale.value === 'de' ? 'Schnelle Wachstumsimpulse durch gezielte Maßnahmen.' : 'Rapid growth through targeted measures.',
  },
]
})

// Refs
const threeContainer = ref<HTMLDivElement>();
const activeServiceIndex = ref(0);

// Three.js variables
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let css3dRenderer: CSS3DRenderer;
let animationId: number;

// Array to track CSS3DObjects for state updates
let serviceObjects: THREE.CSS3DObject[] = [];

// Drag control state variables
let dragging = false;
let dragStartX = 0;
let dragStartRot = 0;
let velocity = 0;
let lastX = 0;
let lastT = 0;

// Helper function to get coordinates from events
function cx(e: MouseEvent | TouchEvent) {
  return 'touches' in e ? e.touches[0].clientX : e.clientX;
}

// Drag functions
function startDrag(e: MouseEvent | TouchEvent) {
  dragging = true;
  dragStartX = cx(e);
  dragStartRot = scene.rotation.y;
  lastX = dragStartX;
  lastT = Date.now();
  velocity = 0;
}

function onDrag(e: MouseEvent | TouchEvent) {
  if (!dragging) return;
  const x = cx(e);
  scene.rotation.y = dragStartRot + (x - dragStartX) * 0.005; // Sensitivity adjustment
  const now = Date.now();
  velocity = (x - lastX) / Math.max(1, now - lastT) * 16;
  lastX = x;
  lastT = now;
}

// Calculate target index based on current rotation
function getTargetIndex() {
  const N = services.value.length;
  const normalizedRotation = ((scene.rotation.y % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const index = Math.round(normalizedRotation / (2 * Math.PI / N)) % N;
  return (index + N) % N; // Ensure positive
}

// Check if an index is the center card
function isCenterIndex(index: number) {
  return index === getTargetIndex();
}

// Handle service card click
function handleServiceClick(index: number) {
  if (isCenterIndex(index)) {
    // Navigate to service page
    router.push(`/services/${services.value[index].slug}`);
  } else {
    // Snap to the clicked card
    snapToIndex(index);
  }
}

// Snap to specific index
function snapToIndex(index: number) {
  const N = services.value.length;
  const targetAngle = (index * 2 * Math.PI) / N;
  gsap.to(scene.rotation, {
    y: targetAngle,
    duration: 0.8,
    ease: "power2.out",
    onUpdate: updateCardStates
  });
}

// Update active/next/prev states based on closest cards
function updateCardStates() {
  const N = services.value.length;
  const centerIndex = getTargetIndex();
  activeServiceIndex.value = centerIndex;
  serviceObjects.forEach((obj, i) => {
    const diff = ((i - centerIndex + N) % N);
    let state = 'side';
    if (diff === 0) state = 'center';
    else if (diff === 1 || diff === N - 1) state = 'adjacent';

    // Apply CSS classes based on state
    obj.element.className = `service-card ${state}`;
  });
}

function stopDrag() {
  dragging = false;
  // Snap to nearest card when dragging stops
  snapToIndex(getTargetIndex());
}

// Initialize Three.js scene
const initThreeJs = () => {
  console.log('Initializing Three.js');
  console.log('threeContainer.value:', threeContainer.value);
  // Create scene
  scene = new THREE.Scene();

  // Create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.z = 700;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // Create CSS3DRenderer
  css3dRenderer = new CSS3DRenderer();
  css3dRenderer.setSize(window.innerWidth, window.innerHeight);
  css3dRenderer.domElement.style.position = 'absolute';
  css3dRenderer.domElement.style.top = '0';
  css3dRenderer.domElement.style.left = '0';

  // Attach renderer to container
  if (threeContainer.value) {
    threeContainer.value.appendChild(css3dRenderer.domElement);
    console.log('Renderer appended to container');
  } else {
    console.log('threeContainer.value is null, cannot append renderer');
  }

  // Create service cards in circular arrangement
  createServiceCards();

  // Initialize card states
  updateCardStates();

  // Animation loop
  const animate = () => {
    animationId = requestAnimationFrame(animate);

    // Apply inertia
    if (!dragging && Math.abs(velocity) > 0.001) {
      scene.rotation.y += velocity * 0.01; // Apply velocity to rotation
      velocity *= 0.95; // Friction to slow down
    }

    css3dRenderer.render(scene, camera);
  };
  animate();
};

// Create service cards with circular arrangement
const createServiceCards = () => {
  console.log('Creating service cards');
  const N = services.value.length;
  console.log('Number of services:', N);
  // Responsive radius based on screen width
  const radius = window.innerWidth < 768 ? 400 : window.innerWidth < 480 ? 300 : 600;
  const RADIUS = radius; // Distance from center
  const TILT_ANGLE = Math.PI / 18; // 10 degrees tilt for depth perception

  services.value.forEach((service, index) => {
    // Calculate angle per service: θ = 2π / N
    const angle = (index * 2 * Math.PI) / N;

    // Compute positions using the formulas
    const x = RADIUS * Math.cos(angle);
    const y = RADIUS * Math.sin(angle) * Math.cos(TILT_ANGLE); // Tilt on Y-axis
    const z = RADIUS * Math.sin(angle) * Math.sin(TILT_ANGLE);  // Elevation on Z-axis

    // Create HTML element for service card
    const serviceCardElement = document.createElement('div');
    serviceCardElement.className = 'service-card';
    serviceCardElement.innerHTML = `
      <div class="service-card-content" style="background: ${service.gradient};">
        <div class="service-icon">
          <img src="/test-pitcture-carussel.jpg" class="h-9 w-9" alt="Service Icon" />
        </div>
        <h3 class="service-title">${service.title}</h3>
        <p class="service-desc">${service.desc}</p>
      </div>
    `;

    // Add click event listener
    serviceCardElement.addEventListener('click', () => handleServiceClick(index));

    // Create CSS3DObject
    const cssObject = new CSS3DObject(serviceCardElement);

    // Position the object
    cssObject.position.set(x, y, z);

    // Make card face the center
    cssObject.lookAt(new THREE.Vector3(0, 0, 0));

    // Add to scene
    scene.add(cssObject);

    // Add to serviceObjects array for state tracking
    serviceObjects.push(cssObject);
  });
  console.log('Service cards created, serviceObjects length:', serviceObjects.length);
  console.log('onMounted completed');
};

// Handle window resize
const handleResize = () => {
  if (camera && css3dRenderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    css3dRenderer.setSize(window.innerWidth, window.innerHeight);

    // Recreate service cards with new responsive radius
    scene.clear();
    serviceObjects = [];
    createServiceCards();
    updateCardStates();
  }
};

// Lifecycle hooks
onMounted(() => {
  console.log('HomeServicesThreeJs mounted');
  initThreeJs();
  window.addEventListener('resize', handleResize);
  console.log('onMounted completed');
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
/* Three.js container */
.immersive-stage {
  position: relative;
  width: 100%;
  height: 80vh;
  overflow: hidden;
  cursor: grab;
}

.immersive-stage:active {
  cursor: grabbing;
}

/* Service card styles */
.service-card {
  width: 300px;
  height: 200px;
  pointer-events: auto;
  cursor: pointer;
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  .service-card {
    width: 200px;
    height: 150px;
  }
}

@media (max-width: 480px) {
  .service-card {
    width: 180px;
    height: 130px;
  }
}

.service-card-content {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.service-card-content:hover {
  transform: scale(1.05);
}

.service-icon {
  margin-bottom: 15px;
  opacity: 0.9;
}

.service-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1.3;
}

.service-desc {
  font-size: 0.875rem;
  opacity: 0.85;
  line-height: 1.4;
}

/* Responsive font sizes */
@media (max-width: 768px) {
  .service-title {
    font-size: 1rem;
  }

  .service-desc {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .service-title {
    font-size: 0.875rem;
  }

  .service-desc {
    font-size: 0.6875rem;
  }
}
</style>