/**
 * Toma TODAS las fotos que haya en src/fotos (la cantidad que sea),
 * ordenadas por nombre de archivo. Si la carpeta está vacía usa las de ejemplo.
 */
const propias = import.meta.glob(
  './fotos/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP,AVIF,GIF}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>

const ejemplo = import.meta.glob('./placeholders/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const ordenar = (m: Record<string, string>) =>
  Object.keys(m)
    .sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))
    .map((k) => m[k])

export const fotos: string[] =
  Object.keys(propias).length > 0 ? ordenar(propias) : ordenar(ejemplo)
