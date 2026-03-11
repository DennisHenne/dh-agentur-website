<template>
  <component
    :is="tag"
    v-bind="tagProps"
    class="inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 active:scale-95"
    :class="[sizeClasses, variantClasses]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  to?: string
  type?: 'button' | 'submit' | 'reset'
}>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
})

const tag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

const tagProps = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href, target: '_blank', rel: 'noopener' }
  return { type: props.type }
})

const sizeClasses = computed(() => ({
  sm: 'rounded-full px-4 py-2 text-xs',
  md: 'rounded-full px-6 py-3 text-sm',
  lg: 'rounded-full px-8 py-4 text-base',
}[props.size]))

const variantClasses = computed(() => ({
  primary: 'bg-brand-600 text-white hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-600/30',
  secondary: 'border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/10',
  outline: 'border border-brand-500 text-brand-400 hover:bg-brand-600 hover:text-white',
  ghost: 'text-white/70 hover:text-white hover:bg-white/5',
}[props.variant]))
</script>
