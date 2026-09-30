#!/usr/bin/env bash
# Deploy the Balam-Nah static site to Hostinger.
#
# Usage:
#   bash deploy_baalam_hostinger.sh
# Optional env overrides:
#   SSH_HOST, SSH_PORT, SSH_USER, REMOTE_WEB_ROOT, SITE_URL, APP_DIR, DIST_DIR, SSH_KEY_PATH
# Optional auth:
#   export SSH_PASS='your_password'   # requires sshpass
# Optional flags:
#   --dry-run      Show actions without changing remote files
#   --skip-build   Skip npm run build
#   --no-verify    Skip post-deploy HTTP checks
#   --delete       Mirror local dist to remote (remove stale remote files)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Optional local deploy secrets/settings (keep out of git if you create this file)
if [[ -f "$SCRIPT_DIR/.deploy.env" ]]; then
  # shellcheck disable=SC1091
  source "$SCRIPT_DIR/.deploy.env"
fi

SSH_HOST="${SSH_HOST:-82.197.80.20}"
SSH_PORT="${SSH_PORT:-65002}"
SSH_USER="${SSH_USER:-u853557685}"
REMOTE_WEB_ROOT="${REMOTE_WEB_ROOT:-/home/u853557685/domains/balamnah.fcpqroo.mx/public_html}"
SITE_URL="${SITE_URL:-https://balamnah.fcpqroo.mx}"
APP_DIR="${APP_DIR:-$SCRIPT_DIR/Project References/horizons-export-90021aa3-5e36-403a-b9b6-24f4f6e8230d/apps/web}"
DIST_DIR="${DIST_DIR:-}"
SSH_KEY_PATH="${SSH_KEY_PATH:-$HOME/.ssh/hostinger_deploy_ed25519}"

DRY_RUN=0
SKIP_BUILD=0
NO_VERIFY=0
DELETE_REMOTE=0

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --skip-build) SKIP_BUILD=1 ;;
    --no-verify) NO_VERIFY=1 ;;
    --delete) DELETE_REMOTE=1 ;;
    *)
      echo "Unknown argument: $arg"
      echo "Usage: bash deploy_baalam_hostinger.sh [--dry-run] [--skip-build] [--no-verify] [--delete]"
      exit 1
      ;;
  esac
done

REMOTE="${SSH_USER}@${SSH_HOST}"

if [[ -n "${SSH_PASS:-}" ]]; then
  if ! command -v sshpass >/dev/null 2>&1; then
    echo "Error: SSH_PASS is set but sshpass is not installed."
    echo "Install: sudo apt install sshpass"
    exit 1
  fi
  SSH_CMD=(sshpass -p "$SSH_PASS" ssh -p "$SSH_PORT" -o StrictHostKeyChecking=accept-new "$REMOTE")
  SCP_CMD=(sshpass -p "$SSH_PASS" scp -P "$SSH_PORT")
  RSYNC_RSH="sshpass -p '$SSH_PASS' ssh -p $SSH_PORT -o StrictHostKeyChecking=accept-new"
elif [[ -f "$SSH_KEY_PATH" ]]; then
  SSH_CMD=(ssh -i "$SSH_KEY_PATH" -p "$SSH_PORT" -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new "$REMOTE")
  SCP_CMD=(scp -i "$SSH_KEY_PATH" -P "$SSH_PORT" -o IdentitiesOnly=yes)
  RSYNC_RSH="ssh -i '$SSH_KEY_PATH' -p $SSH_PORT -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new"
else
  SSH_CMD=(ssh -p "$SSH_PORT" "$REMOTE")
  SCP_CMD=(scp -P "$SSH_PORT")
  RSYNC_RSH="ssh -p $SSH_PORT"
fi

run_remote() {
  local cmd="$1"
  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "[dry-run] ssh -p $SSH_PORT $REMOTE '$cmd'"
  else
    "${SSH_CMD[@]}" "$cmd"
  fi
}

echo "=========================================="
echo "  BALAM-NAH DEPLOY (HOSTINGER STATIC)"
echo "=========================================="
echo "Remote: $REMOTE"
echo "Path:   $REMOTE_WEB_ROOT"
echo "Site:   $SITE_URL"
if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "Mode:   DRY RUN"
fi
echo

