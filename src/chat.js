import fs from 'fs'

export function startChat(node, options, onMessageReceived) {
  const name = options.nick

  node.services.pubsub.subscribe(options.room)

  node.services.pubsub.addEventListener('message', (evt) => {
    const decodedmsg = new TextDecoder().decode(evt.detail.data)
    console.log('recieved: ', decodedmsg)
    fs.appendFileSync('logs.txt', decodedmsg + '\n')
    if (onMessageReceived) onMessageReceived(decodedmsg)
  })

  node.addEventListener('peer:discovery', async (evt) => {
    console.log('Discovered:', evt.detail.id.toString())
    try {
      await node.dial(evt.detail.id)
      console.log('connected to: ', evt.detail.id.toString())
    } catch (err) {
      console.log('cant connect', err.message)
    }
  })

  async function publishMessage(text) {
    try {
      await node.services.pubsub.publish(options.room, new TextEncoder().encode(`${name} :${text}`))
    } catch (err) {
      console.log('No one is connected')
    }
  }

  return { publishMessage }
}