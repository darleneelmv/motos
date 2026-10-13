# Devil's XS Garage: tu página y tu panel

- `index.html` es la página que ven tus clientes. Eligen paquete y cilindrada (o servicios sueltos), llenan los datos de su moto y se les arma el mensaje de WhatsApp a tu número.
- `admin.html` es tu panel (entras en `tusitio.netlify.app/admin` con contraseña).
- `netlify/functions/api.mjs` guarda todo en la nube. No necesitas tocarlo.
- `assets/monito-*.webp` es el diablillo del logo en tres capas (cuerpo, frasco y líquido). En la portada sale grande dentro del anillo verde; al bajar vuela a la esquina, se toma la poción mientras haces scroll y se le encienden los ojos. Cuando dejas de mover la página se asoma desde la orilla para no tapar el texto.

## Subirlo a internet con Netlify (gratis)

1. **GitHub:** el proyecto ya está en `github.com/darleneelmv/motos`. Si cambias algo, sube los archivos ahí.
2. **Netlify:** entra con tu cuenta de GitHub. **Add new project** → **Import an existing project** → **GitHub** → elige `motos` → **Deploy**, sin cambiar nada.
3. **Contraseña del panel:** en **Project configuration** → **Environment variables** agrega `ADMIN_PASSWORD` con tu contraseña. Luego **Deploys** → **Trigger deploy**.
4. **Nombre:** en **Project configuration** cambia el nombre a `devils-xs-garage`. Tu página queda en `devils-xs-garage.netlify.app` y tu panel en `/admin`.
5. Pon ese enlace en tu bio de Instagram ("enlace aquí abajo").

No uses "Netlify Drop" (arrastrar la carpeta): publica la página, pero el panel no podría guardar en la nube.

## Tu panel

- **Resumen:** ingresos, gastos, ganancia del mes, lo que te cobran pendiente y cuántas motos tienes en el taller.
- **Órdenes:** cada moto que llega: cliente, teléfono, moto, placas, kilometraje, servicios y refacciones, forma de pago, si ya pagó y cómo va (Recibida → En proceso → Lista → Entregada; toca el estado para avanzarlo).
- **Gastos:** refacciones, aceites, herramienta, renta.
- **Servicios:** toca un servicio para cambiar su **foto**, precios por cilindrada, costo, lo que incluye (salen con palomita en la página), "¿cuándo conviene?", color o si se muestra.
- **Página:** cambias todos los textos y las imágenes grandes de la portada y el final.
- **Ajustes:** WhatsApp, Instagram, horario, zonas, respaldos.

## Antes de compartirla

Los precios son **de ejemplo**: Express $450 / $550 / $800, Básico $850 / $1,000 / $1,400 y Completo $1,500 / $1,800 / $2,400 (hasta 150 cc / 151 a 300 cc / más de 300 cc), más los servicios sueltos. Cámbialos en *Servicios*. El **Servicio Completo** es un paquete nuevo que propuse; si no lo quieres, apaga "Visible en la página".

## El monito

Lo recorté de la imagen del logo que venía en la captura de Instagram, que es pequeña; por eso en grande se ve un poco suave. Si tienes el logo original en alta resolución (PNG o JPG grande), mándalo y se vuelve a recortar más nítido.
