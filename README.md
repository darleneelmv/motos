# Devil's XS Garage · Sitio web y panel para taller de motos

Sitio web para un taller de servicio y reparación de motos (CDMX y Michoacán) con panel de administración propio.

## Qué hace

**Página para clientes**
- El cliente elige paquete de servicio según la cilindrada de su moto (o servicios sueltos), llena los datos de la moto y se le arma el mensaje de **WhatsApp** al taller, ya escrito.
- Animación del personaje del logo en capas que reacciona al scroll.

**Panel de administración** (`/admin`, protegido con contraseña)
- **Resumen:** ingresos, gastos, ganancia del mes, cobros pendientes y motos en el taller.
- **Órdenes de servicio:** cliente, moto, placas, kilometraje, servicios, refacciones, pago y estado (Recibida → En proceso → Lista → Entregada).
- **Gastos**, **servicios** (fotos, precios por cilindrada, costos), textos de la **página** y **ajustes** (WhatsApp, horario, respaldos).

## Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Netlify Functions (API serverless) |
| Datos | Almacenamiento en la nube de Netlify |
| Despliegue | Netlify (desde GitHub) |

## Estructura

```
index.html                  Página para clientes
admin.html                  Panel de administración
netlify/functions/api.mjs   API que guarda los datos en la nube
assets/                     Logo, personaje en capas y fuentes
```

Las instrucciones de despliegue para el dueño del negocio están en [`LEEME.md`](LEEME.md).
