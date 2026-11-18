# portfolio-email-kit

Plantilla de email (estética del portfolio) + generador + hosting de imágenes en GitHub Pages.

## Cómo funciona
- `templates/email.html` y `templates/email.txt`: plantilla con `{{COMPANY}}`, `{{ROLE}}`, `{{FIRST_NAME}}`, `{{STACK}}`, `{{WHY_YOU}}`.
- `data/applications.json`: una entrada por postulación → `npm run build` genera `dist/emails/<slug>.html` y `.txt`.
- `site/index.html`: **composer** web. Completás los campos, ves la vista previa y copiás el email (rico, HTML o texto) y el asunto.

- `site/tracker.html`: **tracker** de postulaciones (contador diario vs meta de 15, follow-ups a los 6 días, exportar CSV / `applications.json`, backup). Cada fila tiene un botón *Email* que abre el composer con los datos ya cargados.

- `site/startups.html` + `data/startups.json`: lista de startups contratando (remoto, abiertas a Argentina), con botón *Cargar en tracker*.

## Uso diario
1. Abrí `https://toti-gauna.github.io/portfolio-email-kit/`.
2. Completá empresa, puesto, nombre, stack y una frase de por qué ellos.
3. `Copy email (rich)` → pegalo en el redactor de Gmail, poné el asunto y adjuntá el CV en PDF.

## Generar en lote
```bash
# agregá entradas a data/applications.json
npm run build
```

## Deploy
Cada push a `main` ejecuta `.github/workflows/pages.yml` y publica `dist/`.
Requiere Settings → Pages → Source: **GitHub Actions**.
