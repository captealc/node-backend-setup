import * as winston from 'winston'

const path = require('path')
const PROJECT_ROOT = path.join(__dirname, '..')

const winstonLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => {
      return `[${info.timestamp}][${info.level.toUpperCase()}]: ${info.stack ||
        info.message}`
    })
  ),
  transports: [new winston.transports.Console({})]
})

winstonLogger.stream = {
  write: function (message) {
    winstonLogger.info(message)
  }
}

const debug = function () {
  winstonLogger.debug.apply(winstonLogger, formatLogArguments(arguments))
}

const info = function () {
  winstonLogger.info.apply(winstonLogger, formatLogArguments(arguments))
}

const warn = function () {
  winstonLogger.warn.apply(winstonLogger, formatLogArguments(arguments))
}

const error = function () {
  winstonLogger.error.apply(winstonLogger, formatLogArguments(arguments))
}

const stream = winstonLogger.stream

function formatLogArguments (args) {
  args = Array.prototype.slice.call(args)

  const stackInfo = getStackInfo(1)

  if (stackInfo) {
    const calleeStr =
      '(src' +
      stackInfo.relativePath.split('src')[1] +
      ':' +
      stackInfo.line +
      ')'

    if (typeof args[0] === 'string') {
      args[0] = calleeStr + ' ' + args[0]
    } else {
      args.unshift(calleeStr)
    }
  }

  return args
}

function getStackInfo (stackIndex) {
  const stacklist = new Error().stack.split('\n').slice(3)
  const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi
  const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi

  const s = stacklist[stackIndex] || stacklist[0]
  const sp = stackReg.exec(s) || stackReg2.exec(s)

  if (sp && sp.length === 5) {
    return {
      method: sp[1],
      relativePath: path.relative(PROJECT_ROOT, sp[2]),
      line: sp[3],
      pos: sp[4],
      file: path.basename(sp[2]),
      stack: stacklist.join('\n')
    }
  }
}

const logger = {
  error,
  info,
  debug,
  warn,
  stream
}

export { logger }
