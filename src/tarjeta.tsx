import { createRoot } from 'react-dom/client'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/caveat/500.css'
import '@fontsource-variable/inter'
import './estilos.css'
import './tarjeta.css'
import { config } from './config'
import { Perrita } from './pantallas/Perrita'
import { QR } from './pantallas/QR'

const t = config.tarjeta

createRoot(document.getElementById('root')!).render(
  <main className="tarjeta-pagina">
    <article className="tarjeta">
      <div className="tarjeta-borde" />
      <p className="para">Para {config.para}</p>
      <h1 className="titulo-xl">{t.titulo}</h1>
      <p className="bajada">{t.texto}</p>
      <div className="qr-marco">
        <QR texto={config.url} />
      </div>
      <p className="pista">
        <span className="pulso" />
        {t.pista}
      </p>
      <p className="tarjeta-firma">{t.firma}</p>
      <Perrita gorro className="tarjeta-perrita" />
    </article>
  </main>,
)
