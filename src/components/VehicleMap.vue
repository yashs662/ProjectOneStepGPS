<script setup lang="ts">
import { ref, onMounted, markRaw, watch } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { Filter, ChevronDown } from 'lucide-vue-next'
import type { Vehicle } from '@/types/vehicle'
import { MAP_CONFIG } from '@/constants/map'
import { VEHICLE_ICONS, VEHICLE_STATUS_OPTIONS, VEHICLE_TYPE_OPTIONS } from '@/constants/vehicle'

const props = defineProps<{
  apiKey: string
  vehicles?: Vehicle[]
  mapId: string
  selectedStatus?: string
  selectedType?: string
}>()

// Emits
const emit = defineEmits<{
  'marker-click': [vehicle: Vehicle]
  error: [error: string]
  'filter-change': [filters: { status: string; type: string }]
}>()

const map = ref<google.maps.Map | null>(null)
const parser = new DOMParser()
const markers = ref<Map<number, google.maps.marker.AdvancedMarkerElement>>(new Map())
const mapLoaded = ref(false)
const isInitializing = ref(false)
const initializationError = ref<string | null>(null)
let AdvancedMarkerElementRef: typeof google.maps.marker.AdvancedMarkerElement | null = null

// Local filter state that syncs with parent
const localSelectedStatus = ref(props.selectedStatus || 'all')
const localSelectedType = ref(props.selectedType || 'all')

// Watch for prop changes and sync local state
watch(
  () => props.selectedStatus,
  (newStatus) => {
    if (newStatus !== undefined) {
      localSelectedStatus.value = newStatus
    }
  },
)

watch(
  () => props.selectedType,
  (newType) => {
    if (newType !== undefined) {
      localSelectedType.value = newType
    }
  },
)

// Watch for vehicles prop changes and update markers
watch(
  () => props.vehicles,
  (newVehicles) => {
    if (map.value && mapLoaded.value && newVehicles && AdvancedMarkerElementRef) {
      // Clear existing markers
      clearMarkers()

      // Create new markers
      newVehicles.forEach((vehicle) => {
        const marker = new AdvancedMarkerElementRef!({
          map: map.value!,
          position: vehicle.location,
          title: vehicle.name,
          content: getVehicleIcon(vehicle),
        })
        marker.addListener('click', () => {
          emit('marker-click', vehicle)
        })
        markers.value.set(vehicle.id, marker)
      })

      // Apply current filters
      updateMarkerVisibility()
    }
  },
  { deep: true },
)

// Emit filter changes to parent
watch([localSelectedStatus, localSelectedType], ([status, type]) => {
  emit('filter-change', { status, type })
  updateMarkerVisibility()
})

// Function to check if vehicle matches current filters
const vehicleMatchesFilters = (vehicle: Vehicle) => {
  const statusMatch =
    localSelectedStatus.value === 'all' || vehicle.status === localSelectedStatus.value
  const typeMatch = localSelectedType.value === 'all' || vehicle.type === localSelectedType.value
  return statusMatch && typeMatch
}

// Update marker visibility based on filters
const updateMarkerVisibility = () => {
  if (!map.value || !mapLoaded.value) return

  markers.value.forEach((marker, vehicleId) => {
    const vehicle = props.vehicles?.find((v) => v.id === vehicleId)
    if (vehicle) {
      const shouldShow = vehicleMatchesFilters(vehicle)
      marker.map = shouldShow ? map.value : null
    }
  })
}

// Method to center map on a vehicle
const centerOnVehicle = (vehicle: Vehicle) => {
  if (!map.value || !mapLoaded.value) return
  map.value.panTo(vehicle.location)

  const currentZoom = map.value.getZoom()
  if (currentZoom !== undefined && currentZoom < 15) {
    map.value.setZoom(15)
  }
}

// Reset filters
const resetFilters = () => {
  localSelectedStatus.value = 'all'
  localSelectedType.value = 'all'
}

// Clear all markers
function clearMarkers(): void {
  markers.value.forEach((marker) => {
    marker.map = null
  })
  markers.value.clear()
}

// Cleanup function
function cleanup(): void {
  clearMarkers()
  map.value = null
  mapLoaded.value = false
}

// Expose public methods
defineExpose({
  centerOnVehicle,
  resetFilters,
  cleanup,
})

