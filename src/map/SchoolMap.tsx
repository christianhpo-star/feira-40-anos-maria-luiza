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
  'sala-01': 'bloco-01', 'sala-02': 'bloco-01', 'sala-03': 'bloco-01', 'sala-04': 'bloco-01', 'sala-05': 'bloco-01', 'sala-06': 'bloco-01', 'laboratorio-ciencias': 'bloco-01', 'sala-professores': 'bloco-01',
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
  const title = project ? `${locationById[id]?.label}: ${project.title}` : `${locationById[id]?.label}: sem exposição da feira`
  const activate = () => project && onZoneSelect?.(blockId)

  const content = (
    <>
      <title>{title}</title>
      <rect x={x} y={y} width="70" height="54" rx="10" />
      <text x={x + 35} y={y + 34} textAnchor="middle">{label}</text>
      {project && visited.includes(project.id) && <text x={x + 58} y={y + 16} textAnchor="middle" className="map-room-check">✓</text>}
    </>
  )

  if (!project) {
    return <g className={roomClass(id, currentLocation, destinationId, visited)} aria-label={title}>{content}</g>
  }

  return (
    <g
      className={roomClass(id, currentLocation, destinationId, visited)}
      role="button"
      tabIndex={0}
      aria-label={title}
      onClick={activate}
      onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') activate() }}
    >
      {content}
    </g>
  )
}

