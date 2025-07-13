import express from 'express'
import routesUsers from './routes/users.js'
import routesProducts from './routes/products.js'
import { setupAllTables } from './db/index.js'
import { middlewareErro } from './middleware/erroMiddleware.js'
import { logger } from './utils/logger.js'

const PORT = 3000 
const app = express()


app.use(express.json())


app.use('/', routesUsers)
app.use('/products', routesProducts)

app.use(middlewareErro)

app.listen(PORT, async () => {
    await setupAllTables()
    logger.info(`Server running on port ${PORT}`)
})