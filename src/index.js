import 'core-js/stable'
import 'regenerator-runtime/runtime'
import {sayHello} from './hello'
import { logger } from './logger'

(async () => {
  try {
    await sayHello()
  } catch (e) {
    logger.error(e)
  }
})()
