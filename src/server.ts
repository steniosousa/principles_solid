import express from 'express'
import { routes } from './routes'
const app = express()


app.use(express.json())
app.use(routes)

const port = process.env.PORT as string || 3333
app.listen(port, () => {
    console.log(`Project running in port ${port}`)
})

export { app } 


