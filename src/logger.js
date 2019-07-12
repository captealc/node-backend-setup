import * as winston from 'winston'

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    winston.format.printf((info) => {
      return `${info.timestamp} [${info.level.toUpperCase()}]: ${info.stack || info.message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
    })
  ]
})

export {logger}