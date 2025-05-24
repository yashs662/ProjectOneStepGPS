import type { MapConfig } from '@/types/vehicle'

// Map configuration constants
export const MAP_CONFIG: MapConfig = {
  defaultCenter: {
    lat: 37.784312,
    lng: -122.407938, // San Francisco, CA
  },
  defaultZoom: 14,
  focusZoom: 15,
  mapOptions: {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: 'RIGHT_CENTER',
    },
    gestureHandling: 'greedy',
  },
} as const

// CSS classes
export const MARKER_BASE_CLASSES =
  'w-10 h-10 flex items-center justify-center rounded-full p-2 border-2 border-white shadow-lg' as const

// API configuration
export const GOOGLE_MAPS_CONFIG = {
  version: 'weekly',
  libraries: ['maps', 'marker'] as ('maps' | 'marker')[],
} as const
