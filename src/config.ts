/**
 * Todo lo que se puede personalizar sin tocar el resto del código.
 */
export const config = {
  /** Único lugar donde aparece su nombre completo */
  para: 'Mica Collino',

  /** Dirección publicada del regalo: es a donde lleva el QR de la tarjeta */
  url: 'https://atulian.github.io/RegaloCumple/',

  /** Lo que dice la perrita en su globo, al lado del sobre */
  perrita: {
    globo: '¡Soy Bruna!',
  },

  /** Música: el código del video de YouTube (lo que va después de youtu.be/). Vacío = usa public/musica.mp3 */
  musica: {
    youtube: 'M05xCP34uUw',
    desdeSegundo: 0,
  },

  tarjeta: {
    titulo: 'Chuli',
    texto: 'tengo algo guardado para vos',
    pista: 'Escaneame',
    firma: 'con todo mi amor',
  },

  /** Pantalla para la tele (tele.html): cuenta regresiva y, a la hora indicada, aparece el QR */
  tele: {
    /** Fecha y hora en que se revela, en la hora local del dispositivo que transmite */
    revelar: '2026-11-17T00:00:00',
    espera: 'Algo está por llegar…',
    globoEspera: '¡Ya falta poco!',
    saludo: 'Feliz cumple,',
    titulo: 'Chuli',
    texto: 'tengo algo guardado para vos',
    pista: 'Escaneá con la cámara de tu celu',
    globo: '¡Feliz cumple!',
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
      'Nuestra hija perruna',
      'Así de en paz me hacés sentir',
      'Las reinas de la casa',
      'Mi lugar favorito sos vos, gordi',
      'La sonrisa más linda',
      'Brindar con vos',
      'Las llaves de nuestra casa',
      'De paseo con vos',
      'Listos para salir',
      'Hasta la cima con vos, chuchi',
      'Un beso en las nubes',
      'Cantando juntos',
      'Entre viñedos con vos',
      'Tardes así',
      'Río, la primera vez',
      'Arriba del Pan de Azúcar',
      'Mar, sol y vos, chuli',
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
    titulo: '¡Volvemos a Río!',
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
