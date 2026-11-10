// Aventura educativa: estado separado de la presentación para verificar las reglas.
const misiones = [
  {
    "titulo": "El valle del prototipo",
    "historia": "El primer nivel está incompleto: las plataformas terminan en el vacío. Una criatura nacida de un error custodia el fragmento del prototipo. Aprende a probar una idea para reparar el camino.",
    "pregunta": "¿Para qué sirve un prototipo?",
    "opciones": [
      "Probar la mecánica principal con una versión sencilla.",
      "Sustituir todas las pruebas del juego.",
      "Publicar siempre la versión definitiva."
    ],
    "correcta": 0,
    "explicacion": "El prototipo permite comprobar la interacción principal antes de completar la producción."
  },
  {
    "titulo": "La forja de motores",
    "historia": "La forja del creador se apagó y sus herramientas quedaron dispersas. Vence al murciélago del taller para recuperar el fragmento que conecta los sistemas del mundo.",
    "pregunta": "¿Qué reúne un motor de videojuegos?",
    "opciones": [
      "Solamente imágenes y música.",
      "Sistemas para escenas, gráficos, entradas y sonido.",
      "Únicamente un servicio para vender juegos."
    ],
    "correcta": 1,
    "explicacion": "El motor integra sistemas que ayudan a construir la experiencia jugable."
  },
  {
    "titulo": "El puente de las reglas",
    "historia": "El puente ha olvidado sus reglas: nadie sabe qué acciones permiten cruzarlo. Recupera el fragmento de las mecánicas y devuelve el sentido a este lugar.",
    "pregunta": "¿Qué describe una mecánica?",
    "opciones": [
      "El nombre del estudio.",
      "El precio del videojuego.",
      "Una acción o sistema, como saltar o construir."
    ],
    "correcta": 2,
    "explicacion": "Las mecánicas definen cómo interactúa el jugador; las reglas delimitan sus condiciones."
  },
  {
    "titulo": "Las ruinas de los errores",
    "historia": "Los errores se repiten entre las ruinas y un centinela impide corregirlos. Aprende a investigar los fallos para recuperar el fragmento de las pruebas.",
    "pregunta": "¿Qué conviene hacer al observar un problema en las pruebas?",
    "opciones": [
      "Revisar su causa y ajustar el diseño o el código.",
      "Ignorarlo si el juego ya tiene imágenes.",
      "Eliminar todas las instrucciones."
    ],
    "correcta": 0,
    "explicacion": "Las pruebas sirven para detectar problemas y orientar mejoras."
  },
  {
    "titulo": "El santuario de las señales",
    "historia": "Las señales del mundo desaparecieron: nadie distingue un logro de un peligro. Derrota al hechicero y recupera el fragmento que permite comunicar lo que ocurre.",
    "pregunta": "¿Cómo comunicar mejor que se recuperó un fragmento?",
    "opciones": [
      "Solo cambiando un color.",
      "Usando únicamente un sonido.",
      "Combinando un indicador visual con un efecto de sonido."
    ],
    "correcta": 2,
    "explicacion": "Combinar señales evita depender de un único canal de información."
  },
  {
    "titulo": "La puerta del último capítulo",
    "historia": "El Error Final mantiene cerrada la puerta del último capítulo. Ya reparaste el camino: demuestra que una versión está lista para compartirse y completa la historia que quedó abandonada.",
    "pregunta": "¿Qué debe acompañar una versión lista para compartir?",
    "opciones": [
      "Solo los archivos temporales.",
      "Instrucciones, créditos y una comprobación de la versión final.",
      "Un prototipo sin revisar."
    ],
    "correcta": 1,
    "explicacion": "La publicación incluye preparar la entrega y comprobar qué recibirá el jugador."
  }
];
class PartidaLunar {
  constructor() { this.reiniciar(); }
  reiniciar() {
    const anteriores = this.ordenes;
    this.ordenes = misiones.map((mision, nivel) => {
      const orden = mision.opciones.map((_, indice) => indice);
      // Fisher-Yates: mezcla las opciones sin cambiar la identidad de la respuesta.
      for (let i = orden.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [orden[i], orden[j]] = [orden[j], orden[i]];
      }
      // En una nueva aventura, la correcta cambia de casilla respecto a la anterior.
      if (anteriores && orden.indexOf(mision.correcta) === anteriores[nivel].indexOf(mision.correcta)) {
        const posicion = orden.indexOf(mision.correcta);
        const otra = (posicion + 1 + Math.floor(Math.random() * (orden.length - 1))) % orden.length;
        [orden[posicion], orden[otra]] = [orden[otra], orden[posicion]];
      }
      return orden;
    });
    this.nivel = 0; this.superadas = 0; this.intentos = 0;
    this.resuelta = false; this.terminada = false; this.derrotado = false;
  }
  responder(opcion) {
    if (this.resuelta || this.terminada || this.derrotado || !Number.isInteger(opcion) || opcion < 0 || opcion > 2) return null;
    this.intentos++;
    const acierto = opcion === misiones[this.nivel].correcta;
    if (acierto) { this.superadas++; this.resuelta = true; this.terminada = this.superadas === misiones.length; }
    else this.derrotado = true;
    return acierto;
  }
  avanzar() {
    if (!this.resuelta || this.terminada) return false;
    this.nivel++; this.resuelta = false; return true;
  }
  reintentar() {
    if (!this.derrotado) return false;
    this.derrotado = false; return true;
  }
  get xp() { return this.superadas * 100; }
}
if (typeof module !== 'undefined') module.exports = { PartidaLunar, misiones };
// Las imágenes se amplían sin abandonar la lectura ni perder su posición.
if (typeof document !== 'undefined' && document.querySelector('.ampliar-recurso')) {
  const visor = document.createElement('dialog');
  visor.className = 'visor-imagen';
  visor.setAttribute('aria-label', 'Imagen ampliada');
  const cerrar = document.createElement('button');
  cerrar.type = 'button';
  cerrar.className = 'visor-cerrar';
  cerrar.textContent = 'Cerrar imagen ×';
  const imagen = document.createElement('img');
  const descripcion = document.createElement('p');
  descripcion.id = 'descripcion-imagen';
  visor.setAttribute('aria-describedby', descripcion.id);
  visor.append(cerrar, imagen, descripcion);
  document.body.append(visor);
  let origen;
  document.querySelectorAll('.ampliar-recurso').forEach(enlace => {
    enlace.setAttribute('aria-haspopup', 'dialog');
    enlace.addEventListener('click', evento => {
      // Conserva los atajos del navegador para abrir otra pestaña deliberadamente.
      if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) return;
      evento.preventDefault();
      origen = enlace;
      imagen.src = enlace.href;
      imagen.alt = enlace.querySelector('img').alt;
      descripcion.textContent = imagen.alt;
      document.documentElement.classList.add('visor-abierto');
      visor.showModal();
      cerrar.focus({ preventScroll: true });
    });
  });
  cerrar.addEventListener('click', () => visor.close());
  visor.addEventListener('click', evento => {
    const limites = visor.getBoundingClientRect();
    if (evento.target === visor && (evento.clientX < limites.left || evento.clientX > limites.right || evento.clientY < limites.top || evento.clientY > limites.bottom)) visor.close();
  });
  visor.addEventListener('close', () => {
    document.documentElement.classList.remove('visor-abierto');
    origen?.focus({ preventScroll: true });
  });
}
if (typeof document !== 'undefined' && document.querySelector('#aventura')) {
  const partida = new PartidaLunar();
  const $ = (id) => document.getElementById(id);
  const mensaje = $('mensaje-rpg');
  const enemigos = [
    ['Baba del valle', 'baba'], ['Murciélago de la forja', 'murcielago'],
    ['Esqueleto del puente', 'esqueleto'], ['Centinela de las ruinas', 'centinela'],
    ['Hechicero de las señales', 'hechicero'], ['Error Final · JEFE FINAL', 'guardian']
  ];
  let animando = false;
  let pantalla = 'menu';
  let iniciada = false;
  let escenaHistoria = 0;
  const historia = [
    { titulo: 'Un mundo sin final', texto: 'Durante años, el caballero recorrió el mismo camino sin encontrar un final. Un día descubrió la verdad: su mundo era un videojuego que su creador nunca terminó.', imagen: 'guerrero', alt: 'El caballero recorre un escenario incompleto y descubre los fragmentos de su mundo.' },
    { titulo: 'Los errores despertaron', texto: 'Los escenarios estaban rotos, las reglas habían desaparecido y los errores se habían convertido en criaturas. Entre las ruinas quedaron seis fragmentos capaces de reparar el juego.', imagen: 'senal', alt: 'El Error Final acecha entre plataformas rotas y bloquea la salida del mundo.' },
    { titulo: 'Escribe tu propio final', texto: 'Para salvar a sus habitantes, el caballero deberá aprender cómo se construye un videojuego. Tu conocimiento guiará su espada: recupera los seis fragmentos, derrota al Error Final y abre la puerta al último capítulo.', imagen: 'mision', alt: 'Los seis fragmentos rodean la puerta del último capítulo que el caballero debe abrir.' }
  ];
  function cambiarPantalla(destino, titulo) {
    pantalla = destino;
    $('menu-aventura').hidden = destino !== 'menu';
    $('historia-aventura').hidden = destino !== 'historia';
    $('aventura').hidden = destino !== 'juego';
    const panel = destino === 'menu' ? $('menu-aventura') : destino === 'historia' ? $('historia-aventura') : $('aventura');
    panel.scrollIntoView({ block: 'start', behavior: 'auto' });
    if (titulo) enfocar(titulo);
  }
  function mostrarMenu() {
    if (animando) return;
    $('iniciar-aventura').hidden = iniciada;
    $('continuar-aventura').hidden = !iniciada;
    $('continuar-aventura').textContent = partida.terminada ? 'Continuar al desenlace →' : 'Continuar aventura →';
    $('resumen-partida').hidden = !iniciada;
    $('resumen-partida').textContent = `Nivel ${partida.nivel + 1} de 6 · ${partida.superadas} ${partida.superadas === 1 ? 'fragmento' : 'fragmentos'} · ${partida.xp} XP`;
    cambiarPantalla('menu', $('titulo-menu'));
  }
  function mostrarHistoria() {
    const escena = historia[escenaHistoria];
    $('paso-historia').textContent = `HISTORIA / ${escenaHistoria + 1} DE 3`;
    $('titulo-historia').textContent = escena.titulo;
    $('texto-historia').textContent = escena.texto;
    $('imagen-historia').src = `img/historia-${escena.imagen}.svg`;
    $('imagen-historia').alt = escena.alt;
    $('historia-anterior').hidden = escenaHistoria === 0;
    $('historia-siguiente').textContent = escenaHistoria === 2 ? 'Comenzar el primer nivel ⚔' : 'Continuar →';
    cambiarPantalla('historia', $('titulo-historia'));
  }
  function comenzarPartida() {
    if (!iniciada) { mostrarMision(); iniciada = true; }
    cambiarPantalla('juego', $('titulo-mision'));
  }

  let versionCombate = 0;
  const animacionesCombate = new Set();
  async function animarCombate(elemento, cuadros, duracion, version) {
    const animacion = elemento.animate(cuadros, {
      duration: duracion, easing: 'ease-in-out', fill: 'forwards'
    });
    animacionesCombate.add(animacion);
    try { await animacion.finished; } catch { return false; }
    return version === versionCombate;
  }
  async function ejecutarGolpe(acierto, version) {
    const heroe = $('personaje');
    const enemigo = $('enemigo');
    const atacante = acierto ? heroe : enemigo;
    const victima = acierto ? enemigo : heroe;
    // Distancia real entre los dibujos: funciona con cada enemigo y tamaño de pantalla.
    const destino = acierto
      ? enemigo.offsetLeft + enemigo.offsetWidth * .18 - heroe.offsetWidth * .88
      : heroe.offsetLeft + heroe.offsetWidth * .72 - enemigo.offsetWidth * .18;
    const distancia = destino - atacante.offsetLeft;
    $('escena-subtitulo').textContent = acierto
      ? 'El guerrero se acerca al enemigo…' : 'El enemigo se acerca al guerrero…';
    if (!await animarCombate(atacante, [
      { transform: 'translateX(0)' },
      { transform: `translateX(${distancia * .35}px) translateY(-5px)`, offset: .35 },
      { transform: `translateX(${distancia * .7}px) translateY(-3px)`, offset: .7 },
      { transform: `translateX(${distancia}px)` }
    ], 650, version)) return;
    $('escena-subtitulo').textContent = acierto ? '¡Golpe de espada!' : '¡El enemigo golpea al guerrero!';
    if (acierto) {
      if (!await animarCombate(heroe.querySelector('.espada'), [
        { transform: 'rotate(-45deg)' }, { transform: 'rotate(65deg)', offset: .65 },
        { transform: 'rotate(12deg)' }
      ], 300, version)) return;
    } else {
      if (!await animarCombate(enemigo, [
        { transform: `translateX(${distancia}px) rotate(0)` },
        { transform: `translateX(${distancia - 15}px) rotate(-16deg)`, offset: .6 },
        { transform: `translateX(${distancia}px) rotate(0)` }
      ], 300, version)) return;
    }
    // La vida baja en el instante del impacto, antes de la caída.
    const barra = acierto ? $('vida-enemigo') : $('vida-heroe');
    const texto = acierto ? $('vida-enemigo-texto') : $('vida-heroe-texto');
    barra.style.width = '0%'; texto.textContent = acierto ? '0 / 100 · VENCIDO' : '0 / 100 · DERROTADO';
    const efecto = $('golpe-combate');
    efecto.textContent = '−100';
    efecto.style.left = `${victima.offsetLeft + victima.offsetWidth / 2}px`;
    animarCombate(efecto, [
      { opacity: 0, transform: 'translate(-50%,0) scale(.7)' },
      { opacity: 1, transform: 'translate(-50%,-15px) scale(1.2)', offset: .25 },
      { opacity: 0, transform: 'translate(-50%,-55px) scale(1)' }
    ], 650, version);
    if (!await animarCombate(victima, [
      { transform: 'translateX(0)', filter: 'brightness(1)', opacity: 1 },
      { transform: `translateX(${acierto ? 10 : -10}px)`, filter: 'brightness(2)', opacity: 1, offset: .2 },
      { transform: `translateX(${acierto ? 20 : -15}px) rotate(${acierto ? 75 : -75}deg) translateY(15px)`, filter: 'brightness(1)', opacity: acierto ? 0 : .5 }
    ], 600, version)) return;
    // El ganador regresa a su posición, dejando visible el resultado del duelo.
    await animarCombate(atacante, [
      { transform: `translateX(${distancia}px)` }, { transform: 'translateX(0)' }
    ], 350, version);
  }
  const enfocar = (elemento) => elemento.focus({ preventScroll: true });
  function encuadrarCombate() {
    // El encuadre empieza en el HUD y el mapa, no en el tablero situado debajo.
    // Conserva la posición si la cabecera del juego ya está visible.
    const aventura = $('aventura');
    const bordeSuperior = aventura.getBoundingClientRect().top;
    if (bordeSuperior < 0 || bordeSuperior > 32) {
      aventura.scrollIntoView({ block: 'start', behavior: 'auto' });
    }
  }
  function actualizarMundo() {
    $('nivel-hud').textContent = `${partida.nivel + 1} / 6`;
    $('cristales-hud').textContent = `${partida.superadas} / 6`;
    $('xp-hud').textContent = `${partida.xp} XP`;
    $('mapa-niveles').replaceChildren();
    misiones.forEach((m, i) => {
      const li = document.createElement('li');
      const completada = i < partida.superadas;
      li.className = completada ? 'superado' : i === partida.nivel ? 'actual' : 'bloqueado';
      if (i === partida.nivel) li.setAttribute('aria-current', 'step');
      const simbolo = document.createElement('span'); simbolo.setAttribute('aria-hidden', 'true');
      simbolo.textContent = completada ? '◆' : i === 5 ? '♜' : String(i + 1).padStart(2, '0');
      const nombre = document.createElement('span'); nombre.textContent = i === 5 ? 'Jefe final' : `Nivel ${i + 1}`;
      const estado = document.createElement('span'); estado.className = 'estado-mapa';
      estado.textContent = completada ? 'Superado' : i === partida.nivel ? 'Actual' : 'Bloqueado';
      li.append(simbolo, nombre, estado); $('mapa-niveles').append(li);
    });
    const paisajes = ['valle', 'forja', 'puente', 'ruinas', 'santuario', 'antena'];
    $('escenario').dataset.zona = paisajes[partida.nivel];
    $('escenario').classList.toggle('combate-jefe', partida.nivel === 5);
    $('escenario').classList.toggle('aventura-ganada', partida.terminada);
    $('escenario').style.setProperty('--paso-heroe', `${12 + partida.nivel * 2}%`);
    $('zona-rotulo').textContent = `ZONA ${partida.nivel + 1} / ${misiones[partida.nivel].titulo.toUpperCase()}`;
    $('nombre-enemigo').textContent = enemigos[partida.nivel][0];
    $('enemigo').replaceChildren();
    const imagen = document.createElement('img');
    imagen.src = `img/enemigo-${enemigos[partida.nivel][1]}.svg`; imagen.alt = '';
    imagen.width = 140; imagen.height = 140; $('enemigo').append(imagen);
    $('enemigo').classList.toggle('es-jefe', partida.nivel === 5);
    $('vida-heroe').style.width = '100%'; $('vida-heroe-texto').textContent = '100 / 100';
    $('vida-enemigo').style.width = '100%'; $('vida-enemigo-texto').textContent = '100 / 100';
    $('cristal-escena').hidden = true; $('portal').hidden = true;
    $('escena-subtitulo').textContent = partida.nivel === 5 ? 'El jefe final te desafía. ¡Prepara tu respuesta!' : `${enemigos[partida.nivel][0]} bloquea el camino.`;
  }
  function mostrarMision(enfocarTitulo = false) {
    versionCombate++; animando = false; $('volver-menu').disabled = false;
    animacionesCombate.forEach((animacion) => animacion.cancel());
    animacionesCombate.clear();
    const m = misiones[partida.nivel];
    $('escenario').classList.remove('ataque-heroe', 'ataque-enemigo', 'resultado-acierto', 'resultado-error');
    $('mision').hidden = false; $('victoria').hidden = true; $('tablero-combate').hidden = false;
    $('mision-etiqueta').textContent = partida.nivel === 5 ? 'JEFE FINAL / EL ERROR FINAL' : `COMBATE ${partida.nivel + 1} DE 6`;
    $('titulo-mision').textContent = m.titulo; $('historia-mision').textContent = m.historia;
    $('pregunta-mision').textContent = m.pregunta;
    $('respuestas-mision').replaceChildren();
    partida.ordenes[partida.nivel].forEach((indiceOriginal, i) => {
      const texto = m.opciones[indiceOriginal];
      const label = document.createElement('label');
      const input = document.createElement('input'); input.type = 'radio'; input.name = 'respuesta'; input.value = String(indiceOriginal); input.required = true;
      const letra = document.createElement('span'); letra.className = 'opcion-letra'; letra.textContent = ['A', 'B', 'C'][i];
      const contenido = document.createElement('span'); contenido.textContent = texto;
      label.append(input, letra, contenido); $('respuestas-mision').append(label);
    });
    $('opciones-mision').disabled = false; $('responder').hidden = false;
    $('siguiente').hidden = true; $('reintentar').hidden = true;
    mensaje.textContent = ''; mensaje.className = 'mensaje-rpg';
    actualizarMundo(); if (enfocarTitulo) { encuadrarCombate(); enfocar($('titulo-mision')); }
  }
  $('rpg-form').addEventListener('submit', async (evento) => {
    evento.preventDefault();
    if (animando || pantalla !== 'juego') return;
    const seleccion = $('rpg-form').querySelector('input:checked'); if (!seleccion) return;
    const acierto = partida.responder(Number(seleccion.value)); if (acierto === null) return;
    animando = true; $('volver-menu').disabled = true; const version = ++versionCombate;
    $('opciones-mision').disabled = true; $('responder').hidden = true;
    encuadrarCombate();
    $('escenario').classList.add(acierto ? 'ataque-heroe' : 'ataque-enemigo');
    $('golpe-combate').textContent = acierto ? '−100' : 'DERROTA';
    $('escena-subtitulo').textContent = acierto ? '¡El guerrero ataca con su espada!' : '¡El enemigo contraataca!';
    mensaje.className = `mensaje-rpg ${acierto ? 'acierto' : 'pista'}`;
    mensaje.textContent = acierto ? 'Preparando el ataque del guerrero…' : 'El enemigo prepara su ataque…';
    // Preferencia explícita del jugador para este minijuego; no modifica el sistema.
    const reducido = !$('animar-combate').checked;
    if (reducido) {
      $('escenario').classList.add(acierto ? 'resultado-acierto' : 'resultado-error');
      await new Promise((resolve) => setTimeout(resolve, 80));
    } else {
      await ejecutarGolpe(acierto, version);
    }
    if (version !== versionCombate) return; // Un reinicio cancela el resultado anterior.
    animando = false; $('volver-menu').disabled = false;
    if (acierto) {
      $('vida-enemigo').style.width = '0%'; $('vida-enemigo-texto').textContent = '0 / 100 · VENCIDO';
      $('nivel-hud').textContent = `${partida.nivel + 1} / 6`;
      $('cristales-hud').textContent = `${partida.superadas} / 6`; $('xp-hud').textContent = `${partida.xp} XP`;
      const zona = $('mapa-niveles').children[partida.nivel]; zona.className = 'superado'; zona.querySelector('.estado-mapa').textContent = 'Superado';
      $('escena-subtitulo').textContent = 'Fragmento recuperado. +100 XP. El mundo vuelve a funcionar.';
      mensaje.textContent = `¡Combate ganado! ${misiones[partida.nivel].explicacion}`;
      $('siguiente').hidden = false; $('siguiente').textContent = partida.terminada ? 'Ver victoria final ✦' : 'Siguiente nivel →';
      enfocar($('siguiente'));
    } else {
      $('vida-heroe').style.width = '0%'; $('vida-heroe-texto').textContent = '0 / 100 · DERROTADO';
      $('escena-subtitulo').textContent = 'El guerrero ha caído. Reintenta para levantarte.';
      mensaje.textContent = `Derrota. Pista: ${misiones[partida.nivel].explicacion}`;
      $('reintentar').hidden = false; enfocar($('reintentar'));
    }
  });
  $('reintentar').addEventListener('click', () => { if (partida.reintentar()) mostrarMision(true); });
  $('siguiente').addEventListener('click', () => {
    if (animando) return;
    if (partida.terminada) {
      $('tablero-combate').hidden = true; $('victoria').hidden = false;
      $('intentos-finales').textContent = `${partida.intentos} intentos`;
      $('victoria').scrollIntoView({ block: 'start' }); enfocar($('titulo-victoria'));
    } else if (partida.avanzar()) mostrarMision(true);
  });
  $('reiniciar').addEventListener('click', () => {
    $('confirmacion-reinicio').hidden = false; enfocar($('cancelar-reinicio'));
    $('confirmacion-reinicio').scrollIntoView({ block: 'nearest' });
  });
  $('cancelar-reinicio').addEventListener('click', () => {
    $('confirmacion-reinicio').hidden = true; enfocar($('reiniciar'));
  });
  $('confirmar-reinicio').addEventListener('click', () => {
    partida.reiniciar(); $('confirmacion-reinicio').hidden = true; mostrarMision(true);
  });
  $('nueva-aventura').addEventListener('click', () => {
    partida.reiniciar(); iniciada = false; escenaHistoria = 0;
    $('confirmacion-reinicio').hidden = true; mostrarHistoria();
  });
  $('iniciar-aventura').addEventListener('click', () => { escenaHistoria = 0; mostrarHistoria(); });
  $('continuar-aventura').addEventListener('click', () => {
    cambiarPantalla('juego', $('victoria').hidden ? $('titulo-mision') : $('titulo-victoria'));
  });
  $('historia-siguiente').addEventListener('click', () => {
    if (escenaHistoria < 2) { escenaHistoria++; mostrarHistoria(); } else comenzarPartida();
  });
  $('historia-anterior').addEventListener('click', () => {
    if (escenaHistoria > 0) { escenaHistoria--; mostrarHistoria(); }
  });
  $('omitir-historia').addEventListener('click', comenzarPartida);
  $('historia-menu').addEventListener('click', mostrarMenu);
  $('volver-menu').addEventListener('click', mostrarMenu);
  $('animar-menu').addEventListener('change', () => { $('animar-combate').checked = $('animar-menu').checked; });
  $('animar-combate').addEventListener('change', () => { $('animar-menu').checked = $('animar-combate').checked; });
  // La primera pregunta se construye únicamente cuando comienza la partida.
}
