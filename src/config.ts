/**
 * Todo lo que se puede personalizar sin tocar el resto del código.
 */
export const config = {
  /** Único lugar donde aparece su nombre completo */
  para: 'Mica Collino',

  /** Dirección publicada del regalo: es a donde lleva el QR de la tarjeta */
  url: 'https://atulian.github.io/RegaloCumple/',

  tarjeta: {
    titulo: 'Amor',
    texto: 'tengo algo guardado para vos',
    pista: 'Escaneame, amor',
    firma: 'con todo mi amor',
  },

  /** Lo primero que ve al escanear el QR: el sobre y tu carta */
  carta: {
    aviso: 'Llegó algo para vos,',
    titulo: 'Amor',
    pista: 'Tocá el sobre, amor',
    lineas: [
      'Amor:',
      'Hoy es tu día, y quería que empezara distinto.',
      'Te preparé algo con recuerdos nuestros, un deseo para pedir y una sorpresa al final.',
      'Tomate tu tiempo, es todo para vos.',
      '¡Feliz cumple, amor!',
    ],
    firma: 'Con todo mi amor',
    boton: 'Empezar, amor',
  },

  intro: {
    saludo: 'Feliz cumple,',
    titulo: 'Amor',
    texto: 'guardé algo para vos adentro de este cofre',
    pista: 'Tocá el cofre, amor',
  },

  album: {
    titulo: 'Nosotros, amor',
    pista: 'Deslizá cada foto, amor',
    /** Se van repitiendo en orden si hay más fotos que frases */
    frases: [
      'Nuestra familia, amor',
      'Mirá esa carita, amor',
      'Así de en paz me hacés sentir, amor',
      'Todo empezó con vos, amor',
      'Mi lugar favorito sos vos, amor',
      'Con vos todo es mejor, amor',
      'Tu risa, amor, mi sonido preferido',
      'Cada día te elijo, amor',
      'Qué lindo es quererte, amor',
      'Sos mi casa, amor',
      'Gracias por tanto, amor',
      'Lo mejor que me pasó, amor',
      'Y lo que nos falta vivir, amor',
    ],
  },

  cumple: {
    titulo: '¡Feliz cumple, amor!',
    pista: 'Soplá las velitas, amor',
    deseo: 'Tu deseo ya viene en camino, amor…',
  },

  regalo: {
    titulo: 'Y falta lo mejor, amor…',
    pista: 'Tocá el regalo, amor',
  },

  /** Todos los textos del pase de embarque se cambian acá */
  ticket: {
    anuncio: 'Armá la valija, amor',
    titulo: '¡Nos vamos a Río!',
    aerolinea: 'Amor Airlines',
    pasajera: 'Mi Amor',
    origenCodigo: 'COR',
    origenCiudad: 'Córdoba',
    destinoCodigo: 'GIG',
    destinoCiudad: 'Río de Janeiro',
    vuelo: 'AM 0214',
    fecha: 'Muy pronto',
    embarque: '08:15',
    puerta: '14',
    asiento: '1A',
    asientoNota: 'al lado mío',
    clase: 'Primera',
    firma: 'Te amo, amor. Feliz cumpleaños.',
    repetir: 'Volver a vivirlo, amor',
  },
}
