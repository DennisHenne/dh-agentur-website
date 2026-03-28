# Deployment Guide

## Architecture

```
Home Server (Docker)
├── backend  :3001  ─── Cloudflare Tunnel ──→  admin.dh-agentur.de
│   Admin panel + content management + public REST API
│
└── frontend :3000  ─── Cloudflare Tunnel ──→  dh-agentur.de
    Public website — fetches content from backend API
```

Both containers are built from the same codebase. The `IS_BACKEND` environment
variable switches behaviour:

| `IS_BACKEND` | Admin panel | `/api/admin/*` | `/api/public/*` | Content source |
|---|---|---|---|---|
| `true` (backend) | ✅ accessible | ✅ active | ✅ active | local markdown files |
| `false` (frontend) | ❌ 404 | ❌ 404 | ❌ not needed | backend API via `BACKEND_URL` |

---

## First-time setup on the home server

### 1. Clone the repo and create the env file

```bash
git clone <your-repo> dh-agentur
cd dh-agentur
cp .env.example .env
# Edit .env — set JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, FRONTEND_URL, BACKEND_URL
nano .env
```

### 2. Build and start

```bash
docker compose up -d --build
```

This starts two containers:
- `dh-backend` on port **3001** (admin panel + API)
- `dh-frontend` on port **3000** (public site)

Check they're running:
```bash
docker compose ps
docker compose logs backend --tail 50
docker compose logs frontend --tail 50
```

### 3. Set up Cloudflare Tunnel

Install `cloudflared` on the server and create two tunnel routes:

```bash
cloudflared tunnel login
cloudflared tunnel create dh-agentur

# Route public traffic
cloudflared tunnel route dns dh-agentur dh-agentur.de        # → localhost:3000
cloudflared tunnel route dns dh-agentur admin.dh-agentur.de  # → localhost:3001
```

Create `/etc/cloudflared/config.yml`:
```yaml
tunnel: <your-tunnel-id>
credentials-file: /root/.cloudflared/<tunnel-id>.json

ingress:
  - hostname: dh-agentur.de
    service: http://localhost:3000
  - hostname: admin.dh-agentur.de
    service: http://localhost:3001
  - service: http_status:404
```

Start the tunnel as a service:
```bash
cloudflared service install
systemctl start cloudflared
systemctl enable cloudflared
```

---

## Updating content (deploying new posts)

New blog posts are created via the admin panel at `admin.dh-agentur.de/admin`.
The markdown files are written to the `content` Docker volume which is shared
between the backend and frontend containers.

Because the **frontend reads content from the backend API** (not the volume
directly), there is no need to restart either container after publishing.

---

## Updating the application (code changes)

```bash
git pull
docker compose up -d --build
```

Docker Compose will rebuild both images and restart the containers with zero
config loss (volumes persist).

---

## Backups

The three named Docker volumes hold all persistent state:

| Volume | Contents |
|---|---|
| `dh-agentur_content` | Markdown files (insights + authors) |
| `dh-agentur_uploads` | Uploaded images |
| `dh-agentur_db` | SQLite database (careers, AI config, users) |

Backup example:
```bash
docker run --rm \
  -v dh-agentur_content:/data \
  -v $(pwd)/backup:/backup \
  alpine tar czf /backup/content-$(date +%F).tar.gz /data
```

---

## Local development (without Docker)

```bash
npm install
npm run dev
```

No `NUXT_PUBLIC_BACKEND_URL` is set, so:
- Pages use **Nuxt Content** (reads local `content/` files directly)
- The admin panel runs at `localhost:3000/admin`
- SQLite database is created at `data/admin.db`

### Or with Docker Compose (dev mode with hot-reload):

```bash
docker compose -f docker-compose.dev.yml up
```

---

## Environment variables reference

| Variable | Required | Description |
|---|---|---|
| `JWT_SECRET` | ✅ | Min 32-char secret for admin JWT tokens |
| `ADMIN_EMAIL` | ✅ | Initial admin login email |
| `ADMIN_PASSWORD` | ✅ | Initial admin login password |
| `FRONTEND_URL` | ✅ | Public URL of the frontend (e.g. `https://dh-agentur.de`) |
| `BACKEND_URL` | ✅ | Public URL of the backend (e.g. `https://admin.dh-agentur.de`) |
| `NUXT_PUBLIC_BACKEND_URL` | auto | Set automatically by docker-compose to `http://backend:3001` (internal) |
| `IS_BACKEND` | auto | Set automatically by docker-compose (`true`/`false`) |
