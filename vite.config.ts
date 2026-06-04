import crypto from 'node:crypto'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const readJsonBody = (request: import('node:http').IncomingMessage) =>
  new Promise<Record<string, unknown>>((resolve, reject) => {
    let body = ''

    request.on('data', chunk => {
      body += chunk
    })
    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch (error) {
        reject(error)
      }
    })
    request.on('error', reject)
  })

const sendJson = (response: import('node:http').ServerResponse, statusCode: number, body: unknown) => {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(body))
}

const signUpload = (params: Record<string, string>, apiSecret: string) => {
  const payload = Object.entries(params)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  return crypto.createHash('sha1').update(`${payload}${apiSecret}`).digest('hex')
}

const localFunctionRoutes = (env: Record<string, string>): Plugin => ({
  name: 'local-netlify-function-routes',
  configureServer(server) {
    server.middlewares.use('/.netlify/functions/admin-login', async (request, response) => {
      if (request.method !== 'POST') {
        sendJson(response, 405, { error: 'Method not allowed' })
        return
      }

      try {
        const body = await readJsonBody(request)
        const email = typeof body.email === 'string' ? body.email.trim() : ''
        const password = typeof body.password === 'string' ? body.password : ''
        const adminEmail = env.ADMIN_EMAIL || env.VITE_ADMIN_EMAIL
        const adminPassword = env.ADMIN_PASSWORD || env.VITE_ADMIN_PASSWORD

        if (email !== adminEmail || password !== adminPassword) {
          sendJson(response, 401, { error: 'Invalid admin email or password' })
          return
        }

        sendJson(response, 200, { ok: true, admin: { email: adminEmail } })
      } catch (error) {
        sendJson(response, 500, { error: error instanceof Error ? error.message : 'Admin login failed' })
      }
    })

    server.middlewares.use('/.netlify/functions/contact', async (request, response) => {
      if (request.method !== 'POST') {
        sendJson(response, 405, { error: 'Method not allowed' })
        return
      }

      try {
        const body = await readJsonBody(request)
        sendJson(response, 200, {
          ok: true,
          submission: {
            ...body,
            receivedAt: new Date().toISOString()
          }
        })
      } catch (error) {
        sendJson(response, 500, { error: error instanceof Error ? error.message : 'Contact submission failed' })
      }
    })

    server.middlewares.use('/.netlify/functions/upload-image', async (request, response) => {
      if (request.method !== 'POST') {
        sendJson(response, 405, { error: 'Method not allowed' })
        return
      }

      try {
        const body = await readJsonBody(request)
        const image = typeof body.image === 'string' ? body.image : ''
        const cloudName = env.CLOUDINARY_CLOUD_NAME
        const apiKey = env.CLOUDINARY_API_KEY
        const apiSecret = env.CLOUDINARY_API_SECRET
        const folder = env.CLOUDINARY_FOLDER || 'unistudyhub/profile-images'

        if (!cloudName || !apiKey || !apiSecret) {
          sendJson(response, 500, { error: 'Cloudinary is not configured in .env.local' })
          return
        }

        if (!/^data:image\/(png|jpe?g|webp|gif);base64,/.test(image)) {
          sendJson(response, 400, { error: 'A valid base64 image is required' })
          return
        }

        const timestamp = Math.floor(Date.now() / 1000).toString()
        const signedParams = { folder, timestamp }
        const formData = new FormData()
        formData.append('file', image)
        formData.append('folder', folder)
        formData.append('timestamp', timestamp)
        formData.append('api_key', apiKey)
        formData.append('signature', signUpload(signedParams, apiSecret))

        const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData
        })
        const upload = await uploadResponse.json()

        if (!uploadResponse.ok) {
          sendJson(response, uploadResponse.status, { error: upload?.error?.message ?? 'Cloudinary upload failed' })
          return
        }

        sendJson(response, 200, {
          publicId: upload.public_id,
          secureUrl: upload.secure_url,
          width: upload.width,
          height: upload.height,
          format: upload.format
        })
      } catch (error) {
        sendJson(response, 500, { error: error instanceof Error ? error.message : 'Upload failed' })
      }
    })
  }
})

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), localFunctionRoutes(env)],
  }
})
