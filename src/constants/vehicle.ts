import type { FilterOption, Vehicle, VehicleStatus, VehicleType } from '@/types/vehicle'
import { ref } from 'vue'

export const fleetData = ref<Vehicle[]>([
  {
    id: 1,
    name: 'Delivery Truck 1',
    status: 'active',
    type: 'Truck',
    location: { lat: 37.7749, lng: -122.4194 }, // Market Street
  },
  {
    id: 2,
    name: 'Service Van 1',
    status: 'idle',
    type: 'Van',
    location: { lat: 37.7833, lng: -122.4167 }, // Financial District
  },
  {
    id: 3,
    name: 'Executive Car 1',
    status: 'offline',
    type: 'Car',
    location: { lat: 37.7855, lng: -122.4067 }, // North Beach
  },
  {
    id: 4,
    name: 'Delivery Truck 2',
    status: 'active',
    type: 'Truck',
    location: { lat: 37.7899, lng: -122.4194 }, // Nob Hill
  },
  {
    id: 5,
    name: 'Service Van 2',
    status: 'idle',
    type: 'Van',
    location: { lat: 37.7765, lng: -122.3917 }, // Mission District
  },
  {
    id: 6,
    name: 'Executive Car 2',
    status: 'active',
    type: 'Car',
    location: { lat: 37.7875, lng: -122.4075 }, // Russian Hill
  },
])

export const VEHICLE_ICONS: Record<VehicleType, string> = {
  Truck: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck-icon lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>`,
  Van: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bus-icon lucide-bus"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>`,
  Car: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car-icon lucide-car"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`,
} as const

// Status color mapping
export const VEHICLE_STATUS_COLORS: Record<VehicleStatus, string> = {
  active: 'bg-emerald-500',
  idle: 'bg-amber-500',
  offline: 'bg-red-500',
} as const

// Filter options
export const VEHICLE_STATUS_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'idle', label: 'Idle' },
  { value: 'offline', label: 'Offline' },
] as const

export const VEHICLE_TYPE_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All Types' },
  { value: 'Truck', label: 'Truck' },
  { value: 'Van', label: 'Van' },
  { value: 'Car', label: 'Car' },
] as const

export const fleetSizes = [
  '1-5 vehicles',
  '6-20 vehicles',
  '21-50 vehicles',
  '51-100 vehicles',
  '100+ vehicles',
]
