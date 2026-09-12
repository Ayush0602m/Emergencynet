import fs from 'fs'

export function startChat(node, options) {
  const name = options.nick

  node.services.pubsub.subscribe(options.room)

  node.services.pubsub.addEventListener('message', (evt) => {
    console.log('recieved: ', new TextDecoder().decode(evt.detail.data))
   
    const decodedmsg = new TextDecoder().decode(evt.detail.data)
    // log into the file
    fs.appendFileSync('logs.txt', decodedmsg + '\n')
  })

  process.stdin.on('data',  async chunk => {
    const text = chunk.toString().trim()
    try {
    await node.services.pubsub.publish(options.room, new TextEncoder().encode(`${name} :${text}`))
} catch(err){
  console.log("No one is connected ")
}
})

  node.addEventListener('peer:discovery', async (evt) => {
    console.log('Discovered:', evt.detail.id.toString())

    // make sures the connection is established properly before sending the messages 
    try {
      await node.dial(evt.detail.id)
      console.log('connected to: ', evt.detail.id.toString())
    } catch (err) {
      console.log('cant connect', err.message)
    }
  })
}