import type { Location } from '../types'

const room = (id: string, label: string, zone: Location['zone']): Location => ({
  id,
  label,
  shortLabel: label,
  description: 'As salas de aula ficam geralmente no 2º andar. O pavimento exato desta sala ainda não foi confirmado individualmente.',
  zone,
  floor: '2º andar (referência geral)',
  pending: true
})

export const locations: Location[] = [
  {
    id: 'entrada-pais',
    label: 'Portão de Entrada · pais e responsáveis',
    shortLabel: 'Entrada dos pais',
    description: 'Portão de entrada indicado no mapa de blocos para acesso dos visitantes.',
    zone: 'external',
    floor: 'Térreo'
  },
  {
    id: 'portao-secretaria',
    label: 'Portão da Secretaria',
    shortLabel: 'Secretaria',
    description: 'Portão separado, indicado no lado oposto ao portão de entrada dos visitantes.',
    zone: 'external',
    floor: 'Térreo'
  },
  {
    id: 'bloco-01-oeste',
    label: 'Bloco 1',
    shortLabel: 'Bloco 1',
    description: 'Bloco com as salas 01, 02, 03, 04, 05 e 06.',
    zone: 'west'
  },
  {
    id: 'bloco-02-central',
    label: 'Bloco 2',
    shortLabel: 'Bloco 2',
    description: 'Bloco com as salas 07, 08, 09, 10, 11, 12 e 16.',
    zone: 'central'
  },
  {
    id: 'bloco-03-direita',
    label: 'Bloco 3',
    shortLabel: 'Bloco 3',
    description: 'Bloco com as salas 14, 15, 13 e 17.',
    zone: 'right'
  },
  {
    id: 'passarela',
    label: 'Passarela entre Bloco 1 e Bloco 2',
    shortLabel: 'Passarela',
    description: 'Ligação indicada no mapa de blocos entre o Bloco 1 e o Bloco 2.',
    zone: 'connector'
  },
  {
    id: 'escada-ligacao',
    label: 'Escada / ligação entre prédios',
    shortLabel: 'Escada',
    description: 'Ligação indicada no croqui geral entre os prédios. Não há elevador ou rampa acessível.',
    zone: 'connector'
  },
  {
    id: 'patio',
    label: 'Pátio',
    shortLabel: 'Pátio',
    description: 'Área aberta central indicada no croqui geral da escola.',
    zone: 'external',
    floor: 'Térreo'
  },
  {
    id: 'quadra',
    label: 'Quadra',
    shortLabel: 'Quadra',
    description: 'Quadra indicada no lado direito do croqui geral.',
    zone: 'external',
    floor: 'Térreo'
  },
  {
    id: 'quadra-areia',
    label: 'Quadra de areia',
    shortLabel: 'Quadra de areia',
    description: 'Área de lazer / quadra de areia, onde acontece o projeto “Quarenta anos em movimento!”.',
    zone: 'external',
    floor: 'Térreo'
  },
  {
    id: 'refeitorio-cantina',
    label: 'Refeitório / Cantina',
    shortLabel: 'Refeitório',
    description: 'Cantina e refeitório são o mesmo espaço. O croqui geral indica a cantina no 1º andar.',
    zone: 'central',
    floor: '1º andar'
  },
  {
    id: 'laboratorio-ciencias',
    label: 'Laboratório de Ciências',
    shortLabel: 'Laboratório',
    description: 'A localização física exata ainda não foi informada.',
    zone: 'unknown',
    pending: true
  },
  ...['01', '02', '03', '04', '05', '06'].map((n) => room(`sala-${n}`, `Sala ${n}`, 'west')),
  ...['07', '08', '09', '10', '11', '12', '16'].map((n) => room(`sala-${n}`, `Sala ${n}`, 'central')),
  ...['14', '15', '13', '17'].map((n) => room(`sala-${n}`, `Sala ${n}`, 'right'))
]

export const locationById = Object.fromEntries(locations.map((location) => [location.id, location])) as Record<string, Location>
