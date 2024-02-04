import express from 'express'
import { routes } from './routes'


var cors = require('cors')
const app = express()
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization','id'],
}));
app.use(express.json())
app.use(routes)
// app.use(cors({ origin: 'http://localhost:5173' }));

const port = process.env.PORT as string || 3333
app.listen(port, () => {
    console.log(`Project running in port ${port}`)
})

export { app } 


