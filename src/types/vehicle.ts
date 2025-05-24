export type VehicleStatus = 'active' | 'idle' | 'offline'
export type VehicleType = 'Truck' | 'Van' | 'Car'

export interface Vehicle {
  id: number
  name: string
  status: VehicleStatus
  type: VehicleType
  location: {
    lat: number
    lng: number
  }
}

export interface FilterOption {
  value: string
  label: string
}

export interface MapConfig {
  defaultCenter: {
    lat: number
    lng: number
  }
  defaultZoom: number
  focusZoom: number
  mapOptions: Record<string, unknown>
}
