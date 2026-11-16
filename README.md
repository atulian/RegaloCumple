# Regalo de cumple 💝

Una experiencia animada para abrir desde el celular: un cofre 3D que se abre,
un álbum de fotos para deslizar y un regalo final con un pase de embarque a Río de Janeiro.

Hecho con Vite, React 19, Three.js (React Three Fiber + postprocesado) y Motion.

## Personalizar

| Qué | Dónde |
| --- | --- |
| **Fotos** | Carpeta `src/fotos/` |
| **Música** | Copiá la canción como `public/musica.mp3` |
| **Todos los textos** (carta, frases, ticket, tarjeta) | `src/config.ts` |

### Agregar fotos desde el celular o la compu

1. Entrá al repositorio en github.com y abrí la carpeta `src/fotos`.
2. **Add file → Upload files**, elegí las fotos y tocá **Commit changes**.
3. En uno o dos minutos se publican solas en el mismo link.

- Formatos: jpg, png o webp. Las HEIC de iPhone hay que pasarlas a JPG.
- Orden: alfabético por nombre de archivo (`01.jpg`, `02.jpg`, … `10.jpg`).
- Para sacar una foto: abrila en GitHub y elegí **Delete file**.
- Cantidad: el álbum no tiene tope. GitHub acepta hasta 100 archivos por subida
  y 25 MB por foto. Al publicar, cada foto se achica sola para que cargue rápido.
  Para que no se haga largo, lo ideal es entre 15 y 30.
- Cada foto usa una frase de `album.frases` en `src/config.ts`, en el mismo orden.

## Probar en la compu

```bash
npm install
npm run dev
```

## Publicar

En GitHub: **Settings → Pages → Source: GitHub Actions**. Después de eso, cada cambio
que se sube se publica solo y el link queda en la pestaña **Actions**.
