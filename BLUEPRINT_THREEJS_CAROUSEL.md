# Blueprint: Three.js-Based 3D Carousel for Services Section

## Overview
This blueprint outlines the implementation of a Three.js and WebGL-based 3D carousel to replace the current CSS3D implementation in `HomeServices.vue`. The new implementation will use Three.js with CSS3DRenderer for HTML elements, providing true 3D rendering with WebGL while maintaining HTML/CSS for content.

## Current Implementation Analysis
The existing `HomeServices.vue` uses:
- Pure CSS3D transforms with `perspective` and `transform-style: preserve-3d`
- Manual calculation of card positions using trigonometry
- GSAP-like animation loop with `requestAnimationFrame`
- Drag controls for user interaction
- Navigation dots for direct selection

Key strengths to preserve:
- Service data integration (9 service cards with gradients, icons, titles)
- Click-to-navigate functionality for center card
- Snap-to-position behavior
- Responsive design considerations
- Ambient particle effects

## Decision: Replace vs Enhance
**Approach: Complete Replacement**
- The current CSS3D implementation, while functional, lacks true 3D depth and lighting capabilities
- Three.js provides superior performance for complex 3D scenes
- CSS3DRenderer allows us to keep HTML/CSS for text/content while leveraging WebGL for 3D positioning
- Clean separation of concerns: Three.js handles 3D positioning, HTML/CSS handles styling

## Technical Implementation Plan

### 1. Dependencies Installation
Add Three.js to package.json:
```json
"three": "^0.160.0",
"@types/three": "^0.160.0"
```

### 2. Core Architecture
Create a new component `components/sections/HomeServicesThreeJs.vue` that will replace the existing implementation.

#### Main Components:
- **Three.js Scene**: Camera, renderer, scene
- **CSS3DRenderer**: For rendering HTML service cards in 3D space
- **Service Cards**: HTML elements managed by Three.js for 3D positioning
- **Controls**: OrbitControls for rotation + custom snapping logic
- **Animation Loop**: RequestAnimationFrame for smooth rendering

### 3. Mathematical Implementation for Circular Arrangement

#### Card Positioning Formula:
For N services arranged in a circle:
- Angle per service: `θ = 2π / N`
- Position of service i: 
  - `x = radius * cos(i * θ)`
  - `y = radius * sin(i * θ) * tiltFactor` (for slight elliptical tilt)
  - `z = radius * sin(i * θ) * elevationFactor` (for depth)

#### Implementation Details:
```javascript
const N = services.length;
const RADIUS = 600; // Distance from center
const TILT_ANGLE = Math.PI / 18; // 10 degrees tilt for depth perception

services.forEach((service, index) => {
  const angle = (index * 2 * Math.PI) / N;
  const position = new THREE.Vector3(
    RADIUS * Math.cos(angle),
    RADIUS * Math.sin(angle) * Math.cos(TILT_ANGLE), // Tilt on Y-axis
    RADIUS * Math.sin(angle) * Math.sin(TILT_ANGLE)  // Elevation on Z-axis
  );
  
  // Apply to CSS3DObject
  const cssObject = new THREE.CSS3DObject(serviceCardElement);
  cssObject.position.copy(position);
  
  // Look at center for proper orientation
  cssObject.lookAt(new THREE.Vector3(0, 0, 0));
  
  scene.add(cssObject);
});
```

### 4. Snapping Logic Implementation

#### Approach: Hybrid GSAP + Manual Calculation
- Use GSAP for smooth animation to target positions
- Manual calculation for determining target index based on rotation

#### Implementation:
```javascript
// Calculate target index based on current rotation
function getTargetIndex() {
  const normalizedRotation = ((scene.rotation.y % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const index = Math.round(normalizedRotation / (2 * Math.PI / N)) % N;
  return (index + N) % N; // Ensure positive
}

// Snap to specific index
function snapToIndex(index) {
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
  const centerIndex = getTargetIndex();
  serviceObjects.forEach((obj, i) => {
    const diff = ((i - centerIndex + N) % N);
    let state = 'side';
    if (diff === 0) state = 'center';
    else if (diff === 1 || diff === N - 1) state = 'adjacent';
    
    // Apply CSS classes based on state
    obj.element.className = `service-card ${state}`;
  });
}
```

