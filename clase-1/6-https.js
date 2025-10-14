import Http from "node:http";
import { findAvalaiblePort } from "./7-puertolibre.js";

const server = Http.createServer((req, res) =>{
    console.log("solicitud recibida")
    res.end("Hola mundo")
})

findAvalaiblePort(3000).then(port =>{
    server.listen(port, ()=>{
console.log(`Servidor escuchando en el puerto http://localhost:${server.address().port}`)
    })
})
