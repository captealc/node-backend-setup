import * as winston from 'winston'
const getLocation = (stepInStack = 1) => {
  try {
    throw new Error('Log stack')
  } catch (e) {
    try {
      const err = e
      const stackLocations = err.stack
        .split('\n')
        .map(m => m.trim())
        .filter(m => m.startsWith('at'))

      const strings = String(stackLocations[stepInStack])
        .slice(3)
        .split('src')
      return 'src' + strings[1].substring(0, strings[1].length - 1)
    } catch (e) {
      return ''
    }
  }
}
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => {
      return `[${
        info.timestamp
      }][${info.level.toUpperCase()}]: [${getLocation()}] ${info.stack ||
        info.message}`
    })
  ),
  transports: [new winston.transports.Console({})]
})

export { logger }
