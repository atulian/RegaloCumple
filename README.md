# Regalo de cumple 💝

Una experiencia animada para abrir desde el celular: un cofre 3D que se abre,
un álbum de fotos para deslizar y un regalo final con un pase de embarque a Río de Janeiro.

Hecho con Vite, React 19, Three.js (React Three Fiber + postprocesado) y Motion.

## Personalizar

| Qué | Dónde |
| --- | --- |
| **Fotos** (la cantidad que quieras) | Copialas a `src/fotos/` (jpg, png o webp). Se ordenan por nombre: `01.jpg`, `02.jpg`… Las HEIC de iPhone hay que pasarlas a JPG. |
| **Música** | Copiá la canción como `public/musica.mp3`. |
| **Textos, frases y datos del ticket** | `src/config.ts` |

Mientras `src/fotos/` esté vacía se muestran fotos de ejemplo.
Las fotos pesadas se achican solas al compilar.

## Probar en la compu

```bash
npm install
npm run dev
```

## Publicar

En GitHub: **Settings → Pages → Source: GitHub Actions**. Después de eso, cada cambio
que se sube se publica solo y el link queda en la pestaña **Actions**.
