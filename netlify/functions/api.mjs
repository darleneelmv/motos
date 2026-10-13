// API de Devil's XS Garage (Netlify Functions + Netlify Blobs).
// Guarda productos, ventas y gastos en la nube de tu sitio.
// La contraseña del panel se define en Netlify como variable ADMIN_PASSWORD.
import { getStore } from '@netlify/blobs';

const json = (datos, estado = 200) =>
  new Response(JSON.stringify(datos), {
    status: estado,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
  });

const COLECCIONES = ['ventas', 'gastos'];

function claveCorrecta(req) {
  const clave = (globalThis.Netlify && Netlify.env.get('ADMIN_PASSWORD')) || process.env.ADMIN_PASSWORD || '';
  const enviada = req.headers.get('x-admin-key') || '';
  if (!clave || enviada.length !== clave.length) return false;
  let dif = 0;
  for (let i = 0; i < clave.length; i++) dif |= clave.charCodeAt(i) ^ enviada.charCodeAt(i);
  return dif === 0;
}

export default async (req) => {
  const url = new URL(req.url);
  const ruta = url.pathname.replace(/^\/api\/?/, '').replace(/\/$/, '');
  const metodo = req.method;
  const store = getStore({ name: 'devils-garage', consistency: 'strong' });

  try {
    // ---- Públicas (las ve cualquier cliente) ----
    if (ruta === 'estado') {
      const configurada = !!((globalThis.Netlify && Netlify.env.get('ADMIN_PASSWORD')) || process.env.ADMIN_PASSWORD);
      return json({ ok: true, configurada });
    }
    if (ruta === 'productos' && metodo === 'GET') {
      const [productos, config] = await Promise.all([
        store.get('productos', { type: 'json' }),
        store.get('config', { type: 'json' })
      ]);
      return json({ productos: productos || null, config: config || null });
    }

    // ---- Privadas (solo con la contraseña del panel) ----
    if (!claveCorrecta(req)) return json({ error: 'Contraseña incorrecta.' }, 401);

    if (ruta === 'login') return json({ ok: true });

    if (ruta === 'productos' && metodo === 'PUT') {
      const cuerpo = await req.json();
      if (!Array.isArray(cuerpo.productos)) return json({ error: 'Faltan los productos.' }, 400);
      await store.setJSON('productos', cuerpo.productos);
      if (cuerpo.config && typeof cuerpo.config === 'object') await store.setJSON('config', cuerpo.config);
      return json({ ok: true });
    }

    if (ruta === 'finanzas' && metodo === 'GET') {
      const [ventas, gastos] = await Promise.all([
        store.get('ventas', { type: 'json' }),
        store.get('gastos', { type: 'json' })
      ]);
      return json({ ventas: ventas || [], gastos: gastos || [] });
    }

    if (ruta === 'finanzas' && metodo === 'PUT') {
      const { ventas, gastos } = await req.json();
      if (!Array.isArray(ventas) || !Array.isArray(gastos)) return json({ error: 'Formato no válido.' }, 400);
      await Promise.all([store.setJSON('ventas', ventas), store.setJSON('gastos', gastos)]);
      return json({ ok: true });
    }

    if (ruta === 'registro' && metodo === 'POST') {
      const { coleccion, accion, dato } = await req.json();
      if (!COLECCIONES.includes(coleccion) || !dato || !dato.id) return json({ error: 'Registro no válido.' }, 400);
      let lista = (await store.get(coleccion, { type: 'json' })) || [];
      if (accion === 'agregar') { if (!lista.some((x) => x.id === dato.id)) lista.push(dato); }
      else if (accion === 'actualizar') lista = lista.map((x) => (x.id === dato.id ? { ...x, ...dato } : x));
      else if (accion === 'borrar') lista = lista.filter((x) => x.id !== dato.id);
      else return json({ error: 'Acción no válida.' }, 400);
      await store.setJSON(coleccion, lista);
      return json({ [coleccion]: lista });
    }

    return json({ error: 'Ruta no encontrada.' }, 404);
  } catch (e) {
    return json({ error: 'Error del servidor: ' + (e && e.message ? e.message : e) }, 500);
  }
};

export const config = { path: '/api/*' };
