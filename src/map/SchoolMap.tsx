import { useEffect, useState } from 'react'
import { projects } from '../data/projects'
import { locationById } from '../data/locations'
import { useProgress } from '../context/ProgressContext'

export type SchoolMapView = 'campus' | 'rooms'
export type GeneralFloor = 'upper' | 'lower'

interface SchoolMapProps {
  view: SchoolMapView
  generalFloor?: GeneralFloor
  destinationId?: string | null
  onZoneSelect?: (zone: string) => void
}

type BlockId = 'bloco-01' | 'bloco-02' | 'bloco-03'

const roomBlocks: Record<string, BlockId> = {
  'sala-01': 'bloco-01', 'sala-02': 'bloco-01', 'sala-03': 'bloco-01', 'sala-04': 'bloco-01', 'sala-05': 'bloco-01', 'sala-06': 'bloco-01',
  'laboratorio-ciencias': 'bloco-01', 'sala-professores': 'bloco-01', 'vice-direcao': 'bloco-01', 'secretaria-escolar': 'bloco-01',
  'sala-07': 'bloco-02', 'sala-08': 'bloco-02', 'sala-09': 'bloco-02', 'sala-10': 'bloco-02', 'sala-11': 'bloco-02', 'sala-12': 'bloco-02', 'sala-16': 'bloco-02',
  'cantina': 'bloco-02', 'refeitorio-cantina': 'bloco-02', 'xerox': 'bloco-02', 'sala-reuniao': 'bloco-02',
  'sala-14': 'bloco-03', 'sala-15': 'bloco-03', 'sala-13': 'bloco-03', 'sala-17': 'bloco-03', 'biblioteca': 'bloco-03'
}

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

function Room({
  id,
  x,
  y,
  width,
  height,
  currentLocation,
  destinationId,
  visited,
  onZoneSelect
}: {
  id: string
  x: number
  y: number
  width: number
  height: number
  currentLocation: string | null
  destinationId?: string | null
  visited: string[]
  onZoneSelect?: (zone: string) => void
}) {
  const label = id.replace('sala-', '').replace(/^0/, '')
  const project = projectForRoom(id)
  const blockId = roomBlocks[id]
  const title = project
    ? `${locationById[id]?.label}: ${project.title}`
    : `${locationById[id]?.label}: referência de localização`

  const activate = () => project && blockId && onZoneSelect?.(blockId)

  return (
    <g
      className={roomClass(id, currentLocation, destinationId, visited)}
      role={project ? 'button' : undefined}
      tabIndex={project ? 0 : undefined}
      aria-label={title}
      onClick={activate}
      onKeyDown={(event) => {
        if (project && (event.key === 'Enter' || event.key === ' ')) activate()
      }}
    >
      <title>{title}</title>
      <rect x={x} y={y} width={width} height={height} />
      <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle">{label}</text>
      {project && visited.includes(project.id) && (
        <text x={x + width - 14} y={y + 18} textAnchor="middle" className="map-room-check">✓</text>
      )}
    </g>
  )
}

