import express from "express"
import { ditto } from "./pokemon/ditto.js"

const app = express()
app.disable("x-powered-by")
const PORT = process.env.PORT ?? 1234

app.use((req, res, next) =>{
    if(req.method !== "POST") return next()
    if(req.headers["content-type"] !== "application/json") return next()
        
    // solo llegan request si son metodo post y content-type application/json
    let body = ""
    // escuchar evento data
    req.on("data", chunk =>{
        body += chunk.toString()
    })
    req.on("end", ()=>{
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    // mutar la request y meter la info en req.body
    req.body = data
    next()
})

})

app.get("/pokemon/ditto", (req, res) =>{
    res.json(ditto)
})

app.post("/pokemon", (req, res) =>{
    // con el req.body guardamos en la base de datos
   res.status(201).send(req.body)
})

app.use((req, res) =>{
    res.status(404).send("404")
})


app.listen(PORT, () =>{
    console.log(`El servidor hha sido levantado en el puerto: http://localhost:${PORT}`)
}) 