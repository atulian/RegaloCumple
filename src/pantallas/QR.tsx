import QRCode from 'qrcode'

/** QR dibujado a mano con puntos redondeados */
export function QR({ texto }: { texto: string }) {
  const { modules } = QRCode.create(texto, { errorCorrectionLevel: 'Q' })
  const n = modules.size
  const esOjo = (x: number, y: number) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7)
  const puntos: React.ReactNode[] = []
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++)
      if (modules.get(x, y) && !esOjo(x, y))
        puntos.push(<rect key={`${x}-${y}`} x={x + 0.06} y={y + 0.06} width="0.88" height="0.88" rx="0.3" />)
  const ojo = (x: number, y: number) => (
    <g key={`o${x}-${y}`}>
      <rect x={x + 0.5} y={y + 0.5} width="6" height="6" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x={x + 2} y={y + 2} width="3" height="3" rx="1" />
    </g>
  )
  return (
    <svg className="qr" viewBox={`-1 -1 ${n + 2} ${n + 2}`} fill="currentColor" role="img" aria-label="Código QR del regalo">
      {puntos}
      {ojo(0, 0)}
      {ojo(n - 7, 0)}
      {ojo(0, n - 7)}
    </svg>
  )
}