function GeneralMap({
  floor,
  destinationId,
  onZoneSelect
}: Omit<SchoolMapProps, 'view' | 'generalFloor'> & { floor: GeneralFloor }) {
  const { currentLocation } = useProgress()
  const isCurrent = (id: string) => currentLocation === id
  const isDestination = (id: string) => destinationId === id
  const spaceClass = (id: string, base: string) => [
    base,
    isCurrent(id) ? 'is-current' : '',
    isDestination(id) ? 'is-destination' : ''
  ].filter(Boolean).join(' ')

  const blockX = [72, 310, 548]
  const blockWidth = 140
  const blockY = 128
  const blockHeight = 332

  return (
    <div className="map-shell map-shell--general-floor" aria-label={floor === 'upper' ? 'Mapa geral do 2º andar' : 'Mapa geral do 1º andar'}>
      <svg className="school-map general-floor-map" viewBox="0 0 760 560" role="img" aria-labelledby="generalMapTitle generalMapDesc" preserveAspectRatio="xMidYMid meet">
        <title id="generalMapTitle">{floor === 'upper' ? 'Mapa geral · 2º andar' : 'Mapa geral · 1º andar'}</title>
        <desc id="generalMapDesc">
          {floor === 'upper'
            ? 'Três blocos retangulares. Bloco 1 com salas 1 a 6, Bloco 2 com salas 7, 8, 9, 10, 11, 12 e 16, e Bloco 3 com salas 14, 15, 13 e 17. Há uma passarela entre os blocos 1 e 2.'
            : 'Três blocos retangulares idênticos. No Bloco 1 ficam Laboratório de Química, Sala dos Professores, Vice-direção e Secretaria. No Bloco 2 ficam Cantina, Refeitório, escada, Xerox e Sala de Reunião. No Bloco 3 ficam Biblioteca e a escada do Bloco 3.'}
        </desc>

        <rect x="20" y="20" width="720" height="520" rx="20" className="map-boundary" />

        <g className={spaceClass('portao-secretaria', 'map-gate map-gate--secretaria')}>
          <line x1="20" y1="62" x2="20" y2="118" />
          <text x="42" y="55" className="map-gate-label">Portão da Secretaria</text>
        </g>

        <g className={spaceClass('entrada-pais', 'map-gate map-gate--entrada')}>
          <line x1="740" y1="62" x2="740" y2="118" />
          <text x="718" y="55" textAnchor="end" className="map-gate-label">Entrada de famílias</text>
          {currentLocation === 'entrada-pais' && (
            <text x="718" y="80" textAnchor="end" className="you-are-here-label">● Você está aqui</text>
          )}
        </g>

        {[1, 2, 3].map((blockNumber, index) => (
          <g key={blockNumber} className="general-block">
            <text x={blockX[index] + blockWidth / 2} y="105" textAnchor="middle" className="general-block__title">Bloco {blockNumber}</text>
            <rect x={blockX[index]} y={blockY} width={blockWidth} height={blockHeight} rx="10" className="general-block__shell" />
          </g>
        ))}

        {floor === 'upper' ? (
          <>
            <g className="general-upper-summary">
              <text x={blockX[0] + 70} y="235" textAnchor="middle">SALAS</text>
              <text x={blockX[0] + 70} y="270" textAnchor="middle" className="general-upper-summary__numbers">01–06</text>

              <text x={blockX[1] + 70} y="225" textAnchor="middle">SALAS</text>
              <text x={blockX[1] + 70} y="260" textAnchor="middle" className="general-upper-summary__numbers">07–12</text>
              <text x={blockX[1] + 70} y="290" textAnchor="middle" className="general-upper-summary__numbers">+ 16</text>

              <text x={blockX[2] + 70} y="225" textAnchor="middle">SALAS</text>
              <text x={blockX[2] + 70} y="260" textAnchor="middle" className="general-upper-summary__numbers">14 · 15</text>
              <text x={blockX[2] + 70} y="290" textAnchor="middle" className="general-upper-summary__numbers">13 · 17</text>
            </g>

            <g className="general-passarela" aria-label="Passarela entre o Bloco 1 e o Bloco 2">
              <line x1="212" y1="292" x2="310" y2="292" />
              <rect x="232" y="267" width="58" height="50" rx="9" />
              <text x="261" y="296" textAnchor="middle">Passarela</text>
            </g>
          </>
        ) : (
          <>
            <g className="lower-block lower-block--1">
              <g
                className={spaceClass('laboratorio-ciencias', 'lower-space lower-space--interactive')}
                role="button"
                tabIndex={0}
                onClick={() => onZoneSelect?.('laboratorio')}
                onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onZoneSelect?.('laboratorio') }}
              >
                <rect x={blockX[0]} y={blockY} width={blockWidth} height="84" />
                <text x={blockX[0] + 70} y={blockY + 47} textAnchor="middle">LAB. QUÍMICA</text>
              </g>
              <g className="lower-space lower-space--reference">
                <rect x={blockX[0]} y={blockY + 84} width={blockWidth} height="82" />
                <text x={blockX[0] + 70} y={blockY + 132} textAnchor="middle">SALA PROF.</text>
              </g>
              <g className="lower-space lower-space--reference">
                <rect x={blockX[0]} y={blockY + 166} width={blockWidth} height="78" />
                <text x={blockX[0] + 70} y={blockY + 212} textAnchor="middle">VICE-DIREÇÃO</text>
              </g>
              <g className="lower-space lower-space--reference">
                <rect x={blockX[0]} y={blockY + 244} width={blockWidth} height="88" />
                <text x={blockX[0] + 70} y={blockY + 296} textAnchor="middle">SECRETARIA</text>
              </g>
            </g>

            <g className="lower-block lower-block--2">
              <g className="lower-space lower-space--reference">
                <rect x={blockX[1]} y={blockY} width={blockWidth} height="96" />
                <text x={blockX[1] + 70} y={blockY + 55} textAnchor="middle">CANTINA</text>
              </g>
              <g
                className={spaceClass('refeitorio-cantina', 'lower-space lower-space--interactive')}
                role="button"
                tabIndex={0}
                onClick={() => onZoneSelect?.('refeitorio')}
                onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onZoneSelect?.('refeitorio') }}
              >
                <rect x={blockX[1]} y={blockY + 96} width={blockWidth} height="126" />
                <text x={blockX[1] + 70} y={blockY + 145} textAnchor="middle">REFEITÓRIO</text>
                <g className="general-stair-marker" aria-label="Escada do Bloco 2">
                  <path d={`M${blockX[1] + 49} ${blockY + 187} h42 v27 h-42 z`} />
                  <text x={blockX[1] + 70} y={blockY + 205} textAnchor="middle">ESCADA</text>
                </g>
              </g>
              <g className="lower-space lower-space--reference lower-space--combined">
                <rect x={blockX[1]} y={blockY + 222} width={blockWidth} height="110" />
                <text x={blockX[1] + 70} y={blockY + 258} textAnchor="middle">XEROX</text>
                <text x={blockX[1] + 70} y={blockY + 305} textAnchor="middle">SALA DE REUNIÃO</text>
              </g>
            </g>

            <g className="lower-block lower-block--3">
              <g className="lower-space lower-space--reference">
                <rect x={blockX[2]} y={blockY} width={blockWidth} height="96" />
                <text x={blockX[2] + 70} y={blockY + 55} textAnchor="middle">BIBLIOTECA</text>
              </g>
              <g className="lower-space lower-space--reference lower-space--blank">
                <rect x={blockX[2]} y={blockY + 96} width={blockWidth} height="126" />
              </g>
              <g className="general-stair-marker general-stair-marker--block3" aria-label="Escada do Bloco 3">
                <path d={`M${blockX[2] + 28} ${blockY + 188} h84 v30 h-84 z`} />
                <text x={blockX[2] + 70} y={blockY + 208} textAnchor="middle">ESCADA BLOCO 3</text>
              </g>
              <g className="lower-space lower-space--reference lower-space--blank">
                <rect x={blockX[2]} y={blockY + 222} width={blockWidth} height="110" />
              </g>
            </g>
          </>
        )}
      </svg>

      <div className="map-caption">
        <strong>{floor === 'upper' ? 'Mapa geral · 2º andar' : 'Mapa geral · 1º andar'}</strong>
        <span>
          {floor === 'upper'
            ? 'Os três blocos aparecem na mesma escala. Use “Salas de apresentação” para abrir cada sala.'
            : 'Os três blocos mantêm o mesmo formato retangular. O desenho segue o croqui do pavimento inferior.'}
        </span>
      </div>
    </div>
  )
}

