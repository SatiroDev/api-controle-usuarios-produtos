import express from 'express'
import routesUsers from './routes/users.js'
import routesProducts from './routes/products.js'
import { setupAllTables } from './db/index.js'
import { middlewareErro } from './middleware/erroMiddleware.js'
import { logger } from './utils/logger.js'
import helmet from 'helmet'
import cors from 'cors'
import { limiter } from './middleware/rateLimit.js'

import https from 'https'
import fs from 'fs'

import swaggerUi from 'swagger-ui-express'

const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'));


const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
}

const PORT = 3000 
const app = express()

app.use(helmet())

app.use(cors())

app.use(limiter)

app.use(express.json())


try {
  const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'))
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
} catch (error) {
  console.error('Erro ao carregar Swagger:', error)
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', routesUsers)
app.use('/products', routesProducts)

app.use(middlewareErro)


export default app;


https.createServer(options, app).listen (PORT, async () => {
    await setupAllTables()
    logger.info(`Server running on port ${PORT}`)
})