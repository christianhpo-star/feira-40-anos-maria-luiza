const VISITED_KEY = 'feira40.visitedProjects'
const LOCATION_KEY = 'feira40.currentLocation'
const ROUTE_KEY = 'feira40.activeRoute'

export function loadVisited(): string[] {
  try {
    const raw = localStorage.getItem(VISITED_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveVisited(ids: string[]) {
  localStorage.setItem(VISITED_KEY, JSON.stringify(ids))
}

export function loadCurrentLocation(): string | null {
  const saved = localStorage.getItem(LOCATION_KEY)
  return saved === 'entrada-croqui' ? 'entrada-pais' : saved
}

export function saveCurrentLocation(id: string | null) {
  if (id) localStorage.setItem(LOCATION_KEY, id)
  else localStorage.removeItem(LOCATION_KEY)
}

export function loadActiveRoute(): string | null {
  return localStorage.getItem(ROUTE_KEY)
}

export function saveActiveRoute(id: string | null) {
  if (id) localStorage.setItem(ROUTE_KEY, id)
  else localStorage.removeItem(ROUTE_KEY)
}
