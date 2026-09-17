import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const required = [
  'src/data/projects.ts',
  'src/data/routes.ts',
  'src/data/locations.ts',
  'src/map/SchoolMap.tsx',
  'docs/reference/README.md',
  'public/manifest.webmanifest',
  'public/sw.js',
  'public/_redirects'
]

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)))
if (missing.length) {
  console.error('Arquivos obrigatórios ausentes:', missing)
  process.exit(1)
}

const projectsSource = fs.readFileSync(path.join(root, 'src/data/projects.ts'), 'utf8')
const ids = [...projectsSource.matchAll(/\n\s*id: '([^']+)'/g)].map((m) => m[1])
const projectIds = ids.filter((id) => !id.startsWith('bloco-') && id !== 'entrada-croqui')
const expected = [
  'muro-berlim','math-infection','analogico-algoritmo','cesio-137','navegando-conhecimento',
  'evolucao-computador','revolucao-imunologica','analogico-digital','genoma-hiv','inovamente',
  'quimica-forense','historia-escola','futuro-movimento','40-anos-movimento','senai-maria-luiza'
]

for (const id of expected) {
  if (!projectIds.includes(id)) {
    console.error('Projeto ausente:', id)
    process.exit(1)
  }
}

const unique = new Set(expected)
if (unique.size !== 15) {
  console.error('Lista esperada não contém 15 IDs únicos.')
  process.exit(1)
}

const manifest = JSON.parse(fs.readFileSync(path.join(root, 'public/manifest.webmanifest'), 'utf8'))
if (!manifest.name || manifest.display !== 'standalone') {
  console.error('Manifesto PWA inválido.')
  process.exit(1)
}

console.log('Validação estática OK')
console.log('- 15 projetos esperados presentes')
console.log('- PWA manifest válido')
const locationsSource = fs.readFileSync(path.join(root, 'src/data/locations.ts'), 'utf8')
for (const id of ['entrada-pais','portao-secretaria','passarela']) {
  if (!locationsSource.includes(`id: '${id}'`)) {
    console.error('Localização de referência ausente:', id)
    process.exit(1)
  }
}
for (const room of ['09','10','17']) {
  if (!locationsSource.includes(`'${room}'`)) {
    console.error('Sala de referência ausente:', room)
    process.exit(1)
  }
}

console.log('- mapa, rotas, service worker e fallback SPA presentes')
console.log('- entrada dos pais, portão da secretaria, passarela e salas de referência presentes')
