import { Route, Routes } from 'react-router-dom'
import { BottomNavigation } from './components/BottomNavigation'
import { HomePage } from './pages/HomePage'
import { RoutesPage } from './pages/RoutesPage'
import { RouteDetailPage } from './pages/RouteDetailPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ProjectPage } from './pages/ProjectPage'
import { MapPage } from './pages/MapPage'
import { PassportPage } from './pages/PassportPage'
import { TimelinePage } from './pages/TimelinePage'

export default function App() {
  return (
    <div className="app-shell">
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
