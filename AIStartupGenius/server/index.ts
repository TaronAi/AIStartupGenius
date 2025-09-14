import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { registerRoutes } from './routes'

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))

const start = async () => {
  const server = await registerRoutes(app)
  const PORT = process.env.PORT ? Number(process.env.PORT) : 5174
  server.listen(PORT, () => console.log(`[server] listening on http://localhost:${PORT}`))
}

start()
