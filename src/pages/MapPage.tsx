import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { ProjectCard } from '../components/ProjectCard'
import { useProgress } from '../context/ProgressContext'
import { projects } from '../data/projects'
import { locationById } from '../data/locations'
import { SchoolMap, type SchoolMapView } from '../map/SchoolMap'

const groupLabels: Record<string, string> = {
  'bloco-01': 'Bloco 1',
  'bloco-02': 'Bloco 2',
  'bloco-03': 'Bloco 3',
  refeitorio: 'Refeitório / Cantina',
  laboratorio: 'Laboratório de Química',
  'area-externa': 'Área externa'
}

export function MapPage() {
  const [params] = useSearchParams()
  const destination = params.get('destino')
  const destinationLocation = destination ? locationById[destination] : null
  const initialView: SchoolMapView = destination?.startsWith('sala-') || destination === 'laboratorio-ciencias' ? 'rooms' : 'campus'
  const { currentLocation, visited, setCurrentLocation } = useProgress()
  const currentLocationData = currentLocation ? locationById[currentLocation] : null
  const [view, setView] = useState<SchoolMapView>(initialView)
  const [zone, setZone] = useState<string | null>(null)

  useEffect(() => {
    if (destination?.startsWith('sala-') || destination === 'laboratorio-ciencias') setView('rooms')
  }, [destination])

  const zoneProjects = useMemo(() => {
    if (!zone) return []
    if (zone === 'laboratorio') return projects.filter((project) => project.locationIds.includes('laboratorio-ciencias'))
    if (zone === 'bloco-01') return projects.filter((project) => project.blockId === zone || project.locationIds.includes('laboratorio-ciencias'))
    return projects.filter((project) => project.blockId === zone)
  }, [zone])

  return (
    <main id="conteudo" className="page">
      <PageHeader title="Mapa da escola" subtitle="Encontre blocos, salas e áreas de visitação." />

      {currentLocationData && (
        <section className="current-location-card" aria-label="Localização atual">
          <span className="eyebrow">Você está aqui</span>
          <strong>{currentLocationData.label}</strong>
        </section>
      )}

      <div className="floor-summary" aria-label="Resumo dos andares">
        <span><strong>1º andar</strong>Cantina / Refeitório</span>
        <span><strong>2º andar</strong>Salas de exposição</span>
      </div>

      {destinationLocation && (
        <section className="destination-card" aria-label="Destino selecionado">
          <span className="eyebrow">Seu destino</span>
          <strong>{destinationLocation.label}</strong>
          {destinationLocation.floor && <span>{destinationLocation.floor}</span>}
        </section>
      )}

      <div className="map-view-tabs" role="tablist" aria-label="Escolher tipo de mapa">
        <button type="button" className={view === 'campus' ? 'map-view-tab is-active' : 'map-view-tab'} onClick={() => setView('campus')} role="tab" aria-selected={view === 'campus'}>
          Visão geral
        </button>
        <button type="button" className={view === 'rooms' ? 'map-view-tab is-active' : 'map-view-tab'} onClick={() => setView('rooms')} role="tab" aria-selected={view === 'rooms'}>
          Blocos e salas
        </button>
      </div>

      <SchoolMap view={view} destinationId={destination} onZoneSelect={setZone} />

      {zone && (
        <section className="section-block map-projects-panel" aria-live="polite">
          <div className="section-heading-row">
            <h2 className="section-title">Exposições · {groupLabels[zone] ?? 'área selecionada'}</h2>
            <button type="button" className="text-button" onClick={() => setZone(null)}>Fechar</button>
          </div>
          <div className="project-list">
            {zoneProjects.map((project) => <ProjectCard key={project.id} project={project} visited={visited.includes(project.id)} compact />)}
          </div>
        </section>
      )}

      <section className="visitor-tip">
        <span aria-hidden="true">⌖</span>
        <div>
          <strong>Localização pelo QR Code</strong>
          <p>Ao escanear o QR de uma sala, o mapa destaca onde você está e ajuda a encontrar a próxima parada.</p>
        </div>
      </section>

      <section className="visitor-tip visitor-tip--attention">
        <span aria-hidden="true">↟</span>
        <div>
          <strong>Acesso ao 2º andar</strong>
          <p>O acesso às salas do 2º andar é feito por escadas. A escola não possui elevador ou rampa para esse pavimento. Se precisar de apoio, procure nossa equipe.</p>
        </div>
      </section>

      {!currentLocation && (
        <button type="button" className="button button--secondary button--full" onClick={() => setCurrentLocation('entrada-pais')}>Estou na entrada principal</button>
      )}
    </main>
  )
}
