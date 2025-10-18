import express from "express"
import cors from 'cors'
import { todo } from "node:test"
import { router } from "./routes/movies.js"
import { corsMiddlewares } from "./middlewares/cors.js"


const app = express()
app.disable("x-powered-by")

app.use(express.json())

app.use(corsMiddlewares())

app.use("/movies", router)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, ()=>{
    console.log(`El servidor ha sido levantado en el puerto: http://localhost:${PORT}`)
})