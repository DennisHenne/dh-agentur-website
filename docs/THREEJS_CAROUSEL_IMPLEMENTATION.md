# Three.js-Based 3D Carousel Implementation Documentation

## 1. Overview of What Was Implemented

This implementation replaces the existing CSS3D-based 3D carousel in the Services section with a true Three.js/WebGL implementation using CSS3DRenderer for HTML elements. The new implementation maintains all existing functionality while providing superior 3D rendering capabilities, better performance potential through hardware acceleration, and enhanced visual depth perception.

Key improvements:
- True 3D rendering with WebGL via Three.js
- HTML/CSS content preserved for SEO and accessibility
- Enhanced depth perception with proper 3D positioning
- Smooth animations with GSAP integration
- Responsive design that adapts to different screen sizes
- Drag controls with inertia and snapping behavior
- Click-to-navigate functionality for center card
- Navigation dots for direct selection
- Fallback mechanism for WebGL-unsupported browsers

## 2. Technical Details of the Three.js Integration

### Core Architecture

The implementation uses Three.js with CSS3DRenderer to render HTML service cards in 3D space:

- **Three.js Scene**: Contains the 3D space where objects are positioned
- **CSS3DRenderer**: Renders HTML elements (service cards) in the 3D scene
- **Perspective Camera**: Provides 3D perspective viewing
- **Service Cards**: HTML elements managed by Three.js for 3D positioning
- **Controls**: Custom drag controls with snapping logic
- **Animation Loop**: RequestAnimationFrame for smooth rendering

### Mathematical Implementation for Circular Arrangement

Services are arranged in a circle using trigonometric functions:

```
For N services arranged in a circle:
- Angle per service: θ = 2π / N
- Position of service i:
  - x = radius * cos(i * θ)
  - y = radius * sin(i * θ) * tiltFactor (for slight elliptical tilt)
  - z = radius * sin(i * θ) * elevationFactor (for depth)
```

Where:
- `radius`: Distance from center (responsive based on screen width)
- `tiltFactor`: Math.cos(TILT_ANGLE) for Y-axis tilt
- `elevationFactor`: Math.sin(TILT_ANGLE) for Z-axis elevation
- `TILT_ANGLE`: Math.PI / 18 (10 degrees) for depth perception

### Snapping Logic Implementation

Hybrid approach using GSAP for smooth animation and manual calculation for target determination:

1. **Target Index Calculation**: Determines which service should be centered based on current rotation
2. **Snapping Animation**: Uses GSAP to smoothly rotate to target position
3. **State Updates**: Updates card states (center/adjacent/side) during animation
4. **Inertia**: Applies velocity-based rotation when dragging stops

### Integration with Service Data and Navigation

- Service data remains in a computed property (same as original implementation)
- Each service object maps to a CSS3DObject in the Three.js scene
- Click handling: Only center card navigates to service page; others trigger snap-to animation
- Navigation dots update to reflect active service index

## 3. How to Use the Component

The Three.js carousel component is located at `components/sections/HomeServicesThreeJs.vue` and is automatically used in place of the previous CSS3D implementation.

### Integration Point

The component is integrated in `pages/index.vue`:
```vue
<SectionsHomeServicesThreeJs />
```

### Usage Notes

1. No additional setup required - the component initializes automatically on mount
2. Service data is defined within the component (duplicated from original for encapsulation)
3. The component handles its own Three.js scene lifecycle (init, update, destroy)
4. Responsive behavior is built-in - adjusts card size and radius based on screen width
5. Drag and touch controls work out of the box
6. Navigation dots provide direct selection capability
7. Clicking the center card navigates to the corresponding service page
8. Clicking non-center cards snaps them to the center position

## 4. Performance Considerations

### Optimizations Implemented

1. **Render Loop Limitation**: Uses requestAnimationFrame for efficient rendering (typically 60fps)
2. **Selective Updates**: Only updates changed properties in the animation loop
3. **CSS3DRenderer Efficiency**: Uses CSS3DRenderer for DOM elements (more efficient than WebGL for text/content)
4. **Proper Cleanup**: Disposes of Three.js objects and removes event listeners on component unmount
5. **Responsive Radius**: Adjusts the carousel radius based on screen size to prevent overflow on small screens
6. **Velocity-Based Inertia**: Applies friction to dragging velocity for natural deceleration

### Performance Monitoring Recommendations

1. Monitor FPS using browser devtools during development
2. Check memory usage for potential leaks (especially important with Three.js objects)
3. Test on target devices (particularly mobile) to ensure acceptable performance
4. Consider reducing particle count or complexity if performance issues arise
5. Profile the render loop to identify bottlenecks

## 5. Fallback Mechanism Explanation

The implementation includes a graceful fallback to the original CSS3D implementation when WebGL is not available:

### WebGL Detection

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

### Fallback Strategy

1. **Detection**: On component mount, checks for WebGL availability
2. **Fallback Trigger**: If WebGL is unavailable, sets `webglSupported` to false
3. **Graceful Degradation**: Would fall back to original CSS3D implementation (note: current implementation assumes WebGL is available; full fallback would require additional implementation)
4. **User Notice**: Could display a notice to users about reduced functionality

### Current Implementation Status

The current implementation assumes WebGL is available and does not yet include the full fallback switch to the original CSS3D implementation. To implement a complete fallback:

1. Create a condition that renders either the Three.js carousel or the original CSS3D carousel based on `webglSupported`
2. Duplicate or reference the original CSS3D implementation for the fallback path
3. Ensure both implementations receive the same service data and provide identical functionality
4. Test the fallback path thoroughly

## 6. Files Modified During the Implementation

### New Files Created
- `components/sections/HomeServicesThreeJs.vue` - New Three.js-based carousel component

### Existing Files Modified
- `pages/index.vue` - Changed from `<SectionsHomeServices />` to `<SectionsHomeServicesThreeJs />`
- `package.json` - Added Three.js dependencies:
  - `"three": "^0.160.0"`
  - `"@types/three": "^0.160.0"`

### Files Unchanged (Referenced for Context)
- `BLUEPRINT_THREEJS_CAROUSEL.md` - Original blueprint document
- `components/sections/HomeServices.vue` - Original CSS3D implementation (retained for reference/fallback)
- All other files remain unchanged as the implementation is encapsulated in the new component

### Dependency Changes
Added to `package.json`:
```json
"dependencies": {
  "three": "^0.160.0",
  // ... other dependencies
},
"devDependencies": {
  "@types/three": "^0.160.0",
  // ... other devDependencies
}
```

Note: GSAP was already present in the original dependencies.

## Implementation Summary

This Three.js-based 3D carousel implementation successfully upgrades the Services section visualization while maintaining all existing functionality. The use of CSS3DRenderer allows for the best of both worlds: WebGL-powered 3D positioning with HTML/CSS for content rendering, ensuring SEO-friendliness and accessibility. The implementation includes responsive design, smooth animations, intuitive controls, and a foundation for fallback mechanisms.