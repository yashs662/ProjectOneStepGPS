<script setup lang="ts">
import { ref, computed } from 'vue'
import VehicleMap from '../VehicleMap.vue'
import VehicleTable from '../ui/VehicleTable.vue'
import FeatureCard from '../ui/FeatureCard.vue'
import type { Vehicle } from '@/types/vehicle'
import { fleetData } from '@/constants/vehicle'
import { demoFeatures } from '@/constants/demo'
import { useVehicleFiltering } from '@/composables/useVehicleFiltering'

const { selectedStatus, selectedType, filteredVehicles, setFilters } = useVehicleFiltering(
  fleetData.value,
)
const vehicleMapRef = ref<InstanceType<typeof VehicleMap> | null>(null)

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const mapId = computed(() => import.meta.env.VITE_GOOGLE_MAPS_MAP_ID)

const centerMapOnVehicle = (vehicle: Vehicle) => {
  vehicleMapRef.value?.centerOnVehicle(vehicle)
}

const handleFilterChange = (filters: { status: string; type: string }) => {
  setFilters(filters)
}

const handleVehicleSelect = (vehicle: Vehicle) => {
  centerMapOnVehicle(vehicle)
}

const handleVehicleRoute = (vehicle: Vehicle) => {
  // In a real app, this would show the vehicle's route history
  console.log('Show route for vehicle:', vehicle.id)
}
</script>

<template>
  <section class="py-10 bg-slate-50" id="demo">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <div
          class="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4"
        >
          Live Demo
        </div>
        <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-slate-800">
          See our fleet tracking in action
        </h2>
        <p class="text-xl text-slate-600 max-w-3xl mx-auto">
          Watch how our real-time GPS tracking system helps you monitor and manage your fleet
          efficiently.
        </p>
      </div>

      <div class="max-w-7xl mx-auto">
        <div class="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100">
          <VehicleMap
            ref="vehicleMapRef"
            :api-key="apiKey"
            :vehicles="fleetData"
            :map-id="mapId"
            :selected-status="selectedStatus"
            :selected-type="selectedType"
            @marker-click="centerMapOnVehicle"
            @filter-change="handleFilterChange"
          />
        </div>

        <!-- Vehicle List Table -->
        <VehicleTable
          :vehicles="filteredVehicles"
          @vehicle-click="handleVehicleSelect"
          @route-click="handleVehicleRoute"
          class="mt-8"
        />

        <!-- Feature Highlights -->
        <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            v-for="feature in demoFeatures"
            :key="feature.title"
            :title="feature.title"
            :description="feature.description"
            :icon="feature.icon"
          />
        </div>
      </div>
    </div>
  </section>
</template>
