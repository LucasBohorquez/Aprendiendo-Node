import { MovieModel } from "../models/movie.js"
import { validateMovie, validatePartialMovie } from "../schemas/movies.js"


export class MovieController {
    static async getAll(req, res) {
        const { genre } = req.query
        const movies = await MovieModel.getAll({ genre })

        res.json(movies)
    }

    static async getById(req, res) {
        const { id } = req.params
        const movie = await MovieModel.getById({ id })
        if (!movie) 
        res.status(404).json({ message: "Pelicula no encontrada" })
        res.json(movie)
    }

    static async create(req, res) {
        const result = validateMovie(req.body)

        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const newMovie = await MovieModel.create({ object: result.data })
        res.status(201).json(newMovie)
    }

    static async delete(req, res) {
        const { id } = req.params
        const result = await MovieModel.delete({ id })
        if (result === false) {
            return res.status(404).json({ message: "Pelicula no encontrada" })
        }
        return res.json({ message: "Pelicula eliminada" })
    }

    static async update(req, res) {
        const result = validatePartialMovie(req.body)
        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const { id } = req.params
        const updateMovie = await MovieModel.update({ id, object: result.data })


        return res.json(updateMovie)
    }
}