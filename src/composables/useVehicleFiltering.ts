import { ref, computed } from 'vue'
import type { Vehicle } from '@/types/vehicle'

export function useVehicleFiltering(vehicles: Vehicle[]) {
  const selectedStatus = ref<string>('all')
  const selectedType = ref<string>('all')

  const filteredVehicles = computed(() => {
    return vehicles.filter((vehicle) => {
      const statusMatch = selectedStatus.value === 'all' || vehicle.status === selectedStatus.value
      const typeMatch = selectedType.value === 'all' || vehicle.type === selectedType.value
      return statusMatch && typeMatch
    })
  })

  const setFilters = (filters: { status?: string; type?: string }) => {
    if (filters.status !== undefined) {
      selectedStatus.value = filters.status
    }
    if (filters.type !== undefined) {
      selectedType.value = filters.type
    }
  }

  const resetFilters = () => {
    selectedStatus.value = 'all'
    selectedType.value = 'all'
  }

  return {
    selectedStatus,
    selectedType,
    filteredVehicles,
    setFilters,
    resetFilters,
  }
}
