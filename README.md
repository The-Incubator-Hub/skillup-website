# SkillUp Website

This branch is a vanilla HTML, CSS, and JavaScript version of the SkillUp Edtech website.

## Run Locally

```bash
npm run dev
```

Open `http://127.0.0.1:4173`.

The site also works as static files. The main pages are:

- `index.html`
- `about/index.html`
- `contact/index.html`
- `skillup-plus/index.html`
- `tech-trybe/index.html`

Legacy route folders redirect to the new paths:

- `tech-tribe/` redirects to `tech-trybe/`
- `tech-trybe-plus/` redirects to `skillup-plus/`

## Validate

```bash
npm run build
```

This checks that the static files exist and that framework dependencies such as Next.js and React are no longer in `package.json`.

## Forms

Static sites cannot keep a private server environment variable. Form submissions use `window.SKILLUP_FORMS_WEBHOOK_URL` from `assets/js/config.js`.

Leave it blank for preview mode. Preview submissions are saved in browser `localStorage` under `skillupFormSubmissions`.

Set it to a public form webhook URL only when that endpoint is safe to call from the browser and supports CORS.
