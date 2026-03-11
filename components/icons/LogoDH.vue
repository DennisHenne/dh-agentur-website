<template>
  <!-- uid makes clipPath IDs unique per instance — prevents conflicts when logo appears multiple times -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="112 130 148 136"
    preserveAspectRatio="xMidYMid meet"
    :width="size"
    :height="size"
    aria-label="DH Agentur Logo"
    role="img"
  >
    <defs>
      <clipPath :id="`${uid}-a`"><path d="M 151.359375 156.609375 L 202.753906 156.609375 L 202.753906 259.601562 L 151.359375 259.601562 Z" clip-rule="nonzero"/></clipPath>
      <clipPath :id="`${uid}-b`"><path d="M 202.753906 208.054688 L 151.359375 259.5 L 151.359375 156.609375 Z" clip-rule="nonzero"/></clipPath>
      <clipPath :id="`${uid}-c`"><path d="M 199.253906 155.488281 L 228.363281 155.488281 L 228.363281 258.398438 L 199.253906 258.398438 Z" clip-rule="nonzero"/></clipPath>
      <clipPath :id="`${uid}-d`"><path d="M 228.363281 206.933594 L 199.253906 258.378906 L 199.253906 155.488281 Z" clip-rule="nonzero"/></clipPath>
      <clipPath :id="`${uid}-e`"><path d="M 225.359375 155.453125 L 254.472656 155.453125 L 254.472656 258.367188 L 225.359375 258.367188 Z" clip-rule="nonzero"/></clipPath>
      <clipPath :id="`${uid}-f`"><path d="M 225.359375 206.921875 L 254.472656 155.476562 L 254.472656 258.367188 Z" clip-rule="nonzero"/></clipPath>
      <clipPath :id="`${uid}-g`"><path d="M 253.582031 156.140625 L 254.039062 156.140625 L 254.039062 157.058594 L 253.582031 157.058594 Z" clip-rule="nonzero"/></clipPath>
      <clipPath :id="`${uid}-h`"><path d="M 254.023438 157.050781 C 253.050781 156.375 254.023438 156.148438 254.023438 156.148438" clip-rule="nonzero"/></clipPath>
      <clipPath :id="`${uid}-i`"><path d="M 151.238281 157.933594 L 151.597656 157.933594 L 151.597656 158.261719 L 151.238281 158.261719 Z" clip-rule="nonzero"/></clipPath>
      <clipPath :id="`${uid}-j`"><path d="M 151.574219 158.175781 C 150.898438 158.398438 151.5 157.949219 151.5 157.949219" clip-rule="nonzero"/></clipPath>
    </defs>

    <g :clip-path="`url(#${uid}-a)`"><g :clip-path="`url(#${uid}-b)`">
      <path fill="currentColor" d="M 202.753906 156.609375 L 202.753906 259.402344 L 151.359375 259.402344 L 151.359375 156.609375 Z" fill-rule="nonzero"/>
    </g></g>
    <g :clip-path="`url(#${uid}-c)`"><g :clip-path="`url(#${uid}-d)`">
      <path fill="currentColor" d="M 228.363281 155.488281 L 228.363281 258.398438 L 199.253906 258.398438 L 199.253906 155.488281 Z" fill-rule="nonzero"/>
    </g></g>
    <g :clip-path="`url(#${uid}-e)`"><g :clip-path="`url(#${uid}-f)`">
      <path fill="currentColor" d="M 225.359375 258.367188 L 225.359375 155.453125 L 254.472656 155.453125 L 254.472656 258.367188 Z" fill-rule="nonzero"/>
    </g></g>

    <path stroke-linecap="round" transform="matrix(0, 0.75, -0.75, 0, 121.069091, 138.855284)" fill="none" stroke-linejoin="miter" d="M 1.500247 1.498371 L 134.255464 1.498371" stroke="currentColor" stroke-width="3" stroke-miterlimit="4"/>
    <path stroke-linecap="round" transform="matrix(0.641732, 0.388175, -0.388175, 0.641732, 120.387126, 137.890757)" fill="none" stroke-linejoin="miter" d="M 1.499203 1.503415 L 49.066232 1.498131" stroke="currentColor" stroke-width="3" stroke-miterlimit="4"/>
    <path stroke-linecap="round" transform="matrix(0.000000001309, -0.75, 0.75, 0.000000001309, 167.004514, 197.763385)" fill="none" stroke-linejoin="miter" d="M 1.502222 1.499189 L 77.913686 1.499189" stroke="currentColor" stroke-width="3" stroke-miterlimit="4"/>
    <path stroke-linecap="round" transform="matrix(0.644324, 0.383858, -0.383858, 0.644324, 168.297913, 137.241041)" fill="none" stroke-linejoin="miter" d="M 1.499984 1.502869 L 48.096917 1.503063" stroke="currentColor" stroke-width="3" stroke-miterlimit="4"/>
    <path stroke-linecap="round" transform="matrix(0.648109, 0.377432, -0.377432, 0.648109, 222.846215, 137.049233)" fill="none" stroke-linejoin="miter" d="M 1.500852 1.497024 L 47.813886 1.497722" stroke="currentColor" stroke-width="3" stroke-miterlimit="4"/>
    <path stroke-linecap="round" transform="matrix(0.645783, 0.381397, -0.381397, 0.645783, 120.376974, 239.175716)" fill="none" stroke-linejoin="miter" d="M 1.498752 1.498193 L 47.863441 1.498571" stroke="currentColor" stroke-width="3" stroke-miterlimit="4"/>
    <path stroke-linecap="round" transform="matrix(0.645783, 0.381397, -0.381397, 0.645783, 168.294221, 237.980728)" fill="none" stroke-linejoin="miter" d="M 1.502009 1.501816 L 47.86405 1.49771" stroke="currentColor" stroke-width="3" stroke-miterlimit="4"/>
    <path stroke-linecap="round" transform="matrix(0.645783, 0.381397, -0.381397, 0.645783, 223.028265, 238.306962)" fill="none" stroke-linejoin="miter" d="M 1.501023 1.499278 L 47.865713 1.499656" stroke="currentColor" stroke-width="3" stroke-miterlimit="4"/>
    <path stroke-linecap="round" transform="matrix(0.352185, -0.662167, 0.662167, 0.352185, 202.764234, 173.081501)" fill="none" stroke-linejoin="miter" d="M 1.498844 1.4997 L 53.25225 1.49939" stroke="currentColor" stroke-width="3" stroke-miterlimit="4"/>
    <path stroke-linecap="round" transform="matrix(0.351343, 0.662615, -0.662615, 0.351343, 212.453076, 217.111246)" fill="none" stroke-linejoin="miter" d="M 1.499623 1.502506 L 33.069871 1.499832" stroke="currentColor" stroke-width="3" stroke-miterlimit="4"/>
    <path stroke-linecap="round" transform="matrix(0.000000001309, 0.75, -0.75, 0.000000001309, 255.144537, 155.488394)" fill="none" stroke-linejoin="miter" d="M 1.49985 1.500008 L 135.687359 1.500008" stroke="currentColor" stroke-width="3" stroke-miterlimit="4"/>
    <path stroke-linecap="round" transform="matrix(0, 0.75, -0.75, 0, 199.595442, 156.567748)" fill="none" stroke-linejoin="miter" d="M 1.498211 1.502256 L 132.857595 1.502256" stroke="currentColor" stroke-width="3" stroke-miterlimit="4"/>
    <path stroke-linecap="round" transform="matrix(0.000000001309, 0.75, -0.75, 0.000000001309, 151.677988, 156.417955)" fill="none" stroke-linejoin="miter" d="M 1.500019 1.497734 L 135.687528 1.497735" stroke="currentColor" stroke-width="3" stroke-miterlimit="4"/>

    <g :clip-path="`url(#${uid}-i)`"><g :clip-path="`url(#${uid}-j)`">
      <path fill="currentColor" d="M 147.898438 154.949219 L 154.65625 154.949219 L 154.65625 161.476562 L 147.898438 161.476562 Z" fill-rule="nonzero"/>
    </g></g>
    <g :clip-path="`url(#${uid}-g)`"><g :clip-path="`url(#${uid}-h)`">
      <path fill="currentColor" d="M 250.050781 153.148438 L 257.03125 153.148438 L 257.03125 160.050781 L 250.050781 160.050781 Z" fill-rule="nonzero"/>
    </g></g>
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: string | number }>(), { size: 32 })
// Unique ID per instance so clipPath refs never conflict across multiple logos on same page
const uid = `dh-${Math.random().toString(36).slice(2, 7)}`
</script>
