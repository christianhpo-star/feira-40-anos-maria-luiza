import { projects } from '../data/projects'
import { locationById } from '../data/locations'
import { useProgress } from '../context/ProgressContext'

export type SchoolMapView = 'campus' | 'rooms'

interface SchoolMapProps {
  view: SchoolMapView
  destinationId?: string | null
  onZoneSelect?: (zone: string) => void
}

const roomBlocks: Record<string, string> = {
  'sala-01': 'bloco-01', 'sala-02': 'bloco-01', 'sala-03': 'bloco-01', 'sala-04': 'bloco-01', 'sala-05': 'bloco-01', 'sala-06': 'bloco-01',
  'sala-07': 'bloco-02', 'sala-08': 'bloco-02', 'sala-09': 'bloco-02', 'sala-10': 'bloco-02', 'sala-11': 'bloco-02', 'sala-12': 'bloco-02', 'sala-16': 'bloco-02',
  'sala-14': 'bloco-03', 'sala-15': 'bloco-03', 'sala-13': 'bloco-03', 'sala-17': 'bloco-03'
}

const blockProjects = (blockId: string) => projects.filter((project) => project.blockId === blockId)
const projectForRoom = (roomId: string) => projects.find((project) => project.locationIds.includes(roomId))

function roomClass(roomId: string, currentLocation: string | null, destinationId: string | null | undefined, visited: string[]) {
  const project = projectForRoom(roomId)
  return [
    'map-room',
    project ? 'has-project' : 'no-project',
    project && visited.includes(project.id) ? 'is-visited' : '',
    currentLocation === roomId ? 'is-current' : '',
    destinationId === roomId ? 'is-destination' : ''
  ].filter(Boolean).join(' ')
}

function Room({ id, x, y, currentLocation, destinationId, visited, onZoneSelect }: {
  id: string
  x: number
  y: number
  currentLocation: string | null
  destinationId?: string | null
  visited: string[]
  onZoneSelect?: (zone: string) => void
}) {
  const label = id.replace('sala-', '').replace(/^0/, '')
  const project = projectForRoom(id)
  const blockId = roomBlocks[id]
  const title = project ? `${locationById[id]?.label}: ${project.title}` : `${locationById[id]?.label}: sem projeto cadastrado`
  const activate = () => onZoneSelect?.(blockId)

  return (
    <g className={roomClass(id, currentLocation, destinationId, visited)} role="button" tabIndex={0} aria-label={title}
      onClick={activate} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') activate() }}>
      <title>{title}</title>
      <rect x={x} y={y} width="72" height="58" rx="10" />
      <text x={x + 36} y={y + 36} textAnchor="middle">{label}</text>
      {project && visited.includes(project.id) && <text x={x + 60} y={y + 17} textAnchor="middle" className="map-room-check">✓</text>}
    </g>
  )
}

