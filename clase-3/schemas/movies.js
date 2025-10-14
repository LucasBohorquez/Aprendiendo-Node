import z from "zod";

const movieSchema = z.object({
        title: z.string({
            invalid_type_error: "El titulo debe ser texto",
            required_error: "El titulo debe ser requerido"
        }),
        year: z.number().int().min(1900).max(2025),
        director: z.string(),
        duration: z.number().int().positive(),
        rate: z.number().min(0).max(10).default(5),
        poster: z.string().url({
            message: "Poster debe ser una url valida"
        }),
        genre: z.array(
            z.enum(['Action', 'Thriller', 'Sci-Fi', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Crime']),{
                required_error: "El geenero de la pelicula es requerido",
                invalid_type_error: "El genero de la pelicula debe ser un array"
            }
        )
    })

    export function validatePartialMovie(object){
        return movieSchema.partial().safeParse(object)
    }

    export function validateMovie(object){
        return movieSchema.safeParse(object)
    }