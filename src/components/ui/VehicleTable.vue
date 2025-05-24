<script setup lang="ts">
import { Route } from 'lucide-vue-next'
import type { Vehicle } from '@/types/vehicle'
import VehicleIcon from './VehicleIcon.vue'
import VehicleStatusBadge from './VehicleStatusBadge.vue'

interface VehicleTableProps {
  vehicles: Vehicle[]
  title?: string
  subtitle?: string
}

const props = withDefaults(defineProps<VehicleTableProps>(), {
  title: 'Fleet Overview',
  subtitle: '',
})

const emit = defineEmits<{
  vehicleClick: [vehicle: Vehicle]
  routeClick: [vehicle: Vehicle]
}>()

// Helper function to get location name
const getLocationName = (location: { lat: number; lng: number }) => {
  const locations: Record<string, string> = {
    '37.7749,-122.4194': 'Market Street',
    '37.7833,-122.4167': 'Financial District',
    '37.7855,-122.4067': 'North Beach',
    '37.7899,-122.4194': 'Nob Hill',
    '37.7765,-122.3917': 'Mission District',
    '37.7875,-122.4075': 'Russian Hill',
  }
  const key = `${location.lat},${location.lng}`
  return locations[key] || 'San Francisco'
}

const handleVehicleClick = (vehicle: Vehicle) => {
  emit('vehicleClick', vehicle)
}

const handleRouteClick = (event: Event, vehicle: Vehicle) => {
  event.stopPropagation()
  emit('routeClick', vehicle)
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
    <div class="p-4 border-b border-slate-100">
      <h3 class="text-lg font-semibold text-slate-800">{{ props.title }}</h3>
      <p v-if="props.subtitle" class="text-sm text-slate-600">{{ props.subtitle }}</p>
      <p v-else class="text-sm text-slate-600">
        Currently tracking {{ props.vehicles.length }} vehicles in San Francisco
      </p>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              Vehicle
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              Type
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              Location
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-slate-200">
          <tr
            v-for="vehicle in props.vehicles"
            :key="vehicle.id"
            class="hover:bg-slate-50 transition-colors cursor-pointer"
            @click="handleVehicleClick(vehicle)"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <VehicleIcon :type="vehicle.type" :status="vehicle.status" />
                <div class="ml-4">
                  <div class="font-medium text-slate-900">{{ vehicle.name }}</div>
                  <div class="text-sm text-slate-500">ID: {{ vehicle.id }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-slate-900">{{ vehicle.type }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <VehicleStatusBadge :status="vehicle.status" />
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
              {{ getLocationName(vehicle.location) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
              <div class="flex space-x-2">
                <button
                  class="p-1 pl-5 hover:bg-slate-100 rounded-md transition-colors"
                  @click="(e) => handleRouteClick(e, vehicle)"
                  :aria-label="`View route for ${vehicle.name}`"
                >
                  <Route class="h-4 w-4 text-purple-600" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
