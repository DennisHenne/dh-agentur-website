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

const { locale } = useI18n()

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

  // Create service cards in circular arrangement
  createServiceCards();

  // Animation loop
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    controls.update();
    css3dRenderer.render(scene, camera);
  };
  animate();
};

// Create service cards with circular arrangement
const createServiceCards = () => {
  const N = services.value.length;
  const RADIUS = 600; // Distance from center
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
          ${service.icon}
        </div>
        <h3 class="service-title">${service.title}</h3>
        <p class="service-desc">${service.desc}</p>
      </div>
    `;

    // Create CSS3DObject
    const cssObject = new THREE.CSS3DObject(serviceCardElement);

    // Position the object
    cssObject.position.set(x, y, z);

    // Make card face the center
    cssObject.lookAt(new THREE.Vector3(0, 0, 0));

    // Add to scene
    scene.add(cssObject);
  });
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
/* Three.js container */
.immersive-stage {
  position: relative;
  width: 100%;
  height: 80vh;
  overflow: hidden;
}

/* Service card styles */
.service-card {
  width: 300px;
  height: 200px;
  pointer-events: none;
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
</style>