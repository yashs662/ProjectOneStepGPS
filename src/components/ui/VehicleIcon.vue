<script setup lang="ts">
import { computed } from 'vue'
import { BusIcon, CarIcon, TruckIcon } from 'lucide-vue-next'
import type { Vehicle } from '@/types/vehicle'

interface VehicleIconProps {
  type: Vehicle['type']
  status: Vehicle['status']
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<VehicleIconProps>(), {
  size: 'md',
})

const iconComponent = computed(() => {
  switch (props.type) {
    case 'Truck':
      return TruckIcon
    case 'Van':
      return BusIcon
    case 'Car':
      return CarIcon
    default:
      return CarIcon
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-6 w-6'
    case 'md':
      return 'h-10 w-10'
    case 'lg':
      return 'h-12 w-12'
    default:
      return 'h-10 w-10'
  }
})

const statusClasses = computed(() => {
  const baseClasses = 'rounded-full p-2'

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
  <component :is="iconComponent" :class="[sizeClasses, statusClasses]" />
</template>
