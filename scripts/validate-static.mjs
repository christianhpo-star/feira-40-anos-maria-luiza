import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const required = [
  'src/data/projects.ts',
  'src/data/routes.ts',
  'src/data/locations.ts',
  'src/data/site.ts',
  'src/map/SchoolMap.tsx',
  'public/images/logo-escola.png',
  'public/icons/icon-192.png',
  'public/icons/icon-512.png',
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
const ids = [...projectsSource.matchAll(/\n\s*id: '([^']+)'/g)].map((match) => match[1])
const expected = [
  'muro-berlim','math-infection','analogico-algoritmo','cesio-137','navegando-conhecimento',
  'evolucao-computador','revolucao-imunologica','analogico-digital','genoma-hiv','inovamente',
  'quimica-forense','historia-escola','futuro-movimento','40-anos-movimento','senai-maria-luiza'
]

for (const id of expected) {
  if (!ids.includes(id)) {
    console.error('Projeto ausente:', id)
    process.exit(1)
  }
}

if (new Set(expected).size !== 15) {
  console.error('Lista esperada não contém 15 IDs únicos.')
  process.exit(1)
}

const manifest = JSON.parse(fs.readFileSync(path.join(root, 'public/manifest.webmanifest'), 'utf8'))
if (!manifest.name || manifest.display !== 'standalone' || manifest.theme_color !== '#901d73') {
  console.error('Manifesto PWA inválido ou fora da identidade visual atual.')
  process.exit(1)
}

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

const sourceFiles = []
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) sourceFiles.push(full)
  }
}
walk(path.join(root, 'src'))

const forbiddenPublicCopy = [
  /Roteiro provisório/i,
  /Informação pendente/i,
  /Ainda precisamos confirmar/i,
  /Próxima etapa sugerida/i,
  /sujeit[oa] a confirmação/i,
  /A confirmar/i,
  /recalibrad[oa]/i,
  /ordem será refinada/i,
  /permanecerá desativad[oa]/i,
  /moderação e privacidade/i,
  /o app não usa GPS/i
]

for (const file of sourceFiles) {
  const source = fs.readFileSync(file, 'utf8')
  for (const pattern of forbiddenPublicCopy) {
    if (pattern.test(source)) {
      console.error(`Texto interno encontrado em área pública: ${path.relative(root, file)} -> ${pattern}`)
      process.exit(1)
    }
  }
}

const appSource = fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8')
if (appSource.includes('/capsula') || appSource.includes('CapsulePage')) {
  console.error('Rota conceitual da Cápsula do Tempo não deve estar publicada nesta versão.')
  process.exit(1)
}

console.log('Validação estática OK')
console.log('- 15 projetos esperados presentes')
console.log('- identidade visual e PWA válidos')
console.log('- mapa, rotas, service worker e fallback SPA presentes')
console.log('- entrada, portão da secretaria, passarela e salas de referência presentes')
console.log('- nenhum texto interno bloqueado foi encontrado na interface pública')
