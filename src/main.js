import {createNode} from  './create.js'
import { options } from './cli.js'
import {startChat} from './chat.js'

const node = await createNode({ port: options.port })

console.log('My peer id: ', node.peerId.toString())

startChat(node,options)
