// node creation liogic for other files to understand

import { createLibp2p } from 'libp2p'
import { mdns } from '@libp2p/mdns'
import { tcp } from '@libp2p/tcp'
import { yamux } from '@chainsafe/libp2p-yamux'
import { noise } from '@chainsafe/libp2p-noise'
import { gossipsub } from '@libp2p/gossipsub'
import { identify } from '@libp2p/identify'

export const createNode = ({ port = 0 } = {}) => {
  return createLibp2p({
    addresses: {
      listen: [`/ip4/0.0.0.0/tcp/${port}`]
    },
    transports: [
      tcp()
    ],
    streamMuxers: [
      yamux(),
    ],
    connectionEncrypters: [
      noise()
    ],
    services: {
      pubsub: gossipsub(),
      identify: identify()
    },
    peerDiscovery: [
      mdns({
        interval: 20e3
      })
    ]
  })
}
