import { movies } from "../moviesarray.js";
import crypto from "node:crypto"

export class MovieModel {
    static async getAll({ genre }) {
        if (genre) {
            return movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
        }
        return movies
    }

    static async getById({ id }) {
        const movie = movies.find(movie => movie.id === id)
        return movie
    }

    static async create({ object }) {
        const newMovie = {
            id: crypto.randomUUID(),
            ...object
        }
        movies.push(newMovie)
        return newMovie
    }

    static async delete({ id }) {
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if (movieIndex === -1) return false

        movies.splice(movieIndex, 1)
        return true
    }

    static async update({ id, object }) {
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if (movieIndex === -1) return false

        const updateMovie = {
            ...movies[movieIndex],
            ...object
        }
        return updateMovie
    }
}