import { logger } from './logger'
import { promisify } from 'util'
import * as fs from 'fs'

const sayHello = async () => {
  const writeFileAsync = promisify(fs.writeFile)
  await writeFileAsync('/tmp/test', 'elllo')
  logger.info('Hello')
}

export { sayHello }