### 5. Integration with Service Data and Navigation

#### Data Flow:
- Services data remains in `computed()` property as current implementation
- Each service object gets mapped to a CSS3DObject
- Click handling: Only center card navigates to service page
- Other cards trigger snap-to animation

#### Navigation Implementation:
```javascript
function handleServiceClick(service, index) {
  if (isCenterIndex(index)) {
    router.push(`/services/${service.slug}`);
  } else {
    snapToIndex(index);
  }
}

function isCenterIndex(index) {
  return index === getTargetIndex();
}
```

### 6. Performance Considerations and Fallbacks

#### Performance Optimizations:
- Limit render loop to 60fps with requestAnimationFrame
- Only update changed properties in animation loop
- Use CSS3DRenderer for DOM elements (more efficient than WebGL for text)
- Dispose of Three.js objects properly on component unmount
- Consider reducing particle count or complexity

#### Fallback Strategy:
- Detect WebGL support: `navigator.gpu` or try-catch WebGL context creation
- Fallback to current CSS3D implementation if WebGL unavailable
- Provide graceful degradation notice to users

#### Browser Support Detection:
```javascript
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!window.WebGLRenderingContext && 
           (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
}
```

### 7. Component Structure

#### HomeServicesThreeJs.vue:
```vue
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
import { gsap } from 'gsap';
// Import service data and other dependencies
</script>

<style scoped>
/* Existing styles mostly preserved */
/* Adjustments for Three.js container */
</style>
</script>
```

### 8. Migration Plan

#### Phase 1: Development
1. Create new `HomeServicesThreeJs.vue` component
2. Implement Three.js scene with CSS3DRenderer
3. Map existing service data to 3D positions
4. Implement drag controls and snapping logic
5. Test performance and visual fidelity

#### Phase 2: Integration
1. Replace `HomeServices.vue` import in `pages/index.vue` with new component
2. Ensure all existing functionality preserved:
   - Service navigation
   - Responsive behavior
   - SEO considerations (content still in HTML)
   - Accessibility features

#### Phase 3: Optimization
1. Profile performance with Chrome DevTools
2. Optimize render loop and object updates
3. Add WebGL fallback detection
4. Fine-tune animation parameters

### 9. Verification Criteria

The Orchestrator will confirm completion when:
1. [ ] New Three.js carousel renders all 9 service cards correctly
2. [ ] Cards arrange in a 3D circle with proper depth perception
3. [ ] Drag rotation works smoothly with inertia
4. [ ] Clicking center card navigates to correct service page
5. [ ] Clicking non-center cards snaps them to center position
6. [ ] Navigation dots update correctly to show active service
7. [ ] Component maintains responsive behavior on different screen sizes
8. [ ] Performance is equivalent or better than current implementation
9. [ ] Fallback to CSS3D works when WebGL unavailable
10. [ ] All existing styling and visual effects preserved or enhanced

### 10. Risks and Mitigations

#### Risk: Performance Degradation on Mobile
- Mitigation: Implement level-of-detail adjustments, reduce animation complexity on low-end devices

#### Risk: CSS Conflicts with Three.js Positioning
- Mitigation: Use isolated CSS scope, test thoroughly with existing styles

#### Risk: Increased Bundle Size
- Mitigation: Tree-shake Three.js imports, consider using CDN for production

#### Risk: Accessibility Issues
- Mitigation: Ensure keyboard navigation works, maintain ARIA labels, test with screen readers

## Conclusion
This blueprint provides a comprehensive plan to replace the CSS3D-based carousel with a true Three.js/WebGL implementation using CSS3DRenderer for HTML elements. The approach preserves all existing functionality while enabling richer 3D effects and better performance potential through hardware acceleration.

The implementation maintains the existing service data structure, navigation patterns, and visual design while upgrading the underlying 3D rendering technology.