function CampusMap({ destinationId, onZoneSelect }: Omit<SchoolMapProps, 'view'>) {
  const { currentLocation } = useProgress()
  const isCurrent = (id: string) => currentLocation === id
  const isDestination = (id: string) => destinationId === id
  const spaceClass = (id: string, base: string) => [base, isCurrent(id) ? 'is-current' : '', isDestination(id) ? 'is-destination' : ''].filter(Boolean).join(' ')

  return (
    <div className="map-shell" aria-label="Mapa geral esquemático da escola">
      <svg className="school-map campus-map" viewBox="0 0 760 560" role="img" aria-labelledby="campusTitle campusDesc" preserveAspectRatio="xMidYMid meet">
        <title id="campusTitle">Mapa geral dos espaços da escola</title>
        <desc id="campusDesc">Mostra entrada principal, portão da secretaria, salas no segundo andar, Laboratório de Química e Sala dos Professores no primeiro andar do Bloco 1, pátio, cantina e refeitório no primeiro andar, quadra, quadra de areia e ligação por escada.</desc>

        <rect x="20" y="20" width="720" height="520" rx="20" className="map-boundary" />

        <g className={spaceClass('portao-secretaria', 'map-gate map-gate--secretaria')}>
          <line x1="20" y1="62" x2="20" y2="118" />
          <text x="42" y="55" className="map-gate-label">Portão da Secretaria</text>
        </g>

        <g className={spaceClass('entrada-pais', 'map-gate map-gate--entrada')}>
          <line x1="740" y1="62" x2="740" y2="118" />
          <text x="718" y="55" textAnchor="end" className="map-gate-label">Entrada de famílias</text>
        </g>

        <g className="map-building">
          <rect x="55" y="105" width="155" height="290" rx="12" />
          <text x="132" y="150" textAnchor="middle" className="map-floor-label">2º ANDAR</text>
          <text x="132" y="180" textAnchor="middle" className="map-title">SALAS 01–06</text>
          <line x1="70" y1="235" x2="195" y2="235" className="map-floor-divider" />
          <text x="132" y="260" textAnchor="middle" className="map-floor-label">1º ANDAR</text>

          <g className="map-reference-space">
            <rect x="68" y="278" width="61" height="76" rx="10" />
            <text x="98.5" y="309" textAnchor="middle" className="map-tiny">SALA DOS</text>
            <text x="98.5" y="329" textAnchor="middle" className="map-tiny">PROFESSORES</text>
          </g>

          <g
            className={spaceClass('laboratorio-ciencias', 'map-lab-campus')}
            role="button"
            tabIndex={0}
            onClick={() => onZoneSelect?.('laboratorio')}
            onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onZoneSelect?.('laboratorio') }}
          >
            <rect x="136" y="278" width="61" height="76" rx="10" />
            <text x="166.5" y="309" textAnchor="middle" className="map-tiny">LAB.</text>
            <text x="166.5" y="329" textAnchor="middle" className="map-tiny">QUÍMICA</text>
          </g>
        </g>

        <g className={spaceClass('patio', 'map-patio')} role="button" tabIndex={0}
          onClick={() => onZoneSelect?.('area-externa')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onZoneSelect?.('area-externa') }}>
          <rect x="230" y="105" width="160" height="215" rx="12" />
          <text x="310" y="180" textAnchor="middle" className="map-title">PÁTIO</text>
        </g>

        <g className="map-building">
          <rect x="410" y="105" width="180" height="290" rx="12" />
          <text x="500" y="155" textAnchor="middle" className="map-floor-label">2º ANDAR</text>
          <text x="500" y="190" textAnchor="middle" className="map-title">SALAS</text>
          <g className={spaceClass('refeitorio-cantina', 'map-inner-space')} role="button" tabIndex={0}
            onClick={() => onZoneSelect?.('refeitorio')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onZoneSelect?.('refeitorio') }}>
            <rect x="435" y="260" width="130" height="100" rx="12" />
            <text x="500" y="288" textAnchor="middle" className="map-floor-label">1º ANDAR</text>
            <text x="500" y="317" textAnchor="middle" className="map-small">CANTINA /</text>
            <text x="500" y="341" textAnchor="middle" className="map-small">REFEITÓRIO</text>
          </g>
        </g>

        <g className={spaceClass('quadra', 'map-court')}>
          <rect x="610" y="125" width="105" height="270" rx="12" />
          <text x="662" y="265" textAnchor="middle" className="map-title">QUADRA</text>
        </g>

        <g className={spaceClass('quadra-areia', 'map-external-zone')} role="button" tabIndex={0}
          onClick={() => onZoneSelect?.('area-externa')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onZoneSelect?.('area-externa') }}>
          <rect x="230" y="425" width="360" height="78" rx="16" />
          <text x="410" y="460" textAnchor="middle" className="map-title">PÁTIO + QUADRA DE AREIA</text>
          <text x="410" y="486" textAnchor="middle" className="map-subtitle">área externa</text>
        </g>

        <g className="map-stairs">
          <path d="M210 292 H248 V260 H372 V292 H410" />
          <text x="310" y="247" textAnchor="middle" className="map-small">ESCADA / LIGAÇÃO</text>
        </g>

        {currentLocation === 'entrada-pais' && <text x="718" y="82" textAnchor="end" className="you-are-here-label">● Você está aqui</text>}
      </svg>
      <div className="map-caption">
        <strong>Visão geral da escola</strong>
        <span>2º andar: salas · 1º andar: Cantina/Refeitório e, no Bloco 1, Sala dos Professores + Laboratório de Química.</span>
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
  const labProject = projectForRoom('laboratorio-ciencias')
  const labVisited = labProject ? visited.includes(labProject.id) : false
  const labClass = [
    'map-lab-space',
    labProject ? 'has-project' : '',
    labVisited ? 'is-visited' : '',
    currentLocation === 'laboratorio-ciencias' ? 'is-current' : '',
    destinationId === 'laboratorio-ciencias' ? 'is-destination' : ''
  ].filter(Boolean).join(' ')

  return (
    <div className="map-shell" aria-label="Mapa de blocos e salas">
      <svg className="school-map rooms-map" viewBox="0 0 760 900" role="img" aria-labelledby="roomsTitle roomsDesc" preserveAspectRatio="xMidYMid meet">
        <title id="roomsTitle">Mapa dos blocos e salas</title>
        <desc id="roomsDesc">No Bloco 1, as salas 1 a 6 ficam no segundo andar. No primeiro andar ficam a Sala dos Professores e, ao lado, o Laboratório de Química. Depois da passarela fica o Bloco 2 com salas 7, 8, 9, 10, 11, 12 e 16; e o Bloco 3 com salas 13, 14, 15 e 17. O portão da Secretaria fica à esquerda e a entrada de famílias à direita.</desc>
        <rect x="20" y="20" width="720" height="860" rx="16" className="map-boundary" />

        <g className="map-gate map-gate--secretaria">
          <line x1="20" y1="58" x2="20" y2="112" />
          <text x="42" y="52" className="map-gate-label">Secretaria</text>
        </g>
        <g className={currentLocation === 'entrada-pais' ? 'map-gate map-gate--entrada is-current' : 'map-gate map-gate--entrada'}>
          <line x1="740" y1="58" x2="740" y2="112" />
          <text x="718" y="52" textAnchor="end" className="map-gate-label">Entrada de famílias</text>
          {currentLocation === 'entrada-pais' && <text x="718" y="76" textAnchor="end" className="you-are-here-label">● Você está aqui</text>}
        </g>

        <g className={blockClass('bloco-01')} role="button" tabIndex={0} aria-label={`Bloco 1, ${blockProjects('bloco-01').length} exposições`}
          onClick={() => activate('bloco-01')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') activate('bloco-01') }}>
          <rect x="70" y="90" width="620" height="260" rx="20" />
          <text x="380" y="125" textAnchor="middle" className="map-block-title">Bloco 1</text>

          <text x="95" y="158" className="map-floor-band-label">2º ANDAR · SALAS</text>
          <Room id="sala-01" x={95} y={170} {...roomProps} />
          <Room id="sala-02" x={190} y={170} {...roomProps} />
          <Room id="sala-03" x={285} y={170} {...roomProps} />
          <Room id="sala-04" x={380} y={170} {...roomProps} />
          <Room id="sala-05" x={475} y={170} {...roomProps} />
          <Room id="sala-06" x={570} y={170} {...roomProps} />

          <line x1="95" y1="238" x2="665" y2="238" className="map-floor-divider" />
          <text x="95" y="263" className="map-floor-band-label">1º ANDAR</text>

          <g className="map-reference-space" aria-label="Sala dos Professores, 1º andar do Bloco 1">
            <rect x="310" y="276" width="155" height="52" rx="10" />
            <text x="387.5" y="299" textAnchor="middle" className="map-reference-label">SALA DOS</text>
            <text x="387.5" y="317" textAnchor="middle" className="map-reference-label">PROFESSORES</text>
          </g>

          <g
            className={labClass}
            role="button"
            tabIndex={0}
            aria-label="Laboratório de Química, 1º andar do Bloco 1, ao lado da Sala dos Professores"
            onClick={(event) => { event.stopPropagation(); activate('laboratorio') }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.stopPropagation()
                activate('laboratorio')
              }
            }}
          >
            <title>Laboratório de Química — 1º andar do Bloco 1, ao lado da Sala dos Professores</title>
            <rect x="475" y="276" width="170" height="52" rx="10" />
            <text x="560" y="307" textAnchor="middle" className="map-lab-label">LABORATÓRIO DE QUÍMICA</text>
            {labVisited && <text x="630" y="292" textAnchor="middle" className="map-room-check">✓</text>}
          </g>
        </g>

        <g className="map-walkway">
          <rect x="330" y="350" width="100" height="65" rx="12" />
          <text x="380" y="389" textAnchor="middle" className="map-small">Passarela</text>
        </g>

        <g className={blockClass('bloco-02')} role="button" tabIndex={0} aria-label={`Bloco 2, ${blockProjects('bloco-02').length} exposições`}
          onClick={() => activate('bloco-02')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') activate('bloco-02') }}>
          <rect x="50" y="425" width="660" height="210" rx="20" />
          <text x="380" y="470" textAnchor="middle" className="map-block-title">Bloco 2</text>
          <Room id="sala-07" x={65} y={550} {...roomProps} />
          <Room id="sala-08" x={155} y={550} {...roomProps} />
          <Room id="sala-09" x={245} y={550} {...roomProps} />
          <Room id="sala-10" x={335} y={550} {...roomProps} />
          <Room id="sala-11" x={425} y={550} {...roomProps} />
          <Room id="sala-12" x={515} y={550} {...roomProps} />
          <Room id="sala-16" x={605} y={550} {...roomProps} />
        </g>

        <g className={blockClass('bloco-03')} role="button" tabIndex={0} aria-label={`Bloco 3, ${blockProjects('bloco-03').length} exposições`}
          onClick={() => activate('bloco-03')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') activate('bloco-03') }}>
          <rect x="120" y="670" width="450" height="155" rx="20" />
          <text x="345" y="712" textAnchor="middle" className="map-block-title">Bloco 3</text>
          <Room id="sala-14" x={145} y={745} {...roomProps} />
          <Room id="sala-15" x={255} y={745} {...roomProps} />
          <Room id="sala-13" x={365} y={745} {...roomProps} />
          <Room id="sala-17" x={475} y={745} {...roomProps} />
        </g>
      </svg>
      <div className="map-caption">
        <strong>Blocos e salas</strong>
        <span>No Bloco 1, as salas 01–06 ficam no 2º andar. No 1º andar ficam a Sala dos Professores e, ao lado, o Laboratório de Química. As salas 09, 10 e 17 servem apenas como referência.</span>
      </div>
      <div className="map-legend" aria-label="Legenda do mapa">
        <span><i className="legend-swatch legend-swatch--project" /> Exposição da feira</span>
        <span><i className="legend-swatch legend-swatch--neutral" /> Referência</span>
        <span><i className="legend-swatch legend-swatch--current" /> Você está aqui</span>
        <span><i className="legend-swatch legend-swatch--destination" /> Seu destino</span>
      </div>
    </div>
  )
}

export function SchoolMap(props: SchoolMapProps) {
  return props.view === 'rooms' ? <BlocksMap {...props} /> : <CampusMap {...props} />
}
