<script setup lang="ts">
interface FeatureCardProps {
  title: string
  description: string
  icon: string
  iconColor?: string
}

const props = withDefaults(defineProps<FeatureCardProps>(), {
  iconColor: 'text-emerald-600',
})
</script>

<template>
  <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
    <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
      <svg
        class="h-6 w-6"
        :class="props.iconColor"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="props.icon" />
      </svg>
    </div>
    <h3 class="text-lg font-semibold text-slate-800 mb-2">{{ props.title }}</h3>
    <p class="text-slate-600">{{ props.description }}</p>
  </div>
</template>
