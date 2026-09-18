// import {createNode} from  './create.js'
// import { options } from './cli.js'
// import {startChat} from './chat.js'

// const node = await createNode({ port: options.port })

// console.log('My peer id: ', node.peerId.toString())

// startChat(node,options)

import { createNode } from './create.js'
import { options } from './cli.js'
import { startChat } from './chat.js'
import { startServer } from './server.js'
// const { sendToBrowser } = startServer(publishMessage, options.port)
const node = await createNode()
console.log('My peer ID:', node.peerId.toString())

let sendToBrowserRef = null

const { publishMessage } = startChat(node, options, (msg) => {
  if (sendToBrowserRef) sendToBrowserRef(msg)
})

const { sendToBrowser } = startServer(publishMessage,options.port)
sendToBrowserRef = sendToBrowser