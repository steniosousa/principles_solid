import express from 'express'
import { routes } from './routes/routes.express'
const app = express()


app.use(express.json())
app.use(routes)

app.listen(3000, () =>{
    console.log('Project running in port 3000')
})

export {app}


