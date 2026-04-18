// Root build script for Hostinger deployment.
// Navigates to the nested Vite/React web app, builds it, then
// copies the output to /dist at the repository root so Hostinger
// can serve it as a static site.

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const repoRoot = __dirname;

const webDir = path.join(
  repoRoot,
  'Project References',
  'horizons-export-90021aa3-5e36-403a-b9b6-24f4f6e8230d',
  'apps',
  'web'
);

// vite outputs to ../../../../dist/apps/web relative to apps/web/ = repoRoot/dist/apps/web
const nestedDist = path.join(repoRoot, 'dist', 'apps', 'web');

const repoRootDist = path.join(repoRoot, 'dist');

// ── dev mode ────────────────────────────────────────────────────────────────
if (process.argv.includes('--dev')) {
  console.log('Starting dev server...');
  execSync('npm install', { cwd: webDir, stdio: 'inherit' });
  execSync('npm run dev', { cwd: webDir, stdio: 'inherit' });
  process.exit(0);
}

// ── production build ─────────────────────────────────────────────────────────
console.log('▶ Installing web app dependencies...');
execSync('npm install', { cwd: webDir, stdio: 'inherit' });

console.log('▶ Building web app...');
execSync('npm run build', { cwd: webDir, stdio: 'inherit' });

if (!fs.existsSync(nestedDist)) {
  console.error('✖ Build output not found at expected path:', nestedDist);
  process.exit(1);
}

console.log('▶ Promoting dist/apps/web → dist/ ...');
const appsDir = path.join(repoRootDist, 'apps', 'web');
if (fs.existsSync(appsDir)) {
  // Move contents of dist/apps/web up to dist/
  fs.rmSync(repoRootDist, { recursive: true, force: true });
  fs.cpSync(appsDir, repoRootDist, { recursive: true });
}

console.log('✔ Build complete. Output is in:', repoRootDist);
