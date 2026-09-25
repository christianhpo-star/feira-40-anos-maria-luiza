import { useEffect, useState } from 'react'
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
  'sala-01': 'bloco-01', 'sala-02': 'bloco-01', 'sala-03': 'bloco-01', 'sala-04': 'bloco-01', 'sala-05': 'bloco-01', 'sala-06': 'bloco-01', 'laboratorio-ciencias': 'bloco-01', 'sala-professores': 'bloco-01', 'vice-direcao': 'bloco-01', 'secretaria-escolar': 'bloco-01',
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

function Room({ id, x, y, width = 70, height = 54, rx = 10, currentLocation, destinationId, visited, onZoneSelect, floorSegment = false }: {
  id: string
  x: number
  y: number
  width?: number
  height?: number
  rx?: number
  currentLocation: string | null
  destinationId?: string | null
  visited: string[]
  onZoneSelect?: (zone: string) => void
  floorSegment?: boolean
}) {
  const label = id.replace('sala-', '').replace(/^0/, '')
  const project = projectForRoom(id)
  const blockId = roomBlocks[id]
  const title = project ? `${locationById[id]?.label}: ${project.title}` : `${locationById[id]?.label}: sem exposição da feira`
  const activate = () => project && onZoneSelect?.(blockId)

  const content = (
    <>
      <title>{title}</title>
      <rect x={x} y={y} width={width} height={height} rx={rx} />
      <text x={x + width / 2} y={y + height / 2 + 6} textAnchor="middle">{label}</text>
      {project && visited.includes(project.id) && <text x={x + width - 12} y={y + 16} textAnchor="middle" className="map-room-check">✓</text>}
    </>
  )

  if (!project) {
    return <g className={`${roomClass(id, currentLocation, destinationId, visited)} ${floorSegment ? 'map-floor-room' : ''}`} aria-label={title}>{content}</g>
  }

  return (
    <g
      className={`${roomClass(id, currentLocation, destinationId, visited)} ${floorSegment ? 'map-floor-room' : ''}`}
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
        <desc id="campusDesc">Mostra entrada principal, portão da secretaria, salas no segundo andar e, no primeiro andar do Bloco 1, a sequência Laboratório de Química, Sala dos Professores, Vice-direção e Secretaria; além de pátio, cantina e refeitório, quadra, quadra de areia e ligação por escada.</desc>

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
          <text x="132" y="138" textAnchor="middle" className="map-floor-label">2º ANDAR</text>
          <text x="132" y="164" textAnchor="middle" className="map-title">SALAS 01–06</text>
          <line x1="70" y1="190" x2="195" y2="190" className="map-floor-divider" />
          <text x="132" y="210" textAnchor="middle" className="map-floor-label">1º ANDAR</text>

          <g
            className={spaceClass('laboratorio-ciencias', 'map-lab-campus')}
            role="button"
            tabIndex={0}
            onClick={() => onZoneSelect?.('laboratorio')}
            onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onZoneSelect?.('laboratorio') }}
          >
            <rect x="75" y="220" width="115" height="35" rx="7" />
            <text x="132" y="242" textAnchor="middle" className="map-tiny">LAB. QUÍMICA</text>
          </g>

          <g className="map-reference-space">
            <rect x="75" y="258" width="115" height="35" rx="7" />
            <text x="132" y="280" textAnchor="middle" className="map-tiny">SALA PROF.</text>
          </g>

          <g className="map-reference-space">
            <rect x="75" y="296" width="115" height="35" rx="7" />
            <text x="132" y="318" textAnchor="middle" className="map-tiny">VICE-DIREÇÃO</text>
          </g>

          <g className="map-reference-space">
            <rect x="75" y="334" width="115" height="35" rx="7" />
            <text x="132" y="356" textAnchor="middle" className="map-tiny">SECRETARIA</text>
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
        <span>2º andar: salas · 1º andar: Cantina/Refeitório e, no Bloco 1, Lab. de Química → Sala dos Professores → Vice-direção → Secretaria.</span>
      </div>
    </div>
  )
}

