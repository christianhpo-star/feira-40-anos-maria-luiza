import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { BottomNavigation } from './components/BottomNavigation'
import { HomePage } from './pages/HomePage'
import { RoutesPage } from './pages/RoutesPage'
import { RouteDetailPage } from './pages/RouteDetailPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ProjectPage } from './pages/ProjectPage'
import { MapPage } from './pages/MapPage'
import { PassportPage } from './pages/PassportPage'
import { TimelinePage } from './pages/TimelinePage'

function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, search])

  return null
}

export default function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rotas" element={<RoutesPage />} />
        <Route path="/rotas/:routeId" element={<RouteDetailPage />} />
        <Route path="/projetos" element={<ProjectsPage />} />
        <Route path="/projeto/:projectId" element={<ProjectPage />} />
        <Route path="/mapa" element={<MapPage />} />
        <Route path="/passaporte" element={<PassportPage />} />
        <Route path="/tempo" element={<TimelinePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <BottomNavigation />
    </div>
  )
}