function CampusMap({ destinationId, onZoneSelect }: Omit<SchoolMapProps, 'view'>) {
  const { currentLocation } = useProgress()
  const isCurrent = (id: string) => currentLocation === id
  const isDestination = (id: string) => destinationId === id
  const spaceClass = (id: string, base: string) => [base, isCurrent(id) ? 'is-current' : '', isDestination(id) ? 'is-destination' : ''].filter(Boolean).join(' ')
  const roomLocation = currentLocation?.startsWith('sala-') ? locationById[currentLocation] : null

  return (
    <div className="map-shell" aria-label="Mapa geral esquemático da escola">
      <svg className="school-map campus-map" viewBox="0 0 900 620" role="img" aria-labelledby="campusTitle campusDesc">
        <title id="campusTitle">Mapa geral dos espaços da escola</title>
        <desc id="campusDesc">Mostra entrada dos pais, portão da secretaria, áreas de salas, pátio, cantina e refeitório, quadra, quadra de areia e ligação por escada. O desenho é esquemático e não proporcional.</desc>

        <rect x="30" y="28" width="840" height="552" rx="20" className="map-boundary" />

        <g className={spaceClass('portao-secretaria', 'map-gate map-gate--secretaria')}>
          <line x1="30" y1="165" x2="30" y2="245" />
          <text x="48" y="190" className="map-small">Portão da</text>
          <text x="48" y="211" className="map-small">Secretaria</text>
        </g>

        <g className={spaceClass('entrada-pais', 'map-gate map-gate--entrada')}>
          <line x1="870" y1="165" x2="870" y2="245" />
          <text x="852" y="190" textAnchor="end" className="map-small">Entrada de pais</text>
          <text x="852" y="211" textAnchor="end" className="map-small">e responsáveis</text>
        </g>

        <g className="map-building">
          <rect x="65" y="65" width="185" height="345" rx="10" />
          <text x="157" y="205" textAnchor="middle" className="map-title">SALAS</text>
          <text x="157" y="232" textAnchor="middle" className="map-subtitle">geralmente 2º andar</text>
        </g>

        <g className={spaceClass('patio', 'map-patio')} onClick={() => onZoneSelect?.('area-externa')}>
          <rect x="270" y="65" width="195" height="260" rx="10" />
          <text x="367" y="190" textAnchor="middle" className="map-title">PÁTIO</text>
        </g>

        <g className="map-building">
          <rect x="485" y="65" width="195" height="345" rx="10" />
          <text x="582" y="168" textAnchor="middle" className="map-title">SALAS</text>
          <text x="582" y="193" textAnchor="middle" className="map-subtitle">geralmente 2º andar</text>
          <g className={spaceClass('refeitorio-cantina', 'map-inner-space')} role="button" tabIndex={0}
            onClick={() => onZoneSelect?.('refeitorio')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onZoneSelect?.('refeitorio') }}>
            <rect x="515" y="285" width="135" height="72" rx="12" />
            <text x="582" y="314" textAnchor="middle" className="map-small">Cantina / Refeitório</text>
            <text x="582" y="338" textAnchor="middle" className="map-subtitle">1º andar</text>
          </g>
        </g>

        <g className={spaceClass('quadra', 'map-court')}>
          <rect x="700" y="105" width="135" height="305" rx="10" />
          <text x="767" y="255" textAnchor="middle" className="map-title">QUADRA</text>
        </g>

        <g className={spaceClass('quadra-areia', 'map-external-zone')} role="button" tabIndex={0}
          onClick={() => onZoneSelect?.('area-externa')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onZoneSelect?.('area-externa') }}>
          <rect x="270" y="438" width="410" height="105" rx="16" />
          <text x="475" y="482" textAnchor="middle" className="map-title">PÁTIO + QUADRA DE AREIA</text>
          <text x="475" y="510" textAnchor="middle" className="map-subtitle">área externa</text>
        </g>

        <g className="map-stairs">
          <path d="M250 300 H300 V265 H430 V300 H485" />
          <text x="367" y="247" textAnchor="middle" className="map-small">ESCADA / LIGAÇÃO</text>
        </g>

        {roomLocation && (
          <g className="you-are-here">
            <text x="65" y="556">● Você está em {roomLocation.label}. Veja “Blocos e salas” para localizar a sala.</text>
          </g>
        )}
        {currentLocation === 'entrada-pais' && <text x="690" y="455" className="you-are-here-label">● Você está aqui: entrada dos pais</text>}
      </svg>
      <div className="map-caption">
        <strong>Mapa geral · esquemático e não proporcional.</strong>
        <span>Este mapa preserva pátio, cantina/refeitório, quadra, quadra de areia e a ligação entre prédios. Para números de salas, use “Blocos e salas”.</span>
      </div>
    </div>
  )
}

