/**
 * Todo lo que se puede personalizar sin tocar el resto del código.
 */
export const config = {
  /** Único lugar donde aparece su nombre completo */
  para: 'Mica Collino',

  /** Dirección publicada del regalo: es a donde lleva el QR de la tarjeta */
  url: 'https://atulian.github.io/RegaloCumple/',

  tarjeta: {
    titulo: 'Chuli',
    texto: 'tengo algo guardado para vos',
    pista: 'Escaneame',
    firma: 'con todo mi amor',
  },

  /** Lo primero que ve al escanear el QR: el sobre y tu carta */
  carta: {
    aviso: 'Llegó algo para vos,',
    titulo: 'Chuli',
    pista: 'Tocá el sobre',
    lineas: [
      'Gordi:',
      'Hoy es tu día, y quería que empezara distinto.',
      'Te preparé algo con recuerdos nuestros, un deseo para pedir y una sorpresa al final.',
      'Tomate tu tiempo, es todo para vos.',
      '¡Feliz cumple, chuchi!',
    ],
    firma: 'Te amo',
    boton: 'Empezar',
  },

  intro: {
    saludo: 'Feliz cumple,',
    titulo: 'Gordi',
    texto: 'guardé algo para vos adentro de este cofre',
    pista: 'Tocá el cofre',
  },

  album: {
    titulo: 'Nosotros',
    pista: 'Deslizá cada foto',
    /** Una frase por foto, en orden. Se repiten si hay más fotos que frases */
    frases: [
      'Nuestra familia',
      'Mirá esa carita, chuli',
      'Así de en paz me hacés sentir',
      'Todo empezó con vos',
      'Mi lugar favorito sos vos, gordi',
      'Con vos todo es mejor',
      'Tu risa, mi sonido preferido',
      'Te elijo todos los días, chuchi',
      'Qué lindo es quererte',
      'Sos mi casa',
      'Gracias por tanto, chuli',
      'Lo mejor que me pasó',
      'Y todo lo que nos falta vivir',
    ],
  },

  cumple: {
    titulo: '¡Feliz cumple, chuchi!',
    pista: 'Soplá las velitas',
    deseo: 'Tu deseo ya viene en camino…',
  },

  regalo: {
    titulo: 'Y falta lo mejor, gordi…',
    pista: 'Tocá el regalo',
  },

  /** Todos los textos del pase de embarque se cambian acá */
  ticket: {
    anuncio: 'Armá la valija, chuli',
    titulo: '¡Nos vamos a Río!',
    aerolinea: 'Chuli Airlines',
    pasajera: 'Mi Gordi',
    origenCodigo: 'COR',
    origenCiudad: 'Córdoba',
    destinoCodigo: 'GIG',
    destinoCiudad: 'Río de Janeiro',
    vuelo: 'CH 0214',
    fecha: 'Muy pronto',
    embarque: '08:15',
    puerta: '14',
    asiento: '1A',
    asientoNota: 'al lado mío',
    clase: 'Primera',
    firma: 'Te amo, chuchi. Feliz cumpleaños.',
    repetir: 'Volver a vivirlo',
  },
}
