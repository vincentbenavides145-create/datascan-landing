# Correo beta de DataScan para Resend

Plantilla activa:

- `access-beta.html`: correo unico que se enviara cuando el usuario sea aceptado en la beta.

Visor:

- `preview.html`: abre una vista previa del correo con datos de prueba.

## Variables

Reemplaza estas variables antes de enviar con Resend:

- `{{name}}`: nombre del usuario.
- `{{logo_url}}`: URL publica del logo, por ejemplo `https://datascan.tech/assets/logo-horizontal.png`.
- `{{bot_link}}`: enlace del bot beta.

## Ejemplo de envio con Resend

```ts
const html = template
  .replaceAll('{{name}}', name)
  .replaceAll('{{logo_url}}', 'https://datascan.tech/assets/logo-horizontal.png')
  .replaceAll('{{bot_link}}', 'https://t.me/Factura_pe_bot');

await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${RESEND_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    from: 'DataScan <beta@datascan.tech>',
    to: email,
    subject: 'Has sido aceptado en la beta de DataScan',
    html
  })
});
```
