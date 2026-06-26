DataScan Landing Page - Version beta

Flujo actual:
- La landing registra usuarios en Supabase Edge Functions.
- Los registros web se guardan en beta_web_registrations.
- El correo de acceso beta se programa para 1 hora despues del registro.
- La funcion send-beta-emails envia los correos pendientes.

Archivos que deben subirse al hosting:
- index.html
- styles.css
- script.js
- assets/
- emails/access-beta.html
