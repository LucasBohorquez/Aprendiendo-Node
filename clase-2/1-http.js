import Http from "node:http"; // protocolo http
import fs from "node:fs"

const desiredPort = process.env.PORT ?? 1234

const server = Http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8")
    if (req.url === "/") {
        res.statusCode = 200,
            res.end("Bienvenido a mi página de inicio")

    } else if (req.url === "/imagen") {
        fs.readFile("./perro.jpg", (err, data) => {
            if (err) {
                res.statusCode = 500
                res.end("Error Internal Server")
            } else {
                res.setHeader("Content-Type", "image/jpg")
                res.end(data)
            }
        })
    } else if (req.url === "/contacto") {
        res.statusCode = 200,
            res.end("Bienvenido a mi página de contacto")

    } else {
        res.statusCode = 404,
            res.end("Error 404")
    }
})

server.listen(desiredPort, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${desiredPort}`)
})