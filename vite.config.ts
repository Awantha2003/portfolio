import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Serves the Vercel functions in /api during `npm run dev`, so the site and admin panel work locally.
function devApi(): Plugin {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const name = /^\/api\/([a-z-]+)(?:\?|$)/.exec(req.url ?? '')?.[1]
        const file = name && resolve(__dirname, 'api', `${name}.ts`)
        if (!file || !existsSync(file)) return next()
        try {
          const mod = await server.ssrLoadModule(file)
          await mod.default(req, res)
        } catch (err) {
          server.ssrFixStacktrace(err as Error)
          console.error(err)
          res.statusCode = 500
          res.end(JSON.stringify({ error: (err as Error).message }))
        }
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Make .env / .env.local values visible to the API code in dev (Vercel injects them in production).
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  return {
    plugins: [react(), devApi()],
  }
})
