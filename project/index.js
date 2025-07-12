import express from 'express'
import routesUsers from './routes/users.js'
import routesProducts from './routes/products.js'
import { setupAllTables } from './db/index.js'

const PORT = 3000 
const app = express()


app.use(express.json())


app.use('/', routesUsers)
app.use('/products', routesProducts)


app.listen(PORT, async () => {
    await setupAllTables()
    console.log(`Server running on port ${PORT}`)
})