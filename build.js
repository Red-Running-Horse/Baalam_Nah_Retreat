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

const repoRootDist = path.join(repoRoot, 'dist');

// ── dev mode ────────────────────────────────────────────────────────────────
if (process.argv.includes('--dev')) {
  console.log('Starting dev server...');
  execSync('npm install', { cwd: webDir, stdio: 'inherit' });
  execSync('npm run dev', { cwd: webDir, stdio: 'inherit' });
  process.exit(0);
}

// ── production build ─────────────────────────────────────────────────────────
console.log('▶ Building web app...');
fs.rmSync(repoRootDist, { recursive: true, force: true });
execSync('npm run build', { cwd: webDir, stdio: 'inherit' });

const rootIndex = path.join(repoRootDist, 'index.html');
const legacyAppsDist = path.join(repoRootDist, 'apps', 'web');

if (fs.existsSync(rootIndex)) {
  console.log('✔ Build complete. Output is in:', repoRootDist);
  process.exit(0);
}

if (fs.existsSync(legacyAppsDist)) {
  console.log('▶ Promoting legacy dist/apps/web → dist/ ...');
  const promoteTmp = path.join(repoRoot, '.dist-promote-tmp');
  fs.rmSync(promoteTmp, { recursive: true, force: true });
  fs.cpSync(legacyAppsDist, promoteTmp, { recursive: true });

  fs.rmSync(repoRootDist, { recursive: true, force: true });
  fs.cpSync(promoteTmp, repoRootDist, { recursive: true });
  fs.rmSync(promoteTmp, { recursive: true, force: true });

  console.log('✔ Build complete. Output is in:', repoRootDist);
  process.exit(0);
}

console.error('✖ Build output not found. Expected one of:');
console.error('  -', rootIndex);
console.error('  -', legacyAppsDist);
process.exit(1);
