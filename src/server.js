import { randomUUID } from 'crypto'
import http from 'http'
import { Readable } from 'stream'

function * run () {
  for (let index = 0; index <= 99; index++) {
    const data = {
      id: randomUUID(),
      name: `Marcos - ${index}`
    }
    yield data
  }
}

async function handler(request, response) {
  const readable = new Readable({
    read() {
      for (const data of run()) {
        console.log(`Sending `, data)
        this.push(JSON.stringify(data) + '\n')
      }
      this.push(null)
    }
  })

  readable
    .pipe(response)
}

http.createServer(handler)
.listen(3000)
.on('listening', () => console.log('Server running in port 3000'))