import type { Vehicle } from '@/types/vehicle'

/**
 * Checks if a vehicle matches the given filters
 */
export function vehicleMatchesFilters(
  vehicle: Vehicle,
  statusFilter: string,
  typeFilter: string,
): boolean {
  const statusMatch = statusFilter === 'all' || vehicle.status === statusFilter
  const typeMatch = typeFilter === 'all' || vehicle.type === typeFilter
  return statusMatch && typeMatch
}

/**
 * Debounce utility function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Scroll to a specific section of the page - assumes everything is happening on the same page for the sake of this demo
 */
export const scrollToSection = (event: Event, href: string) => {
  event.preventDefault()
  const element = document.querySelector(href)
  if (element) {
    // Navbar height (16 tailwind units = 64px by default)
    const navbarHeight = 80
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - navbarHeight

    // Scroll to the adjusted position
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

/**
 * Scroll to the top of the page
 */
export const scrollToTop = (event: Event) => {
  event.preventDefault()
  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
