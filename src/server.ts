import 'dotenv/config'
import boom from '@hapi/boom'

import app from './app'

const { PORT } = process.env
const port = PORT || 7000

const bootstrap = async () => {
  try {
    await app.listen(port)
  } catch (err) {
    throw boom.boomify(err)
  }
}
bootstrap()