function PresentationRoomsMap({
  destinationId,
  onZoneSelect
}: Omit<SchoolMapProps, 'view' | 'generalFloor'>) {
  const { currentLocation, visited } = useProgress()
  const destinationBlock = destinationId ? roomBlocks[destinationId] : null
  const currentBlock = currentLocation ? roomBlocks[currentLocation] : null
  const [selectedBlock, setSelectedBlock] = useState<BlockId>(destinationBlock ?? currentBlock ?? 'bloco-01')

  useEffect(() => {
    if (destinationBlock) setSelectedBlock(destinationBlock)
  }, [destinationBlock])

  useEffect(() => {
    if (!destinationId && currentBlock) setSelectedBlock(currentBlock)
  }, [currentBlock, destinationId])

  const blockRooms: Record<BlockId, string[]> = {
    'bloco-01': ['sala-01', 'sala-02', 'sala-03', 'sala-04', 'sala-05', 'sala-06'],
    'bloco-02': ['sala-07', 'sala-08', 'sala-09', 'sala-10', 'sala-11', 'sala-12', 'sala-16'],
    'bloco-03': ['sala-14', 'sala-15', 'sala-13', 'sala-17']
  }

  const rooms = blockRooms[selectedBlock]
  const buildingX = 250
  const buildingY = 125
  const buildingWidth = 260
  const buildingHeight = 350
  const roomHeight = buildingHeight / rooms.length

  const chooseBlock = (blockId: BlockId) => {
    setSelectedBlock(blockId)
    onZoneSelect?.(blockId)
  }

  return (
    <div className="map-shell map-shell--presentation-rooms" aria-label="Mapa das salas de apresentação">
      <div className="map-block-switcher" role="tablist" aria-label="Escolha o bloco das apresentações">
        {([
          ['bloco-01', 'Bloco 1', '01–06'],
          ['bloco-02', 'Bloco 2', '07–12 · 16'],
          ['bloco-03', 'Bloco 3', '13–15 · 17']
        ] as const).map(([id, label, roomsLabel]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={selectedBlock === id}
            className={selectedBlock === id ? 'map-block-tab is-active' : 'map-block-tab'}
            onClick={() => chooseBlock(id)}
          >
            <strong>{label}</strong>
            <small>salas {roomsLabel}</small>
          </button>
        ))}
      </div>

      <div className="map-room-stage" aria-live="polite">
        <svg className="school-map presentation-rooms-map" viewBox="0 0 760 560" role="img" aria-labelledby="presentationRoomsTitle presentationRoomsDesc" preserveAspectRatio="xMidYMid meet">
          <title id="presentationRoomsTitle">Salas de apresentação · {selectedBlock.replace('bloco-0', 'Bloco ')}</title>
          <desc id="presentationRoomsDesc">As salas do bloco selecionado aparecem dentro da mesma planta retangular usada no mapa geral.</desc>
          <rect x="20" y="20" width="720" height="520" rx="20" className="map-boundary" />

          <text x="380" y="72" textAnchor="middle" className="map-focused-title">
            {selectedBlock === 'bloco-01' ? 'Bloco 1' : selectedBlock === 'bloco-02' ? 'Bloco 2' : 'Bloco 3'}
          </text>
          <text x="380" y="99" textAnchor="middle" className="map-focused-subtitle">Salas de apresentação</text>

          <g className="presentation-building">
            <rect x={buildingX} y={buildingY} width={buildingWidth} height={buildingHeight} rx="12" className="presentation-building__shell" />
            {rooms.map((roomId, index) => (
              <Room
                key={roomId}
                id={roomId}
                x={buildingX}
                y={buildingY + index * roomHeight}
                width={buildingWidth}
                height={roomHeight}
                currentLocation={currentLocation}
                destinationId={destinationId}
                visited={visited}
                onZoneSelect={onZoneSelect}
              />
            ))}
            <rect x={buildingX} y={buildingY} width={buildingWidth} height={buildingHeight} rx="12" className="presentation-building__outline" />
          </g>

          <text x="380" y="505" textAnchor="middle" className="map-corridor-label">Toque em uma sala destacada para ver as exposições</text>
        </svg>
      </div>

      <div className="map-caption">
        <strong>{selectedBlock === 'bloco-01' ? 'Bloco 1' : selectedBlock === 'bloco-02' ? 'Bloco 2' : 'Bloco 3'}</strong>
        <span>As salas aparecem na mesma orientação retangular dos prédios do mapa geral.</span>
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

export function SchoolMap({ view, generalFloor = 'upper', ...props }: SchoolMapProps) {
  return view === 'rooms'
    ? <PresentationRoomsMap {...props} />
    : <GeneralMap floor={generalFloor} {...props} />
}
