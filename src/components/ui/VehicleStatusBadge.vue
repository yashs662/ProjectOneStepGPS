<script setup lang="ts">
import { computed } from 'vue'
import type { Vehicle } from '@/types/vehicle'

interface VehicleStatusBadgeProps {
  status: Vehicle['status']
}

const props = defineProps<VehicleStatusBadgeProps>()

const badgeClasses = computed(() => {
  const baseClasses = 'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full'

  switch (props.status) {
    case 'active':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'idle':
      return `${baseClasses} bg-amber-100 text-amber-800`
    case 'offline':
      return `${baseClasses} bg-red-100 text-red-800`
    default:
      return `${baseClasses} bg-slate-100 text-slate-800`
  }
})
</script>

<template>
  <span :class="badgeClasses">
    {{ status }}
  </span>
</template>
