import fs from 'node:fs/promises'

// stats sincronos
// const stats = fs.statSync("./archivo.txt")

// console.log(
// stats.isFile(), // fichero
// stats.isDirectory(),// directorio
// stats.isSymbolicLink(), // enlace simbolico
// stats.size // tamaño en bytes
// )

// leer archivos sincrono(inicio)

// console.log("Leyendo el primer archivo...")
// const texto = fs.readFileSync("./archivo.txt", "utf-8")
// console.log(texto)
// console.log("Hacer mientras codigo mientras hacemos codigo")

// console.log("Leyendo el segundo archivo...")
// const texto2 = fs.readFileSync("./texto.txt", "utf-8")
// console.log(texto2)

// leer archivos sincrono(final)

// leer archivos asincrono(inicio)

// console.log("Leyendo el primer archivo...")
// fs.readFile("./archivo.txt", "utf-8", (err, text) =>{
// console.log("primer texto: ",text)
// })

// console.log("Hacer mientras codigo mientras hacemos codigo")

// console.log("Leyendo el segundo archivo...")
// fs.readFile("./texto.txt", "utf-8")
// .then(text =>{
//     console.log("primer texto: ", text)
// })

// leer archivos asincrono(final)

// promesas(inicio) existe forma de transformar callback a promesa con import { promisify } from "node:util"

// console.log("Leyendo el primer archivo...")
// fs.readFile("./archivo.txt", "utf-8")
// .then(text =>{
//     console.log("primer texto: ", text)
// })

// console.log("Hacer mientras codigo mientras hacemos codigo")

// console.log("Leyendo el segundo archivo...")
// fs.readFile("./texto.txt", "utf-8")
// .then(text =>{
//     console.log("segundo texto: ", text)
// })

// promesas (final)

// promesas paralelo(inicio)

Promise.all([
  fs.readFile('./archivo.txt', 'utf-8'),
  fs.readFile('./texto.txt', 'utf-8')
]).then(([texto, texto2]) => {
  console.log('Primer texto: ', texto)
  console.log('Segundo Texto: ', texto2)
})

// paralelo(final)
