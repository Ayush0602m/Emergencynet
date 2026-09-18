import express from 'express'
import { WebSocketServer } from 'ws'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const frontendDistPath = path.resolve(__dirname, '..', 'frontend', 'dist')

export function startServer(publishMessage, port) {
  const app = express()
  app.use(express.static(frontendDistPath))

  const server = http.createServer(app)
  const wss = new WebSocketServer({ server })

  let browserSocket = null

  wss.on('connection', (ws) => {
    console.log('Browser connected')
    browserSocket = ws

    ws.on('message', (data) => {
      const text = data.toString()
      publishMessage(text)
    })
  })

  function sendToBrowser(text) {
    if (browserSocket) {
      browserSocket.send(text)
    }
  }

  server.listen(port, () => {
    console.log(`UI available at http://localhost:${port}`)
  })

  return { sendToBrowser }
}