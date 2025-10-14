import express from "express"
import { movies } from "./movies.js"
import crypto from "node:crypto"
import z from "zod"
import { validateMovie, validatePartialMovie } from "./schemas/movies.js"
import cors from 'cors'


const app = express()
app.disable("x-powered-by")

app.use(express.json())

app.get("/", (req, res) =>{
    res.json({messae: "hola mundo"})
})

app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:1234',
      'https://movies.com',
      'https://midu.dev'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))

app.get("/movies", (req, res) =>{

    const { genre } = req.query
    if (genre){
        const movie = movies.filter (movie =>movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
        if(movie) return res.json(movie)
        res.status(404).json({message: "NO se encontró el genero"})
    }
    res.json(movies)
})

app.get("/movies/:id", (req, res) =>{ // path-to-regexp
    const { id } = req.params
    const movie = movies.find(movie =>movie.id === id)
    if(movie) return res.json(movie)
    res.status(404).json({message: "NO se econtró la pelicula"})
})

app.post("/movies", (req, res) =>{
    const result = validateMovie(req.body)

    if(result.error){
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res)=>{
    const result = validatePartialMovie(req.body)
    if(result.error){
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }
    const { id } = req.params
    const movieIndex = movies.findIndex(movie =>movie.id === id)

    if(movieIndex === -1){
        return res.status(404).json({message: "Pelicula no encontrada"})
    }
    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }
    movies[movieIndex] = updateMovie

    return res.json(updateMovie)
})

app.delete('/movies/:id', (req, res) =>{
const { id } = req.params
const movieIndex = movies.findIndex(movie =>movie.id == id)
if(movieIndex === -1){
    return res.status(404).json({message: "Pelicula no encontrada"})
}
movies.splice(movieIndex, 1)
return res.json({message: "Pelicula eliminada"})

})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, ()=>{
    console.log(`El servidor ha sido levantado en el puerto: http://localhost:${PORT}`)
})