function BlocksMap({ destinationId, onZoneSelect }: Omit<SchoolMapProps, 'view'>) {
  const { currentLocation, visited } = useProgress()

  type BlockId = 'bloco-01' | 'bloco-02' | 'bloco-03'
  type BlockOneFloor = '1' | '2'

  const isBlockId = (value: string | null | undefined): value is BlockId =>
    value === 'bloco-01' || value === 'bloco-02' || value === 'bloco-03'

  const lowerFloorLocations = new Set([
    'laboratorio-ciencias',
    'sala-professores',
    'vice-direcao',
    'secretaria-escolar'
  ])

  const blockFromTarget = (target: string | null | undefined): BlockId | null => {
    const block = target ? roomBlocks[target] : null
    return isBlockId(block) ? block : null
  }

  const floorFromTarget = (target: string | null | undefined): BlockOneFloor =>
    target && lowerFloorLocations.has(target) ? '1' : '2'

  const destinationBlock = blockFromTarget(destinationId)
  const currentBlock = blockFromTarget(currentLocation)

  const [selectedBlock, setSelectedBlock] = useState<BlockId>(destinationBlock ?? currentBlock ?? 'bloco-01')
  const [blockOneFloor, setBlockOneFloor] = useState<BlockOneFloor>(
    destinationBlock === 'bloco-01'
      ? floorFromTarget(destinationId)
      : currentBlock === 'bloco-01'
        ? floorFromTarget(currentLocation)
        : '2'
  )

  useEffect(() => {
    if (!destinationBlock) return
    setSelectedBlock(destinationBlock)
    if (destinationBlock === 'bloco-01') setBlockOneFloor(floorFromTarget(destinationId))
  }, [destinationBlock, destinationId])

  useEffect(() => {
    if (destinationId || !currentBlock) return
    setSelectedBlock(currentBlock)
    if (currentBlock === 'bloco-01') setBlockOneFloor(floorFromTarget(currentLocation))
  }, [currentBlock, currentLocation, destinationId])

  const chooseBlock = (blockId: BlockId) => {
    setSelectedBlock(blockId)
    onZoneSelect?.(blockId)
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

  const captions: Record<BlockId, string> = {
    'bloco-01': blockOneFloor === '2'
      ? 'Bloco 1 · 2º andar: salas 01 a 06.'
      : 'Bloco 1 · 1º andar: Laboratório de Química → Sala dos Professores → Vice-direção → Secretaria.',
    'bloco-02': 'Bloco 2: salas 07, 08, 09, 10, 11, 12 e 16.',
    'bloco-03': 'Bloco 3: salas 14, 15, 13 e 17.'
  }

  return (
    <div className="map-shell map-shell--room-finder" aria-label="Localizador de blocos e salas">
      <div className="map-block-switcher" role="tablist" aria-label="Escolha o bloco">
        {([
          ['bloco-01', 'Bloco 1', '01–06'],
          ['bloco-02', 'Bloco 2', '07–12 · 16'],
          ['bloco-03', 'Bloco 3', '13–15 · 17']
        ] as const).map(([id, label, rooms]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={selectedBlock === id}
            className={selectedBlock === id ? 'map-block-tab is-active' : 'map-block-tab'}
            onClick={() => chooseBlock(id)}
          >
            <strong>{label}</strong>
            <small>salas {rooms}</small>
          </button>
        ))}
      </div>

      {selectedBlock === 'bloco-01' && (
        <div className="map-floor-switcher" role="tablist" aria-label="Escolha o andar do Bloco 1">
          <button
            type="button"
            role="tab"
            aria-selected={blockOneFloor === '2'}
            className={blockOneFloor === '2' ? 'map-floor-tab is-active' : 'map-floor-tab'}
            onClick={() => {
              setBlockOneFloor('2')
              onZoneSelect?.('bloco-01')
            }}
          >
            <span>2º andar</span>
            <small>Salas 01–06</small>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={blockOneFloor === '1'}
            className={blockOneFloor === '1' ? 'map-floor-tab is-active' : 'map-floor-tab'}
            onClick={() => {
              setBlockOneFloor('1')
              onZoneSelect?.('bloco-01')
            }}
          >
            <span>1º andar</span>
            <small>Laboratório e apoio</small>
          </button>
        </div>
      )}

      <div className="map-room-stage" aria-live="polite">
        <svg className="school-map rooms-map rooms-map--focused" viewBox="0 0 760 560" role="img" aria-labelledby="roomsTitle roomsDesc" preserveAspectRatio="xMidYMid meet">
          <title id="roomsTitle">Localizador de salas da escola</title>
          <desc id="roomsDesc">{captions[selectedBlock]}</desc>
          <rect x="20" y="20" width="720" height="520" rx="20" className="map-boundary" />

          {selectedBlock === 'bloco-01' && (
            <>
              <text x="380" y="78" textAnchor="middle" className="map-focused-title">Bloco 1 · {blockOneFloor}º andar</text>
              <text x="380" y="106" textAnchor="middle" className="map-focused-subtitle">
                {blockOneFloor === '2' ? 'Salas de exposição' : 'Laboratório e setores de apoio'}
              </text>

              <g className="map-focused-building" aria-label={captions['bloco-01']}>
                <rect x="70" y="145" width="620" height="280" rx="20" className="map-focused-building-shell" />

                {blockOneFloor === '2' ? (
                  <>
                    <text x="95" y="190" className="map-floor-band-label">SALAS 01–06 · MESMA PLANTA DO 1º ANDAR</text>
                    <g className="map-floor-plan" aria-label="2º andar do Bloco 1">
                      <Room id="sala-01" x={95} y={225} width={95} height={120} rx={0} floorSegment {...roomProps} />
                      <Room id="sala-02" x={190} y={225} width={95} height={120} rx={0} floorSegment {...roomProps} />
                      <Room id="sala-03" x={285} y={225} width={95} height={120} rx={0} floorSegment {...roomProps} />
                      <Room id="sala-04" x={380} y={225} width={95} height={120} rx={0} floorSegment {...roomProps} />
                      <Room id="sala-05" x={475} y={225} width={95} height={120} rx={0} floorSegment {...roomProps} />
                      <Room id="sala-06" x={570} y={225} width={95} height={120} rx={0} floorSegment {...roomProps} />
                      <rect x="95" y="225" width="570" height="120" rx="10" className="map-floor-shell map-floor-shell--outline" />
                    </g>
                    <text x="380" y="382" textAnchor="middle" className="map-corridor-label">CORREDOR · mesma orientação do pavimento inferior</text>
                  </>
                ) : (
                  <>
                    <text x="95" y="190" className="map-floor-band-label">1º ANDAR · MESMA PLANTA DO 2º ANDAR</text>
                    <g className="map-floor-plan" aria-label="1º andar do Bloco 1">
                      <g
                        className={`${labClass} map-floor-space`}
                        role="button"
                        tabIndex={0}
                        aria-label="Laboratório de Química"
                        onClick={() => onZoneSelect?.('laboratorio')}
                        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onZoneSelect?.('laboratorio') }}
                      >
                        <rect x="95" y="225" width="142.5" height="120" rx="0" />
                        <text x="166.25" y="274" textAnchor="middle" className="map-lab-label">LABORATÓRIO</text>
                        <text x="166.25" y="298" textAnchor="middle" className="map-lab-label">DE QUÍMICA</text>
                        {labVisited && <text x="222" y="244" textAnchor="middle" className="map-room-check">✓</text>}
                      </g>

                      <g className="map-reference-space map-floor-space" aria-label="Sala dos Professores">
                        <rect x="237.5" y="225" width="142.5" height="120" rx="0" />
                        <text x="308.75" y="274" textAnchor="middle" className="map-reference-label">SALA DOS</text>
                        <text x="308.75" y="298" textAnchor="middle" className="map-reference-label">PROFESSORES</text>
                      </g>

                      <g className="map-reference-space map-floor-space" aria-label="Vice-direção">
                        <rect x="380" y="225" width="142.5" height="120" rx="0" />
                        <text x="451.25" y="291" textAnchor="middle" className="map-reference-label">VICE-DIREÇÃO</text>
                      </g>

                      <g className="map-reference-space map-floor-space" aria-label="Secretaria">
                        <rect x="522.5" y="225" width="142.5" height="120" rx="0" />
                        <text x="593.75" y="291" textAnchor="middle" className="map-reference-label">SECRETARIA</text>
                      </g>
                      <rect x="95" y="225" width="570" height="120" rx="10" className="map-floor-shell map-floor-shell--outline" />
                    </g>
                    <text x="380" y="382" textAnchor="middle" className="map-corridor-label">CORREDOR · mesma orientação do pavimento superior</text>
                  </>
                )}

                <g className="map-building-orientation" aria-hidden="true">
                  <line x1="95" y1="405" x2="665" y2="405" />
                  <text x="380" y="400" textAnchor="middle">MESMA EDIFICAÇÃO RETANGULAR</text>
                </g>
              </g>
            </>
          )}

          {selectedBlock === 'bloco-02' && (
            <>
              <text x="380" y="78" textAnchor="middle" className="map-focused-title">Bloco 2</text>
              <text x="380" y="106" textAnchor="middle" className="map-focused-subtitle">Salas 07, 08, 09, 10, 11, 12 e 16</text>
              <g className="map-focused-building" aria-label={captions['bloco-02']}>
                <rect x="70" y="145" width="620" height="280" rx="20" className="map-focused-building-shell" />
                <g className="map-floor-plan" aria-label="Salas do Bloco 2">
                  <Room id="sala-07" x={90} y={225} width={82} height={120} rx={0} floorSegment {...roomProps} />
                  <Room id="sala-08" x={172} y={225} width={82} height={120} rx={0} floorSegment {...roomProps} />
                  <Room id="sala-09" x={254} y={225} width={82} height={120} rx={0} floorSegment {...roomProps} />
                  <Room id="sala-10" x={336} y={225} width={82} height={120} rx={0} floorSegment {...roomProps} />
                  <Room id="sala-11" x={418} y={225} width={82} height={120} rx={0} floorSegment {...roomProps} />
                  <Room id="sala-12" x={500} y={225} width={82} height={120} rx={0} floorSegment {...roomProps} />
                  <Room id="sala-16" x={582} y={225} width={82} height={120} rx={0} floorSegment {...roomProps} />
                  <rect x="90" y="225" width="574" height="120" rx="10" className="map-floor-shell map-floor-shell--outline" />
                </g>
                <text x="380" y="382" textAnchor="middle" className="map-corridor-label">Toque em uma sala destacada para ver as exposições</text>
              </g>
            </>
          )}

          {selectedBlock === 'bloco-03' && (
            <>
              <text x="380" y="78" textAnchor="middle" className="map-focused-title">Bloco 3</text>
              <text x="380" y="106" textAnchor="middle" className="map-focused-subtitle">Salas 14, 15, 13 e 17</text>
              <g className="map-focused-building" aria-label={captions['bloco-03']}>
                <rect x="70" y="145" width="620" height="280" rx="20" className="map-focused-building-shell" />
                <g className="map-floor-plan" aria-label="Salas do Bloco 3">
                  <Room id="sala-14" x={100} y={225} width={140} height={120} rx={0} floorSegment {...roomProps} />
                  <Room id="sala-15" x={240} y={225} width={140} height={120} rx={0} floorSegment {...roomProps} />
                  <Room id="sala-13" x={380} y={225} width={140} height={120} rx={0} floorSegment {...roomProps} />
                  <Room id="sala-17" x={520} y={225} width={140} height={120} rx={0} floorSegment {...roomProps} />
                  <rect x="100" y="225" width="560" height="120" rx="10" className="map-floor-shell map-floor-shell--outline" />
                </g>
                <text x="380" y="382" textAnchor="middle" className="map-corridor-label">Toque em uma sala destacada para ver as exposições</text>
              </g>
            </>
          )}

          {currentLocation === 'entrada-pais' && (
            <text x="715" y="505" textAnchor="end" className="you-are-here-label">● Entrada das famílias</text>
          )}
        </svg>
      </div>

      <div className="map-caption">
        <strong>{selectedBlock === 'bloco-01' ? `Bloco 1 · ${blockOneFloor}º andar` : selectedBlock === 'bloco-02' ? 'Bloco 2' : 'Bloco 3'}</strong>
        <span>{captions[selectedBlock]}</span>
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
