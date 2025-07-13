// importa winston
import { createLogger, format, transports } from "winston";

// combine, timestamp, printf, colorize

const {combine, timestamp, printf, colorize} = format


// Formato do log no terminal
const logFormat = printf(({level, message, timestamp}) => {
    return `${timestamp} [${level}: [${message}]]`
})
// const logger = createLo... level, format: combine (timestamp( format :'' )),
// log...

export const logger = createLogger({
    level: 'info', // pode mudar para 'debug' no desenvolvimento
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console({format: combine(colorize(), logFormat)}),// mostra no terminal
        new transports.File({ filename: 'logs/error.log', level: 'error'}),// salva erros
        new transports.File({filename: 'logs/combined.log'})
    ]
})
