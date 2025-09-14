# AIStartupGenius (npm, Tailwind v2 config)

## Prereqs
- Node.js v18+
- npm (included with Node)

## Setup
1. `npm install` (at project root)
   - Installs tailwindcss@2.2.19 compatible with PostCSS 8 (Vite)
2. Create `server/.env` with `OPENAI_API_KEY=...`
3. Run: `npm run dev`
   - Client: http://localhost:5173
   - Server: http://localhost:5174

## Build & Run
- Build: `npm run build`
- Start (preview client + start server): `npm start`
