import Http from "node:http";
import { ditto } from "./pokemon/ditto.js"

const processRequest = (req, res) =>{
    const { method, url } = req

    switch (method){
        case "GET":
            switch (url){
                case "/pokemon/ditto":
                    res.setHeader("Content-Type", "application/json; charset=utf-8")
                    return res.end(JSON.stringify(ditto))
                    default:
                        res.statusCode = 404,
                        res.setHeader("Content-Type", "text/plain, charset=utf-8")
                        return res.end("404")
            } 
            case "POST":
                switch (url){
                    case "/pokemon":{
                        let body = ""
                        req.on("data", chunk =>{
                            body += chunk.toString()
                        })
                        req.on("end", ()=>{
                            const data = JSON.parse(body)
                            res.writeHead(201, {"Content-Type": "application/json; charset:utf-8"})
                            data.timestamp = Date.now()
                            res.end(JSON.stringify(data))
                    })
                        break
                    }
                     default:
                        res.statusCode = 404,
                        res.setHeader("Content-Type", "text/plain, charset=utf-8")
                        return res.end("404")
                }
    }

}

const server = Http.createServer(processRequest)

server.listen(1234, ()=>{
console.log(`Servidor levantado en el puerto http://localhost:1234`)
})