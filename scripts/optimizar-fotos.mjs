// Achica las fotos de src/fotos a un tamaño cómodo para celular (corre solo antes de cada build).
import { readdir, readFile, writeFile, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'
import sharp from 'sharp'

const DIR = 'src/fotos'
const MAX = 1600
const archivos = (await readdir(DIR).catch(() => [])).filter((f) =>
  ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase()),
)
for (const f of archivos) {
  const ruta = join(DIR, f)
  const antes = (await stat(ruta)).size
  const img = sharp(await readFile(ruta)).rotate() // respeta la orientación del celular
  const { width = 0, height = 0 } = await img.metadata()
  if (Math.max(width, height) <= MAX && antes < 600_000) continue
  const ext = extname(f).toLowerCase()
  const red = img.resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
  const salida =
    ext === '.png' ? await red.png({ compressionLevel: 9 }).toBuffer()
    : ext === '.webp' ? await red.webp({ quality: 82 }).toBuffer()
    : await red.jpeg({ quality: 82, mozjpeg: true }).toBuffer()
  if (salida.length < antes) {
    await writeFile(ruta, salida)
    console.log(`${f}: ${(antes / 1024).toFixed(0)} KB -> ${(salida.length / 1024).toFixed(0)} KB`)
  }
}
console.log(`Fotos en el álbum: ${archivos.length || 'ninguna (se usan las de ejemplo)'}`)
