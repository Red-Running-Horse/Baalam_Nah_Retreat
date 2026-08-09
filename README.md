# Baalam-Nah

Spanish-first bilingual website for the Baalam-Nah lagoon retreat in X-Hazil Sur, Quintana Roo.

## Local development

```bash
npm install
npm run dev
```

The Vite development server runs at `http://localhost:3000`.

## Production build

```bash
npm run build
```

The Hostinger-ready static site is written to `dist/`.

## Hostinger deployment

Every push to `main` runs `.github/workflows/deploy-hostinger.yml`, builds the site, and publishes `dist/` to `https://baalamnah.fcpqroo.mx`.

Create a GitHub `production` environment with these secrets:

| Secret | Value |
| --- | --- |
| `HOSTINGER_HOST` | Hostinger SSH hostname or IP |
| `HOSTINGER_PORT` | Hostinger SSH port, commonly `65002` |
| `HOSTINGER_USER` | Hostinger SSH username |
| `HOSTINGER_SSH_KEY` | Complete private SSH key matching a public key authorized by Hostinger |
| `HOSTINGER_WEB_ROOT` | `/home/<user>/domains/baalamnah.fcpqroo.mx/public_html` |

The deploy key added to GitHub allows Hostinger to read the repository; it is not the private SSH key GitHub Actions needs to upload the built site.

For a manual deployment from a trusted workstation, review the host, domain, and remote path in `.deploy.env`, then run:

```bash
npm run deploy:dry
npm run deploy
```

The deployment script supports SSH key or `SSH_PASS` authentication and defaults to `https://baalamnah.fcpqroo.mx`.
