import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { loadActiveRoute, loadCurrentLocation, loadVisited, saveActiveRoute, saveCurrentLocation, saveVisited } from '../services/storage'

interface ProgressContextValue {
  visited: string[]
  currentLocation: string | null
  activeRoute: string | null
  toggleVisited: (projectId: string) => void
  markVisited: (projectId: string) => void
  setCurrentLocation: (locationId: string | null) => void
  setActiveRoute: (routeId: string | null) => void
  resetProgress: () => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [visited, setVisited] = useState<string[]>(() => loadVisited())
  const [currentLocationState, setCurrentLocationState] = useState<string | null>(() => loadCurrentLocation())
  const [activeRouteState, setActiveRouteState] = useState<string | null>(() => loadActiveRoute())

  const setCurrentLocation = (locationId: string | null) => {
    setCurrentLocationState(locationId)
    saveCurrentLocation(locationId)
  }

  const setActiveRoute = (routeId: string | null) => {
    setActiveRouteState(routeId)
    saveActiveRoute(routeId)
  }

  const updateVisited = (next: string[]) => {
    setVisited(next)
    saveVisited(next)
  }

  const toggleVisited = (projectId: string) => {
    updateVisited(visited.includes(projectId) ? visited.filter((id) => id !== projectId) : [...visited, projectId])
  }

  const markVisited = (projectId: string) => {
    if (!visited.includes(projectId)) updateVisited([...visited, projectId])
  }

  const resetProgress = () => {
    updateVisited([])
    setCurrentLocation(null)
    setActiveRoute(null)
  }

  const value = useMemo(() => ({
    visited,
    currentLocation: currentLocationState,
    activeRoute: activeRouteState,
    toggleVisited,
    markVisited,
    setCurrentLocation,
    setActiveRoute,
    resetProgress
  }), [visited, currentLocationState, activeRouteState])

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const value = useContext(ProgressContext)
  if (!value) throw new Error('useProgress precisa estar dentro de ProgressProvider')
  return value
}
