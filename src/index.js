import {sayHello} from './hello'
import {logger} from './logger'

try {
  sayHello()
} catch (e) {
  logger.error(e)
}