// Initialize map
onMounted(async () => {
  if (mapLoaded.value) return
  async function initMap(): Promise<void> {
    if (!props.apiKey) {
      console.error('Google Maps API key is required')
      return
    }
    if (!props.mapId) {
      console.error('Google Maps map ID is required')
      return
    }

    isInitializing.value = true
    initializationError.value = null

    const loader = new Loader({
      apiKey: props.apiKey,
      version: 'weekly',
      libraries: ['maps', 'marker'],
      mapIds: [props.mapId],
    })

    // Request needed libraries.
    const { Map } = (await loader.importLibrary('maps')) as google.maps.MapsLibrary
    const { AdvancedMarkerElement } = (await loader.importLibrary(
      'marker',
    )) as google.maps.MarkerLibrary

    // Store reference for later use
    AdvancedMarkerElementRef = AdvancedMarkerElement

    // Create map options object
    const mapOptions: google.maps.MapOptions = {
      center: MAP_CONFIG.defaultCenter,
      zoom: MAP_CONFIG.defaultZoom,
      mapId: props.mapId,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
      gestureHandling: 'greedy',
    }

    const MyMap = new Map(document.getElementById('map') as HTMLElement, mapOptions)
    map.value = markRaw(MyMap)
    mapLoaded.value = true

    // Create markers for each vehicle
    if (props.vehicles) {
      props.vehicles.forEach((vehicle) => {
        const marker = new AdvancedMarkerElement({
          map: MyMap,
          position: vehicle.location,
          title: vehicle.name,
          content: getVehicleIcon(vehicle),
        })
        marker.addListener('click', () => {
          emit('marker-click', vehicle)
        })
        markers.value.set(vehicle.id, marker)
      })
    }

    console.log('Map initialized successfully')
  }

  await initMap()
})

const getVehicleIcon = (vehicle: Vehicle) => {
  const pinDiv = document.createElement('div')
  const statusColor = getStatusColor(vehicle.status)
  pinDiv.className = `w-10 h-10 flex items-center justify-center rounded-full p-2 ${statusColor} border-2 border-white shadow-lg`
  const pinSvgString = VEHICLE_ICONS[vehicle.type]
  const pinSvg = parser.parseFromString(pinSvgString, 'image/svg+xml')
  const pinSvgElement = pinSvg.documentElement
  pinDiv.appendChild(pinSvgElement)
  return pinDiv
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-emerald-500'
    case 'idle':
      return 'bg-amber-500'
    case 'offline':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}
</script>

<template>
  <div class="relative w-full" style="height: 600px">
    <!-- Map Container -->
    <div id="map" class="absolute inset-0 rounded-xl bg-white shadow-lg"></div>

    <!-- Filter Controls -->
    <div
      v-if="mapLoaded && !initializationError"
      class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 space-y-4 min-w-[240px] z-10"
      role="region"
      aria-label="Vehicle filters"
    >
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <Filter class="text-emerald-800 h-5 w-5" aria-hidden="true" />
          <h3 class="text-sm font-semibold text-slate-800">Filter Vehicles</h3>
        </div>
        <div
          class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full"
          role="status"
          aria-live="polite"
        >
          {{ props.vehicles?.filter(vehicleMatchesFilters).length || 0 }} vehicles
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <label for="status-filter" class="block text-xs font-medium text-slate-600 mb-1.5">
            Status
          </label>
          <div class="relative">
            <select
              id="status-filter"
              v-model="localSelectedStatus"
              class="w-full rounded-lg border-slate-200 bg-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm py-2 pl-3 pr-8 appearance-none"
              aria-describedby="status-help"
            >
              <option
                v-for="status in VEHICLE_STATUS_OPTIONS"
                :key="status.value"
                :value="status.value"
              >
                {{ status.label }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown class="h-4 w-4 text-slate-400" aria-hidden="true" />
            </div>
          </div>
          <p id="status-help" class="sr-only">Filter vehicles by their current status</p>
        </div>

        <div>
          <label for="type-filter" class="block text-xs font-medium text-slate-600 mb-1.5">
            Vehicle Type
          </label>
          <div class="relative">
            <select
              id="type-filter"
              v-model="localSelectedType"
              class="w-full rounded-lg border-slate-200 bg-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm py-2 pl-3 pr-8 appearance-none"
              aria-describedby="type-help"
            >
              <option v-for="type in VEHICLE_TYPE_OPTIONS" :key="type.value" :value="type.value">
                {{ type.label }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown class="h-4 w-4 text-slate-400" aria-hidden="true" />
            </div>
          </div>
          <p id="type-help" class="sr-only">Filter vehicles by their type</p>
        </div>
      </div>

      <div class="pt-2 border-t border-slate-100">
        <button
          @click="resetFilters"
          class="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200 shadow-sm hover:shadow-md"
          type="button"
        >
          Reset Filters
        </button>
      </div>
    </div>

    <!-- Legend -->
    <div
      v-if="mapLoaded && !initializationError"
      class="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 space-y-3 text-sm z-10"
      role="region"
      aria-label="Map legend"
    >
      <div class="text-slate-800 font-medium">Vehicle Status</div>
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <span class="w-4 h-4 rounded-full bg-emerald-500" aria-hidden="true"></span>
          <span class="text-slate-700">Active</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-4 h-4 rounded-full bg-amber-500" aria-hidden="true"></span>
          <span class="text-slate-700">Idle</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-4 h-4 rounded-full bg-red-500" aria-hidden="true"></span>
          <span class="text-slate-700">Offline</span>
        </div>
      </div>
    </div>
  </div>
</template>
