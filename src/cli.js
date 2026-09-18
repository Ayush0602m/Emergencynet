import { Command } from "commander";

const programm = new Command()

programm
  .option('--nick <name>', 'your nickname', 'anomi 1')
  .option('--room <room>', 'chat room name', 'riot')
  .option('--port <port>', 'server port', '3000')
  // .option('--port <number>', 'TCP listen port', value => {
  //   const port = Number(value)

  //   if (!Number.isInteger(port) || port < 0 || port > 65535) {
  //     throw new Error('port must be an integer between 0 and 65535')
  //   }

  //   return port
  // }, 0)
.parse()

export const options = programm.opts()
// console.log('Nick',options.nick)
// console.log('Room',options.room)