function BlocksMap({ destinationId, onZoneSelect }: Omit<SchoolMapProps, 'view'>) {
  const { currentLocation, visited } = useProgress()
  const activate = (blockId: string) => onZoneSelect?.(blockId)

  const blockClass = (blockId: string) => {
    const currentBlock = currentLocation ? roomBlocks[currentLocation] : null
    const destinationBlock = destinationId ? roomBlocks[destinationId] : null
    return ['map-block', currentBlock === blockId ? 'is-current' : '', destinationBlock === blockId ? 'is-destination' : ''].filter(Boolean).join(' ')
  }

  const roomProps = { currentLocation, destinationId, visited, onZoneSelect }

  return (
    <div className="map-shell" aria-label="Mapa de blocos e salas">
      <svg className="school-map rooms-map" viewBox="0 0 900 900" role="img" aria-labelledby="roomsTitle roomsDesc">
        <title id="roomsTitle">Mapa dos blocos e salas</title>
        <desc id="roomsDesc">Bloco 1 com salas 1 a 6, passarela, Bloco 2 com salas 7, 8, 9, 10, 11, 12 e 16, e Bloco 3 com salas 14, 15, 13 e 17. Há portão da secretaria à esquerda e portão de entrada dos pais à direita.</desc>
        <rect x="70" y="35" width="760" height="830" rx="10" className="map-boundary" />

        <g className="map-gate map-gate--secretaria">
          <line x1="70" y1="165" x2="70" y2="255" />
          <text x="88" y="188" className="map-small">Portão da</text>
          <text x="88" y="211" className="map-small">Secretaria</text>
        </g>
        <g className={currentLocation === 'entrada-pais' ? 'map-gate map-gate--entrada is-current' : 'map-gate map-gate--entrada'}>
          <line x1="830" y1="165" x2="830" y2="255" />
          <text x="812" y="188" textAnchor="end" className="map-small">Portão de Entrada</text>
          <text x="812" y="211" textAnchor="end" className="map-small">pais/responsáveis</text>
        </g>

        <g className={blockClass('bloco-01')} role="button" tabIndex={0} aria-label={`Bloco 1, ${blockProjects('bloco-01').length} projetos`}
          onClick={() => activate('bloco-01')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') activate('bloco-01') }}>
          <rect x="120" y="80" width="610" height="215" rx="20" />
          <text x="425" y="125" textAnchor="middle" className="map-block-title">Bloco 1</text>
          <Room id="sala-01" x={155} y={175} {...roomProps} />
          <Room id="sala-02" x={245} y={175} {...roomProps} />
          <Room id="sala-03" x={335} y={175} {...roomProps} />
          <Room id="sala-04" x={425} y={175} {...roomProps} />
          <Room id="sala-05" x={515} y={175} {...roomProps} />
          <Room id="sala-06" x={605} y={175} {...roomProps} />
        </g>

        <g className="map-walkway">
          <rect x="345" y="295" width="92" height="105" rx="10" />
          <text x="455" y="352" className="map-small">Passarela</text>
        </g>

        <g className={blockClass('bloco-02')} role="button" tabIndex={0} aria-label={`Bloco 2, ${blockProjects('bloco-02').length} projetos`}
          onClick={() => activate('bloco-02')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') activate('bloco-02') }}>
          <rect x="100" y="400" width="700" height="225" rx="20" />
          <text x="450" y="447" textAnchor="middle" className="map-block-title">Bloco 2</text>
          <Room id="sala-07" x={140} y={510} {...roomProps} />
          <Room id="sala-08" x={230} y={510} {...roomProps} />
          <Room id="sala-09" x={320} y={510} {...roomProps} />
          <Room id="sala-10" x={450} y={510} {...roomProps} />
          <Room id="sala-11" x={540} y={510} {...roomProps} />
          <Room id="sala-12" x={630} y={510} {...roomProps} />
          <Room id="sala-16" x={720} y={510} {...roomProps} />
        </g>

        <g className={blockClass('bloco-03')} role="button" tabIndex={0} aria-label={`Bloco 3, ${blockProjects('bloco-03').length} projetos`}
          onClick={() => activate('bloco-03')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') activate('bloco-03') }}>
          <rect x="120" y="665" width="500" height="170" rx="20" />
          <text x="370" y="708" textAnchor="middle" className="map-block-title">Bloco 3</text>
          <Room id="sala-14" x={155} y={745} {...roomProps} />
          <Room id="sala-15" x={305} y={745} {...roomProps} />
          <Room id="sala-13" x={395} y={745} {...roomProps} />
          <Room id="sala-17" x={485} y={745} {...roomProps} />
        </g>
      </svg>
      <div className="map-caption">
        <strong>Blocos e salas · referência de circulação.</strong>
        <span>Salas com exposição ficam destacadas. Salas 09, 10 e 17 aparecem apenas como referência porque não possuem projeto cadastrado no documento da feira.</span>
      </div>
      <div className="map-legend" aria-label="Legenda do mapa">
        <span><i className="legend-swatch legend-swatch--project" /> Projeto da feira</span>
        <span><i className="legend-swatch legend-swatch--neutral" /> Sem projeto</span>
        <span><i className="legend-swatch legend-swatch--current" /> Você está aqui</span>
        <span><i className="legend-swatch legend-swatch--destination" /> Seu destino</span>
      </div>
    </div>
  )
}

export function SchoolMap(props: SchoolMapProps) {
  return props.view === 'rooms' ? <BlocksMap {...props} /> : <CampusMap {...props} />
}
