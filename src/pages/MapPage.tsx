import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { ProjectCard } from '../components/ProjectCard'
import { useProgress } from '../context/ProgressContext'
import { projects } from '../data/projects'
import { locationById } from '../data/locations'
import { SchoolMap, type SchoolMapView } from '../map/SchoolMap'

const projectGroups: Record<string, string[]> = {
  'bloco-01': ['bloco-01'],
  'bloco-02': ['bloco-02'],
  'bloco-03': ['bloco-03'],
  refeitorio: ['refeitorio'],
  'area-externa': ['area-externa']
}

const groupLabels: Record<string, string> = {
  'bloco-01': 'Bloco 1',
  'bloco-02': 'Bloco 2',
  'bloco-03': 'Bloco 3',
  refeitorio: 'Refeitório / Cantina',
  'area-externa': 'Área externa'
}

export function MapPage() {
  const [params] = useSearchParams()
  const destination = params.get('destino')
  const destinationLocation = destination ? locationById[destination] : null
  const initialView: SchoolMapView = destination?.startsWith('sala-') ? 'rooms' : 'campus'
  const { currentLocation, visited, setCurrentLocation } = useProgress()
  const [view, setView] = useState<SchoolMapView>(initialView)
  const [zone, setZone] = useState<string | null>(null)

  useEffect(() => {
    if (destination?.startsWith('sala-')) setView('rooms')
  }, [destination])

  const zoneProjects = useMemo(() => zone ? projects.filter((project) => projectGroups[zone]?.includes(project.blockId)) : [], [zone])

  return (
    <main id="conteudo" className="page">
      <PageHeader title="Mapa da escola" subtitle="Dois mapas complementares para orientar a visita." />

      {destinationLocation && (
        <section className="destination-card">
          <span className="eyebrow">Seu destino</span>
          <strong>{destinationLocation.label}</strong>
          {destinationLocation.floor && <span>{destinationLocation.floor}</span>}
          {destinationLocation.pending && <span>Detalhe ainda sujeito a confirmação no local.</span>}
        </section>
      )}

      <div className="map-view-tabs" role="tablist" aria-label="Escolher tipo de mapa">
        <button className={view === 'campus' ? 'map-view-tab is-active' : 'map-view-tab'} onClick={() => setView('campus')} role="tab" aria-selected={view === 'campus'}>
          Mapa geral
        </button>
        <button className={view === 'rooms' ? 'map-view-tab is-active' : 'map-view-tab'} onClick={() => setView('rooms')} role="tab" aria-selected={view === 'rooms'}>
          Blocos e salas
        </button>
      </div>

      <SchoolMap view={view} destinationId={destination} onZoneSelect={setZone} />

      <section className="notice notice--soft">
        <strong>Como funciona “Você está aqui”?</strong>
        <p>O app não usa GPS. Ao abrir um QR Code instalado em uma sala ou ponto da escola, ele atualiza sua localização. O QR principal deve usar o Portão de Entrada de pais e responsáveis como ponto inicial.</p>
      </section>

      <section className="notice notice--accessibility">
        <strong>Atenção à circulação</strong>
        <p>As salas de aula ficam geralmente no 2º andar. A escola informou que não há elevador nem rampa; por isso, ainda não existe uma rota acessível equivalente entre todos os projetos.</p>
      </section>

      {!currentLocation && (
        <button className="button button--secondary button--full" onClick={() => setCurrentLocation('entrada-pais')}>Estou no Portão de Entrada</button>
      )}

      {zone && (
        <section className="section-block">
          <div className="section-heading-row">
            <h2 className="section-title">Projetos · {groupLabels[zone] ?? 'área selecionada'}</h2>
            <button className="text-button" onClick={() => setZone(null)}>Fechar</button>
          </div>
          <div className="project-list">
            {zoneProjects.map((project) => <ProjectCard key={project.id} project={project} visited={visited.includes(project.id)} compact />)}
          </div>
        </section>
      )}

      <section className="pending-list">
        <h2 className="section-title">Ainda precisamos confirmar</h2>
        <ul>
          <li>O pavimento exato de cada sala individualmente; a referência atual é que as salas ficam geralmente no 2º andar.</li>
          <li>Localização física exata do Laboratório de Ciências.</li>
          <li>Se Salas 12 e 16 são uma única parada ou duas etapas do mesmo projeto.</li>
          <li>Duração real das apresentações para recalibrar a Rota 40 minutos.</li>
        </ul>
      </section>
    </main>
  )
}