if [[ "$SKIP_BUILD" -eq 0 ]]; then
  echo "1) Building web app..."
  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "[dry-run] cd '$APP_DIR' && npm run build"
  else
    (cd "$APP_DIR" && npm run build)
  fi
else
  echo "1) Skipping build (--skip-build)."
fi

if [[ -z "$DIST_DIR" ]]; then
  if [[ -f "$SCRIPT_DIR/dist/index.html" ]]; then
    DIST_DIR="$SCRIPT_DIR/dist"
  elif [[ -f "$SCRIPT_DIR/dist/apps/web/index.html" ]]; then
    DIST_DIR="$SCRIPT_DIR/dist/apps/web"
  else
    echo "Error: build output missing. Checked:"
    echo "  - $SCRIPT_DIR/dist/index.html"
    echo "  - $SCRIPT_DIR/dist/apps/web/index.html"
    exit 1
  fi
fi

if [[ -d "$SCRIPT_DIR/Photos" ]]; then
  echo "1b) Staging Photos folder into dist..."
  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "[dry-run] mkdir -p '$DIST_DIR/Photos' && sync '$SCRIPT_DIR/Photos/' -> '$DIST_DIR/Photos/'"
  else
    mkdir -p "$DIST_DIR/Photos"
    if command -v rsync >/dev/null 2>&1; then
      rsync -a "$SCRIPT_DIR/Photos/" "$DIST_DIR/Photos/"
    else
      cp -a "$SCRIPT_DIR/Photos/." "$DIST_DIR/Photos/"
    fi
  fi
fi

if [[ ! -f "$DIST_DIR/.htaccess" ]]; then
  echo "Warning: .htaccess not found in dist. Routing/caching rules may be missing."
fi

echo "2) Ensuring remote web root exists..."
run_remote "mkdir -p '$REMOTE_WEB_ROOT'"

echo "3) Uploading dist files..."
if command -v rsync >/dev/null 2>&1; then
  rsync_flags=(-az)
  if [[ "$DELETE_REMOTE" -eq 1 ]]; then
    rsync_flags+=(--delete)
  fi
  if [[ "$DRY_RUN" -eq 1 ]]; then
    printf '[dry-run] rsync'
    printf ' %q' "${rsync_flags[@]}" -e "$RSYNC_RSH" "$DIST_DIR/" "$REMOTE:$REMOTE_WEB_ROOT/"
    printf '\n'
  else
    rsync "${rsync_flags[@]}" -e "$RSYNC_RSH" "$DIST_DIR/" "$REMOTE:$REMOTE_WEB_ROOT/"
  fi
else
  echo "Warning: rsync not found. Falling back to scp recursive copy."
  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "[dry-run] scp -P $SSH_PORT -r '$DIST_DIR/.' '$REMOTE:$REMOTE_WEB_ROOT/'"
  else
    "${SCP_CMD[@]}" -r "$DIST_DIR/." "$REMOTE:$REMOTE_WEB_ROOT/"
  fi
fi

if [[ "$NO_VERIFY" -eq 1 || "$DRY_RUN" -eq 1 ]]; then
  echo "4) Verification skipped."
  echo "Done."
  exit 0
fi

echo "4) Verifying live site responses..."
html_bundle="$(curl -fsS "$SITE_URL" | grep -o 'index-[^"]*\.js' | head -n 1 || true)"
logo_type="$(curl -sI "$SITE_URL/balam-nah-app-icon.png" | tr -d '\r' | awk -F': ' 'tolower($1)=="content-type" {print $2}')"

if [[ -n "$html_bundle" ]]; then
  echo "   Active bundle: $html_bundle"
else
  echo "   Warning: Could not detect active bundle in homepage HTML."
fi

if [[ -n "$logo_type" ]]; then
  echo "   Logo content-type: $logo_type"
else
  echo "   Warning: Could not read logo content-type."
fi

echo
cat <<'EOF'
Deploy complete.
If old UI still appears, purge Hostinger CDN cache in hPanel and hard refresh the browser.
EOF
