import type { Location } from '../types'

const room = (id: string, label: string, zone: Location['zone']): Location => ({
  id,
  label,
  shortLabel: label,
  description: 'Sala de exposição da Feira do Conhecimento.',
  zone
})

export const locations: Location[] = [
  {
    id: 'entrada-pais',
    label: 'Portão de Entrada · famílias e visitantes',
    shortLabel: 'Entrada principal',
    description: 'Entrada indicada para famílias e visitantes da feira.',
    zone: 'external',
    floor: 'Térreo'
  },
  {
    id: 'portao-secretaria',
    label: 'Portão da Secretaria',
    shortLabel: 'Secretaria',
    description: 'Acesso da Secretaria.',
    zone: 'external',
    floor: 'Térreo'
  },
  {
    id: 'bloco-01-oeste',
    label: 'Bloco 1',
    shortLabel: 'Bloco 1',
    description: 'No 2º andar ficam as salas 01 a 06. No 1º andar ficam o Laboratório de Química e a Sala dos Professores.',
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
    description: 'Bloco com as salas 13, 14, 15 e 17.',
    zone: 'right'
  },
  {
    id: 'passarela',
    label: 'Passarela',
    shortLabel: 'Passarela',
    description: 'Ligação entre o Bloco 1 e o Bloco 2.',
    zone: 'connector'
  },
  {
    id: 'escada-ligacao',
    label: 'Escada / ligação entre prédios',
    shortLabel: 'Escada',
    description: 'Ligação entre as áreas de salas.',
    zone: 'connector'
  },
  {
    id: 'patio',
    label: 'Pátio',
    shortLabel: 'Pátio',
    description: 'Área aberta central da escola.',
    zone: 'external',
    floor: 'Térreo'
  },
  {
    id: 'quadra',
    label: 'Quadra',
    shortLabel: 'Quadra',
    description: 'Quadra da escola.',
    zone: 'external',
    floor: 'Térreo'
  },
  {
    id: 'quadra-areia',
    label: 'Quadra de areia',
    shortLabel: 'Quadra de areia',
    description: 'Área de lazer onde acontece o projeto “Quarenta anos em movimento!”.',
    zone: 'external',
    floor: 'Térreo'
  },
  {
    id: 'refeitorio-cantina',
    label: 'Refeitório / Cantina',
    shortLabel: 'Refeitório',
    description: 'Espaço do refeitório e da cantina.',
    zone: 'central',
    floor: '1º andar'
  },
  {
    id: 'laboratorio-ciencias',
    label: 'Laboratório de Química',
    shortLabel: 'Lab. Química',
    description: 'Laboratório de Química localizado no 1º andar do Bloco 1, ao lado da Sala dos Professores.',
    zone: 'west',
    floor: '1º andar'
  },
  {
    id: 'sala-professores',
    label: 'Sala dos Professores',
    shortLabel: 'Professores',
    description: 'Sala dos Professores localizada no 1º andar do Bloco 1, ao lado do Laboratório de Química.',
    zone: 'west',
    floor: '1º andar'
  },
  ...['01', '02', '03', '04', '05', '06'].map((n) => room(`sala-${n}`, `Sala ${n}`, 'west')),
  ...['07', '08', '09', '10', '11', '12', '16'].map((n) => room(`sala-${n}`, `Sala ${n}`, 'central')),
  ...['14', '15', '13', '17'].map((n) => room(`sala-${n}`, `Sala ${n}`, 'right'))
]

export const locationById = Object.fromEntries(locations.map((location) => [location.id, location])) as Record<string, Location>
