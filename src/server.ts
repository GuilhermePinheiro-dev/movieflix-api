import { prisma } from "../lib/prisma.js";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" with { type: "json" };
import type { Prisma } from "../generated/prisma/client.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/movies", async (req, res) => {
    const movies = await prisma.movie.findMany({
        orderBy: {
            title: "asc",
        },
        include: {
            genres: true,
            languages: true,
        },
    });

    const totalMovies = await prisma.movie.count();

    let totalDuration = 0;
    for (let movie of movies) {
        totalDuration += movie.duration ?? 0;
    }

    const averageDuration = totalDuration > 0 ? totalDuration / totalMovies : 0;

    res.json({ totalMovies, averageDuration, movies });
});

app.get("/movies/sort", async (req, res)=>{
    const {language , sort } = req.query
    const languageName = language as string;

    let where = {};
    if (languageName) {
        where = {
            languages: {
                name: {
                    equals: languageName,
                    mode: "insensitive",
                },
            },
        };
    }

    const orderBy: Prisma.MovieOrderByWithRelationInput = 
        sort === "title" 
            ? { title: "asc" }
            : sort === "release_date" 
            ? { release_date: "asc" as const}
            : {};

    const movies = await prisma.movie.findMany({
        where,
        orderBy,
        include: {
            languages: true,
            genres: true
        }
    })

    res.status(200).send(movies)
})

app.get("/movies/:id", async (req, res) => {
    const id = Number(req.params.id);

    try {
        const movies = await prisma.movie.findUnique({
            where: { id },
            include: {
                genres: true,
                languages: true,
            },
        });

        if (!movies) {
            return res.status(404).send({ message: "Filme não encontrado" });
        }

        res.status(200).json(movies);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar o filme" });
    }
});


app.post("/movies", async (req, res) => {
    const {
        title,
        genre_id,
        language_id,
        oscar_count,
        release_date,
        duration,
    } = req.body;

    try {
        const movieWithSameTitle = await prisma.movie.findFirst({
            where: {
                title: { equals: title, mode: "insensitive" },
            },
        });

        if (movieWithSameTitle) {
            res.status(409).send({
                message: "Já existe um filme com este titulo",
            });
        }

        await prisma.movie.create({
            data: {
                title,
                genre_id,
                language_id,
                oscar_count,
                release_date: new Date(release_date),
                duration,
            },
        });

        res.status(201).send();
    } catch (error) {
        return res.status(500).send({ message: "Erro ao cadastrar o filme" });
    }
});

app.put("/movies/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        const movie = await prisma.movie.findUnique({
            where: { id },
        });

        if (!movie) {
            return res.status(404).send({ message: "Filme não encontrado" });
        }

        const data = { ...req.body };
        data.release_date = data.release_date
            ? new Date(data.release_date)
            : undefined;

        await prisma.movie.update({
            where: { id },
            data,
        });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Falha ao atualizar o registro do filme" });
    }

    res.status(200).send();
});

app.delete("/movies/:id", async (req, res) => {
    const id = Number(req.params.id);

    try {
        const movieExists = prisma.movie.findUnique({ where: { id } });

        if (!movieExists) {
            return res.status(404).send({ message: "Filme não encontrado" });
        }

        await prisma.movie.delete({ where: { id } });
    } catch (error) {
        res.status(500).send({ message: "Falha ao remover um filme" });
    }

    res.status(200).send();
});

app.get("/movies/:genreName", async (req, res) => {
    try {
        const moviesFilteredGenreName = await prisma.movie.findMany({
            include: {
                genres: true,
                languages: true,
            },
            where: {
                genres: {
                    name: {
                        equals: req.params.genreName,
                        mode: "insensitive",
                    },
                },
            },
        });
        res.status(200).send(moviesFilteredGenreName);
    } catch (error) {
        res.status(500).send({ message: "Falha ao encontrar o filme" });
    }
});

app.get("/genres", async (_, res) => {
    try {
        const genres = await prisma.genre.findMany({
            orderBy: { name: "asc" },
        });

        res.json(genres);
    } catch (error) {
        res.status(500).send({
            message: "Houve um problema ao buscar os gêneros.",
        });
    }
});

app.put("/genres/:id", async (req, res) => {
    const id = Number(req.params.id);
    const name = req.body.name;

    if (!name) {
        return res
            .status(400)
            .send({ message: "O nome do gênero é obrigatório." });
    }
    try {
        const genre = await prisma.genre.findUnique({
            where: { id },
        });

        if (!genre) {
            res.status(404).send({ message: "Falha ao encontrar o gênero" });
        }

        const existingGenre = await prisma.genre.findFirst({
            where: {
                name: { equals: name, mode: "insensitive" },
                id: { not: Number(id) },
            },
        });

        if (existingGenre) {
            return res
                .status(409)
                .send({ message: "Este nome de gênero já existe." });
        }

        const data = { ...req.body };
        await prisma.genre.update({
            where: { id },
            data,
        });

        res.status(200).send();
    } catch (error) {
        res.status(500).send({ message: "Falha ao atualizar o gênero" });
    }
});

app.post("/genres", async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res
            .status(400)
            .send({ message: "O nome do gênero é obrigatório." });
    }

    try {
        const genreWithSameName = await prisma.genre.findFirst({
            where: {
                name: { equals: name, mode: "insensitive" },
            },
        });

        if (genreWithSameName) {
            return res
                .status(409)
                .send({ message: "Este nome de gênero já existe." });
        }

        await prisma.genre.create({
            data: { name },
        });

        res.status(201).send();
    } catch (error) {
        res.status(500).send({ message: "Falha ao adicionar o gênero" });
    }
});

app.delete("/genres/:id", async (req, res) => {
    const id = Number(req.params.id);

    try {
        const genreNotExist = await prisma.genre.findFirst({
            where: { id },
        });

        if (!genreNotExist) {
            return res
                .status(404)
                .send({ message: "Este nome de gênero não existe." });
        }

        await prisma.genre.delete({ where: { id } });

        res.status(200).send();
    } catch (error) {
        res.status(500).send({ message: "Falha ao deletar o gênero" });
    }
});




app.listen(port, () => {
    console.log(`Servidor em execução na porta: ${3000}`);
});
