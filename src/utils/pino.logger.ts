import pino from 'pino'

const logger = pino({
  level: 'info',
  prettyPrint: {
    levelFirst: true,
    colorize: true,
    singleLine: true
  }
})

export default logger
