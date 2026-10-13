/* Devil's XS Garage — datos, ilustraciones y conexión con la nube.
   Lo usan index.html (clientes) y admin.html (panel). */
(function () {
  'use strict';

  /* ---------- Paleta tomada del logo ---------- */
  const COLORES = {
    negro: '#030504',
    carbono: '#0A0E0B',
    verde: '#3BFF2E',
    violeta: '#4B33C9',
    morado: '#140E33',
    hueso: '#E6F2E1'
  };

  const CATEGORIAS = ['Paquetes', 'A la carta'];

  const CONFIG_BASE = {
    whatsapp: '524381113112',
    instagram: 'devils_xs_garage',
    horario: 'Lunes a sábado',
    zona: 'CDMX y Michoacán',
    zonas: 'CDMX, Michoacán',
    aviso: 'Las refacciones extra que necesite tu moto se cotizan aparte y te avisamos antes de cambiarlas.'
  };

  /* ---------- Textos de la página (se editan en el panel, pestaña Página) ---------- */
  const TEXTOS_BASE = {
    hero_brocha: 'luces fuera, a rodar',
    hero_t1: 'Tu moto', hero_t2: 'al cien',
    hero_sub: 'Servicio Express, Básico y Completo en CDMX y Michoacán. Escoge tu servicio, agenda por WhatsApp y recógela lista para rodar.',
    st_1: 'CDMX y Michoacán', st_2: 'Agenda por WhatsApp',
    cintas: 'Cambio de aceite, Bujías, Cadena y CVT, Frenos, Carburador, Filtro de aire, Batería, Suspensión, Diagnóstico',
    man_brocha: 'lo que le hacemos',
    manifiesto: 'Aceite nuevo. Bujía revisada. Cadena tensa. *Frenos limpios. Te decimos qué se le hizo a tu moto y *qué le falta, antes de cambiar cualquier pieza.',
    guia_brocha: '¿no sabes cuál?', guia_t1: '¿Cuál le', guia_t2: 'toca?',
    carta_brocha: 'si solo necesitas una cosa', carta_t1: 'Servicios', carta_t2: 'sueltos',
    pasos_brocha: 'sin vueltas', pasos_t1: 'Así agendas',
    paso1_t: 'Elige tu servicio', paso1_p: 'Escoge el paquete y la cilindrada de tu moto. Puedes sumar servicios sueltos.',
    paso2_t: 'Mándalo por WhatsApp', paso2_p: 'Se escribe solito con tu moto, el servicio y el total. Te confirmamos día y hora.',
    paso3_t: 'Recógela lista', paso3_p: 'Te avisamos qué se le hizo y si algo más necesita atención, antes de cambiar piezas.',
    fin_brocha: 'aquí te esperamos', fin_t1: '¿Lista para', fin_t2: 'rodar?',
    escenas: {
      express: { t1: 'Express', t2: 'servicio', brocha: 'lo esencial para seguir rodando', st: 'Rápido' },
      basico: { t1: 'Básico', t2: '12 puntos', brocha: 'el que toda moto necesita', st: 'Revisión completa' },
      completo: { t1: 'Completo', t2: 'a fondo', brocha: 'para carretera o una vez al año', st: 'Nuevo' }
    },
    portada: ['llanta', 'bujia', 'aceite'],
    final: 'moto'
  };
  function textos(config) {
    const t = (config && config.textos) || {};
    const r = Object.assign({}, TEXTOS_BASE, t);
    r.escenas = {};
    Object.keys(TEXTOS_BASE.escenas).concat(Object.keys(t.escenas || {})).forEach((k) => {
      r.escenas[k] = Object.assign({}, TEXTOS_BASE.escenas[k] || {}, (t.escenas || {})[k] || {});
    });
    Object.keys(r).forEach((k) => { if (typeof r[k] === 'string' && !r[k].trim()) r[k] = TEXTOS_BASE[k]; });
    return r;
  }

  /* ---------- Servicios iniciales ----------
     p = precio, c = costo estimado (aceite, filtro, insumos). Todo se cambia en el panel. */
  const BASICO = [
    'Cambio de aceite',
    'Reemplazo de filtro de aceite o limpieza de cedazo',
    'Revisión o reemplazo de bujía',
    'Limpieza, lubricación y tensado de cadena, o limpieza y revisión de CVT',
    'Revisión y lubricación de cables',
    'Limpieza o reemplazo de filtro de aire (filtro no incluido)',
    'Revisión y relleno de líquidos',
    'Revisión de batería',
    'Revisión de luces',
    'Niveles de aire en llantas',
    'Revisión y limpieza externa de balatas y cálipers',
    'Lavado de carburador o limpieza externa de cuerpo de aceleración'
  ];
  const PRODUCTOS_BASE = [
    {
      id: 'express', nombre: 'Servicio Express', cat: 'Paquetes', color: '#0A0E0B',
      desc: 'Lo esencial para que tu moto siga rodando sin problemas.',
      cuando: 'Cada 2,000 a 3,000 km, o si la usas diario para trabajar.',
      incluye: ['Cambio de aceite', 'Reemplazo de filtro de aceite o limpieza de cedazo', 'Revisión o reemplazo de bujía',
        'Limpieza, lubricación y tensado de cadena, o revisión/cambio de banda', 'Revisión y lubricación de cable de clutch', 'Limpieza general de la moto'],
      ilus: { t: 'aceite' }, tags: ['Aceite incluido'], destacado: true, nuevo: false, disponible: true,
      opciones: [{ n: 'Hasta 150 cc', p: 450, c: 210 }, { n: '151 a 300 cc', p: 550, c: 260 }, { n: 'Más de 300 cc', p: 800, c: 400 }], foto: '',
      notas: 'Precios de ejemplo: ajústalos. Costo estimado = aceite (1 a 3 L), filtro o junta, lubricante de cadena, desengrasante y trapo.'
    },
    {
      id: 'basico', nombre: 'Servicio Básico', cat: 'Paquetes', color: '#140E33',
      desc: 'Revisión de 12 puntos: motor, frenos, eléctrico, cables y llantas.',
      cuando: 'Cada 6 meses, o cada 5,000 km.',
      incluye: BASICO.slice(),
      ilus: { t: 'bujia' }, tags: ['12 puntos'], destacado: true, nuevo: false, disponible: true,
      opciones: [{ n: 'Hasta 150 cc', p: 850, c: 300 }, { n: '151 a 300 cc', p: 1000, c: 360 }, { n: 'Más de 300 cc', p: 1400, c: 520 }], foto: '',
      notas: 'Precios de ejemplo: ajústalos. El filtro de aire no está incluido; se cobra aparte si se cambia.'
    },
    {
      id: 'completo', nombre: 'Servicio Completo', cat: 'Paquetes', color: '#3BFF2E',
      desc: 'Todo el Básico, más diagnóstico, válvulas, frenos y suspensión.',
      cuando: 'Una vez al año, antes de salir a carretera, o si la moto ya pasó de 8,000 km sin servicio.',
      incluye: ['Todo lo del Servicio Básico', 'Diagnóstico con escáner (motos inyectadas)', 'Ajuste de válvulas',
        'Lavado profundo de carburador o limpieza de inyector', 'Cambio de líquido de frenos', 'Revisión de suspensión y dirección',
        'Lubricación de pivotes y palancas', 'Prueba de manejo'],
      ilus: { t: 'piston' }, tags: ['Nuevo'], destacado: true, nuevo: true, disponible: true,
      opciones: [{ n: 'Hasta 150 cc', p: 1500, c: 600 }, { n: '151 a 300 cc', p: 1800, c: 700 }, { n: 'Más de 300 cc', p: 2400, c: 950 }], foto: '',
      notas: 'Paquete nuevo propuesto. Precios de ejemplo: ajústalos.'
    },
    { id: 'diagnostico', nombre: 'Diagnóstico con escáner', cat: 'A la carta', color: '#4B33C9', desc: 'Leemos códigos de falla y te decimos qué tiene antes de tocar nada.',
      ilus: { t: 'escaner' }, tags: [], destacado: false, nuevo: false, disponible: true, opciones: [{ n: 'Por moto', p: 250, c: 20 }], foto: '', notas: 'Precio de ejemplo.', incluye: [], cuando: '' },
    { id: 'balatas', nombre: 'Cambio de balatas', cat: 'A la carta', color: '#3BFF2E', desc: 'Mano de obra por eje. Las balatas se cotizan según tu moto.',
      ilus: { t: 'freno' }, tags: ['Mano de obra'], destacado: false, nuevo: false, disponible: true, opciones: [{ n: 'Por eje', p: 200, c: 15 }], foto: '', notas: 'Precio de ejemplo.', incluye: [], cuando: '' },
    { id: 'arrastre', nombre: 'Cambio de kit de arrastre', cat: 'A la carta', color: '#4B33C9', desc: 'Cadena, piñón y estrella. Mano de obra; el kit se cotiza aparte.',
      ilus: { t: 'cadena' }, tags: ['Mano de obra'], destacado: false, nuevo: false, disponible: true, opciones: [{ n: 'Mano de obra', p: 350, c: 20 }], foto: '', notas: 'Precio de ejemplo.', incluye: [], cuando: '' },
    { id: 'llanta', nombre: 'Montaje de llanta', cat: 'A la carta', color: '#3BFF2E', desc: 'Desmontar, montar y revisar presión. La llanta se cotiza aparte.',
      ilus: { t: 'llanta' }, tags: ['Mano de obra'], destacado: false, nuevo: false, disponible: true, opciones: [{ n: 'Por llanta', p: 180, c: 10 }], foto: '', notas: 'Precio de ejemplo.', incluye: [], cuando: '' },
    { id: 'suspension', nombre: 'Servicio de suspensión delantera', cat: 'A la carta', color: '#3BFF2E', desc: 'Cambio de aceite de barras y revisión de retenes.',
      ilus: { t: 'amortiguador' }, tags: [], destacado: false, nuevo: false, disponible: true, opciones: [{ n: 'Horquilla', p: 750, c: 250 }], foto: '', notas: 'Precio de ejemplo. Retenes se cobran aparte si se cambian.', incluye: [], cuando: '' },
    { id: 'electrico', nombre: 'Revisión del sistema eléctrico', cat: 'A la carta', color: '#3BFF2E', desc: 'Batería, carga, luces, arranque y cableado.',
      ilus: { t: 'bateria' }, tags: [], destacado: false, nuevo: false, disponible: true, opciones: [{ n: 'Por moto', p: 300, c: 20 }], foto: '', notas: 'Precio de ejemplo.', incluye: [], cuando: '' },
    { id: 'filtro-aire', nombre: 'Cambio de filtro de aire', cat: 'A la carta', color: '#4B33C9', desc: 'Mano de obra. El filtro se cotiza según tu moto.',
      ilus: { t: 'filtro' }, tags: ['Mano de obra'], destacado: false, nuevo: false, disponible: true, opciones: [{ n: 'Mano de obra', p: 120, c: 10 }], foto: '', notas: 'Precio de ejemplo.', incluye: [], cuando: '' }
  ];

  /* ---------- Utilidades ---------- */
  const dinero = (n) => '$' + Math.round(Number(n) || 0).toLocaleString('es-MX');
  const copia = (o) => JSON.parse(JSON.stringify(o));
  const hoy = () => {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  };
  const nuevoId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const memoria = {
    leer(k, def) { try { const v = localStorage.getItem('dxg_' + k); return v ? JSON.parse(v) : def; } catch (e) { return def; } },
    guardar(k, v) { try { localStorage.setItem('dxg_' + k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  };

  /* ================================================================
     ILUSTRACIONES SVG (moto, refacciones y herramientas)
     ================================================================ */
  let contador = 0;
  const f = (n) => Math.round(n * 10) / 10;

  function defs(id) {
    return `<linearGradient id="${id}cromo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe7e1"/><stop offset=".45" stop-color="#7d8a81"/><stop offset=".55" stop-color="#414b45"/><stop offset="1" stop-color="#b9c4bd"/></linearGradient>
      <linearGradient id="${id}cromoH" x1="0" x2="1"><stop offset="0" stop-color="#3a433d"/><stop offset=".3" stop-color="#d9e2dc"/><stop offset=".55" stop-color="#6f7b73"/><stop offset=".8" stop-color="#c9d3cc"/><stop offset="1" stop-color="#3a433d"/></linearGradient>
      <linearGradient id="${id}vio" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7a63ff"/><stop offset=".55" stop-color="#4B33C9"/><stop offset="1" stop-color="#1d1260"/></linearGradient>
      <linearGradient id="${id}tox" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c8ff9e"/><stop offset=".55" stop-color="#3BFF2E"/><stop offset="1" stop-color="#139a0a"/></linearGradient>
      <linearGradient id="${id}neg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#26302a"/><stop offset="1" stop-color="#050706"/></linearGradient>
      <radialGradient id="${id}oro" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#d8ffb8"/><stop offset=".6" stop-color="#3BFF2E"/><stop offset="1" stop-color="#139a0a"/></radialGradient>
      <filter id="${id}cont" x="-15%" y="-15%" width="130%" height="130%"><feMorphology in="SourceAlpha" operator="dilate" radius="6" result="d"/><feFlood flood-color="#030504"/><feComposite in2="d" operator="in" result="o"/><feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
  }
  const brillo = (x, y, w, h, r) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r || w / 2}" fill="#fff" opacity=".35"/>`;

  function rueda(cx, cy, r, id, disco) {
    let rayos = '';
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
      const a2 = a + 0.22;
      rayos += `<path d="M${f(cx + Math.cos(a) * 11)} ${f(cy + Math.sin(a) * 11)} L${f(cx + Math.cos(a) * (r - 18))} ${f(cy + Math.sin(a) * (r - 18))} L${f(cx + Math.cos(a2) * (r - 18))} ${f(cy + Math.sin(a2) * (r - 18))} L${f(cx + Math.cos(a2) * 11)} ${f(cy + Math.sin(a2) * 11)}Z" fill="#1d1a2c"/>`;
    }
    let tacos = '';
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2;
      tacos += `<line x1="${f(cx + Math.cos(a) * (r - 3))}" y1="${f(cy + Math.sin(a) * (r - 3))}" x2="${f(cx + Math.cos(a) * (r - 9))}" y2="${f(cy + Math.sin(a) * (r - 9))}" stroke="#2c2840" stroke-width="3"/>`;
    }
    let disc = '';
    if (disco) {
      disc = `<circle cx="${cx}" cy="${cy}" r="${r * 0.48}" fill="url(#${id}cromoH)" opacity=".9"/>`;
      for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2; disc += `<circle cx="${f(cx + Math.cos(a) * r * 0.38)}" cy="${f(cy + Math.sin(a) * r * 0.38)}" r="2.6" fill="#3b3550"/>`; }
    }
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#121020"/>${tacos}
      <circle cx="${cx}" cy="${cy}" r="${r - 12}" fill="#2a2640"/>
      <circle cx="${cx}" cy="${cy}" r="${r - 14}" fill="none" stroke="#3BFF2E" stroke-width="3"/>
      ${disc}${rayos}<circle cx="${cx}" cy="${cy}" r="11" fill="url(#${id}cromoH)"/><circle cx="${cx}" cy="${cy}" r="4" fill="#1d1a2c"/>`;
  }

  const DIBUJOS = {
    moto(id) {
      return `<defs>${defs(id)}</defs><g transform="translate(200 220) scale(1.12) translate(-200 -220)">
        <ellipse cx="205" cy="338" rx="170" ry="14" fill="#000" opacity=".25"/>
        ${rueda(100, 278, 64, id, false)}
        <path d="M100 278 L196 252 L204 266 L106 290Z" fill="url(#${id}neg)"/>
        <path d="M148 300 C120 298 96 286 84 262 L74 246 L118 232 L150 262 C162 274 188 286 220 286 L224 296Z" fill="url(#${id}cromo)"/>
        <rect x="58" y="226" width="78" height="24" rx="12" fill="url(#${id}cromo)" transform="rotate(-18 97 238)"/>
        <ellipse cx="62" cy="242" rx="8" ry="11" fill="#1c241f" transform="rotate(-18 62 242)"/>
        <path d="M176 210 L248 206 L262 260 L236 290 L186 290 L170 254Z" fill="url(#${id}neg)"/>
        <path d="M186 222 H246 M184 236 H252 M182 250 H256 M184 264 H250" stroke="#3d4740" stroke-width="3"/>
        <circle cx="214" cy="272" r="16" fill="url(#${id}cromoH)"/>
        <path d="M262 128 L300 276" stroke="url(#${id}cromoH)" stroke-width="13" stroke-linecap="round"/>
        <path d="M282 200 L300 276" stroke="#3BFF2E" stroke-width="15" stroke-linecap="round"/>
        ${rueda(302, 278, 64, id, true)}
        <path d="M318 246 a26 26 0 0 1 14 22 l-14 6 a12 12 0 0 0 -8 -14Z" fill="#3BFF2E"/>
        <path d="M250 232 C236 266 240 300 252 318" fill="none" stroke="#141a16" stroke-width="0"/>
        <path d="M262 212 C286 196 314 206 330 226 L320 232 C304 216 284 212 268 222Z" fill="url(#${id}vio)"/>
        <path d="M150 196 L272 150 L262 132 L200 156 L140 178Z" fill="none" stroke="#3BFF2E" stroke-width="7" stroke-linejoin="round"/>
        <path d="M168 206 L196 252" stroke="#3BFF2E" stroke-width="7" stroke-linecap="round"/>
        <path d="M232 206 L262 140" stroke="#3BFF2E" stroke-width="7" stroke-linecap="round"/>
        <path d="M186 150 C200 128 236 122 262 132 L270 160 C258 192 228 206 196 204 C178 202 170 182 186 150Z" fill="url(#${id}vio)"/>
        <path d="M200 146 C214 134 238 132 252 138" stroke="#fff" stroke-opacity=".5" stroke-width="6" stroke-linecap="round" fill="none"/>
        <path d="M206 176 L250 160" stroke="#3BFF2E" stroke-width="5" stroke-linecap="round"/>
        <path d="M98 170 L190 176 L186 196 L112 194 Z" fill="#141a16"/>
        <path d="M60 160 L118 168 L112 196 L74 186Z" fill="url(#${id}vio)"/>
        <path d="M60 160 L44 156" stroke="#3BFF2E" stroke-width="6" stroke-linecap="round"/>
        <path d="M66 186 L58 214" stroke="#1c241f" stroke-width="5"/><rect x="40" y="210" width="30" height="20" rx="3" fill="#E6F2E1" transform="rotate(8 55 220)"/>
        <path d="M244 116 L292 106" stroke="#141a16" stroke-width="7" stroke-linecap="round"/>
        <path d="M290 106 L300 104" stroke="#1c241f" stroke-width="11" stroke-linecap="round"/>
        <circle cx="290" cy="156" r="20" fill="#141a16"/><circle cx="292" cy="156" r="14" fill="#d8ffcf"/><circle cx="292" cy="156" r="8" fill="#fff"/>
        <path d="M306 146 L380 120 L380 192 L306 166Z" fill="#3BFF2E" opacity=".14"/></g>`;
    },
    aceite(id) {
      return `<defs>${defs(id)}<linearGradient id="${id}bot" x1="0" x2="1"><stop offset="0" stop-color="#0b0f0c"/><stop offset=".35" stop-color="#2b3530"/><stop offset=".6" stop-color="#141a16"/><stop offset="1" stop-color="#050706"/></linearGradient></defs>
        <ellipse cx="200" cy="344" rx="110" ry="14" fill="#000" opacity=".22"/>
        <path d="M128 120 C128 104 140 96 156 96 L198 96 L214 70 L250 70 L262 96 L272 96 C288 96 296 108 296 124 L296 316 C296 330 286 340 272 340 L148 340 C134 340 124 330 124 316Z" fill="url(#${id}bot)"/>
        <path d="M236 100 C276 100 280 120 280 140 L280 170 C280 178 270 178 270 170 L270 140 C270 124 262 118 236 118Z" fill="#050706"/>
        <rect x="210" y="50" width="48" height="30" rx="6" fill="url(#${id}tox)"/><rect x="214" y="56" width="40" height="5" fill="#000" opacity=".2"/>
        <rect x="140" y="170" width="140" height="130" rx="10" fill="url(#${id}tox)"/>
        <rect x="140" y="170" width="140" height="28" rx="10" fill="#4B33C9"/>
        <path d="M156 240 h108 M156 256 h80 M156 272 h96" stroke="#030504" stroke-width="7" stroke-linecap="round" opacity=".8"/>
        <path d="M162 214 l16 0 l-8 -12Z" fill="#030504"/>
        ${brillo(142, 120, 10, 190, 5)}
        <path d="M330 120 C330 120 304 160 304 180 C304 196 316 206 330 206 C344 206 356 196 356 180 C356 160 330 120 330 120Z" fill="url(#${id}oro)"/>
        <ellipse cx="320" cy="176" rx="6" ry="12" fill="#fff" opacity=".55"/>
        <path d="M232 80 C232 80 228 96 234 104" stroke="#3BFF2E" stroke-width="6" stroke-linecap="round" fill="none"/>`;
    },
    bujia(id) {
      let roscas = '';
      for (let i = 0; i < 9; i++) roscas += `<path d="M168 ${262 + i * 9} L232 ${256 + i * 9}" stroke="#414b45" stroke-width="3"/>`;
      return `<defs>${defs(id)}<linearGradient id="${id}cer" x1="0" x2="1"><stop offset="0" stop-color="#d7dbe6"/><stop offset=".35" stop-color="#ffffff"/><stop offset=".7" stop-color="#e9ecf3"/><stop offset="1" stop-color="#b9bfcd"/></linearGradient></defs>
        <g transform="rotate(-18 200 200)">
        <ellipse cx="200" cy="372" rx="60" ry="10" fill="#000" opacity=".2"/>
        <rect x="188" y="30" width="24" height="34" rx="6" fill="url(#${id}cromoH)"/>
        <path d="M178 64 h44 l6 14 v104 l-6 10 h-44 l-6 -10 v-104Z" fill="url(#${id}cer)"/>
        <path d="M172 92 h56 M172 114 h56 M172 136 h56 M172 158 h56" stroke="#bfc9c2" stroke-width="5"/>
        <rect x="172" y="170" width="56" height="16" fill="#4B33C9"/>
        <path d="M154 192 h92 l8 20 v26 l-8 18 h-92 l-8 -18 v-26Z" fill="url(#${id}cromoH)"/>
        <path d="M176 192 v64 M224 192 v64" stroke="#414b45" stroke-width="3"/>
        <rect x="166" y="256" width="68" height="82" fill="url(#${id}cromoH)"/>${roscas}
        <path d="M232 338 h10 v24 h-28 v-8 h18Z" fill="#7d8a81"/><rect x="196" y="338" width="8" height="14" fill="#b9c4bd"/>
        </g>
        <path d="M232 352 l26 -14 l-6 18 l26 -8 l-34 28 l8 -18 l-26 8Z" fill="#3BFF2E"/>
        <circle cx="250" cy="352" r="34" fill="#3BFF2E" opacity=".18"/>`;
    },
    filtro(id) {
      let estrias = '';
      for (let i = 0; i < 13; i++) estrias += `<rect x="${118 + i * 13}" y="146" width="6" height="170" fill="#000" opacity=".18"/>`;
      return `<defs>${defs(id)}</defs>
        <ellipse cx="200" cy="344" rx="110" ry="16" fill="#000" opacity=".22"/>
        <path d="M110 140 L110 318 A90 22 0 0 0 290 318 L290 140Z" fill="url(#${id}vio)"/>${estrias}
        <rect x="110" y="200" width="180" height="56" fill="url(#${id}tox)"/>
        <path d="M128 222 h90 M128 238 h60" stroke="#030504" stroke-width="7" stroke-linecap="round"/>
        <ellipse cx="200" cy="140" rx="90" ry="24" fill="url(#${id}cromoH)"/>
        <ellipse cx="200" cy="138" rx="34" ry="9" fill="#2a332d"/><ellipse cx="200" cy="137" rx="24" ry="6" fill="#141a16"/>
        ${[0, 1, 2, 3, 4, 5].map((k) => { const a = k / 6 * Math.PI * 2; return `<circle cx="${f(200 + Math.cos(a) * 58)}" cy="${f(140 + Math.sin(a) * 15)}" r="5" fill="#2a332d"/>`; }).join('')}
        ${brillo(122, 160, 10, 150, 5)}`;
    },
    cadena(id) {
      let dientes = '', eslabones = '';
      const N = 28;
      for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2, a1 = a - 0.06, a2 = a + 0.06;
        dientes += `L${f(200 + Math.cos(a1) * 128)} ${f(190 + Math.sin(a1) * 128)} L${f(200 + Math.cos(a2) * 128)} ${f(190 + Math.sin(a2) * 128)} L${f(200 + Math.cos(a + Math.PI / N) * 112)} ${f(190 + Math.sin(a + Math.PI / N) * 112)} `;
      }
      for (let i = 0; i < 16; i++) {
        const a = Math.PI * 0.15 + (i / 15) * Math.PI * 0.95;
        const x = 200 + Math.cos(a) * 134, y = 190 + Math.sin(a) * 134, rot = a * 180 / Math.PI + 90;
        eslabones += `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})"><rect x="-14" y="-7" width="28" height="14" rx="7" fill="${i % 2 ? '#2a332d' : 'url(#' + id + 'cromoH)'}" stroke="#141a16" stroke-width="2"/><circle cx="-8" cy="0" r="3" fill="#141a16"/><circle cx="8" cy="0" r="3" fill="#141a16"/></g>`;
      }
      return `<defs>${defs(id)}</defs>
        <ellipse cx="200" cy="350" rx="140" ry="14" fill="#000" opacity=".2"/>
        <path d="M${f(200 + Math.cos(-0.06) * 128)} ${f(190 + Math.sin(-0.06) * 128)} ${dientes}Z" fill="url(#${id}cromoH)"/>
        <circle cx="200" cy="190" r="96" fill="url(#${id}vio)"/>
        ${[0, 1, 2, 3, 4].map((k) => { const a = k / 5 * Math.PI * 2 - Math.PI / 2; return `<circle cx="${f(200 + Math.cos(a) * 58)}" cy="${f(190 + Math.sin(a) * 58)}" r="20" fill="#030504"/>`; }).join('')}
        <circle cx="200" cy="190" r="30" fill="url(#${id}cromoH)"/><circle cx="200" cy="190" r="14" fill="#030504"/>
        ${eslabones}`;
    },
    freno(id) {
      let hoyos = '', ola = '';
      for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2; hoyos += `<circle cx="${f(200 + Math.cos(a) * 104)}" cy="${f(200 + Math.sin(a) * 104)}" r="6" fill="#1c241f"/>`; }
      for (let i = 0; i < 36; i++) { const a = (i / 36) * Math.PI * 2, r = i % 2 ? 140 : 134; ola += (i ? 'L' : 'M') + f(200 + Math.cos(a) * r) + ' ' + f(200 + Math.sin(a) * r) + ' '; }
      return `<defs>${defs(id)}</defs>
        <ellipse cx="200" cy="360" rx="130" ry="12" fill="#000" opacity=".2"/>
        <path d="${ola}Z" fill="url(#${id}cromoH)"/>
        <circle cx="200" cy="200" r="80" fill="#141a16"/>${hoyos}
        ${[0, 1, 2, 3, 4, 5].map((k) => { const a = k / 6 * Math.PI * 2; return `<path d="M${f(200 + Math.cos(a) * 30)} ${f(200 + Math.sin(a) * 30)} L${f(200 + Math.cos(a) * 80)} ${f(200 + Math.sin(a) * 80)}" stroke="#3BFF2E" stroke-width="12" stroke-linecap="round"/>`; }).join('')}
        <circle cx="200" cy="200" r="34" fill="url(#${id}cromoH)"/><circle cx="200" cy="200" r="12" fill="#030504"/>
        <path d="M248 60 C300 60 352 100 360 160 L356 186 L318 182 C312 140 286 112 250 104Z" fill="url(#${id}oro)"/>
        <rect x="300" y="110" width="40" height="14" rx="4" fill="#030504" transform="rotate(40 320 117)"/>
        <circle cx="272" cy="86" r="7" fill="#030504"/><circle cx="342" cy="168" r="7" fill="#030504"/>`;
    },
    llanta(id) {
      let tacos = '';
      for (let i = 0; i < 30; i++) {
        const a = (i / 30) * Math.PI * 2;
        tacos += `<path d="M${f(200 + Math.cos(a) * 150)} ${f(196 + Math.sin(a) * 150)} L${f(200 + Math.cos(a + 0.12) * 128)} ${f(196 + Math.sin(a + 0.12) * 128)}" stroke="#222a25" stroke-width="9" stroke-linecap="round"/>`;
      }
      return `<defs>${defs(id)}</defs>
        <ellipse cx="200" cy="364" rx="130" ry="12" fill="#000" opacity=".25"/>
        <circle cx="200" cy="196" r="158" fill="#0a0d0b"/>${tacos}
        <circle cx="200" cy="196" r="112" fill="#141a16"/>
        <circle cx="200" cy="196" r="104" fill="url(#${id}cromoH)"/>
        <circle cx="200" cy="196" r="92" fill="#141a16"/>
        ${[0, 1, 2, 3, 4, 5].map((k) => { const a = k / 6 * Math.PI * 2; return `<path d="M${f(200 + Math.cos(a) * 24)} ${f(196 + Math.sin(a) * 24)} L${f(200 + Math.cos(a) * 92)} ${f(196 + Math.sin(a) * 92)}" stroke="url(#${id}tox)" stroke-width="14" stroke-linecap="round"/>`; }).join('')}
        <circle cx="200" cy="196" r="30" fill="url(#${id}cromoH)"/><circle cx="200" cy="196" r="10" fill="#030504"/>
        <path d="M80 120 A140 140 0 0 1 150 62" stroke="#fff" stroke-opacity=".18" stroke-width="10" fill="none" stroke-linecap="round"/>`;
    },
    bateria(id) {
      return `<defs>${defs(id)}</defs>
        <ellipse cx="200" cy="344" rx="130" ry="14" fill="#000" opacity=".22"/>
        <rect x="90" y="96" width="38" height="30" rx="5" fill="#3BFF2E"/><rect x="272" y="96" width="38" height="30" rx="5" fill="#1c241f"/>
        <rect x="70" y="118" width="260" height="34" rx="8" fill="#2a332d"/>
        <rect x="80" y="146" width="240" height="190" rx="14" fill="url(#${id}neg)"/>
        <rect x="80" y="196" width="240" height="70" fill="url(#${id}tox)"/>
        <path d="M206 206 L176 240 H200 L188 262 L228 222 H204 L214 206Z" fill="#030504"/>
        <path d="M100 290 h120 M100 308 h70" stroke="#3d4740" stroke-width="7" stroke-linecap="round"/>
        <path d="M100 74 h18 M109 65 v18" stroke="#3BFF2E" stroke-width="6" stroke-linecap="round"/>
        <path d="M282 74 h18" stroke="#E6F2E1" stroke-width="6" stroke-linecap="round"/>
        ${brillo(92, 158, 8, 160, 4)}`;
    },
    escaner(id) {
      return `<defs>${defs(id)}</defs>
        <ellipse cx="200" cy="356" rx="100" ry="12" fill="#000" opacity=".22"/>
        <path d="M200 40 C200 20 250 14 270 30" stroke="#141a16" stroke-width="10" fill="none" stroke-linecap="round"/>
        <rect x="258" y="18" width="40" height="28" rx="6" fill="url(#${id}tox)"/>
        <rect x="112" y="40" width="176" height="300" rx="28" fill="url(#${id}vio)"/>
        <rect x="132" y="66" width="136" height="110" rx="10" fill="#030504"/>
        <path d="M144 150 L168 130 L186 142 L208 104 L228 126 L256 92" stroke="#3BFF2E" stroke-width="5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
        <path d="M144 88 h50" stroke="#7a63ff" stroke-width="6" stroke-linecap="round"/>
        <circle cx="200" cy="232" r="30" fill="#1d1260"/><circle cx="200" cy="232" r="12" fill="url(#${id}tox)"/>
        <rect x="140" y="282" width="40" height="22" rx="8" fill="#1d1260"/><rect x="220" y="282" width="40" height="22" rx="8" fill="#1d1260"/>
        ${brillo(122, 54, 8, 270, 4)}`;
    },
    amortiguador(id) {
      let resorte = '';
      for (let i = 0; i < 9; i++) resorte += `<path d="M150 ${120 + i * 22} C150 ${110 + i * 22} 250 ${118 + i * 22} 250 ${130 + i * 22}" stroke="url(#${id}tox)" stroke-width="13" fill="none" stroke-linecap="round"/>`;
      return `<defs>${defs(id)}</defs>
        <g transform="rotate(14 200 200)">
        <ellipse cx="200" cy="370" rx="70" ry="10" fill="#000" opacity=".2"/>
        <circle cx="200" cy="58" r="22" fill="url(#${id}cromoH)"/><circle cx="200" cy="58" r="9" fill="#030504"/>
        <rect x="186" y="70" width="28" height="80" fill="url(#${id}cromoH)"/>
        <rect x="140" y="100" width="120" height="16" rx="6" fill="url(#${id}oro)"/>
        <rect x="170" y="150" width="60" height="170" rx="10" fill="url(#${id}neg)"/>
        ${resorte}
        <rect x="140" y="312" width="120" height="16" rx="6" fill="url(#${id}oro)"/>
        <circle cx="200" cy="348" r="22" fill="url(#${id}cromoH)"/><circle cx="200" cy="348" r="9" fill="#030504"/>
        </g>`;
    },
    piston(id) {
      return `<defs>${defs(id)}</defs>
        <ellipse cx="200" cy="364" rx="90" ry="12" fill="#000" opacity=".22"/>
        <path d="M184 196 L170 330 C170 346 230 346 230 330 L216 196Z" fill="url(#${id}cromoH)"/>
        <circle cx="200" cy="330" r="34" fill="url(#${id}cromoH)"/><circle cx="200" cy="330" r="18" fill="#030504"/>
        <path d="M110 70 L110 196 C110 224 290 224 290 196 L290 70Z" fill="url(#${id}cromoH)"/>
        <ellipse cx="200" cy="70" rx="90" ry="24" fill="#e3e7ee"/>
        <ellipse cx="200" cy="70" rx="70" ry="16" fill="#c4cad6"/>
        <path d="M110 100 C110 120 290 120 290 100 M110 116 C110 136 290 136 290 116 M110 132 C110 152 290 152 290 132" stroke="#2a332d" stroke-width="5" fill="none"/>
        <circle cx="200" cy="176" r="22" fill="#2a332d"/><circle cx="200" cy="176" r="12" fill="url(#${id}tox)"/>
        ${brillo(122, 80, 10, 120, 5)}
        <path d="M120 40 Q130 10 150 30 Q160 0 180 26" stroke="#3BFF2E" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>`;
    }
  };

  function ilustracion(prod, clase) {
    if (prod && prod.foto) {
      return `<img class="${clase || ''} es-foto" src="${prod.foto}" alt="${esc(prod.nombre)}" loading="lazy" decoding="async">`;
    }
    const il = (prod && prod.ilus) || { t: 'moto' };
    const fn = DIBUJOS[il.t] || DIBUJOS.moto;
    const id = 'g' + (++contador) + '_';
    const cuerpo = fn(id).replace(/<\/defs>/, '</defs><g filter="url(#' + id + 'cont)">');
    return `<svg class="${clase || ''}" viewBox="-10 -10 420 420" role="img" aria-label="${esc(prod ? prod.nombre : '')}" xmlns="http://www.w3.org/2000/svg">${cuerpo}</g></svg>`;
  }

  const ESTILOS_ILUS = [
    { t: 'moto', n: 'Moto' }, { t: 'aceite', n: 'Aceite' }, { t: 'bujia', n: 'Bujía' }, { t: 'piston', n: 'Pistón' },
    { t: 'filtro', n: 'Filtro' }, { t: 'cadena', n: 'Cadena y estrella' }, { t: 'freno', n: 'Disco y cáliper' },
    { t: 'llanta', n: 'Llanta' }, { t: 'bateria', n: 'Batería' }, { t: 'escaner', n: 'Escáner' }, { t: 'amortiguador', n: 'Amortiguador' }
  ];
  // Elementos sueltos (no son servicios) que pueden salir en la portada
  const PIEZAS = ESTILOS_ILUS.map((e) => ({ id: e.t, nombre: e.n, ilus: { t: e.t }, color: '#4B33C9' }));

  function aplicarRegistro(lista, accion, dato) {
    lista = Array.isArray(lista) ? lista.slice() : [];
    if (accion === 'agregar') lista.push(dato);
    else if (accion === 'actualizar') lista = lista.map((x) => (x.id === dato.id ? Object.assign({}, x, dato) : x));
    else if (accion === 'borrar') lista = lista.filter((x) => x.id !== dato.id);
    return lista;
  }

  /* ================================================================
     CONEXIÓN: nube (Netlify) o, si no hay, este navegador
     ================================================================ */
  async function pedir(ruta, opciones) {
    const r = await fetch('/api/' + ruta, Object.assign({ cache: 'no-store' }, opciones || {}));
    const tipo = r.headers.get('content-type') || '';
    if (!tipo.includes('application/json')) throw new Error('sin-api');
    const j = await r.json();
    if (!r.ok) { const e = new Error(j.error || 'Error ' + r.status); e.status = r.status; throw e; }
    return j;
  }

  const Datos = {
    modo: 'local',
    clave: '',
    async catalogo() {
      try {
        const j = await pedir('productos');
        this.modo = 'nube';
        return {
          productos: Array.isArray(j.productos) && j.productos.length ? j.productos : copia(PRODUCTOS_BASE),
          config: Object.assign({}, CONFIG_BASE, j.config || {})
        };
      } catch (e) {
        this.modo = 'local';
        return {
          productos: memoria.leer('productos', null) || copia(PRODUCTOS_BASE),
          config: Object.assign({}, CONFIG_BASE, memoria.leer('config', {}))
        };
      }
    },
    async hayNube() {
      try { const j = await pedir('estado'); this.modo = 'nube'; return j; } catch (e) { this.modo = 'local'; return null; }
    },
    cabeceras() { return { 'content-type': 'application/json', 'x-admin-key': this.clave }; },
    async entrar(clave) {
      this.clave = clave;
      await pedir('login', { method: 'POST', headers: this.cabeceras(), body: '{}' });
      return true;
    },
    async guardarCatalogo(productos, config) {
      if (this.modo === 'nube') {
        await pedir('productos', { method: 'PUT', headers: this.cabeceras(), body: JSON.stringify({ productos, config }) });
      } else {
        if (!memoria.guardar('productos', productos) || !memoria.guardar('config', config)) throw new Error('No hay espacio en este navegador. Usa fotos más pequeñas.');
      }
    },
    async finanzas() {
      if (this.modo === 'nube') {
        const j = await pedir('finanzas', { headers: this.cabeceras() });
        return { ventas: j.ventas || [], gastos: j.gastos || [] };
      }
      return { ventas: memoria.leer('ventas', []), gastos: memoria.leer('gastos', []) };
    },
    async registro(coleccion, accion, dato) {
      if (this.modo === 'nube') {
        return pedir('registro', { method: 'POST', headers: this.cabeceras(), body: JSON.stringify({ coleccion, accion, dato }) });
      }
      const nueva = aplicarRegistro(memoria.leer(coleccion, []), accion, dato);
      memoria.guardar(coleccion, nueva);
      return { [coleccion]: nueva };
    },
    async reemplazarFinanzas(ventas, gastos) {
      if (this.modo === 'nube') {
        await pedir('finanzas', { method: 'PUT', headers: this.cabeceras(), body: JSON.stringify({ ventas, gastos }) });
      } else { memoria.guardar('ventas', ventas); memoria.guardar('gastos', gastos); }
    }
  };

  window.RD = { COLORES, CATEGORIAS, CONFIG_BASE, TEXTOS_BASE, textos, PRODUCTOS_BASE, ESTILOS_ILUS, PIEZAS, ilustracion, dinero, copia, hoy, nuevoId, esc, memoria, Datos };
})();
